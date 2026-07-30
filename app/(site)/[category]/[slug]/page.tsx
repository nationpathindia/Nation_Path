// app/[category]/[slug]/page.tsx

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

import AdRenderer from "@/components/ads/AdRenderer";

import ArticleReadingProgress from "@/components/article/ArticleReadingProgress";
import ArticleHeader from "@/components/article/ArticleHeader";
import ArticleHero from "@/components/article/ArticleHero";
import ArticleAISummary from "@/components/article/ArticleAISummary";
import ArticleBody from "@/components/article/ArticleBody";
import ArticleFAQ from "@/components/article/ArticleFAQ";
import ArticleRelated from "@/components/article/ArticleRelated";
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





/*
=====================================================
 PUBLISHED FILTER
=====================================================
*/

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





/*
=====================================================
 METADATA
=====================================================
*/


export async function generateMetadata({

params,

}:Props):Promise<Metadata>{


const {

category:categorySlug,

slug

}=await params;



const category = await prisma.category.findUnique({

where:{

slug:categorySlug

}

});



if(!category){

return {};

}





const article = await prisma.article.findFirst({

where:{


slug,


categoryId:category.id,


status:"approved",


isDeleted:false,


...isPublishedFilter()


}

});





if(!article){

return {};

}





const canonical =

`https://nationpathindia.com/${category.slug}/${article.slug}`;




const title =

article.metaTitle ||

article.title;





const description =

article.metaDescription ||

article.excerpt ||

`Read latest ${category.name} updates from Nation Path India.`;





const image =

article.images?.[0] || null;






return {


title,


description,



keywords:[

category.name,

article.title,

"Nation Path India",

"India News",

"Breaking News",

"Latest Updates"

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



images:image

?

[

{

url:image,

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



images:image

?

[image]

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






/*
=====================================================
 CATEGORY
=====================================================
*/


const category = await prisma.category.findUnique({

where:{

slug:categorySlug

}

});



if(!category){

return notFound();

}






/*
=====================================================
 ARTICLE
=====================================================
*/


const article = await prisma.article.findFirst({

where:{


slug,


categoryId:category.id,


status:"approved",


isDeleted:false,


...isPublishedFilter()


},


include:{


category:true


}


});





if(!article){

return notFound();

}





if(

article.publishedAt &&

article.publishedAt > new Date()

){

return notFound();

}






/*
=====================================================
 VIEW TRACKING
=====================================================
*/


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



/*
=====================================================
 MOST READ ARTICLES
=====================================================
*/


const mostRead = await prisma.article.findMany({

where:{


status:"approved",


isDeleted:false,


...isPublishedFilter(),




NOT:{

id:article.id

}


},



orderBy:[

{

trendingScore:"desc"

},

{

views:"desc"

},

{

createdAt:"desc"

}

],



take:5,



include:{

category:true

}



});









/*
=====================================================
 RELATED STORIES
=====================================================
*/


const related = await prisma.article.findMany({

where:{


status:"approved",


isDeleted:false,


...isPublishedFilter(),



categoryId:category.id,



NOT:{

id:article.id

}


},



orderBy:[

{

createdAt:"desc"

}

],



take:6,



include:{

category:true

}



});









/*
=====================================================
 NEXT STORY
=====================================================
*/


const nextArticle = await prisma.article.findFirst({

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








/*
=====================================================
 READING TIME
=====================================================
*/


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






const readingTime = Math.max(

1,

Math.ceil(wordCount / 200)

);








/*
=====================================================
 ARTICLE URL
=====================================================
*/


const articleUrl =

`https://nationpathindia.com/${category.slug}/${article.slug}`;







const keywords=[


category.name,


article.title,


article.excerpt || "",


"Nation Path India",


"India News",


"Breaking News"


];







/*
=====================================================
 SCHEMA DATA
=====================================================
*/


const newsSchema = {


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

width:1200,

height:675,

caption:article.title

}

]

:

[],







datePublished:

article.publishedAt ||

article.createdAt,





dateModified:

article.updatedAt ||

article.createdAt,






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

url:"https://nationpathindia.com/logo.png"


}


},






speakable:{


"@type":"SpeakableSpecification",


cssSelector:[

"h1",

".article-body"

]


}



};









const faqSchema =

Array.isArray(article.faqItems)

&&

article.faqItems.length > 0

?

{


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



}

:

null;

 // CONTINUATION PART 3/3


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




{/* ================= SCHEMA ================= */}


<script

type="application/ld+json"

dangerouslySetInnerHTML={{

__html:JSON.stringify(newsSchema)

}}

/>




{

faqSchema && (

<script

type="application/ld+json"

dangerouslySetInnerHTML={{

__html:JSON.stringify(faqSchema)

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






{/* READING PROGRESS */}


<ArticleReadingProgress />







{/* ================= BREADCRUMB ================= */}


<nav

className="

mb-6

text-xs

uppercase

tracking-wide

text-gray-500

"

>


<Link

href="/"

className="transition hover:text-[#163C80]"

>

Home

</Link>



<span className="mx-2">

/

</span>



<Link

href={`/${category.slug}`}

className="transition hover:text-[#163C80]"

>

{category.name}

</Link>


</nav>









{/* ================= TOP AD ================= */}


<div

className="

my-8

flex

justify-center

"

>


<AdRenderer

placement="article_top"

/>


</div>









{/* ================= HEADER ================= */}



<ArticleHeader

article={article}

category={category}

readingTime={readingTime}

/>









{/* ================= HERO ================= */}



<ArticleHero

images={article.images}

title={article.title}

shareUrl={articleUrl}

/>









{/* ================= AI SUMMARY ================= */}



<ArticleAISummary


categoryName={category.name}


summary={article.aiSummary as any}


/>









{/* ================= BODY ================= */}



<ArticleBody


content={article.content}


keyHighlights={article.keyHighlights}


whyItMatters={article.whyItMatters}


/>









{/* ================= FAQ ================= */}



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









{/* ================= BOTTOM AD ================= */}



<div

className="

my-14

flex

justify-center

"

>


<AdRenderer

placement="article_bottom"

/>


</div>









{/* ================= NEXT STORY ================= */}



<ArticleNextStory

article={nextArticle}

/>









{/* ================= ASTRO CROSS PRODUCT ================= */}



<ArticleAstroBanner


categoryName={category.name}


categorySlug={category.slug}


/>









{/* ================= RELATED ================= */}



<ArticleRelated

articles={related}

/>






</main>









{/* ================= SIDEBAR ================= */}



<ArticleSidebar

mostRead={mostRead}

/>







</div>





</div>

);


}