import { prisma } from "@/lib/prisma";
import { PostStatus } from "@prisma/client";
import type { Metadata } from "next";

import {
  getActiveHomepageCategories,
} from "@/config/homepageCategories";


/*
====================================================
 HOMEPAGE COMPONENTS
====================================================
*/

import FuturePlatformBanner 
from "@/components/home/FuturePlatformBanner";


import AdRenderer 
from "@/components/ads/AdRenderer";

import LeadStory 
from "@/components/home/LeadStory";

import BreakingSpotlight 
from "@/components/home/BreakingSpotlight";

import FeaturedGrid 
from "@/components/home/FeaturedGrid";

import CategoryBlock 
from "@/components/home/CategoryBlock";

import PollOfDay 
from "@/components/home/PollOfDay";

import LatestNews 
from "@/components/home/LatestNews";

import EditorialSection 
from "@/components/home/EditorialSection";

import dynamic from "next/dynamic";


const AstrologyWidget = dynamic(
  () => import("@/components/home/AstrologyWidget"),
  {
    ssr:false
  }
);

/*
====================================================
 SIDEBAR COMPONENTS
====================================================
*/

import TrendingTopics 
from "@/components/sidebar/TrendingTopics";

import WeatherWidget 
from "@/components/sidebar/WeatherWidget";

import TrendingNews 
from "@/components/sidebar/TrendingNews";

import MostRead 
from "@/components/sidebar/MostRead";

import TopStories 
from "@/components/sidebar/TopStories";



export const revalidate = 60;



const SITE_URL =
process.env.NEXT_PUBLIC_SITE_URL ||
"https://nationpathindia.com";
function publishedFilter(){

  return {

    OR:[

      {
        publishedAt:null
      },

      {
        publishedAt:{
          lte:new Date()
        }
      }

    ]

  };

}






export const metadata: Metadata = {


title:
"Nation Path India | Breaking News, Defence, Politics, Astro Intelligence & Knowledge Platform",



description:

"Nation Path India delivers trusted journalism covering politics, defence, international affairs, economy, business, technology, science, sports, astrology intelligence and future knowledge platforms.",



metadataBase:
new URL(SITE_URL),



alternates:{
canonical:"/"
},



robots:{
index:true,
follow:true
},



keywords:[

"India news",

"breaking news India",

"politics news India",

"defence news India",

"international news",

"economy news",

"business news",

"technology news",

"science news",

"health news",

"education news",

"environment news",

"sports news",

"vedic astrology",

"horoscope India",

"zodiac insights",

"kids learning platform",

"Nation Path India"

],



openGraph:{


type:"website",

url:SITE_URL,


siteName:
"Nation Path India",



title:
"Nation Path India | News, Astro Intelligence & Knowledge Platform",



description:

"Independent journalism, intelligence-based content and future digital experiences from India.",



images:[

{
url:`${SITE_URL}/logo.png`,
width:1200,
height:630,
alt:"Nation Path India"
}

]


}


};









