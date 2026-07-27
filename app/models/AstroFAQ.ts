//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO FAQ INTELLIGENCE CMS MODEL
//
// Purpose:
// Astrology FAQ knowledge management only.
//
// Does NOT:
// - calculate astrology
// - generate predictions
// - modify astro engine
//////////////////////////////////////////////////////////////

import mongoose, { Schema, Document, Model } from "mongoose";



export interface IAstroFAQ extends Document {


  question:string;


  slug:string;



  answer:string;




  category:
    | "general"
    | "zodiac"
    | "planet"
    | "house"
    | "nakshatra"
    | "panchang"
    | "dosha"
    | "yoga"
    | "dasha"
    | "remedy"
    | "kundli"
    | "other";




  language?:string;



  relatedZodiac?:string[];



  relatedPlanets?:string[];



  relatedDoshas?:string[];



  relatedYogas?:string[];



  relatedDashas?:string[];



  relatedRemedies?:string[];




  keywords?:string[];




  priority?:number;




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









const AstroFAQSchema =

new Schema<IAstroFAQ>(


{


question:{


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





answer:{


type:String,


required:true,


default:"",


},





category:{


type:String,


enum:[


"general",


"zodiac",


"planet",


"house",


"nakshatra",


"panchang",


"dosha",


"yoga",


"dasha",


"remedy",


"kundli",


"other",


],


default:"general",


},





language:{


type:String,


default:"english",


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






keywords:[


{


type:String,


}


],






priority:{


type:Number,


default:1,


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









const AstroFAQ:Model<IAstroFAQ> =



mongoose.models.AstroFAQ ||



mongoose.model<IAstroFAQ>(


"AstroFAQ",


AstroFAQSchema


);







export default AstroFAQ;