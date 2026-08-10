// ============================================
// NationPath AI News Importer
// CMS Mapper v6 ENHANCED LOCK
//
// ParsedArticle
// ↓
// CMSArticlePayload
//
// Compatible:
// - Existing Article CMS
// - Article Intelligence
// - SEO
// - FAQ
// - Timeline
// - Images
// - AI Quality
//
// Handles:
// - Missing AI fields
// - String/Array mismatch
// - Empty AI sections
// - Legacy compatibility
// ============================================


import type {
  ParsedArticle,
  CMSArticlePayload,
  FAQItem,
  TimelineItem,
  ExpertOpinionItem,
  FactCheckItem,
  ImageGalleryItem
} from "./types";



// ============================================
// SAFE TEXT
// ============================================

function safeText(
  value:any
):string {

  if(typeof value === "string"){
    return value.trim();
  }

  return "";

}



// ============================================
// ARRAY NORMALIZER
// ============================================

function cleanArray(
  value:any
):string[] {


  if(Array.isArray(value)){

    return value
      .map(item=>safeText(item))
      .filter(Boolean);

  }


  if(typeof value==="string"){

    return value
      .split("\n")
      .map(item=>
        item
        .replace(/^[-*•]\s*/,"")
        .trim()
      )
      .filter(Boolean);

  }


  return [];

}



// ============================================
// SLUG
// ============================================

function createSlug(
 text:string
):string {

 return text
 .toLowerCase()
 .trim()
 .replace(/[^a-z0-9]+/g,"-")
 .replace(/^-+|-+$/g,"");

}



// ============================================
// FAQ
// ============================================

function normalizeFAQ(
 value:any
):FAQItem[] {


 if(!Array.isArray(value))
 return [];


 return value
 .filter(
  item=>
  item &&
  safeText(item.question) &&
  safeText(item.answer)
 )
 .map(item=>({

  question:
    safeText(item.question),

  answer:
    safeText(item.answer)

 }));

}



// ============================================
// TIMELINE
// ============================================

function normalizeTimeline(
 value:any
):TimelineItem[] {


 if(!Array.isArray(value))
 return [];


 return value
 .filter(
  item=>
  item &&
  safeText(item.title) &&
  safeText(item.title)!=":"
 )
 .map(item=>({

  date:
    safeText(item.date)
    ||
    undefined,


  title:
    safeText(item.title),


  description:
    safeText(item.description)

 }));

}



// ============================================
// EXPERT OPINION
// ============================================

function normalizeExpertOpinion(
 value:any
):ExpertOpinionItem[] {


 if(!Array.isArray(value))
 return [];


 return value
 .filter(
 item=>
 item &&
 (
  safeText(item.opinion) ||
  safeText(item.quote)
 )
 )
 .map(item=>({

  name:
    safeText(item.name)
    ||
    "Expert",


  designation:
    safeText(item.designation)
    ||
    safeText(item.role),


  organization:
    safeText(item.organization),


  opinion:
    safeText(item.opinion)
    ||
    safeText(item.quote)

 }));

}



// ============================================
// FACT CHECK
// ============================================

function normalizeFactCheck(
 value:any
):FactCheckItem[] {


 if(!Array.isArray(value))
 return [];


 return value
 .filter(
 item=>
 item &&
 safeText(item.claim)
 )
 .map(item=>({

  claim:
    safeText(item.claim),


  status:

    item.status
    ||
    "pending",


  explanation:
    safeText(item.explanation),


  sources:
    safeText(item.sources)

 }));

}



// ============================================
// IMAGE GALLERY
// ============================================

function normalizeImageGallery(
 value:any
):ImageGalleryItem[] {


 if(!Array.isArray(value))
 return [];


 return value
 .filter(
 item=>
 item &&
 safeText(item.url)
 )
 .map(item=>({

  url:
    safeText(item.url),


  alt:
    safeText(item.alt)
    ||
    "NationPath image",


  caption:
    safeText(item.caption),


  isPrimary:
    Boolean(item.isPrimary)

 }));

}



// ============================================
// MAIN MAPPER
// ============================================


export function mapToCMS(

 article:ParsedArticle

):CMSArticlePayload {



const title =

 safeText(article.headline)
 ||
 safeText(article.seoTitle)
 ||
 "Untitled Article";



const content =

 safeText(article.body)
 ||
 safeText(article.brief);



const shortBrief =

 safeText(article.brief)
 ||
 content;



return {


title,


slug:

createSlug(
 safeText(article.slug)
 ||
 title
),



shortBrief,


content,



// ==================================
// INTELLIGENCE
// ==================================


background:

safeText(article.background),


whyItMatters:

safeText(article.whyItMatters),


whatsNext:

safeText(article.whatsNext),



keyHighlights:

cleanArray(
 article.keyHighlights
),



keyTakeaways:

cleanArray(
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

safeText(article.sourceDesk),



faq:

normalizeFAQ(
 article.faq
),




// ==================================
// MEDIA
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

safeText(article.seoTitle)
||
title,



metaDescription:

safeText(article.metaDescription)
||
shortBrief,



metaKeywords:

cleanArray(
 article.metaKeywords
),




// ==================================
// AI
// ==================================


headlineIntelligence:

article.headlineIntelligence
||
undefined,



quality:

article.quality
||
undefined



};



}