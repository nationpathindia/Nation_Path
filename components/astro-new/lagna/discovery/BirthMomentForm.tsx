"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// LAGNA INTELLIGENCE EXPERIENCE
//
// BIRTH MOMENT FORM
//
// Identity:
// The moment your cosmic journey begins
//
// Future:
// Connect with Lagna API Contract
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  ArrowRight,
  Sparkles,
} from "lucide-react";



interface BirthMomentFormProps {

  onContinue?: () => void;

}





export default function BirthMomentForm({

  onContinue,

}: BirthMomentFormProps) {



return (

<motion.div

initial={{

opacity:0,
y:30

}}

whileInView={{

opacity:1,
y:0

}}

viewport={{

once:true

}}

transition={{

duration:0.7

}}

className="
mx-auto
max-w-4xl
"

>



<div

className="
rounded-[36px]
border
border-[#D4AF37]/30
bg-[#FFF9E8]
p-6
shadow-[0_25px_80px_rgba(18,12,8,0.08)]
sm:p-10
"

>







{/* HEADER */}



<div

className="
text-center
"

>



<div

className="
mx-auto
mb-5
flex
h-14
w-14
items-center
justify-center
rounded-full
bg-[#120C08]
"

>

<Sparkles

size={24}

className="
text-[#D4AF37]
"

/>

</div>





<p

className="
text-xs
uppercase
tracking-[0.35em]
text-[#8B5E00]
"

>

Your Birth Moment

</p>





<h2

className="
mt-3
text-3xl
font-semibold
text-[#3B2600]
"

>

When Did Your Journey Begin?

</h2>





<p

className="
mt-4
leading-7
text-[#6B4A16]
"

>

The exact moment and place of your birth help reveal the horizon that was rising when your story began.

</p>



</div>









{/* INPUT JOURNEY */}



<div

className="
mt-10
grid
gap-5
md:grid-cols-3
"

>






{/* DATE */}



<div

className="
rounded-2xl
border
border-[#D4AF37]/25
bg-[#F8F1DE]
p-5
"

>


<div

className="
flex
items-center
gap-3
text-[#8B5E00]
"

>

<CalendarDays size={20}/>

<span

className="
text-sm
font-medium
"

>

Birth Date

</span>


</div>



<div

className="
mt-4
h-10
rounded-xl
border
border-[#D4AF37]/20
bg-[#FFF9E8]
"

 />



</div>










{/* TIME */}



<div

className="
rounded-2xl
border
border-[#D4AF37]/25
bg-[#F8F1DE]
p-5
"

>


<div

className="
flex
items-center
gap-3
text-[#8B5E00]
"

>

<Clock3 size={20}/>

<span

className="
text-sm
font-medium
"

>

Birth Time

</span>


</div>



<div

className="
mt-4
h-10
rounded-xl
border
border-[#D4AF37]/20
bg-[#FFF9E8]
"

 />



</div>









{/* PLACE */}



<div

className="
rounded-2xl
border
border-[#D4AF37]/25
bg-[#F8F1DE]
p-5
"

>


<div

className="
flex
items-center
gap-3
text-[#8B5E00]
"

>

<MapPin size={20}/>

<span

className="
text-sm
font-medium
"

>

Birth Place

</span>


</div>



<div

className="
mt-4
h-10
rounded-xl
border
border-[#D4AF37]/20
bg-[#FFF9E8]
"

 />



</div>





</div>









{/* ACTION */}



<div

className="
mt-10
flex
justify-center
"

>



<button

onClick={onContinue}

className="
inline-flex
items-center
gap-3
rounded-full
bg-[#120C08]
px-8
py-4
text-sm
font-medium
text-[#FFF9E8]
transition
hover:bg-[#3B2600]
"

>

Continue To Cosmic Reading

<ArrowRight size={18}/>

</button>




</div>







</div>


</motion.div>


);

}