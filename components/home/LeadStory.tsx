import Image from "next/image";
import Link from "next/link";


interface LeadStoryProps {
  article: any;
}


export default function LeadStory({
  article,
}: LeadStoryProps) {


  if (!article) return null;



  const articleUrl =
    article?.category?.slug
      ? `/${article.category.slug}/${article.slug}`
      : "#";





  const cleanText = (html: string) => {

    if (!html) return "";

    return html
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/\s+/g, " ")
      .trim();

  };





  const summary = cleanText(article.content);


  const shortSummary =
    summary.length > 300
      ? summary.slice(0, 300)
      : summary;





  const publishedDate = article.createdAt
    ? new Date(article.createdAt).toISOString()
    : undefined;






  return (

    <article

      className="
        border-b
        border-[var(--news-border)]
        pb-12
      "

      itemScope
      itemType="https://schema.org/NewsArticle"

    >



      <Link

        href={articleUrl}

        className="
          group
          block
        "

        aria-label={`Read full article: ${article.title}`}

      >






        {/* HERO IMAGE */}

        {
          article?.images?.[0] && (

            <div

              className="
                relative
                aspect-[16/10]
                lg:aspect-[21/10]
                overflow-hidden
                rounded-xl
                mb-8
                bg-[var(--news-soft)]
              "

            >


              <Image

                src={article.images[0]}

                alt={`${article.title} - Nation Path India`}

                fill

                priority

                sizes="
                  (max-width:768px) 100vw,
                  1200px
                "

                className="
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-[1.035]
                "

                itemProp="image"

              />


            </div>

          )
        }









        {/* CATEGORY */}

        {
          article?.category?.name && (

            <div

              className="
                category-badge
                mb-5
              "

            >

              <span
                className="category-line"
              />


              <span
                itemProp="articleSection"
              >

                {article.category.name}

              </span>


            </div>

          )
        }









        {/* HEADLINE FINAL LOCK */}


        <h1

          className="
            news-headline
            max-w-4xl
            text-3xl
            sm:text-4xl
            lg:text-[36px]
            xl:text-[40px]
            font-semibold
            leading-[1.14]
            tracking-[-0.018em]
            transition-colors
            duration-300
            group-hover:text-[var(--news-navy)]
          "

          itemProp="headline"

        >

          {article.title}

        </h1>









        {/* SUMMARY */}


        {
          shortSummary && (

            <p

              className="
                news-body
                mt-6
                max-w-3xl
                text-base
                sm:text-lg
                line-clamp-3
              "

              itemProp="description"

            >

              {shortSummary}

              {
                summary.length > 300 && "..."
              }


            </p>

          )
        }









        {/* META */}


        <div

          className="
            mt-7
            flex
            flex-wrap
            items-center
            gap-3
            text-[11px]
            uppercase
            tracking-[0.16em]
            text-[var(--news-light-text)]
          "

        >


          <span

            itemProp="author"

            className="
              font-semibold
            "

          >

            NationPath Editorial Desk


          </span>





          {
            article.createdAt && (

              <>

                <span>
                  •
                </span>


                <time

                  dateTime={publishedDate}

                  itemProp="datePublished"

                >

                  {
                    new Date(article.createdAt)
                      .toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )
                  }


                </time>


              </>

            )
          }



        </div>









        {/* READ STORY */}


        <div

          className="
            mt-7
            inline-flex
            items-center
            gap-2
            text-xs
            uppercase
            tracking-[0.18em]
            font-semibold
            text-[var(--news-navy)]
          "

        >


          <span

            className="
              border-b
              border-[var(--news-orange)]
              pb-1
            "

          >

            Read Full Story

          </span>



          <span

            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "

          >

            →

          </span>


        </div>







      </Link>









      {/* STRUCTURED DATA */}


      <meta

        itemProp="publisher"

        content="Nation Path India"

      />



      <meta

        itemProp="mainEntityOfPage"

        content={`https://nationpathindia.com${articleUrl}`}

      />




    </article>

  );

}