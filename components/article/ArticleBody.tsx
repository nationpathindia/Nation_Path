interface ArticleBodyProps {
  content: string;
}


export default function ArticleBody({

  content,

}:ArticleBodyProps){


  if(!content) return null;




  return (


    <article


      className="
      mt-12

      prose
      prose-base

      max-w-none


      sm:prose-lg


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
      prose-p:leading-[1.9]

      prose-p:mb-7



      prose-a:text-[#163C80]
      prose-a:font-semibold
      prose-a:no-underline
      hover:prose-a:underline



      prose-strong:text-[#111]
      prose-strong:font-bold



      prose-ul:my-8
      prose-ol:my-8


      prose-li:text-[#333]
      prose-li:leading-relaxed



      prose-blockquote:border-l-[#EA661B]
      prose-blockquote:bg-[#FAF7F1]
      prose-blockquote:px-6
      prose-blockquote:py-4
      prose-blockquote:rounded-r-xl



      prose-img:rounded-2xl
      prose-img:my-10



      "

    >




      <div

        dangerouslySetInnerHTML={{

          __html:content,

        }}

      />





    </article>


  );

}