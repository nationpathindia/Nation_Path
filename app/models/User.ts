import mongoose, { Schema, models } from "mongoose";


const UserSchema = new Schema(

{

//////////////////////////////////////////////////////
// BASIC PROFILE
//////////////////////////////////////////////////////

name: {

  type:String,

  required:true,

  trim:true,

},



email: {

  type:String,

  required:true,

  unique:true,

  lowercase:true,

  trim:true,

},





//////////////////////////////////////////////////////
// AUTH
//////////////////////////////////////////////////////

password: {

  type:String,

  required:false,

  default:null,

},



provider: {

  type:String,

  enum:[
    "credentials",
    "google",
  ],

  default:"credentials",

},



providerId: {

  type:String,

  default:null,

},






//////////////////////////////////////////////////////
// ROLE SYSTEM
//////////////////////////////////////////////////////

role: {

  type:String,

  enum:[

    "superadmin",

    "admin",

    "editor",

    "reporter",

    "advertiser",

    "user",

  ],

  default:"user",

},





//////////////////////////////////////////////////////
// ACCOUNT STATUS
//////////////////////////////////////////////////////

status: {

  type:String,

  enum:[

    "active",

    "blocked",

  ],

  default:"active",

},






//////////////////////////////////////////////////////
// PROFILE
//////////////////////////////////////////////////////

avatar: {

  type:String,

  default:null,

},



profile: {


  phone: {

    type:String,

    default:null,

    trim:true,

  },


  bio: {

    type:String,

    default:null,

    trim:true,

  },


  department: {

    type:String,

    default:null,

    trim:true,

  },


  designation: {

    type:String,

    default:null,

    trim:true,

  },


  location: {

    type:String,

    default:null,

    trim:true,

  },


  socialLinks:{


    website: {

      type:String,

      default:null,

      trim:true,

    },


    twitter: {

      type:String,

      default:null,

      trim:true,

    },


    linkedin: {

      type:String,

      default:null,

      trim:true,

    },


  },


},





//////////////////////////////////////////////////////
// PERMISSION SYSTEM
//
// Superadmin can control access
//////////////////////////////////////////////////////

permissions:{


  news:{

    type:Boolean,

    default:false,

  },


  astro:{

    type:Boolean,

    default:false,

  },


  ads:{

    type:Boolean,

    default:false,

  },


  revenue:{

    type:Boolean,

    default:false,

  },


  userManagement:{

    type:Boolean,

    default:false,

  },


},











//////////////////////////////////////////////////////
// ASTRO PROFILE
//////////////////////////////////////////////////////

birthProfile: {


type:{



name:{


type:String,


default:null,


trim:true,


},






dateOfBirth:{


type:Date,


default:null,


},





birthTime:{


type:String,


default:null,


},






isBirthTimeApproximate:{


type:Boolean,


default:false,


},






birthPlace:{


type:String,


default:null,


trim:true,


},







location:{



displayName:{


type:String,


default:null,


},




city:{


type:String,


default:null,


},




district:{


type:String,


default:null,


},




state:{


type:String,


default:null,


},




country:{


type:String,


default:null,


},




postalCode:{


type:String,


default:null,


},




latitude:{


type:Number,


default:null,


},




longitude:{


type:Number,


default:null,


},




timezone:{


type:String,


default:null,


},



},







language:{


type:String,


default:"en",


},







zodiacSign:{


type:String,


default:null,


},





moonSign:{


type:String,


default:null,


},





ascendant:{


type:String,


default:null,


},







profileCompleted:{


type:Boolean,


default:false,


},







generatedAt:{


type:Date,


default:null,


},



},





default:{},



},







//////////////////////////////////////////////////////
// META
//////////////////////////////////////////////////////

lastLoginAt:{


type:Date,

default:null,


},







//////////////////////////////////////////////////////
// FUTURE SUBSCRIPTION PLACEHOLDER
//////////////////////////////////////////////////////

subscription:{


plan:{


type:String,


default:"free",


},




status:{


type:String,


enum:[

"active",

"expired",

"cancelled",

],


default:"active",


},




expiresAt:{


type:Date,


default:null,


},



},






},



{


timestamps:true,


}

);





export default (


models.User ||


mongoose.model(

"User",

UserSchema

)


) as mongoose.Model<any>;