//////////////////////////////////////////////////////////////
//
// NATIONPATH INDIA
//
// GOOGLE NEWS SITEMAP
//
// SEO DISCOVERY ROUTE
//
//////////////////////////////////////////////////////////////


import { prisma } from "@/lib/prisma";



export const dynamic = "force-dynamic";




const SITE_URL =

process.env.NEXT_PUBLIC_SITE_URL ||

"https://nationpathindia.com";





/*
====================================================
 XML SAFE ESCAPE
====================================================
*/


function escapeXml(value:string){

return value

.replace(/&/g,"&amp;")

.replace(/</g,"&lt;")

.replace(/>/g,"&gt;")

.replace(/"/g,"&quot;")

.replace(/'/g,"&apos;");

}




/*
====================================================
 GOOGLE NEWS SITEMAP
====================================================
*/


export async function GET(){


try{



const articles =

await prisma.article.findMany({


where:{


status:"approved",


isDeleted:false,


isAstrology:false,


publishedAt:{


not:null


}



},



orderBy:{


publishedAt:"desc"


},



take:100,



select:{


title:true,


slug:true,


publishedAt:true,



category:{


select:{


slug:true


}


}



}



});






const urls = articles

.map((article)=>{



const categorySlug =

article.category?.slug || "news";





const articleUrl =

`${SITE_URL}/${categorySlug}/${article.slug}`;






return `

<url>


<loc>

${escapeXml(articleUrl)}

</loc>



<news:news>


<news:publication>


<news:name>

Nation Path India

</news:name>


<news:language>

en

</news:language>


</news:publication>





<news:publication_date>

${article.publishedAt?.toISOString()}

</news:publication_date>





<news:title>

<![CDATA[

${article.title}

]]>

</news:title>




</news:news>



</url>

`;



})

.join("");






const xml =

`<?xml version="1.0" encoding="UTF-8"?>


<urlset

xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"

xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"

>


${urls}


</urlset>

`;






return new Response(

xml,

{

headers:{


"Content-Type":

"application/xml; charset=utf-8",



"Cache-Control":

"public, max-age=3600, s-maxage=3600"



}

}

);





}

catch(error){



console.error(

"NEWS SITEMAP ERROR:",

error

);



return new Response(

"Unable to generate news sitemap",

{

status:500

}

);



}



}