//////////////////////////////////////////////////////////////
// NATIONPATH AI TYPES
//
// Internal Intelligence Runtime
//
// NO OPENAI
// NO EXTERNAL PROVIDER
//
// NationPath AI Core v1
//////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////
// LANGUAGE
//////////////////////////////////////////////////////////////

export type AstroLanguage =
  | "english"
  | "hindi"
  | "marathi"
  | "tamil"
  | "telugu"
  | "nepali";



//////////////////////////////////////////////////////////////
// PROVIDER
//////////////////////////////////////////////////////////////

export type AIProvider =
  | "nationpath-ai";



//////////////////////////////////////////////////////////////
// MODEL
//////////////////////////////////////////////////////////////

export type AIModel =
  | "nationpath-core-v1";




//////////////////////////////////////////////////////////////
// CONTENT MODULES
//////////////////////////////////////////////////////////////

export type AIContentType =

  | "news"
  | "breaking-news"
  | "editorial"
  | "analysis"
  | "horoscope"
  | "astro-enhancement"
  | "seo"
  | "social"
  | "rewrite"
  | "translate"
  | "summary"
  | "image"
  | "kids";




//////////////////////////////////////////////////////////////
// BASE REQUEST
//////////////////////////////////////////////////////////////

export interface AIRequest {


 provider?:
  AIProvider;


 model?:
  AIModel;


 language?:
  AstroLanguage;


 temperature?:
  number;


 topP?:
  number;


 maxOutputTokens?:
  number;


 module?:
  AIContentType;


}





//////////////////////////////////////////////////////////////
// GENERIC RESPONSE
//////////////////////////////////////////////////////////////

export interface AIResponse<T>{


 success:
  boolean;


 data?:
  T;


 error?:
  string;



 meta?: {


  engine:
   string;


  version:
   string;


  module?:
   string;


  durationMs?:
   number;


  requiresHumanReview?:
   boolean;


 };


}






//////////////////////////////////////////////////////////////
// NEWS REQUEST
//////////////////////////////////////////////////////////////

export interface NewsGenerationRequest
extends AIRequest{


 rawNews:
  string;


 category?:
  string;


 articleType?:
 | "news"
 | "breaking-news"
 | "editorial"
 | "analysis";



 keywords?:
  string[];



 location?:
  string;



 source?:
  string;



 context?:
  Record<string,any>;

}




//////////////////////////////////////////////////////////////
// NEWS ANALYSIS
//////////////////////////////////////////////////////////////

export interface NewsAnalysis{


 topic:
  string;


 category:
  string;


 articleType:
  string;



 importance:
 | "low"
 | "medium"
 | "high"
 | "breaking";



 entities:
  string[];


 locations:
  string[];


 people:
  string[];


 organizations:
  string[];



 keywords:
  string[];



 sentiment?:
 | "positive"
 | "negative"
 | "neutral";



 summary:
  string;



}





//////////////////////////////////////////////////////////////
// TIMELINE
//////////////////////////////////////////////////////////////

export interface NewsTimelineItem{


 date:
  string;


 event:
  string;


}





//////////////////////////////////////////////////////////////
// EXPERT OPINION
//////////////////////////////////////////////////////////////

export interface NewsExpertOpinion{


 expert:
  string;


 designation?:
  string;


 opinion:
  string;


}




//////////////////////////////////////////////////////////////
// FACT CHECK
//////////////////////////////////////////////////////////////

export interface NewsFactCheck{


 claim:
  string;



 status:
 | "verified"
 | "partially-verified"
 | "unverified"
 | "false";



 explanation:
  string;


}





//////////////////////////////////////////////////////////////
// SEO OUTPUT
//////////////////////////////////////////////////////////////

export interface GeneratedSEO{


 metaTitle:
  string;


 metaDescription:
  string;


 metaKeywords:
  string[];


 slug:
  string;


}




//////////////////////////////////////////////////////////////
// SOCIAL OUTPUT
//////////////////////////////////////////////////////////////

export interface GeneratedSocial{


 facebook:
  string;


 instagram:
  string;


 twitter:
  string;


 linkedin:
  string;


 whatsapp:
  string;


 telegram:
  string;


 hashtags:
  string[];


}





//////////////////////////////////////////////////////////////
// IMAGE INTELLIGENCE
//////////////////////////////////////////////////////////////

export interface ImagePrompt{


 title:
  string;


 prompt:
  string;


 negativePrompt?:
  string;


 width?:
  number;


 height?:
  number;


}





//////////////////////////////////////////////////////////////
// GENERATED NEWS ARTICLE
//////////////////////////////////////////////////////////////

export interface GeneratedNewsArticle{


 title:
  string;


 slug:
  string;



 content:
  string;




 shortBrief:
  string;



 background:
  string;



 timeline:
  NewsTimelineItem[];




 expertOpinion:
  NewsExpertOpinion[];




 factCheck:
  NewsFactCheck[];




 whatsNext:
  string;




 keyTakeaways:
  string[];




 sourceDesk:
  string;





 metaTitle:
  string;



