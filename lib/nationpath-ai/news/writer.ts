//////////////////////////////////////////////////////////////
// NATIONPATH AI NEWS WRITER v2
//
// Editorial Writing Intelligence Layer
//
// NO OPENAI
// NO EXTERNAL PROVIDER
//
// NationPath News Intelligence
//////////////////////////////////////////////////////////////


import type {

 NewsAnalysis,

 GeneratedNewsArticle,

 NewsTimelineItem,

 NewsExpertOpinion,

 NewsFactCheck,

} from "../types";






//////////////////////////////////////////////////////////////
// MAIN ARTICLE GENERATOR
//////////////////////////////////////////////////////////////


export function generateNewsArticleContent(

 title:string,

 rawNews:string,

 analysis:NewsAnalysis

):GeneratedNewsArticle {


const content =
createArticleBody(
 title,
 rawNews,
 analysis
);



return {


title,


slug:
createSlug(title),



content,



shortBrief:
createLead(rawNews),



background:
createBackground(analysis),



timeline:
createTimeline(rawNews),



expertOpinion:
createExpertOpinion(analysis),



factCheck:
createFactCheck(rawNews),



whatsNext:
createWhatsNext(analysis),



keyTakeaways:
createKeyTakeaways(analysis),



sourceDesk:
"NationPath News Intelligence Desk",



metaTitle:
limitLength(
 title,
 65
),



metaDescription:
limitLength(
 createLead(rawNews),
 160
),



metaKeywords:
analysis.keywords



};



}








//////////////////////////////////////////////////////////////
// ARTICLE BODY
//////////////////////////////////////////////////////////////


function createArticleBody(

title:string,

rawNews:string,

analysis:NewsAnalysis

){


return `


<h2>${title}</h2>


<p>

${createLead(rawNews)}

</p>



<h3>What Happened</h3>

<p>

${createWhatHappened(rawNews)}

</p>



<h3>Background</h3>

<p>

${createBackground(analysis)}

</p>



<h3>Why It Matters</h3>

<p>

This development is important because it involves
${analysis.category} and may affect key stakeholders
connected with this issue.

</p>



<h3>Impact Analysis</h3>

<p>

The possible impact includes public response,
institutional decisions and future developments
related to this story.

</p>



<h3>Stakeholders</h3>

<p>

${analysis.entities.join(", ") || "Relevant stakeholders"}

may be connected with this development.

</p>



<h3>What Happens Next</h3>

<p>

${createWhatsNext(analysis)}

</p>



<h3>Conclusion</h3>

<p>

NationPath will continue monitoring this story
as additional verified information becomes available.

</p>


`;

}








//////////////////////////////////////////////////////////////
// LEAD CREATION
//////////////////////////////////////////////////////////////


function createLead(

text:string

){


return cleanText(text)
.slice(0,350);


}








function createWhatHappened(

text:string

){


const sentences =
cleanText(text)
.split(/[.!?]/)
.filter(
x=>x.trim()
);



return sentences
.slice(0,3)
.join(". ");


}








//////////////////////////////////////////////////////////////
// BACKGROUND INTELLIGENCE
//////////////////////////////////////////////////////////////


function createBackground(

analysis:NewsAnalysis

){


return `

This ${analysis.articleType} story falls under
${analysis.category}. 

The NationPath intelligence engine identified
${analysis.entities.length} important entities
and classified this development as
${analysis.importance} importance.

`;


}








//////////////////////////////////////////////////////////////
// TIMELINE
//////////////////////////////////////////////////////////////


function createTimeline(

rawNews:string

):NewsTimelineItem[]{


const date =
new Date()
.toISOString()
.split("T")[0];



return [


{

date,

event:
createLead(rawNews)

}


];


}








//////////////////////////////////////////////////////////////
// EXPERT INTELLIGENCE
//////////////////////////////////////////////////////////////


function createExpertOpinion(

analysis:NewsAnalysis

):NewsExpertOpinion[]{


return [

{

expert:
"NationPath Editorial Intelligence",


designation:
`${analysis.category} Analysis`,


opinion:
`The development requires evaluation from policy,
public and institutional perspectives.`

}


];


}








//////////////////////////////////////////////////////////////
// FACT CHECK
//////////////////////////////////////////////////////////////


function createFactCheck(

rawNews:string

):NewsFactCheck[]{


return [


{

claim:
cleanText(rawNews)
.slice(0,120),


status:
"unverified",


explanation:
"Verification confidence: Medium. Information should be cross checked before final publication."

}


];


}








//////////////////////////////////////////////////////////////
// FUTURE OUTLOOK
//////////////////////////////////////////////////////////////


function createWhatsNext(

analysis:NewsAnalysis

){


return `

Future developments in this ${analysis.category}
story will depend on official statements,
stakeholder responses and verified updates.

`;

}








//////////////////////////////////////////////////////////////
// TAKEAWAYS
//////////////////////////////////////////////////////////////


function createKeyTakeaways(

analysis:NewsAnalysis

){


return [

`Topic: ${analysis.topic}`,

`Category: ${analysis.category}`,

`Importance: ${analysis.importance}`,

`Entities: ${
analysis.entities.join(", ")
|| "Under analysis"
}`

];


}








//////////////////////////////////////////////////////////////
// UTILITIES
//////////////////////////////////////////////////////////////


function cleanText(

text:string

){

return text

.replace(
(/\s+/g),
" "
)

.trim();

}



function createSlug(

text:string

){

return text

.toLowerCase()

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


return text
.slice(0,max)
.trim();

}

