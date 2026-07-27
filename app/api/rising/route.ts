import { prisma } from "@/lib/prisma";

export async function GET() {
  const articles = await prisma.article.findMany({
    where: {
      isDeleted: false,
    },
    orderBy: {
      views: "desc",
    },
    take: 20,
  });

  const now = Date.now();

  const rising = articles
    .map((a) => {
      const age =
        (now - new Date(a.createdAt).getTime()) / (1000 * 60 * 60);

      return {
        id: a.id,
        title: a.title,
        slug: a.slug,
        score: (a.views || 0) / (age + 2),
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  return Response.json(rising);
}