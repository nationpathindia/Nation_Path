//////////////////////////////////////////////////////////////
// NATIONPATH BIRTH CHART INTERPRETATION CMS MODEL
//
// Responsibility:
// Astrology birth chart knowledge management only.
//
// CMS ONLY:
// - Stores interpretation knowledge
// - SEO content management
// - Admin controlled publishing
//
// Does NOT:
// - Calculate birth chart
// - Modify Astro Engine
// - Modify Swiss Ephemeris
// - Generate predictions
//
//////////////////////////////////////////////////////////////

import mongoose, { Schema, Document, Model } from "mongoose";





export interface IBirthChartInterpretation extends Document {



  title:string;



  slug:string;



  category:

    | "planet"
    | "house"
    | "aspect"
    | "sign"
    | "combination"
    | "general";



  subject:string;



  planet?:string;



  house?:number;



  zodiac?:string;



  aspect?:string;



  keywords:string[];



  interpretation:string;



  positiveEffects:string[];



  negativeEffects:string[];



  remedies:string[];



  strengths:string[];



  weaknesses:string[];



  examples:string;



  language:

    | "english"
    | "hindi"
    | "nepali"
    | "multi";



  seo:{

    title?:string;

    description?:string;

    keywords?:string[];

  };



  status:

    | "draft"
    | "published";



  priority:number;



  createdAt:Date;



  updatedAt:Date;



}









const BirthChartInterpretationSchema =

new Schema<IBirthChartInterpretation>(



{


  ////////////////////////////////////////////////////////////
  // BASIC INFORMATION
  ////////////////////////////////////////////////////////////


  title:
  {

    type:String,

    required:true,

    trim:true,

  },





  slug:
  {

    type:String,

    required:true,

    unique:true,

    lowercase:true,

    trim:true,

  },








  category:
  {

    type:String,


    enum:
    [

      "planet",

      "house",

      "aspect",

      "sign",

      "combination",

      "general",

    ],


    default:"general",

    required:true,


  },







  subject:
  {

    type:String,

    required:true,

    trim:true,

  },









  ////////////////////////////////////////////////////////////
  // ASTRO REFERENCES
  ////////////////////////////////////////////////////////////


  planet:
  {

    type:String,

    lowercase:true,

    trim:true,

  },





  house:
  {

    type:Number,

    min:1,

    max:12,

  },






  zodiac:
  {

    type:String,

    lowercase:true,

    trim:true,

  },







  aspect:
  {

    type:String,

    trim:true,

  },









  ////////////////////////////////////////////////////////////
  // CONTENT KNOWLEDGE
  ////////////////////////////////////////////////////////////


  keywords:
  [

    {

      type:String,

      trim:true,

      lowercase:true,

    }

  ],







  interpretation:
  {

    type:String,

    required:true,

    trim:true,

  },








  positiveEffects:
  [

    {

      type:String,

      trim:true,

    }

  ],








  negativeEffects:
  [

    {

      type:String,

      trim:true,

    }

  ],









  remedies:
  [

    {

      type:String,

      trim:true,

    }

  ],











  strengths:
  [

    {

      type:String,

      trim:true,

    }

  ],









  weaknesses:
  [

    {

      type:String,

      trim:true,

    }

  ],










  examples:
  {

    type:String,

    default:"",

    trim:true,

  },









  ////////////////////////////////////////////////////////////
  // LANGUAGE
  ////////////////////////////////////////////////////////////


  language:
  {

    type:String,


    enum:
    [

      "english",

      "hindi",

      "nepali",

      "multi",

    ],


    default:"multi",


  },









  ////////////////////////////////////////////////////////////
  // SEO MANAGEMENT
  ////////////////////////////////////////////////////////////


  seo:
  {


    title:
    {

      type:String,

      trim:true,

    },



    description:
    {

      type:String,

      trim:true,

    },



    keywords:
    [

      {

        type:String,

        trim:true,

      }

    ],


  },









  ////////////////////////////////////////////////////////////
  // CMS STATUS
  ////////////////////////////////////////////////////////////


  status:
  {


    type:String,


    enum:
    [

      "draft",

      "published",

    ],



    default:"draft",


  },









  priority:
  {

    type:Number,

    default:1,

  },





},


{


  timestamps:true,


}

);









//////////////////////////////////////////////////////////////
// INDEXES
//////////////////////////////////////////////////////////////


BirthChartInterpretationSchema.index({

  slug:1,

});





BirthChartInterpretationSchema.index({

  category:1,

  status:1,

  priority:-1,

});





BirthChartInterpretationSchema.index({

  keywords:1,

});









const BirthChartInterpretation:


Model<IBirthChartInterpretation> =


mongoose.models.BirthChartInterpretation ||


mongoose.model<IBirthChartInterpretation>(

  "BirthChartInterpretation",

  BirthChartInterpretationSchema

);







export default BirthChartInterpretation;