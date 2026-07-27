"use client";

//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO
//
// PANCHANG LIVE INTELLIGENCE STRIPE
//
// PREMIUM VEDIC CALENDAR CONSOLE
//
// DATA DISPLAY ONLY
//
// NO CALCULATION
//
//////////////////////////////////////////////////////////////

import {
  CalendarDays,
  Moon,
  Sparkles,
  Sun,
  Star,
  CircleDot,
  Sunrise,
  Sunset,
  Clock,
} from "lucide-react";

import { motion } from "framer-motion";


interface Props {
  panchang?: any;
}



export default function PanchangLivePanel({
  panchang,
}: Props) {


  const data = panchang || {};

  const vikram =
    data?.vikramSamvat || {};



  const date =
    data?.timestamp
      ? new Date(data.timestamp)
      : new Date();



  const formattedDate =
    date.toLocaleDateString(
      "en-IN",
      {
        day:"numeric",
        month:"short",
        year:"numeric",
      }
    );




  const formatTime = (
    value:any
  ) => {

    if(!value)
      return "-";


    return new Date(value)
      .toLocaleTimeString(
        "en-IN",
        {
          hour:"2-digit",
          minute:"2-digit",
        }
      );

  };




return (

<section
className="
px-4
py-5
sm:px-8
"
>


<motion.div

initial={{
opacity:0,
y:20,
scale:0.98
}}

animate={{
opacity:1,
y:0,
scale:1
}}

transition={{
duration:0.6,
ease:"easeOut"
}}

className="
mx-auto
max-w-7xl

rounded-[28px]

border
border-[#C6A15B]/40

bg-[#F8F5EE]

p-4
sm:p-5

shadow-[0_20px_60px_rgba(51,18,10,0.10)]

"

>





{/* HEADER */}

<div

className="
flex
items-center
justify-between
gap-4
"

>


<div>


<div

className="
flex
items-center
gap-2

text-[9px]

font-bold

uppercase

tracking-[0.35em]

text-[#CF7031]
"

>

<Sparkles size={13}/>

Vedic Calendar Intelligence

</div>



<h2

className="
mt-1

font-serif

text-xl

font-bold

text-[#33120A]
"

>

Today's Panchang

</h2>


</div>





<div

className="
flex
items-center
gap-2

rounded-full

border
border-[#C6A15B]/40

bg-[#FFFDF8]

px-3
py-1.5

text-xs

font-semibold

text-[#475569]

"

>

<CalendarDays

size={13}

className="text-[#C6A15B]"
/>

{formattedDate}

</div>


</div>









{/* SKY STRIP */}

<motion.div

initial={{
opacity:0
}}

animate={{
opacity:1
}}

transition={{
delay:0.2
}}

className="
mt-5

grid

grid-cols-2

gap-2

sm:grid-cols-4

"

>


<SkyItem

delay={0}

icon={<Sunrise size={15}/>}

title="Sunrise"

value={formatTime(data?.sunrise)}

/>



<SkyItem

delay={0.1}

icon={<Sunset size={15}/>}

title="Sunset"

value={formatTime(data?.sunset)}

/>



<SkyItem

delay={0.2}

icon={<Moon size={15}/>}

title="Moon"

value={`${data?.moonPhase?.name || "-"} ${data?.moonPhase?.illumination ? `(${Math.round(data.moonPhase.illumination)}%)` : ""}`}

/>



<SkyItem

delay={0.3}

icon={<Sun size={15}/>}

title="Sun Rashi"

value={data?.sunRashi?.name}

/>



</motion.div>









{/* PANCHANG LINE */}

<motion.div

initial={{
opacity:0,
y:10
}}

animate={{
opacity:1,
y:0
}}

transition={{
delay:0.4
}}

className="
mt-5

grid

grid-cols-2

divide-y

divide-[#C6A15B]/20

rounded-2xl

border

border-[#C6A15B]/30

bg-[#FFFDF8]

sm:grid-cols-6

sm:divide-x

sm:divide-y-0

"

>


<PanchangMini
icon={<Sun size={14}/>}
title="Vara"
value={data?.vara?.name}
/>



<PanchangMini
icon={<Moon size={14}/>}
title="Tithi"
value={`${data?.tithi?.paksha || ""} ${data?.tithi?.name || ""}`}
/>



<PanchangMini
icon={<Star size={14}/>}
title="Nakshatra"
value={data?.nakshatra?.name}
/>



<PanchangMini
icon={<Sparkles size={14}/>}
title="Yoga"
value={data?.yoga?.name}
/>



<PanchangMini
icon={<CircleDot size={14}/>}
title="Karana"
value={data?.karana?.name}
/>



<PanchangMini
icon={<Moon size={14}/>}
title="Paksha"
value={data?.paksha?.name}
/>



</motion.div>









{/* FOOTER */}

<div

className="
mt-5

flex

flex-col

gap-3

sm:flex-row

sm:items-center

sm:justify-between

"

>



<motion.div

whileHover={{
y:-3
}}

className="
flex

items-center

gap-3

rounded-2xl

border

border-[#C6A15B]/30

bg-[#FFFDF8]

px-4

py-3

"

>

<Clock

size={15}

className="text-[#C6A15B]"
/>


<div>


<p

className="
text-[9px]

font-bold

uppercase

tracking-[0.25em]

text-[#CF7031]
"

>

Timing

</p>



<p

className="
text-xs

font-semibold

text-[#33120A]
"

>

Tithi {formatTime(data?.tithiTiming?.end)}

&nbsp; • &nbsp;

Yoga {formatTime(data?.yogaTiming?.end)}

</p>


</div>


</motion.div>







<motion.div

animate={{
boxShadow:[
"0 0 0 rgba(198,161,91,0)",
"0 0 20px rgba(198,161,91,0.25)",
"0 0 0 rgba(198,161,91,0)"
]
}}

transition={{
duration:5,
repeat:Infinity
}}

className="
flex

items-center

justify-between

rounded-2xl

border

border-[#C6A15B]/40

bg-[#FFF7E8]

px-5

py-3

"

>


<p

className="
text-[10px]

font-bold

uppercase

tracking-[0.25em]

text-[#CF7031]
"

>

Vikram Samvat

</p>



<p

className="
font-serif

text-2xl

font-bold

text-[#33120A]
"

>

{vikram?.year || "-"}

</p>



</motion.div>



</div>






</motion.div>


</section>

);

}








function SkyItem({

icon,

title,

value,

delay,

}:{

icon:React.ReactNode;

title:string;

value?:string;

delay:number;

}){


return (

<motion.div

initial={{
opacity:0,
y:10
}}

animate={{
opacity:1,
y:0
}}

transition={{
delay
}}

whileHover={{
y:-3
}}

className="
flex

items-center

gap-3

rounded-xl

border

border-[#C6A15B]/30

bg-[#FFFDF8]

px-3

py-2.5

"

>


<div

className="
text-[#C6A15B]
"

>

{icon}

</div>



<div>


<p

className="
text-[9px]

font-bold

uppercase

tracking-[0.2em]

text-[#CF7031]
"

>

{title}

</p>



<p

className="
text-xs

font-semibold

text-[#33120A]
"

>

{value || "-"}

</p>


</div>



</motion.div>

);

}








function PanchangMini({

icon,

title,

value,

}:{

icon:React.ReactNode;

title:string;

value?:string;

}){


return (

<motion.div

whileHover={{
y:-2
}}

className="
px-3

py-3

"

>


<div

className="
flex

items-center

gap-2

text-[#C6A15B]
"

>

{icon}


<span

className="
text-[8px]

font-bold

uppercase

tracking-[0.25em]

text-[#CF7031]
"

>

{title}

</span>


</div>



<p

className="
mt-1

truncate

font-serif

text-sm

font-bold

text-[#33120A]
"

>

{value || "-"}

</p>



</motion.div>

);

}