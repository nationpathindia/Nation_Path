"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// KUNDLI INTELLIGENCE EXPERIENCE
//
// LIFE BLUEPRINT
//
// Cosmic Story Book Journey
//////////////////////////////////////////////////////////////

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  LIFE_CHAPTERS,
} from "./lifeData";

import LifeChapterView from "./LifeChapterView";



export default function LifeBlueprint(){


  const [chapterIndex,setChapterIndex] =
    useState(0);



  const selectedChapter =
    LIFE_CHAPTERS[chapterIndex];



  const nextChapter = () => {

    setChapterIndex((prev)=>
      Math.min(
        prev + 1,
        LIFE_CHAPTERS.length - 1
      )
    );

  };



  const previousChapter = () => {

    setChapterIndex((prev)=>
      Math.max(
        prev - 1,
        0
      )
    );

  };




return (

<section

className="
relative
overflow-hidden
bg-[#FFF9E8]
px-5
py-20
md:px-10
md:py-28
"

>


{/* Atmosphere */}

<div

className="
pointer-events-none
absolute
left-1/2
top-0
h-[450px]
w-[450px]
-translate-x-1/2
rounded-full
bg-[#D4AF37]/10
blur-[150px]
"

/>





<div

className="
relative
mx-auto
max-w-6xl
"

>





{/* Header */}

<div

className="
mb-10
text-center
"

>


<div

className="
mx-auto
flex
h-14
w-14
items-center
justify-center
rounded-full
border
border-[#D4AF37]/40
bg-[#F8F1DE]
text-[#8B5E00]
"

>

<BookOpen size={24}/>

</div>



<p

className="
mt-5
text-xs
uppercase
tracking-[0.45em]
text-[#8B5E00]
"

>
Life Blueprint
</p>




<h2

className="
mt-4
font-serif
text-3xl
text-[#3B2600]
md:text-5xl
"

>

Your Cosmic Story Book

</h2>



<p

className="
mx-auto
mt-4
max-w-xl
text-sm
text-[#5A3908]
"

>

Turn each chapter to discover
different dimensions of your journey.

</p>


</div>









{/* Chapter Counter */}

<div

className="
mb-6
flex
justify-center
"

>

<div

className="
rounded-full
border
border-[#D4AF37]/40
bg-[#F8F1DE]
px-5
py-2
text-xs
uppercase
tracking-[0.3em]
text-[#8B5E00]
"

>

Chapter {selectedChapter.chapter}
{" "}
/
{" "}
{String(LIFE_CHAPTERS.length).padStart(2,"0")}

</div>

</div>









{/* Open Book */}

<motion.div

key={selectedChapter.id}

initial={{
opacity:0,
rotateY:-8,
x:30
}}

animate={{
opacity:1,
rotateY:0,
x:0
}}

transition={{
duration:.5
}}

>

<LifeChapterView

chapter={selectedChapter}

/>

</motion.div>









{/* Navigation */}

<div

className="
mt-8
flex
items-center
justify-between
rounded-[24px]
border
border-[#D4AF37]/30
bg-[#F8F1DE]
p-4
"

>



<button

onClick={previousChapter}

disabled={chapterIndex===0}

className="
flex
items-center
gap-2
rounded-full
px-5
py-3
text-sm
text-[#8B5E00]
transition
hover:bg-[#FFF9E8]
disabled:opacity-30
"

>

<ChevronLeft size={18}/>

Previous

</button>





<div

className="
hidden
items-center
gap-2
text-xs
uppercase
tracking-[0.3em]
text-[#8B5E00]
md:flex
"

>

<Sparkles size={14}/>

Continue Your Story

</div>





<button

onClick={nextChapter}

disabled={
 chapterIndex === LIFE_CHAPTERS.length-1
}

className="
flex
items-center
gap-2
rounded-full
bg-[#D4AF37]
px-5
py-3
text-sm
font-medium
text-[#120C08]
transition
hover:bg-[#8B5E00]
hover:text-white
disabled:opacity-40
"

>

Next Chapter

<ChevronRight size={18}/>

</button>



</div>







{/* Footer */}

<div

className="
mt-8
flex
justify-center
gap-2
text-xs
uppercase
tracking-[0.35em]
text-[#8B5E00]
"

>

<Sparkles size={14}/>

Your personal cosmic manuscript

</div>



</div>


</section>

);

}