 metaDescription:
  string;



 metaKeywords:
  string[];



 tags?:
  string[];



 readingTime?:
  number;



 social?:
  GeneratedSocial;



}





//////////////////////////////////////////////////////////////
// NEWS AI OUTPUT
//////////////////////////////////////////////////////////////

export interface NewsAIOutput{


 analysis:
  NewsAnalysis;



 article:
  GeneratedNewsArticle;



 meta?:


 {

  engine:
   string;


  version:
   string;


  durationMs?:
   number;


  requiresHumanReview:
   boolean;


 };


}





//////////////////////////////////////////////////////////////
// HOROSCOPE OUTPUT
//////////////////////////////////////////////////////////////

export interface HoroscopeOutput{


 zodiacSign:
 string;


 horoscopeDate:
 string;


 zodiacDateRange:
 string;


 lovePrediction:
 string;


 careerPrediction:
 string;


 financePrediction:
 string;


 healthPrediction:
 string;


 travelPrediction:
 string;


 moodPrediction:
 string;


 luckyColor:
 string;


 luckyNumber:
 string;


 luckyTime:
 string;


 luckyDirection:
 string;


 luckyGemstone:
 string;


 luckyFlower:
 string;


 luckyPlant:
 string;


 luckyFood:
 string;


 luckyMetal:
 string;


 luckyMantra:
 string;


 moonSign:
 string;


 sunSign:
 string;


 moonPhase:
 string;


 planetInfluence:
 string;


 currentTransit:
 string;


 tithi:
 string;


 nakshatra:
 string;


 yoga:
 string;


 karana:
 string;


 sunrise:
 string;


 sunset:
 string;


 moonrise:
 string;


 moonset:
 string;


 rahuKaal:
 string;


 abhijitMuhurat:
 string;


 amritKaal:
 string;


 compatibleSigns:
 string[];


 avoidSigns:
 string[];


 todayRemedy:
 string;


 chantMantra:
 string;


 donation:
 string;


 auspiciousWork:
 string;


 avoidToday:
 string;


 loveScore:
 number;


 careerScore:
 number;


 financeScore:
 number;


 healthScore:
 number;


 overallLuck:
 number;


 astroTitle:
 string;


 astroDescription:
 string;


 shareTitle:
 string;


 shareDescription:
 string;


}





//////////////////////////////////////////////////////////////
// NEWSROOM MEMORY
//////////////////////////////////////////////////////////////

export interface NewsroomMemory{


 articleId?:
 string;


 category:
 string;


 headlinePattern?:
 string;


 editorChanges?:
 string[];


 performanceScore?:
 number;


}





//////////////////////////////////////////////////////////////
// AI AUDIT LOG
//////////////////////////////////////////////////////////////

export interface AIAuditRecord{


 requestId:
 string;


 module:
 string;


 createdAt:
 Date;


 humanReviewed:
 boolean;


 published:
 boolean;


}





//////////////////////////////////////////////////////////////
// VALIDATION
//////////////////////////////////////////////////////////////

export interface ValidationResult{


 valid:
 boolean;


 errors:
 string[];


}





//////////////////////////////////////////////////////////////
// NEWS AI CONFIG
//////////////////////////////////////////////////////////////

export interface NewsAIConfig{


 generateHeadline:
 boolean;


 generateArticle:
 boolean;


 generateTimeline:
 boolean;


 generateFactCheck:
 boolean;


 generateSEO:
 boolean;


 generateSocial:
 boolean;


 generateImagePrompt:
 boolean;


}

//////////////////////////////////////////////////////////////
// LEGACY NEWS REQUEST
//
// Validator compatibility layer
//////////////////////////////////////////////////////////////

export interface NewsRequest
extends AIRequest {


 title:
  string;


 category:
  string;


 keywords?:
  string[];


 location?:
  string;


 source?:
  string;


}

//////////////////////////////////////////////////////////////
// EDITORIAL REQUEST
//
// Backward compatibility
//////////////////////////////////////////////////////////////

export interface EditorialRequest
extends AIRequest {


 topic:
  string;


}





//////////////////////////////////////////////////////////////
// REWRITE REQUEST
//
// Backward compatibility
//////////////////////////////////////////////////////////////

export interface RewriteRequest
extends AIRequest {


 content:
  string;


}





//////////////////////////////////////////////////////////////
// SEO REQUEST
//
// Backward compatibility
//////////////////////////////////////////////////////////////

export interface SEORequest
extends AIRequest {


 title:
  string;


 content:
  string;


}





//////////////////////////////////////////////////////////////
// SOCIAL REQUEST
//
// Backward compatibility
//////////////////////////////////////////////////////////////

export interface SocialRequest
extends AIRequest {


 title:
  string;


 content:
  string;


}
//////////////////////////////////////////////////////////////
// HOROSCOPE REQUEST
//
// Astro AI Compatibility Layer
//////////////////////////////////////////////////////////////

export interface HoroscopeRequest
extends AIRequest {


 zodiacSign:
  string;



 horoscopeDate:
  string | Date;



}