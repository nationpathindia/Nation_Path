//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// LANGUAGE INTELLIGENCE TEST RUNNER
//
// Development Validation Only
//
// Does not modify prediction engine.
//////////////////////////////////////////////////////////////


import {

  resolvePlanetLanguage,

  createLanguageContext,

  composeLanguage,

} from "../intelligence/language";




//////////////////////////////////////////////////////////////
// SINGLE PLANET TEST
//////////////////////////////////////////////////////////////

export function testPlanetLanguage(

  planet:string,

  score:number,

  area:any = "career"

){


  const context =

    createLanguageContext(

      planet,

      score,

      area

    );



  return resolvePlanetLanguage(

    context

  );


}





//////////////////////////////////////////////////////////////
// MULTI PLANET TEST
//////////////////////////////////////////////////////////////

export function testPremiumComposition(){


  const planets = [


    resolvePlanetLanguage(

      createLanguageContext(

        "Jupiter",

        85,

        "career"

      )

    ),



    resolvePlanetLanguage(

      createLanguageContext(

        "Mars",

        72,

        "ambition"

      )

    ),



    resolvePlanetLanguage(

      createLanguageContext(

        "Moon",

        65,

        "relationship"

      )

    ),


  ];




  return composeLanguage(

    planets,

    "career"

  );


}





//////////////////////////////////////////////////////////////
// DEBUG OUTPUT
//////////////////////////////////////////////////////////////

export function debugLanguageEngine(){


  return {


    jupiter:

      testPlanetLanguage(

        "Jupiter",

        85,

        "career"

      ),



    saturn:

      testPlanetLanguage(

        "Saturn",

        35,

        "career"

      ),



    venus:

      testPlanetLanguage(

        "Venus",

        75,

        "relationship"

      ),



    composed:

      testPremiumComposition(),


  };


}