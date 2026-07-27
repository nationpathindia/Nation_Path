//////////////////////////////////////////////////////////////
// NATIONPATH AI CORE INDEX
//////////////////////////////////////////////////////////////

export * from "./types";

export {
  executeAI,
  executeAISafe,
  executeAIJSON,
  executeAIStructured,
  executeAIStructuredSafe,
  executeAIStream,
  checkAIConnection,
  estimateCost,
} from "./executor";

export * from "./constants";

export * from "./client";

export * from "./helpers";

export * from "./validator";

export * from "./prompts";

export {
  LanguageSchema,
  ScoreSchema,
  GeneratedArticleSchema,
  GeneratedSEOSchema,
  GeneratedSocialSchema,
  HoroscopeSchema,
  PredictionEnhancementSchema,
} from "./schemas";

export {
  adaptHoroscopeForAI,
} from "./adapters/horoscopeAdapter";

export type {
  AIHoroscopeContext,
} from "./adapters/horoscopeAdapter";