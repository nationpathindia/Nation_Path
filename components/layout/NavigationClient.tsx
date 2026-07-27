"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  Menu,
  X,
  ChevronDown
} from "lucide-react";



export default function NavigationClient({
  categories = [],
}: any) {


const pathname = usePathname();


const [open,setOpen] = useState(false);

const [moreOpen,setMoreOpen] = useState(false);


const moreRef = useRef<HTMLDivElement>(null);





const MAX_VISIBLE = 7;


const mainCategories =
categories.slice(0,MAX_VISIBLE);


const moreCategories =
categories.slice(MAX_VISIBLE);








const isActive = (slug:string)=>{


return (

pathname === `/${slug}`

||

pathname.startsWith(`/${slug}/`)

);


};







useEffect(()=>{


setOpen(false);

setMoreOpen(false);


},[pathname]);








useEffect(()=>{


function handleOutside(
event:MouseEvent
){


if(

moreRef.current &&

!moreRef.current.contains(
event.target as Node
)

){

setMoreOpen(false);

}


}



document.addEventListener(
"mousedown",
handleOutside
);



return ()=>{

document.removeEventListener(
"mousedown",
handleOutside
);

};


},[]);









const linkClass = (active:boolean)=>`


relative

px-3

py-5

text-[12px]

font-semibold

uppercase

tracking-[0.12em]

transition-colors

duration-300


${

active

?

"text-[var(--news-orange)]"

:

"text-[var(--news-text)] hover:text-[var(--news-orange)]"

}


`;









return (

<>


{/* ===========================
      DESKTOP NAVIGATION
=========================== */}


<nav

className="

hidden

md:block

news-navigation

"

>


<div

className="

news-container

"

>


<div

className="

flex

items-center

gap-1

"

>







<Link

href="/"

className={linkClass(
pathname === "/"
)}

>


Home




{

pathname === "/"

&&

(


<motion.span

layoutId="nav-active"

className="

absolute

bottom-0

left-3

right-3

h-[3px]

bg-[var(--news-orange)]

"

/>


)

}



</Link>








{

mainCategories.map(

(cat:any)=>(


<Link

key={cat.id}

href={`/${cat.slug}`}

className={linkClass(
isActive(cat.slug)
)}

>


{cat.name}





{

isActive(cat.slug)

&&

(


<motion.span

layoutId="nav-active"

className="

absolute

bottom-0

left-3

right-3

h-[3px]

bg-[var(--news-orange)]

"

/>


)

}




</Link>


)


)

}









{/* MORE MENU */}



{

moreCategories.length > 0 &&

(


<div

ref={moreRef}

className="relative"

>


<button


onClick={()=>setMoreOpen(!moreOpen)}


className="

px-3

py-5

flex

items-center

gap-1

text-[12px]

font-semibold

uppercase

tracking-[0.12em]

text-[var(--news-text)]

hover:text-[var(--news-orange)]

transition

"

>


More


<ChevronDown

size={14}

/>



</button>







<AnimatePresence>


{

moreOpen &&

(


<motion.div


initial={{

opacity:0,

y:-8

}}


animate={{

opacity:1,

y:0

}}


exit={{

opacity:0,

y:-8

}}


transition={{

duration:.2

}}


className="

absolute

top-full

left-0

mt-1

w-64

bg-white

border

border-[var(--news-border)]

rounded-lg

shadow-[var(--news-shadow)]

overflow-hidden

"

>


{

moreCategories.map(

(cat:any)=>(


<Link


key={cat.id}

href={`/${cat.slug}`}

onClick={()=>setMoreOpen(false)}


className="

block

px-5

py-3

text-sm

font-medium

text-[var(--news-text)]

hover:bg-[var(--news-soft)]

hover:text-[var(--news-orange)]

transition

"

>


{cat.name}



</Link>


)


)


}



</motion.div>


)


}


</AnimatePresence>






</div>


)

}




</div>


</div>


</nav>









{/* ===========================
      MOBILE NAV BAR
=========================== */}



<div

className="

md:hidden

news-navigation

"

>


<div

className="

news-container

h-12

flex

items-center

justify-between

"

>


<span

className="

text-xs

font-bold

uppercase

tracking-[0.15em]

text-[var(--news-text)]

"

>

Sections

</span>





<button

onClick={()=>setOpen(true)}

className="

flex

items-center

gap-2

text-xs

font-bold

uppercase

tracking-wider

text-[var(--news-orange)]

"

>


<Menu size={16}/>

Menu


</button>



</div>


</div>









{/* ===========================
      MOBILE DRAWER
=========================== */}



<AnimatePresence>


{

open &&

(


<>


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


onClick={()=>setOpen(false)}


className="

fixed

inset-0

bg-black/40

z-[90]

md:hidden

"


/>







<motion.aside


initial={{

x:"100%"

}}


animate={{

x:0

}}


exit={{

x:"100%"

}}


transition={{

type:"spring",

damping:26

}}


className="

fixed

right-0

top-0

h-full

w-[85%]

max-w-sm

bg-[var(--news-cream)]

z-[100]

shadow-2xl

overflow-y-auto

md:hidden

"

>




<div

className="

flex

items-center

justify-between

px-6

py-5

border-b

border-[var(--news-border)]

"

>


<span

className="

font-black

uppercase

tracking-widest

text-sm

"

>

NationPath India

</span>




<button

onClick={()=>setOpen(false)}

aria-label="Close menu"

>


<X size={22}/>


</button>



</div>







<div

className="py-3"

>


<Link

href="/"

className="

block

px-6

py-4

text-lg

font-semibold

border-b

border-black/5

"

>

Home

</Link>







{

categories.map(

(cat:any)=>(


<Link


key={cat.id}

href={`/${cat.slug}`}


className={`

block

px-6

py-4

text-lg

font-semibold

border-b

border-black/5


${

isActive(cat.slug)

?

"text-[var(--news-orange)]"

:

"text-[var(--news-text)]"

}

`

}


>


{cat.name}


</Link>


)


)

}



</div>




</motion.aside>



</>


)


}


</AnimatePresence>





</>


);


}