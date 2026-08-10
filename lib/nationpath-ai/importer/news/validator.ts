// ============================================
// NationPath AI News Importer
// Article Validator v6.1 ENHANCED LOCK
//
// Validates:
// - Core Article (blocking)
// - Editorial Intelligence (warning)
// - SEO Intelligence (warning)
// - AI Intelligence (warning)
// - Media Intelligence (warning)
//
// Optional intelligence fields
// will never block import.
//
// Human review required.
// No auto publish.
// ============================================


import type {

  ParsedArticle,

  ValidationResult,

  FAQItem,

  TimelineItem,

  FactCheckItem

} from "./types";




// ============================================
// Helpers
// ============================================

function uniqueMessages(
  items:string[]
):string[] {

  return [
    ...new Set(items)
  ];

}



function hasText(
  value?:string
):boolean {

  return Boolean(
    value &&
    value.trim().length > 0
  );

}



function hasMinimumLength(
  text:string | undefined,
  length:number
):boolean {

  return Boolean(
    text &&
    text.trim().length >= length
  );

}




// ============================================
// FAQ Validation
// ============================================

function validateFAQ(
  faq?:FAQItem[]
):string[] {

  const errors:string[] = [];


  if(!Array.isArray(faq)){

    return errors;

  }



  for(const item of faq){


    if(
      !hasText(item.question)
      ||
      !hasText(item.answer)
    ){

      errors.push(
        "Invalid FAQ item found"
      );

    }


  }


  return errors;

}




// ============================================
// Timeline Validation
// ============================================

function validateTimeline(
  timeline?:TimelineItem[]
):string[] {


  const errors:string[] = [];


  if(!Array.isArray(timeline)){

    return errors;

  }



  for(const item of timeline){


    if(
      !hasText(item.title)
    ){

      errors.push(
        "Invalid timeline item found"
      );

    }


  }


  return errors;

}




// ============================================
// Fact Check Validation
// ============================================

function validateFactCheck(
  factCheck?:FactCheckItem[]
):string[] {


  const errors:string[] = [];


  if(!Array.isArray(factCheck)){

    return errors;

  }



  for(const item of factCheck){


    if(
      !hasText(item.claim)
    ){

      errors.push(
        "Invalid fact check item found"
      );

    }


  }


  return errors;

}





// ============================================
// MAIN VALIDATOR
// ============================================

export function validateArticle(

  article:ParsedArticle

):ValidationResult {


  const errors:string[] = [];

  const warnings:string[] = [];





  // ==================================
  // CORE ARTICLE
  // Blocking
  // ==================================


  if(

    !hasText(article.headline)

    &&

    !hasText(article.seoTitle)

  ){

    errors.push(
      "Article title/headline missing"
    );

  }



  if(
    !hasText(article.body)
  ){

    errors.push(
      "Article body missing"
    );

  }


  else if(

    !hasMinimumLength(
      article.body,
      100
    )

  ){

    warnings.push(
      "Article body is short"
    );

  }







  // ==================================
  // SEO
  // Warning Only
  // ==================================


  if(
    !hasText(article.seoTitle)
  ){

    warnings.push(
      "SEO title missing"
    );

  }



  if(

    article.seoTitle

    &&

    article.seoTitle.length > 70

  ){

    warnings.push(
      "SEO title length exceeds recommended limit"
    );

  }



  if(
    !hasText(article.metaDescription)
  ){

    warnings.push(
      "Meta description missing"
    );

  }



  if(

    !article.metaKeywords

    ||

    article.metaKeywords.length===0

  ){

    warnings.push(
      "SEO keywords missing"
    );

  }







  // ==================================
  // Editorial Intelligence
  // Warning Only
  // ==================================


  if(
    !hasText(article.background)
  ){

    warnings.push(
      "Background context missing"
    );

  }



  if(

    !article.keyHighlights

    ||

    article.keyHighlights.length===0

  ){

    warnings.push(
      "Key highlights missing"
    );

  }







  // ==================================
  // AI Intelligence
  // Warning Only
  // ==================================


  if(
    !article.quality
  ){

    warnings.push(
      "AI quality assessment missing"
    );

  }



  if(
    !article.headlineIntelligence
  ){

    warnings.push(
      "Headline intelligence missing"
    );

  }







  // ==================================
  // Media Intelligence
  // Warning Only
  // ==================================


  if(

    !article.imageGallery

    ||

    article.imageGallery.length===0

  ){

    warnings.push(
      "Image gallery not generated"
    );

  }







  // ==================================
  // Structured Validation
  // ==================================


  errors.push(
    ...validateFAQ(
      article.faq
    )
  );



  errors.push(
    ...validateTimeline(
      article.timeline
    )
  );



  errors.push(
    ...validateFactCheck(
      article.factCheck
    )
  );







  return {


    valid:

      uniqueMessages(errors).length===0,


    errors:

      uniqueMessages(errors),


    warnings:

      uniqueMessages(warnings)


  };


}