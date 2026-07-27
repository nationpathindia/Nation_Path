"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// NAKSHATRA INTELLIGENCE PANEL
//
// Premium Birth Star Identity
//
// Future:
// API powered Nakshatra Intelligence
//////////////////////////////////////////////////////////////

import {
  Star,
  Sparkles,
  Orbit,
  Moon,
} from "lucide-react";



interface Props {

  name:string;

  deity:string;

  planet:string;

  symbol:string;

  meaning:string;

}



export default function NakshatraDetailPanel({

  name,

  deity,

  planet,

  symbol,

  meaning,

}:Props){


return (

<div

className="
relative
overflow-hidden
rounded-2xl
border
border-[#D4AF37]/35
bg-[#FFF9E8]
p-5
shadow-[0_20px_50px_rgba(139,94,0,0.10)]
"

>


{/* DARK GOLD AURA */}


<div

className="
pointer-events-none
absolute
right-[-70px]
top-[-70px]
h-48
w-48
rounded-full
bg-gradient-to-br
from-[#8B5E00]/30
via-[#D4AF37]/20
to-transparent
blur-3xl
"

/>






<div

className="
relative
z-10
"

>







{/* TITLE */}



<div

className="
flex
items-center
gap-2
text-[11px]
uppercase
tracking-[0.28em]
text-[#5A3908]
"

>

<Moon

size={15}

className="text-[#8B5E00]"

/>

Moon Intelligence

</div>







<h2

className="
mt-3
text-3xl
font-semibold
tracking-wide
text-[#3B2600]
"

>

{name}

</h2>





<p

className="
mt-1
text-sm
font-medium
text-[#5A3908]
"

>

First Lunar Mansion

</p>








{/* POSITION */}


<div

className="
mt-5
inline-flex
items-center
gap-2
rounded-full
border
border-[#D4AF37]/40
bg-[#F8F1DE]
px-3
py-1.5
text-xs
font-medium
text-[#5A3908]
"

>

<Star

size={13}

className="text-[#D4AF37]"

/>

01 / 27 Nakshatras

</div>









{/* IDENTITY SECTION */}



<div

className="
mt-6
space-y-5
"

>





<div>

<p

className="
text-[10px]
uppercase
tracking-[0.3em]
text-[#8B5E00]
"

>

Deity

</p>


<p

className="
mt-1
text-sm
font-semibold
text-[#3B2600]
"

>

{deity}

</p>

</div>








<div>

<p

className="
text-[10px]
uppercase
tracking-[0.3em]
text-[#8B5E00]
"

>

Planetary Lord

</p>


<p

className="
mt-1
text-sm
font-semibold
text-[#3B2600]
"

>

{planet}

</p>

</div>








<div>

<p

className="
text-[10px]
uppercase
tracking-[0.3em]
text-[#8B5E00]
"

>

Sacred Symbol

</p>


<p

className="
mt-1
text-sm
font-semibold
text-[#3B2600]
"

>

{symbol}

</p>

</div>




</div>









{/* MOON NATURE */}



<div

className="
mt-6
rounded-xl
border
border-[#D4AF37]/20
bg-[#F4E6C8]
p-4
"

>


<div

className="
flex
items-center
gap-2
text-sm
font-semibold
text-[#3B2600]
"

>

<Sparkles

size={16}

className="text-[#8B5E00]"

/>


Moon Nature

</div>





<div

className="
mt-3
flex
flex-wrap
gap-2
"

>


{

[
"Healing",
"Courage",
"Speed",
"New Beginnings"
].map((item)=>(


<span

key={item}

className="
rounded-full
border
border-[#D4AF37]/30
bg-[#FFF9E8]
px-2.5
py-1
text-[11px]
font-medium
text-[#4A3008]
"

>

{item}

</span>


))

}


</div>


</div>









{/* LUNAR ENERGY */}



<div

className="
mt-5
border-t
border-[#D4AF37]/25
pt-5
"

>


<div

className="
flex
items-center
gap-2
text-[11px]
uppercase
tracking-[0.28em]
text-[#8B5E00]
"

>

<Orbit

size={14}

/>

Lunar Energy

</div>





<p

className="
mt-3
text-sm
leading-6
text-[#4A3008]
"

>

{meaning}

</p>


</div>







</div>


</div>


);


}