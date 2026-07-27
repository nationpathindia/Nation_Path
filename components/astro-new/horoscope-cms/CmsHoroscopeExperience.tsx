"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// PREMIUM HOROSCOPE EXPERIENCE SHELL
//
// CMS FIRST ARCHITECTURE
//
// SINGLE SOURCE OF TRUTH:
// MongoDB CMS
//
// NO ENGINE
// NO CALCULATION
// NO AI GENERATION
//////////////////////////////////////////////////////////////

import type {
  CmsHoroscopeData
} from "./types";


import PanchangHeroBanner from "./PanchangHeroBanner";

import HoroscopeHero from "./HoroscopeHero";
import HoroscopeEditorial from "./HoroscopeEditorial";
import HoroscopeLifeCards from "./HoroscopeLifeCards";
import HoroscopeIntelligencePanel from "./HoroscopeIntelligencePanel";
import HoroscopePlanetary from "./HoroscopePlanetary";
import ZodiacExplorerPanel from "./ZodiacExplorerPanel";
import HoroscopeLucky from "./HoroscopeLucky";
import HoroscopeRemedy from "./HoroscopeRemedy";
import HoroscopePremium from "./HoroscopePremium";




interface Props {

data:CmsHoroscopeData;

currentSign?:string;

}





export default function CmsHoroscopeExperience({

data,

currentSign

}:Props){



return (

<main

className="
relative
min-h-screen
overflow-hidden
bg-[#FFF9E8]
text-[#3B2600]
"

>



{/* =====================================================
    GLOBAL COSMIC ATMOSPHERE
===================================================== */}



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
top-[-250px]
h-[600px]
w-[600px]
-translate-x-1/2
rounded-full
bg-[#D4AF37]/10
blur-[160px]
"

/>



<div

className="
absolute
right-[-180px]
top-[40%]
h-[350px]
w-[350px]
rounded-full
bg-[#8B5E00]/8
blur-[140px]
"

/>



<div

className="
absolute
left-[-120px]
bottom-[10%]
h-[280px]
w-[280px]
rounded-full
bg-[#D4AF37]/8
blur-[120px]
"

/>



</div>








<div

className="
relative
z-10
space-y-6
pb-12
"

>






{/* =====================================================
    DAILY PANCHANG
===================================================== */}


<PanchangHeroBanner />








{/* =====================================================
    ZODIAC IDENTITY HERO
===================================================== */}



{

(data.hero || data.identity) &&

<HoroscopeHero

hero={data.hero}

identity={data.identity}

/>

}









{/* =====================================================
    EDITORIAL COSMIC STORY
===================================================== */}



{

data.editorial &&

<HoroscopeEditorial

editorial={data.editorial}

/>

}









{/* =====================================================
    LIFE BLUEPRINT
===================================================== */}



{

data.life &&

<HoroscopeLifeCards

life={data.life}

/>

}









{/* =====================================================
    COSMIC INTELLIGENCE
===================================================== */}



{

data.insights &&

<HoroscopeIntelligencePanel

insights={data.insights}

/>

}









{/* =====================================================
    PLANETARY INTELLIGENCE
===================================================== */}



{

data.planets &&

data.planets.length > 0 &&

<HoroscopePlanetary

planets={

data.planets.map((planet)=>(

{

name:
planet.name ||
planet.planetKey ||
"Planet",


title:
planet.title,


message:
planet.message,


strength:
planet.strength,

}

))

}

/>

}









{/* =====================================================
    ZODIAC EXPLORER
===================================================== */}

<ZodiacExplorerPanel

zodiac={data.zodiacList || []}

active={currentSign}

/>



{/* =====================================================
    FORTUNE SIGNATURE
===================================================== */}



{

data.lucky &&

<HoroscopeLucky

lucky={data.lucky}

/>

}









{/* =====================================================
    SACRED REMEDY
===================================================== */}



{

data.remedy &&

<HoroscopeRemedy

remedy={data.remedy}

/>

}









{/* =====================================================
    PREMIUM JOURNEY
===================================================== */}



{

data.premium &&

<HoroscopePremium

premium={data.premium}

/>

}









</div>






</main>

);


}