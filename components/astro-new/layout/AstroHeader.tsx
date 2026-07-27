"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";


const NAV_ITEMS = [
  {
    name:"Horoscope",
    href:"/astro/horoscope",
  },
  {
    name:"Panchang",
    href:"/astro/panchang",
  },
  {
    name:"Kundli",
    href:"/astro/kundli",
  },
  {
    name:"Compatibility",
    href:"/astro/compatibility",
  },
  {
    name:"Knowledge",
    href:"/astro/knowledge",
  },
];



export default function AstroHeader(){


const [open,setOpen]=useState(false);



return (

<header

className="
sticky
top-0
z-50
border-b
border-[#D4AF37]/30
bg-[#120C08]/95
backdrop-blur-xl
"

>


<div

className="
mx-auto
max-w-6xl
px-5
sm:px-8
"

>


<div

className="
h-20
flex
items-center
justify-between
"

>



<Link

href="/astro"

className="
flex
items-center
gap-3
"

>


<Image

src="/idlogo.png"

alt="NationPath Astro"

width={48}

height={48}

className="
rounded-full
object-contain
"

/>



<div>


<p

className="
text-sm
font-bold
text-[#FFF4D6]
"

>

NationPath

</p>



<p

className="
text-[10px]
tracking-[0.25em]
font-bold
text-[#D4AF37]
"

>

ASTRO INTELLIGENCE

</p>


</div>


</Link>







<nav

className="
hidden
lg:flex
items-center
gap-7
"

>


{

NAV_ITEMS.map((item)=>(


<Link

key={item.href}

href={item.href}

className="
text-sm
font-medium
text-[#C8A96A]
hover:text-[#FFF4D6]
transition
"

>

{item.name}

</Link>


))

}


</nav>







<div

className="
hidden
lg:flex
items-center
gap-5
"

>


<Link

href="/login"

className="
text-sm
font-medium
text-[#C8A96A]
hover:text-[#FFF4D6]
"

>

Login

</Link>





<Link

href="/pricing"

className="
flex
items-center
gap-2
rounded-full
bg-[#D4AF37]
px-5
py-2.5
text-sm
font-bold
text-[#120C08]
hover:bg-[#E6C85C]
transition
"

>


<Sparkles size={16}/>

Premium


</Link>


</div>







<button

type="button"

onClick={()=>setOpen(!open)}

className="
lg:hidden
text-[#FFF4D6]
"

>

{

open

?

<X size={28}/>

:

<Menu size={28}/>

}


</button>




</div>


</div>


</header>


);


}