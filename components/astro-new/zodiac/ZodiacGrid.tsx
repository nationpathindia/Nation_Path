"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO ZODIAC GRID
//
// Public Zodiac Explorer
//
// Features:
// - Zodiac Artwork
// - Horoscope Entry Points
// - Premium Vedic Layout
//////////////////////////////////////////////////////////////

import ZodiacCard from "./ZodiacCard";



const ZODIACS = [

{
 sign:"aries",
 image:"/zodiac/aries.png",
},

{
 sign:"taurus",
 image:"/zodiac/taurus.png",
},

{
 sign:"gemini",
 image:"/zodiac/gemini.png",
},

{
 sign:"cancer",
 image:"/zodiac/cancer.png",
},

{
 sign:"leo",
 image:"/zodiac/leo.png",
},

{
 sign:"virgo",
 image:"/zodiac/virgo.png",
},

{
 sign:"libra",
 image:"/zodiac/libra.png",
},

{
 sign:"scorpio",
 image:"/zodiac/scorpio.png",
},

{
 sign:"sagittarius",
 image:"/zodiac/sagittarius.png",
},

{
 sign:"capricorn",
 image:"/zodiac/capricorn.png",
},

{
 sign:"aquarius",
 image:"/zodiac/aquarius.png",
},

{
 sign:"pisces",
 image:"/zodiac/pisces.png",
},

];




export default function ZodiacGrid(){



return (

<section

className="
relative
overflow-hidden
bg-[#FFF9E8]
px-5
py-20
sm:px-8
lg:px-16
"

>


{/* AMBIENT GOLD LIGHT */}

<div

className="
pointer-events-none
absolute
left-1/2
top-10
h-96
w-96
-translate-x-1/2
rounded-full
bg-[#D4AF37]/10
blur-[100px]
"

/>




<div

className="
relative
mx-auto
max-w-6xl
"

>


{/* HEADER */}


<div

className="
mb-12
text-center
"

>


<p

className="
text-xs
font-bold
uppercase
tracking-[0.4em]
text-[#8B5E00]
"

>

Zodiac Universe

</p>



<h2

className="
mt-4
font-serif
text-3xl
font-bold
text-[#3B2600]
sm:text-4xl
"

>

Choose Your Zodiac Sign

</h2>




<p

className="
mx-auto
mt-5
max-w-xl
text-sm
leading-relaxed
text-[#6B4A16]
sm:text-base
"

>

Discover your daily horoscope,
planetary influence and Vedic astrology insights.

</p>


</div>







{/* GRID */}


<div

className="
grid
grid-cols-2
gap-5
sm:grid-cols-3
md:grid-cols-4
lg:grid-cols-6
"

>


{

ZODIACS.map((zodiac)=>(

<ZodiacCard

key={zodiac.sign}

sign={zodiac.sign}

image={zodiac.image}

/>

))

}



</div>





</div>


</section>

);


}