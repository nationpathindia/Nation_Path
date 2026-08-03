//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// NARRATIVE CONTEXT INTELLIGENCE v2
//
// Prediction Data
//        ↓
// Narrative Memory
//        ↓
// Duplicate Control
//        ↓
// Premium Story Control
//
// Does NOT:
// - Calculate planets
// - Change astrology rules
// - Change scoring
//////////////////////////////////////////////////////////////


export type NarrativeContext = {

  zodiac?: string;

  dominantPlanet?: string;


  usedPlanets: string[];


  usedThemes: string[];


  usedStatements: string[];


  usedExplanations: string[];


  usedAdvice: string[];

};





//////////////////////////////////////////////////////////////
// THEME DICTIONARY
//////////////////////////////////////////////////////////////

const NARRATIVE_THEMES = [

  "growth",

  "opportunity",

  "confidence",

  "communication",

  "learning",

  "wisdom",

  "discipline",

  "patience",

  "balance",

  "relationships",

  "creativity",

  "ambition",

  "stability",

  "transformation",

];






//////////////////////////////////////////////////////////////
// TEXT NORMALIZER
//////////////////////////////////////////////////////////////

function normalizeText(
  value:string
):string {

  return value

    .toLowerCase()

    .replace(
      /[^a-z0-9\s]/g,
      ""
    )

    .trim();

}







//////////////////////////////////////////////////////////////
// EXTRACT THEMES
//////////////////////////////////////////////////////////////

export function extractNarrativeThemes(

  text:string

):string[] {


  const normalized =

    normalizeText(text);



  return NARRATIVE_THEMES.filter(

    theme =>

      normalized.includes(theme)

  );

}







//////////////////////////////////////////////////////////////
// CREATE CONTEXT
//////////////////////////////////////////////////////////////

export function createNarrativeContext(

  dominantPlanet?: string,

  initialText?: string,

  zodiac?: string

):NarrativeContext {


  return {


    zodiac,


    dominantPlanet,



    usedPlanets:

      dominantPlanet

        ?

        [

          dominantPlanet

        ]

        :

        [],




    usedThemes:

      initialText

        ?

        extractNarrativeThemes(

          initialText

        )

        :

        [],




    usedStatements:

      initialText

        ?

        [

          initialText

        ]

        :

        [],




    usedExplanations:

      [],




    usedAdvice:

      [],



  };


}







//////////////////////////////////////////////////////////////
// THEME DUPLICATE CHECK
//////////////////////////////////////////////////////////////

export function hasUsedNarrativeTheme(

  context:NarrativeContext,

  text:string

):boolean {


  const themes =

    extractNarrativeThemes(

      text

    );



  return themes.some(

    theme =>

      context.usedThemes.includes(

        theme

      )

  );


}








//////////////////////////////////////////////////////////////
// STATEMENT MEMORY
//////////////////////////////////////////////////////////////

export function hasUsedStatement(

  context:NarrativeContext,

  text:string

):boolean {


  const value =

    normalizeText(text);



  return context.usedStatements.some(

    item =>

      normalizeText(item) === value

  );


}






export function rememberStatement(

  context:NarrativeContext,

  text:string

):NarrativeContext {


  if(

    hasUsedStatement(

      context,

      text

    )

  ){

    return context;

  }



  return {


    ...context,


    usedStatements:

      [

        ...context.usedStatements,

        text,

      ],


  };


}








//////////////////////////////////////////////////////////////
// EXPLANATION MEMORY
//////////////////////////////////////////////////////////////

export function hasUsedExplanation(

  context:NarrativeContext,

  text:string

):boolean {


  const value =

    normalizeText(text);



  return context.usedExplanations.some(

    item =>

      normalizeText(item) === value

  );


}






export function rememberExplanation(

  context:NarrativeContext,

  text:string

):NarrativeContext {


  if(

    hasUsedExplanation(

      context,

      text

    )

  ){

    return context;

  }



  return {


    ...context,


    usedExplanations:

      [

        ...context.usedExplanations,

        text,

      ],


  };


}








//////////////////////////////////////////////////////////////
// ADVICE MEMORY
//////////////////////////////////////////////////////////////

export function hasUsedAdvice(

  context:NarrativeContext,

  text:string

):boolean {


  const value =

    normalizeText(text);



  return context.usedAdvice.some(

    item =>

      normalizeText(item) === value

  );


}






export function rememberAdvice(

  context:NarrativeContext,

  text:string

):NarrativeContext {


  if(

    hasUsedAdvice(

      context,

      text

    )

  ){

    return context;

  }



  return {


    ...context,


    usedAdvice:

      [

        ...context.usedAdvice,

        text,

      ],


  };


}








//////////////////////////////////////////////////////////////
// UPDATE MEMORY
//////////////////////////////////////////////////////////////

export function rememberNarrative(

  context:NarrativeContext,

  planet:string,

  text:string

):NarrativeContext {


  return {


    ...context,



    usedPlanets:

      Array.from(

        new Set(

          [

            ...context.usedPlanets,

            planet,

          ]

        )

      ),




    usedThemes:

      Array.from(

        new Set(

          [

            ...context.usedThemes,

            ...extractNarrativeThemes(

              text

            ),

          ]

        )

      ),




    usedStatements:

      Array.from(

        new Set(

          [

            ...context.usedStatements,

            text,

          ]

        )

      ),



  };


}