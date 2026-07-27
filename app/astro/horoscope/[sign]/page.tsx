//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// CMS HOROSCOPE SIGN EXPERIENCE PAGE
//
// FLOW:
//
// URL SIGN
//      ↓
//      ↓
// Horoscope CMS Mongo
//      ↓
// data.cms
//      ↓
// CmsHoroscopeExperience
//
// LOCKED:
// CMS FIRST
// ENGINE - SECRET
// AI- SECRET
//
//////////////////////////////////////////////////////////////

import CmsHoroscopeExperience from "@/components/astro-new/horoscope-cms/CmsHoroscopeExperience";



interface PageProps {

  params: Promise<{

    sign: string;

  }>;

}





//////////////////////////////////////////////////////////////
// CMS API FETCH
//////////////////////////////////////////////////////////////

async function getHoroscopeCMS(

  sign: string

) {


try {


const baseUrl =
process.env.NEXT_PUBLIC_APP_URL ||
"http://localhost:3000";



const response = await fetch(

`${baseUrl}/api/astro/horoscope/cms`,

{

method: "POST",

headers: {

"Content-Type": "application/json",

},


body: JSON.stringify({

zodiacSign: sign,

language: "english",

period: "daily",

}),


cache: "no-store",

}

);





if(!response.ok){


console.error(

"CMS Horoscope API Failed:",

response.status

);


return null;


}







const result =
await response.json();





return (

result?.data?.cms

??

result?.cms

??

null

);



}

catch(error){


console.error(

"NATIONPATH CMS HOROSCOPE ERROR:",

error

);


return null;


}



}





//////////////////////////////////////////////////////////////
// SEO METADATA
//////////////////////////////////////////////////////////////

export async function generateMetadata({

params

}: PageProps) {



const {

sign

} = await params;



const cms = await getHoroscopeCMS(sign);



const seo = cms?.seo;



const zodiacName =

sign.charAt(0).toUpperCase() +

sign.slice(1);





return {


title:

seo?.title ||

`${zodiacName} Daily Horoscope | NationPath Astro`,





description:

seo?.description ||

`Read today's ${zodiacName} horoscope with career, love, finance, health and Vedic guidance on NationPath Astro.`,





keywords:

seo?.keywords ||

[

`${zodiacName} Horoscope`,

"Daily Horoscope",

"Vedic Astrology",

"NationPath Astro"

],





alternates:{


canonical:

seo?.canonical ||

`/astro/horoscope/${sign}`


},





openGraph:{


title:

seo?.title ||

`${zodiacName} Daily Horoscope | NationPath Astro`,





description:

seo?.description ||

`Daily ${zodiacName} horoscope with Vedic insights on NationPath Astro.`,





url:

seo?.canonical ||

`/astro/horoscope/${sign}`,





images:[

{

url:

seo?.ogImage ||

`/zodiac/${sign}.png`,

width:800,

height:800,

alt:

`${zodiacName} Horoscope`

}

]

}

};


}








//////////////////////////////////////////////////////////////
// PAGE
//////////////////////////////////////////////////////////////

export default async function HoroscopeSignPage({

params

}: PageProps) {



const {

sign

} = await params;



const cms = await getHoroscopeCMS(

sign

);







//////////////////////////////////////////////////////////////
// EMPTY STATE
//////////////////////////////////////////////////////////////

if(!cms){


return (

<main

className="
min-h-screen
bg-[#050816]
flex
items-center
justify-center
px-6
"

>


<div

className="
max-w-md
rounded-3xl
border
border-[#C9A227]/30
bg-white/5
p-8
text-center
text-white
"

>


<h1

className="
text-3xl
font-serif
"

>

Horoscope Content Unavailable

</h1>




<p

className="
mt-4
text-gray-400
leading-relaxed
"

>

CMS horoscope content was not found for:

</p>




<p

className="
mt-3
text-[#C9A227]
uppercase
tracking-widest
"

>

{sign}

</p>




</div>


</main>

);


}








//////////////////////////////////////////////////////////////
// CMS EXPERIENCE
//////////////////////////////////////////////////////////////

return (

<main

className="
min-h-screen
bg-[#050816]
"

>


<CmsHoroscopeExperience

data={cms}

currentSign={sign.toLowerCase()}

/>


</main>

);


}