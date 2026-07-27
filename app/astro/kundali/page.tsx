//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// KUNDLI INTELLIGENCE EXPERIENCE
//
// Production Safe Route
//
// Responsibility:
// Render Kundli experience sections
//
// Does NOT:
// - calculate astrology
// - run Swiss Ephemeris
// - render unfinished visualization engine
//////////////////////////////////////////////////////////////

import KundliHero from "@/components/astro-new/kundli/hero/KundliHero";

import KundliBirthForm from "@/components/astro-new/kundli/birth/KundliBirthForm";

import PlanetIntelligence from "@/components/astro-new/kundli/intelligence/PlanetIntelligence";

import HouseIntelligence from "@/components/astro-new/kundli/intelligence/HouseIntelligence";

import LifeBlueprint from "@/components/astro-new/kundli/life/LifeBlueprint";

import DashaTimeline from "@/components/astro-new/kundli/timing/DashaTimeline";

import KundliPremiumBanner from "@/components/astro-new/kundli/premium/KundliPremiumBanner";





export const metadata = {

  title:
    "Kundli Intelligence | NationPath Astro",

  description:
    "Discover your personal cosmic blueprint with planetary intelligence, life patterns and Vedic insights.",

};







function KundliViewerPlaceholder(){


return (

<section

className="
mx-auto
my-10
max-w-7xl
rounded-3xl
border
border-[#D4AF37]/20
bg-white/70
p-10
text-center
shadow-xl
"

>


<p

className="
text-sm
uppercase
tracking-[0.3em]
text-[#D4AF37]
"

>

Ancient Vedic Chart Room

</p>



<h2

className="
mt-4
text-2xl
font-bold
text-[#3B1F1F]
"

>

Kundli Visualization Coming Soon

</h2>



<p

className="
mx-auto
mt-3
max-w-xl
text-gray-600
"

>

The premium chart renderer is being connected with
the NationPath Astro visualization engine.

</p>


</section>

);


}









export default function KundliPage(){



return (

<main

className="
min-h-screen
bg-[#FFF9E8]
"

>


{/* 01 — PERSONAL COSMIC INTRODUCTION */}

<KundliHero />






{/* 02 — BIRTH BLUEPRINT CREATION */}

<KundliBirthForm />






{/* 03 — ANCIENT VEDIC CHART ROOM */}

<KundliViewerPlaceholder />






{/* 04 — PLANETARY INTELLIGENCE */}

<PlanetIntelligence />






{/* 05 — HOUSE INTELLIGENCE */}

<HouseIntelligence />






{/* 06 — LIFE COSMIC STORY BOOK */}

<LifeBlueprint />






{/* 07 — COSMIC CLOCK */}

<DashaTimeline />






{/* 08 — PREMIUM EXPERIENCE */}

<KundliPremiumBanner />



</main>

);


}