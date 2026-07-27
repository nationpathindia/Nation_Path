"use client";

//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO
//
// HOROSCOPE HOME EXPERIENCE
//
// PREMIUM VEDIC INTELLIGENCE SHELL
//
// PHASE 1
//
// PANCHANG + MUHURTA READY
//
// NO ENGINE
// NO AI
// NO CALCULATION
//
//////////////////////////////////////////////////////////////

import HoroscopeHomeHero from "./HoroscopeHomeHero";
import PanchangLivePanel from "./PanchangLivePanel";
import ZodiacHomeExplorer from "./ZodiacHomeExplorer";
import DailyHoroscopeIntelligence from "./DailyHoroscopeIntelligence";
import PremiumAstrologyCTA from "./PremiumAstrologyCTA";



interface Props {

  panchang?: unknown;

  muhurta?: unknown;

  zodiacList?: unknown[];

}





export default function HoroscopeHomeExperience({

  panchang,

  muhurta,

  zodiacList = [],

}: Props) {


  return (

    <main

      className="
      relative
      overflow-hidden
      bg-[#FFF9E8]
      "

    >





      {/* 
      ==================================================
      1. PANCHANG LIVE INTELLIGENCE
      ==================================================
      */}


      <PanchangLivePanel

        panchang={panchang}

      />









      {/* 
      ==================================================
      2. HOROSCOPE HERO EXPERIENCE
      ==================================================
      */}


      <HoroscopeHomeHero

        zodiac="Mesha Rashi"

        image="/zodiac/aries.png"

        energy={82}

        theme="Mars Energy Activated"

        highlights={[

          "Courage",

          "Growth",

          "Leadership"

        ]}

      />









      {/* 
      ==================================================
      3. DAILY VEDIC INTELLIGENCE
      ==================================================
      
      Live Panchang + Muhurta
      
      */}


      <DailyHoroscopeIntelligence

        panchang={panchang}

        muhurta={muhurta}

      />









      {/* 
      ==================================================
      4. PREMIUM ASTROLOGY CTA
      ==================================================
      
      Premium Journey Entry
      
      */}


      <PremiumAstrologyCTA />









      {/* 
      ==================================================
      5. ZODIAC EXPLORER
      ==================================================
      
      CMS Zodiac Discovery
      
      */}


      <ZodiacHomeExplorer

        zodiacList={zodiacList}

      />









      {/* 
      ==================================================
      FUTURE MODULES
      ==================================================
      
      Life Intelligence
      
      Planetary Influence
      
      Vedic Remedy
      
      Premium Reports
      
      */}





    </main>

  );

}