//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Compatibility Intelligence Model
//
// Purpose:
// Knowledge management for:
// - Kundli Compatibility
// - Marriage Compatibility
// - Guna Milan Interpretation
// - Relationship Analysis
//
// IMPORTANT:
// This model DOES NOT calculate compatibility.
// Calculation handled by Astro Engine only.
//////////////////////////////////////////////////////////////

import mongoose, { Schema, Document, Model } from "mongoose";



export interface ICompatibilityIntelligence extends Document {


  // Main Identity

  title: string;

  slug: string;



  // Multilingual

  names: {

    en?: string;

    hi?: string;

    ne?: string;

  };



  // Compatibility Classification

  compatibilityType: {

    type:
    | "guna_milan"
    | "marriage"
    | "relationship"
    | "planetary"
    | "general";


    description?: string;

  };



  // Knowledge Areas

  factors: string[];


  importance: string;


  interpretation: string;



  // Compatibility Results Knowledge

  positiveIndicators: string[];


  negativeIndicators: string[];


  challenges: string[];



  // Relationship Areas

  emotionalCompatibility: string;

  mentalCompatibility: string;

  physicalCompatibility: string;

  financialCompatibility: string;

  familyCompatibility: string;



  // Guna Knowledge

  gunaDetails: {

    varna?: string;

    vashya?: string;

    tara?: string;

    yoni?: string;

    grahaMaitri?: string;

    gana?: string;

    bhakoot?: string;

    nadi?: string;

  };



  // Remedies

  remedies: {

    mantra?: string;

    gemstone?: string;

    donation?: string;

    ritual?: string;

    guidance?: string;

  };



  // Content

  description: string;



  // Media

  media: {

    image?: string;

    icon?: string;

    video?: string;

  };



  // SEO

  seo: {

    title?: string;

    description?: string;

    keywords?: string[];

  };



  // Status

  status:

  | "draft"

  | "published";



  createdAt: Date;

  updatedAt: Date;


}






const CompatibilityIntelligenceSchema =

new Schema<ICompatibilityIntelligence>(


{


title: {

type:String,

required:true,

},



slug: {

type:String,

required:true,

unique:true,

},





names: {

en:String,

hi:String,

ne:String,

},






compatibilityType: {


type:{


type:String,


enum:[


"guna_milan",

"marriage",

"relationship",

"planetary",

"general",


],


default:"general",


},



description:String,


},







factors:[

{

type:String,

}

],





importance: {

type:String,

default:"",

},





interpretation: {

type:String,

default:"",

},







positiveIndicators:[

{

type:String,

}

],





negativeIndicators:[

{

type:String,

}

],





challenges:[

{

type:String,

}

],









emotionalCompatibility: {

type:String,

default:"",

},



mentalCompatibility: {

type:String,

default:"",

},



physicalCompatibility: {

type:String,

default:"",

},



financialCompatibility: {

type:String,

default:"",

},



familyCompatibility: {

type:String,

default:"",

},









gunaDetails:{


varna:String,

vashya:String,

tara:String,

yoni:String,

grahaMaitri:String,

gana:String,

bhakoot:String,

nadi:String,


},







remedies:{


mantra:String,

gemstone:String,

donation:String,

ritual:String,

guidance:String,


},







description:{


type:String,

required:true,


},








media:{


image:String,

icon:String,

video:String,


},








seo:{


title:String,

description:String,


keywords:[

{

type:String,

}

],


},









status:{


type:String,


enum:[

"draft",

"published",

],


default:"draft",


},






},


{


timestamps:true,


}


);









const CompatibilityIntelligence:

Model<ICompatibilityIntelligence> =


mongoose.models.CompatibilityIntelligence ||


mongoose.model<ICompatibilityIntelligence>(


"CompatibilityIntelligence",


CompatibilityIntelligenceSchema


);








export default CompatibilityIntelligence;