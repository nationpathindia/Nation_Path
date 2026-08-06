//////////////////////////////////////////////////////////////
// NATIONPATH AI NEWS ANALYZER v2
//
// News Understanding Intelligence Layer
//
// NO OPENAI
// NO EXTERNAL PROVIDER
//
// Deterministic Rule Based Intelligence
//////////////////////////////////////////////////////////////


import type {

  NewsGenerationRequest,

  NewsAnalysis,

} from "../types";





//////////////////////////////////////////////////////////////
// DICTIONARIES
//////////////////////////////////////////////////////////////


const STOP_WORDS = new Set([

"about",
"after",
"before",
"being",
"could",
"their",
"there",
"these",
"those",
"which",
"while",
"where",
"today",
"latest",
"news",
"update"

]);



const GOVERNMENT_WORDS = [

"government",
"minister",
"ministry",
"parliament",
"cabinet",
"policy",
"scheme",
"bill",
"election",
"president",
"prime minister"

];



const NEGATIVE_WORDS = [

"attack",
"crisis",
"loss",
"death",
"war",
"violence",
"fraud",
"scandal",
"collapse"

];



const POSITIVE_WORDS = [

"growth",
"success",
"achievement",
"win",
"launch",
"record",
"development"

];



const LOCATION_DB = [

"India",
"New Delhi",
"Delhi",
"Mumbai",
"Gujarat",
"Ahmedabad",
"Bengaluru",
"Kolkata",
"Chennai",
"London",
"USA"

];



const ORGANIZATION_DB = [

"Government of India",
"Supreme Court",
"Parliament",
"United Nations",
"WHO",
"ISRO",
"Reserve Bank of India",
"RBI"

];





//////////////////////////////////////////////////////////////
// MAIN ANALYZER
//////////////////////////////////////////////////////////////


export function analyzeNews(

request:NewsGenerationRequest

):NewsAnalysis {


const text =
request.rawNews
.trim();



return {


topic:
detectTopic(text),



category:
request.category ||
detectCategory(text),



articleType:
request.articleType ||
detectArticleType(text),



importance:
detectImportance(text),



entities:
extractEntities(text),



locations:
extractLocations(text),



people:
extractPeople(text),



organizations:
extractOrganizations(text),



keywords:
extractKeywords(text),



sentiment:
detectSentiment(text),



summary:
createSummary(text)



};


}








//////////////////////////////////////////////////////////////
// TOPIC INTELLIGENCE
//////////////////////////////////////////////////////////////


function detectTopic(text:string){


const value =
text.toLowerCase();



if(value.includes("election"))
return "Election Politics";


if(value.includes("economy"))
return "Economic Development";


if(value.includes("education"))
return "Education Policy";


if(value.includes("health"))
return "Healthcare";


if(value.includes("space"))
return "Science Technology";


if(value.includes("court"))
return "Legal Affairs";



return (

text
.split(/[.!?]/)[0]
?.trim()
||
"Latest News"

)
.slice(0,100);


}








//////////////////////////////////////////////////////////////
// CATEGORY
//////////////////////////////////////////////////////////////


function detectCategory(text:string){


const value =
text.toLowerCase();



if(
GOVERNMENT_WORDS.some(
word=>value.includes(word)
)
)
return "politics";



if(
value.includes("market")
||
value.includes("stock")
||
value.includes("business")
)
return "business";



if(
value.includes("match")
||
value.includes("player")
)
return "sports";



if(
value.includes("science")
||
value.includes("technology")
)
return "science";



return "general";


}








//////////////////////////////////////////////////////////////
// ARTICLE TYPE
//////////////////////////////////////////////////////////////


function detectArticleType(text:string){


const value =
text.toLowerCase();



if(
value.includes("breaking")
||
value.includes("alert")
)
return "breaking-news";



if(
value.includes("analysis")
||
value.includes("explained")
)
return "editorial";



return "news";


}








//////////////////////////////////////////////////////////////
// IMPORTANCE ENGINE
//////////////////////////////////////////////////////////////


function detectImportance(

text:string

):NewsAnalysis["importance"] {



const value =
text.toLowerCase();



let score = 0;



if(
value.includes("breaking")
)
score+=40;



if(
GOVERNMENT_WORDS.some(
w=>value.includes(w)
)
)
score+=25;



if(
value.includes("prime minister")
||
value.includes("president")
)
score+=30;



if(
value.includes("india")
)
score+=10;



if(score>=70)
return "breaking";



if(score>=45)
return "high";



if(score>=20)
return "medium";



return "low";


}








//////////////////////////////////////////////////////////////
// ENTITY EXTRACTION
//////////////////////////////////////////////////////////////

function extractEntities(text:string):string[] {


const words:string[] =
text.match(
/\b[A-Z][a-zA-Z]{2,}\b/g
)
||
[];



const filtered:string[] =
words.filter(
(word:string)=>

!STOP_WORDS.has(
word.toLowerCase()
)

);



return Array.from(
new Set<string>(
filtered
)
)
.slice(0,20);


}

//////////////////////////////////////////////////////////////
// LOCATION INTELLIGENCE
//////////////////////////////////////////////////////////////


function extractLocations(text:string){


return LOCATION_DB.filter(

location=>

text.includes(location)

);


}








//////////////////////////////////////////////////////////////
// PEOPLE DETECTION
//////////////////////////////////////////////////////////////


function extractPeople(text:string){


const patterns =
text.match(

/(?:Mr\.|Mrs\.|Dr\.|Shri|Smt\.)\s[A-Z][a-z]+/g

)
||
[];



return Array.from(
new Set(patterns)
);


}








//////////////////////////////////////////////////////////////
// ORGANIZATION DETECTION
//////////////////////////////////////////////////////////////


function extractOrganizations(text:string){


return ORGANIZATION_DB.filter(

org=>

text.includes(org)

);


}








//////////////////////////////////////////////////////////////
// KEYWORD INTELLIGENCE
//////////////////////////////////////////////////////////////


function extractKeywords(text:string){


return Array.from(

new Set(

text
.toLowerCase()
.replace(
/[^a-z0-9 ]/g,
""
)
.split(" ")
.filter(

word=>

word.length>5
&&
!STOP_WORDS.has(word)

)

)

)
.slice(0,20);


}








//////////////////////////////////////////////////////////////
// SENTIMENT INTELLIGENCE
//////////////////////////////////////////////////////////////


function detectSentiment(

text:string

):NewsAnalysis["sentiment"]{


const value =
text.toLowerCase();



const negative =
NEGATIVE_WORDS.filter(

w=>value.includes(w)

).length;



const positive =
POSITIVE_WORDS.filter(

w=>value.includes(w)

).length;



if(
negative>positive
)
return "negative";



if(
positive>negative
)
return "positive";



return "neutral";


}








//////////////////////////////////////////////////////////////
// SUMMARY
//////////////////////////////////////////////////////////////


function createSummary(text:string){


return text

.replace(
(/\s+/g),
" "
)

.trim()

.slice(0,400);


}

