//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS CREATE PAGE
//
// FINAL LOCKED ARCHITECTURE
//
// Responsibility:
// Premium CMS create experience wrapper
//
// Does NOT:
// - manage form state
// - calculate astrology
// - run Swiss Ephemeris
// - touch prediction engine
//////////////////////////////////////////////////////////////

import HoroscopeForm from "./HoroscopeForm";





export default function CreateHoroscopePage(){


return (

<main

className="
min-h-screen
bg-[#050816]
px-4
py-6
text-white
md:px-8
md:py-10
"

>


<div

className="
mx-auto
max-w-7xl
"

>


{/* PAGE HEADER */}

<section

className="
mb-8
overflow-hidden
rounded-3xl
border
border-white/10
bg-gradient-to-br
from-white/10
via-white/5
to-transparent
p-6
backdrop-blur-xl
md:p-8
"

>


<div

className="
flex
flex-col
gap-4
md:flex-row
md:items-center
md:justify-between
"

>


<div>


<p

className="
text-xs
uppercase
tracking-[0.35em]
text-yellow-400
"

>

NationPath Astro CMS

</p>





<h1

className="
mt-3
text-3xl
font-bold
tracking-tight
md:text-5xl
"

>

Create Horoscope Experience

</h1>





<p

className="
mt-3
max-w-2xl
text-sm
leading-relaxed
text-gray-400
md:text-base
"

>

Build premium Vedic horoscope experiences using
CMS-first architecture. Editorial intelligence,
remedies, insights and publishing controls are
managed from one dashboard.

</p>


</div>








<div

className="
hidden
rounded-2xl
border
border-yellow-400/20
bg-yellow-400/5
px-5
py-4
md:block
"

>


<p

className="
text-xs
uppercase
tracking-widest
text-yellow-400
"

>

Architecture

</p>



<p

className="
mt-2
text-sm
text-gray-300
"

>

CMS First • Engine Independent

</p>


</div>





</div>


</section>









{/* FORM */}

<section>

<HoroscopeForm />

</section>









</div>


</main>

);


}