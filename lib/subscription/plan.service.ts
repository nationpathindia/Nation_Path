//////////////////////////////////////////////////////////////
// NATIONPATH SUBSCRIPTION PLAN SERVICE
//
// Responsibility:
// - Fetch subscription plans
// - Fetch default/free plan
// - Create free subscription
// - Upgrade subscription
// - Cancel subscription
//////////////////////////////////////////////////////////////

import dbConnect from "@/lib/mongodb";

import Subscription from "@/app/models/Subscription";
import SubscriptionPlan from "@/app/models/SubscriptionPlan";



//////////////////////////////////////////////////////////////
// GET PLAN BY SLUG
//////////////////////////////////////////////////////////////

export async function getPlanBySlug(
  slug:string
){

  await dbConnect();


  return SubscriptionPlan.findOne({

    slug,

    status:"active",

  })
  .populate("features");

}



//////////////////////////////////////////////////////////////
// GET PLANS BY PRODUCT
//////////////////////////////////////////////////////////////

export async function getPlansByProduct(
  product:
  "astro" |
  "kids" |
  "news" |
  "platform"
){

  await dbConnect();


  return SubscriptionPlan.find({

    product,

    status:"active",

    isVisible:true,

  })
  .populate("features")
  .sort({

    displayOrder:1,

  });

}



//////////////////////////////////////////////////////////////
// GET DEFAULT FREE PLAN
//////////////////////////////////////////////////////////////

export async function getDefaultPlan(
  product:
  "astro" |
  "kids" |
  "news" |
  "platform"
){

  await dbConnect();


  return SubscriptionPlan.findOne({

    product,

    planType:"free",

    status:"active",

    isVisible:true,

  })
  .populate("features");

}



//////////////////////////////////////////////////////////////
// CREATE FREE SUBSCRIPTION
//////////////////////////////////////////////////////////////

export async function createFreeSubscription(
  userId:string
){

  await dbConnect();



  const existing =
  await Subscription.findOne({

    userId,

    product:"astro",

    status:"active",

  });



  if(existing){

    return existing;

  }



  const freePlan =
  await getDefaultPlan("astro");



  if(!freePlan){

    throw new Error(
      "Free plan not found"
    );

  }




  const expiryDate =
  new Date();



  expiryDate.setDate(

    expiryDate.getDate()
    +
    freePlan.durationDays

  );





  return Subscription.create({

    userId,

    planId:freePlan._id,

    product:freePlan.product,

    status:"active",

    paymentStatus:"paid",

    startDate:new Date(),

    expiryDate,

    autoRenew:false,

  });


}






//////////////////////////////////////////////////////////////
// UPGRADE SUBSCRIPTION
//////////////////////////////////////////////////////////////

export async function upgradeSubscription(
  userId:string,
  planSlug:string
){

  await dbConnect();



  const plan =
  await getPlanBySlug(planSlug);



  if(!plan){

    throw new Error(
      "Plan not found"
    );

  }




  const expiryDate =
  new Date();



  expiryDate.setDate(

    expiryDate.getDate()
    +
    plan.durationDays

  );





  return Subscription.findOneAndUpdate(

    {

      userId,

      product:plan.product,

    },


    {

      planId:plan._id,

      product:plan.product,

      status:"active",

      paymentStatus:"pending",

      startDate:new Date(),

      expiryDate,

    },


    {

      new:true,

      upsert:true,

    }


  );


}






//////////////////////////////////////////////////////////////
// CANCEL SUBSCRIPTION
//////////////////////////////////////////////////////////////

export async function cancelSubscription(
  userId:string
){

  await dbConnect();



  return Subscription.findOneAndUpdate(

    {

      userId,

      status:"active",

    },


    {

      status:"cancelled",

    },


    {

      new:true,

    }


  );


}