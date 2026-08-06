// ============================================
// NationPath AI News Importer
// Section Extraction Engine v5 LOCKED
// Markdown + AI Structured Output Parser
//
// Supports:
// - Core Article Sections
// - Editorial Intelligence
// - AI Quality Intelligence
// - Source Intelligence
// - Image Intelligence
// ============================================


import type {
  ParsedSection
} from "./types";




// ============================================
// Section Aliases
// ============================================

const SECTION_ALIASES: Record<string,string[]> = {


  seoTitle:[
    "seo title",
    "seo headline",
    "meta title",
    "seo heading"
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



  brief:[
    "brief",
    "short description",
    "short summary",
    "short brief",
    "summary",
    "overview"
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
    "full article"
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
    "analyst opinion"
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
  ],




  metaKeywords:[
    "meta keywords",
    "keywords",
    "seo keywords",
    "tags"
  ]


};







// ============================================
// Section Priority
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


  "seoTitle",


  "metaDescription",


  "metaKeywords",


  "slug",


  "imageAlt",


  "imageCaption"


];







// ============================================
// Normalize Heading
// ============================================

function normalizeHeading(
  heading:string
):string {


  return heading

    .replace(/^#+/,"")

    .replace(/\*\*/g,"")

    .replace(/^[-*]/,"")

    .replace(/^\d+\./,"")

    .trim()

    .toLowerCase()

    .replace(
      /[:\-]+$/,
      ""
    )

    .replace(
      /\s+/g,
      " "
    );


}








// ============================================
// Clean Content
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
      /\*\*/g,
      ""
    )

    .replace(
      /^\s*[-*_]{3,}\s*$/gm,
      ""
    )

    .trim();

}








// ============================================
// Detect Section Type
// ============================================

export function detectSectionType(
  heading:string
):string|null {


  const normalized =
    normalizeHeading(
      heading
    );



  for(
    const key of Object.keys(
      SECTION_ALIASES
    )
  ){


    if(

      SECTION_ALIASES[key]
      .includes(
        normalized
      )

    ){

      return key;

    }


  }



  return null;

}








// ============================================
// Extract Sections
// ============================================

export function extractSections(
  text:string
):ParsedSection[] {


  const lines =
    text.split("\n");



  const sections:
    ParsedSection[] = [];



  let currentHeading:
    string|null = null;



  let currentContent:
    string[] = [];






  function pushSection(){


    if(

      currentHeading
      &&
      currentContent.length

    ){


      const content =
        cleanContent(
          currentContent.join("\n")
        );



      if(content){


        sections.push({

          heading:
            currentHeading,


          content

        });


      }


    }


  }






  for(
    const rawLine of lines
  ){


    const line =
      rawLine.trim();




    if(!line){

      continue;

    }




    const detected =
      detectSectionType(
        line
      );




    if(detected){


      pushSection();



      currentHeading =
        line;



      currentContent =
        [];



      continue;

    }





    if(currentHeading){

      currentContent.push(
        line
      );

    }


  }







  pushSection();



  return sections;


}









// ============================================
// Sections To Map
// ============================================

export function sectionsToMap(
  sections:ParsedSection[]
):Record<string,string>{


  const result:
    Record<string,string> = {};



  for(
    const section of sections
  ){


    const key =
      detectSectionType(
        section.heading
      );



    if(!key){

      continue;

    }




    if(
      !result[key]
    ){


      result[key] =
        section.content;



      continue;

    }





    const existingIndex =
      SECTION_PRIORITY.indexOf(
        key
      );



    if(existingIndex !== -1){


      result[key] =
        section.content;


    }


  }





  return result;


}

