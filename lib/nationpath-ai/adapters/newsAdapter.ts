//////////////////////////////////////////////////////////////
// NATIONPATH AI NEWS ADAPTER
//
// News Intelligence Pipeline Connector
//
// Pipeline:
//
// Raw News
//    ↓
// Analyzer
//    ↓
// Headline Intelligence
//    ↓
// Article Writer
//    ↓
// Editorial Intelligence
//    ↓
// SEO Intelligence
//    ↓
// CMS Mapper
//
// NO OPENAI
// NO EXTERNAL PROVIDER
//
// NationPath AI Core v1
//////////////////////////////////////////////////////////////


import type {

  NewsGenerationRequest,

  NewsAIOutput

} from "../types";



import {

  analyzeNews

} from "../news/analyzer";



import {

  generateHeadlines

} from "../news/headline";



import {

  generateNewsArticleContent

} from "../news/writer";



import {

  generateNewsIntelligence

} from "../news/intelligence";



import {

  generateNewsSEO

} from "../news/seo";



import {

  mapNewsToArticle

} from "../news/mapper";








//////////////////////////////////////////////////////////////
// NEWS AI VERSION
//////////////////////////////////////////////////////////////

const NEWS_AI_VERSION =

  "news-core-v1";









//////////////////////////////////////////////////////////////
// MAIN NEWS EXECUTION
//////////////////////////////////////////////////////////////

export async function generateNewsArticle(


  request:NewsGenerationRequest


):Promise<NewsAIOutput>{





 const startTime =

   Date.now();






 try {



  ////////////////////////////////////////////////////////////
  // STEP 1
  // NEWS UNDERSTANDING
  ////////////////////////////////////////////////////////////

  const analysis =

    analyzeNews(

      request

    );







  ////////////////////////////////////////////////////////////
  // STEP 2
  // HEADLINE INTELLIGENCE
  ////////////////////////////////////////////////////////////

  const headlines =

    generateHeadlines(


      request.rawNews,


      analysis


    );








  ////////////////////////////////////////////////////////////
  // STEP 3
  // ARTICLE GENERATION
  ////////////////////////////////////////////////////////////

  const articleDraft =

    generateNewsArticleContent(


      headlines.primary,


      request.rawNews,


      analysis


    );








  ////////////////////////////////////////////////////////////
  // STEP 4
  // EDITORIAL INTELLIGENCE
  ////////////////////////////////////////////////////////////

  const intelligence =

    generateNewsIntelligence(


      request.rawNews,


      analysis


    );








  ////////////////////////////////////////////////////////////
  // STEP 5
  // SEO INTELLIGENCE
  ////////////////////////////////////////////////////////////

  const seo =

    generateNewsSEO(


      headlines.primary,


      articleDraft.content,


      analysis


    );








  ////////////////////////////////////////////////////////////
  // STEP 6
  // CMS FINAL MAPPING
  ////////////////////////////////////////////////////////////

  const article =

    mapNewsToArticle(


      {


        headline:{


          primary:

            headlines.primary,



          slug:

            headlines.slug



        },





        article:{


          content:

            articleDraft.content,



          shortBrief:

            articleDraft.shortBrief



        },





        intelligence,





        seo,





        sourceDesk:

          request.source
          ||
          "NationPath News Desk"



      },



      analysis


    );








  ////////////////////////////////////////////////////////////
  // FINAL RESPONSE
  ////////////////////////////////////////////////////////////

  return {


    analysis,



    article,



    meta:{


      engine:

        "NationPath News Intelligence",



      version:

        NEWS_AI_VERSION,



      durationMs:

        Date.now()
        -
        startTime,



      requiresHumanReview:

        true



    }



  };






 }

 catch(error){



  console.error(


    "[NATIONPATH_NEWS_AI_ERROR]",


    {


      error,


      category:

        request.category,



      source:

        request.source


    }


  );




  throw error;



 }



}









//////////////////////////////////////////////////////////////
// METADATA
//////////////////////////////////////////////////////////////

export function getNewsAIInfo(){



 return {


   engine:

     "NationPath News Intelligence",



   version:

     NEWS_AI_VERSION,



   provider:

     "nationpath-ai",



   capabilities:[


     "news-analysis",


     "headline-generation",


     "article-writing",


     "editorial-intelligence",


     "seo-generation"


   ]



 };



}