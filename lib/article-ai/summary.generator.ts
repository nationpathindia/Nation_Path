export interface ArticleSummaryInput {

  title: string;

  excerpt?: string | null;

  content: string;

  category?: string;

}



export interface ArticleSummaryOutput {

  overview: string;

  impact: string;

  takeaway: string;

}




function cleanText(content:string){

  return content

    .replace(/<[^>]*>?/gm,"")

    .replace(/\s+/g," ")

    .trim();

}





function hasKeyword(
text:string,
keywords:string[]
){

return keywords.some(
word =>
text.includes(word)
);

}







export function generateArticleSummary(

article:ArticleSummaryInput

):ArticleSummaryOutput {



const cleanContent = cleanText(
article.content
);




const fullText = (

article.title +

" " +

cleanContent.substring(0,1500)

+

" " +

(article.category || "")

)

.toLowerCase();






const sentences = cleanContent

.split(/[.!?]/)

.map(item=>item.trim())

.filter(Boolean);







/*
------------------------------------
OVERVIEW INTELLIGENCE
------------------------------------
*/


let overview = "";



if(article.excerpt){

overview = article.excerpt;

}

else if(sentences.length){

overview =

sentences

.slice(0,2)

.join(". ")

+

".";

}

else{

overview =

`${article.title} highlights an important development with wider significance for readers.`;

}









/*
------------------------------------
GLOBAL READER IMPACT ENGINE
------------------------------------
*/


let impact = "";






if(

hasKeyword(

fullText,

[

"war",

"defence",

"defense",

"military",

"army",

"navy",

"security",

"missile",

"weapon",

"nuclear",

"conflict",

"iran",

"israel",

"ukraine",

"nato"

]

)

){


impact =

"This development may influence global security discussions, strategic decisions, diplomatic relations, and the future direction of international stability.";

}





else if(

hasKeyword(

fullText,

[

"president",

"prime minister",

"government",

"election",

"parliament",

"policy",

"law",

"diplomatic",

"treaty",

"minister"

]

)

){


impact =

"This development may shape political discussions, government decisions, public opinion, and international relations across regions.";

}






else if(

hasKeyword(

fullText,

[

"economy",

"market",

"stock",

"trade",

"business",

"company",

"investment",

"finance",

"bank",

"currency",

"industry"

]

)

){


impact =

"This development may influence markets, business strategies, investment decisions, and economic trends affecting different sectors.";

}





else if(

hasKeyword(

fullText,

[

"technology",

"artificial intelligence",

"ai",

"digital",

"software",

"innovation",

"robot",

"chip",

"space"

]

)

){


impact =

"This development highlights changing technology trends and may influence innovation, industries, and future digital transformation.";

}







else if(

hasKeyword(

fullText,

[

"climate",

"environment",

"carbon",

"energy",

"weather",

"earth",

"pollution"

]

)

){


impact =

"This development may affect environmental decisions, sustainability efforts, and long-term challenges faced by communities worldwide.";

}







else if(

hasKeyword(

fullText,

[

"health",

"medical",

"medicine",

"disease",

"hospital",

"vaccine",

"research"

]

)

){


impact =

"This development may improve awareness and influence future decisions related to healthcare, research, and public wellbeing.";

}







else if(

hasKeyword(

fullText,

[

"education",

"school",

"university",

"student",

"learning",

"exam"

]

)

){


impact =

"This development may influence education systems, learning opportunities, and future social progress.";

}







else if(

hasKeyword(

fullText,

[

"sport",

"football",

"cricket",

"olympic",

"championship",

"player",

"tournament"

]

)

){


impact =

"This development may influence sporting trends, competition, and global audience interest.";

}







else if(

hasKeyword(

fullText,

[

"film",

"movie",

"music",

"artist",

"culture",

"entertainment"

]

)

){


impact =

"This development may shape cultural conversations, audience interests, and future industry trends.";

}





else{


impact =

"This development provides important context and helps readers understand the wider consequences beyond the immediate headline.";

}









/*
------------------------------------
KEY INTELLIGENCE ENGINE
------------------------------------
*/


let takeaway = "";




if(

hasKeyword(

fullText,

[

"war",

"defence",

"defense",

"military",

"security",

"conflict",

"iran",

"israel",

"nato"

]

)

){


takeaway =

"Readers should understand the strategic importance of this development and how it may influence regional and global dynamics.";

}





else if(

hasKeyword(

fullText,

[

"economy",

"market",

"trade",

"business",

"investment"

]

)

){


takeaway =

"Readers should consider how this development may affect economic decisions, market behaviour, and future opportunities.";

}





else if(

hasKeyword(

fullText,

[

"technology",

"ai",

"digital",

"innovation"

]

)

){


takeaway =

"Readers should understand how this advancement could shape future technology trends and everyday experiences.";

}





else if(

hasKeyword(

fullText,

[

"government",

"policy",

"election",

"law"

]

)

){


takeaway =

"Readers should follow the wider implications of this decision and understand its impact on society and governance.";

}





else{


takeaway =

"Readers should look beyond the headline to understand the facts, background, and broader significance of this development.";

}








return {


overview,


impact,


takeaway


};



}