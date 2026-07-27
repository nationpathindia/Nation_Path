"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// PREMIUM PANCHANG EXPERIENCE
//
// CMS EXPERIENCE ONLY
//
// EFFECT ENHANCEMENT
//
// NO ENGINE
// NO CALCULATION
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  Sun,
  Moon,
  Sparkles,
  CircleDot,
  Orbit,
} from "lucide-react";



interface PanchangData {

  timestamp?: string;


  paksha?: {
    name?: string;
  };


  vara?: {
    name?: string;
  };


  moonPhase?: {

    name?: string;

    illumination?: number;

  };


  tithi?: {

    name?: string;

    paksha?: string;

  };


  nakshatra?: {

    name?: string;

    pada?: number;

  };


  yoga?: {

    name?: string;

  };


  karana?: {

    name?: string;

  };


  moonRashi?: {

    name?: string;

  };


  sunRashi?: {

    name?: string;

  };

}





export default function PanchangHeroBanner(){



const [

panchang,

setPanchang

]=useState<PanchangData | null>(null);






useEffect(()=>{


async function fetchPanchang(){


try{


const response =
await fetch(
"/api/astro/panchang"
);



const json =
await response.json();



setPanchang(
json.data
);



}

catch(error){


console.error(
"Panchang loading error",
error
);


}


}



fetchPanchang();


},[]);








const formattedDate = ()=>{


if(!panchang?.timestamp){


return {

day:"25",

month:"JUL",

year:"2026"

};


}




const date =
new Date(
panchang.timestamp
);



return {


day:

date
.getDate()
.toString()
.padStart(2,"0"),



month:

date
.toLocaleString(
"en-US",
{
month:"short"
}
)
.toUpperCase(),



year:

date.getFullYear()


};


};




const date =
formattedDate();







const mainItems=[


{

icon:Moon,

title:"तिथि",

value:

panchang?.tithi?.name || "--",

sub:

panchang?.tithi?.paksha || ""

},




{

icon:Sparkles,

title:"नक्षत्र",

value:

panchang?.nakshatra?.name || "--",

sub:

panchang?.nakshatra?.pada

?

`पाद ${panchang.nakshatra.pada}`

:""

},





{

icon:Sun,

title:"योग",

value:

panchang?.yoga?.name || "--",

sub:""

},





{

icon:CircleDot,

title:"करण",

value:

panchang?.karana?.name || "--",

sub:""

},





{

icon:Moon,

title:"चंद्र चरण",

value:

panchang?.moonPhase?.name || "--",

sub:

panchang?.moonPhase?.illumination

?

`${Math.round(
panchang.moonPhase.illumination
)}% प्रकाश`

:""

}



];








const bottomItems=[


{

label:"पक्ष",

value:

panchang?.paksha?.name || "--"

},


{

label:"वार",

value:

panchang?.vara?.name || "--"

},


{

label:"चंद्र राशि",

value:

panchang?.moonRashi?.name || "--"

},


{

label:"सूर्य राशि",

value:

panchang?.sunRashi?.name || "--"

}



];







return (



<section

className="
px-3
md:px-6
"

>



<motion.div


initial={{

opacity:0,

y:20

}}



animate={{

opacity:1,

y:0

}}



transition={{

duration:.7

}}



className="
relative
overflow-hidden
rounded-[28px]
border
border-[#D4AF37]/40
bg-[#FFF9E8]
shadow-[0_30px_80px_rgba(122,31,31,.10)]
transition-all
duration-500
"

>






{/* COSMIC LIGHT */}


<div

className="
absolute
right-[-120px]
top-[-100px]
h-72
w-72
rounded-full
bg-[#D4AF37]/15
blur-[120px]
"

/>





<div

className="
absolute
left-[-100px]
bottom-[-100px]
h-64
w-64
rounded-full
bg-[#7A1F1F]/10
blur-[120px]
"

/>






{/* MOVING GOLD ENERGY */}


<motion.div


animate={{

x:[

"-40%",

"120%"

]

}}



transition={{

duration:8,

repeat:Infinity,

ease:"linear"

}}



className="
absolute
top-0
left-0
h-[2px]
w-[45%]
bg-gradient-to-r
from-transparent
via-[#D4AF37]
to-transparent
opacity-70
"

/>





<motion.div


animate={{

x:[

"120%",

"-40%"

]

}}



transition={{

duration:12,

repeat:Infinity,

ease:"linear"

}}



className="
absolute
bottom-0
right-0
h-[1px]
w-[40%]
bg-gradient-to-r
from-transparent
via-[#7A1F1F]
to-transparent
opacity-40
"

/>





<div

className="
absolute
right-20
top-16
h-2
w-2
rounded-full
bg-[#D4AF37]
animate-pulse
"

/>





<div

className="
absolute
left-32
bottom-20
h-1
w-1
rounded-full
bg-[#7A1F1F]
animate-pulse
"

/>





{/* HEADER */}

<div

className="
relative
z-10
flex
items-start
justify-between
gap-4
px-5
pt-5
md:px-7
md:pt-7
"

>


<div>


<p

className="
text-[10px]
font-bold
uppercase
tracking-[0.35em]
text-[#8B5E00]
"

>

VEDIC DAILY

</p>



<h2

className="
mt-2
font-serif
text-xl
font-bold
text-[#3B2600]
md:text-2xl
"

>

☀ Daily Panchang • आज का पंचांग

</h2>



</div>






{/* DATE BOX */}

<div

className="
relative
rounded-xl
border
border-[#D4AF37]/70
bg-[#3B2600]
px-4
py-3
text-center
shadow-[0_15px_40px_rgba(212,175,55,.25)]
"

>


<p

className="
text-xl
font-bold
leading-none
text-[#FFF9E8]
"

>

{date.day}

</p>



<p

className="
mt-1
text-[10px]
tracking-[0.3em]
text-[#D4AF37]
"

>

{date.month}

</p>



<p

className="
text-[9px]
text-[#FFF9E8]/70
"

>

{date.year}

</p>


</div>



</div>









{/* DIVIDER */}


<div

className="
relative
z-10
mx-5
my-5
h-px
bg-gradient-to-r
from-transparent
via-[#D4AF37]/40
to-transparent
md:mx-7
"

/>








{/* MAIN ITEMS */}



<div

className="
relative
z-10
grid
grid-cols-2
gap-4
px-5
pb-5
md:grid-cols-5
md:px-7
"

>


{

mainItems.map(
(item,index)=>{


const Icon =
item.icon;



return (


<motion.div


key={index}


whileHover={{

y:-4,

scale:1.02

}}



transition={{

type:"spring",

stiffness:250

}}



className="
group
rounded-2xl
border
border-[#D4AF37]/25
bg-white/50
px-3
py-3.5
backdrop-blur-md
shadow-[0_10px_30px_rgba(122,31,31,.06)]
transition-all
duration-300
hover:border-[#D4AF37]/60
hover:shadow-[0_20px_45px_rgba(212,175,55,.18)]
"

>



<div

className="
flex
items-center
gap-2
"

>


<div

className="
rounded-full
bg-[#D4AF37]/10
p-1.5
"

>


<Icon

size={14}

className="
text-[#D4AF37]
"

/>


</div>




<p

className="
text-[10px]
uppercase
tracking-widest
text-[#8B6B20]
"

>

{item.title}

</p>



</div>







<p

className="
mt-3
font-serif
text-sm
font-bold
text-[#3B2600]
md:text-base
"

>

{item.value}

</p>





{

item.sub &&


<p

className="
mt-1
text-[10px]
text-[#7A1F1F]
"

>

{item.sub}

</p>


}





</motion.div>


)



}

)

}



</div>










{/* BOTTOM INFORMATION */}



<div

className="
relative
z-10
border-t
border-[#D4AF37]/25
bg-gradient-to-r
from-[#F4E7C4]
via-[#FFF9E8]
to-[#F4E7C4]
px-5
py-4
md:px-7
"

>



<div

className="
grid
grid-cols-2
gap-4
md:grid-cols-4
"

>


{

bottomItems.map(
(item,index)=>(


<div

key={index}

className="
flex
items-center
gap-2
"

>


<Orbit

size={13}

className="
text-[#8B5E00]
"

/>




<div>


<p

className="
text-[8px]
uppercase
tracking-widest
text-[#8B5E00]
"

>

{item.label}

</p>




<p

className="
text-xs
font-bold
text-[#3B2600]
"

>

{item.value}

</p>



</div>



</div>



)

)

}



</div>



</div>







</motion.div>


</section>


);

}