export default async function Home(){



let articles:any[] = [];

let mostRead:any[] = [];

let editorials:any[] = [];







/*
====================================================
 OPTIMIZED HOMEPAGE DATABASE FETCH
====================================================

Before:

Query 1
wait
Query 2
wait
Query 3

Now:

All independent queries execute together.

====================================================
*/



try{


const [

articlesData,

mostReadData,

editorialsData,


] = await Promise.all([



prisma.article.findMany({


where:{

status:PostStatus.approved,

isDeleted:false,

isEditorial:false,

isAstrology:false,

...publishedFilter()

},


include:{


category:true


},



orderBy:{


createdAt:"desc"


},



take:40


}),






prisma.article.findMany({

where:{


status:PostStatus.approved,


isDeleted:false,


...publishedFilter()


},


include:{


category:true


},



orderBy:{


views:"desc"


},



take:5


}),






prisma.article.findMany({

where:{


status:PostStatus.approved,


isDeleted:false,


isEditorial:true,


...publishedFilter()


},


include:{


category:true


},



orderBy:{


createdAt:"desc"


},



take:6


})



]);





articles = articlesData;

mostRead = mostReadData;

editorials = editorialsData;



}

catch(error){


console.error(

"Homepage Data Error",

error

);


}







/*
====================================================
 HOMEPAGE DATA PREPARATION
====================================================
*/



const hero =
articles[0] || null;



const topStories =
articles.slice(1,5);



const featureGrid =
articles.slice(5,9);



const latest =
articles.slice(12,24);







const homepageCategories =
getActiveHomepageCategories();







const getCategoryArticles = (

slug:string,

limit:number = 4

)=>{


return articles

.filter(

(article:any)=>

article?.category?.slug === slug

)

.slice(0,limit);



};







const breaking =

articles

.slice(0,10)

.map(

(article:any)=>(


{

id:String(article.id),

title:
article.title,


slug:
article.slug,



excerpt:

article.excerpt ||

article.content
?.replace(/<[^>]+>/g,"")
.slice(0,160)
||

"",




category:{


name:

article.category?.name ||

"News",



slug:

article.category?.slug ||

""


},



views:

article.views || 0


}



)

);
return (

<>

<script

type="application/ld+json"

dangerouslySetInnerHTML={{


__html:

JSON.stringify({


"@context":"https://schema.org",


"@type":"NewsMediaOrganization",


"name":"Nation Path India",


"url":SITE_URL,


"description":

"Independent journalism, astrology intelligence and knowledge experiences from India."


})


}}


/>







<main

id="main-content"

className="
news-container
"

>









{/* ==================================================
    TOP AD
================================================== */}


<div

className="
flex
justify-center
mb-8
"

>


<AdRenderer

placement="homepage_top"

/>


</div>





{/* ==================================================
    BRAND INTRO
================================================== */}



<section

className="
mb-12
"

>


<h1

className="
font-[var(--news-heading-font)]
text-3xl
sm:text-4xl
lg:text-5xl
font-semibold
leading-tight
tracking-[-0.02em]
text-[var(--news-text)]
max-w-5xl
"

>


Independent Journalism.
National Perspective.


</h1>








<p

className="
news-body
mt-4
max-w-3xl
"

>


Covering politics, defence, international affairs,
economy, business, technology, science, sports,
astrology intelligence and knowledge experiences
shaping India.


</p>



</section>









{/* ==================================================
    MAIN GRID
================================================== */}


<div

className="
grid
grid-cols-1
lg:grid-cols-12
gap-8
lg:gap-12
"

>









{/* ================= LEFT CONTENT ================= */}


<div

className="
lg:col-span-8
space-y-14
"

>





<LeadStory

article={hero}

/>








<BreakingSpotlight

items={breaking}

/>









<FeaturedGrid

articles={featureGrid}

/>









{/* ==================================================
    DYNAMIC CATEGORY SECTIONS
================================================== */}


{

homepageCategories.map(

(category)=>{


const categoryArticles =

getCategoryArticles(

category.slug

);



if(!categoryArticles.length)

return null;





return (

<CategoryBlock

key={category.slug}

title={category.title}

slug={category.slug}

description={category.description}

articles={categoryArticles}

/>


);


}


)

}









<PollOfDay />









<div

className="
flex
justify-center
py-8
"

>


<AdRenderer

placement="homepage_mid"

/>


</div>









<LatestNews

articles={latest}

/>








<EditorialSection

articles={editorials}

/>





</div>













{/* ================= SIDEBAR ================= */}


<aside

className="
lg:col-span-4
space-y-6
lg:sticky
lg:top-24
h-fit
"

>





<TrendingTopics />








<WeatherWidget />








<TrendingNews />








<MostRead

articles={mostRead}

/>








<TopStories

articles={topStories}

/>








<div

className="
flex
justify-center
"

>


<AdRenderer

placement="homepage_sidebar_top"

/>


</div>





</aside>









</div>









{/* ==================================================
    ASTRO INTELLIGENCE WIDGET
================================================== */}



<section

className="
mt-16
"

>


<AstrologyWidget

  horoscopes={[]}

/>


</section>









{/* ==================================================
    FUTURE KNOWLEDGE PLATFORM
================================================== */}



<section

className="
mt-16
"

>


<FuturePlatformBanner />


</section>









{/* ==================================================
    BOTTOM AD
================================================== */}



<div

className="
flex
justify-center
my-12
"

>


<AdRenderer

placement="homepage_bottom"

/>



</div>








</main>






</>

);


}