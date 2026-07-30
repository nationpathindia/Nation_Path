import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SearchArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  images?: string[] | null;
  publishedAt?: string | Date | null;
  views?: number | null;
  trendingScore?: number | null;

  category?: {
    name: string;
    slug: string;
  } | null;

  author?: {
    name: string;
  } | null;
};

type SearchResponse = {
  success: boolean;
  articles: SearchArticle[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

async function getSearchResults(query: string) {
  if (!query) {
    return {
      articles: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
      },
    };
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  const response = await fetch(
    `${baseUrl}/api/search?q=${encodeURIComponent(query)}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Search failed");
  }

  const data: SearchResponse = await response.json();

  return data;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  const query = searchParams.q?.trim() || "";

  const data = await getSearchResults(query);

  const results = data.articles || [];

  return (
    <main className="max-w-5xl mx-auto px-6 py-14">
      <h1 className="text-4xl font-bold mb-8 font-[var(--font-heading)]">
        Search Results
      </h1>

      <form method="GET" className="mb-10">
        <input
          name="q"
          defaultValue={query}
          placeholder="Search articles..."
          className="w-full border px-4 py-3 text-lg rounded"
        />
      </form>

      {query && (
        <p className="mb-8 text-gray-600">
          Showing results for:
          <strong className="ml-2">
            {query}
          </strong>
        </p>
      )}

      {!query && (
        <div className="text-gray-500">
          Enter a keyword to search articles.
        </div>
      )}

      {query && results.length === 0 && (
        <div className="text-gray-500">
          No articles found.
        </div>
      )}

      <div className="space-y-8">
        {results.map((article) => (
          <article
            key={article.id}
            className="border-b pb-6"
          >
            <Link
              href={
                article.category
                  ? `/${article.category.slug}/${article.slug}`
                  : `/${article.slug}`
              }
            >
              <h2 className="text-2xl font-semibold hover:text-red-600 transition">
                {article.title}
              </h2>
            </Link>

            {article.excerpt && (
              <p className="mt-3 text-gray-600">
                {article.excerpt}
              </p>
            )}

            <div className="mt-3 text-sm text-gray-500 flex gap-4">
              {article.category && (
                <span>
                  {article.category.name}
                </span>
              )}

              {article.author && (
                <span>
                  By {article.author.name}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>

      {data.pagination.totalPages > 1 && (
        <div className="mt-10 flex gap-3">
          {Array.from(
            {
              length: data.pagination.totalPages,
            },
            (_, index) => index + 1
          ).map((page) => (
            <Link
              key={page}
              href={`/search?q=${encodeURIComponent(query)}&page=${page}`}
              className="border px-4 py-2 rounded"
            >
              {page}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}