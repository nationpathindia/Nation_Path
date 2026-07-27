//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO ENGINE
// Marriage Analysis - Intelligent Weighted Score Engine Phase-5
//
// Architecture:
// Positive Marriage Strength
// +
// Negative Marriage Risk
// =
// Final Marriage Score
//////////////////////////////////////////////////////////////

import type {
  MarriageScore,
  MarriageGrade,
} from "./types";


import {
  clampScore,
} from "./helpers";



//////////////////////////////////////////////////////////////
// INPUT
//////////////////////////////////////////////////////////////

export interface MarriageScoreInput {


  // Positive Strength Factors

  seventhHouse?: number;

  seventhLord?: number;

  venus?: number;

  jupiter?: number;

  saturn?: number;

  mars?: number;

  navamsa?: number;



  // Future compatibility

  rahuKetu?: number;



  // Negative Risk Factors

  delayRisk?: number;

  separationRisk?: number;

  conflictRisk?: number;



  // Backward compatibility
  // existing marriage.ts support

  saturnDelay?: boolean;

  marsConflict?: boolean;



  confidence?: number;



  // Legacy support

  factors?: number[];

}





interface WeightedFactor {


  name:string;


  score:number;


  weight:number;


}







//////////////////////////////////////////////////////////////
// MAIN SCORE ENGINE
//////////////////////////////////////////////////////////////

export function calculateMarriageScore(

 input:MarriageScoreInput

):MarriageScore & {

 strengthScore:number;

 riskScore:number;

} {



//////////////////////////////////////////////////////////////
// LEGACY SUPPORT
//////////////////////////////////////////////////////////////

if(

 input.factors &&

 input.factors.length

){


 const score =

 calculateAverageScore(

 input.factors

 );


 return {

 ...score,

 strengthScore:score.score,

 riskScore:0,

 };


}






//////////////////////////////////////////////////////////////
// STRENGTH CALCULATION
//////////////////////////////////////////////////////////////

const strengthScore =

calculateMarriageStrength(

 input

 );





//////////////////////////////////////////////////////////////
// RISK CALCULATION
//////////////////////////////////////////////////////////////

const riskScore =

calculateMarriageRisk(

 input

 );







//////////////////////////////////////////////////////////////
// FINAL INTELLIGENCE SCORE
//////////////////////////////////////////////////////////////

let score =

strengthScore -

(

 riskScore *

 0.35

);







//////////////////////////////////////////////////////////////
// CONFIDENCE ADJUSTMENT
//////////////////////////////////////////////////////////////

if(

 input.confidence !== undefined

){


const confidence =

Math.max(

0,

Math.min(

input.confidence,

100

)

);



score =

(

score *

confidence /

100

)

+

(

50 *

(

1 -

confidence /

100

)

)

;


}







const finalScore =

clampScore(

Math.round(score)

);





return {


score:

finalScore,


grade:

getMarriageGrade(

finalScore

),



strengthScore,


riskScore,


};


}








//////////////////////////////////////////////////////////////
// POSITIVE MARRIAGE STRENGTH ENGINE
//////////////////////////////////////////////////////////////

function calculateMarriageStrength(

input:MarriageScoreInput

):number {



const factors:WeightedFactor[]=[


{

name:"7th House",

score:

input.seventhHouse ?? 50,

weight:25,

},



{

name:"7th Lord",

score:

input.seventhLord ?? 50,

weight:20,

},



{

name:"Venus",

score:

input.venus ?? 50,

weight:15,

},



{

name:"Jupiter",

score:

input.jupiter ?? 50,

weight:15,

},



{

name:"Saturn",

score:

input.saturn ?? 50,

weight:10,

},



{

name:"Mars",

score:

input.mars ?? 50,

weight:5,

},



{

name:"Navamsa",

score:

input.navamsa ?? 50,

weight:10,

},



];






return Math.round(

factors.reduce(

(total,factor)=>

total +

(

factor.score *

 factor.weight /

100

),

0

)

);


}








//////////////////////////////////////////////////////////////
// NEGATIVE RISK ENGINE
//////////////////////////////////////////////////////////////

function calculateMarriageRisk(

input:MarriageScoreInput

):number {



let risks:number[]=[


input.delayRisk ?? 0,


input.separationRisk ?? 0,


input.conflictRisk ?? 0,



];





// Backward compatibility

if(

input.saturnDelay

){

 risks.push(25);

}



if(

input.marsConflict

){

 risks.push(30);

}





const validRisks =

risks.filter(

(value)=>value>0

);





if(

validRisks.length===0

){

return 0;

}





return Math.round(

validRisks.reduce(

(a,b)=>a+b,

0

)

/

validRisks.length

);


}









//////////////////////////////////////////////////////////////
// LEGACY AVERAGE
//////////////////////////////////////////////////////////////

function calculateAverageScore(

 factors:number[]

):MarriageScore {


const score =

clampScore(

Math.round(

factors.reduce(

(a,b)=>

a+b,

0

)

/

factors.length

)

);



return {


score,


grade:

getMarriageGrade(score),


};


}








//////////////////////////////////////////////////////////////
// GRADE
//////////////////////////////////////////////////////////////

function getMarriageGrade(

score:number

):MarriageGrade {



if(score>=85)

return "Excellent";



if(score>=70)

return "Good";



if(score>=50)

return "Average";



return "Weak";


}