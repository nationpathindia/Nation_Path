//////////////////////////////////////////////////////////////
//
// NATIONPATH INDIA
//
// ROBOTS CONFIGURATION
//
// PUBLIC SEO CRAWLING CONTROL
//
//////////////////////////////////////////////////////////////

import { MetadataRoute } from "next";



export default function robots(): MetadataRoute.Robots {


  const baseUrl = "https://nationpathindia.com";



  return {


    rules: [

      {


        userAgent: "*",


        allow: "/",


        disallow: [

          "/admin",

          "/api",

          "/dashboard",

          "/login",

          "/register",

          "/_next",

          "/test",

        ],


      },


    ],




    sitemap: [

      `${baseUrl}/sitemap.xml`,

      `${baseUrl}/news-sitemap.xml`,

    ],




    host: baseUrl,


  };


}