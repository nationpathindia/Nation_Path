import { z } from "zod";

//////////////////////////////////////////////////////////////
// REMOVE MARKDOWN
//////////////////////////////////////////////////////////////

export function stripMarkdown(text: string): string {
  return text
    .replace(/^```json/i, "")
    .replace(/^```/i, "")
    .replace(/```$/i, "")
    .trim();
}

//////////////////////////////////////////////////////////////
// FIND JSON
//////////////////////////////////////////////////////////////

export function extractJSON(text: string): string {
  const cleaned = stripMarkdown(text);

  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("JSON object not found.");
  }

  return cleaned.slice(start, end + 1);
}

//////////////////////////////////////////////////////////////
// SAFE JSON PARSER
//////////////////////////////////////////////////////////////

export function parseJSON<T>(text: string): T {
  try {
    return JSON.parse(extractJSON(text)) as T;
  } catch (error) {
    throw new Error(
      `Invalid AI JSON Response.\n${
        error instanceof Error ? error.message : "Unknown Error"
      }`
    );
  }
}

//////////////////////////////////////////////////////////////
// ZOD VALIDATION
//////////////////////////////////////////////////////////////

export function validateSchema<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new Error(
      JSON.stringify(result.error.flatten(), null, 2)
    );
  }

  return result.data;
}

//////////////////////////////////////////////////////////////
// COMPLETE AI PARSER
//////////////////////////////////////////////////////////////

export function parseAIResponse<T>(
  text: string,
  schema: z.ZodSchema<T>
): T {
  const json = parseJSON(text);

  return validateSchema(schema, json);
}

//////////////////////////////////////////////////////////////
// SAFE PARSER
//////////////////////////////////////////////////////////////

export function safeParseAIResponse<T>(
  text: string,
  schema: z.ZodSchema<T>
):
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    } {
  try {
    const data = parseAIResponse(text, schema);

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown parser error",
    };
  }
}

//////////////////////////////////////////////////////////////
// JSON CHECK
//////////////////////////////////////////////////////////////

export function isValidJSON(text: string): boolean {
  try {
    parseJSON(text);
    return true;
  } catch {
    return false;
  }
}

//////////////////////////////////////////////////////////////
// PRETTY JSON
//////////////////////////////////////////////////////////////

export function prettyJSON(data: unknown): string {
  return JSON.stringify(data, null, 2);
}