"use client";

import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, useRouter } from "next/navigation";

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  category: {
    name: string;
    slug: string;
  };
  attributes: Record<string, any>;
}

interface Facets {
  categories: Array<{
    categoryId: string;
    _count: number;
  }>;
  attributes: Record<string, Record<string, number>>;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [listings, setListings] = useState<Listing[]>([]);
  const [facets, setFacets] = useState<Facets | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page") || 1)
  );
 
  
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (query) params.set("q", query);
        if (Object.keys(filters).length > 0) {
          params.set("filters", encodeURIComponent(JSON.stringify(filters)));
        }
        params.set("page", currentPage.toString());

        const response = await fetch(`/api/search?${params.toString()}`);
        const data = await response.json();

        setListings(data.listings);
        setFacets(data.facets);
        setPagination(data.pagination);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, filters, currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams.toString());
    if (query) params.set("q", query);
    else params.delete("q");
    params.set("page", "1");
    router.push(`/search?${params.toString()}`);
  };

  const handleFilterChange = (key: string, value: string) => {
    setCurrentPage(1);
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (newFilters[key] === value) {
        delete newFilters[key];
      } else {
        newFilters[key] = value;
      }
      return newFilters;
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams.toString());
    if (query) params.set("q", query);
    if (Object.keys(filters).length > 0) {
      params.set("filters", encodeURIComponent(JSON.stringify(filters)));
    }
    params.set("page", page.toString());
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="h-screen bg-gray-100">
  <div className="max-w-7xl mx-auto px-6 py-10">
    <form
      onSubmit={handleSearch}
      className="sticky top-0 z-50 px-6 py-4  rounded-xl transition-all duration-300"
    >
      <div className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search listings..."
          className="w-full px-5 py-4 pl-14 text-gray-800 text-lg rounded-xl border border-gray-300 shadow focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
        />
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500" />
      </div>
    </form>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6 h-[calc(100vh-12rem)]">
      <aside className="md:col-span-1 sticky top-24 h-fit self-start overflow-y-auto max-h-[calc(100vh-12rem)]">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Filters</h2>

          {facets?.attributes &&
            Object.entries(facets.attributes).map(([key, values]) => (
              <div key={key} className="mb-6">
                <h3 className="text-gray-700 font-medium capitalize mb-3">
                  {key}
                </h3>
                <div className="space-y-2">
                  {Object.entries(values).map(([value, count]) => (
                    <label
                      key={value}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <input
                        type="checkbox"
                        checked={filters[key] === value}
                        onChange={() => handleFilterChange(key, value)}
                        className="mr-2 text-blue-600 rounded focus:ring-blue-500"
                      />
                      {value}
                      <span className="ml-1 text-gray-400">({count})</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

          {Object.keys(filters).length > 0 && (
            <button
              onClick={() => {
                setFilters({});
                setCurrentPage(1);
                const params = new URLSearchParams(searchParams.toString());
                params.delete("filters");
                params.set("page", "1");
                if (query) params.set("q", query);
                router.push(`/search?${params.toString()}`);
              }}
              className="mt-4 w-full px-4 py-2 text-sm font-medium text-red-600 bg-red-100 hover:bg-red-200 rounded-lg transition"
            >
              Reset Filters
            </button>
          )}
        </div>
      </aside>

      {/* Scrollable Main Listings */}
      <main className="md:col-span-3 overflow-y-auto pr-2 max-h-[calc(100vh-12rem)]">
        {loading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow animate-pulse"
              >
                <div className="h-5 bg-gray-200 rounded w-2/3 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : listings.length === 0 ? (
          <p className="text-gray-600 text-center text-lg">No listings found.</p>
        ) : (
          <div className="space-y-6">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-200"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {listing.title}
                </h3>
                <p className="text-gray-600 mt-2">{listing.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-600">
                    ₹{listing.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    {listing.location}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {Object.entries(listing.attributes).map(([key, value]) => (
                    <span
                      key={key}
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {key}: {value}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {pagination && pagination.pages > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-4 py-2 rounded-lg ${
                        pageNum === currentPage
                          ? "bg-blue-600 text-white"
                          : "bg-white text-blue-600 border border-blue-300 hover:bg-blue-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  </div>
</div>

  );
}
