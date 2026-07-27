//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// HOROSCOPE EXPERIENCE INTELLIGENCE
//
// Narrative Cleaner
//
// Removes:
// - repeated planetary sentences
// - duplicate ideas
// - engine style repetition
//
// Creates:
// premium readable flow
//
// No astrology logic.
//////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////
// NORMALIZER
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

  .replace(

    /\s+/g,

    " "

  )

  .trim();


}








//////////////////////////////////////////////////////////////
// ENTITY EXTRACTION
//////////////////////////////////////////////////////////////

function extractEntity(

 sentence:string

):string {


 const planets = [

  "sun",

  "moon",

  "mars",

  "mercury",

  "jupiter",

  "venus",

  "saturn",

  "rahu",

  "ketu"

 ];



 const normalized =

 normalizeText(

  sentence

 );



 return (

  planets.find(

    planet =>

      normalized.includes(

        planet

      )

  )

  ??

  ""

 );


}








//////////////////////////////////////////////////////////////
// REMOVE PLANET REPETITION
//////////////////////////////////////////////////////////////

function removePlanetDuplicates(

 sentences:string[]

):string[] {


 const memory =

 new Set<string>();



 return sentences.filter(

 sentence => {


  const entity =

  extractEntity(

    sentence

  );



  if(

    entity &&

    memory.has(entity)

  ){

    return false;

  }



  if(entity){

    memory.add(entity);

  }



  return true;


 }

 );


}








//////////////////////////////////////////////////////////////
// REMOVE SAME PATTERN
//////////////////////////////////////////////////////////////

function removePatternDuplicates(

 sentences:string[]

):string[] {


 const memory =

 new Set<string>();



 return sentences.filter(

 sentence => {


  const pattern =

  normalizeText(

   sentence

  )

  .replace(

   /\b(sun|moon|mars|mercury|jupiter|venus|saturn|rahu|ketu)\b/g,

   ""

  )

  .trim();



  if(

   memory.has(pattern)

  ){

    return false;

  }



  memory.add(pattern);



  return true;


 }

 );


}








//////////////////////////////////////////////////////////////
// PREMIUM NARRATIVE CLEANER
//////////////////////////////////////////////////////////////

export function cleanNarrative(

 text:string

):string {


 if(!text){

  return "";

 }



 const sentences =

 text

 .split(".")

 .map(

  item =>

  item.trim()

 )

 .filter(Boolean);





 const cleaned =

 removePatternDuplicates(

  removePlanetDuplicates(

    sentences

  )

 );





 return cleaned.join(

  ". "

 )

 +

 ".";


}








//////////////////////////////////////////////////////////////
// ARRAY SUPPORT
//////////////////////////////////////////////////////////////

export function cleanNarrativeArray(

 sentences:string[]

):string[] {


 return removePatternDuplicates(

   removePlanetDuplicates(

     sentences

   )

 );


}