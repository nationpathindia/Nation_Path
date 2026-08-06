// ============================================
// NationPath AI News Importer
// SEO Parser
// ============================================

import type { SEOData } from "./types";



/**
 * Clean SEO text
 */
function cleanSEOText(
  text?: string
): string | undefined {

  if (!text) {
    return undefined;
  }


  return text
    .trim()
    .replace(/\s+/g, " ");

}



/**
 * Create slug from title
 */
export function generateSlug(
  text:string
):string {


  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g,"")
    .replace(/\s+/g,"-")
    .replace(/-+/g,"-");

}



/**
 * Normalize existing slug
 */
function normalizeSlug(
  slug:string
):string {


  return generateSlug(slug);

}



/**
 * Extract SEO data
 */
export function parseSEO(
  sections:Record<string,string>
):SEOData {


  const metaTitle =
    cleanSEOText(
      sections.seoTitle ||
      sections.headline
    );


  const metaDescription =
    cleanSEOText(
      sections.metaDescription ||
      sections.brief
    );


  const slug =
    sections.slug
      ? normalizeSlug(
          sections.slug
        )
      : metaTitle
        ? generateSlug(
            metaTitle
          )
        : undefined;



  return {

    metaTitle,

    metaDescription,

    slug

  };

}