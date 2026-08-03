//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// ARCHIVED HOROSCOPE DETAIL EXPERIENCE
//
// ROUTE:
//
// /astro/horoscope/[sign]/archive/[date]
//
// CMS FIRST
//
// NO ENGINE
// NO CALCULATION
// NO AI
//////////////////////////////////////////////////////////////

import {
  getArchivedHoroscope,
} from "@/lib/services/horoscopeContentService";


import CmsHoroscopeExperience from "@/components/astro-new/horoscope-cms/CmsHoroscopeExperience";



interface Props {

params:{
sign:string;
date:string;
};

}



export const dynamic = "force-dynamic";





export default async function ArchivedHoroscopePage({

params

}:Props){



const sign =

params.sign.toLowerCase();




const archivedDate =

params.date;






const horoscope = await getArchivedHoroscope(

sign,

archivedDate,

"daily",

"english"

);






if(!horoscope){


return (

<main

className="
min-h-screen
bg-[#FFF9E8]
flex
items-center
justify-center
text-[#3B2600]
"

>

<div

className="
rounded-3xl
bg-white/80
p-10
shadow-xl
"

>

<h1

className="
text-3xl
font-bold
"

>

Archived Horoscope Not Found

</h1>


<p

className="
mt-3
"

>

This horoscope reading is not available.

</p>


</div>


</main>

);


}







const cmsData:any = {


...horoscope,


zodiacList:

horoscope.zodiacList || [],


};






return (


<CmsHoroscopeExperience

data={cmsData}

currentSign={sign}

/>


);


}