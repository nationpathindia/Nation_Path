// ============================================
// NationPath AI News Importer
// Timeline Parser v7 FINAL LOCK
//
// Supports:
// - JSON timeline arrays
// - Individual JSON objects
// - Escaped / nested JSON
// - Markdown timeline lines
// - Bullet timelines
// - Date extraction
// - Multiline descriptions
// - Production-safe malformed recovery
//
// Public export preserved:
// parseTimeline()
// ============================================

import type {
  TimelineItem,
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
    .replace(/\\r/g, " ")
    .replace(/\*\*/g, "")
    .replace(/^["']+|["']+$/g, "")
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
    return JSON.parse(text);
  } catch {
    // Try escaped JSON recovery.
  }

  try {

    const repaired =
      text
        .replace(/\\"/g, '"')
        .replace(/\\n/g, " ")
        .replace(/\\r/g, " ");

    return JSON.parse(repaired);

  } catch {
    return null;
  }
}



// ============================================
// EXTRACT BALANCED JSON BLOCKS
// ============================================
//
// Handles:
//
// {"date":"2026","title":"..."}
//
// [
//   {...},
//   {...}
// ]
//
// Unlike a simple regex, this respects
// nested braces and quoted strings.
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
// EXTRACT DATE
// ============================================

function extractDate(
  text: string
): string | undefined {

  const patterns = [

    /\b\d{1,2}\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\b/i,

    /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\b/i,

    /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.?\s+\d{4}\b/i,

    /\bQ[1-4]\s?\d{4}\b/i,

    /\b\d{1,2}\/\d{1,2}\/\d{4}\b/,

    /\b\d{4}\b/

  ];

  for (
    const pattern of patterns
  ) {

    const match =
      text.match(pattern);

    if (match) {
      return match[0];
    }

  }

  return undefined;
}



// ============================================
// NORMALIZE TIMELINE ITEM
// ============================================

function normalizeTimelineItem(
  item: unknown
): TimelineItem | null {

  if (
    !item ||
    typeof item !== "object"
  ) {

    return null;
  }

  const source =
    item as Record<string, unknown>;

  const date =
    cleanText(
      String(
        source.date ??
        source.year ??
        ""
      )
    );

  const title =
    cleanText(
      String(
        source.title ??
        source.event ??
        ""
      )
    );

  const description =
    cleanText(
      String(
        source.description ??
        source.details ??
        source.summary ??
        ""
      )
    );

  // If title is missing but description exists,
  // use description as the timeline title.
  const finalTitle =
    title ||
    description;

  if (!finalTitle) {
    return null;
  }

  return {

    ...(date
      ? {
          date,
        }
      : {}),

    title:
      finalTitle,

    ...(description &&
      description !== finalTitle
      ? {
          description,
        }
      : {}),

  };

}



// ============================================
// RECURSIVE JSON NORMALIZER
// ============================================

function collectTimelineItems(
  value: unknown
): TimelineItem[] {

  if (!value) {
    return [];
  }

  // String may itself contain JSON.
  if (
    typeof value === "string"
  ) {

    const text =
      value.trim();

    if (!text) {
      return [];
    }

    const parsed =
      safeParseJSON(text);

    if (parsed) {
      return collectTimelineItems(
        parsed
      );
    }

    return [];
  }

  // Array of timeline objects.
  if (Array.isArray(value)) {

    const items:
      TimelineItem[] = [];

    for (
      const entry of value
    ) {

      items.push(
        ...collectTimelineItems(
          entry
        )
      );

    }

    return items;
  }

  if (
    typeof value === "object"
  ) {

    const source =
      value as Record<string, unknown>;

    // Common nested AI structures.
    const nested =
      source.timeline ??
      source.items ??
      source.events ??
      source.data;

    if (
      Array.isArray(nested) ||
      typeof nested === "string"
    ) {

      const nestedItems =
        collectTimelineItems(
          nested
        );

      if (
        nestedItems.length
      ) {

        return nestedItems;
      }

    }

    const item =
      normalizeTimelineItem(
        source
      );

    return item
      ? [item]
      : [];
  }

  return [];
}



// ============================================
// PARSE JSON TIMELINE
// ============================================

function parseJSONTimeline(
  text: string
): TimelineItem[] {

  const items:
    TimelineItem[] = [];

  // First attempt: entire block.
  const parsed =
    safeParseJSON(
      text
    );

  if (parsed) {

    items.push(
      ...collectTimelineItems(
        parsed
      )
    );

  }

  // Recovery: locate balanced JSON blocks
  // when the section contains surrounding text.
  if (!items.length) {

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

      items.push(
        ...collectTimelineItems(
          blockParsed
        )
      );

    }

  }

  return deduplicateTimeline(
    items
  );
}



// ============================================
// PARSE DATE + TITLE FROM LINE
// ============================================

function parseLine(
  line: string
): TimelineItem | null {

  let clean =
    line
      .replace(
        /^\s*[-•*]\s*/,
        ""
      )
      .replace(
        /^\s*\d+[.)]\s*/,
        ""
      )
      .trim();

  if (!clean) {
    return null;
  }

  // Markdown bold cleanup.
  clean =
    clean.replace(
      /\*\*/g,
      ""
    );

  // Common formats:
  //
  // 2026 - RBI maintained...
  // 2026: RBI maintained...
  // 2026 — RBI maintained...
  // January 2026 - RBI...
  //
  const separatorMatch =
    clean.match(
      /^(.{1,40}?)\s*[-–—:]\s+(.+)$/
    );

  if (separatorMatch) {

    const possibleDate =
      extractDate(
        separatorMatch[1]
      );

    if (possibleDate) {

      const title =
        cleanText(
          separatorMatch[2]
        );

      if (!title) {
        return null;
      }

      return {

        date:
          possibleDate,

        title,

      };

    }

  }

  const date =
    extractDate(
      clean
    );

  let title =
    clean;

  if (date) {

    title =
      cleanText(
        clean
          .replace(
            date,
            ""
          )
          .replace(
            /^[-–—:|]+\s*/,
            ""
          )
      );

  }

  if (!title) {
    title = clean;
  }

  return {

    ...(date
      ? {
          date,
        }
      : {}),

    title:
      cleanText(
        title
      ),

  };

}



