//////////////////////////////////////////////////////////////
// NATIONPATH AI NEWS SEO ENGINE v2
//
// SEO Intelligence Layer
//
// NO OPENAI
// NO EXTERNAL PROVIDER
//
// Deterministic SEO Intelligence
//////////////////////////////////////////////////////////////


import type {

NewsAnalysis,

GeneratedSEO

} from "../types";






//////////////////////////////////////////////////////////////
// MAIN SEO GENERATOR
//////////////////////////////////////////////////////////////


export function generateNewsSEO(

title:string,

content:string,

analysis:NewsAnalysis

):GeneratedSEO {



return {


metaTitle:
generateMetaTitle(
title,
analysis
),



metaDescription:
generateMetaDescription(
content,
analysis
),



metaKeywords:
generateKeywords(
analysis
),



slug:
generateSlug(
title
)



};



}








//////////////////////////////////////////////////////////////
// META TITLE ENGINE
//////////////////////////////////////////////////////////////


function generateMetaTitle(

title:string,

analysis:NewsAnalysis

){


const keyword =

analysis.entities[0]
||
analysis.topic
||
analysis.category;



let value =

keyword
?
`${keyword}: ${title}`
:
title;



value =
clean(value);



if(
value.length>60
){

value =
value
.slice(0,57)
.trim();

}



return `${value} | NationPath`;

}








//////////////////////////////////////////////////////////////
// DESCRIPTION ENGINE
//////////////////////////////////////////////////////////////


function generateMetaDescription(

content:string,

analysis:NewsAnalysis

){


const text =

content

.replace(
/<[^>]+>/g,
" "
)

.replace(
(/\s+/g),
" "
)

.trim();



let description = text;



if(
analysis.topic
&&
!description.includes(
analysis.topic
)
){

description =
`${analysis.topic}. ${description}`;

}



return description

.slice(0,157)

.trim()
+
"...";

}








//////////////////////////////////////////////////////////////
// KEYWORD INTELLIGENCE
//////////////////////////////////////////////////////////////


function generateKeywords(

analysis:NewsAnalysis

){


const primary = [

analysis.topic,

analysis.category,

...analysis.entities,

...analysis.people,

...analysis.organizations,

...analysis.locations,

...analysis.keywords

];



return Array.from(

new Set(

primary

.filter(Boolean)

.map(

item=>

item

.toLowerCase()

.trim()

)

)

)

.filter(

word=>

word.length>2

)

.slice(0,25);


}








//////////////////////////////////////////////////////////////
// SLUG ENGINE
//////////////////////////////////////////////////////////////


function generateSlug(

title:string

){


const stopWords = [

"the",
"a",
"an",
"and",
"of",
"to",
"in",
"on"

];



return title

.toLowerCase()

.normalize()

.replace(
/[^a-z0-9\s-]/g,
""
)

.split(" ")

.filter(

word=>

word
&&
!stopWords.includes(word)

)

.join("-")

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
// HELPERS
//////////////////////////////////////////////////////////////


function clean(

text:string

){

return text

.replace(
(/\s+/g),
" "
)

.trim();


}

