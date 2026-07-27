"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// KUNDLI INTELLIGENCE EXPERIENCE
//
// LIFE CHAPTER CARD
//
// Royal Cosmic Book Chapter
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import {
  BookOpen,
  Sparkles,
} from "lucide-react";

import type { LifeChapter } from "./lifeData";


interface Props {
  chapter: LifeChapter;
  active?: boolean;
  onSelect?: () => void;
}



export default function LifeChapterCard({
  chapter,
  active=false,
  onSelect,
}:Props){


return (

<motion.button

  onClick={onSelect}

  whileHover={{
    y:-8,
    rotateY:3,
  }}

  whileTap={{
    scale:.98
  }}

  transition={{
    duration:.3
  }}

  className={`
    group
    relative
    w-full
    overflow-hidden
    rounded-[28px]
    border
    p-6
    text-left
    perspective-1000
    transition

    ${
      active
      ?
      "border-[#D4AF37] bg-[#1B120A]"
      :
      "border-[#D4AF37]/35 bg-[#F8F1DE]"
    }

  `}

>


{/* Chapter Watermark */}

<div

className="
pointer-events-none
absolute
right-4
top-2
font-serif
text-7xl
text-[#D4AF37]/10
"

>
{chapter.chapter}
</div>





{/* Seal */}

<div

className={`
flex
h-12
w-12
items-center
justify-center
rounded-full
border
transition

${
active
?
"border-[#D4AF37] text-[#D4AF37]"
:
"border-[#D4AF37]/50 text-[#8B5E00]"
}

`}

>

<BookOpen size={22}/>

</div>







{/* Content */}

<p

className={`
mt-6
text-xs
uppercase
tracking-[0.35em]

${
active
?
"text-[#D4AF37]"
:
"text-[#8B5E00]"
}

`}

>
Chapter {chapter.chapter}
</p>





<h3

className={`
mt-2
font-serif
text-2xl

${
active
?
"text-[#F8F1DE]"
:
"text-[#3B2600]"
}

`}

>

{chapter.title}

</h3>




<p

className={`
mt-1
text-sm

${
active
?
"text-[#C9B58A]"
:
"text-[#6B4A16]"
}

`}

>

{chapter.subtitle}

</p>






{/* Themes */}

<div

className="
mt-5
border-t
border-[#D4AF37]/25
pt-4
"

>


<div

className="
flex
items-center
gap-2
text-xs
uppercase
tracking-wider
text-[#8B5E00]
"

>

<Sparkles size={12}/>

Themes

</div>



<p

className={`
mt-2
text-sm

${
active
?
"text-[#F8F1DE]"
:
"text-[#5A3908]"
}

`}

>

{chapter.theme.join(" • ")}

</p>



</div>





{/* Bottom Line */}

<div

className="
mt-5
h-px
w-12
bg-[#D4AF37]
transition-all
group-hover:w-24
"

/>



</motion.button>

);

}