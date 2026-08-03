//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// PREMIUM HOROSCOPE ARCHIVE EXPERIENCE
//
// ROUTE:
//
// /astro/horoscope/[sign]/archive
//
// CMS FIRST
//
// NO ENGINE
// NO CALCULATION
// NO AI
//////////////////////////////////////////////////////////////

import Image from "next/image";
import Link from "next/link";


import {
  getHoroscopeArchiveDates,
} from "@/lib/services/horoscopeContentService";




interface Props {

params:{
sign:string;
};

}



export const dynamic = "force-dynamic";





const zodiacMeta:any = {


aries:{
name:"Aries",
element:"Fire",
},
taurus:{
name:"Taurus",
element:"Earth",
},
gemini:{
name:"Gemini",
element:"Air",
},
cancer:{
name:"Cancer",
element:"Water",
},
leo:{
name:"Leo",
element:"Fire",
},
virgo:{
name:"Virgo",
element:"Earth",
},
libra:{
name:"Libra",
element:"Air",
},
scorpio:{
name:"Scorpio",
element:"Water",
},
sagittarius:{
name:"Sagittarius",
element:"Fire",
},
capricorn:{
name:"Capricorn",
element:"Earth",
},
aquarius:{
name:"Aquarius",
element:"Air",
},
pisces:{
name:"Pisces",
element:"Water",
},


};







export default async function HoroscopeArchivePage({

params

}:Props){



const sign = params.sign.toLowerCase();



const zodiac =

zodiacMeta[sign]

||

{

name:sign,

element:"Cosmic"

};





const archives = await getHoroscopeArchiveDates(

sign,

"daily",

"english"

);






return (

<main

className="
relative
min-h-screen
overflow-hidden
bg-[#FFF9E8]
text-[#3B2600]
"

>



{/* =====================================================
    COSMIC BACKGROUND
===================================================== */}


<div

className="
pointer-events-none
absolute
inset-0
overflow-hidden
"

>


<div

className="
absolute
left-1/2
top-[-250px]
h-[650px]
w-[650px]
-translate-x-1/2
rounded-full
bg-[#D4AF37]/20
blur-[180px]
"

/>



<div

className="
absolute
right-[-200px]
top-[40%]
h-[400px]
w-[400px]
rounded-full
bg-[#8B5E00]/10
blur-[150px]
"

/>



<div

className="
absolute
left-[-150px]
bottom-[10%]
h-[300px]
w-[300px]
rounded-full
bg-[#D4AF37]/10
blur-[120px]
"

/>



</div>







<div

className="
relative
z-10
mx-auto
max-w-6xl
px-6
py-16
"

>







{/* =====================================================
    HERO
===================================================== */}


<section

className="
rounded-[45px]
border
border-[#D4AF37]/30
bg-white/75
p-10
text-center
shadow-2xl
backdrop-blur-xl
"

>



<div

className="
mx-auto
flex
h-36
w-36
items-center
justify-center
rounded-full
border
border-[#D4AF37]/40
bg-[#FFF9E8]
p-5
shadow-xl
"

>


<Image

src={`/zodiac/${sign}.png`}

alt={`${zodiac.name} zodiac`}

width={180}

height={180}

className="
object-contain
"

/>


</div>





<h1

className="
mt-8
text-4xl
font-bold
md:text-6xl
"

>

{zodiac.name}

 Horoscope Archive

</h1>





<p

className="
mx-auto
mt-5
max-w-2xl
text-lg
text-[#6B4A00]
"

>

Explore your previous horoscope journeys.
Revisit archived {zodiac.name} rashifal readings
preserved by NationPath Astro.

</p>







<div

className="
mt-7
inline-flex
rounded-full
border
border-[#D4AF37]/40
bg-[#FFF9E8]
px-6
py-3
font-semibold
"

>

{zodiac.element} Zodiac Archive

</div>



</section>










{/* =====================================================
    ARCHIVE TIMELINE
===================================================== */}


<section

className="
mt-16
"

>


<div

className="
flex
items-center
justify-between
"

>


<h2

className="
text-3xl
font-bold
"

>

Past Horoscope Journey

</h2>



<span

className="
rounded-full
border
border-[#D4AF37]/30
bg-white/70
px-4
py-2
text-sm
"

>

{archives.length} Archives

</span>



</div>








{

archives.length === 0 ?


<div

className="
mt-8
rounded-3xl
border
border-[#D4AF37]/30
bg-white/70
p-10
text-center
"

>

No archived horoscope available.

</div>



:


<div

className="
mt-8
space-y-5
"

>


{

archives.map((item:any,index:number)=>(


<Link

key={index}

href={`/astro/horoscope/${sign}/archive/${item.meta?.slugDate}`}

className="
group
flex
items-center
justify-between
rounded-3xl
border
border-[#D4AF37]/30
bg-white/85
p-6
shadow-lg
transition
hover:-translate-y-1
hover:shadow-2xl
"

>



<div

className="
flex
items-center
gap-5
"

>


<Image

src={`/zodiac/${sign}.png`}

alt={zodiac.name}

width={55}

height={55}

className="
object-contain
"

/>





<div>


<h3

className="
text-xl
font-bold
"

>

{zodiac.name} Rashifal

</h3>



<p

className="
mt-2
text-sm
text-[#6B4A00]
"

>

Archive Date:

{" "}

{item.meta?.slugDate}

</p>



</div>


</div>







<div

className="
font-semibold
text-[#8B5E00]
"

>

Read Archive →

</div>



</Link>


))


}



</div>



}



</section>









{/* =====================================================
    PREMIUM CTA
===================================================== */}



<section

className="
mt-16
rounded-[40px]
bg-[#3B2600]
p-10
text-center
text-[#FFF9E8]
shadow-2xl
"

>


<h2

className="
text-3xl
font-bold
"

>

Continue Your Cosmic Journey

</h2>



<p

className="
mt-3
opacity-80
"

>

Read today's horoscope or explore another zodiac sign.

</p>





<div

className="
mt-7
flex
flex-wrap
justify-center
gap-4
"

>


<Link

href={`/astro/horoscope/${sign}`}

className="
rounded-full
bg-[#D4AF37]
px-7
py-3
font-bold
text-[#3B2600]
"

>

Today's Horoscope

</Link>




<Link

href="/astro/horoscope"

className="
rounded-full
border
border-[#D4AF37]
px-7
py-3
font-bold
"

>

Explore Zodiac

</Link>



</div>



</section>








</div>





</main>

);


}