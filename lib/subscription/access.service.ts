//////////////////////////////////////////////////////////////
// NATIONPATH SUBSCRIPTION ACCESS SERVICE
//
// Handles:
// - User subscription lookup
// - Current plan
// - Feature permission check
// - Astro/Kids/News access
//////////////////////////////////////////////////////////////


import { connectMongoDB } from "@/lib/mongodb";

import Subscription from "@/app/models/Subscription";



/**
 * Get Active User Subscription
 */
export async function getUserSubscription(
  userId:string
){

  await connectMongoDB();



  return Subscription
    .findOne({

      userId,

      status:"active",

    })
    .populate({

      path:"planId",

      populate:{

        path:"features",

        match:{
          status:"active",
        },

      },

    });

}



/**
 * Get Current Active Plan
 */
export async function getCurrentPlan(
  userId:string
){

  const subscription =
    await getUserSubscription(userId);



  if(!subscription)
    return null;



  return subscription.planId ?? null;

}



/**
 * Check User Has Active Subscription
 */
export async function hasActiveSubscription(
  userId:string
){

  const subscription =
    await getUserSubscription(userId);



  return Boolean(subscription);

}



/**
 * Feature Permission Engine
 *
 * Example:
 *
 * astro.kundali
 * astro.career
 * kids.story
 *
 */
export async function canAccessFeature(

  userId:string,

  featureSlug:string

):Promise<boolean>{



  const subscription =
    await getUserSubscription(userId);



  if(!subscription)
    return false;



  const plan:any =
    subscription.planId;



  if(
    !plan ||
    !plan.features ||
    plan.features.length===0
  ){

    return false;

  }



  return plan.features.some(

    (feature:any)=>

      feature.slug === featureSlug &&

      feature.status === "active"

  );


}