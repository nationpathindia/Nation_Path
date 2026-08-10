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

async function getSearchResults(
  query: string,
  page: number
): Promise<SearchResponse> {
  if (!query) {
    return {
      success: true,
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

  const url =
    `${baseUrl}/api/search` +
    `?q=${encodeURIComponent(query)}` +
    `&page=${page}`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Search failed");
  }

  return response.json();
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;

  const query = params.q?.trim() || "";

  const requestedPage = Number(params.page || "1");

  const page =
    Number.isFinite(requestedPage) && requestedPage > 0
      ? Math.floor(requestedPage)
      : 1;

  let data: SearchResponse = {
    success: true,
    articles: [],
    pagination: {
      page,
      limit: 10,
      total: 0,
      totalPages: 0,
    },
  };

  let searchError = false;

  if (query) {
    try {
      data = await getSearchResults(query, page);
    } catch (error) {
      console.error("Search Page Error:", error);
      searchError = true;
    }
  }

  const results = data.articles || [];

  return (
    <main
      id="main-content"
      className="news-container"
    >
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 font-[var(--news-heading-font)] text-3xl font-semibold sm:text-4xl">
          Search Results
        </h1>

        <form
          method="GET"
          className="mb-10"
        >
          <div className="flex gap-3">
            <input
              name="q"
              defaultValue={query}
              placeholder="Search articles..."
              className="
                w-full
                rounded
                border
                border-black/15
                px-4
                py-3
                text-lg
                outline-none
                focus:border-[#163C80]
              "
            />

            <button
              type="submit"
              className="
                rounded
                bg-[#163C80]
                px-6
                py-3
                font-semibold
                text-white
                transition
                hover:bg-[#102e63]
              "
            >
              Search
            </button>
          </div>
        </form>

        {query && !searchError && (
          <p className="mb-8 text-gray-600">
            Showing results for:
            <strong className="ml-2 text-[#111]">
              {query}
            </strong>
          </p>
        )}

        {!query && (
          <div className="text-gray-500">
            Enter a keyword to search articles.
          </div>
        )}

        {searchError && (
          <div className="rounded border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            Unable to load search results right now. Please try again.
          </div>
        )}

        {query &&
          !searchError &&
          results.length === 0 && (
            <div className="py-10 text-gray-500">
              No articles found for{" "}
              <strong>{query}</strong>.
            </div>
          )}

        <div className="space-y-8">
          {results.map((article) => (
            <article
              key={article.id}
              className="border-b border-black/10 pb-6"
            >
              <Link
                href={
                  article.category
                    ? `/${article.category.slug}/${article.slug}`
                    : `/${article.slug}`
                }
                className="group"
              >
                <h2
                  className="
                    text-2xl
                    font-semibold
                    leading-tight
                    text-[#111]
                    transition-colors
                    group-hover:text-[#163C80]
                  "
                >
                  {article.title}
                </h2>
              </Link>

              {article.excerpt && (
                <p className="mt-3 leading-relaxed text-gray-600">
                  {article.excerpt}
                </p>
              )}

              <div className="mt-3 flex gap-4 text-sm text-gray-500">
                {article.category && (
                  <span>
                    {article.category.name}
                  </span>
                )}

                {article.author?.name && (
                  <span>
                    By {article.author.name}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        {data.pagination.totalPages > 1 && (
          <div className="mt-10 flex flex-wrap gap-3">
            {Array.from(
              {
                length: data.pagination.totalPages,
              },
              (_, index) => index + 1
            ).map((pageNumber) => (
              <Link
                key={pageNumber}
                href={`/search?q=${encodeURIComponent(
                  query
                )}&page=${pageNumber}`}
                className={`
                  rounded
                  border
                  px-4
                  py-2
                  transition
                  ${
                    pageNumber === page
                      ? "border-[#163C80] bg-[#163C80] text-white"
                      : "border-black/15 hover:border-[#163C80]"
                  }
                `}
              >
                {pageNumber}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}