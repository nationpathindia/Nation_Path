"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// NAKSHATRA EXPLORER
//
// 27 Lunar Birth Star Intelligence Archive
//
// Experience:
//
// Left:
// Sacred Constellation Archive
//
// Right:
// Selected Moon Intelligence
//
// Future:
// Astro Engine API Integration
//////////////////////////////////////////////////////////////

import { useState } from "react";
import { motion } from "framer-motion";

import {
  Moon,
  Sparkles,
  Star,
} from "lucide-react";


import NakshatraCard from "./NakshatraCard";
import NakshatraDetailPanel from "./NakshatraDetailPanel";



//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

export interface NakshatraItem {

  name:string;

  deity:string;

  planet:string;

  symbol:string;

  description:string;

}




interface NakshatraExplorerProps {

  title?:string;

  description?:string;

  nakshatras?:NakshatraItem[];

}




//////////////////////////////////////////////////////////////
// DEFAULT KNOWLEDGE DATA
//
// Future:
// Replace with API response
//////////////////////////////////////////////////////////////

const DEFAULT_NAKSHATRAS:NakshatraItem[] = [

{
name:"Ashwini",
deity:"Ashwini Kumaras",
planet:"Ketu",
symbol:"Horse",
description:
"Healing energy, speed, courage and new beginnings."
},


{
name:"Bharani",
deity:"Yama",
planet:"Venus",
symbol:"Yoni",
description:
"Transformation, responsibility and inner strength."
},


{
name:"Krittika",
deity:"Agni",
planet:"Sun",
symbol:"Flame",
description:
"Purification, leadership and determination."
},


{
name:"Rohini",
deity:"Brahma",
planet:"Moon",
symbol:"Chariot",
description:
"Creativity, beauty and growth energy."
},


{
name:"Mrigashira",
deity:"Soma",
planet:"Mars",
symbol:"Deer",
description:
"Curiosity, exploration and gentle intelligence."
},


{
name:"Ardra",
deity:"Rudra",
planet:"Rahu",
symbol:"Teardrop",
description:
"Transformation, depth and emotional strength."
},


{
name:"Punarvasu",
deity:"Aditi",
planet:"Jupiter",
symbol:"Bow",
description:
"Renewal, optimism and spiritual wisdom."
},


{
name:"Pushya",
deity:"Brihaspati",
planet:"Saturn",
symbol:"Flower",
description:
"Nourishment, discipline and prosperity."
},


{
name:"Ashlesha",
deity:"Nagas",
planet:"Mercury",
symbol:"Serpent",
description:
"Intuition, mystery and deep perception."
},


{
name:"Magha",
deity:"Pitris",
planet:"Ketu",
symbol:"Throne",
description:
"Heritage, authority and ancestral wisdom."
},


{
name:"Purva Phalguni",
deity:"Bhaga",
planet:"Venus",
symbol:"Hammock",
description:
"Creativity, enjoyment and relationships."
},


{
name:"Uttara Phalguni",
deity:"Aryaman",
planet:"Sun",
symbol:"Bed",
description:
"Commitment, leadership and stability."
},


{
name:"Hasta",
deity:"Savitar",
planet:"Moon",
symbol:"Hand",
description:
"Skill, intelligence and craftsmanship."
},


{
name:"Chitra",
deity:"Vishwakarma",
planet:"Mars",
symbol:"Pearl",
description:
"Beauty, creation and vision."
},


{
name:"Swati",
deity:"Vayu",
planet:"Rahu",
symbol:"Plant",
description:
"Independence, flexibility and growth."
},


{
name:"Vishakha",
deity:"Indra-Agni",
planet:"Jupiter",
symbol:"Arch",
description:
"Ambition, focus and achievement."
},


{
name:"Anuradha",
deity:"Mitra",
planet:"Saturn",
symbol:"Lotus",
description:
"Devotion, friendship and harmony."
},


{
name:"Jyeshtha",
deity:"Indra",
planet:"Mercury",
symbol:"Earring",
description:
"Protection, responsibility and power."
},


{
name:"Mula",
deity:"Nirriti",
planet:"Ketu",
symbol:"Roots",
description:
"Investigation, truth and transformation."
},


{
name:"Purva Ashadha",
deity:"Apah",
planet:"Venus",
symbol:"Fan",
description:
"Confidence, creativity and victory."
},


{
name:"Uttara Ashadha",
deity:"Vishvadevas",
planet:"Sun",
symbol:"Elephant",
description:
"Integrity, success and leadership."
},


{
name:"Shravana",
deity:"Vishnu",
planet:"Moon",
symbol:"Ear",
description:
"Learning, communication and wisdom."
},


{
name:"Dhanishta",
deity:"Vasus",
planet:"Mars",
symbol:"Drum",
description:
"Achievement, rhythm and prosperity."
},


{
name:"Shatabhisha",
deity:"Varuna",
planet:"Rahu",
symbol:"Circle",
description:
"Healing, research and hidden knowledge."
},


{
name:"Purva Bhadrapada",
deity:"Aja Ekapada",
planet:"Jupiter",
symbol:"Sword",
description:
"Spirituality, intensity and transformation."
},


{
name:"Uttara Bhadrapada",
deity:"Ahir Budhnya",
planet:"Saturn",
symbol:"Serpent",
description:
"Patience, depth and wisdom."
},


{
name:"Revati",
deity:"Pushan",
planet:"Mercury",
symbol:"Fish",
description:
"Protection, compassion and completion."
},


];




