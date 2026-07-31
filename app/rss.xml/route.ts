// app/rss.xml/route.ts

import { prisma } from "@/lib/prisma";


export const dynamic = "force-dynamic";



/*
=====================================================
 SITE URL
=====================================================
*/

const SITE_URL =
process.env.NEXT_PUBLIC_SITE_URL ||
"https://nationpathindia.com";





/*
=====================================================
 XML ESCAPE
=====================================================
*/

function escapeXML(value:string){

  return value
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&apos;");

}





/*
=====================================================
 RSS FEED
=====================================================
*/

export async function GET(){


try{


const articles = await prisma.article.findMany({


where:{


status:"approved",


isDeleted:false,


isAstrology:false,


publishedAt:{


lte:new Date()


}


},



orderBy:[


{

publishedAt:"desc"

},


{

createdAt:"desc"

}


],



take:50,



include:{


category:true


}


});







const rssItems = articles.map((article)=>{



const url =

`${SITE_URL}/${article.category?.slug || "news"}/${article.slug}`;





const image =

article.images?.[0] || "";






const publishDate =

article.publishedAt ||

article.createdAt;







return `

<item>


<title><![CDATA[

${article.title}

]]></title>




<link>

${escapeXML(url)}

</link>




<guid isPermaLink="true">

${escapeXML(url)}

</guid>




<pubDate>

${new Date(publishDate).toUTCString()}

</pubDate>





<description><![CDATA[

${article.excerpt || article.title}

]]></description>






${
image

?

`

<enclosure

url="${escapeXML(image)}"

type="image/jpeg"

/>




<media:content

url="${escapeXML(image)}"

medium="image"

/>

`

:

""

}





</item>

`;



}).join("");









const xml = `<?xml version="1.0" encoding="UTF-8"?>


<rss

version="2.0"


xmlns:atom="http://www.w3.org/2005/Atom"


xmlns:media="http://search.yahoo.com/mrss/"

>




<channel>



<title><![CDATA[

Nation Path India

]]></title>





<link>

${SITE_URL}

</link>





<description><![CDATA[

Latest breaking news, political insights, defence analysis and global affairs from Nation Path India.

]]></description>






<language>

en-IN

</language>






<lastBuildDate>

${new Date().toUTCString()}

</lastBuildDate>







<atom:link

href="${SITE_URL}/rss.xml"

rel="self"

type="application/rss+xml"

/>






${rssItems}






</channel>


</rss>`;









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

"RSS ERROR:",

error

);



return new Response(

"Error generating RSS",

{

status:500

}

);



}



}