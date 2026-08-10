// ============================================
// NationPath AI News Importer
// FAQ Parser v2 FINAL LOCK
//
// Supports:
// - Q: / A:
// - **Q:** / **A:**
// - Question: / Answer:
// - Numbered FAQ
// - Multiline answers
// - JSON FAQ arrays
// - Escaped JSON recovery
// - Markdown cleanup
// - Production-safe malformed recovery
//
// Public export preserved:
// parseFAQ()
// ============================================

import type {
  FAQItem,
} from "./types";



// ============================================
// CLEAN TEXT
// ============================================

function cleanText(
  text?: string
): string {

  if (!text) {
    return "";
  }

  return text
    .replace(/\\"/g, '"')
    .replace(/\\n/g, " ")
    .replace(/\*\*/g, "")
    .replace(/^#+\s*/, "")
    .replace(/\s+/g, " ")
    .trim();

}



// ============================================
// SAFE JSON PARSE
// ============================================

function safeParseJSON(
  value: string
): unknown {

  const text =
    value.trim();

  if (!text) {
    return null;
  }

  try {

    return JSON.parse(
      text
    );

  } catch {
    // Continue with recovery.
  }

  try {

    return JSON.parse(
      text
        .replace(/\\"/g, '"')
        .replace(/\\n/g, " ")
    );

  } catch {

    return null;

  }

}



// ============================================
// EXTRACT BALANCED JSON BLOCKS
// ============================================

function extractJSONBlocks(
  text: string
): string[] {

  const results: string[] = [];

  let start = -1;
  let depth = 0;

  let inString = false;
  let escaped = false;

  for (
    let index = 0;
    index < text.length;
    index++
  ) {

    const char =
      text[index];

    if (inString) {

      if (escaped) {

        escaped = false;
        continue;

      }

      if (char === "\\") {

        escaped = true;
        continue;

      }

      if (char === '"') {

        inString = false;

      }

      continue;

    }

    if (char === '"') {

      inString = true;
      continue;

    }

    if (
      char === "{" ||
      char === "["
    ) {

      if (depth === 0) {
        start = index;
      }

      depth++;

      continue;

    }

    if (
      char === "}" ||
      char === "]"
    ) {

      if (depth > 0) {
        depth--;
      }

      if (
        depth === 0 &&
        start !== -1
      ) {

        results.push(
          text.slice(
            start,
            index + 1
          )
        );

        start = -1;

      }

    }

  }

  return results;

}



// ============================================
// NORMALIZE FAQ ITEM
// ============================================

function normalizeFAQItem(
  value: unknown
): FAQItem | null {

  if (
    !value ||
    typeof value !== "object"
  ) {

    return null;

  }

  const source =
    value as Record<string, unknown>;

  const question =
    cleanText(
      String(
        source.question ??
        source.q ??
        source.QUESTION ??
        ""
      )
    );

  const answer =
    cleanText(
      String(
        source.answer ??
        source.a ??
        source.ANSWER ??
        ""
      )
    );

  if (
    !question ||
    !answer
  ) {

    return null;

  }

  return {

    question,

    answer,

  };

}



// ============================================
// PARSE JSON FAQ
// ============================================

function parseJSONFAQ(
  text: string
): FAQItem[] {

  const results:
    FAQItem[] = [];

  const parsed =
    safeParseJSON(
      text
    );

  if (parsed) {

    const direct =
      normalizeJSONContainer(
        parsed
      );

    results.push(
      ...direct
    );

  }

  // Recovery for surrounding text.
  if (!results.length) {

    const blocks =
      extractJSONBlocks(
        text
      );

    for (
      const block of blocks
    ) {

      const blockParsed =
        safeParseJSON(
          block
        );

      if (!blockParsed) {
        continue;
      }

      results.push(
        ...normalizeJSONContainer(
          blockParsed
        )
      );

    }

  }

  return deduplicateFAQ(
    results
  );

}



// ============================================
// NORMALIZE JSON CONTAINER
// ============================================

function normalizeJSONContainer(
value: unknown
): FAQItem[] {

  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {

    const items:
      FAQItem[] = [];

    for (
      const entry of value
    ) {

      const item =
        normalizeFAQItem(
          entry
        );

      if (item) {

        items.push(
          item
        );

      }

    }

    return items;

  }

  if (
    typeof value === "object"
  ) {

    const source =
      value as Record<string, unknown>;

    const nested =
      source.faq ??
      source.faqs ??
      source.questions ??
      source.items;

    if (
      Array.isArray(nested)
    ) {

      return normalizeJSONContainer(
        nested
      );

    }

    const item =
      normalizeFAQItem(
        source
      );

    return item
      ? [item]
      : [];

  }

  return [];

}



// ============================================
// QUESTION DETECTOR
// ============================================

function extractQuestion(
line: string
): string | null {

  const patterns = [

    /^Q\s*[:\-]\s*(.+)$/i,

    /^Question\s*[:\-]\s*(.+)$/i,

    /^\*\*Q\*\*\s*[:\-]\s*(.+)$/i,

    /^\*\*Question\*\*\s*[:\-]\s*(.+)$/i,

  ];

  for (
    const pattern of patterns
  ) {

    const match =
      line.match(
        pattern
      );

    if (match) {

      return cleanText(
        match[1]
      );

    }

  }

  return null;

}



// ============================================
// ANSWER DETECTOR
// ============================================

function extractAnswer(
line: string
): string | null {

  const patterns = [

    /^A\s*[:\-]\s*(.+)$/i,

    /^Answer\s*[:\-]\s*(.+)$/i,

    /^\*\*A\*\*\s*[:\-]\s*(.+)$/i,

    /^\*\*Answer\*\*\s*[:\-]\s*(.+)$/i,

  ];

  for (
    const pattern of patterns
  ) {

    const match =
      line.match(
        pattern
      );

    if (match) {

      return cleanText(
        match[1]
      );

    }

  }

  return null;

}



// ============================================
// PARSE Q/A FORMAT
// ============================================

function parseQAFormat(
  text: string
): FAQItem[] {

  const items:
    FAQItem[] = [];

  const lines =
    text
      .split("\n")
      .map(
        line =>
          line.trim()
      );

  let question:
    string | null = null;

  let answer:
    string[] = [];

  function save() {

    if (
      question &&
      answer.length
    ) {

      const finalAnswer =
        cleanText(
          answer.join(" ")
        );

      if (finalAnswer) {

        items.push({

          question:
            cleanText(
              question
            ),

          answer:
            finalAnswer,

        });

      }

    }

    question = null;
    answer = [];

  }

  for (
    const rawLine of lines
  ) {

    if (!rawLine) {
      continue;
    }

    const line =
      rawLine
        .replace(
          /^\*\*|\*\*$/g,
          ""
        )
        .trim();

    const detectedQuestion =
      extractQuestion(
        rawLine
      );

    if (
      detectedQuestion
    ) {

      save();

      question =
        detectedQuestion;

      continue;

    }

    const detectedAnswer =
      extractAnswer(
        rawLine
      );

    if (
      detectedAnswer &&
      question
    ) {

      answer.push(
        detectedAnswer
      );

      continue;

    }

    // Multiline answer.
    if (
      question &&
      answer.length
    ) {

      // Do not accidentally consume
      // another metadata heading.
      if (
        /^#{1,6}\s+/.test(
          rawLine
        )
      ) {

        continue;

      }

      answer.push(
        line
      );

    }

  }

  save();

  return deduplicateFAQ(
    items
  );

}



// ============================================
// PARSE NUMBERED FAQ
//
// 1. What is repo rate?
// Repo rate is...
//
// 2. Why does it matter?
// It affects...
// ============================================

function parseNumberedFormat(
  text: string
): FAQItem[] {

  const items:
    FAQItem[] = [];

  const lines =
    text
      .split("\n")
      .map(
        line =>
          line.trim()
      )
      .filter(Boolean);

  let question:
    string | null = null;

  let answer:
    string[] = [];

  function save() {

    if (
      question &&
      answer.length
    ) {

      const finalAnswer =
        cleanText(
          answer.join(" ")
        );

      if (finalAnswer) {

        items.push({

          question:
            cleanText(
              question
            ),

          answer:
            finalAnswer,

        });

      }

    }

    question = null;
    answer = [];

  }

  for (
    const line of lines
  ) {

    const match =
      line.match(
        /^\d+[\.)]\s*(.+)$/
      );

    if (match) {

      save();

      question =
        cleanText(
          match[1]
        );

      continue;

    }

    if (question) {

      answer.push(
        line
      );

    }

  }

  save();

  return deduplicateFAQ(
    items
  );

}



// ============================================
// ALTERNATIVE FAQ FORMAT
//
// Q. Question
// A. Answer
//
// Question?
// Answer.
// ============================================

function parseAlternativeFormat(
  text: string
): FAQItem[] {

  const items:
    FAQItem[] = [];

  const lines =
    text
      .split("\n")
      .map(
        line =>
          cleanText(
            line
          )
      )
      .filter(Boolean);

  let question:
    string | null = null;

  for (
    let index = 0;
    index < lines.length;
    index++
  ) {

    const line =
      lines[index];

    // Question ending with ?.
    if (
      line.endsWith("?")
    ) {

      const next =
        lines[index + 1];

      if (
        next &&
        !next.endsWith("?")
      ) {

        items.push({

          question:
            cleanText(
              line
            ),

          answer:
            cleanText(
              next
            ),

        });

        index++;

      }

      continue;

    }

    // Q. / A. fallback.
    const qMatch =
      line.match(
        /^Q\.\s*(.+)$/i
      );

    if (qMatch) {

      question =
        cleanText(
          qMatch[1]
        );

      continue;

    }

    const aMatch =
      line.match(
        /^A\.\s*(.+)$/i
      );

    if (
      aMatch &&
      question
    ) {

      items.push({

        question,

        answer:
          cleanText(
            aMatch[1]
          ),

      });

      question = null;

    }

  }

  return deduplicateFAQ(
    items
  );

}



// ============================================
// DEDUPLICATE
// ============================================

function deduplicateFAQ(
items: FAQItem[]
): FAQItem[] {

  const seen =
    new Set<string>();

  const output:
    FAQItem[] = [];

  for (
    const item of items
  ) {

    const question =
      cleanText(
        item.question
      );

    const answer =
      cleanText(
        item.answer
      );

    if (
      !question ||
      !answer
    ) {

      continue;

    }

    const key =
      (
        question +
        "|" +
        answer
      )
        .toLowerCase()
        .trim();

    if (
      seen.has(key)
    ) {

      continue;

    }

    seen.add(key);

    output.push({

      question,

      answer,

    });

  }

  return output;

}



// ============================================
// MAIN EXPORT
// ============================================

export function parseFAQ(
  rawFAQ?: string
): FAQItem[] {

  if (!rawFAQ) {
    return [];
  }

  const text =
    rawFAQ.trim();

  if (!text) {
    return [];
  }

  // 1. JSON.
  const json =
    parseJSONFAQ(
      text
    );

  if (json.length) {
    return json;
  }

  // 2. Explicit Q/A.
  const qa =
    parseQAFormat(
      text
    );

  if (qa.length) {
    return qa;
  }

  // 3. Numbered FAQ.
  const numbered =
    parseNumberedFormat(
      text
    );

  if (numbered.length) {
    return numbered;
  }

  // 4. Question-mark fallback.
  return parseAlternativeFormat(
    text
  );

}



// ============================================
// END OF FILE
// ============================================

