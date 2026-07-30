//////////////////////////////////////////////////////////////
//
// NATIONPATH INDIA
//
// DYNAMIC XML SITEMAP
//
// NEWS + ASTRO PUBLIC EXPERIENCE
//
//////////////////////////////////////////////////////////////

import { prisma } from "@/lib/prisma";

import { MetadataRoute } from "next";


export const dynamic = "force-dynamic";



const SITE_URL =

process.env.NEXT_PUBLIC_SITE_URL ||

"https://nationpathindia.com";





export default async function sitemap():

Promise<MetadataRoute.Sitemap> {


try {



//////////////////////////////////////////////////////////////
// ARTICLES
//////////////////////////////////////////////////////////////


const articles =

await prisma.article.findMany({


where:{


status:"approved",


isDeleted:false,


isAstrology:false,


},


select:{


slug:true,


updatedAt:true,


category:{


select:{


slug:true


}


}


},


take:5000


});




const articleUrls =

articles

.filter(

(article)=>

article.category?.slug

)

.map((article)=>({


url:

`${SITE_URL}/${article.category!.slug}/${article.slug}`,


lastModified:

article.updatedAt,


changeFrequency:

"daily" as const,


priority:

0.9,


}));







//////////////////////////////////////////////////////////////
// CATEGORIES
//////////////////////////////////////////////////////////////


const categories =

await prisma.category.findMany({


where:{


status:"active"


},


select:{


slug:true


}


});




const categoryUrls =

categories.map((category)=>({


url:

`${SITE_URL}/${category.slug}`,


lastModified:

new Date(),


changeFrequency:

"daily" as const,


priority:

0.8,


}));







//////////////////////////////////////////////////////////////
// ASTRO PUBLIC PAGES
//////////////////////////////////////////////////////////////


const astroPages = [


"/astro/horoscope",

"/astro/kundali",

"/astro/lagna",

"/astro/nakshatra",


].map((path)=>({


url:

`${SITE_URL}${path}`,


lastModified:

new Date(),


changeFrequency:

"monthly" as const,


priority:

0.8,


}));








//////////////////////////////////////////////////////////////
// STATIC PAGES
//////////////////////////////////////////////////////////////


const staticPages = [


{

url:SITE_URL,

lastModified:new Date(),

changeFrequency:"daily" as const,

priority:1,


},


{

url:`${SITE_URL}/about`,

lastModified:new Date(),

changeFrequency:"monthly" as const,

priority:0.7,


},


{

url:`${SITE_URL}/contact`,

lastModified:new Date(),

changeFrequency:"monthly" as const,

priority:0.7,


},


{

url:`${SITE_URL}/advertise`,

lastModified:new Date(),

changeFrequency:"monthly" as const,

priority:0.6,


},


{

url:`${SITE_URL}/privacy-policy`,

lastModified:new Date(),

changeFrequency:"yearly" as const,

priority:0.3,


},


{

url:`${SITE_URL}/terms`,

lastModified:new Date(),

changeFrequency:"yearly" as const,

priority:0.3,


},


];







return [

...staticPages,

...astroPages,

...categoryUrls,

...articleUrls,

];



}

catch(error){


console.error(

"SITEMAP ERROR:",

error

);



return [];


}



}