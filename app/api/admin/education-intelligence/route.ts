//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO EDUCATION INTELLIGENCE CMS ADMIN API
//
// GET  -> List Education Intelligence
// POST -> Create Education Intelligence
//
// Responsibility:
// Astrology education knowledge management only.
//
// Does NOT:
// - calculate horoscope
// - modify astro engine
// - modify Swiss Ephemeris
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import EducationIntelligence from "@/app/models/EducationIntelligence";



export const dynamic = "force-dynamic";









//////////////////////////////////////////////////////////////
// GET ALL EDUCATION INTELLIGENCE
//////////////////////////////////////////////////////////////

export async function GET(){


  try{


    await connectMongoDB();







    const education =


      await (EducationIntelligence as any)

      .find({})

      .sort({

        createdAt:-1,

      })

      .lean();







    return NextResponse.json(

      {

        success:true,

        count:education.length,

        data:education,

      }

    );



  }


  catch(error:any){


    console.error(

      "[EDUCATION_INTELLIGENCE_GET_ERROR]",

      error

    );







    return NextResponse.json(

      {

        success:false,


        message:

          "Failed to fetch education intelligence",



        error:

          error.message,

      },


      {

        status:500,

      }

    );



  }


}















//////////////////////////////////////////////////////////////
// CREATE EDUCATION INTELLIGENCE
//////////////////////////////////////////////////////////////

export async function POST(

 req:NextRequest

){


 try{


    await connectMongoDB();







    const body =


      await req.json();









    if(

      !body.title ||

      !body.slug ||

      !body.interpretation

    ){



      return NextResponse.json(

        {

          success:false,


          message:

          "Title, slug and interpretation are required",


        },


        {

          status:400,

        }

      );


    }









    const title =


      String(body.title)

      .trim();








    const slug =


      String(body.slug)

      .trim()

      .toLowerCase();









    const interpretation =


      String(body.interpretation)

      .trim();









    const existing =


      await (EducationIntelligence as any)

      .findOne({

        slug,

      });









    if(existing){



      return NextResponse.json(

        {

          success:false,


          message:

          "Education intelligence already exists",


        },


        {

          status:409,

        }

      );



    }









    const payload = {



      title,



      slug,






      category:


        body.category || "education",







      educationType:


        body.educationType || "general",







      planets:


        body.planets || [],







      zodiacSigns:


        body.zodiacSigns || [],







      houses:


        body.houses || [],







      learningAreas:


        body.learningAreas || [],







      studyPatterns:


        body.studyPatterns || [],







      educationStrengths:


        body.educationStrengths || [],







      academicChallenges:


        body.academicChallenges || [],







      skills:


        body.skills || [],







      subjects:


        body.subjects || [],







      learningAbility:


        body.learningAbility || "",







      higherEducation:


        body.higherEducation || "",







      careerEducation:


        body.careerEducation || "",







      planetaryInfluence:


        body.planetaryInfluence || "",







      zodiacInfluence:


        body.zodiacInfluence || "",







      houseInfluence:


        body.houseInfluence || "",







      interpretation,







      guidance:


        body.guidance || "",







      remedies:


        body.remedies || "",







      media:


        body.media || {},







      seo:


        body.seo || {},







      status:



        body.status === "published"

        ?

        "published"

        :

        "draft",



    };









    const created =


      await (EducationIntelligence as any)

      .create(payload);









    return NextResponse.json(

      {

        success:true,



        message:

        "Education intelligence created successfully",




        data:created,


      },


      {

        status:201,

      }

    );








 }


 catch(error:any){



    console.error(

      "[EDUCATION_INTELLIGENCE_CREATE_ERROR]",

      error

    );







    if(error.code === 11000){



      return NextResponse.json(

        {

          success:false,


          message:

          "Duplicate slug",

        },


        {

          status:409,

        }

      );



    }









    return NextResponse.json(

      {

        success:false,


        message:

        "Failed to create education intelligence",



        error:

        error.message,

      },


      {

        status:500,

      }

    );



 }


}