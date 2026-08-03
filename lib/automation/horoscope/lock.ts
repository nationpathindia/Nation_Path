//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO AUTOMATION
//
// HOROSCOPE GENERATION LOCK
//
// Production Distributed Lock
//
//////////////////////////////////////////////////////////////

import AstroAutoLock from "@/app/models/AstroAutoLock";

import {
  connectMongoDB,
} from "@/lib/mongodb";



const LOCK_KEY =
"astro-daily-horoscope-generation";


const LOCK_TIMEOUT =
15 * 60 * 1000;





//////////////////////////////////////////////////////////////
// CHECK ACTIVE LOCK
//////////////////////////////////////////////////////////////

export async function isHoroscopeGenerationRunning(){


  await connectMongoDB();



  const lock =

  await AstroAutoLock.findOne({

    key:LOCK_KEY,


    expiresAt:{

      $gt:new Date(),

    },


  })
  .lean();




  return !!lock;


}






//////////////////////////////////////////////////////////////
// ACQUIRE LOCK
//////////////////////////////////////////////////////////////

export async function acquireHoroscopeGenerationLock(){


  await connectMongoDB();



  const now =
  new Date();



  const expiresAt =

  new Date(

    now.getTime()

    +

    LOCK_TIMEOUT

  );





  try{


    await AstroAutoLock.create({

      key:LOCK_KEY,

      createdAt:now,

      expiresAt,

    });



    return true;



  }

  catch(error){


    // another request already running

    return false;


  }


}







//////////////////////////////////////////////////////////////
// RELEASE LOCK
//////////////////////////////////////////////////////////////

export async function releaseHoroscopeGenerationLock(){


  await connectMongoDB();



  await AstroAutoLock.deleteOne({

    key:LOCK_KEY,

  });



}






export default {


  isHoroscopeGenerationRunning,


  acquireHoroscopeGenerationLock,


  releaseHoroscopeGenerationLock,


};