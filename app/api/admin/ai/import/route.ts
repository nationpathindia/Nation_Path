// ============================================
// NationPath AI News Importer
// Import API Route (Locked)
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
  request: NextRequest
) {

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



    const result =
      parseNewsImport({

        rawText:
          cleanedText

      });



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