import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

import AdRenderer from "@/components/ads/AdRenderer";
import ArticleHeader from "@/components/article/ArticleHeader";
import ArticleHero from "@/components/article/ArticleHero";
import ArticleAISummary from "@/components/article/ArticleAISummary";
import ArticleBody from "@/components/article/ArticleBody";
import ArticleFAQ from "@/components/article/ArticleFAQ";
import ArticleRelated from "@/components/article/ArticleRelated";
import ArticleShareBar from "@/components/article/ArticleShareBar";
import ArticleNextStory from "@/components/article/ArticleNextStory";
import ArticleSidebar from "@/components/article/ArticleSidebar";
import ArticleAstroBanner from "@/components/article/ArticleAstroBanner";


export const dynamic = "force-dynamic";
export const revalidate = 0;



interface Props {

  params: Promise<{

    category:string;

    slug:string;

  }>;

}



/* =====================================================
   PUBLISH FILTER

   Supports:

   1. Old published articles
      publishedAt = null

   2. Scheduled articles
      publishedAt <= now

===================================================== */
function isPublishedFilter(){

  return {

    OR:[
      {
        publishedAt:{
          equals:null
        }
      },
      {
        publishedAt:{
          lte:new Date()
        }
      }
    ]

  };

}




/* =====================================================
   METADATA
===================================================== */


export async function generateMetadata({

params,

}:Props):Promise<Metadata>{


const {

category:categorySlug,

slug

}=await params;



const category =

await prisma.category.findUnique({

where:{

slug:categorySlug

}

});



if(!category)

return {};





const article =

await prisma.article.findFirst({

where:{


slug,


categoryId:category.id,


status:"approved",


isDeleted:false,


...isPublishedFilter()


}


});




if(!article)

return {};





const canonical =

`https://www.nationpathindia.com/${category.slug}/${article.slug}`;





const title =

article.metaTitle ||

article.title;





const description =

article.metaDescription ||

article.excerpt ||

"";





return {


title,


description,



keywords:[


category.name,


article.title,


article.excerpt || "",


"Nation Path India",


"Latest India News",


"Breaking News"


],





alternates:{


canonical


},





robots:{


index:true,


follow:true


},






openGraph:{


type:"article",


title,


description,


url:canonical,


siteName:"Nation Path India",



images:

article.images?.[0]

?

[

{

url:article.images[0],


width:1200,


height:675,


alt:article.title


}

]


:

[]



},






twitter:{


card:"summary_large_image",


title,


description,



images:

article.images?.[0]

?

[

article.images[0]

]


:

[]



}



};



}








