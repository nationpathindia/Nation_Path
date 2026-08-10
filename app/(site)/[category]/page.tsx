import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import AdRenderer from "@/components/ads/AdRendererClient";

import CategoryHeader from "@/components/category/CategoryHeader";
import CategoryHero from "@/components/category/CategoryHero";
import CategoryLatest from "@/components/category/CategoryLatest";
import CategoryAISummary from "@/components/category/CategoryAISummary";
import CategoryAstroPreview from "@/components/category/CategoryAstroPreview";
import CategorySidebar from "@/components/category/CategorySidebar";


export const dynamic = "force-dynamic";

export const revalidate = 0;



interface Props {

  params: Promise<{
    category:string;
  }>;

}



/* =====================================================
   SITE URL
===================================================== */

const SITE_URL =
process.env.NEXT_PUBLIC_SITE_URL ||
"https://nationpathindia.com";




/* =====================================================
   GET CATEGORY
===================================================== */


async function getCategory(slug:string){

  return await prisma.category.findUnique({

    where:{
      slug
    }

  });

}




/* =====================================================
   SEO METADATA
===================================================== */


export async function generateMetadata({

  params,

}:Props):Promise<Metadata>{


  const {category:slug}=await params;


  const category =
  await getCategory(slug);



  if(!category){

    return {

      title:"Nation Path India"

    };

  }



  const url =
  `${SITE_URL}/${category.slug}`;



  return {

    title:
    `${category.name} News, Latest Updates & Analysis | Nation Path India`,


    description:
    `Get the latest ${category.name} news, breaking updates, expert analysis and important stories from Nation Path India.`,


    alternates:{

      canonical:url

    },


    robots:{

      index:true,

      follow:true

    },


   openGraph:{

  title:
  `${category.name} News | Nation Path India`,

  description:
  `Latest ${category.name} news, updates, analysis and stories from Nation Path India.`,

  url,

  siteName:
  "Nation Path India",

  type:
  "website",

  locale:
  "en_IN",

  images:[
    {
      url:`${SITE_URL}/logo.png`,
      width:1200,
      height:630,
      alt:`${category.name} News | Nation Path India`
    }
  ]

},

    twitter:{


      card:
      "summary_large_image",


      title:
      `${category.name} News | Nation Path India`,


      description:
      `Latest ${category.name} news and breaking stories from Nation Path India.`


    }


  };


}

/* =====================================================
   CATEGORY PAGE
===================================================== */


export default async function CategoryPage({

 params,

}:Props){



 const {category:slug}=await params;



 const category =
 await getCategory(slug);



 if(!category){

   notFound();

 }




 /* ================= ARTICLES ================= */


 const articles =
 await prisma.article.findMany({

   where:{

  categoryId:
  category.id,

  status:
  "approved",

  isDeleted:false,

  isAstrology:false,

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

},


   include:{


     category:true


   },


   orderBy:{


     createdAt:
     "desc"


   },


   take:40


 });






 /* ================= MOST READ ================= */


 const mostRead =
 await prisma.article.findMany({

   where:{

  status:
  "approved",

  isDeleted:false,

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

},

   include:{


     category:true


   },


   orderBy:{


     views:
     "desc"


   },


   take:5


 });





 const categoryUrl =
 `${SITE_URL}/${category.slug}`;




 /* ================= ITEM LIST SCHEMA ================= */


 const itemList = articles

 .slice(0,10)

 .map(

 (article:any,index:number)=>(


 {

   "@type":"ListItem",

   "position":index + 1,

   "name":article.title,

   "url":

   `${categoryUrl}/${article.slug}`


 }


 )

 );





 /* ================= STRUCTURED DATA ================= */


 const structuredData={


 "@context":

 "https://schema.org",



 "@type":

 "CollectionPage",



 name:

 `${category.name} News`,



 description:

 `Latest ${category.name} news, breaking updates, analysis and stories from Nation Path India.`,



 url:

 categoryUrl,



 mainEntity:{


   "@type":

   "ItemList",


   itemListElement:

   itemList


 }


 };





 const breadcrumbSchema={


 "@context":

 "https://schema.org",



 "@type":

 "BreadcrumbList",



 itemListElement:[


 {

 "@type":

 "ListItem",


 position:

 1,


 name:

 "Home",


 item:

 SITE_URL


 },


 {

 "@type":

 "ListItem",


 position:

 2,


 name:

 category.name,


 item:

 categoryUrl


 }


 ]

 };
  const heroArticles =
 articles.slice(0,4);



 const latestArticles =
 articles.slice(4);





 return (

 <>


 <script

 type="application/ld+json"

 dangerouslySetInnerHTML={{


 __html:

 JSON.stringify(structuredData)


 }}

 />




 <script

 type="application/ld+json"

 dangerouslySetInnerHTML={{


 __html:

 JSON.stringify(breadcrumbSchema)


 }}

 />






 <main

 className="

 max-w-7xl

 mx-auto

 px-4

 sm:px-6

 lg:px-8

 py-10

 "

 >

 <CategoryHeader

 name={category.name}


 description={

 `Latest ${category.name} news, breaking developments, expert analysis and in-depth coverage from Nation Path India.`

 }


 />







 <div

 className="

 flex

 justify-center

 mb-10

 "

 >


 <AdRenderer

 placement="category_top"

 />


 </div>






 <div

 className="

 grid

 grid-cols-1

 lg:grid-cols-12

 gap-10

 "

 >






 <section

 className="

 lg:col-span-8

 space-y-10

 "

 >






 <CategoryHero

 articles={heroArticles}

 />







 <CategoryAISummary

 categoryName={category.name}

 />







 <CategoryLatest

 articles={latestArticles}

 />







 <CategoryAstroPreview

 categoryName={category.name}

 categorySlug={category.slug}

 />






 </section>








 <aside

 className="

 lg:col-span-4

 "

 >



 <CategorySidebar

 mostRead={mostRead}

 categoryName={category.name}

 />



 </aside>





 </div>
 




 <div

 className="

 flex

 justify-center

 mt-16

 "

 >


 <AdRenderer

 placement="category_bottom"

 />


 </div>





 </main>


 </>


 );


}