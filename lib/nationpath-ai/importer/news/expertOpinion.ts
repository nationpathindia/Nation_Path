// ============================================
// NationPath AI News Importer
// Expert Opinion Parser v1
//
// Supports:
// - Markdown expert blocks
// - Name / designation / organization
// - Opinion multiline text
// - AI generated structured text
// ============================================

import type {
  ExpertOpinionItem
} from "./types";



// ============================================
// Clean Text
// ============================================

function cleanText(
  text:string
):string {

  return text
    .replace(/\*\*/g,"")
    .replace(/\\"/g,'"')
    .replace(/\s+/g," ")
    .trim();

}



// ============================================
// JSON Extraction
// ============================================

function extractJSON(
  text:string
):any[] {


  const results:any[] = [];


  const matches =
    text.match(
      /\{[\s\S]*?\}/g
    );



  if(!matches){

    return [];

  }



  for(
    const item of matches
  ){

    try{

      results.push(
        JSON.parse(
          item
        )
      );


    }catch{


      try{

        results.push(

          JSON.parse(
            item.replace(
              /\\"/g,
              '"'
            )
          )

        );


      }catch{

        continue;

      }

    }

  }



  return results;

}



// ============================================
// Parse JSON Expert Opinion
// ============================================

function parseJSONExpert(
  raw:string
):ExpertOpinionItem[] {


  const result:
    ExpertOpinionItem[] = [];



  const objects =
    extractJSON(
      raw
    );



  for(
    const object of objects
  ){


    const opinion =
      cleanText(
        String(
          object.opinion ||
          object.comment ||
          ""
        )
      );



    if(
      !opinion
    ){

      continue;

    }



    result.push({

      name:

        cleanText(
          String(
            object.name ||
            ""
          )
        ),


      designation:

        cleanText(
          String(
            object.designation ||
            ""
          )
        ),


      organization:

        cleanText(
          String(
            object.organization ||
            ""
          )
        ),


      opinion

    });

  }



  return result;

}



// ============================================
// Parse Markdown Expert Opinion
// ============================================

function parseMarkdownExpert(
  raw:string
):ExpertOpinionItem[] {


  const items:
    ExpertOpinionItem[] = [];



  let current:
    Partial<ExpertOpinionItem> = {};



  function push(){


    if(
      current.opinion
    ){


      items.push({

        name:
          current.name,


        designation:
          current.designation,


        organization:
          current.organization,


        opinion:
          current.opinion

      });

    }



    current = {};

  }




  const lines =
    raw
      .split("\n")
      .map(
        line =>
          cleanText(
            line
          )
      )
      .filter(
        Boolean
      );



  for(
    const line of lines
  ){



    if(
      /^name\s*:/i.test(
        line
      )
    ){


      current.name =
        line.replace(
          /^name\s*:/i,
          ""
        ).trim();


      continue;

    }



    if(
      /^designation\s*:/i.test(
        line
      )
    ){


      current.designation =
        line.replace(
          /^designation\s*:/i,
          ""
        ).trim();


      continue;

    }



    if(
      /^organization\s*:/i.test(
        line
      )
    ){


      current.organization =
        line.replace(
          /^organization\s*:/i,
          ""
        ).trim();


      continue;

    }



    if(
      /^opinion\s*:/i.test(
        line
      )
    ){


      current.opinion =
        line.replace(
          /^opinion\s*:/i,
          ""
        ).trim();


      continue;

    }



    // multiline opinion support

    if(
      current.opinion
    ){

      current.opinion +=
        " " +
        line;

    }

  }



  push();



  return items;

}



// ============================================
// Main Export
// ============================================

export function parseExpertOpinion(
  rawExpertOpinion?:string
):ExpertOpinionItem[] {


  if(
    !rawExpertOpinion
  ){

    return [];

  }



  const text =
    rawExpertOpinion.trim();



  if(
    !text
  ){

    return [];

  }



  const jsonResult =
    parseJSONExpert(
      text
    );



  if(
    jsonResult.length
  ){

    return jsonResult;

  }



  return parseMarkdownExpert(
    text
  );

}