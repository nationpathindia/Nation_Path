"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// HOROSCOPE NAVIGATION CTA
//
// Purpose:
// End of horoscope journey navigation
//
// Routes:
// /astro/horoscope
// /astro/horoscope/archive
//
// CMS FIRST
// UI ONLY
//////////////////////////////////////////////////////////////

import Link from "next/link";


export default function HoroscopeNavigationCTA(){


return (

<section

className="
mx-auto
max-w-5xl
rounded-3xl
border
border-[#D4AF37]/30
bg-white/70
p-8
text-center
shadow-lg
backdrop-blur
"

>


<h3

className="
text-2xl
font-bold
text-[#3B2600]
"

>

Continue Your Horoscope Journey

</h3>



<p

className="
mt-3
text-sm
text-[#6B4A00]
"

>

Explore other zodiac signs or revisit previous horoscope readings.

</p>





<div

className="
mt-6
flex
flex-col
justify-center
gap-4
sm:flex-row
"

>


<Link

href="/astro/horoscope"

className="
rounded-full
bg-[#D4AF37]
px-6
py-3
font-semibold
text-white
transition
hover:opacity-90
"

>

Explore All Zodiac Signs

</Link>





<Link

href="/astro/horoscope/archive"

className="
rounded-full
border
border-[#D4AF37]
px-6
py-3
font-semibold
text-[#8B5E00]
transition
hover:bg-[#FFF4C7]
"

>

View Horoscope Archive

</Link>



</div>


</section>

);


}