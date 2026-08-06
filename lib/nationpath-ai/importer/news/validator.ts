// ============================================
// NationPath AI News Importer
// Article Validator v5 FINAL LOCK
//
// Validates:
// - Core Article
// - Editorial Intelligence
// - SEO
// - AI Quality
// - Media Intelligence
//
// No auto publish.
// Human review required.
// ============================================


import type {

  ParsedArticle,

  ValidationResult

} from "./types";





// ============================================
// Slug Validation
// ============================================

function isValidSlug(

  slug?:string

):boolean {


  if(!slug){

    return false;

  }


  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(
    slug
  );


}







// ============================================
// Text Length Helper
// ============================================

function hasMinimumLength(

  text:string | undefined,

  length:number

):boolean {


  if(!text){

    return false;

  }


  return text.trim().length >= length;


}







// ============================================
// FAQ Validation
// ============================================

function validateFAQ(

  faq?:ParsedArticle["faq"]

):string[] {


  const errors:string[] = [];



  if(!faq){

    return errors;

  }




  for(
    const item of faq
  ){


    if(

      !item.question ||

      !item.answer

    ){

      errors.push(
        "Invalid FAQ item found"
      );

    }



    if(

      item.question &&

      item.question.length > 200

    ){

      errors.push(
        "FAQ question too long"
      );

    }


  }




  return errors;


}







// ============================================
// Timeline Validation
// ============================================

function validateTimeline(

  timeline?:ParsedArticle["timeline"]

):string[] {


  const errors:string[] = [];



  if(!timeline){

    return errors;

  }




  for(
    const item of timeline
  ){


    if(
      !item.title
    ){

      errors.push(
        "Invalid timeline item found"
      );

    }


  }



  return errors;


}







// ============================================
// Expert Opinion Validation
// ============================================

function validateExpertOpinion(

  article:ParsedArticle

):string[] {


  const errors:string[] = [];



  if(
    !article.expertOpinion
  ){

    return errors;

  }



  for(
    const item of article.expertOpinion
  ){


    if(
      !item.opinion
    ){

      errors.push(
        "Invalid expert opinion item found"
      );

    }


  }



  return errors;


}







// ============================================
// Fact Check Validation
// ============================================

function validateFactCheck(

  article:ParsedArticle

):string[] {


  const errors:string[] = [];



  if(
    !article.factCheck
  ){

    return errors;

  }



  for(
    const item of article.factCheck
  ){


    if(
      !item.claim
    ){

      errors.push(
        "Invalid fact check item found"
      );

    }


  }



  return errors;


}







// ============================================
// Duplicate Protection
// ============================================

function uniqueMessages(

  items:string[]

):string[] {


  return [

    ...new Set(items)

  ];

}







// ============================================
// Main Validator
// ============================================

export function validateArticle(

  article:ParsedArticle

):ValidationResult {


  let errors:string[] = [];

  let warnings:string[] = [];





  // ==================================
  // Core Article
  // ==================================


  if(

    !article.headline &&

    !article.seoTitle

  ){

    errors.push(
      "Article title/headline missing"
    );

  }






  if(
    !article.body
  ){

    errors.push(
      "Article body missing"
    );

  }

  else if(

    !hasMinimumLength(

      article.body,

      50

    )

  ){

    warnings.push(
      "Article body is very short"
    );

  }







  // ==================================
  // Slug
  // ==================================


  if(

    article.slug &&

    !isValidSlug(

      article.slug

    )

  ){

    errors.push(
      "Invalid slug format"
    );

  }








  // ==================================
  // SEO
  // ==================================


  if(

    article.seoTitle &&

    article.seoTitle.length > 70

  ){

    warnings.push(
      "SEO title length exceeds recommended limit"
    );

  }




  if(

    article.metaDescription &&

    article.metaDescription.length > 170

  ){

    warnings.push(
      "Meta description length exceeds recommended limit"
    );

  }




  if(

    !article.metaKeywords ||

    article.metaKeywords.length === 0

  ){

    warnings.push(
      "SEO keywords missing"
    );

  }








  // ==================================
  // Editorial Intelligence
  // ==================================


  if(

    !article.keyHighlights &&

    !article.keyTakeaways

  ){

    warnings.push(
      "Article takeaways missing"
    );

  }




  if(
    !article.background
  ){

    warnings.push(
      "Background context missing"
    );

  }




  if(
    !article.sourceDesk
  ){

    warnings.push(
      "Source desk information missing"
    );

  }








  // ==================================
  // AI Intelligence
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
  // ==================================


  if(

    !article.imageGallery ||

    article.imageGallery.length === 0

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

    ...validateExpertOpinion(

      article

    )

  );



  errors.push(

    ...validateFactCheck(

      article

    )

  );








  errors =
    uniqueMessages(
      errors
    );


  warnings =
    uniqueMessages(
      warnings
    );





  return {


    valid:

      errors.length === 0,



    errors,



    warnings



  };


}

