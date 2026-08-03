//////////////////////////////////////////////////////////////
// NATIONPATH AI AUTOMATION
//
// ASTRO HOROSCOPE LUCK GENERATOR
//
// Responsibility:
//
// Horoscope Data
//       ↓
// Fortune Enrichment
//       ↓
// CMS Lucky Section
//
// Rules:
//
// NO planet calculation
// NO Swiss Ephemeris modification
// NO prediction generation
//
// Editorial enrichment only
//////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

export interface LuckyData {


  number:string;


  color:string;


  direction:string;


  time:string;


  gemstone:string;


  metal:string;


}







//////////////////////////////////////////////////////////////
// ZODIAC RULE DATABASE
//
// Future:
// Can move to MongoDB CMS
//////////////////////////////////////////////////////////////

const ZODIAC_FORTUNE_MAP:

Record<string,LuckyData> = {


 aries:{


   number:"9",


   color:"Red",


   direction:"East",


   time:"Morning",


   gemstone:"Ruby",


   metal:"Copper",


 },




 taurus:{


   number:"6",


   color:"Green",


   direction:"South-East",


   time:"Morning",


   gemstone:"Diamond",


   metal:"Silver",


 },




 gemini:{


   number:"5",


   color:"Green",


   direction:"North",


   time:"Afternoon",


   gemstone:"Emerald",


   metal:"Bronze",


 },




 cancer:{


   number:"2",


   color:"White",


   direction:"North-East",


   time:"Evening",


   gemstone:"Pearl",


   metal:"Silver",


 },




 leo:{


   number:"1",


   color:"Gold",


   direction:"East",


   time:"Morning",


   gemstone:"Ruby",


   metal:"Gold",


 },




 virgo:{


   number:"5",


   color:"Green",


   direction:"North",


   time:"Morning",


   gemstone:"Emerald",


   metal:"Bronze",


 },




 libra:{


   number:"6",


   color:"Blue",


   direction:"South-East",


   time:"Evening",


   gemstone:"Diamond",


   metal:"Silver",


 },




 scorpio:{


   number:"9",


   color:"Maroon",


   direction:"South",


   time:"Night",


   gemstone:"Red Coral",


   metal:"Copper",


 },




 sagittarius:{


   number:"3",


   color:"Yellow",


   direction:"East",


   time:"Morning",


   gemstone:"Yellow Sapphire",


   metal:"Gold",


 },




 capricorn:{


   number:"8",


   color:"Black",


   direction:"South",


   time:"Evening",


   gemstone:"Blue Sapphire",


   metal:"Iron",


 },




 aquarius:{


   number:"8",


   color:"Blue",


   direction:"West",


   time:"Evening",


   gemstone:"Amethyst",


   metal:"Lead",


 },




 pisces:{


   number:"3",


   color:"Sea Green",


   direction:"North-East",


   time:"Morning",


   gemstone:"Yellow Sapphire",


   metal:"Gold",


 },


};









//////////////////////////////////////////////////////////////
// GENERATOR
//////////////////////////////////////////////////////////////

export function generateLuckyData(

 zodiac:string

):LuckyData {



 const key =

   zodiac
     .toLowerCase()
     .trim();





 return (


   ZODIAC_FORTUNE_MAP[key]


   ||


   {


     number:"7",


     color:"Blue",


     direction:"East",


     time:"Morning",


     gemstone:"Natural Stone",


     metal:"Silver",


   }



 );

}









//////////////////////////////////////////////////////////////
// DAILY VARIATION SUPPORT
//
// Future:
//
// date + planetary score
// can create dynamic variation
//////////////////////////////////////////////////////////////

export function generateDailyLuckyData(

 zodiac:string,

 _date:Date

):LuckyData {


 return generateLuckyData(

   zodiac

 );


}









//////////////////////////////////////////////////////////////
// EXPORT
//////////////////////////////////////////////////////////////

export default {


 generateLuckyData,


 generateDailyLuckyData,


};