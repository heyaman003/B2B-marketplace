# B2B Marketplace Prototype

A Next.js-based B2B marketplace prototype featuring dynamic category-specific attributes, search functionality, and faceted filtering.

## Features

- Dynamic category-specific attributes
- Full-text search with faceted filtering
- Modern UI with Tailwind CSS
- MongoDB database with Prisma ORM
- Sample data seeder

## Prerequisites

- Node.js 18+ and npm
- MongoDB (local or Atlas)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd b2b-marketplace
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your MongoDB connection string:
```
DB_URL="mongodb://localhost:27017/b2b-marketplace"
```

4. Generate Prisma client:
```bash
npx prisma generate
```

5. Run database migrations:
```bash
npx prisma db push
```

6. Seed the database with sample data:
configure the mogodb for setting the replica as

6.1  make dir for the data 
```bash
mkdir -p ../data/db
chmod 755 ../data/db
```
6.2 run the config file of mongodb 

```bash
mongod --config mongod.conf 
```
6.3 wait for few seconds, 
now go to terminal in and open monosh

```bash
mongosh
```
6.4 then initate is by just saying 
```bash
rs.initate()
```

you will see something like this 
```
{info2:"some msg",
ok:1
}
```
6.5 now seed the dummy data set
```bash
npx prisma db seed
```

7. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── search/
│   │       └── route.ts     Search API endpoint
│   └── search/
│       └── page.tsx         Search page component
├── lib/
│   ├── db/
│   │   └── prisma.ts        Database connection
│   └── utils/               Utility functions
└── components/              Reusable components
```

## API Endpoints

### GET /api/search

Search listings with filtering and faceting.

Query Parameters:
- `q` (string): Search query
- `category` (string): Category slug
- `filters` (JSON string): URL-encoded JSON object of attribute filters
- `page` (number): Page number (default: 1)
- `limit` (number): Results per page (default: 10)

## Development

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint
- `npm run type-check`: Run TypeScript type checking 
