// ============================================
// NationPath AI News Importer
// Section Extraction Engine v6.1 FINAL LOCK
//
// Markdown + AI Structured Output Parser
//
// Supports:
// - Core Article Sections
// - Editorial Intelligence
// - AI Quality Intelligence
// - Source Intelligence
// - Image Intelligence
//
// Improvements:
// - SEO Preview support
// - Expert Opinion support
// - Markdown heading detection
// - Bold field detection
// - Heading aliases
// - Fuzzy matching
// - JSON preservation
// - Body isolation
// - Multiline preservation
// ============================================

import type {
  ParsedSection
} from "./types";



// ============================================
// SECTION ALIASES
// ============================================

const SECTION_ALIASES: Record<string,string[]> = {

seoTitle:[
"seo title",
"seo headline",
"meta title",
"seo heading"
],

seoPreview:[
  "seo preview",
  "search preview",
  "seo metadata"
],


slug:[
  "slug",
  "url slug",
  "article slug"
],


metaDescription:[
  "meta description",
  "seo description",
  "meta desc",
  "seo summary"
],


metaKeywords:[
  "meta keywords",
  "keywords",
  "seo keywords",
  "tags"
],


brief:[
  "brief",
  "short description",
  "short summary",
  "short brief",
  "summary",
  "overview",
  "executive summary"
],


headline:[
  "headline",
  "title",
  "article title",
  "news title",
  "article headline"
],


headlineIntelligence:[
  "headline intelligence",
  "headline analysis",
  "headline score",
  "headline review"
],


body:[
  "body",
  "article body",
  "article content",
  "content",
  "main story",
  "main content",
  "story",
  "full article",
  "article story"
],


background:[
  "background",
  "context",
  "history",
  "background information",
  "introduction"
],


expertOpinion:[
  "expert opinion",
  "expert opinions",
  "expert analysis",
  "expert views",
  "expert comments",
  "analyst opinion",
  "official perspective",
  "expert perspective",
  "expert commentary",
  "expert insight"
],


factCheck:[
  "fact check",
  "factcheck",
  "verification",
  "truth check",
  "claim verification"
],


whyItMatters:[
  "why it matters",
  "importance",
  "significance",
  "impact",
  "impact analysis"
],


timeline:[
  "timeline",
  "history timeline",
  "key dates",
  "chronology",
  "events"
],


whatsNext:[
  "what's next",
  "whats next",
  "next steps",
  "future",
  "future outlook",
  "upcoming"
],


keyHighlights:[
  "key highlights",
  "highlights",
  "key points",
  "important points",
  "bullet points"
],


keyTakeaways:[
  "key takeaways",
  "main takeaways",
  "major takeaways",
  "summary points"
],


faq:[
  "faq",
  "faqs",
  "frequently asked questions",
  "questions"
],


sourceDesk:[
  "source desk",
  "sources",
  "source information",
  "reporting source",
  "news source"
],


quality:[
  "ai quality",
  "quality panel",
  "ai confidence",
  "editorial quality",
  "quality assessment"
],


imageGallery:[
  "image gallery",
  "images",
  "photo gallery",
  "media gallery"
],


imageCaption:[
  "image caption",
  "caption",
  "photo caption",
  "image description"
],


imageAlt:[
  "image alt",
  "image alt text",
  "alt text",
  "seo image alt"
]

};



// ============================================
// SECTION PRIORITY
// ============================================

const SECTION_PRIORITY:string[] = [

"headline",

"headlineIntelligence",

"body",

"brief",

"background",

"expertOpinion",

"factCheck",

"whyItMatters",

"whatsNext",

"keyHighlights",

"keyTakeaways",

"timeline",

"faq",

"sourceDesk",

"quality",

"imageGallery",

"seoPreview",

"seoTitle",

"metaDescription",

"metaKeywords",

"slug",

"imageAlt",

"imageCaption"

];



// ============================================
// NORMALIZE HEADING
// ============================================