//////////////////////////////////////////////////////////////
// COMPONENT
//////////////////////////////////////////////////////////////

export default function NakshatraExplorer({

title="Explore The 27 Nakshatras",

description=
"Discover the ancient Vedic birth stars that reveal personality patterns, emotional nature and lunar intelligence.",

nakshatras=DEFAULT_NAKSHATRAS,

}:NakshatraExplorerProps){



const [selectedNakshatra,setSelectedNakshatra]
=
useState<NakshatraItem>(
  nakshatras[0]
);


return (

<section

className="
relative
px-5
py-16
sm:px-8
lg:px-16
"

>





<div

className="
mx-auto
max-w-7xl
"

>





{/* HEADER */}

<div

className="
mx-auto
max-w-3xl
text-center
"

>


<div

className="
mx-auto
flex
h-12
w-12
items-center
justify-center
rounded-full
border
border-[#D4AF37]/40
bg-[#120C08]
shadow-lg
"

>

<Moon

size={24}

className="
text-[#D4AF37]
"

/>

</div>





<h2

className="
mt-5
font-serif
text-3xl
font-semibold
text-[#3B2600]
sm:text-4xl
"

>

{title}

</h2>





<p

className="
mx-auto
mt-3
max-w-2xl
text-sm
leading-7
text-[#6B4A16]
sm:text-base
"

>

{description}

</p>





<div

className="
mt-5
flex
items-center
justify-center
gap-2
text-xs
uppercase
tracking-[0.25em]
text-[#8B5E00]
"

>

<Star size={14}/>

27 Lunar Birth Stars

</div>




</div>








{/* MAIN EXPERIENCE */}

<div

className="
mt-12
grid
gap-8
lg:grid-cols-[1fr_380px]
"

>







{/* CONSTELLATION ARCHIVE */}

<div

className="
rounded-3xl
border
border-[#D4AF37]/30
bg-[#120C08]
p-5
shadow-[0_25px_80px_rgba(18,12,8,0.18)]
sm:p-7
"

>



<div

className="
mb-6
flex
items-center
justify-between
"

>


<div

className="
text-xs
uppercase
tracking-[0.3em]
text-[#D4AF37]
"

>

Sacred Constellation Archive

</div>




<div

className="
text-xs
text-[#D8C49A]
"

>

27 / 27

</div>



</div>








<div

className="
grid
grid-cols-2
gap-3
sm:grid-cols-3
md:grid-cols-4
xl:grid-cols-5
"

>



{

nakshatras.map((item,index)=>(



<motion.div

key={item.name}

initial={{

opacity:0,

y:12,

}}

whileInView={{

opacity:1,

y:0,

}}

viewport={{

once:true,

}}

transition={{

duration:0.25,

delay:index * 0.015,

}}

>





<NakshatraCard

name={item.name}

planet={item.planet}

active={
selectedNakshatra.name === item.name
}

onClick={()=>{

setSelectedNakshatra(item);

}}


/>






</motion.div>



))


}



</div>






</div>









{/* INTELLIGENCE PANEL */}

<div

className="
rounded-3xl
border
border-[#D4AF37]/40
bg-[#F8F1DE]
p-5
shadow-[0_25px_70px_rgba(139,94,0,0.12)]
lg:sticky
lg:top-24
lg:self-start
sm:p-6
"

>




<div

className="
mb-5
flex
items-center
gap-2
text-xs
uppercase
tracking-[0.3em]
text-[#8B5E00]
"

>

<Sparkles size={14}/>

Moon Intelligence

</div>






<motion.div

key={selectedNakshatra.name}

initial={{

opacity:0,

x:20,

}}

animate={{

opacity:1,

x:0,

}}

transition={{

duration:0.35,

}}

>





<NakshatraDetailPanel

name={selectedNakshatra.name}

deity={selectedNakshatra.deity}

planet={selectedNakshatra.planet}

symbol={selectedNakshatra.symbol}

meaning={selectedNakshatra.description}

/>





</motion.div>







</div>





</div>









{/* FOOTER MESSAGE */}

<div

className="
mt-10
flex
items-center
justify-center
gap-2
text-sm
text-[#8B5E00]
"

>

<Sparkles size={16}/>

Explore the ancient intelligence of your Moon

<Sparkles size={16}/>

</div>







</div>



</section>


);


}