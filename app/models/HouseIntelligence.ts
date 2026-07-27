//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// House Intelligence Model
//
// Purpose:
// Knowledge management for:
// - 12 Astrological Houses
// - Bhava Significance
// - Life Area Interpretation
// - House Strength Interpretation
//
// IMPORTANT:
// This model DOES NOT calculate houses.
// Calculation handled by Astro Engine only.
//////////////////////////////////////////////////////////////

import mongoose, { Schema, Document, Model } from "mongoose";


export interface IHouseIntelligence extends Document {


  // Main Identity

  houseNumber: number;

  slug: string;



  // Multilingual

  names: {

    en?: string;

    hi?: string;

    ne?: string;

  };



  // House Classification

  classification: {

    name?: string;

    element?: string;

    category?: string;

    description?: string;

  };



  // Core Significations

  significations: string[];


  // Life Areas

  lifeAreas: string[];



  // Physical & Relationship Knowledge

  bodyParts: string[];

  relationships: string[];



  // Planetary Significance

  naturalSignificator: string[];

  rulingThemes: string[];



  // Interpretation

  strongHouseEffects: string[];

  weakHouseEffects: string[];


  positiveEffects: string[];

  negativeEffects: string[];


  challenges: string[];



  // Detailed Analysis

  career: string;

  finance: string;

  marriage: string;

  health: string;

  education: string;

  children: string;

  property: string;

  spirituality: string;



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



const HouseIntelligenceSchema =
new Schema<IHouseIntelligence>(


{


houseNumber: {

type: Number,

required: true,

unique: true,

},



slug: {

type: String,

required: true,

unique: true,

lowercase: true,

},



names: {

en: String,

hi: String,

ne: String,

},




classification: {


name: String,

element: String,

category: String,

description: String,


},




significations: [

{

type: String,

}

],



lifeAreas: [

{

type: String,

}

],



bodyParts: [

{

type: String,

}

],



relationships: [

{

type: String,

}

],



naturalSignificator: [

{

type: String,

}

],



rulingThemes: [

{

type: String,

}

],



strongHouseEffects: [

{

type: String,

}

],



weakHouseEffects: [

{

type: String,

}

],



positiveEffects: [

{

type: String,

}

],



negativeEffects: [

{

type: String,

}

],



challenges: [

{

type: String,

}

],





career: {

type: String,

default: "",

},



finance: {

type: String,

default: "",

},



marriage: {

type: String,

default: "",

},



health: {

type: String,

default: "",

},



education: {

type: String,

default: "",

},



children: {

type: String,

default: "",

},



property: {

type: String,

default: "",

},



spirituality: {

type: String,

default: "",

},




remedies: {


mantra: String,

gemstone: String,

metal: String,

donation: String,

ritual: String,


},




description: {

type: String,

required: true,

},




media: {


image: String,

icon: String,

video: String,


},




seo: {


title: String,

description: String,


keywords: [

{

type: String,

}

],


},




status: {


type: String,

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





const HouseIntelligence:

Model<IHouseIntelligence> =
mongoose.models.HouseIntelligence ||
mongoose.model<IHouseIntelligence>(

"HouseIntelligence",

HouseIntelligenceSchema

);



export default HouseIntelligence;