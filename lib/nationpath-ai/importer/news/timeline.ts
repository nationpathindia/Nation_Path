// ============================================
// NationPath AI News Importer
// Timeline Parser (Final Locked)
// ============================================

import type { TimelineItem } from "./types";



// ============================================
// Clean Text
// ============================================

function cleanText(
  text:string
):string {

  return text
    .trim()
    .replace(/\s+/g," ");

}



// ============================================
// Extract Date
//
// Priority:
// 15 March 2025
// March 2025
// Jan 2026
// Q1 2026
// 15/03/2025
// 2025
// ============================================

function extractDate(
  text:string
):string | undefined {


  const patterns = [


    // 15 March 2025
    /\b\d{1,2}\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\b/i,


    // March 2025
    /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\b/i,


    // Jan 2026
    /\b(Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}\b/i,


    // Q1 2026
    /\bQ[1-4]\s?\d{4}\b/i,


    // 15/03/2025
    /\b\d{1,2}\/\d{1,2}\/\d{4}\b/,


    // Year only
    /\b\d{4}\b/

  ];



  for(
    const pattern of patterns
  ){


    const match =
      text.match(
        pattern
      );


    if(
      match
    ){

      return match[0];

    }

  }



  return undefined;

}



// ============================================
// Remove Date From Title
// ============================================

function removeDate(
  text:string,
  date?:string
):string {


  if(
    !date
  ){

    return cleanText(text);

  }



  return cleanText(
    text.replace(
      date,
      ""
    )
  );

}



// ============================================
// Parse Single Timeline Line
// ============================================

function parseLine(
  line:string
):TimelineItem | null {


  let clean =
    line
      .replace(
        /^[-•*]\s*/,
        ""
      )
      .replace(
        /^\d+[\.\)]\s*/,
        ""
      )
      .trim();



  if(
    !clean
  ){

    return null;

  }



  const parts =
    clean.split(
      /\s[-–—:]\s/
    );



  let date:string | undefined;

  let title:string;



  if(
    parts.length >= 2
  ){


    const first =
      parts.shift() || "";



    const remaining =
      parts.join(
        " - "
      );



    date =
      extractDate(
        first
      );



    title =
      cleanText(
        remaining
      );


  }
  else {


    date =
      extractDate(
        clean
      );


    title =
      removeDate(
        clean,
        date
      );

  }



  if(
    !title
  ){

    title =
      cleanText(
        clean
      );

  }



  return {

    date,

    title

  };

}



// ============================================
// Main Timeline Parser
// ============================================

export function parseTimeline(
  rawTimeline?:string
):TimelineItem[] {


  if(
    !rawTimeline
  ){

    return [];

  }



  const text =
    rawTimeline.trim();



  if(
    !text
  ){

    return [];

  }



  const items:TimelineItem[] = [];



  const lines =
    text
      .split("\n")
      .map(
        line =>
          line.trim()
      )
      .filter(
        Boolean
      );



  for(
    const line of lines
  ){


    const item =
      parseLine(
        line
      );


    if(
      item
    ){

      items.push(
        item
      );

    }

  }



  return items;

}