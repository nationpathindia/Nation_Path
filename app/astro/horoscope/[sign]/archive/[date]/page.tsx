//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// HOROSCOPE ARCHIVE EXPERIENCE PAGE
//
// FLOW:
//
// URL
//      ↓
// Archive CMS Service
//      ↓
// Mongo Horoscope
//      ↓
// Archived Content
//      ↓
// CmsHoroscopeExperience
//
// LOCKED:
// CMS ONLY
// NO ENGINE
// NO AI
//
//////////////////////////////////////////////////////////////

import CmsHoroscopeExperience from "@/components/astro-new/horoscope-cms/CmsHoroscopeExperience";

import {
  getArchivedHoroscope,
} from "@/lib/services/horoscopeContentService";




interface PageProps {


params: Promise<{

sign:string;

date:string;

}>;


}







//////////////////////////////////////////////////////////////
// SEO METADATA
//////////////////////////////////////////////////////////////

export async function generateMetadata({

params

}:PageProps){



const {

sign,

date

}= await params;





const cms = await getArchivedHoroscope(

sign,

date,

"daily",

"english"

);






const seo = cms?.seo;





const zodiacName =

sign.charAt(0).toUpperCase()

+

sign.slice(1);








return {


title:

seo?.title

||

`${zodiacName} Horoscope ${date} | NationPath Astro`,





description:

seo?.description

||

`Read ${zodiacName} horoscope archive for ${date} with career, love, finance, health and Vedic insights on NationPath Astro.`,





keywords:

seo?.keywords

||

[

`${zodiacName} Horoscope ${date}`,

"Historical Horoscope",

"Daily Horoscope Archive",

"NationPath Astro"

],





alternates:{


canonical:

`/astro/horoscope/${sign}/archive/${date}`


},




openGraph:{


title:

seo?.title

||

`${zodiacName} Horoscope Archive | NationPath Astro`,





description:

seo?.description

||

`Historical ${zodiacName} horoscope from NationPath Astro.`,





url:

`/astro/horoscope/${sign}/archive/${date}`


}



};



}










//////////////////////////////////////////////////////////////
// PAGE
//////////////////////////////////////////////////////////////

export default async function HoroscopeArchivePage({

params

}:PageProps){



const {

sign,

date

}= await params;








const cms = await getArchivedHoroscope(

sign,

date,

"daily",

"english"

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

Historical Horoscope Unavailable

</h1>




<p

className="
mt-4
text-gray-400
"

>

No archived horoscope content found.

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
// ARCHIVE EXPERIENCE
//////////////////////////////////////////////////////////////

return (

<main

className="
min-h-screen
bg-[#050816]
"

>



<div

className="
border-b
border-white/10
bg-black/20
px-6
py-4
text-center
"

>

<p

className="
text-[#C9A227]
text-xs
uppercase
tracking-[0.3em]
"

>

Historical Horoscope

</p>



<p

className="
mt-1
text-white
text-sm
"

>

{date}

</p>



</div>






<CmsHoroscopeExperience

data={cms}

currentSign={sign.toLowerCase()}

/>





</main>

);



}