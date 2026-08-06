// ============================================
// NationPath AI News Importer
// Core Type Definitions
// Intelligence Upgrade Version
// ============================================


/**
 * Raw importer input
 */
export interface ImporterInput {

  rawText:string;

}



/**
 * Generic extracted section
 */
export interface ParsedSection {

  heading:string;

  content:string;

}



/**
 * FAQ structure
 */
export interface FAQItem {

  question:string;

  answer:string;

}



/**
 * Timeline item
 */
export interface TimelineItem {

  date?:string;

  title:string;

  description?:string;

}



/**
 * Expert Opinion
 */
export interface ExpertOpinionItem {

  name:string;

  designation?:string;

  organization?:string;

  opinion:string;

}



/**
 * Fact Check
 */
export interface FactCheckItem {

  claim:string;

  status:
    | "verified"
    | "partially_verified"
    | "unverified"
    | "false"
    | "pending";

  explanation?:string;

}



/**
 * SEO Data
 */
export interface SEOData {

  metaTitle?:string;

  metaDescription?:string;

  slug?:string;

  keywords?:string[];

}



/**
 * Image Metadata
 *
 * Legacy compatibility
 */
export interface ImageMetadata {

  caption?:string;

  altText?:string;

}



/**
 * Image Intelligence
 *
 * Compatible with CMS imageGallery
 */
export interface ImageGalleryItem {

  url:string;

  alt:string;

  caption:string;

  isPrimary:boolean;

}



/**
 * Headline Intelligence
 */
export interface HeadlineIntelligence {

  score?:number;

  alternatives?:string[];

  reasoning?:string;

}



/**
 * AI Quality Panel
 */
export interface AIQualityPanel {

  confidence?:number;

  factCheckStatus?:
    | "pending"
    | "verified"
    | "needs_review";

  articleTone?:
    | "neutral"
    | "analytical"
    | "opinion"
    | "breaking"
    | "investigative"
    | "explainer";

  articleType?:
    | "breaking"
    | "news"
    | "analysis"
    | "feature"
    | "report"
    | "opinion";

  editorialReviewStatus?:
    | "pending"
    | "reviewed"
    | "approved";

}



/**
 * Parsed article output
 *
 * AI Processing Layer
 * Before CMS mapping
 */
export interface ParsedArticle {


  // ==============================
  // SEO
  // ==============================

  seoTitle?:string;

  slug?:string;

  metaDescription?:string;

  metaKeywords?:string[];



  // ==============================
  // Core Article
  // ==============================

  headline?:string;

  brief?:string;

  body?:string;



  // ==============================
  // Headline Intelligence
  // ==============================

  headlineIntelligence?:HeadlineIntelligence;



  // ==============================
  // Editorial Intelligence
  // ==============================

  background?:string;


  whyItMatters?:string;


  whatsNext?:string;



  keyHighlights?:string[];


  keyTakeaways?:string[];



  timeline?:TimelineItem[];



  expertOpinion?:ExpertOpinionItem[];



  factCheck?:FactCheckItem[];



  sourceDesk?:string;



  faq?:FAQItem[];



  // ==============================
  // Image Intelligence
  // ==============================

  image?:ImageMetadata;


  imageGallery?:ImageGalleryItem[];



  // ==============================
  // AI Intelligence
  // ==============================

  quality?:AIQualityPanel;



  sections?:ParsedSection[];



}



/**
 * Validation result
 */
export interface ValidationResult {

  valid:boolean;

  errors:string[];

  warnings?:string[];

}



/**
 * Final CMS Article Payload
 *
 * Maps into NationPath CMS
 */
export interface CMSArticlePayload {


  // ==============================
  // Core Article
  // ==============================

  title:string;

  slug?:string;


  shortBrief?:string;


  content:string;



  // ==============================
  // Editorial Intelligence
  // ==============================

  background?:string;


  whyItMatters?:string;


  whatsNext?:string;


  keyHighlights?:string[];


  keyTakeaways?:string[];


  timeline?:TimelineItem[];


  expertOpinion?:ExpertOpinionItem[];


  factCheck?:FactCheckItem[];


  sourceDesk?:string;


  faq?:FAQItem[];



  // ==============================
  // Image Intelligence
  // ==============================

  imageAlt?:string;


  imageCaption?:string;


  imageGallery?:ImageGalleryItem[];



  // ==============================
  // SEO
  // ==============================

  metaTitle?:string;


  metaDescription?:string;


  metaKeywords?:string[];



  // ==============================
  // AI Intelligence
  // ==============================

  headlineIntelligence?:HeadlineIntelligence;


  quality?:AIQualityPanel;



}



/**
 * Complete Import Engine Response
 */
export interface ImporterResponse {


  success:boolean;


  article?:CMSArticlePayload;


  validation?:ValidationResult;


  error?:string;


}