export default async function ArticlePage({

params,

}:Props){





const {


category:categorySlug,


slug


}=await params;






const category =

await prisma.category.findUnique({

where:{

slug:categorySlug

}

});





if(!category)

return notFound();








/* =====================================================
   MAIN ARTICLE FETCH

===================================================== */

const article =

await prisma.article.findFirst({

where:{

slug,

categoryId:category.id,

status:"approved",

},

include:{

category:true

}

});


if(!article)
  return notFound();


if(
  article.publishedAt &&
  article.publishedAt > new Date()
){
  return notFound();
}






/* =====================================================
   VIEW UPDATE

===================================================== */


await prisma.article.update({

where:{


id:article.id


},


data:{


views:{


increment:1


},



lastViewAt:new Date(),



trendingScore:{


increment:1


}



}



});







/* =====================================================
   MOST READ

===================================================== */


const mostRead =

await prisma.article.findMany({

where:{


status:"approved",


isDeleted:false,


...isPublishedFilter(),



categoryId:category.id,



NOT:{


id:article.id


}


},



orderBy:{


views:"desc"


},



take:5,



include:{


category:true


}



});








/* =====================================================
   RELATED ARTICLES

===================================================== */


const related =

await prisma.article.findMany({

where:{


status:"approved",


isDeleted:false,


...isPublishedFilter(),



categoryId:category.id,



NOT:{


id:article.id


}


},



orderBy:{


createdAt:"desc"


},



take:6,



include:{


category:true


}



});









/* =====================================================
   NEXT STORY

===================================================== */


const nextArticle =

await prisma.article.findFirst({

where:{


status:"approved",


isDeleted:false,


...isPublishedFilter(),



categoryId:category.id,



id:{


not:article.id


}


},



orderBy:{


createdAt:"desc"


},



include:{


category:true


}



});






/* =====================================================
   READING TIME

===================================================== */


function cleanText(html:string){


return html

.replace(/<\/?[^>]+(>|$)/g,"")

.replace(/\s+/g," ")

.trim();


}




const wordCount =

cleanText(article.content || "")

.split(" ")

.filter(Boolean)

.length;





const readingTime =

Math.max(

1,

Math.ceil(wordCount / 200)

);






const articleUrl =

`https://www.nationpathindia.com/${category.slug}/${article.slug}`;






const keywords=[


category.name,


article.title,


article.excerpt || "",


"Nation Path India",


"India News",


"Breaking News"


];

return (

<div

className="
mx-auto
max-w-7xl
px-4
py-8

sm:px-6
sm:py-12

lg:px-8
"

>


{/* =====================================================
    NEWS ARTICLE SCHEMA
===================================================== */}


<script

type="application/ld+json"

dangerouslySetInnerHTML={{

__html:JSON.stringify({

"@context":"https://schema.org",

"@type":"NewsArticle",


"@id":articleUrl,


headline:article.title,


description:

article.metaDescription ||

article.excerpt ||

"",



keywords,



image:

article.images?.[0]

?

[

{

"@type":"ImageObject",

url:article.images[0],

}

]

:

[],





datePublished:

article.publishedAt ||

article.createdAt,





dateModified:

article.updatedAt,





articleSection:

category.name,





wordCount,





timeRequired:

`PT${readingTime}M`,





mainEntityOfPage:{


"@type":"WebPage",

"@id":articleUrl


},






author:{


"@type":"Organization",

name:"Nation Path India"


},






publisher:{


"@type":"Organization",

name:"Nation Path India",



logo:{


"@type":"ImageObject",

url:

"https://www.nationpathindia.com/logo.png"


}


}





})


}}


/>







{/* =====================================================
    FAQ SCHEMA
===================================================== */}


{

Array.isArray(article.faqItems)

&&

article.faqItems.length > 0

&&

(

<script

type="application/ld+json"

dangerouslySetInnerHTML={{

__html:JSON.stringify({

"@context":"https://schema.org",

"@type":"FAQPage",



mainEntity:

article.faqItems

.filter(

(item:any)=>

item.question && item.answer

)

.map(

(item:any)=>(

{

"@type":"Question",


name:item.question,



acceptedAnswer:{


"@type":"Answer",


text:item.answer


}



}

)

)



})


}}


/>

)

}








<div

className="

grid

grid-cols-1

gap-10

lg:grid-cols-[minmax(0,1fr)_360px]

lg:gap-14

"

>







<main>







<nav

className="

mb-6

text-xs

uppercase

tracking-wide

text-gray-500

"

>


<Link href="/">

Home

</Link>


{" / "}



<Link href={`/${category.slug}`}>

{category.name}

</Link>


</nav>








<div

className="

my-8

flex

justify-center

"

>


<AdRenderer placement="article_top"/>


</div>










<ArticleHeader

article={article}

category={category}

readingTime={readingTime}

/>











<ArticleHero

images={article.images}

title={article.title}

/>









<ArticleShareBar

title={article.title}

url={articleUrl}

/>








<ArticleAISummary

  categoryName={category.name}

  summary={article.aiSummary as any}

/>







<ArticleBody

content={article.content}

keyHighlights={article.keyHighlights}

whyItMatters={article.whyItMatters}

/>









{

Array.isArray(article.faqItems)

&&

article.faqItems.length > 0

&&

(

<ArticleFAQ

faqItems={article.faqItems as any}

/>

)

}









<div

className="

my-14

flex

justify-center

"

>


<AdRenderer placement="article_bottom"/>


</div>









<ArticleNextStory

article={nextArticle}

/>









<ArticleAstroBanner

categoryName={category.name}

categorySlug={category.slug}

/>









<ArticleRelated

articles={related}

/>







</main>









<ArticleSidebar

mostRead={mostRead}

/>






</div>







</div>

);
}
