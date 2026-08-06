import type {
  PostFormData
} from "./types";





export function createDefaultPost(

  type:"news" | "editorial" = "news"

):PostFormData {




const isEditorial =

type === "editorial";






return {




  // ======================
  // BASIC
  // ======================


  title:"",


  slug:"",


  content:"",




  categoryId:

    isEditorial

    ?

    "editorial"

    :

    "",





  postType:

    isEditorial

    ?

    "editorial"

    :

    "news",




  isEditorial,









  // ======================
  // MEDIA
  // ======================


  imageGallery:[],


  images:[],





  videoUrl:"",


  videoEmbed:"",


  videoThumbnail:"",


  videoTitle:"",



  videoPosition:"top",







  // ======================
  // HOMEPAGE / NEWS CONTROL
  // ======================


  breaking:false,


  featured:false,



  breakingPriority:0,


  homepagePriority:0,



  breakingDuration:"30",


  featuredDuration:"24",







  // ======================
  // ARTICLE INTELLIGENCE
  // ======================


  shortBrief:"",



  keyHighlights:[],



  whyItMatters:"",



  background:"",



  timeline:[],



  expertOpinion:[],



  factCheck:[],



  whatsNext:"",



  keyTakeaways:[],



  sourceDesk:"",







  // ======================
  // FAQ
  // ======================


  faqItems:[],









  // ======================
  // PUBLISHING
  // ======================


  publishedAt:null,



  scheduledAt:null,



  status:"draft",



  live:false,









  // ======================
  // SEO
  // ======================


  metaTitle:"",



  metaDescription:"",



  metaKeywords:"",







  // ======================
  // AI PIPELINE
  // ======================


  aiGenerated:false,



  aiVersion:"",



  humanReview:false,









  // ======================
  // SYSTEM
  // ======================


  createdAt:"",



  updatedAt:""




};

}