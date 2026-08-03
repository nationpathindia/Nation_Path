//////////////////////////////////////////////////////////////
// NATIONPATH AI VALIDATOR
//
// Input Safety + Schema Enforcement Layer
//
// INTERNAL ENGINE ONLY
//
// NO OPENAI
// NO EXTERNAL PROVIDER
//
// NationPath AI Core v1
//////////////////////////////////////////////////////////////

import { z } from "zod";

import AI_CONFIG from "./constants";

import type {
  AIRequest,
  NewsRequest,
  EditorialRequest,
  RewriteRequest,
  SEORequest,
  SocialRequest,
  HoroscopeRequest,
  AstroLanguage,
  AIModel,
  AIContentType,
} from "./types";



//////////////////////////////////////////////////////////////
// BASE SCHEMA
//////////////////////////////////////////////////////////////

const baseAIRequestSchema = z.object({

  provider:
    z.literal("nationpath-ai")
    .optional(),


  model:
    z.enum([
      "nationpath-core-v1",
    ])
    .optional(),


  language:
    z.enum([
      "english",
      "hindi",
      "marathi",
      "tamil",
      "telugu",
      "nepali",
    ])
    .optional(),


  temperature:
    z.number()
    .min(0)
    .max(2)
    .optional(),


  topP:
    z.number()
    .min(0)
    .max(1)
    .optional(),


  maxOutputTokens:
    z.number()
    .positive()
    .optional(),


});





//////////////////////////////////////////////////////////////
// CONTENT TYPE VALIDATION
//////////////////////////////////////////////////////////////

export const contentTypeSchema =
z.enum([

  "news",
  "breaking-news",
  "editorial",
  "horoscope",
  "seo",
  "social",
  "rewrite",
  "translate",
  "summary",

]);






//////////////////////////////////////////////////////////////
// NEWS
//////////////////////////////////////////////////////////////

export const newsRequestSchema:

z.ZodType<NewsRequest> =

baseAIRequestSchema.extend({

  title:
    z.string()
    .min(5),


  category:
    z.string()
    .min(2),


  keywords:
    z.array(z.string())
    .optional(),


  location:
    z.string()
    .optional(),


  source:
    z.string()
    .optional(),


});






//////////////////////////////////////////////////////////////
// EDITORIAL
//////////////////////////////////////////////////////////////

export const editorialRequestSchema:

z.ZodType<EditorialRequest> =

baseAIRequestSchema.extend({

  topic:
    z.string()
    .min(5),

});







//////////////////////////////////////////////////////////////
// REWRITE
//////////////////////////////////////////////////////////////

export const rewriteRequestSchema:

z.ZodType<RewriteRequest> =

baseAIRequestSchema.extend({

  content:
    z.string()
    .min(10),

});







//////////////////////////////////////////////////////////////
// SEO
//////////////////////////////////////////////////////////////

export const seoRequestSchema:

z.ZodType<SEORequest> =

baseAIRequestSchema.extend({

  title:
    z.string()
    .min(5),


  content:
    z.string()
    .min(20),

});







//////////////////////////////////////////////////////////////
// SOCIAL
//////////////////////////////////////////////////////////////

export const socialRequestSchema:

z.ZodType<SocialRequest> =

baseAIRequestSchema.extend({

  title:
    z.string()
    .min(5),


  content:
    z.string()
    .min(20),

});







//////////////////////////////////////////////////////////////
// HOROSCOPE
//////////////////////////////////////////////////////////////

export const horoscopeRequestSchema:

z.ZodType<HoroscopeRequest> =

baseAIRequestSchema.extend({

  zodiacSign:
    z.string()
    .min(3),


  horoscopeDate:
    z.coerce.date(),


});








//////////////////////////////////////////////////////////////
// GENERIC VALIDATOR
//////////////////////////////////////////////////////////////

export function validate<T>(

 schema:z.ZodType<T>,

 input:unknown

):

{
 success:true;
 data:T;
}
|
{
 success:false;
 error:string;
}

{


 const result =
   schema.safeParse(input);



 if(!result.success){

   return {

    success:false,

    error:

      result.error.issues
      .map(
        issue =>
        issue.message
      )
      .join(", "),

   };

 }



 return {

   success:true,

   data:
    result.data,

 };


}








//////////////////////////////////////////////////////////////
// REQUEST NORMALIZER
//////////////////////////////////////////////////////////////

export function normalizeAIRequest<

T extends AIRequest

>(

 input:T

):T {


 return {


  ...input,


  provider:

    input.provider
    ||
    "nationpath-ai",



  model:

    input.model
    ||
    AI_CONFIG.MODEL,



  temperature:

    input.temperature
    ??
    AI_CONFIG.TEMPERATURE,



  topP:

    input.topP
    ??
    AI_CONFIG.TOP_P,



  maxOutputTokens:

    input.maxOutputTokens
    ??
    AI_CONFIG.MAX_OUTPUT_TOKENS,


 };


}







//////////////////////////////////////////////////////////////
// LANGUAGE CHECK
//////////////////////////////////////////////////////////////

export function isValidAstroLanguage(

lang?:string

):lang is AstroLanguage {


 return [

  "english",
  "hindi",
  "marathi",
  "tamil",
  "telugu",
  "nepali",

 ]
 .includes(
   lang || ""
 );


}







//////////////////////////////////////////////////////////////
// MODEL CHECK
//////////////////////////////////////////////////////////////

export function isValidModel(

model?:string

):model is AIModel {


 return [

  "nationpath-core-v1",

 ]
 .includes(
   model || ""
 );


}







//////////////////////////////////////////////////////////////
// CONTENT TYPE CHECK
//////////////////////////////////////////////////////////////

export function isValidContentType(

type?:string

):type is AIContentType {


 return [

  "news",
  "breaking-news",
  "editorial",
  "horoscope",
  "seo",
  "social",
  "rewrite",
  "translate",
  "summary",

 ]
 .includes(
   type || ""
 );


}







//////////////////////////////////////////////////////////////
// SAFE VALIDATION PIPELINE
//////////////////////////////////////////////////////////////

export function validateAndNormalize<T extends AIRequest>(

 schema:z.ZodType<T>,

 input:unknown

)
{


 const validated =

  validate(
    schema,
    input
  );



 if(!validated.success){

   return validated;

 }



 return {


  success:true,


  data:

   normalizeAIRequest(

    validated.data

   ),


 };


}








//////////////////////////////////////////////////////////////
// DEFAULT EXPORT
//////////////////////////////////////////////////////////////

export default {


 validate,


 validateAndNormalize,


 normalizeAIRequest,


 isValidAstroLanguage,


 isValidModel,


 isValidContentType,


 contentTypeSchema,


 newsRequestSchema,


 editorialRequestSchema,


 rewriteRequestSchema,


 seoRequestSchema,


 socialRequestSchema,


 horoscopeRequestSchema,


};