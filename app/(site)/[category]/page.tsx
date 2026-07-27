import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import AdRenderer from "@/components/ads/AdRenderer";

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

      title:"Nation Path"

    };

  }



  const url =
  `https://www.nationpathindia.com/${category.slug}`;



  return {


    title:
    `${category.name} News, Breaking News & Analysis | Nation Path`,


    description:
    `Latest ${category.name} news, breaking updates, expert analysis and top stories from Nation Path India.`,


    alternates:{

      canonical:url

    },


    openGraph:{


      title:
      `${category.name} News | Nation Path`,


      description:
      `Latest ${category.name} news, updates and analysis.`,


      url,


      siteName:
      "Nation Path India",


      type:
      "website",


      locale:
      "en_IN"


    },


    twitter:{


      card:
      "summary_large_image",


      title:
      `${category.name} News | Nation Path`,


      description:
      `Latest ${category.name} news and breaking stories.`


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


     isAstrology:false


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


     isDeleted:false


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
 `https://www.nationpathindia.com/${category.slug}`;





 /* ================= STRUCTURED DATA ================= */


 const structuredData={


 "@context":
 "https://schema.org",


 "@type":
 "CollectionPage",


 name:
 `${category.name} News`,


 url:
 categoryUrl


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

 position:1,

 name:"Home",

 item:
 "https://www.nationpathindia.com"

 },


 {

 "@type":
 "ListItem",

 position:2,

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