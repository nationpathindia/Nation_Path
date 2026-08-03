//////////////////////////////////////////////////////////////
// NATIONPATH AI AUTOMATION
//
// ASTRO HOROSCOPE SEO GENERATOR
//
// Responsibility:
//
// Horoscope Data
//        ↓
// SEO Intelligence
//        ↓
// CMS SEO Section
//
// Rules:
//
// NO astrology calculation
// NO prediction modification
// ONLY metadata generation
//////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

export interface HoroscopeSEO {


  title:string;


  description:string;


  keywords:string[];


  ogImage:string;


  canonical:string;


}









//////////////////////////////////////////////////////////////
// ZODIAC DISPLAY NAME
//////////////////////////////////////////////////////////////

function formatZodiac(

 zodiac:string

):string {


 return zodiac

   .charAt(0)

   .toUpperCase()

   +

   zodiac.slice(1);


}









//////////////////////////////////////////////////////////////
// PERIOD FORMATTER
//////////////////////////////////////////////////////////////

function formatPeriod(

 period:string

):string {


 switch(period){


  case "daily":

    return "Daily Horoscope";


  case "weekly":

    return "Weekly Horoscope";


  case "monthly":

    return "Monthly Horoscope";


  case "yearly":

    return "Yearly Horoscope";


  default:

    return "Horoscope";


 }


}









//////////////////////////////////////////////////////////////
// SEO KEYWORD BUILDER
//////////////////////////////////////////////////////////////

function buildKeywords(

 zodiac:string,

 period:string

):string[]{


 const sign =

   formatZodiac(

     zodiac

   );



 return [


   `${sign} Horoscope`,



   `${sign} ${period} Horoscope`,



   `${period} Horoscope Today`,



   `${sign} Vedic Astrology`,



   `${sign} Rashifal`,



   "Vedic Astrology",



   "NationPath Astro",


 ];

}









//////////////////////////////////////////////////////////////
// MAIN SEO GENERATOR
//////////////////////////////////////////////////////////////

export function generateHoroscopeSEO(

 params:{

   zodiac:string;


   period:string;


   date?:Date;


 }

):HoroscopeSEO {



 const sign =

   formatZodiac(

     params.zodiac

   );



 const periodLabel =

   formatPeriod(

     params.period

   );






 const dateText =

   params.date

   ?

   params.date.toLocaleDateString(
     "en-IN",
     {
       day:"numeric",
       month:"long",
       year:"numeric",
     }
   )

   :

   "";









 return {


   title:

     `${sign} ${periodLabel} Today | NationPath Astro`,





   description:


     `Read ${sign} ${periodLabel.toLowerCase()} for ${dateText}. Get Vedic astrology insights, planetary influence, career, love, finance, health guidance and remedies.`,





   keywords:

     buildKeywords(

       params.zodiac,

       params.period

     ),





   ogImage:

     `/zodiac/${params.zodiac}.png`,





   canonical:

     `/astro/horoscope/${params.zodiac}`,



 };



}









//////////////////////////////////////////////////////////////
// DAILY SEO SHORTCUT
//////////////////////////////////////////////////////////////

export function generateDailyHoroscopeSEO(

 zodiac:string,

 date:Date

){


 return generateHoroscopeSEO({

   zodiac,


   period:"daily",


   date,


 });


}









//////////////////////////////////////////////////////////////
// EXPORT
//////////////////////////////////////////////////////////////

export default {


 generateHoroscopeSEO,


 generateDailyHoroscopeSEO,


};