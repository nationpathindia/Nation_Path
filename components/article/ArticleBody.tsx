import ArticleKeyHighlights from "@/components/article/ArticleKeyHighlights";
import ArticleWhyItMatters from "@/components/article/ArticleWhyItMatters";


interface ArticleBodyProps {

  content: string;

  keyHighlights?: string[];

  whyItMatters?: string | null;

}



export default function ArticleBody({

  content,

  keyHighlights = [],

  whyItMatters,

}: ArticleBodyProps) {



  if(!content) return null;



  /*
    Split article content
  */

  const paragraphs =
    content
      .split(/(<p>.*?<\/p>)/g)
      .filter(Boolean);



  const firstPart =
    paragraphs.slice(0,2);



  const secondPart =
    paragraphs.slice(2,5);



  const remainingPart =
    paragraphs.slice(5);





  const proseClass = `

    prose

    prose-base

    sm:prose-lg

    max-w-none


    prose-headings:font-serif

    prose-headings:font-bold

    prose-headings:text-[#111]

    prose-headings:tracking-tight



    prose-h2:mt-12

    prose-h2:mb-5

    prose-h2:text-3xl



    prose-h3:mt-10

    prose-h3:mb-4

    prose-h3:text-2xl



    prose-p:text-[#333]

    prose-p:leading-[1.95]

    prose-p:mb-7

    prose-p:text-justify



    prose-a:text-[#163C80]

    prose-a:font-semibold

    prose-a:no-underline



    prose-strong:text-[#111]

    prose-strong:font-bold



    prose-ul:my-8

    prose-ol:my-8



    prose-li:text-[#333]

    prose-li:leading-relaxed



    prose-blockquote:border-l-[#EA661B]

    prose-blockquote:bg-[#FAF7F1]

    prose-blockquote:px-6

    prose-blockquote:py-5

    prose-blockquote:rounded-r-xl



    prose-img:rounded-2xl

    prose-img:my-10

  `;





  return (

    <article

      className="
      mt-12
      max-w-none
      "

    >





      {/* INTRO */}

      {
        firstPart.length > 0 &&


        <div className={proseClass}>

          <div

            dangerouslySetInnerHTML={{

              __html:firstPart.join(""),

            }}

          />

        </div>

      }







      {/* KEY HIGHLIGHTS */}

      <ArticleKeyHighlights

        highlights={keyHighlights}

      />









      {/* MIDDLE CONTENT */}

      {
        secondPart.length > 0 &&


        <div className={proseClass}>

          <div

            dangerouslySetInnerHTML={{

              __html:secondPart.join(""),

            }}

          />

        </div>

      }









      {/* WHY IT MATTERS */}

      <ArticleWhyItMatters

        whyItMatters={whyItMatters}

      />









      {/* REMAINING ARTICLE */}

      {
        remainingPart.length > 0 &&


        <div className={proseClass}>

          <div

            dangerouslySetInnerHTML={{

              __html:remainingPart.join(""),

            }}

          />

        </div>

      }





    </article>

  );


}