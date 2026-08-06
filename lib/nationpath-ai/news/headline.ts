//////////////////////////////////////////////////////////////
// NATIONPATH AI NEWS HEADLINE ENGINE v2
//
// Headline Intelligence Layer
//
// NO OPENAI
// NO EXTERNAL PROVIDER
//
// Deterministic Newsroom Rules
//////////////////////////////////////////////////////////////


import type {

 NewsAnalysis,

} from "../types";






//////////////////////////////////////////////////////////////
// OUTPUT
//////////////////////////////////////////////////////////////


export interface GeneratedHeadline {


 primary:string;


 seo:string;


 breaking:string;


 social:string;


 slug:string;


}








//////////////////////////////////////////////////////////////
// MAIN ENGINE
//////////////////////////////////////////////////////////////


export function generateHeadlines(

 rawNews:string,

 analysis:NewsAnalysis

):GeneratedHeadline {



const candidates =
generateCandidates(
 rawNews,
 analysis
);



const primary =
selectBestHeadline(
 candidates
);



return {


primary:
cleanTitle(primary),



seo:
createSEOHeadline(
 primary,
 analysis
),



breaking:
createBreakingHeadline(
 primary,
 analysis
),



social:
createSocialHeadline(
 primary
),



slug:
createSlug(
 primary
)


};



}








//////////////////////////////////////////////////////////////
// CANDIDATE GENERATOR
//////////////////////////////////////////////////////////////


function generateCandidates(

text:string,

analysis:NewsAnalysis

){


const sentence =
extractMainSentence(text);



const topic =
analysis.topic ||
"Latest Update";



return [

sentence,


`${topic}: ${sentence}`,



`${extractEntity(text)} ${sentence}`



];


}








//////////////////////////////////////////////////////////////
// SELECT BEST HEADLINE
//////////////////////////////////////////////////////////////


function selectBestHeadline(

titles:string[]

){


let best =
titles[0] ||
"NationPath Latest News";



let score =
scoreHeadline(best);



for(
const title of titles
){

const current =
scoreHeadline(title);



if(
current > score
){

best =
title;

score =
current;

}


}



return best;


}








//////////////////////////////////////////////////////////////
// HEADLINE SCORING
//////////////////////////////////////////////////////////////


function scoreHeadline(

title:string

){


let score=0;



const length =
title.length;



if(
length>=55 &&
length<=70
)
score+=30;



if(
length>30
)
score+=10;



if(
title.split(" ").length>=5
)
score+=10;



if(
!/[!?]/.test(title)
)
score+=10;



if(
!title.toLowerCase()
.includes("today")
)
score+=5;



return score;


}








//////////////////////////////////////////////////////////////
// MAIN SENTENCE
//////////////////////////////////////////////////////////////


function extractMainSentence(

text:string

){


return (

text
.split(/[.!?]/)
.find(

x=>
x.trim().length>20

)

||
text

)

.trim()

.slice(0,120);



}








//////////////////////////////////////////////////////////////
// ENTITY PRIORITY
//////////////////////////////////////////////////////////////


function extractEntity(

text:string

){


const match =

text.match(

/\b[A-Z][a-z]{2,}\b/

);



return match?.[0] || "";


}








//////////////////////////////////////////////////////////////
// SEO HEADLINE
//////////////////////////////////////////////////////////////


function createSEOHeadline(

title:string,

analysis:NewsAnalysis

){


let seo =
title;



if(
analysis.category &&
analysis.category !== "general"
){

seo +=
` | ${capitalize(
analysis.category
)} News`;

}



seo +=
" | NationPath";



return limitLength(
seo,
70
);


}








//////////////////////////////////////////////////////////////
// BREAKING HEADLINE
//////////////////////////////////////////////////////////////


function createBreakingHeadline(

title:string,

analysis:NewsAnalysis

){


if(
analysis.importance==="breaking"
){

return `Breaking News: ${title}`;

}



if(
analysis.importance==="high"
){

return `Major Update: ${title}`;

}



return title;


}








//////////////////////////////////////////////////////////////
// SOCIAL HEADLINE
//////////////////////////////////////////////////////////////


function createSocialHeadline(

title:string

){


return (

`${title} — Full story on NationPath`

)

.slice(
0,
140
);


}








//////////////////////////////////////////////////////////////
// CLEANER
//////////////////////////////////////////////////////////////


function cleanTitle(

title:string

){


return removeDuplicateWords(

title

.replace(
(/\s+/g),
" "
)

.trim()

);

}








//////////////////////////////////////////////////////////////
// DUPLICATE REMOVER
//////////////////////////////////////////////////////////////


function removeDuplicateWords(

text:string

){


const words =
text.split(" ");



const result:string[]=[];



for(
const word of words
){

if(
!result.includes(word)
){

result.push(word);

}

}



return result.join(" ");


}








//////////////////////////////////////////////////////////////
// SLUG
//////////////////////////////////////////////////////////////


function createSlug(

text:string

){


return text

.toLowerCase()

.normalize()

.replace(
/[^a-z0-9\s-]/g,
""
)

.trim()

.replace(
/\s+/g,
"-"
)

.replace(
/-+/g,
"-"
)

.slice(
0,
90
);


}








//////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////


function capitalize(

text:string

){

return (

text
.charAt(0)
.toUpperCase()

+
text.slice(1)

);

}



function limitLength(

text:string,

max:number

){

if(
text.length<=max
)
return text;



return text.slice(
0,
max
)
.trim();

}

