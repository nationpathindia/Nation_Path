//////////////////////////////////////////////////////////////
// NATIONPATH AI NEWS MAPPER v2
//
// Final CMS Mapping Intelligence Layer
//
// NO OPENAI
// NO EXTERNAL PROVIDER
//
// NationPath News Intelligence
//////////////////////////////////////////////////////////////


import type {

NewsAnalysis,

GeneratedNewsArticle,

NewsExpertOpinion,

NewsFactCheck,

NewsTimelineItem,

GeneratedSEO

} from "../types";







//////////////////////////////////////////////////////////////
// INPUT
//////////////////////////////////////////////////////////////


export interface NewsMapperInput {


headline:{

primary:string;

slug:string;

};



article:{

content:string;

shortBrief:string;

background?:string;

};



intelligence:{

background?:string;

timeline?:NewsTimelineItem[];

expertOpinion?:NewsExpertOpinion[];

factCheck?:NewsFactCheck[];

whyItMatters?:string;

whatsNext?:string;

};



seo:GeneratedSEO;


sourceDesk?:string;


}








//////////////////////////////////////////////////////////////
// MAIN CMS MAPPER
//////////////////////////////////////////////////////////////


export function mapNewsToArticle(

input:NewsMapperInput,

analysis:NewsAnalysis

):GeneratedNewsArticle {



const title =

cleanText(
input.headline.primary
)
||
"NationPath Latest News";



const slug =

cleanSlug(

input.headline.slug
||
title

);



const content =

validateContent(

input.article.content,

title

);



return {


title,


slug,


content,



shortBrief:

cleanText(
input.article.shortBrief
)
||
analysis.summary,



background:

cleanText(

input.intelligence.background

||
input.article.background

||
createFallbackBackground(
analysis
)

),



timeline:

input.intelligence.timeline
||
[],


expertOpinion:

input.intelligence.expertOpinion
||
createExpertFallback(),



factCheck:

input.intelligence.factCheck
||
createFactFallback(),



whatsNext:

cleanText(

input.intelligence.whatsNext

||
input.intelligence.whyItMatters

)
||
"NationPath will continue monitoring this development.",



keyTakeaways:

createTakeaways(
analysis
),



sourceDesk:

input.sourceDesk
||
"NationPath News Intelligence Desk",



metaTitle:

cleanText(

input.seo.metaTitle

)
||
`${title} | NationPath`,



metaDescription:

cleanText(

input.seo.metaDescription

)
||
analysis.summary.slice(0,160),



metaKeywords:

input.seo.metaKeywords
||
[]



};



}








//////////////////////////////////////////////////////////////
// CONTENT VALIDATION
//////////////////////////////////////////////////////////////


function validateContent(

content:string,

title:string

){


if(
content
&&
content.length>100
){

return content;

}



return `

<h2>${title}</h2>

<p>

NationPath is analysing this development.
Further verified information will be added
as the story evolves.

</p>

`;

}








//////////////////////////////////////////////////////////////
// FALLBACK BACKGROUND
//////////////////////////////////////////////////////////////


function createFallbackBackground(

analysis:NewsAnalysis

){


return `

This ${analysis.category}
story has been identified as a
${analysis.importance} importance update.

NationPath Intelligence is evaluating
context, impact and future developments.

`;

}








//////////////////////////////////////////////////////////////
// FACT CHECK FALLBACK
//////////////////////////////////////////////////////////////


function createFactFallback():NewsFactCheck[]{


return [

{

claim:
"No verification data available",

status:
"unverified",

explanation:
"Verification requires additional confirmed sources."

}

];


}








//////////////////////////////////////////////////////////////
// EXPERT FALLBACK
//////////////////////////////////////////////////////////////


function createExpertFallback():NewsExpertOpinion[]{


return [

{

expert:
"NationPath Editorial Intelligence",

designation:
"Analysis Desk",

opinion:
"Additional editorial analysis will be generated after verification."

}

];


}








//////////////////////////////////////////////////////////////
// TEXT CLEAN
//////////////////////////////////////////////////////////////


function cleanText(

value?:string

){


if(!value)
return "";



return value

.replace(
(/\s+/g),
" "
)

.trim();


}








//////////////////////////////////////////////////////////////
// SLUG CLEAN
//////////////////////////////////////////////////////////////


function cleanSlug(

value?:string

){


if(!value)
return "";



return value

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
)

.replace(
/-$/,
""
);


}








//////////////////////////////////////////////////////////////
// TAKEAWAYS
//////////////////////////////////////////////////////////////


function createTakeaways(

analysis:NewsAnalysis

):string[]{


const result:string[]=[];



if(
analysis.topic
){

result.push(
`Topic: ${analysis.topic}`
);

}



if(
analysis.category
){

result.push(
`Category: ${analysis.category}`
);

}



if(
analysis.importance
){

result.push(
`Importance: ${analysis.importance}`
);

}



if(
analysis.entities.length
){

result.push(

`Entities: ${analysis.entities.join(", ")}`

);

}



if(
analysis.locations.length
){

result.push(

`Locations: ${analysis.locations.join(", ")}`

);

}



return result;


}

