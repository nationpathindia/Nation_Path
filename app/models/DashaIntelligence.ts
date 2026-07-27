//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Dasha Intelligence Model
//
// Purpose:
// Knowledge management for:
// - Vimshottari Dasha
// - Mahadasha
// - Antardasha
// - Planetary Period Interpretation
//
// IMPORTANT:
// This model DOES NOT calculate dasha.
// Calculation handled by Astro Engine only.
//////////////////////////////////////////////////////////////

import mongoose, { Schema, Document, Model } from "mongoose";


export interface IDashaIntelligence extends Document {


  // Main Identity

  planet: string;

  slug: string;


  // Multilingual

  names: {

    en?: string;

    hi?: string;

    ne?: string;

  };


  // Dasha Classification

  dashaType: {

    type: "mahadasha" | "antardasha" | "pratyantar";

    parentPlanet?: string;

  };


  // Planet Information

  nature: {

    benefic?: boolean;

    description?: string;

  };


  // Duration Knowledge

  duration: {

    years?: number;

    months?: number;

    description?: string;

  };


  // Astrology Knowledge

  karakatva: string[];

  profession: string[];

  relationships: string[];


  // Effects

  positiveEffects: string[];

  negativeEffects: string[];


  challenges: string[];


  // Life Areas

  career: string;

  finance: string;

  marriage: string;

  health: string;


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



const DashaIntelligenceSchema =
new Schema<IDashaIntelligence>(


{


planet: {

type: String,

required: true,

lowercase: true,

},



slug: {

type: String,

required: true,

unique: true,

},



names: {

en: String,

hi: String,

ne: String,

},



dashaType: {


type: {

type: String,

enum: [

"mahadasha",

"antardasha",

"pratyantar",

],

default: "mahadasha",

},


parentPlanet: {

type: String,

},


},



nature: {


benefic: {

type: Boolean,

default: false,

},


description: {

type: String,

},


},



duration: {


years: {

type: Number,

},


months: {

type: Number,

},


description: {

type: String,

},


},




karakatva: [

{

type: String,

}

],



profession: [

{

type: String,

}

],



relationships: [

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




const DashaIntelligence:

Model<IDashaIntelligence> =
mongoose.models.DashaIntelligence ||
mongoose.model<IDashaIntelligence>(
"DashaIntelligence",
DashaIntelligenceSchema
);



export default DashaIntelligence;