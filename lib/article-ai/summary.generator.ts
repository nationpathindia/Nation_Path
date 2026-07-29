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



function capitalize(text:string){

  return text.charAt(0).toUpperCase() + text.slice(1);

}





export function generateArticleSummary(

article:ArticleSummaryInput

):ArticleSummaryOutput {



const cleanContent = cleanText(

  article.content

);



const sentences = cleanContent

.split(/[.!?]/)

.map(s=>s.trim())

.filter(Boolean);



const title = article.title.toLowerCase();




/*
----------------------------------
OVERVIEW ENGINE
----------------------------------
*/


let overview = "";



if(article.excerpt){

  overview = article.excerpt;

}

else if(sentences.length){

  overview = sentences

  .slice(0,2)

  .join(". ") + ".";

}

else{

 overview =
 `${article.title} highlights an important development requiring reader attention.`;

}







/*
----------------------------------
IMPACT ENGINE
----------------------------------
*/


let impact = "";



const defenceWords = [

"army",

"navy",

"military",

"defence",

"warship",

"weapon"

];



const economyWords=[

"economy",

"business",

"market",

"company",

"investment",

"trade"

];



const politicsWords=[

"government",

"minister",

"election",

"policy",

"parliament"

];





if(defenceWords.some(word=>title.includes(word))){

impact =

"This development strengthens strategic capabilities and reflects wider changes in national security and future preparedness.";

}



else if(economyWords.some(word=>title.includes(word))){

impact =

"This development may influence economic trends, business decisions, and public understanding of market changes.";

}



else if(politicsWords.some(word=>title.includes(word))){

impact =

"This development may shape public discussion and influence future policy decisions.";

}



else{

impact =

"This development provides important context for readers to understand its wider significance and possible future effects.";

}







/*
----------------------------------
INTELLIGENCE TAKEAWAY
----------------------------------
*/



let takeaway = "";



if(sentences.length > 2){


takeaway =

capitalize(

sentences[2]

)

+ ".";



}

else{


takeaway =

"Readers should focus on the facts, context, and long-term significance behind this development.";

}







return {


overview,


impact,


takeaway


};



}