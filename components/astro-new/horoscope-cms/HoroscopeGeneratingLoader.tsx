"use client";

//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO
//
// HOROSCOPE GENERATION LOADER
//
// Purpose:
//
// Visitor Waiting Experience
//
// CMS Missing
//        ↓
// Automation Running
//        ↓
// Show Premium Loading State
//
// NO:
// - Generation Logic
// - API Calls
// - CMS Mutation
//
//////////////////////////////////////////////////////////////


interface Props {

  sign?:string;

}




export default function HoroscopeGeneratingLoader({

  sign

}:Props){



const zodiacName =

sign

?

sign.charAt(0).toUpperCase()

+

sign.slice(1)

:

"Your";





return (


<main

className="
relative
min-h-screen
overflow-hidden
bg-[#050816]
flex
items-center
justify-center
px-6
"

>


{/* COSMIC BACKGROUND */}


<div

className="
pointer-events-none
absolute
inset-0
"

>


<div

className="
absolute
left-1/2
top-[-180px]
h-[420px]
w-[420px]
-translate-x-1/2
rounded-full
bg-[#D4AF37]/20
blur-[120px]
"

/>



<div

className="
absolute
right-[-120px]
bottom-[-100px]
h-[300px]
w-[300px]
rounded-full
bg-[#8B5E00]/20
blur-[100px]
"

/>



</div>







{/* LOADING CARD */}


<div

className="
relative
z-10
max-w-lg
w-full
rounded-3xl
border
border-[#D4AF37]/30
bg-white/5
backdrop-blur-xl
p-10
text-center
text-white
shadow-2xl
"

>





{/* COSMIC ICON */}


<div

className="
mx-auto
mb-8
flex
h-20
w-20
items-center
justify-center
rounded-full
border
border-[#D4AF37]/40
bg-[#D4AF37]/10
"

>


<span

className="
text-4xl
animate-pulse
"

>

🌌

</span>


</div>








<h1

className="
text-3xl
font-serif
tracking-wide
"

>

Preparing Today's Horoscope

</h1>






<p

className="
mt-4
text-[#D4AF37]
uppercase
tracking-[0.25em]
text-sm
"

>

{zodiacName} Daily Guidance

</p>








<p

className="
mt-6
leading-relaxed
text-gray-300
"

>

NationPath Astro is aligning today's horoscope experience.

Your personalized cosmic guidance is being prepared.

</p>









{/* PROGRESS */}


<div

className="
mt-8
space-y-3
"

>


<div

className="
h-2
overflow-hidden
rounded-full
bg-white/10
"

>


<div

className="
h-full
w-2/3
rounded-full
bg-[#D4AF37]
animate-pulse
"

/>


</div>




<p

className="
text-xs
text-gray-400
"

>

Please wait while today's horoscope is published.

</p>



</div>







</div>





</main>


);


}

