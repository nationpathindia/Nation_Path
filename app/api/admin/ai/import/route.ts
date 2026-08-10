// ============================================
// NationPath AI News Importer
// Import API Route (Debug Lock)
// ============================================

import { NextRequest, NextResponse } from "next/server";

import {
  parseNewsImport
} from "@/lib/nationpath-ai/importer/news/parser";


// ============================================
// POST
// /api/admin/ai/import
// ============================================

export async function POST(
  request:NextRequest
){

try {


const body =
  await request.json();



const rawText =
  body?.rawText;



if(
  !rawText ||
  typeof rawText !== "string"
){

  return NextResponse.json(

    {
      success:false,
      error:"rawText is required"
    },

    {
      status:400
    }

  );

}



const cleanedText =
  rawText.trim();



if(
  !cleanedText
){

  return NextResponse.json(

    {
      success:false,
      error:"rawText cannot be empty"
    },

    {
      status:400
    }

  );

}



console.log(
  "========== AI IMPORT START =========="
);


console.log(
  "RAW TEXT LENGTH:",
  cleanedText.length
);



const result =
  parseNewsImport({

    rawText:
      cleanedText

  });

console.log(
  "PARSED ARTICLE DEBUG",
  JSON.stringify(
    result,
    null,
    2
  )
);

console.log(
  "========== AI IMPORT RESULT =========="
);


console.log(
  JSON.stringify(
    result,
    null,
    2
  )
);



if(
  result.validation
){

console.log(
  "========== VALIDATION =========="
);


console.log(
  JSON.stringify(
    result.validation,
    null,
    2
  )
);

}



if(
  result.article
){

console.log(
  "========== CMS ARTICLE =========="
);


console.log(
  JSON.stringify(
    result.article,
    null,
    2
  )
);

}



return NextResponse.json(

  result,

  {
    status:
      result.success
      ? 200
      : 422
  }

);



}
catch(error){


console.error(
  "NationPath AI Import Error:",
  error
);



return NextResponse.json(

  {

    success:false,

    error:
      error instanceof Error
      ? error.message
      : "Import failed"

  },

  {
    status:500
  }

);



}

}