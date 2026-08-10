// ============================================
// NationPath AI News Importer
// Main Parser Engine v6.3 FINAL LOCK
//
// Raw News
// ↓
// Section Extraction
// ↓
// Intelligence Parsers
// ↓
// ParsedArticle
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
  parseFactCheck
} from "./factCheck";


import {
  validateArticle
} from "./validator";


import {
  mapToCMS
} from "./mapper";


import {
  parseExpertOpinion
} from "./expertOpinion";

// ============================================
// CLEAN TEXT
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
      /^#+\s*/gm,
      ""
    )

    .replace(
      /^---$/gm,
      ""
    )

    .trim();

}



// ============================================
// LIST PARSER
// ============================================

function parseList(
  text?:string
):string[] {


  if(!text){

    return [];

  }



  return cleanText(
    text
  )

  .split("\n")

  .map(
    item =>

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
// HEADLINE
// ============================================

function extractHeadline(
  raw:string
):string {


  const title =

    raw.match(
      /^#\s*(.+)$/m
    );



  if(title){

    return cleanText(
      title[1]
    );

  }



  return (

    cleanText(

      raw
        .split("\n")
        .map(
          x =>
            x.trim()
        )
        .find(Boolean)

    )

    ||

    "NationPath News Article"

  );

}



// ============================================
// FALLBACK MAP
// ============================================

function createFallbackSectionMap(
  rawText:string
):Record<string,string>{


  const clean =
    cleanText(
      rawText
    );



  const headline =
    extractHeadline(
      rawText
    );



  const body =

    clean

      .split("\n")

      .filter(
        line =>
          line !== headline
      )

      .join("\n\n")

      ||

      clean;



  return {


    headline,


    brief:

      body.substring(
        0,
        350
      ),



    body,



    introduction:
      body,



    articleStory:
      body,



    content:
      body,



    background:
      "",



    whyItMatters:
      "",



    whatsNext:
      "",



    keyHighlights:
      "",



    keyTakeaways:
      "",



    timeline:
      "",



    expertOpinion:
      "",



    factCheck:
      "",



    sourceDesk:
      "",



    faq:
      "",



    imageGallery:
      "",



    imageCaption:
      "",



    imageAlt:
      "",



    metaKeywords:
      ""

  };

}



// ============================================
// NORMALIZE SECTION MAP
// ============================================

function normalizeSectionMap(

  map:Record<string,string>,

  raw:string

){


  const result = {

    ...map

  };



  if(
    !result.headline
  ){

    result.headline =
      extractHeadline(
        raw
      );

  }



  if(
    !result.body
  ){


    result.body =

      result.introduction

      ||

      result.articleStory

      ||

      result.content

      ||

      raw;


  }



  return result;

}

// ============================================
// BUILD ARTICLE
// ============================================

function buildParsedArticle(
  sectionMap:Record<string,string>
):ParsedArticle {


  const seo =
    parseSEO(
      sectionMap
    );



  return {


    // =========================
    // SEO
    // =========================

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
  seo.keywords || [],



    // =========================
    // CORE
    // =========================

    headline:

      cleanText(
        sectionMap.headline
      )

      ||

      "NationPath News Article",



    brief:

      cleanText(
        sectionMap.brief
      )

      ||

      cleanText(
        sectionMap.body
      )
      .substring(
        0,
        350
      ),



    body:

      cleanText(
        sectionMap.body
      )

      ||

      cleanText(
        sectionMap.introduction
      )

      ||

      cleanText(
        sectionMap.articleStory
      ),



    // =========================
    // EDITORIAL INTELLIGENCE
    // =========================

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
        sectionMap.timeline
      ),



    // =========================
    // EXPERT OPINION
    // Temporary safe mapper
    // Parser upgrade later
    // =========================
expertOpinion:

  parseExpertOpinion(
    sectionMap.expertOpinion
  ),


    // =========================
    // FACT CHECK
    // New Dedicated Parser
    // =========================

    factCheck:

      parseFactCheck(
        sectionMap.factCheck
      ),



    sourceDesk:

      cleanText(
        sectionMap.sourceDesk
      ),



    faq:

      parseFAQ(
        sectionMap.faq
      ),



    // =========================
    // AI INTELLIGENCE
    // =========================

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



    // =========================
    // MEDIA
    // =========================

    imageGallery:
      [],



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
// MAIN IMPORT
// ============================================

export function parseNewsImport(

  input:ImporterInput

):ImporterResponse {


  try{


    const normalized =

      normalizeImporterInput(
        input
      );



    let sections =

      extractSections(
        normalized.rawText
      );



    let sectionMap =

      sectionsToMap(
        sections
      );



    if(

      Object.keys(
        sectionMap
      ).length === 0

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



    const parsedArticle =

      buildParsedArticle(
        sectionMap
      );



    console.log(
      "PARSED ARTICLE DEBUG",

      JSON.stringify(

        {

          headline:
            parsedArticle.headline,


          bodyLength:
            parsedArticle.body?.length,


          bodyPreview:
            parsedArticle.body?.substring(
              0,
              150
            ),


          factCheckCount:
            parsedArticle.factCheck?.length

        },

        null,

        2

      )

    );



    const validation =

      validateArticle(
        parsedArticle
      );



    if(
      !validation.valid
    ){

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