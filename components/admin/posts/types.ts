// components/admin/posts/types.ts


export type PostType =
  | "news"
  | "editorial";




export type VideoPosition =
  | "top"
  | "middle"
  | "bottom";




export type PostStatus =

  | "draft"

  | "pending"

  | "approved"

  | "scheduled"

  | "published"

  | "archived";







export interface ImageGalleryItem {


  url:string;


  alt:string;


  caption:string;


  isPrimary:boolean;


}






export interface FAQItem {


  question:string;


  answer:string;


}






export interface ExpertOpinionItem {


  name:string;


  role:string;


  quote:string;


}






export interface FactCheckItem {


  claim:string;


  status:string;


  explanation:string;


  sources:string;


}








export interface PostFormData {




  id?:string;





  // =====================
  // BASIC
  // =====================


  title:string;


  slug:string;


  content:string;


  categoryId:string;



  postType:PostType;


  isEditorial:boolean;







  // =====================
  // MEDIA
  // =====================


  imageGallery:ImageGalleryItem[];


  images:string[];






  // =====================
  // VIDEO
  // =====================


  videoUrl:string;


  videoEmbed?:string;


  videoThumbnail?:string;


  videoTitle?:string;


  videoPosition:VideoPosition;







  // =====================
  // HOMEPAGE CONTROLS
  // =====================


  breaking:boolean;


  featured:boolean;



  breakingPriority:number;


  homepagePriority:number;



  breakingDuration:string;


  featuredDuration:string;







  // =====================
  // ARTICLE INTELLIGENCE
  // =====================


  shortBrief:string;



  keyHighlights:string[];



  whyItMatters:string;



  background:string;



  timeline:string[];




  expertOpinion:ExpertOpinionItem[];




  factCheck:FactCheckItem[];




  whatsNext:string;



  keyTakeaways:string[];




  sourceDesk:string;







  // =====================
  // FAQ
  // =====================


  faqItems:FAQItem[];








  // =====================
  // PUBLISHING
  // =====================


  publishedAt:string | null;



  scheduledAt:string | null;



  status:PostStatus;






  live:boolean;








  // =====================
  // SEO
  // =====================


  metaTitle:string;


  metaDescription:string;


  metaKeywords:string;








  // =====================
  // AI PIPELINE
  // =====================


  aiGenerated?:boolean;


  aiVersion?:string;


  humanReview?:boolean;








  // =====================
  // SYSTEM
  // =====================


  createdAt?:string;


  updatedAt?:string;



}