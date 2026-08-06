// ============================================
// NationPath AI News Importer
// CMS Mapper v4 FINAL LOCK
// Parsed Article → CMS Payload Converter
//
// Compatible:
// - Existing Create Post CMS
// - Article Intelligence
// - SEO
// - FAQ
// - Timeline
// - Image Gallery
// - AI Quality Intelligence
// ============================================


import type {

  ParsedArticle,

  CMSArticlePayload

} from "./types";




// ============================================
// Safe Text
// ============================================

function safeText(
  value?:unknown
):string {


  return typeof value === "string"

    ? value.trim()

    : "";

}





// ============================================
// Unique Array
// ============================================

function uniqueArray(
  items:string[]
):string[] {


  return [

    ...new Set(

      items

      .map(
        item =>
          item.trim()
      )

      .filter(Boolean)

    )

  ];

}





// ============================================
// Text To Array
// ============================================

function textToArray(
  value?:string|string[]
):string[] {


  if(
    Array.isArray(value)
  ){

    return uniqueArray(

      value

      .map(
        item =>
          safeText(item)
      )

    );

  }



  if(
    typeof value !== "string"
  ){

    return [];

  }



  return uniqueArray(

    value

    .split("\n")

    .map(item =>

      item

      .replace(
        /^[-*•]\s*/,
        ""
      )

      .trim()

    )

  );

}





// ============================================
// Slug Generator
// ============================================

function createSlug(
  text:string
):string {


  return text

    .toLowerCase()

    .trim()

    .replace(
      /[^a-z0-9]+/g,
      "-"
    )

    .replace(
      /^-+|-+$/g,
      "" 
    );

}





// ============================================
// FAQ Normalizer
// ============================================

function normalizeFAQ(
  value:any
){

  if(
    Array.isArray(value)
  ){

    return value

    .filter(

      item =>

      item &&

      safeText(
        item.question
      ) &&

      safeText(
        item.answer
      )

    )

    .map(item => ({

      question:
        safeText(
          item.question
        ),


      answer:
        safeText(
          item.answer
        )

    }));

  }



  return [];

}





// ============================================
// Timeline Normalizer
// ============================================

function normalizeTimeline(
  value:any
):any[] {


  if(
    Array.isArray(value)
  ){

    return value.filter(Boolean);

  }



  return [];

}





// ============================================
// Expert Opinion Normalizer
// ============================================

function normalizeExpertOpinion(
  value:any
):any[] {


  if(
    Array.isArray(value)
  ){

    return value.filter(

      item =>

      item &&

      safeText(
        item.opinion
      )

    );

  }



  return [];

}





// ============================================
// Fact Check Normalizer
// ============================================

function normalizeFactCheck(
  value:any
):any[] {


  if(
    Array.isArray(value)
  ){

    return value.filter(

      item =>

      item &&

      safeText(
        item.claim
      )

    );

  }



  return [];

}





// ============================================
// Image Gallery Normalizer
// ============================================

function normalizeImageGallery(
  value:any
):any[] {


  if(
    !Array.isArray(value)
  ){

    return [];

  }



  return value

  .filter(

    item =>

    item &&

    safeText(
      item.url
    )

  )

  .map(

    item => ({

      url:
        safeText(
          item.url
        ),


      alt:
        safeText(
          item.alt
        ),


      caption:
        safeText(
          item.caption
        ),


      isPrimary:
        Boolean(
          item.isPrimary
        )

    })

  );

}





// ============================================
// Convert Parsed Article
// Into NationPath CMS Format
// ============================================

export function mapToCMS(

  article:ParsedArticle

):CMSArticlePayload {



  const title =

    safeText(
      article.headline
    )

    ||

    safeText(
      article.seoTitle
    )

    ||

    "Untitled Article";





  const content =

    safeText(
      article.body
    )

    ||

    safeText(
      article.brief
    );





  const shortBrief =

    safeText(
      article.brief
    )

    ||

    content;





  return {


    // ==================================
    // Core Article
    // ==================================

    title,


    slug:

      createSlug(

        safeText(
          article.slug
        )

        ||

        title

      ),



    shortBrief,


    content,





    // ==================================
    // Editorial Intelligence
    // ==================================

    background:

      safeText(
        article.background
      ),



    whyItMatters:

      safeText(
        article.whyItMatters
      ),



    whatsNext:

      safeText(
        article.whatsNext
      ),



    keyHighlights:

      textToArray(
        article.keyHighlights
      ),



    keyTakeaways:

      textToArray(
        article.keyTakeaways
      ),



    timeline:

      normalizeTimeline(
        article.timeline
      ),



    expertOpinion:

      normalizeExpertOpinion(
        article.expertOpinion
      ),



    factCheck:

      normalizeFactCheck(
        article.factCheck
      ),



    sourceDesk:

      safeText(
        article.sourceDesk
      ),



    faq:

      normalizeFAQ(
        article.faq
      ),





    // ==================================
    // Image Intelligence
    // ==================================

    imageAlt:

      safeText(
        article.image?.altText
      ),



    imageCaption:

      safeText(
        article.image?.caption
      ),



    imageGallery:

      normalizeImageGallery(
        article.imageGallery
      ),





    // ==================================
    // SEO
    // ==================================

    metaTitle:

      safeText(
        article.seoTitle
      )

      ||

      title,



    metaDescription:

      safeText(
        article.metaDescription
      )

      ||

      shortBrief,



    metaKeywords:

      textToArray(
        article.metaKeywords
      ),





    // ==================================
    // AI Intelligence
    // ==================================

    headlineIntelligence:

      article.headlineIntelligence,



    quality:

      article.quality



  };


}

