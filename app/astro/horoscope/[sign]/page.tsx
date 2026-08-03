//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// CMS HOROSCOPE SIGN EXPERIENCE PAGE
//
// FLOW:
//
// URL SIGN
//      ↓
// Horoscope CMS API
//      ↓
// CMS DATA + AUTOMATION STATUS
//      ↓
// CMS Available
//      ↓
// Premium Horoscope Experience
//
// CMS Missing + Automation Running
//      ↓
// Generation Loader
//
// LOCKED:
// CMS FIRST
// ENGINE SECRET
// AI SECRET
//
//////////////////////////////////////////////////////////////

import CmsHoroscopeExperience 
from "@/components/astro-new/horoscope-cms/CmsHoroscopeExperience";

import HoroscopeGeneratingLoader 
from "@/components/astro-new/horoscope-cms/HoroscopeGeneratingLoader";

import type { Metadata } from "next";



interface PageProps {

  params: Promise<{

    sign:string;

  }>;

}




//////////////////////////////////////////////////////////////
// SITE URL
//////////////////////////////////////////////////////////////

const SITE_URL =

process.env.NEXT_PUBLIC_SITE_URL ||

"https://nationpathindia.com";







//////////////////////////////////////////////////////////////
// CMS API FETCH
//////////////////////////////////////////////////////////////

async function getHoroscopeCMS(

sign:string

){


try {


const response = await fetch(

`${SITE_URL}/api/astro/horoscope/cms`,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

zodiacSign:sign,

language:"english",

period:"daily",

}),


cache:"no-store",

}

);





if(!response.ok){


console.error(

"CMS Horoscope API Failed:",

response.status

);



return {

cms:null,

automation:null,

};


}





const result = await response.json();





return {


cms:

result?.data?.cms

??

result?.cms

??

null,





automation:

result?.data?.automation

??

result?.automation

??

null,


};



}

catch(error){


console.error(

"NATIONPATH CMS HOROSCOPE ERROR:",

error

);



return {

cms:null,

automation:null,

};


}



}








//////////////////////////////////////////////////////////////
// SEO METADATA
//////////////////////////////////////////////////////////////

export async function generateMetadata({

params

}:PageProps):Promise<Metadata>{


const {

sign

}=await params;




const {

cms

}=await getHoroscopeCMS(sign);





const seo = cms?.seo;





const zodiacName =

sign.charAt(0).toUpperCase()

+

sign.slice(1);






const title =

seo?.title

||

`${zodiacName} Daily Horoscope Today | NationPath Astro`;






const description =

seo?.description

||

`Read ${zodiacName} daily horoscope with career, love, finance, health and Vedic astrology guidance on NationPath Astro.`;








const canonical =

seo?.canonical

||

`${SITE_URL}/astro/horoscope/${sign}`;







const ogImage =

seo?.ogImage

||

`${SITE_URL}/zodiac/${sign}.png`;








return {


metadataBase:

new URL(SITE_URL),





title,





description,






keywords:

seo?.keywords

||

[

`${zodiacName} Horoscope`,

`${zodiacName} Daily Horoscope`,

"Daily Horoscope",

"Vedic Astrology",

"Rashifal",

"NationPath Astro"

],







alternates:{


canonical


},







robots:{


index:true,


follow:true,



googleBot:{


index:true,


follow:true,


"max-image-preview":"large",


"max-snippet":-1,


"max-video-preview":-1


}


},








openGraph:{


type:"website",



locale:"en_IN",



siteName:"NationPath Astro",




title,



description,




url:canonical,





images:[

{

url:ogImage,


width:800,


height:800,


alt:`${zodiacName} Daily Horoscope`

}

]


},







twitter:{


card:"summary_large_image",



title,



description,



images:[

ogImage

]


}



};


}


//////////////////////////////////////////////////////////////
// PAGE
//////////////////////////////////////////////////////////////

export default async function HoroscopeSignPage({

params

}:PageProps){



const {

sign

}=await params;





const {

cms,

automation

}=await getHoroscopeCMS(sign);








if(automation){


console.log(

"NATIONPATH HOROSCOPE AUTOMATION STATE",

automation

);


}










//////////////////////////////////////////////////////////////
// GENERATION LOADER
//////////////////////////////////////////////////////////////

if(

!cms

&&

automation?.generating

){


return (

<HoroscopeGeneratingLoader

sign={sign}

/>

);


}









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
// STRUCTURED DATA
//////////////////////////////////////////////////////////////

const zodiacName =

sign.charAt(0).toUpperCase()

+

sign.slice(1);





const horoscopeUrl =

`${SITE_URL}/astro/horoscope/${sign}`;






const horoscopeSchema = {


"@context":"https://schema.org",


"@type":"WebPage",



"name":

`${zodiacName} Daily Horoscope | NationPath Astro`,



"url":

horoscopeUrl,



"description":

cms.seo?.description ||

`Daily ${zodiacName} horoscope with Vedic insights by NationPath Astro.`,




"publisher":{


"@type":"Organization",


"name":"NationPath Astro",


"url":SITE_URL


}



};







const breadcrumbSchema = {


"@context":"https://schema.org",


"@type":"BreadcrumbList",



itemListElement:[


{

"@type":"ListItem",

position:1,

name:"Home",

item:SITE_URL

},



{

"@type":"ListItem",

position:2,

name:"Astro",

item:`${SITE_URL}/astro`

},



{

"@type":"ListItem",

position:3,

name:"Horoscope",

item:`${SITE_URL}/astro/horoscope`

},




{

"@type":"ListItem",

position:4,

name:`${zodiacName} Horoscope`,

item:horoscopeUrl

}



]


};









//////////////////////////////////////////////////////////////
// EXPERIENCE
//////////////////////////////////////////////////////////////

return (

<main

className="

min-h-screen

bg-[#050816]

"

>


<script

type="application/ld+json"

dangerouslySetInnerHTML={{

__html:

JSON.stringify(horoscopeSchema)

}}

/>





<script

type="application/ld+json"

dangerouslySetInnerHTML={{

__html:

JSON.stringify(breadcrumbSchema)

}}

/>






<CmsHoroscopeExperience


data={cms}


currentSign={sign.toLowerCase()}


slug={cms.slug}


/>





</main>


);


}