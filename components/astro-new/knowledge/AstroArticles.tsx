"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO KNOWLEDGE HUB
//
// Premium Astrology Learning Section
//
// Future:
// Connect Astro CMS / Article API
//////////////////////////////////////////////////////////////

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Sparkles,
} from "lucide-react";





interface AstroArticle {

title:string;

category:string;

description:string;

}





const ARTICLES:AstroArticle[] = [


{

title:
"Understanding Your Vedic Birth Chart",

category:
"Kundli Guide",

description:
"Learn how planets, houses and zodiac signs create your personal cosmic blueprint."

},



{

title:
"The Power of Nakshatras",

category:
"Nakshatra",

description:
"Explore the ancient lunar constellations and their influence on personality and life patterns."

},



{

title:
"Planetary Intelligence in Vedic Astrology",

category:
"Planet Wisdom",

description:
"Understand how Sun, Moon and other planets influence different areas of life."

},



{

title:
"What is Panchang and Why It Matters?",

category:
"Vedic Calendar",

description:
"Discover tithi, yoga, karana and the science behind auspicious timings."

},


];








export default function AstroArticles(){



return (

<section

className="
relative
overflow-hidden
bg-[#FFF9E8]
px-5
py-20
sm:px-8
lg:px-16
"

>



<div

className="
pointer-events-none
absolute
right-0
top-20
h-96
w-96
rounded-full
bg-[#D4AF37]/10
blur-[110px]
"

/>







<div

className="
relative
mx-auto
max-w-6xl
"

>








{/* HEADER */}



<div

className="
mb-12
"

>



<p

className="
flex
items-center
gap-2
text-xs
font-bold
uppercase
tracking-[0.4em]
text-[#8B5E00]
"

>


<Sparkles size={14}/>

Astro Knowledge


</p>





<h2

className="
mt-4
font-serif
text-3xl
font-bold
text-[#3B2600]
sm:text-4xl
"

>

Explore Ancient Wisdom

</h2>





<p

className="
mt-5
max-w-xl
text-sm
leading-relaxed
text-[#6B4A16]
sm:text-base
"

>

Learn Vedic astrology concepts,
planetary intelligence and cosmic principles
with NationPath Astro.

</p>



</div>









{/* FEATURE GUIDE */}



<div

className="
group
relative
mb-10
overflow-hidden
rounded-[2rem]
border
border-[#D4AF37]/50
bg-gradient-to-br
from-[#F8F1DE]
to-[#FFF9E8]
p-7
transition
hover:shadow-[0_25px_60px_rgba(139,94,0,0.15)]
sm:p-10
"

>



<div

className="
pointer-events-none
absolute
right-0
top-0
h-52
w-52
rounded-full
bg-[#D4AF37]/10
blur-3xl
"

/>





<div

className="
relative
flex
items-center
gap-4
"

>



<div

className="
flex
h-12
w-12
items-center
justify-center
rounded-full
border
border-[#D4AF37]/50
bg-[#FFF9E8]
"

>


<BookOpen

size={22}

className="text-[#8B5E00]"

/>


</div>







<div>


<p

className="
text-[10px]
font-bold
uppercase
tracking-[0.35em]
text-[#8B5E00]
"

>

Featured Guide

</p>



<h3

className="
mt-2
font-serif
text-xl
font-bold
text-[#3B2600]
sm:text-2xl
"

>

The Complete Guide To Vedic Astrology

</h3>


</div>



</div>







<p

className="
relative
mt-5
max-w-2xl
text-sm
leading-relaxed
text-[#6B4A16]
"

>

Understand your birth chart,
planetary positions, houses and
the foundation of Vedic astrology.

</p>







<Link

href="/astro/knowledge"

className="
relative
mt-6
inline-flex
items-center
gap-2
rounded-full
border
border-[#D4AF37]/50
px-5
py-2.5
text-xs
font-bold
uppercase
tracking-widest
text-[#8B5E00]
transition
hover:bg-[#120C08]
hover:text-[#FFF9E8]
"

>

Read Guide

<ArrowRight size={14}/>


</Link>





</div>









{/* ARTICLE GRID */}



<div

className="
grid
gap-6
sm:grid-cols-2
lg:grid-cols-4
"

>



{

ARTICLES.map((article)=>(



<Link

key={article.title}

href="/astro/knowledge"

className="
group
relative
overflow-hidden
rounded-3xl
border
border-[#D4AF37]/30
bg-[#FFF9E8]
p-5
transition
duration-300
hover:-translate-y-2
hover:border-[#D4AF37]
hover:shadow-[0_20px_45px_rgba(139,94,0,0.15)]
"

>


<div

className="
absolute
right-0
top-0
h-24
w-24
rounded-full
bg-[#D4AF37]/10
blur-2xl
opacity-0
transition
group-hover:opacity-100
"

/>





<p

className="
relative
text-[10px]
font-bold
uppercase
tracking-[0.3em]
text-[#8B5E00]
"

>

{article.category}

</p>





<h3

className="
relative
mt-4
font-serif
text-lg
font-bold
text-[#3B2600]
"

>

{article.title}

</h3>





<p

className="
relative
mt-3
text-sm
leading-relaxed
text-[#6B4A16]
"

>

{article.description}

</p>







<div

className="
relative
mt-6
flex
items-center
gap-2
text-xs
font-bold
uppercase
tracking-widest
text-[#8B5E00]
"

>


Explore

<ArrowRight

size={14}

className="
transition
group-hover:translate-x-1
"

/>


</div>





</Link>



))


}



</div>







</div>



</section>


);


}