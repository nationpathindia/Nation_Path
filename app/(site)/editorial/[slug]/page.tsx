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
import ArticleIntelligence from "@/components/article/ArticleIntelligence";
import ArticleShortBrief from "@/components/article/ArticleShortBrief";
import ArticleWhatsNext from "@/components/article/ArticleWhatsNext";
import ArticleRelated from "@/components/article/ArticleRelated";
import ArticleNextStory from "@/components/article/ArticleNextStory";
import ArticleSidebar from "@/components/article/ArticleSidebar";
import ArticleAstroBanner from "@/components/article/ArticleAstroBanner";


export const dynamic = "force-dynamic";
export const revalidate = 0;



type Props = {

  params: Promise<{

    slug:string;

  }>;

};




const SITE_URL =
process.env.NEXT_PUBLIC_SITE_URL ||
"https://nationpathindia.com";







function cleanText(html:string){

return html

.replace(/<\/?[^>]+(>|$)/g,"")

.replace(/\s+/g," ")

.trim();

}







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

params

}:Props):Promise<Metadata>{


const {slug}=await params;



const article =
await prisma.article.findFirst({

where:{

slug,

status:"approved",

isDeleted:false,

isEditorial:true,

...isPublishedFilter()

}

});



if(!article){

return {

title:"Editorial | Nation Path India"

};

}




const title =

article.metaTitle ||

article.title;



const description =

article.metaDescription ||

article.excerpt ||

"Editorial analysis from Nation Path India";




const canonical =

`${SITE_URL}/editorial/${article.slug}`;





return {


title,


description,



alternates:{

canonical

},



robots:{

index:true,

follow:true

},




keywords:[

"Editorial",

"Opinion",

"Analysis",

"Nation Path India",

article.title

],




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

[article.images[0]]

:

[]


}


};


}
export default async function EditorialArticle({

params

}:Props){



const {slug}=await params;





/*
=====================================================
 EDITORIAL FETCH
=====================================================
*/


const article =

await prisma.article.findFirst({

where:{


slug,


status:"approved",


isDeleted:false,


isEditorial:true,


...isPublishedFilter()


}


});





if(!article){

return notFound();

}







/*
=====================================================
 VIEW TRACKING
=====================================================
*/


try{


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


}

catch(error){


console.error(

"EDITORIAL VIEW UPDATE ERROR:",

error

);


}








/*
=====================================================
 READING TIME
=====================================================
*/


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
 EDITORIAL URL
=====================================================
*/


const editorialUrl =

`${SITE_URL}/editorial/${article.slug}`;








/*
=====================================================
 RELATED EDITORIALS
=====================================================
*/


const related =

await prisma.article.findMany({

where:{


status:"approved",


isDeleted:false,


isEditorial:true,



NOT:{


id:article.id


}


},



orderBy:{


createdAt:"desc"


},



take:6



});







/*
=====================================================
 NEXT EDITORIAL
=====================================================
*/


const nextEditorial =

await prisma.article.findFirst({

where:{


status:"approved",


isDeleted:false,


isEditorial:true,



id:{


not:article.id


}


},



orderBy:{


createdAt:"desc"


}


});







/*
=====================================================
 SCHEMA
=====================================================
*/


const editorialSchema = {


"@context":"https://schema.org",


"@type":"Article",



"@id":editorialUrl,



headline:article.title,



description:

article.metaDescription ||

article.excerpt ||

"",





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

(

article.publishedAt ||

article.createdAt

).toISOString(),





dateModified:

(

article.updatedAt ||

article.createdAt

).toISOString(),





articleSection:"Editorial",





inLanguage:"en-IN",




wordCount,




timeRequired:

`PT${readingTime}M`,






mainEntityOfPage:{


"@type":"WebPage",


"@id":editorialUrl


},






author:{


"@type":"Organization",


name:"Nation Path India",


url:SITE_URL


},





publisher:{


"@type":"Organization",


name:"Nation Path India",


url:SITE_URL,



logo:{


"@type":"ImageObject",


url:`${SITE_URL}/logo.png`


}



}



};
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

__html:

JSON.stringify(editorialSchema)

}}

/>








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

className="hover:text-[#163C80]"

>

Home

</Link>





<span className="mx-2">

/

</span>






<Link

href="/editorial"

className="hover:text-[#163C80]"

>

Editorial

</Link>






<span className="mx-2">

/

</span>






<span>

{article.title}

</span>



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

category={{

name:"Editorial",

slug:"editorial"

}}

readingTime={readingTime}

/>









{/* ================= HERO ================= */}



<ArticleHero

images={article.images}

title={article.title}

shareUrl={editorialUrl}

/>











{/* ================= AI SUMMARY ================= */}


{

article.aiSummary &&

<ArticleAISummary

categoryName="Editorial"

summary={article.aiSummary as any}

/>

}









{/* ================= SHORT BRIEF ================= */}



<ArticleShortBrief

shortBrief={

article.shortBrief || ""

}

/>









{/* ================= INTELLIGENCE ================= */}



<ArticleIntelligence


background={article.background}


timeline={article.timeline}



expertOpinion={article.expertOpinion}



factCheck={article.factCheck}



keyTakeaways={article.keyTakeaways}



sourceDesk={
  typeof article.sourceDesk === "string"
    ? article.sourceDesk
    : null
}


/>









{/* ================= BODY ================= */}



<ArticleBody


content={article.content}


keyHighlights={article.keyHighlights}


whyItMatters={article.whyItMatters}


/>









{/* ================= WHAT NEXT ================= */}



<ArticleWhatsNext


whatsNext={article.whatsNext || ""}


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

article={nextEditorial}

/>









{/* ================= RELATED ================= */}



<ArticleRelated

articles={related}

/>









{/* ================= ASTRO CROSS PRODUCT ================= */}



<ArticleAstroBanner


categoryName="Editorial"


categorySlug="editorial"


/>








</main>








{/* ================= SIDEBAR ================= */}



<aside

className="
hidden
lg:block
"

>



<div

className="
sticky
top-24
space-y-6
"

>



<ArticleSidebar

mostRead={related}

/>





<AdRenderer

placement="sidebar"

/>





</div>



</aside>









</div>







</div>

);

}