//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Lagna Intelligence Model
//
// Purpose:
// Knowledge management for:
// - Ascendant / Lagna
// - Personality Interpretation
// - Life Direction
// - Physical & Mental Traits
//
// IMPORTANT:
// This model DOES NOT calculate Lagna.
// Calculation handled by Astro Engine only.
//////////////////////////////////////////////////////////////

import mongoose, { Schema, Document, Model } from "mongoose";



export interface ILagnaIntelligence extends Document {


  // Main Identity

  lagna: string;

  slug: string;



  // Multilingual

  names: {

    en?: string;

    hi?: string;

    ne?: string;

  };



  // Lagna Classification

  classification: {

    element?: string;

    nature?: string;

    lord?: string;

    description?: string;

  };



  // Core Knowledge

  personalityTraits: string[];

  physicalTraits: string[];

  mentalTraits: string[];



  // Life Areas

  career: string;

  finance: string;

  marriage: string;

  health: string;

  education: string;



  // Interpretation

  strengths: string[];

  weaknesses: string[];


  challenges: string[];


  lifeDirection: string;



  // Planetary Relationship

  supportivePlanets: string[];

  challengingPlanets: string[];



  // Remedies

  remedies: {

    mantra?: string;

    gemstone?: string;

    metal?: string;

    donation?: string;

    ritual?: string;

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





const LagnaIntelligenceSchema =

new Schema<ILagnaIntelligence>(


{


lagna: {

type:String,

required:true,

lowercase:true,

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






classification: {


element:String,

nature:String,

lord:String,

description:String,


},





personalityTraits:[

{

type:String,

}

],




physicalTraits:[

{

type:String,

}

],




mentalTraits:[

{

type:String,

}

],






career: {

type:String,

default:"",

},



finance: {

type:String,

default:"",

},



marriage: {

type:String,

default:"",

},



health: {

type:String,

default:"",

},



education: {

type:String,

default:"",

},





strengths:[

{

type:String,

}

],




weaknesses:[

{

type:String,

}

],




challenges:[

{

type:String,

}

],





lifeDirection: {

type:String,

default:"",

},





supportivePlanets:[

{

type:String,

}

],




challengingPlanets:[

{

type:String,

}

],






remedies:{


mantra:String,

gemstone:String,

metal:String,

donation:String,

ritual:String,


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







const LagnaIntelligence:

Model<ILagnaIntelligence> =

mongoose.models.LagnaIntelligence ||

mongoose.model<ILagnaIntelligence>(

"LagnaIntelligence",

LagnaIntelligenceSchema

);






export default LagnaIntelligence;