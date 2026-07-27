//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// HOROSCOPE EXPERIENCE INTELLIGENCE
//
// Experience Formatter v2
//
// Converts:
// Experience Sections
//
// Into:
// Premium Frontend Experience Payload
//
// No calculations.
// No prediction changes.
// No UI logic.
//////////////////////////////////////////////////////////////

import type {

  ExperienceSection,

} from "./experienceSections";





//////////////////////////////////////////////////////////////
// SAFE HELPERS
//////////////////////////////////////////////////////////////

function cleanText(

 value:string | undefined | null

):string {


 return (

  value ?? ""

 )

 .replace(

  /\s+/g,

  " "

 )

 .trim();


}





function uniqueStrings(

 values:string[]

):string[] {


 return Array.from(

  new Set(

   values

  )

 );


}






//////////////////////////////////////////////////////////////
// DUPLICATE FILTER
//////////////////////////////////////////////////////////////

function removeDuplicateSections(

 sections:ExperienceSection[]

):ExperienceSection[] {


 const memory =

 new Set<string>();



 return sections.filter(

 section => {


  const key =

  (

   section.id

   ||

   section.title

  )

  .toLowerCase();



  if(

   memory.has(key)

  ){

   return false;

  }



  memory.add(key);



  return true;


 }

 );


}







//////////////////////////////////////////////////////////////
// SECTION CLEANER
//////////////////////////////////////////////////////////////

function cleanSection(

 section:ExperienceSection

):ExperienceSection | null {


 const insights =

 uniqueStrings(

  section.insights

  .map(

   item =>

   cleanText(item)

  )

  .filter(Boolean)

 );





 if(

  !cleanText(section.title)

  &&

  !cleanText(section.summary)

  &&

  insights.length===0

 ){

  return null;

 }





 return {


  ...section,


  title:

  cleanText(

   section.title

  ),



  summary:

  cleanText(

   section.summary

  ),



  insights,



 };



}







//////////////////////////////////////////////////////////////
// QUALITY FILTER
//////////////////////////////////////////////////////////////

function filterQualitySections(

 sections:ExperienceSection[]

):ExperienceSection[] {


 return sections

 .map(

  cleanSection

 )

 .filter(

  (

   section

  ):section is ExperienceSection =>

   Boolean(section)

 )

 .filter(

  section =>

  section.score >=40

 );


}







//////////////////////////////////////////////////////////////
// PREMIUM EXPERIENCE FORMAT
//////////////////////////////////////////////////////////////

export function formatExperienceSections(

 sections:ExperienceSection[]

):ExperienceSection[] {


 return filterQualitySections(


  removeDuplicateSections(

   sections

  )


 )

 .sort(

  (a,b)=>

   b.score -

   a.score

 )

 .slice(

  0,

  10

 );


}








//////////////////////////////////////////////////////////////
// FORMATTED EXPERIENCE OUTPUT
//////////////////////////////////////////////////////////////

export interface FormattedExperience {


 heroTheme:

   ExperienceSection | null;



 topThemes:

   ExperienceSection[];



 primaryTheme:

   ExperienceSection | null;



 secondaryThemes:

   ExperienceSection[];



 totalThemes:

   number;



 quality:

 {

  hasContent:boolean;

  highestScore:number;

 };



}








//////////////////////////////////////////////////////////////
// FINAL FORMATTER
//////////////////////////////////////////////////////////////

export function createFormattedExperience(

 sections:ExperienceSection[]

):FormattedExperience {


 const formatted =

 formatExperienceSections(

  sections

 );



 return {


  heroTheme:

   formatted[0]

   ??

   null,



  topThemes:

   formatted,



  primaryTheme:

   formatted[0]

   ??

   null,



  secondaryThemes:

   formatted.slice(

    1,

    4

   ),



  totalThemes:

   formatted.length,



  quality:

  {

   hasContent:

    formatted.length > 0,



   highestScore:

    formatted[0]?.score

    ??

    0,

  },


 };


}