// ============================================
// NationPath AI News Importer
// Fact Check Parser v2 FINAL LOCK
//
// Supports:
// - Markdown blocks
// - JSON blocks
// - Multiline fields
// - AI malformed recovery
// - Claim grouping
// ============================================

import type {
  FactCheckItem
} from "./types";



// ============================================
// CLEAN TEXT
// ============================================

function cleanText(
  text?:string
):string {


if(
  !text
){

  return "";

}


return text

.replace(
  /\*\*/g,
  ""
)

.replace(
  /\\"/g,
  '"'
)

.replace(
  /\s+/g,
  " "
)

.trim();

}



// ============================================
// JSON EXTRACTION
// ============================================

function extractJSON(
  text:string
):any[] {


const results:any[] = [];



const matches =
text.match(
  /\{[\s\S]*?\}/g
);



if(
  !matches
){

  return [];

}



for(
  const item of matches
){

try{


const parsed =
JSON.parse(
  item
);



if(
 parsed &&
 typeof parsed === "object"
){

results.push(
 parsed
);

}



}

catch{


try{


const parsed =
JSON.parse(
 item.replace(
  /\\"/g,
  '"'
 )
);



results.push(
 parsed
);



}
catch{

continue;

}


}


}



return results;

}



// ============================================
// STATUS NORMALIZER
// ============================================

function normalizeStatus(
value?:string
):
FactCheckItem["status"] {


const status =
cleanText(
 value
)
.toLowerCase();



if(
 status.includes("verified")
){

return "verified";

}



if(
 status.includes("partial")
){

return "partially_verified";

}



if(
 status.includes("false")
){

return "false";

}



if(
 status.includes("unverified")
){

return "unverified";

}



return "pending";

}



// ============================================
// JSON PARSER
// ============================================

function parseJSONFactCheck(
raw:string
):FactCheckItem[] {


const output:FactCheckItem[] = [];



const objects =
extractJSON(
 raw
);



for(
 const object of objects
){


const claim =
cleanText(
 object.claim ||
 object.statement
);



if(
 !claim
){

continue;

}



output.push({

claim,


status:
normalizeStatus(
 object.status
),


explanation:
cleanText(
 object.explanation
),


sources:
cleanText(
 object.sources ||
 object.source
)


});


}



return output;

}



// ============================================
// MARKDOWN PARSER
// ============================================

function parseMarkdownFactCheck(
raw:string
):FactCheckItem[] {


const items:FactCheckItem[] = [];



let current:
Partial<FactCheckItem> = {};



function push(){


if(
 current.claim
){


items.push({

claim:
cleanText(
 current.claim
),


status:
current.status ||
"pending",


explanation:
current.explanation
?


cleanText(
 current.explanation
)

:

undefined,


sources:
current.sources
?


cleanText(
 current.sources
)

:

undefined


});


}



current = {};

}



const lines =
raw
.split("\n")
.map(
x =>
x.trim()
);



for(
const line of lines
){


if(
 !line
){

continue;

}



const text =
cleanText(
 line
);



// CLAIM

if(
 /^claim\s*:/i.test(
 text
)
){


if(
 current.claim
){

push();

}



current.claim =
text.replace(
 /^claim\s*:/i,
 ""
)
.trim();


continue;

}



// STATUS

if(
 /^status\s*:/i.test(
 text
)
){

current.status =
normalizeStatus(
 text.replace(
  /^status\s*:/i,
  ""
 )
);


continue;

}



// EXPLANATION

if(
 /^explanation\s*:/i.test(
 text
)
){

current.explanation =
text.replace(
 /^explanation\s*:/i,
 ""
)
.trim();


continue;

}



// SOURCE

if(
 /^source(s)?\s*:/i.test(
 text
)
){

current.sources =
text.replace(
 /^source(s)?\s*:/i,
 ""
)
.trim();


continue;

}



// multiline recovery

if(
 current.claim &&
 !current.explanation &&
 !current.sources
){

current.explanation =
(
current.explanation || ""
)
+
" "
+
text;

}


}



push();



return items;

}



// ============================================
// MAIN EXPORT
// ============================================

export function parseFactCheck(
rawFactCheck?:string
):FactCheckItem[] {


if(
 !rawFactCheck
){

return [];

}



const raw =
rawFactCheck.trim();



if(
 !raw
){

return [];

}



const json =
parseJSONFactCheck(
 raw
);



if(
 json.length
){

return json;

}



return parseMarkdownFactCheck(
 raw
);

}