// ============================================
// MULTILINE MARKDOWN RECOVERY
// ============================================

function parseMarkdownTimeline(
  text: string
): TimelineItem[] {

  const lines =
    text
      .split("\n")
      .map(
        line =>
          line.trim()
      )
      .filter(Boolean);

  const items:
    TimelineItem[] = [];

  let current:
    TimelineItem | null = null;

  for (
    const line of lines
  ) {

    // Skip markdown headings.
    if (
      /^#{1,6}\s+/.test(
        line
      )
    ) {
      continue;
    }

    // Structured bullet/date line.
    const parsed =
      parseLine(
        line
      );

    if (!parsed) {
      continue;
    }

    // If the line contains a clear date,
    // start a new timeline item.
    if (parsed.date) {

      if (current) {
        items.push(
          current
        );
      }

      current =
        parsed;

      continue;
    }

    // A line without a date can be a continuation
    // of the previous timeline event.
    if (current) {

      current = {

        ...current,

        description:
          cleanText(
            [
              current.description,
              parsed.title,
            ]
              .filter(Boolean)
              .join(" ")
          ),

      };

    } else {

      items.push(
        parsed
      );

    }

  }

  if (current) {
    items.push(
      current
    );
  }

  return deduplicateTimeline(
    items
  );
}



// ============================================
// DEDUPLICATE
// ============================================

function deduplicateTimeline(
  items: TimelineItem[]
): TimelineItem[] {

  const seen =
    new Set<string>();

  const output:
    TimelineItem[] = [];

  for (
    const item of items
  ) {

    const key =
      [
        item.date || "",
        item.title || "",
        item.description || "",
      ]
        .join("|")
        .toLowerCase()
        .trim();

    if (!key) {
      continue;
    }

    if (
      seen.has(key)
    ) {
      continue;
    }

    seen.add(key);

    output.push(
      item
    );

  }

  return output;
}



// ============================================
// MAIN EXPORT
// ============================================

export function parseTimeline(
  rawTimeline?: string
): TimelineItem[] {

  if (!rawTimeline) {
    return [];
  }

  const text =
    rawTimeline.trim();

  if (!text) {
    return [];
  }

  // 1. JSON first.
  const jsonItems =
    parseJSONTimeline(
      text
    );

  if (
    jsonItems.length
  ) {

    return jsonItems;
  }

  // 2. Markdown / bullet fallback.
  return parseMarkdownTimeline(
    text
  );
}



// ============================================
// END OF FILE
// ============================================

