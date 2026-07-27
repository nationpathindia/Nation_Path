import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  article: any;
  showImage?: boolean;
  showExcerpt?: boolean;
}

export default function ArticleCard({
  article,
  showImage = true,
  showExcerpt = true,
}: ArticleCardProps) {
  if (!article) return null;

  const articleUrl = article?.category?.slug
    ? `/${article.category.slug}/${article.slug}`
    : "#";

  const cleanText = (html: string) => {
    if (!html) return "";
    return html.replace(/<\/?[^>]+(>|$)/g, "").trim();
  };

  return (
    <Link href={articleUrl} className="block group">

      {showImage && article?.images?.[0] && (
        <div className="relative aspect-[4/3] overflow-hidden mb-4">
          <Image
            src={article.images[0]}
            alt={article.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <h3 className="font-serif text-lg leading-snug group-hover:text-[#0b2a6f]">
        {article.title}
      </h3>

      {showExcerpt && (
        <p className="text-sm text-gray-600 mt-2">
          {cleanText(article.content).slice(0, 120)}...
        </p>
      )}

    </Link>
  );
}