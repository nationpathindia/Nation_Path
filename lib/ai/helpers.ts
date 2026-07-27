//////////////////////////////////////////////////////////////
// NATIONPATH AI HELPERS (PART 1)
// Core Utilities + Content Processing Layer
//////////////////////////////////////////////////////////////
import type { PredictionEnhancement } from "./schemas";
import type { HoroscopePrediction } from "../astro/horoscope/prediction/types";

import { randomUUID } from "crypto";
import AI_CONFIG from "./constants";

//////////////////////////////////////////////////////////////
// ID GENERATION
//////////////////////////////////////////////////////////////

export function createRequestId(): string {
  return `req_${randomUUID()}`;
}

export function createCorrelationId(): string {
  return `corr_${randomUUID()}`;
}

//////////////////////////////////////////////////////////////
// STRING UTILITIES
//////////////////////////////////////////////////////////////

export function normalizeWhitespace(input: string): string {
  return input
    .replace(/\s+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function capitalizeFirst(input: string): string {
  if (!input) return "";
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function removeExtraSpaces(input: string): string {
  return input.replace(/\s+/g, " ").trim();
}

//////////////////////////////////////////////////////////////
// SLUG GENERATION
//////////////////////////////////////////////////////////////

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120);
}

//////////////////////////////////////////////////////////////
// MARKDOWN CLEANING
//////////////////////////////////////////////////////////////

export function stripMarkdown(input: string): string {
  return input
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/#{1,6}\s/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1");
}

export function cleanMarkdown(input: string): string {
  return normalizeWhitespace(stripMarkdown(input));
}

//////////////////////////////////////////////////////////////
// TEXT ANALYTICS
//////////////////////////////////////////////////////////////

export function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  const wpm = 200;
  return Math.max(1, Math.ceil(words / wpm));
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

export function generateExcerpt(text: string, maxLength = 160): string {
  const cleaned = cleanMarkdown(text);
  return truncateText(cleaned, maxLength);
}

export function extractKeywords(text: string, limit = 10): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .split(/\s+/)
    .filter(w => w.length > 3);

  const frequency: Record<string, number> = {};

  for (const word of words) {
    frequency[word] = (frequency[word] || 0) + 1;
  }

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word]) => word);
}

//////////////////////////////////////////////////////////////
// CONTENT NORMALIZATION
//////////////////////////////////////////////////////////////

export function removeDuplicateParagraphs(text: string): string {
  const seen = new Set<string>();

  return text
    .split("\n")
    .filter(line => {
      const normalized = line.trim().toLowerCase();
      if (!normalized || seen.has(normalized)) return false;
      seen.add(normalized);
      return true;
    })
    .join("\n");
}

export function normalizeTitle(title: string): string {
  return capitalizeFirst(normalizeWhitespace(title));
}

//////////////////////////////////////////////////////////////
// URL HELPERS
//////////////////////////////////////////////////////////////

export function absoluteUrl(path: string): string {
  return `${AI_CONFIG.BRAND.DOMAIN}${path.startsWith("/") ? path : `/${path}`}`;
}

export function generateCanonicalUrl(slug: string): string {
  return absoluteUrl(`/news/${slug}`);
}
//////////////////////////////////////////////////////////////
// NATIONPATH AI HELPERS (PART 2)
// AI Execution Utilities + Reliability Layer
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// SAFE JSON UTILITIES
//////////////////////////////////////////////////////////////

export function safeJSONParse<T>(input: string, fallback: T): T {
  try {
    return JSON.parse(input) as T;
  } catch {
    return fallback;
  }
}

export function safeJSONStringify(input: unknown): string {
  try {
    return JSON.stringify(input);
  } catch {
    return "{}";
  }
}

//////////////////////////////////////////////////////////////
// RETRY SYSTEM
//////////////////////////////////////////////////////////////

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function exponentialBackoff<T>(
  fn: () => Promise<T>,
  retries = AI_CONFIG.RETRIES,
  delay = AI_CONFIG.RETRY_DELAY
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;

      if (attempt < retries) {
        const backoff = delay * Math.pow(2, attempt);
        await sleep(backoff);
      }
    }
  }

  throw lastError;
}

//////////////////////////////////////////////////////////////
// PROMPT UTILITIES
//////////////////////////////////////////////////////////////

export function injectVariables(
  template: string,
  variables: Record<string, string | number>
): string {
  let result = template;

  for (const [key, value] of Object.entries(variables)) {
    result = result.replace(new RegExp(`{{${key}}}`, "g"), String(value));
  }

  return result;
}

export function joinPromptSections(sections: string[]): string {
  return sections.filter(Boolean).join("\n\n");
}

export function normalizePrompt(prompt: string): string {
  return normalizeWhitespace(prompt);
}

//////////////////////////////////////////////////////////////
// EXECUTION TIMER
//////////////////////////////////////////////////////////////

export async function measureExecution<T>(
  fn: () => Promise<T>
): Promise<{ result: T; durationMs: number }> {
  const start = Date.now();
  const result = await fn();
  const durationMs = Date.now() - start;

  return { result, durationMs };
}

//////////////////////////////////////////////////////////////
// ERROR HANDLING
//////////////////////////////////////////////////////////////

export function serializeError(error: unknown): string {
  if (error instanceof Error) {
    return JSON.stringify({
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
  }

  return String(error);
}

export function safeError(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error";
}

//////////////////////////////////////////////////////////////
// RESPONSE HELPERS (OpenAI SDK v6 compatible)
//////////////////////////////////////////////////////////////

export function extractResponseText(response: any): string {
  try {
    return response.output_text || response.output?.[0]?.content?.[0]?.text || "";
  } catch {
    return "";
  }
}

export function extractUsage(response: any): {
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
} {
  try {
    return {
      inputTokens: response.usage?.input_tokens,
      outputTokens: response.usage?.output_tokens,
      totalTokens: response.usage?.total_tokens,
    };
  } catch {
    return {};
  }
}

export function getModel(response: any): string {
  return response.model || AI_CONFIG.MODEL;
}

export function isResponseSuccessful(response: any): boolean {
  return Boolean(response && !response.error);
}

//////////////////////////////////////////////////////////////
// PROMPT BUILD HELPERS
//////////////////////////////////////////////////////////////

export function buildSystemPrompt(base: string, extras: string[] = []): string {
  return joinPromptSections([base, ...extras]);
}

export function buildUserPrompt(content: string, context?: string): string {
  if (!context) return content;

  return joinPromptSections([
    `Context:\n${context}`,
    `Task:\n${content}`,
  ]);
}



//////////////////////////////////////////////////////////////
// EXPORT GROUP
//////////////////////////////////////////////////////////////

export default {
  // string
  normalizeWhitespace,
  stripMarkdown,
  cleanMarkdown,

  // slug
  generateSlug,

  // text
  estimateReadingTime,
  generateExcerpt,
  extractKeywords,

  // retry
  sleep,
  exponentialBackoff,

  // json
  safeJSONParse,
  safeJSONStringify,

  // prompt
  injectVariables,
  buildSystemPrompt,
  buildUserPrompt,

  // response
  extractResponseText,
  extractUsage,
  isResponseSuccessful,

  // error
  serializeError,
  safeError,
};