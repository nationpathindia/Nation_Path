"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO NAKSHATRA PAGE
//
// Premium Vedic Lunar Intelligence Experience
//
// Route:
// /astro/nakshatra
//
// Flow:
//
// Hero
// Finder
// Explorer
// Identity
// Traits
// Planet Intelligence
// Life Areas
// Remedies
// Premium
//
// Future:
// Astro Engine API Integration
//////////////////////////////////////////////////////////////

import NakshatraHero from "@/components/astro-new/nakshatra/NakshatraHero";
import NakshatraFinder from "@/components/astro-new/nakshatra/NakshatraFinder";
import NakshatraExplorer from "@/components/astro-new/nakshatra/NakshatraExplorer";
import NakshatraTraits from "@/components/astro-new/nakshatra/NakshatraTraits";
import NakshatraPlanetInfluence from "@/components/astro-new/nakshatra/NakshatraPlanetInfluence";
import NakshatraLifeAreas from "@/components/astro-new/nakshatra/NakshatraLifeAreas";
import NakshatraRemedy from "@/components/astro-new/nakshatra/NakshatraRemedy";
import NakshatraPremiumBanner from "@/components/astro-new/nakshatra/NakshatraPremiumBanner";



export default function NakshatraPage(){


return (

<main

aria-label="
NationPath Astro Nakshatra Intelligence
"

className="
relative
min-h-screen
overflow-hidden
scroll-smooth
bg-[#FFF9E8]
text-[#3B2600]
selection:bg-[#D4AF37]/30
"

>


{/* AMBIENT COSMIC ENERGY */}

<div

className="
pointer-events-none
absolute
inset-0
overflow-hidden
"

>


<div

className="
absolute
left-1/2
top-[-180px]
h-[560px]
w-[560px]
-translate-x-1/2
rounded-full
bg-[#D4AF37]/10
blur-[150px]
"

/>



<div

className="
absolute
right-[-160px]
top-[1400px]
h-[420px]
w-[420px]
rounded-full
bg-[#8B5E00]/5
blur-[140px]
"

/>



</div>





<div
className="
relative
z-10
"
>



{/* INTRODUCTION */}

<NakshatraHero />



{/* PERSONAL DISCOVERY */}

<NakshatraFinder />



{/* STAR ARCHIVE */}

<NakshatraExplorer />



{/* PERSONALITY */}

<NakshatraTraits />



{/* PLANETARY WISDOM */}

<NakshatraPlanetInfluence />



{/* LIFE APPLICATION */}

<NakshatraLifeAreas />



{/* SACRED GUIDANCE */}

<NakshatraRemedy />



{/* PREMIUM REPORT */}

<NakshatraPremiumBanner />


</div>


</main>

);

}