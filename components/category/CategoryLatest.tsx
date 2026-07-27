import NewsCard from "@/components/news/NewsCard";
import SectionHeader from "@/components/common/SectionHeader";

interface CategoryLatestProps {
  articles: any[];
}

export default function CategoryLatest({
  articles,
}: CategoryLatestProps) {

  if (!articles?.length) return null;

  return (

    <section

      id="latest-stories"

      className="
      border-b
      border-black/10
      pb-12
      mb-12
      "

    >

      <SectionHeader

        title="Latest Stories"

      />

      <div

        className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-8
        "

      >

        {
          articles.map((article: any) => (

            <article

              key={article.id}

            >

              <NewsCard

                article={article}

                size="default"

              />

            </article>

          ))
        }

      </div>

    </section>

  );

}