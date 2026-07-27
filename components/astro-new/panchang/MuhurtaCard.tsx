"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH MUHURTA CARD
//
// Auspicious Time Intelligence
//////////////////////////////////////////////////////////////

import { Clock3 } from "lucide-react";
import { motion } from "framer-motion";


interface MuhurtaItem {

name:string;

start:string;

end:string;

}



interface Props {

items:MuhurtaItem[];

}



export default function MuhurtaCard({

items,

}:Props){


return (

<motion.div

whileHover={{
y:-5
}}

className="
rounded-3xl
border
border-[#D4AF37]/40
bg-[#FFF9E8]
p-6
shadow-sm
"

>


<div className="flex items-center gap-3">


<div

className="
flex
h-11
w-11
items-center
justify-center
rounded-full
border
border-[#D4AF37]/40
bg-[#F8F1DE]
"

>

<Clock3

size={20}

className="text-[#8B5E00]"

/>


</div>



<div>

<p className="
text-[10px]
uppercase
tracking-[0.3em]
text-[#8B5E00]
">

Vedic Timing

</p>


<h3

className="
font-serif
text-xl
font-bold
text-[#3B2600]
"

>

Auspicious Time

</h3>


</div>


</div>





<div className="mt-5 space-y-3">


{

items.map((item,index)=>(


<div

key={index}

className="
flex
justify-between
border-b
border-[#D4AF37]/20
pb-3
text-sm
"

>


<span className="text-[#8B5E00]">

✓ {item.name}

</span>



<span className="font-bold text-[#3B2600]">

{item.start} - {item.end}

</span>


</div>


))


}


</div>


</motion.div>


);


}