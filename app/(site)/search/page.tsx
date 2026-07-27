import { prisma } from "@/lib/prisma";
import Link from "next/link";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";

  const results = await prisma.article.findMany({
    where: {
      status: "approved",
      title: { contains: query, mode: "insensitive" },
    },
    orderBy: { createdAt: "desc" },
  });

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
          className="w-full border px-4 py-3 text-lg"
        />
      </form>

      <div className="space-y-8">
        {results.map((article) => (
          <div key={article.id} className="border-b pb-6">
            <Link href={`/article/${article.slug}`}>
              <h2 className="text-2xl font-semibold hover:text-red-600 transition">
                {article.title}
              </h2>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}