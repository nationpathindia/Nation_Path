"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// ZODIAC SELECTOR MODAL
//
// PREMIUM VEDIC ENTRY EXPERIENCE
//
// HOMEPAGE HOROSCOPE GATEWAY
//
// NO ENGINE
// NO AI
// NO CALCULATION
//////////////////////////////////////////////////////////////

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";



interface ZodiacItem {

  name?: string;

  slug?: string;

  image?: string;

}



interface Props {

  open:boolean;

  onClose:()=>void;

  zodiacList?:ZodiacItem[];

}





const zodiacSigns:ZodiacItem[] = [

{
name:"Aries",
slug:"aries",
image:"/zodiac/aries.png"
},

{
name:"Taurus",
slug:"taurus",
image:"/zodiac/taurus.png"
},

{
name:"Gemini",
slug:"gemini",
image:"/zodiac/gemini.png"
},

{
name:"Cancer",
slug:"cancer",
image:"/zodiac/cancer.png"
},

{
name:"Leo",
slug:"leo",
image:"/zodiac/leo.png"
},

{
name:"Virgo",
slug:"virgo",
image:"/zodiac/virgo.png"
},

{
name:"Libra",
slug:"libra",
image:"/zodiac/libra.png"
},

{
name:"Scorpio",
slug:"scorpio",
image:"/zodiac/scorpio.png"
},

{
name:"Sagittarius",
slug:"sagittarius",
image:"/zodiac/sagittarius.png"
},

{
name:"Capricorn",
slug:"capricorn",
image:"/zodiac/capricorn.png"
},

{
name:"Aquarius",
slug:"aquarius",
image:"/zodiac/aquarius.png"
},

{
name:"Pisces",
slug:"pisces",
image:"/zodiac/pisces.png"
}

];







export default function ZodiacSelectorModal({

open,

onClose,

zodiacList=[]

}:Props){



const router = useRouter();



const signs = zodiacList.length
?
zodiacList
:
zodiacSigns;







function selectRashi(slug?:string){


if(!slug){

return;

}



router.push(`/astro/horoscope/${slug}`);


onClose();


}








return (

<AnimatePresence>


{open && (


<motion.div

initial={{
opacity:0
}}

animate={{
opacity:1
}}

exit={{
opacity:0
}}

className="
fixed
inset-0
z-[100]
flex
items-center
justify-center
bg-black/45
px-4
backdrop-blur-xl
"

onClick={onClose}

>







{/* BACKGROUND GOLD LIGHT */}


<div

className="
absolute
left-1/2
top-1/2
h-[650px]
w-[650px]
-translate-x-1/2
-translate-y-1/2
rounded-full
bg-[#D4AF37]/20
blur-[170px]
"

/>









<motion.div

initial={{

scale:.85,

y:40

}}

animate={{

scale:1,

y:0

}}

exit={{

scale:.85,

y:40

}}

transition={{

duration:.35

}}

onClick={(e)=>e.stopPropagation()}


className="
relative
w-full
max-w-4xl
overflow-hidden
rounded-[42px]
border
border-[#D4AF37]/40
bg-[#FFF9E8]
p-6
shadow-[0_40px_120px_rgba(0,0,0,.35)]
sm:p-10
"

>






{/* AMBIENT GLOW */}


<div

className="
absolute
right-[-120px]
top-[-120px]
h-[300px]
w-[300px]
rounded-full
bg-[#7A1F1F]/20
blur-[120px]
"

/>



<div

className="
absolute
bottom-[-120px]
left-[-120px]
h-[300px]
w-[300px]
rounded-full
bg-[#D4AF37]/25
blur-[120px]
"

/>








{/* CLOSE */}


<button

onClick={onClose}

className="
absolute
right-5
top-5
z-20
flex
h-10
w-10
items-center
justify-center
rounded-full
border
border-[#D4AF37]/40
bg-white/70
text-[#3B2600]
transition
hover:scale-110
"

>

<X size={18}/>

</button>









{/* HEADER */}



<div

className="
relative
text-center
"

>





{/* LOGO */}


<div

className="
relative
mx-auto
mb-5
flex
h-24
w-24
items-center
justify-center
"

>


<div

className="
absolute
inset-0
rounded-full
bg-[#D4AF37]/40
blur-2xl
"

/>



<div

className="
relative
flex
h-24
w-24
items-center
justify-center
rounded-full
border
border-[#D4AF37]/50
bg-white/80
shadow-[0_0_50px_rgba(212,175,55,.4)]
"

>


<Image

src="/idlogo.png"

alt="NationPath Astro"

width={65}

height={65}

className="
object-contain
"

/>


</div>


</div>









<div

className="
inline-flex
items-center
gap-2
rounded-full
border
border-[#D4AF37]/40
bg-[#D4AF37]/10
px-5
py-2
text-[10px]
font-bold
uppercase
tracking-[0.35em]
text-[#8B5E00]
"

>

<Sparkles size={14}/>

NationPath Astro

</div>







<h2

className="
mt-5
font-serif
text-3xl
font-bold
text-[#3B2600]
sm:text-4xl
"

>

Choose Your Rashi

</h2>







<p

className="
mx-auto
mt-3
max-w-lg
text-sm
leading-7
text-[#6B4A16]
"

>

Select your zodiac identity
and start your horoscope journey.

</p>



</div>









{/* ZODIAC GRID */}



<div

className="
relative
mt-10
grid
grid-cols-3
gap-4
sm:grid-cols-4
lg:grid-cols-6
"

>


{signs.map((item,index)=>(


<motion.button


key={item.slug || index}


onClick={()=>selectRashi(item.slug)}


whileHover={{

y:-8,

scale:1.05

}}


whileTap={{

scale:.96

}}


className="
group
relative
rounded-[30px]
border
border-[#D4AF37]/30
bg-white/70
p-4
shadow-md
backdrop-blur
"

>





<div

className="
absolute
inset-0
rounded-[30px]
bg-gradient-to-br
from-[#D4AF37]/20
to-[#7A1F1F]/15
opacity-0
transition
group-hover:opacity-100
"

/>






<div

className="
relative
"

>


<motion.div

animate={{

y:[0,-4,0]

}}

transition={{

duration:4+index,

repeat:Infinity,

ease:"easeInOut"

}}

className="
mx-auto
flex
h-16
w-16
items-center
justify-center
rounded-full
border
border-[#D4AF37]/50
bg-gradient-to-br
from-[#7A1F1F]
via-[#5B1515]
to-[#3B2600]
shadow-lg
"

>


<Image

src={item.image || "/zodiac/aries.png"}

alt={item.name || "zodiac"}

width={48}

height={48}

className="
object-contain
brightness-0
invert
"

/>


</motion.div>






<p

className="
mt-4
text-xs
font-bold
text-[#3B2600]
"

>

{item.name}

</p>



</div>



</motion.button>


))}



</div>








</motion.div>



</motion.div>


)}



</AnimatePresence>

);

}