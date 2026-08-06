import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/common/SectionHeader";



interface LatestNewsProps {
  articles:any[];
}






export default function LatestNews({
  articles,
}:LatestNewsProps){



  if(!articles?.length)
    return null;








  /*
  ================================================
  IMAGE INTELLIGENCE
  ================================================
  */


  function getPrimaryImage(
    article:any
  ){


    return (

      article?.imageGallery?.find(
        (image:any)=>
          image?.isPrimary
      )?.url

      ||

      article?.imageGallery?.[0]?.url

      ||

      article?.images?.[0]

      ||

      null

    );

  }






  function getImageAlt(
    article:any
  ){


    return (

      article?.imageGallery?.find(
        (image:any)=>
          image?.isPrimary
      )?.alt

      ||

      `${article.title} - Nation Path India`

    );


  }









  /*
  ================================================
  SUMMARY INTELLIGENCE
  ================================================
  */


  function cleanText(
    html:string
  ){


    if(!html)
      return "";


    return html

      .replace(/<\/?[^>]+(>|$)/g,"")

      .replace(/\s+/g," ")

      .trim();


  }





  function getSummary(
    article:any,
    limit:number = 220
  ){


    const source =

      article?.excerpt

      ||

      article?.shortBrief

      ||

      article?.content

      ||

      "";



    const text =
      cleanText(source);



    return text.length > limit

      ?

      `${text.slice(0,limit)}...`

      :

      text;


  }








  const articleUrl = (
    article:any
  ) =>


    article?.category?.slug

      ? `/${article.category.slug}/${article.slug}`

      : "#";









  return (



<section


className="

border-t

border-[var(--news-border)]

pt-10

sm:pt-14

pb-8

"


aria-labelledby="latest-news-heading"


>









<div id="latest-news-heading">


<SectionHeader

title="Latest News"

/>


</div>









<div


className="

divide-y

divide-[var(--news-border)]

mt-8

"


>








{

articles.map((article:any)=>(



<article


key={article.id}


className="

group

grid

grid-cols-1

sm:grid-cols-12

gap-6

sm:gap-8

py-8

sm:py-10

"


itemScope

itemType="https://schema.org/NewsArticle"


>









{/* IMAGE */}




<div


className="

sm:col-span-4

"


>



<Link


href={articleUrl(article)}


className="block"


aria-label={
`Read ${article.title}`
}


>







{

getPrimaryImage(article)

&&

(



<div


className="

relative

aspect-[16/10]

overflow-hidden

rounded-xl

bg-[var(--news-soft)]

"


>



<Image


src={
getPrimaryImage(article)
}


alt={
getImageAlt(article)
}


fill


sizes="

(max-width:768px) 100vw,

420px

"


loading="lazy"


className="

object-cover

transition-transform

duration-700

ease-out

group-hover:scale-[1.04]

"


itemProp="image"


/>






</div>



)

}





</Link>


</div>














{/* CONTENT */}




<div


className="

sm:col-span-8

flex

flex-col

justify-center

"


>






<Link


href={articleUrl(article)}


className="block"


>









{

article?.category?.name

&&

(



<div


className="

category-badge

mb-3

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









<h3


className="

news-headline

text-xl

sm:text-2xl

lg:text-[32px]

leading-[1.15]

transition-colors

duration-300

group-hover:text-[var(--news-editorial-gold)]

"


itemProp="headline"


>


{article.title}


</h3>












{

getSummary(article)

&&

(



<p


className="

news-body

mt-4

max-w-3xl

text-sm

sm:text-base

line-clamp-3

"


itemProp="description"


>


{
getSummary(article)
}



</p>



)

}












<div


className="

mt-5

flex

flex-wrap

items-center

gap-2

text-[10px]

uppercase

tracking-[0.18em]

text-[var(--news-light-text)]

"


>



<span


itemProp="author"


className="font-medium"


>


NationPath Editorial Desk


</span>









{

article.createdAt

&&

(



<>


<span>
•
</span>





<time


itemProp="datePublished"


dateTime={

new Date(
article.createdAt
)

.toISOString()

}


>



{

new Date(
article.createdAt
)

.toLocaleDateString(

"en-IN",

{

day:"numeric",

month:"short",

year:"numeric"

}

)

}



</time>



</>



)

}




</div>








</Link>





</div>









<meta

itemProp="publisher"

content="Nation Path India"

/>








</article>



))


}








</div>









</section>



);


}