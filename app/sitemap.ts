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





//////////////////////////////////////////////////////////////
// SITEMAP
//////////////////////////////////////////////////////////////

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {


  try {


    const baseUrl = "https://nationpathindia.com";




    ////////////////////////////////////////////////////////////
    // ARTICLES
    ////////////////////////////////////////////////////////////

    const articles = await prisma.article.findMany({

      where: {

        status: "approved",

        isDeleted: false,

      },


      select: {

        slug: true,

        updatedAt: true,


        category: {

          select: {

            slug: true,

          },

        },

      },

    });





    const articleUrls = articles

      .filter(

        (article) => article.category?.slug

      )

      .map((article) => ({


        url:

          `${baseUrl}/${article.category!.slug}/${article.slug}`,


        lastModified:

          article.updatedAt,


        changeFrequency:

          "daily" as const,


        priority:

          0.9,


      }));







    ////////////////////////////////////////////////////////////
    // CATEGORIES
    ////////////////////////////////////////////////////////////

    const categories = await prisma.category.findMany({

      select: {

        slug: true,

      },

    });





    const categoryUrls = categories.map((category) => ({


      url:

       `${baseUrl}/${category.slug}`,


      lastModified:

        new Date(),


      changeFrequency:

        "daily" as const,


      priority:

        0.8,


    }));







    ////////////////////////////////////////////////////////////
    // ASTRO PUBLIC PAGES
    ////////////////////////////////////////////////////////////

    const astroPages = [


      {

        url:

          `${baseUrl}/astro/horoscope`,


        lastModified:

          new Date(),


        changeFrequency:

          "daily" as const,


        priority:

          0.95,


      },


      {

        url:

          `${baseUrl}/astro/kundali`,


        lastModified:

          new Date(),


        changeFrequency:

          "monthly" as const,


        priority:

          0.8,


      },


      {

        url:

          `${baseUrl}/astro/lagna`,


        lastModified:

          new Date(),


        changeFrequency:

          "monthly" as const,


        priority:

          0.7,


      },


      {

        url:

          `${baseUrl}/astro/nakshatra`,


        lastModified:

          new Date(),


        changeFrequency:

          "monthly" as const,


        priority:

          0.7,


      },


    ];








    ////////////////////////////////////////////////////////////
    // STATIC WEBSITE PAGES
    ////////////////////////////////////////////////////////////

    const staticPages = [


      {

        url:

          baseUrl,


        lastModified:

          new Date(),


        changeFrequency:

          "daily" as const,


        priority:

          1,

      },


      {

        url:

          `${baseUrl}/about`,


        lastModified:

          new Date(),


        changeFrequency:

          "monthly" as const,


        priority:

          0.7,

      },


      {

        url:

          `${baseUrl}/contact`,


        lastModified:

          new Date(),


        changeFrequency:

          "monthly" as const,


        priority:

          0.7,

      },


      {

        url:

          `${baseUrl}/advertise`,


        lastModified:

          new Date(),


        changeFrequency:

          "monthly" as const,


        priority:

          0.6,

      },


      {

        url:

          `${baseUrl}/privacy-policy`,


        lastModified:

          new Date(),


        changeFrequency:

          "yearly" as const,


        priority:

          0.3,

      },


      {

        url:

          `${baseUrl}/terms`,


        lastModified:

          new Date(),


        changeFrequency:

          "yearly" as const,


        priority:

          0.3,

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