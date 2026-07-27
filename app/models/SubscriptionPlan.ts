import mongoose, {
  Schema,
  Document,
  Model,
} from "mongoose";


export interface ISubscriptionPlan extends Document {


  name:string;

  slug:string;


  product:
  | "astro"
  | "kids"
  | "news"
  | "platform";


  planType:
  | "free"
  | "premium"
  | "professional"
  | "enterprise";


  billingCycle:
  | "monthly"
  | "quarterly"
  | "half_yearly"
  | "yearly"
  | "custom";


  price:number;

  originalPrice:number;

  discount:number;


  currency:string;


  durationDays:number;



  features:
  mongoose.Types.ObjectId[];



  description:string;

  shortDescription:string;



  badge:string;



  isPopular:boolean;

  isRecommended:boolean;



  trialEnabled:boolean;

  trialDays:number;



  maxUsers:number;



  displayOrder:number;



  allowUpgrade:boolean;



  // CMS Control

  isVisible:boolean;



  // Permission grouping

  featureGroups:string[];



  seoTitle:string;

  seoDescription:string;



  status:
  | "active"
  | "inactive";



  createdAt:Date;

  updatedAt:Date;

}





const SubscriptionPlanSchema =
new Schema<ISubscriptionPlan>(

{


name:{

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



product:{

type:String,

enum:[

"astro",
"kids",
"news",
"platform"

],

required:true,

},



planType:{

type:String,

enum:[

"free",
"premium",
"professional",
"enterprise"

],

required:true,

},



billingCycle:{

type:String,

enum:[

"monthly",
"quarterly",
"half_yearly",
"yearly",
"custom"

],

default:"monthly",

},



price:{

type:Number,

default:0,

},



originalPrice:{

type:Number,

default:0,

},



discount:{

type:Number,

default:0,

},



currency:{

type:String,

default:"INR",

},



durationDays:{

type:Number,

default:30,

},



features:[

{

type:Schema.Types.ObjectId,

ref:"Feature",

}

],



description:{

type:String,

default:"",

},



shortDescription:{

type:String,

default:"",

},



badge:{

type:String,

default:"",

},



isPopular:{

type:Boolean,

default:false,

},



isRecommended:{

type:Boolean,

default:false,

},



trialEnabled:{

type:Boolean,

default:false,

},



trialDays:{

type:Number,

default:0,

},



maxUsers:{

type:Number,

default:1,

},



displayOrder:{

type:Number,

default:0,

},



allowUpgrade:{

type:Boolean,

default:true,

},



// CMS visibility

isVisible:{

type:Boolean,

default:true,

},



// Example:

// Astro:
// ["kundali","career","marriage"]

// Kids:
// ["stories","rhymes","gk"]

featureGroups:[

{

type:String,

default:"",

}

],



seoTitle:{

type:String,

default:"",

},



seoDescription:{

type:String,

default:"",

},



status:{

type:String,

enum:[

"active",
"inactive"

],

default:"active",

},



},


{

timestamps:true,

}

);





const SubscriptionPlan:Model<ISubscriptionPlan> =


mongoose.models.SubscriptionPlan ||


mongoose.model<ISubscriptionPlan>(

"SubscriptionPlan",

SubscriptionPlanSchema

);



export default SubscriptionPlan;