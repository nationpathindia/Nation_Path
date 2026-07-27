//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO YOGA ENGINE
// Future Proof Type System
//////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////
// YOGA CATEGORY
//////////////////////////////////////////////////////////////

export type YogaCategory =

  | "Raj Yoga"

  | "Dhana Yoga"

  | "Gajakesari Yoga"

  | "Neecha Bhanga Yoga"

  | "Vipreet Raj Yoga"

  | "Other";





//////////////////////////////////////////////////////////////
// YOGA STRENGTH
//////////////////////////////////////////////////////////////

export type YogaStrength =

  | "Very Strong"

  | "Strong"

  | "Moderate"

  | "Weak"

  | "Inactive";





//////////////////////////////////////////////////////////////
// PLANET CONNECTION
//////////////////////////////////////////////////////////////

export interface YogaPlanetConnection {


  planet:string;


  role?:

    | "lord"

    | "karaka"

    | "participant"

    | "aspect";



  house?:number;



  rashi?:string;



  strength?:number;


}





//////////////////////////////////////////////////////////////
// COMPLETE YOGA RESULT
//////////////////////////////////////////////////////////////

export interface YogaResult {


  id:string;



  name:string;



  category:YogaCategory;



  active:boolean;



  strength:number;



  status:YogaStrength;



  planets:string[];



  connections?:YogaPlanetConnection[];



  description:string;



  keywords:string[];



  effects?:{


    career?:string[];


    finance?:string[];


    marriage?:string[];


    health?:string[];


    spirituality?:string[];


  };



  source?:{


    chart:

      | "D1"

      | "D9"

      | "D1+D9";



    rule:string;


  };


}





//////////////////////////////////////////////////////////////
// YOGA ENGINE OUTPUT
//////////////////////////////////////////////////////////////

export interface YogaAnalysis {


  total:number;



  activeYogas:YogaResult[];



  inactiveYogas?:YogaResult[];



  strongestYoga?:YogaResult;



  summary?:string;


}