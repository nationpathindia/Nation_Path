// ============================================
// NationPath AI News Importer
// Keywords Parser (Final Locked)
// ============================================



// ============================================
// Clean Individual Keyword
// ============================================

function cleanKeyword(
  keyword:string
):string {


  return keyword
    .replace(
      /^[-•*#]+\s*/,
      ""
    )
    .replace(
      /^keywords?\s*:/i,
      ""
    )
    .trim()
    .replace(
      /\s+/g,
      " "
    )
    .toLowerCase();

}



// ============================================
// Remove Duplicate Keywords
// ============================================

function uniqueKeywords(
  keywords:string[]
):string[] {


  return [
    ...new Set(
      keywords
        .filter(Boolean)
    )
  ];

}



// ============================================
// Validate Keyword
// ============================================

function isValidKeyword(
  keyword:string
):boolean {


  if(
    !keyword
  ){

    return false;

  }



  // remove very short noise

  if(
    keyword.length < 2
  ){

    return false;

  }



  // prevent huge paragraphs

  if(
    keyword.length > 80
  ){

    return false;

  }



  return true;

}



// ============================================
// Parse Keywords
//
// Supports:
//
// Budget 2026, India Economy
//
// - Budget 2026
// - India Economy
//
// Budget 2026 | Economy | Policy
//
// Keywords:
// Budget, Economy
// ============================================

export function parseKeywords(
  rawKeywords?:string
):string[] {


  if(
    !rawKeywords
  ){

    return [];

  }



  const text =
    rawKeywords.trim();



  if(
    !text
  ){

    return [];

  }



  const keywords =
    text
      .split(
        /,|\n|•|-|\|/
      )
      .map(
        item =>
          cleanKeyword(item)
      )
      .filter(
        isValidKeyword
      );



  return uniqueKeywords(
    keywords
  );

}