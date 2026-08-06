// ============================================
// NationPath AI News Importer
// Text Normalizer
// ============================================

import type { ImporterInput } from "./types";


/**
 * Normalize raw imported article text
 */
export function normalizeText(
  rawText: string
): string {

  if (!rawText) {
    return "";
  }


  let text = rawText;


  // Remove invisible unicode characters
  text = text.replace(
    /[\u200B-\u200D\uFEFF]/g,
    ""
  );


  // Normalize Windows line endings
  text = text.replace(
    /\r\n/g,
    "\n"
  );


  // Normalize multiple spaces
  text = text.replace(
    /[ \t]+/g,
    " "
  );


  // Remove spaces around new lines
  text = text
    .split("\n")
    .map(line => line.trim())
    .join("\n");


  // Reduce excessive blank lines
  text = text.replace(
    /\n{3,}/g,
    "\n\n"
  );


  // Normalize quotation marks
  text = text
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'");


  // Remove starting / ending whitespace
  text = text.trim();


  return text;
}


/**
 * Normalize importer input
 */
export function normalizeImporterInput(
  input: ImporterInput
): ImporterInput {

  return {
    rawText: normalizeText(input.rawText)
  };

}


/**
 * Split normalized text into lines
 */
export function getNormalizedLines(
  text:string
):string[] {

  return normalizeText(text)
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

}