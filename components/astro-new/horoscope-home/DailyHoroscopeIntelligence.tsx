"use client";

//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO
//
// DAILY VEDIC INTELLIGENCE
//
// PREMIUM COMPACT MODULE
//
// DATA DISPLAY ONLY
//
// NO ENGINE
// NO AI
// NO CALCULATION
//
//////////////////////////////////////////////////////////////

import {
  Moon,
  Sparkles,
  Clock3,
  Star,
  Sun,
} from "lucide-react";

import { motion } from "framer-motion";


interface Props {

  panchang?: any;

  muhurta?: any;

}



export default function DailyHoroscopeIntelligence({

  panchang,

  muhurta,

}:Props){


const data = panchang || {};

const timing = muhurta?.muhurta || {};



return (

<section

className="
px-4
py-8
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

<motion.div

initial={{
opacity:0,
y:15
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

transition={{
duration:.5
}}

className="mb-6"

>


<div

className="
flex
items-center
gap-2
text-[11px]
font-bold
uppercase
tracking-[0.35em]
text-[#8B5E00]
"

>

<Sparkles size={14}/>

Vedic Daily Intelligence

</div>



<h2

className="
mt-2
font-serif
text-3xl
font-bold
text-[#3B2600]
"

>

Today's Cosmic Rhythm

</h2>



<p

className="
mt-2
text-sm
text-[#6B4A16]
"

>

Live Panchang rhythm and sacred time windows

</p>



</motion.div>









{/* TOP MODULES */}

<div

className="
grid
gap-4
lg:grid-cols-3
"

>



<IntelligenceCard

icon={<Moon size={18}/>}

title="Cosmic Energy"

>


<Row

label="Moon Phase"

value={data?.moonPhase?.name}

/>


<Row

label="Moon Rashi"

value={data?.moonRashi?.name}

/>



<Row

label="Nakshatra"

value={

data?.nakshatra

?

`${data.nakshatra.name} • Pada ${data.nakshatra.pada}`

:

"-"

}

/>



</IntelligenceCard>








<IntelligenceCard

icon={<Star size={18}/>}

title="Panchang Essence"

>


<Row

label="Tithi"

value={

data?.tithi

?

`${data.tithi.name} • ${data.tithi.paksha}`

:

"-"

}

/>



<Row

label="Yoga"

value={data?.yoga?.name}

/>



<Row

label="Karana"

value={data?.karana?.name}

/>



</IntelligenceCard>









<IntelligenceCard

icon={<Clock3 size={18}/>}

title="Muhurta Windows"

>


<Muhurta

title="Brahma"

data={timing?.auspicious?.brahma}

good

/>



<Muhurta

title="Abhijit"

data={timing?.auspicious?.abhijit}

good

/>



<Muhurta

title="Rahu"

data={timing?.inauspicious?.rahu}

/>



</IntelligenceCard>



</div>









{/* SOLAR + LUNAR */}

<motion.div

initial={{
opacity:0,
scale:.97
}}

whileInView={{
opacity:1,
scale:1
}}

viewport={{
once:true
}}

transition={{
duration:.6
}}

className="
mt-5
rounded-[30px]
border
border-[#D4AF37]/40
bg-gradient-to-br
from-[#FFF9E8]
via-white
to-[#F3E2C0]
p-5
shadow-xl
"

>


<div

className="
grid
gap-5
md:grid-cols-2
"

>



{/* SOLAR */}

<PremiumBox

icon={<Sun size={18}/>}

title="Solar Rhythm"

>


<Row

label="Sunrise"

value={formatTime(data?.sunrise)}

/>



<Row

label="Sunset"

value={formatTime(data?.sunset)}

/>



</PremiumBox>










{/* LUNAR */}

<PremiumBox

icon={<Moon size={18}/>}

title="Lunar Wisdom"

>


<Row

label="Moon Rhythm"

value={data?.moonPhase?.name}

/>



<Row

label="Nakshatra"

value={data?.nakshatra?.name}

/>



</PremiumBox>



</div>



</motion.div>





</div>

</section>

);

}









function IntelligenceCard({

icon,

title,

children

}:{

icon:React.ReactNode;

title:string;

children:React.ReactNode;

}){


return (

<motion.div

initial={{
opacity:0,
y:20
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

transition={{
duration:.5
}}

whileHover={{
y:-5
}}

className="
rounded-[28px]
border
border-[#D4AF37]/30
bg-white/70
p-5
shadow-lg
backdrop-blur
transition
"

>


<CardTitle

icon={icon}

title={title}

/>


<div className="mt-4 space-y-3">

{children}

</div>


</motion.div>

);

}









function PremiumBox({

icon,

title,

children

}:{

icon:React.ReactNode;

title:string;

children:React.ReactNode;

}){


return (

<motion.div

whileHover={{
y:-4
}}

transition={{
duration:.3
}}

className="
rounded-2xl
border
border-[#D4AF37]/20
bg-white/70
p-5
transition
hover:shadow-xl
"

>


<CardTitle

icon={icon}

title={title}

/>


<div className="mt-4 space-y-3">

{children}

</div>


</motion.div>

);

}









function CardTitle({

icon,

title

}:{

icon:React.ReactNode;

title:string;

}){


return (

<div className="flex items-center gap-3">


<div

className="
rounded-full
bg-[#D4AF37]/20
p-2
text-[#8B5E00]
"

>

{icon}

</div>



<h3

className="
font-serif
font-bold
text-[#3B2600]
"

>

{title}

</h3>



</div>

);

}









function Row({

label,

value

}:{

label:string;

value?:string;

}){


return (

<div

className="
flex
justify-between
rounded-xl
bg-[#FFF9E8]
px-3
py-2
"

>


<span

className="
text-[10px]
uppercase
tracking-wider
text-[#8B5E00]
"

>

{label}

</span>



<span

className="
text-xs
font-bold
text-[#3B2600]
"

>

{value || "-"}

</span>


</div>

);

}









function Muhurta({

title,

data,

good

}:{

title:string;

data:any;

good?:boolean;

}){


if(!data)

return null;



return (

<motion.div

initial={{
opacity:0,
x:-10
}}

animate={{
opacity:1,
x:0
}}

transition={{
duration:.4
}}

className="
flex
items-center
justify-between
rounded-xl
bg-white/70
px-3
py-2
transition
hover:shadow-md
"

>


<div>

<p className="text-xs font-bold text-[#3B2600]">

{title}

</p>



<p className="text-[10px] text-[#6B4A16]">

{formatTime(data.start)}

-

{formatTime(data.end)}

</p>


</div>



<span

className={`

rounded-full
px-2
py-1
text-[9px]
font-bold

${
good

?

"bg-[#D4AF37]/20 text-[#8B5E00]"

:

"bg-[#7A1F1F]/10 text-[#7A1F1F]"

}

`}

>

{good ? "GOOD":"AVOID"}

</span>



</motion.div>

);

}









function formatTime(value?:string){

if(!value)

return "-";


return new Date(value).toLocaleTimeString(

"en-IN",

{

hour:"2-digit",

minute:"2-digit"

}

);

}