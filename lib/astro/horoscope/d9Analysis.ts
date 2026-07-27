//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO D1 + D9 COMBINED INTELLIGENCE ENGINE
//////////////////////////////////////////////////////////////

import {

  calculatePlanetStrength,

} from "./strength";


import type {

  D9Planet,

} from "../charts/types";


import type {
  PlanetName,
} from "./types";



//////////////////////////////////////////////////////////////
// RESULT TYPE
//////////////////////////////////////////////////////////////

export interface D9CombinedAnalysis {


  planet:string;



  d1:{

    rashi:string;

    strength:number;

    dignity:string;

  };



  d9:{

    rashi:string;

    strength:number;

    dignity:string;

  };



  result:{

    status:string;

    combinedStrength:number;

    keywords:string[];

  };


}





//////////////////////////////////////////////////////////////
// STATUS GENERATOR
//////////////////////////////////////////////////////////////

function getStatus(

 score:number

):string {


  if(score >= 80)

    return "Very Strong";


  if(score >= 65)

    return "Strong";


  if(score >= 45)

    return "Average";


  return "Weak";


}






//////////////////////////////////////////////////////////////
// KEYWORD GENERATOR
//////////////////////////////////////////////////////////////

function generateKeywords(

 d1Dignity:string,

 d9Dignity:string,

 status:string

):string[] {


 const keywords:string[] = [];



 keywords.push(

   d1Dignity

 );


 keywords.push(

   d9Dignity

 );


 keywords.push(

   status

 );


 keywords.push(

   "D1 + D9 Combined Analysis"

 );


 return keywords;


}







//////////////////////////////////////////////////////////////
// PLANET ANALYSIS
//////////////////////////////////////////////////////////////

function analyzePlanet(

 planet:D9Planet

):D9CombinedAnalysis {



 const d1Strength =

 calculatePlanetStrength(

  planet.planet as PlanetName,

  planet.d1.rashi as any

);




 const d9Strength =

calculatePlanetStrength(

  planet.planet as PlanetName,

  planet.d9.rashi as any

);




 const combinedStrength =

 Math.round(

   (

    d1Strength.score * 0.6

    +

    d9Strength.score * 0.4

   )

 );





 const status =

 getStatus(

   combinedStrength

 );





 return {


   planet:


     planet.planet,




   d1:{


     rashi:


       planet.d1.rashi,



     strength:


       d1Strength.score,



     dignity:


       d1Strength.dignity,


   },





   d9:{


     rashi:


       planet.d9.rashi,



     strength:


       d9Strength.score,



     dignity:


       d9Strength.dignity,


   },





   result:{


     status,



     combinedStrength,



     keywords:

       generateKeywords(

         d1Strength.dignity,

         d9Strength.dignity,

         status

       ),


   }



 };

}








//////////////////////////////////////////////////////////////
// MAIN FUNCTION
//////////////////////////////////////////////////////////////

export function analyzeD1D9(

 planets:D9Planet[]

):D9CombinedAnalysis[] {


 return planets.map(

   planet =>

     analyzePlanet(

       planet

     )

 );


}