// ============================================
// NationPath AI News Importer
// Main Parser Engine v5 LOCK VERSION
//
// Raw News
// ↓
// Section Extraction
// ↓
// ParsedArticle Intelligence
// ↓
// Validation
// ↓
// CMS Mapper
// ============================================


import type {

  ImporterInput,

  ParsedArticle,

  ImporterResponse

} from "./types";



import {

  normalizeImporterInput

} from "./normalizer";



import {

  extractSections,

  sectionsToMap

} from "./sections";



import {

  parseFAQ

} from "./faq";



import {

  parseTimeline

} from "./timeline";



import {

  parseSEO

} from "./seo";



import {

  parseKeywords

} from "./keywords";



import {

  validateArticle

} from "./validator";



import {

  mapToCMS

} from "./mapper";








// ============================================
// Markdown Cleaner
// ============================================

function cleanText(
  text?:string
):string {


  if(!text){

    return "";

  }


  return text

    .replace(
      /\*\*/g,
      ""
    )

    .replace(
      /^---$/gm,
      ""
    )

    .replace(
      /^#+\s*/gm,
      ""
    )

    .trim();

}







// ============================================
// Text Array Parser
// ============================================

function parseList(
  text?:string
):string[] {


  if(!text){

    return [];

  }


  return cleanText(text)

    .split("\n")

    .map(item =>

      item

      .replace(
        /^[•*-]\s*/,
        ""
      )

      .trim()

    )

    .filter(

      item =>
        item.length > 2

    );

}








// ============================================
// Headline Extractor
// ============================================

function extractHeadline(
  raw:string
):string {


  const markdownTitle =

    raw.match(
      /^#\s+\*{0,2}(.+?)\*{0,2}$/m
    );



  if(markdownTitle){

    return cleanText(
      markdownTitle[1]
    );

  }




  return (

    cleanText(

      raw

      .split("\n")

      .map(
        x=>x.trim()
      )

      .find(Boolean)

    )

    ||

    "NationPath News Article"

  );

}








// ============================================
// Fallback Section Creator
// ============================================

function createFallbackSectionMap(
  rawText:string
):Record<string,string>{


  const clean =
    cleanText(
      rawText
    );



  const lines =

    clean

    .split("\n")

    .map(
      x=>x.trim()
    )

    .filter(Boolean);




  const headline =
    extractHeadline(
      rawText
    );



  const body =

    lines

    .filter(

      line =>
        line !== headline

    )

    .join("\n\n");




  return {


    headline,


    brief:

      body.substring(
        0,
        300
      ),


    body,


    background:"",


    expertOpinion:"",


    factCheck:"",


    sourceDesk:"",


    whyItMatters:"",


    whatsNext:"",


    keyHighlights:"",


    keyTakeaways:"",


    faq:"",


    timeline:"",


    imageGallery:"",


    quality:"",


    headlineIntelligence:"",


    imageCaption:"",


    imageAlt:"",


    metaKeywords:""


  };


}








// ============================================
// Normalize Sections
// ============================================

function normalizeSectionMap(

  map:Record<string,string>,

  raw:string

):Record<string,string>{


  const result = {

    ...map

  };




  if(!result.headline){


    result.headline =

      extractHeadline(
        raw
      );


  }



  return result;

}








// ============================================
// Build Parsed Article
// ============================================

function buildParsedArticle(

  sectionMap:Record<string,string>

):ParsedArticle {



  const seo =

    parseSEO(
      sectionMap
    );





  return {



    seoTitle:

      cleanText(
        sectionMap.seoTitle
      )

      ||

      seo.metaTitle,





    slug:

      cleanText(
        sectionMap.slug
      )

      ||

      seo.slug,





    metaDescription:

      cleanText(
        sectionMap.metaDescription
      )

      ||

      seo.metaDescription,





    metaKeywords:

      parseKeywords(
        cleanText(
          sectionMap.metaKeywords
        )
      ),





    headline:

      cleanText(
        sectionMap.headline
      )

      ||

      "NationPath News Article",





    brief:

      cleanText(
        sectionMap.brief
      ),





    body:

      cleanText(
        sectionMap.body
      ),





    background:

      cleanText(
        sectionMap.background
      ),





    whyItMatters:

      cleanText(
        sectionMap.whyItMatters
      ),





    whatsNext:

      cleanText(
        sectionMap.whatsNext
      ),





    keyHighlights:

      parseList(
        sectionMap.keyHighlights
      ),





    keyTakeaways:

      parseList(
        sectionMap.keyTakeaways
      ),





    timeline:

      parseTimeline(
        cleanText(
          sectionMap.timeline
        )
      ),





    expertOpinion:

      parseList(
        sectionMap.expertOpinion
      )
      .map(
        item => ({

          name:"",

          opinion:item

        })

      ),





    factCheck:

      parseList(
        sectionMap.factCheck
      )
      .map(
        item => ({

          claim:item,

          status:
            "pending"

        })

      ),





    sourceDesk:

      cleanText(
        sectionMap.sourceDesk
      ),





    faq:

      parseFAQ(
        cleanText(
          sectionMap.faq
        )
      ),






    headlineIntelligence:{

      reasoning:

        cleanText(
          sectionMap.headlineIntelligence
        )

    },





    quality:{

      factCheckStatus:

        "pending",


      editorialReviewStatus:

        "pending"

    },





    imageGallery:[],





    image:{


      caption:

        cleanText(
          sectionMap.imageCaption
        ),



      altText:

        cleanText(
          sectionMap.imageAlt
        )


    }



  };


}








// ============================================
// Main Import Parser
// ============================================

export function parseNewsImport(

  input:ImporterInput

):ImporterResponse {



  try {



    const normalized =

      normalizeImporterInput(
        input
      );




    const sections =

      extractSections(
        normalized.rawText
      );




    let sectionMap =

      sectionsToMap(
        sections
      );





    if(

      Object.keys(sectionMap).length === 0

      &&

      normalized.rawText.length > 100

    ){


      sectionMap =

        createFallbackSectionMap(
          normalized.rawText
        );


    }






    sectionMap =

      normalizeSectionMap(

        sectionMap,

        normalized.rawText

      );






    if(

      sectionMap.introduction

      &&

      sectionMap.body

    ){


      sectionMap.body =

        cleanText(
          sectionMap.introduction
        )

        +

        "\n\n"

        +

        cleanText(
          sectionMap.body
        );


    }






    const parsedArticle =

      buildParsedArticle(
        sectionMap
      );






    const validation =

      validateArticle(
        parsedArticle
      );





    if(!validation.valid){


      return {

        success:false,

        validation,

        error:
          "Article validation failed"

      };


    }






    const article =

      mapToCMS(
        parsedArticle
      );





    return {


      success:true,


      article,


      validation


    };





  }

  catch(error){



    return {


      success:false,


      error:

        error instanceof Error

        ?

        error.message

        :

        "Unknown importer error"


    };


  }


}

