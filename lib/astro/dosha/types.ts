//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO DOSHA ENGINE TYPES
// Future Proof Dosha Intelligence System
//////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////
// DOSHA CATEGORIES
//////////////////////////////////////////////////////////////

export type DoshaCategory =

  | "Manglik"

  | "Kaal Sarp"

  | "Grahan"

  | "Pitra"

  | "Nadi"

  | "Bhakoot"

  | "Gana"

  | "Shani"

  | "Guru"

  | "Transit"

  | "Other";





//////////////////////////////////////////////////////////////
// CHART SOURCE
//////////////////////////////////////////////////////////////

export type DoshaSource =


  | "D1"

  | "D9"

  | "Moon Chart"

  | "Transit"

  | "Combined";







//////////////////////////////////////////////////////////////
// DOSHA STATUS
//////////////////////////////////////////////////////////////

export type DoshaStatus =


  | "Strong"

  | "Moderate"

  | "Mild"

  | "Cancelled"

  | "Inactive";








//////////////////////////////////////////////////////////////
// DOSHA SEVERITY
//////////////////////////////////////////////////////////////

export type DoshaSeverity =


  | "High"

  | "Medium"

  | "Low";







//////////////////////////////////////////////////////////////
// DOSHA PLANET IMPACT
//////////////////////////////////////////////////////////////

export interface DoshaPlanetImpact {


  planet:string;



  role?:string;



  house?:number;



  rashi?:string;



  effect?:string;


}







//////////////////////////////////////////////////////////////
// DOSHA RESULT
//////////////////////////////////////////////////////////////

export interface DoshaResult {


  id:string;



  name:string;



  category:

    DoshaCategory;



  active:boolean;



  severity:

    DoshaSeverity;



  strength:number;



  status:

    DoshaStatus;



  planets:string[];



  planetDetails?:

    DoshaPlanetImpact[];





  description:string;



  keywords:string[];





  effects?:{


    marriage?:string[];


    career?:string[];


    finance?:string[];


    health?:string[];


    family?:string[];


    spirituality?:string[];


  };





  cancellation?:{


    exists:boolean;


    reasons:string[];



  };





  remedies?:{


    traditional?:string[];


    practical?:string[];


  };





  timing?:{


    activePeriod?:string;


    trigger?:string;


  };





  source:{


    chart:

      DoshaSource;



    rule:string;



    references?:string[];

  };


}








//////////////////////////////////////////////////////////////
// DOSHA ANALYSIS RESULT
//////////////////////////////////////////////////////////////

export interface DoshaAnalysis {


  total:number;



  activeCount:number;



  inactiveCount:number;





  doshas:

    DoshaResult[];





  activeDoshas:

    DoshaResult[];





  inactiveDoshas:

    DoshaResult[];





  strongestDosha?:

    DoshaResult;





  overallStatus:

    | "Clear"

    | "Minor"

    | "Moderate"

    | "Significant";





  summary:string;


}








//////////////////////////////////////////////////////////////
// DOSHA ENGINE CONFIG
//////////////////////////////////////////////////////////////

export interface DoshaEngineConfig {


  includeManglik?:boolean;



  includeKaalSarp?:boolean;



  includeGrahan?:boolean;



  includePitra?:boolean;



  includeAdvanced?:boolean;


}








//////////////////////////////////////////////////////////////
// DOSHA REPORT FORMAT
//////////////////////////////////////////////////////////////

export interface DoshaReport {


  generatedAt:Date;



  version:string;



  analysis:

    DoshaAnalysis;



  language?:string;


}