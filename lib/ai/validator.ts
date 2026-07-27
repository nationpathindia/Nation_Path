//////////////////////////////////////////////////////////////
// NATIONPATH AI VALIDATOR
// Input Safety + Schema Enforcement Layer
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
} from "./types";

//////////////////////////////////////////////////////////////
// BASE SCHEMA
//////////////////////////////////////////////////////////////

const baseAIRequestSchema = z.object({

  provider:
    z.literal("openai")
    .optional(),

  model:
    z
      .enum([
        "gpt-5.5",
        "gpt-5",
        "gpt-5-mini",
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
// NEWS VALIDATION
//////////////////////////////////////////////////////////////

export const newsRequestSchema: z.ZodType<NewsRequest> =
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
// EDITORIAL VALIDATION
//////////////////////////////////////////////////////////////

export const editorialRequestSchema: z.ZodType<EditorialRequest> =
  baseAIRequestSchema.extend({

    topic:
      z.string()
      .min(5),

  });


//////////////////////////////////////////////////////////////
// REWRITE VALIDATION
//////////////////////////////////////////////////////////////

export const rewriteRequestSchema: z.ZodType<RewriteRequest> =
  baseAIRequestSchema.extend({

    content:
      z.string()
      .min(10),

  });


//////////////////////////////////////////////////////////////
// SEO VALIDATION
//////////////////////////////////////////////////////////////

export const seoRequestSchema: z.ZodType<SEORequest> =
  baseAIRequestSchema.extend({

    title:
      z.string()
      .min(5),

    content:
      z.string()
      .min(20),

  });


//////////////////////////////////////////////////////////////
// SOCIAL VALIDATION
//////////////////////////////////////////////////////////////

export const socialRequestSchema: z.ZodType<SocialRequest> =
  baseAIRequestSchema.extend({

    title:
      z.string()
      .min(5),

    content:
      z.string()
      .min(20),

  });


//////////////////////////////////////////////////////////////
// HOROSCOPE VALIDATION
//////////////////////////////////////////////////////////////

export const horoscopeRequestSchema: z.ZodType<HoroscopeRequest> =
  baseAIRequestSchema.extend({

    zodiacSign:
      z.string()
      .min(3),

    horoscopeDate:
      z.coerce.date(),

  });


//////////////////////////////////////////////////////////////
// GENERIC VALIDATOR CORE
//////////////////////////////////////////////////////////////

export function validate<T>(
  schema: z.ZodType<T>,
  input: unknown
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


  if (!result.success) {

    return {

      success:false,

      error:
        result.error.issues
          .map(
            (e)=>e.message
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

export function normalizeAIRequest<T extends AIRequest>(
  input:T
):T {

  return {

    ...input,

    model:
      (input.model as AIModel)
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
// LANGUAGE VALIDATION HELPER
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

  ].includes(
    lang || ""
  );

}


//////////////////////////////////////////////////////////////
// MODEL VALIDATION HELPER
//////////////////////////////////////////////////////////////

export function isValidModel(
  model?:string
):model is AIModel {

  return [

    "gpt-5.5",
    "gpt-5",
    "gpt-5-mini",

  ].includes(
    model || ""
  );

}


//////////////////////////////////////////////////////////////
// SAFE PIPELINE VALIDATOR
//////////////////////////////////////////////////////////////

export function validateAndNormalize<T extends AIRequest>(
  schema:z.ZodType<T>,
  input:unknown
):
| {
  success:true;
  data:T;
}
|
{
  success:false;
  error:string;
}
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


  newsRequestSchema,

  editorialRequestSchema,

  rewriteRequestSchema,

  seoRequestSchema,

  socialRequestSchema,

  horoscopeRequestSchema,

};