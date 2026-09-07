import natural from 'natural';

export interface LanguageAndQualityResult {
  language: 'en' | 'hi' | 'unknown';
  isQualityGood: boolean;
  wordCount: number;
  issues: string[];
}

export function analyzeQualityAndLanguage(text: string, title: string): LanguageAndQualityResult {
  const issues: string[] = [];
  let isQualityGood = true;

  // 1. Language Detection (Hindi vs English)
  const hindiRegex = /[\u0900-\u097F]/;
  const language = hindiRegex.test(text) ? 'hi' : 'en';

  // 2. Word Count & Completeness
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(text) || [];
  const wordCount = tokens.length;

  if (wordCount < 50) {
    issues.push('Content is too short for deep analysis.');
    isQualityGood = false;
  }

  // 3. Clickbait / Spam Check in Title
  if (title && (title.includes('!!!') || title.toUpperCase() === title)) {
    issues.push('Title looks like clickbait or spam.');
    // isQualityGood = false; // Optional: depends on your strictness
  }

  return {
    language,
    isQualityGood,
    wordCount,
    issues
  };
}