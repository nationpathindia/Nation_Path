import { NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import Feature from "@/app/models/Feature";
import SubscriptionPlan from "@/app/models/SubscriptionPlan";


export async function GET() {

  try {

    console.log(
      "MONGODB_URI:",
      process.env.MONGODB_URI ? "FOUND" : "MISSING"
    );


    await connectMongoDB();


    console.log(
      "MongoDB Connected"
    );



    const features = [

      {
        name: "Daily Horoscope",
        slug: "astro_daily_horoscope",
        product: "astro",
        description:
          "Daily basic horoscope access",
      },


      {
        name: "Basic Panchang",
        slug: "astro_basic_panchang",
        product: "astro",
        description:
          "Basic Panchang information",
      },


      {
        name: "Astro Profile",
        slug: "astro_profile",
        product: "astro",
        description:
          "Basic astrology profile",
      },


      {
        name: "Birth Chart",
        slug: "astro_birth_chart",
        product: "astro",
        description:
          "Detailed birth chart analysis",
      },


      {
        name: "Nakshatra Intelligence",
        slug: "astro_nakshatra",
        product: "astro",
        description:
          "Nakshatra analysis",
      },


      {
        name: "Dasha Intelligence",
        slug: "astro_dasha",
        product: "astro",
        description:
          "Dasha analysis",
      },


      {
        name: "Compatibility Intelligence",
        slug: "astro_compatibility",
        product: "astro",
        description:
          "Marriage compatibility analysis",
      },


      {
        name: "Career Intelligence",
        slug: "astro_career_intelligence",
        product: "astro",
        description:
          "Career prediction intelligence",
      },


      {
        name: "Finance Intelligence",
        slug: "astro_finance_intelligence",
        product: "astro",
        description:
          "Finance prediction intelligence",
      },


      {
        name: "Education Intelligence",
        slug: "astro_education_intelligence",
        product: "astro",
        description:
          "Education guidance intelligence",
      },


      {
        name: "Business Intelligence",
        slug: "astro_business_intelligence",
        product: "astro",
        description:
          "Business astrology intelligence",
      },


      {
        name: "Foreign Settlement",
        slug: "astro_foreign_settlement",
        product: "astro",
        description:
          "Foreign settlement analysis",
      },


      {
        name: "AI Astro Assistant",
        slug: "astro_ai_assistant",
        product: "astro",
        description:
          "AI astrology assistant",
      },


      {
        name: "Astro API Access",
        slug: "astro_api_access",
        product: "platform",
        description:
          "Enterprise API access",
      },


      {
        name: "White Label Access",
        slug: "white_label_access",
        product: "platform",
        description:
          "White label support",
      },


    ];



    const featureMap:any = {};



    for(const item of features){


      const feature =
        await Feature.findOneAndUpdate(

          {
            slug:item.slug,
          },

          item,

          {
            upsert:true,
            new:true,
          }

        );


      featureMap[item.slug] =
        feature._id;


    }



    console.log(
      "Features Created"
    );



    const plans = [


      {
        name:"Astro Free",
        slug:"astro_free",
        product:"astro",
        planType:"free",
        billingCycle:"monthly",
        price:0,
        durationDays:0,

        features:[
          featureMap.astro_daily_horoscope,
          featureMap.astro_basic_panchang,
          featureMap.astro_profile,
        ],
      },


      {
        name:"Astro Premium Monthly",
        slug:"astro_premium_monthly",
        product:"astro",
        planType:"premium",
        billingCycle:"monthly",
        price:199,
        durationDays:30,

        features:Object.values(featureMap),
      },


      {
        name:"Astro Premium Yearly",
        slug:"astro_premium_yearly",
        product:"astro",
        planType:"premium",
        billingCycle:"yearly",
        price:1499,
        durationDays:365,

        features:Object.values(featureMap),
      },


      {
        name:"Astro Enterprise",
        slug:"astro_enterprise",
        product:"platform",
        planType:"enterprise",
        billingCycle:"custom",
        price:0,
        durationDays:365,

        features:[
          featureMap.astro_api_access,
          featureMap.white_label_access,
        ],
      },


    ];



    for(const plan of plans){


      await SubscriptionPlan.findOneAndUpdate(

        {
          slug:plan.slug,
        },

        plan,

        {
          upsert:true,
          new:true,
        }

      );


    }



    console.log(
      "Plans Created"
    );



    return NextResponse.json({

      success:true,

      message:
        "Astro subscription seed completed",

    });



  }
  catch(error:any){


    console.error(
      error
    );


    return NextResponse.json(

      {
        success:false,
        message:error.message,
      },

      {
        status:500,
      }

    );

  }

}