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




const SITE_URL =

process.env.NEXT_PUBLIC_SITE_URL ||

"https://nationpathindia.com";





export default function robots(): MetadataRoute.Robots {


return {


rules:[


{


userAgent:"*",



allow:"/",




disallow:[


"/admin",


"/api",


"/dashboard",


"/login",


"/register",


"/search",


"/_next",


"/test",


],


},



],





sitemap:[


`${SITE_URL}/sitemap.xml`,


`${SITE_URL}/news-sitemap.xml`,


],





host:SITE_URL,



};



}