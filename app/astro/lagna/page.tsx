"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// LAGNA INTELLIGENCE EXPERIENCE
//
// ROUTE:
// /astro/lagna
//
// EXPERIENCE FLOW:
//
// Rising Identity
//        ↓
// Birth Moment Discovery
//        ↓
// Cosmic Reading
//        ↓
// Ascendant Reveal
//        ↓
// Intelligence Chapters
//        ↓
// Premium Manuscript
//
// IMPORTANT:
// UI composition only
// No calculation logic
// No API logic
//////////////////////////////////////////////////////////////

import { useState } from "react";

import LagnaHero from "@/components/astro-new/lagna/hero/LagnaHero";

import BirthMomentForm from "@/components/astro-new/lagna/discovery/BirthMomentForm";
import LagnaCalculating from "@/components/astro-new/lagna/discovery/LagnaCalculating";
import LagnaReveal from "@/components/astro-new/lagna/discovery/LagnaReveal";

import AscendantBlueprint from "@/components/astro-new/lagna/intelligence/AscendantBlueprint";
import PersonalityPattern from "@/components/astro-new/lagna/intelligence/PersonalityPattern";
import LifeApproach from "@/components/astro-new/lagna/intelligence/LifeApproach";
import NaturalStrengths from "@/components/astro-new/lagna/intelligence/NaturalStrengths";
import GrowthGuidance from "@/components/astro-new/lagna/intelligence/GrowthGuidance";

import LagnaPremiumBanner from "@/components/astro-new/lagna/premium/LagnaPremiumBanner";

import { demoLagnaProfile } from "@/components/astro-new/lagna/data/lagnaData";





export default function LagnaPage() {



const [stage,setStage] = useState<
"discovery" | "calculating" | "reveal"
>("discovery");





function handleContinue(){

setStage("calculating");


setTimeout(()=>{

setStage("reveal");

},2500);


}





return (

<main

className="
min-h-screen
bg-[#FFF9E8]
"

>



{/* HERO */}

<LagnaHero />







{/* DISCOVERY JOURNEY */}



{

stage === "discovery" && (

<BirthMomentForm

onContinue={handleContinue}

/>

)

}








{

stage === "calculating" && (

<LagnaCalculating />

)

}








{

stage === "reveal" && (

<LagnaReveal

profile={demoLagnaProfile}

/>

)

}









{/* INTELLIGENCE CHAPTERS */}



{

stage === "reveal" && (

<>


<AscendantBlueprint

profile={demoLagnaProfile}

/>




<PersonalityPattern

profile={demoLagnaProfile}

/>




<LifeApproach

profile={demoLagnaProfile}

/>




<NaturalStrengths

profile={demoLagnaProfile}

/>




<GrowthGuidance

profile={demoLagnaProfile}

/>




<LagnaPremiumBanner />


</>

)

}






</main>

);

}