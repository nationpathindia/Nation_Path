// ============================================
// NationPath AI News Importer
// Core Type Definitions
// COMPATIBLE LOCK v6.2
//
// Flow:
// Raw Text
// ↓
// Parser
// ↓
// ParsedArticle
// ↓
// Validator
// ↓
// CMS Mapper
// ↓
// Existing Article CMS
// ============================================



// ============================================
// RAW INPUT
// ============================================

export interface ImporterInput {

  rawText:string;

}



// ============================================
// PARSED SECTION
// ============================================

export interface ParsedSection {

  heading:string;

  content:string;

}



// ============================================
// FAQ
// ============================================

export interface FAQItem {

  question:string;

  answer:string;

}



// ============================================
// TIMELINE
// ============================================

export interface TimelineItem {

  date?:string;

  title:string;

  description?:string;

}



// ============================================
// EXPERT OPINION
// ============================================

export interface ExpertOpinionItem {

  name?:string;

  designation?:string;

  organization?:string;

  opinion:string;

}



// ============================================
// FACT CHECK
// ============================================

export interface FactCheckItem {

  claim:string;

  status?:
  | "verified"
  | "partially_verified"
  | "unverified"
  | "false"
  | "pending";


  explanation?:string;

  sources?:string;

}



// ============================================
// SEO
// ============================================

export interface SEOData {

  metaTitle?:string;

  metaDescription?:string;

  slug?:string;

  keywords?:string[];

}



// ============================================
// IMAGE
// ============================================

export interface ImageMetadata {

  caption?:string;

  altText?:string;

}



export interface ImageGalleryItem {

  url:string;

  alt?:string;

  caption?:string;

  isPrimary?:boolean;

}



// ============================================
// HEADLINE INTELLIGENCE
// ============================================

export interface HeadlineIntelligence {

  score?:number;

  alternatives?:string[];

  reasoning?:string;

}



// ============================================
// AI QUALITY
// ============================================

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



// ============================================
// PARSED ARTICLE
// AI Parser Output
// ============================================

export interface ParsedArticle {



  // SEO

  seoTitle?:string;

  slug?:string;

  metaDescription?:string;

  metaKeywords?:string[];




  // CORE

  headline?:string;

  brief?:string;

  body?:string;




  // HEADLINE AI

  headlineIntelligence?:HeadlineIntelligence;




  // EDITORIAL INTELLIGENCE

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




  // MEDIA

  image?:ImageMetadata;

  imageGallery?:ImageGalleryItem[];




  // AI

  quality?:AIQualityPanel;



  // RAW

  sections?:ParsedSection[];


}



// ============================================
// VALIDATION RESULT
// ============================================

export interface ValidationResult {


  valid:boolean;


  errors:string[];


  warnings:string[];


}



// ============================================
// CMS PAYLOAD
// Existing Article CMS Compatible
// ============================================

export interface CMSArticlePayload {


  // BASIC

  title:string;

  slug:string;

  shortBrief:string;

  content:string;




  // INTELLIGENCE

  background?:string;

  whyItMatters?:string;

  whatsNext?:string;


  keyHighlights:string[];

  keyTakeaways:string[];


  timeline:TimelineItem[];


  expertOpinion:ExpertOpinionItem[];


  factCheck:FactCheckItem[];


  sourceDesk?:string;


  faq:FAQItem[];




  // MEDIA

  imageAlt?:string;

  imageCaption?:string;

  imageGallery:ImageGalleryItem[];




  // SEO

  metaTitle?:string;

  metaDescription?:string;

  metaKeywords:string[];




  // AI

  headlineIntelligence?:HeadlineIntelligence;

  quality?:AIQualityPanel;


}



// ============================================
// IMPORTER RESPONSE
// ============================================

export interface ImporterResponse {


  success:boolean;


  article?:CMSArticlePayload;


  validation?:ValidationResult;


  error?:string;


}