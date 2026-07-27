//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO FOOTER
//
// Responsibility:
// Public Astro product footer
//////////////////////////////////////////////////////////////

import Image from "next/image";
import Link from "next/link";



const EXPLORE_LINKS = [

{
name:"Daily Horoscope",
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

];




const RESOURCE_LINKS = [

{
name:"Zodiac Signs",
href:"/astro/zodiac",
},

{
name:"Astrology Knowledge",
href:"/astro/knowledge",
},

{
name:"Premium Reports",
href:"/pricing",
},

];






export default function AstroFooter(){


return (


<footer

className="
border-t
border-[#D4AF37]/30
bg-[#120C08]
text-[#FFF4D6]
"

>


<div

className="
mx-auto
max-w-7xl
px-5
py-14
sm:px-8
"

>


<div

className="
grid
gap-12
sm:grid-cols-2
lg:grid-cols-4
"

>





{/* BRAND */}


<div>


<div

className="
flex
items-center
gap-3
"

>


<Image

src="/idlogo.png"

alt="NationPath Astro"

width={52}

height={52}

className="
rounded-full
object-contain
"

/>



<div>


<p

className="
text-lg
font-bold
"

>

NationPath

</p>


<p

className="
text-[10px]
tracking-[0.3em]
font-bold
text-[#D4AF37]
"

>

ASTRO INTELLIGENCE

</p>


</div>


</div>




<p

className="
mt-5
text-sm
leading-relaxed
text-[#C8A96A]
"

>

Ancient Vedic wisdom combined with
modern astrology intelligence.
Explore horoscope, Panchang and
personal cosmic insights.

</p>


</div>







{/* EXPLORE */}


<div>


<h3

className="
font-bold
text-[#D4AF37]
"

>

Explore

</h3>



<ul

className="
mt-5
space-y-3
"

>


{

EXPLORE_LINKS.map((item)=>(


<li key={item.href}>


<Link

href={item.href}

className="
text-sm
text-[#C8A96A]
hover:text-[#FFF4D6]
transition
"

>

{item.name}

</Link>


</li>


))

}


</ul>


</div>







{/* RESOURCES */}


<div>


<h3

className="
font-bold
text-[#D4AF37]
"

>

Resources

</h3>




<ul

className="
mt-5
space-y-3
"

>


{

RESOURCE_LINKS.map((item)=>(


<li key={item.href}>


<Link

href={item.href}

className="
text-sm
text-[#C8A96A]
hover:text-[#FFF4D6]
transition
"

>

{item.name}

</Link>


</li>


))

}


</ul>


</div>








{/* PREMIUM CARD */}


<div

className="
rounded-2xl
border
border-[#D4AF37]/40
bg-[#1B120C]
p-5
"

>


<h3

className="
font-bold
text-[#D4AF37]
"

>

Premium Astro

</h3>




<p

className="
mt-4
text-sm
leading-relaxed
text-[#C8A96A]
"

>

Unlock advanced birth chart analysis,
career insights, relationship guidance
and personalised astrology reports.

</p>





<Link

href="/pricing"

className="
inline-flex
mt-5
rounded-full
bg-[#D4AF37]
px-6
py-3
text-sm
font-bold
text-[#120C08]
hover:bg-[#E6C85C]
transition
"

>

Unlock Intelligence

</Link>


</div>





</div>








{/* BOTTOM */}


<div

className="
mt-12
border-t
border-[#D4AF37]/20
pt-6
flex
flex-col
gap-4
sm:flex-row
sm:items-center
sm:justify-between
text-xs
text-[#8F7448]
"

>


<p>

© {new Date().getFullYear()} NationPath Astro Intelligence | NationPath India | Crafted by TitanArtStudio,India 

</p>



<div

className="
flex
gap-6
"

>


<Link

href="/privacy"

className="hover:text-[#D4AF37]"
>

Privacy

</Link>


<Link

href="/terms"

className="hover:text-[#D4AF37]"
>

Terms

</Link>


</div>


</div>



</div>


</footer>


);


}