//////////////////////////////////////////////////////////////
// NATIONPATH AI TYPES
//
// Internal AI Runtime Types
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
// AI PROVIDER
//////////////////////////////////////////////////////////////

export type AIProvider =
  | "nationpath-ai";



//////////////////////////////////////////////////////////////
// AI MODEL
//////////////////////////////////////////////////////////////

export type AIModel =
  | "nationpath-core-v1";


//////////////////////////////////////////////////////////////
// AI CONTENT TYPE
//////////////////////////////////////////////////////////////

export type AIContentType =
  | "news"
  | "breaking-news"
  | "editorial"
  | "horoscope"
  | "astro-enhancement"
  | "seo"
  | "social"
  | "rewrite"
  | "translate"
  | "summary";


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


}





//////////////////////////////////////////////////////////////
// AI RESPONSE
//////////////////////////////////////////////////////////////
export interface AIResponse<T> {


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


    provider?:
      AIProvider;


    model?:
      AIModel;


    durationMs?:
      number;


  };


}




//////////////////////////////////////////////////////////////
// NEWS REQUEST
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
//////////////////////////////////////////////////////////////

export interface EditorialRequest
extends AIRequest {


  topic:
    string;


}





//////////////////////////////////////////////////////////////
// REWRITE REQUEST
//////////////////////////////////////////////////////////////

export interface RewriteRequest
extends AIRequest {


  content:
    string;


}





//////////////////////////////////////////////////////////////
// SEO REQUEST
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
//////////////////////////////////////////////////////////////

export interface HoroscopeRequest
extends AIRequest {


  zodiacSign:
    string;


  horoscopeDate:
    string | Date;


}





//////////////////////////////////////////////////////////////
// ARTICLE OUTPUT
//////////////////////////////////////////////////////////////

export interface GeneratedArticle {


  title:
    string;


  slug:
    string;


  excerpt:
    string;


  content:
    string;


  tags:
    string[];


  metaTitle:
    string;


  metaDescription:
    string;


  metaKeywords:
    string[];


  readingTime:
    number;


}





//////////////////////////////////////////////////////////////
// SEO OUTPUT
//////////////////////////////////////////////////////////////

export interface GeneratedSEO {


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

export interface GeneratedSocial {


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
// IMAGE OUTPUT
//////////////////////////////////////////////////////////////

export interface ImagePrompt {


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
// HOROSCOPE OUTPUT
//////////////////////////////////////////////////////////////

export interface HoroscopeOutput {


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


  loveCompatibility:
    number;


  careerGrowth:
    number;


  wealthEnergy:
    number;


  mentalPeace:
    number;


  familyHarmony:
    number;


  travelLuck:
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
// VALIDATION
//////////////////////////////////////////////////////////////

export interface ValidationResult {


  valid:
    boolean;


  errors:
    string[];


}