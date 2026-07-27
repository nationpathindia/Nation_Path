//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
// Horoscope Interpretation Type System
//////////////////////////////////////////////////////////////

import type {
  HoroscopeLanguage,
} from "../types";

export type {
  HoroscopeLanguage,
} from "../types";

//////////////////////////////////////////////////////////////
// INTERPRETATION CATEGORY
//////////////////////////////////////////////////////////////

export type InterpretationCategory =
  | "personality"
  | "career"
  | "finance"
  | "relationship"
  | "health"
  | "spirituality"
  | "mind"
  | "overall";



//////////////////////////////////////////////////////////////
// INTERPRETATION MESSAGE
//////////////////////////////////////////////////////////////

export interface InterpretationMessage {


  category:
    InterpretationCategory;



  title:
    string;



  summary:
    string;



  keywords:
    string[];



  priority:
    number;



}



//////////////////////////////////////////////////////////////
// PLANET INTERPRETATION
//////////////////////////////////////////////////////////////

export interface PlanetInterpretation {


  planet:
    string;



  influence:
    string;



  positive:
    string[];



  challenges:
    string[];



}



//////////////////////////////////////////////////////////////
// LIFE AREA INTERPRETATION
//////////////////////////////////////////////////////////////

export interface LifeAreaInterpretation {


  area:
    InterpretationCategory;



  strength:
    number;



  messages:
    InterpretationMessage[];



}



//////////////////////////////////////////////////////////////
// FINAL HOROSCOPE INTERPRETATION
//////////////////////////////////////////////////////////////

export interface HoroscopeInterpretation {


  language:
    HoroscopeLanguage;



  headline:
    string;



  overview:
    string;



  dominantThemes:
    string[];



  planetaryInsights:
    PlanetInterpretation[];



  lifeAreas:
    LifeAreaInterpretation[];



  positiveIndicators:
    string[];



  challenges:
    string[];



  recommendations:
    string[];



}