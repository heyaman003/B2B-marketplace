import Link  from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex bg-black flex-col items-center justify-center px-6 py-12">
      <h1 className="text-4xl font-bold text-white mb-6">Welcome to the Listings App</h1>
      <p className="text-lg text-white mb-8 text-center max-w-xl">
        This is a simple marketplace where you can browse listings, apply filters, and explore items of your interest.
      </p>  
      <Link className=" cursor-pointer bg-white text-black-600 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100 transition" href="/search">
          Go to Search Page
      </Link>
    </div>
  );
}
