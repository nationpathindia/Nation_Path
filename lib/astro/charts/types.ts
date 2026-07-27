//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO DIVISIONAL CHART TYPES
//////////////////////////////////////////////////////////////


export interface D9Planet {


  planet:string;


  d1:{

    rashi:string;

    longitude:number;

  };



  d9:{

    rashi:string;

  };



  analysis:{

    dignity:string;


    strength:number;


    keywords:string[];

  };


}





export interface NavamsaChart {


  type:"D9";


  planets:D9Planet[];


}