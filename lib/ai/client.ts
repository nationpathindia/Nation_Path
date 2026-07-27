import OpenAI from "openai";

import AI_CONFIG from "./constants";

//////////////////////////////////////////////////////////////
// OPENAI CLIENT
//////////////////////////////////////////////////////////////

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is missing.");
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//////////////////////////////////////////////////////////////
// DEFAULT AI CONFIG
//////////////////////////////////////////////////////////////

export const DEFAULT_AI_CONFIG = {
  model: AI_CONFIG.MODEL,
  temperature: AI_CONFIG.TEMPERATURE,
  top_p: AI_CONFIG.TOP_P,
  max_output_tokens: AI_CONFIG.MAX_OUTPUT_TOKENS,
} as const;

//////////////////////////////////////////////////////////////
// SIMPLE HEALTH CHECK
//////////////////////////////////////////////////////////////

export async function checkAIConnection() {
  try {
    await openai.responses.create({
      model: DEFAULT_AI_CONFIG.model,
      input: "Reply with OK",
      max_output_tokens: 5,
    });

    return {
      success: true,
      message: "OpenAI Connected",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to connect to OpenAI",
    };
  }
}