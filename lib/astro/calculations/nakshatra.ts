//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO NAKSHATRA ENGINE
// 27 Nakshatra + Pada Calculation
//////////////////////////////////////////////////////////////


export interface NakshatraInfo {

  index:number;

  name:string;

  lord:string;

  startDegree:number;

  endDegree:number;

}



export interface NakshatraResult {

  index:number;

  name:string;

  lord:string;

  pada:number;

  degree:number;

}



const NAKSHATRAS: NakshatraInfo[] = [

  {
    index:0,
    name:"Ashwini",
    lord:"Ketu",
    startDegree:0,
    endDegree:13.333333
  },

  {
    index:1,
    name:"Bharani",
    lord:"Venus",
    startDegree:13.333333,
    endDegree:26.666666
  },

  {
    index:2,
    name:"Krittika",
    lord:"Sun",
    startDegree:26.666666,
    endDegree:40
  },

  {
    index:3,
    name:"Rohini",
    lord:"Moon",
    startDegree:40,
    endDegree:53.333333
  },

  {
    index:4,
    name:"Mrigashira",
    lord:"Mars",
    startDegree:53.333333,
    endDegree:66.666666
  },

  {
    index:5,
    name:"Ardra",
    lord:"Rahu",
    startDegree:66.666666,
    endDegree:80
  },

  {
    index:6,
    name:"Punarvasu",
    lord:"Jupiter",
    startDegree:80,
    endDegree:93.333333
  },

  {
    index:7,
    name:"Pushya",
    lord:"Saturn",
    startDegree:93.333333,
    endDegree:106.666666
  },

  {
    index:8,
    name:"Ashlesha",
    lord:"Mercury",
    startDegree:106.666666,
    endDegree:120
  },

  {
    index:9,
    name:"Magha",
    lord:"Ketu",
    startDegree:120,
    endDegree:133.333333
  },

  {
    index:10,
    name:"Purva Phalguni",
    lord:"Venus",
    startDegree:133.333333,
    endDegree:146.666666
  },

  {
    index:11,
    name:"Uttara Phalguni",
    lord:"Sun",
    startDegree:146.666666,
    endDegree:160
  },

  {
    index:12,
    name:"Hasta",
    lord:"Moon",
    startDegree:160,
    endDegree:173.333333
  },

  {
    index:13,
    name:"Chitra",
    lord:"Mars",
    startDegree:173.333333,
    endDegree:186.666666
  },

  {
    index:14,
    name:"Swati",
    lord:"Rahu",
    startDegree:186.666666,
    endDegree:200
  },

  {
    index:15,
    name:"Vishakha",
    lord:"Jupiter",
    startDegree:200,
    endDegree:213.333333
  },

  {
    index:16,
    name:"Anuradha",
    lord:"Saturn",
    startDegree:213.333333,
    endDegree:226.666666
  },

  {
    index:17,
    name:"Jyeshtha",
    lord:"Mercury",
    startDegree:226.666666,
    endDegree:240
  },

  {
    index:18,
    name:"Mula",
    lord:"Ketu",
    startDegree:240,
    endDegree:253.333333
  },

  {
    index:19,
    name:"Purva Ashadha",
    lord:"Venus",
    startDegree:253.333333,
    endDegree:266.666666
  },

  {
    index:20,
    name:"Uttara Ashadha",
    lord:"Sun",
    startDegree:266.666666,
    endDegree:280
  },

  {
    index:21,
    name:"Shravana",
    lord:"Moon",
    startDegree:280,
    endDegree:293.333333
  },

  {
    index:22,
    name:"Dhanishta",
    lord:"Mars",
    startDegree:293.333333,
    endDegree:306.666666
  },

  {
    index:23,
    name:"Shatabhisha",
    lord:"Rahu",
    startDegree:306.666666,
    endDegree:320
  },

  {
    index:24,
    name:"Purva Bhadrapada",
    lord:"Jupiter",
    startDegree:320,
    endDegree:333.333333
  },

  {
    index:25,
    name:"Uttara Bhadrapada",
    lord:"Saturn",
    startDegree:333.333333,
    endDegree:346.666666
  },

  {
    index:26,
    name:"Revati",
    lord:"Mercury",
    startDegree:346.666666,
    endDegree:360
  }

];



export function getNakshatra(
  longitude:number
):NakshatraResult {


  const degree =
    ((longitude % 360)+360)%360;


  const nakshatra =

    NAKSHATRAS.find(

      item =>
        degree >= item.startDegree &&
        degree < item.endDegree

    );


  if(!nakshatra){

    throw new Error(
      "Nakshatra calculation failed"
    );

  }



  const nakshatraSize =
    13.333333;


  const padaSize =
    nakshatraSize / 4;



  const position =

    degree - nakshatra.startDegree;



  const pada =

    Math.floor(
      position / padaSize
    ) + 1;



  return {

    index:
      nakshatra.index,


    name:
      nakshatra.name,


    lord:
      nakshatra.lord,


    pada,


    degree,

  };

}