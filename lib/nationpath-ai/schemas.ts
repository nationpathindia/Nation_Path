import { z } from "zod";


//////////////////////////////////////////////////////////////
// COMMON
//////////////////////////////////////////////////////////////

export const LanguageSchema = z.enum([
  "english",
  "hindi",
  "marathi",
  "tamil",
  "telugu",
  "nepali",
]);


export const ScoreSchema = z
  .number()
  .min(0)
  .max(100);




//////////////////////////////////////////////////////////////
// ARTICLE
//////////////////////////////////////////////////////////////

export const GeneratedArticleSchema = z.object({

  title:
    z.string()
    .min(5),


  slug:
    z.string()
    .min(3),


  excerpt:
    z.string(),


  content:
    z.string()
    .min(100),


  tags:
    z.array(
      z.string()
    )
    .default([]),


  metaTitle:
    z.string(),


  metaDescription:
    z.string(),


  metaKeywords:
    z.string(),


  readingTime:
    z.number()
    .default(5),

});






//////////////////////////////////////////////////////////////
// SEO
//////////////////////////////////////////////////////////////

export const GeneratedSEOSchema = z.object({

  metaTitle:
    z.string(),


  metaDescription:
    z.string(),


  metaKeywords:
    z.string(),


  slug:
    z.string(),

});






//////////////////////////////////////////////////////////////
// SOCIAL
//////////////////////////////////////////////////////////////

export const GeneratedSocialSchema = z.object({

  facebook:
    z.string(),


  instagram:
    z.string(),


  twitter:
    z.string(),


  linkedin:
    z.string(),


  whatsapp:
    z.string(),


  telegram:
    z.string(),


  hashtags:
    z.array(
      z.string()
    )
    .default([]),

});







//////////////////////////////////////////////////////////////
// HOROSCOPE
//
// Base AI Horoscope Data
//
// Used by:
// Daily Horoscope
// Weekly Horoscope
// Monthly Horoscope
//////////////////////////////////////////////////////////////

export const HoroscopeSchema = z.object({

  
  ////////////////////////////////////////////////////////////
  // IDENTITY
  ////////////////////////////////////////////////////////////

  zodiacSign:
    z.string(),


  horoscopeDate:
    z.string(),


  zodiacDateRange:
    z.string(),





  ////////////////////////////////////////////////////////////
  // PREDICTIONS
  ////////////////////////////////////////////////////////////

  lovePrediction:
    z.string(),


  careerPrediction:
    z.string(),


  financePrediction:
    z.string(),


  healthPrediction:
    z.string(),


  travelPrediction:
    z.string(),


  moodPrediction:
    z.string(),






  ////////////////////////////////////////////////////////////
  // LUCK FACTORS
  ////////////////////////////////////////////////////////////

  luckyColor:
    z.string()
    .default(""),


  luckyNumber:
    z.string()
    .default(""),


  luckyTime:
    z.string()
    .default(""),


  luckyDirection:
    z.string()
    .default(""),


  luckyGemstone:
    z.string()
    .default(""),


  luckyFlower:
    z.string()
    .default(""),


  luckyPlant:
    z.string()
    .default(""),


  luckyFood:
    z.string()
    .default(""),


  luckyMetal:
    z.string()
    .default(""),


  luckyMantra:
    z.string()
    .default(""),






  ////////////////////////////////////////////////////////////
  // PLANETARY INTELLIGENCE
  ////////////////////////////////////////////////////////////

  moonSign:
    z.string(),


  sunSign:
    z.string(),


  moonPhase:
    z.string(),


  planetInfluence:
    z.string(),


  currentTransit:
    z.string(),






  ////////////////////////////////////////////////////////////
  // PANCHANG
  ////////////////////////////////////////////////////////////

  tithi:
    z.string(),


  nakshatra:
    z.string(),


  yoga:
    z.string(),


  karana:
    z.string(),


  sunrise:
    z.string(),


  sunset:
    z.string(),


  moonrise:
    z.string(),


  moonset:
    z.string(),


  rahuKaal:
    z.string(),


  abhijitMuhurat:
    z.string(),


  amritKaal:
    z.string(),






  ////////////////////////////////////////////////////////////
  // COMPATIBILITY
  ////////////////////////////////////////////////////////////

  compatibleSigns:
    z.array(
      z.string()
    )
    .default([]),


  avoidSigns:
    z.array(
      z.string()
    )
    .default([]),






  ////////////////////////////////////////////////////////////
  // REMEDIES
  ////////////////////////////////////////////////////////////

  todayRemedy:
    z.string(),


  chantMantra:
    z.string(),


  donation:
    z.string(),


  auspiciousWork:
    z.string(),


  avoidToday:
    z.string(),






  ////////////////////////////////////////////////////////////
  // SCORES
  ////////////////////////////////////////////////////////////

  loveScore:
    ScoreSchema,


  careerScore:
    ScoreSchema,


  financeScore:
    ScoreSchema,


  healthScore:
    ScoreSchema,


  loveCompatibility:
    ScoreSchema,


  careerGrowth:
    ScoreSchema,


  wealthEnergy:
    ScoreSchema,


  mentalPeace:
    ScoreSchema,


  familyHarmony:
    ScoreSchema,


  travelLuck:
    ScoreSchema,


  overallLuck:
    ScoreSchema,






  ////////////////////////////////////////////////////////////
  // SEO
  ////////////////////////////////////////////////////////////

  astroTitle:
    z.string(),


  astroDescription:
    z.string(),






  ////////////////////////////////////////////////////////////
  // SOCIAL
  ////////////////////////////////////////////////////////////

  shareTitle:
    z.string(),


  shareDescription:
    z.string(),


});
//////////////////////////////////////////////////////////////
// PREDICTION ENHANCEMENT
//
// AI Editorial Layer
// Does NOT modify astrology calculation
//
// OpenAI Structured Output Compatible
// All fields required
// Optional values use nullable()
//////////////////////////////////////////////////////////////

export const PredictionEnhancementSchema = z.object({


  headline:
    z.string(),



  overview:
    z.string(),



  naturalSummary:
    z.string()
    .nullable(),





  guidance:

    z.array(
      z.string()
    ),







  planetaryPredictions:

    z.array(

      z.object({

        name:
          z.string(),


        message:
          z.string(),


        positive:

          z.array(
            z.string()
          ),


        caution:

          z.array(
            z.string()
          ),


      })

    ),







  lifePredictions:

    z.array(

      z.object({

        summary:
          z.string(),



        messages:

          z.array(

            z.object({


              title:
                z.string(),



              prediction:
                z.string(),




              summary:
                z.string()
                .nullable(),




              guidance:
                z.string()
                .nullable(),




              explanation:
                z.string()
                .nullable(),




              recommendation:
                z.string()
                .nullable(),



            })

          ),



      })

    ),








  opportunities:

    z.array(

      z.object({

        title:
          z.string(),


        description:
          z.string(),


      })

    ),








  cautions:

    z.array(

      z.object({

        title:
          z.string(),


        description:
          z.string(),


      })

    ),









  narrative:

    z.object({

      opening:
        z.string(),


      development:
        z.string(),


      advice:
        z.string(),


      closing:
        z.string(),


    })
    .nullable(),



});

//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

export type PredictionEnhancement =
  z.infer<
    typeof PredictionEnhancementSchema
  >;