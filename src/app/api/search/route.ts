import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { Prisma } from "@prisma/client";

type Attributes = Record<string, string | number | boolean | null>;
type AttributeFacet = Record<string, Record<string, number>>;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const filters = searchParams.get("filters")
      ? JSON.parse(decodeURIComponent(searchParams.get("filters")!))
      : {};

    const where: Prisma.ListingWhereInput = {};

    if (query) {
      where.OR = [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ];
    }

    if (category) {
      const categoryDoc = await prisma.category.findUnique({
        where: { slug: category },
      });
      if (categoryDoc) {
        where.categoryId = categoryDoc.id;
      }
    }

    const initialResults = await prisma.listing.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    const filteredResults = initialResults.filter((listing) => {
      const attrs = listing.attributes as Attributes;
      return Object.entries(filters).every(([key, value]) => {
        return attrs[key] === value;
      });
    });

    const total = filteredResults.length;
    const paginatedResults = filteredResults.slice((page - 1) * limit, page * limit);

    const attributeFacets = filteredResults.reduce<AttributeFacet>((acc, listing) => {
      const attrs = listing.attributes as Attributes;
      Object.entries(attrs || {}).forEach(([key, value]) => {
        if (!acc[key]) acc[key] = {};
        const valStr = String(value);
        if (!acc[key][valStr]) acc[key][valStr] = 0;
        acc[key][valStr]++;
      });
      return acc;
    }, {});

    const categoryFacets: Record<string, number> = {};
    filteredResults.forEach((listing) => {
      const catId = listing.categoryId?.toString() || "unknown";
      if (!categoryFacets[catId]) categoryFacets[catId] = 0;
      categoryFacets[catId]++;
    });

    return NextResponse.json({
      listings: paginatedResults,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
      facets: {
        categories: categoryFacets,
        attributes: attributeFacets,
      },
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
