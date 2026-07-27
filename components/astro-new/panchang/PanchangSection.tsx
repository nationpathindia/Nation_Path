"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO PANCHANG SECTION
//
// Premium Vedic Time Intelligence
//
// Includes:
// - Tithi
// - Nakshatra
// - Yoga
// - Karana
// - Sunrise
// - Sunset
// - Vikram Samvat
// - Muhurta
//
// Future:
// Replace static data with Panchang API
//////////////////////////////////////////////////////////////

import {
  Moon,
  Sparkles,
  CircleDot,
  Sunrise,
  Sunset,
} from "lucide-react";


import PanchangCard from "./PanchangCard";
import VikramSamvatCard from "./VikramSamvatCard";
import MuhurtaCard from "./MuhurtaCard";





const PANCHANG_DATA = [

{
  title:"Tithi",
  value:"Shukla Panchami",
  description:
  "Auspicious lunar phase supporting learning, growth and spiritual activities.",
  icon:Moon,
},


{
  title:"Nakshatra",
  value:"Rohini",
  description:
  "A creative and nurturing lunar constellation with stable energy.",
  icon:Sparkles,
},


{
  title:"Yoga",
  value:"Siddha",
  description:
  "A favourable combination associated with accomplishment and progress.",
  icon:CircleDot,
},


{
  title:"Karana",
  value:"Bava",
  description:
  "A balanced period supporting constructive actions.",
  icon:CircleDot,
},


];







const MUHURTA_DATA = [

{
 name:"Abhijit Muhurta",
 start:"11:55 AM",
 end:"12:45 PM",
},


{
 name:"Rahu Kalam",
 start:"03:00 PM",
 end:"04:30 PM",
},


{
 name:"Brahma Muhurta",
 start:"04:30 AM",
 end:"05:15 AM",
},


];







export default function PanchangSection(){



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





{/* BACKGROUND LIGHT */}


<div

className="
pointer-events-none
absolute
left-0
top-20
h-96
w-96
rounded-full
bg-[#D4AF37]/10
blur-[110px]
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

Vedic Time Intelligence

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

Today's Panchang

</h2>





<p

className="
mt-5
max-w-xl
text-sm
leading-relaxed
text-[#6B4A16]
sm:text-base
"

>

Explore the ancient Vedic calendar,
planetary timings and cosmic influences
for your day.

</p>



</div>









{/* TOP PANCHANG GRID */}



<div

className="
grid
gap-6
lg:grid-cols-3
"

>






{/* VIKRAM SAMVAT */}


<div

className="
lg:col-span-1
"

>

<VikramSamvatCard />

</div>









{/* PANCHANG VALUES */}


<div

className="
grid
gap-5
sm:grid-cols-2
lg:col-span-2
"

>


{

PANCHANG_DATA.map((item)=>(


<PanchangCard

key={item.title}

title={item.title}

value={item.value}

description={item.description}

icon={item.icon}

/>


))


}



</div>






</div>









{/* SUN TIMINGS */}



<div

className="
mt-8
grid
gap-5
sm:grid-cols-2
"

>


<PanchangCard

title="Sunrise"

value="06:02 AM"

description="Beginning of solar energy cycle."

icon={Sunrise}

/>





<PanchangCard

title="Sunset"

value="06:58 PM"

description="Completion of the solar day cycle."

icon={Sunset}

/>



</div>









{/* MUHURTA */}



<div

className="
mt-8
"

>


<MuhurtaCard

items={MUHURTA_DATA}

/>


</div>









{/* CTA */}



<div

className="
mt-12
text-center
"

>


<button

className="
rounded-full
border
border-[#D4AF37]
bg-[#120C08]
px-8
py-3
text-xs
font-bold
uppercase
tracking-[0.25em]
text-[#FFF9E8]
transition
duration-300
hover:bg-[#3B2600]
hover:shadow-[0_10px_30px_rgba(139,94,0,0.25)]
"

>

View Detailed Panchang

</button>


</div>






</div>




</section>


);


}