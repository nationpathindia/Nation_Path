// ============================================
// NationPath AI News Importer
// SEO Parser v4 FINAL LOCK
//
// Supports:
// - SEO Preview section
// - Markdown SEO fields
// - Title extraction
// - Description extraction
// - Keyword extraction
// - Slug generation
// - Multiline recovery
// - N/A cleanup
// - Structured SEO parsing
// ============================================

import type {
  SEOData
} from "./types";



// ============================================
// CLEAN SEO TEXT
// ============================================

function cleanSEOText(
  text?: string
): string | undefined {

  if(
    !text
  ){

    return undefined;

  }


  const clean =

    text

      .replace(
        /\*\*/g,
        ""
      )

      .replace(
        /^#+\s*/,
        ""
      )

      .replace(
        /^[-*]\s*/,
        ""
      )

      .replace(
        /\s+/g,
        " "
      )

      .trim();



  if(
    !clean ||
    clean.toLowerCase() === "n/a"
  ){

    return undefined;

  }


  return clean;

}



// ============================================
// KEYWORD PARSER
// ============================================

function parseKeywordList(
  text?: string
): string[] {


  if(
    !text
  ){

    return [];

  }



  return text

    .replace(
      /\*\*/g,
      ""
    )

    .replace(
      /^keywords?\s*:/i,
      ""
    )

    .split(
      ","
    )

    .map(
      item =>
        item
          .trim()
          .toLowerCase()
    )

    .filter(
      Boolean
    );

}



// ============================================
// SLUG GENERATOR
// ============================================

export function generateSlug(
  text:string
):string {


  return text

    .toLowerCase()

    .trim()

    .replace(
      /[^\w\s-]/g,
      ""
    )

    .replace(
      /\s+/g,
      "-"
    )

    .replace(
      /-+/g,
      "-"
    );

}



// ============================================
// NORMALIZE SLUG
// ============================================

function normalizeSlug(
  slug:string
):string {

  return generateSlug(
    slug
  );

}



// ============================================
// EXTRACT SEO FIELD
// ============================================

function extractSEOField(
  text:string,
  label:string
):string | undefined {


  const regex =

    new RegExp(
      `(?:\\*\\*)?${label}(?:\\*\\*)?\\s*:\\s*([\\s\\S]*?)(?=\\n(?:\\*\\*)?[A-Za-z ]+(?:\\*\\*)?\\s*:|$)`,
      "i"
    );



  const match =
    text.match(
      regex
    );



  return match

    ?

    cleanSEOText(
      match[1]
    )

    :

    undefined;

}



// ============================================
// EXTRACT KEYWORDS
// ============================================

function extractKeywords(
  text:string
):string[] {


  const match =

    text.match(
      /(?:\*\*)?keywords(?:\*\*)?\s*:\s*(.+)/i
    );



  if(
    !match
  ){

    return [];

  }



  return parseKeywordList(
    match[1]
  );

}



// ============================================
// PARSE SEO
// ============================================

export function parseSEO(
  sections:Record<string,string>
):SEOData {


  const seoBlock =

    sections.seoPreview

    ||

    sections.seoTitle

    ||

    sections.metaDescription

    ||

    "";



  const title =


    extractSEOField(
      seoBlock,
      "title"
    )

    ||

    cleanSEOText(
      sections.seoTitle
    )

    ||

    cleanSEOText(
      sections.headline
    );




  const description =


    extractSEOField(
      seoBlock,
      "description"
    )

    ||

    cleanSEOText(
      sections.metaDescription
    )

    ||

    cleanSEOText(
      sections.brief
    );




  const keywords =

    extractKeywords(
      seoBlock
    );



  const finalKeywords =

    keywords.length

    ?

    keywords

    :

    parseKeywordList(
      sections.metaKeywords
    );




  const slug =


    sections.slug

    ?

    normalizeSlug(
      sections.slug
    )

    :

    title

    ?

    generateSlug(
      title
    )

    :

    undefined;



  return {

    metaTitle:
      title,


    metaDescription:
      description,


    slug,


    keywords:
      finalKeywords

  };

}