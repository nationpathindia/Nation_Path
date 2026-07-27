//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO KNOWLEDGE CMS MODEL
//
// Purpose:
// Astrology educational knowledge management only.
//
// Does NOT:
// - calculate astrology
// - generate predictions
// - modify astro engine
//////////////////////////////////////////////////////////////

import mongoose, { Schema, Document, Model } from "mongoose";



export interface IAstroKnowledge extends Document {


  title:string;


  slug:string;



  category:
    | "beginner"
    | "zodiac"
    | "planet"
    | "house"
    | "nakshatra"
    | "panchang"
    | "dosha"
    | "yoga"
    | "dasha"
    | "remedy"
    | "other";



  language?:string;



  shortDescription?:string;



  content?:string;



  relatedZodiac?:string[];


  relatedPlanets?:string[];


  relatedDoshas?:string[];


  relatedYogas?:string[];


  relatedDashas?:string[];


  relatedRemedies?:string[];




  faq?:{


    question:string;


    answer:string;


  }[];



  tags?:string[];



  media?:{


    image?:string;


    video?:string;


  };



  seo?:{


    title?:string;


    description?:string;


    keywords?:string[];


  };



  status:

    | "draft"

    | "published";



  createdAt:Date;


  updatedAt:Date;


}






const AstroKnowledgeSchema =

new Schema<IAstroKnowledge>(


{


title:{


type:String,


required:true,


trim:true,


},




slug:{


type:String,


required:true,


unique:true,


lowercase:true,


trim:true,


},




category:{


type:String,


enum:[


"beginner",


"zodiac",


"planet",


"house",


"nakshatra",


"panchang",


"dosha",


"yoga",


"dasha",


"remedy",


"other",


],


default:"other",


},




language:{


type:String,


default:"english",


},




shortDescription:{


type:String,


default:"",


},




content:{


type:String,


default:"",


},





relatedZodiac:[

{

type:String,

}

],




relatedPlanets:[

{

type:String,

}

],




relatedDoshas:[

{

type:String,

}

],




relatedYogas:[

{

type:String,

}

],




relatedDashas:[

{

type:String,

}

],




relatedRemedies:[

{

type:String,

}

],




faq:[


{


question:{


type:String,


},


answer:{


type:String,


},


}


],




tags:[


{


type:String,


}


],




media:{


image:{


type:String,


default:"",


},


video:{


type:String,


default:"",


},


},




seo:{


title:{


type:String,


default:"",


},


description:{


type:String,


default:"",


},


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





const AstroKnowledge:Model<IAstroKnowledge> =


mongoose.models.AstroKnowledge ||


mongoose.model<IAstroKnowledge>(


"AstroKnowledge",


AstroKnowledgeSchema


);



export default AstroKnowledge;