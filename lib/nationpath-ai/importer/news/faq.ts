// ============================================
// NationPath AI News Importer
// FAQ Parser (Enhanced)
// ============================================

import type { FAQItem } from "./types";



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
// Q/A Parser
// Supports:
//
// Q: Question
// A: Answer
//
// Q: Question
// A: Answer
//
// Blank lines optional
// ============================================

function parseQAFormat(
  text:string
):FAQItem[] {


  const items:FAQItem[] = [];


  const lines =
    text
      .split("\n")
      .map(
        line => line.trim()
      )
      .filter(
        Boolean
      );



  let question:string | null = null;

  let answer:string[] = [];



  function save(){


    if(
      question &&
      answer.length
    ){

      items.push({

        question:
          cleanText(
            question
          ),


        answer:
          cleanText(
            answer.join(" ")
          )

      });

    }


  }



  for(
    const line of lines
  ){



    const questionMatch =
      line.match(
        /^Q[:\-]\s*(.+)/i
      );



    const answerMatch =
      line.match(
        /^A[:\-]\s*(.+)/i
      );




    if(
      questionMatch
    ){


      save();


      question =
        questionMatch[1];


      answer = [];


      continue;

    }




    if(
      answerMatch &&
      question
    ){


      answer.push(
        answerMatch[1]
      );


      continue;

    }




    if(
      question &&
      answer.length
    ){

      answer.push(
        line
      );

    }


  }



  save();



  return items;

}



// ============================================
// Numbered FAQ Parser
//
// 1. Question
// Answer
//
// 2. Question
// Answer
// ============================================

function parseNumberedFormat(
  text:string
):FAQItem[] {


  const items:FAQItem[] = [];


  const lines =
    text
      .split("\n")
      .map(
        line => line.trim()
      )
      .filter(
        Boolean
      );



  let currentQuestion:string | null = null;

  let currentAnswer:string[] = [];



  function save(){


    if(
      currentQuestion &&
      currentAnswer.length
    ){


      items.push({

        question:
          cleanText(
            currentQuestion
          ),


        answer:
          cleanText(
            currentAnswer.join(" ")
          )

      });


    }


  }




  for(
    const line of lines
  ){


    const match =
      line.match(
        /^\d+[\.\)]\s*(.+)/
      );



    if(match){


      save();


      currentQuestion =
        match[1];


      currentAnswer = [];


      continue;

    }



    if(currentQuestion){

      currentAnswer.push(
        line
      );

    }


  }



  save();



  return items;

}



// ============================================
// Main FAQ Parser
// ============================================

export function parseFAQ(
  rawFAQ?:string
):FAQItem[] {


  if(
    !rawFAQ
  ){

    return [];

  }



  const text =
    rawFAQ.trim();



  if(
    !text
  ){

    return [];

  }



  const qa =
    parseQAFormat(
      text
    );



  if(
    qa.length
  ){

    return qa;

  }



  return parseNumberedFormat(
    text
  );

}