function normalizeHeading(
  heading:string
):string {


return heading

.replace(/^#+/,"")

.replace(/\*\*/g,"")

.replace(/^[-*]/,"")

.replace(/^\d+\./,"")

.replace(/[`]/g,"")

.trim()

.toLowerCase()

.replace(/[:\-]+$/,"")

.replace(/\s+/g," ");

}
// ============================================
// FUZZY HEADING MATCHING
// ============================================

function similarity(
  a:string,
  b:string
):number {


if(
  a === b
){

  return 1;

}



const aWords =
new Set(
  a.split(" ")
);



const bWords =
new Set(
  b.split(" ")
);



const intersection =
[
  ...aWords
]
.filter(
  word =>
    bWords.has(word)
);



const union =
new Set([
  ...aWords,
  ...bWords
]);



if(
  !union.size
){

  return 0;

}



return (
  intersection.length /
  union.size
);

}



// ============================================
// DETECT SECTION TYPE
// ============================================

export function detectSectionType(
  heading:string
):string|null {


const normalized =
normalizeHeading(
  heading
);



if(
  !normalized
){

  return null;

}



for(
  const key of Object.keys(
    SECTION_ALIASES
  )
){


const aliases =
SECTION_ALIASES[key];



for(
  const alias of aliases
){


if(
  normalized === alias
){

  return key;

}



if(
  normalized.includes(alias)
){

  return key;

}



if(
  similarity(
    normalized,
    alias
  ) >= 0.65
){

  return key;

}



}



}



return null;

}



// ============================================
// HEADING DETECTOR
// ============================================

function extractHeading(
  line:string
):string|null {


const trimmed =
line.trim();



if(
  !trimmed
){

  return null;

}



// Markdown headings

if(
  /^#{1,6}\s+/.test(
    trimmed
  )
){

  return trimmed;

}



// Bold headings
//
// Supports:
// **Title**
// **Title:**
// **Title:** value
//
// Field values are preserved
// inside section content.

if(
  /^\*\*[^*]+\*\*/.test(
    trimmed
  )
){

  const value =
    trimmed
      .replace(
        /^\*\*/,
        ""
      )
      .replace(
        /\*\*.*/,
        ""
      )
      .trim();



  if(
    value.length &&
    value.length < 80
  ){

    return trimmed;

  }

}



// Plain heading with colon

if(
  /^[A-Za-z0-9\s&'-]{2,60}:$/.test(
    trimmed
  )
){

  return trimmed;

}



return null;

}



// ============================================
// CLEAN CONTENT
// ============================================

function cleanContent(
  text:string
):string {


return text

.replace(
  /^---$/gm,
  ""
)

.replace(
  /^\s*[-*_]{3,}\s*$/gm,
  ""
)

.replace(
  /^\s+$/gm,
  ""
)

.trim();

}



// ============================================
// JSON DETECTOR
// ============================================

function isJsonLine(
  line:string
):boolean {


const value =
line.trim();



return (

value.startsWith("{")

||

value.startsWith("[")

||

value.endsWith("}")

||

value.endsWith("]")

);

}



// ============================================
// IGNORE HEADING CHECK
// ============================================

function shouldIgnoreHeading(
  line:string,
  insideJson:boolean
):boolean {


if(
  insideJson
){

  return true;

}



if(
  isJsonLine(
    line
  )
){

  return true;

}



return false;

}
// ============================================
// EXTRACT SECTIONS
// ============================================

export function extractSections(
  text:string
):ParsedSection[] {


const lines =

text

.replace(
  /\r\n/g,
  "\n"
)

.split(
  "\n"
);



const sections:ParsedSection[] = [];



let currentHeading:
string|null = null;



let currentContent:
string[] = [];



let jsonDepth = 0;



function updateJsonState(
  line:string
){


const open =

(
  line.match(
    /[\{\[]/g
  )
  ||
  []
)
.length;



const close =

(
  line.match(
    /[\}\]]/g
  )
  ||
  []
)
.length;



jsonDepth +=
open - close;



if(
  jsonDepth < 0
){

  jsonDepth = 0;

}


}



function pushSection(){


if(
  !currentHeading
){

  return;

}



const content =

cleanContent(
  currentContent.join(
    "\n"
  )
);



if(
  content
){

sections.push({

  heading:
    currentHeading,


  content

});


}


}



for(
let index = 0;
index < lines.length;
index++
){


const rawLine =
lines[index];



const trimmed =
rawLine.trim();



if(
  !trimmed
){


if(
  currentHeading
){

  currentContent.push(
    ""
  );

}


continue;

}



const insideJson =
jsonDepth > 0;



const heading =
extractHeading(
  trimmed
);



if(
  heading &&
  !shouldIgnoreHeading(
    trimmed,
    insideJson
  )
){


const detected =
detectSectionType(
  heading
);



if(
  detected
){


pushSection();



currentHeading =
heading;



currentContent =
[];



continue;

}


}



if(
  currentHeading
){

  currentContent.push(
    rawLine
  );

}



updateJsonState(
  trimmed
);


}



pushSection();



return sections;

}



// ============================================
// MERGE DUPLICATE SECTIONS
// ============================================

function mergeSections(
  sections:ParsedSection[]
):ParsedSection[] {


const output:ParsedSection[] = [];



for(
  const section of sections
){


const type =
detectSectionType(
  section.heading
);



if(
  !type
){

  continue;

}



const existing =
output.find(
  item =>

  detectSectionType(
    item.heading
  )
  ===
  type
);



if(
  existing
){


existing.content +=

"\n\n" +

section.content;



}

else{


output.push(
  section
);


}


}



return output;

}



// ============================================
// REMOVE NESTED SECTION LEAKAGE
// ============================================

function removeNestedSections(
  content:string
):string {


const lines =
content.split(
  "\n"
);



const clean:string[] = [];



for(
  const line of lines
){


const detected =
detectSectionType(
  line
);



if(
  detected
){

  continue;

}



clean.push(
  line
);


}



return clean
.join(
  "\n"
)
.trim();

}
// ============================================
// SECTIONS TO MAP
// ============================================

export function sectionsToMap(
  sections:ParsedSection[]
):Record<string,string>{


const result:
Record<string,string> = {};



const merged =
mergeSections(
  sections
);



for(
  const section of merged
){

const key =
detectSectionType(
  section.heading
);



if(
  !key
){

  continue;

}



let content =
section.content;



// ============================================
// BODY SAFETY
// ============================================
//
// Article body should never contain:
// - Background
// - Timeline
// - FAQ
// - SEO
// - Intelligence sections
//
// ============================================

if(
  key === "body"
){

content =
removeNestedSections(
  content
);

}



// ============================================
// EMPTY CHECK
// ============================================

if(
  !content
){

  continue;

}



// ============================================
// FIRST VALID SECTION WINS
// ============================================

if(
  !result[key]
){

  result[key] =
    content;

  continue;

}



// ============================================
// PRIORITY OVERRIDE
// ============================================

const existingPriority =
SECTION_PRIORITY.indexOf(
  key
);



if(
  existingPriority !== -1
){

result[key] =
content;


}



}



return result;

}



// ============================================
// CLEAN SECTION TEXT EXPORT
// ============================================

export function cleanSectionText(
  text:string
):string {


return cleanContent(
  text
);

}



// ============================================
// ISOLATE ARTICLE BODY
// ============================================

export function isolateArticleBody(
  sections:ParsedSection[]
):string {


const body =
sections.find(
  section =>

  detectSectionType(
    section.heading
  )
  ===
  "body"
);



if(
  !body
){

  return "";

}



return removeNestedSections(
  body.content
);

}



// ============================================
// DEBUG SECTION INSPECTOR
// ============================================

export function inspectSections(
  sections:ParsedSection[]
){


return sections.map(
  section =>

({

heading:
section.heading,


type:
detectSectionType(
  section.heading
),


length:
section.content.length


})

);

}
// ============================================
// FINAL SECTION EXTRACTION ENGINE CHECKS
// ============================================
//
// Public exports preserved:
//
// detectSectionType()
// extractSections()
// sectionsToMap()
// cleanSectionText()
// isolateArticleBody()
// inspectSections()
//
// Compatible with:
//
// parser.ts
// mapper.ts
// validator.ts
//
// ============================================



// ============================================
// END OF FILE
// ============================================