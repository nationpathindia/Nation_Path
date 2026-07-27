//////////////////////////////////////////////////////////////
// NATIONPATH AI EXECUTOR
// Production AI Execution Engine
// OpenAI SDK v6
// Version 2.0
//////////////////////////////////////////////////////////////

import OpenAI from "openai";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";

import AI_CONFIG from "./constants";

import {
  createRequestId,
  createCorrelationId,
  exponentialBackoff,
  measureExecution,
  safeError,
  extractResponseText,
  extractUsage,
  getModel,
} from "./helpers";

//////////////////////////////////////////////////////////////
// CLIENT
//////////////////////////////////////////////////////////////

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

//////////////////////////////////////////////////////////////
// PROVIDERS
//////////////////////////////////////////////////////////////

export type AIProvider =
  | "openai"
  | "anthropic"
  | "gemini";

//////////////////////////////////////////////////////////////
// EXECUTION MODES
//////////////////////////////////////////////////////////////

export type AIExecutionMode =
  | "text"
  | "structured"
  | "stream";

//////////////////////////////////////////////////////////////
// OPTIONS
//////////////////////////////////////////////////////////////

export interface ExecuteAIOptions {

  provider?: AIProvider;

  model?: string;

  systemPrompt: string;

  userPrompt: string;

  temperature?: number;

  topP?: number;

  maxOutputTokens?: number;

  timeout?: number;

  retries?: number;

  metadata?: Record<string, unknown>;

}

//////////////////////////////////////////////////////////////
// STRUCTURED OPTIONS
//////////////////////////////////////////////////////////////

export interface ExecuteAIStructuredOptions<T>
  extends ExecuteAIOptions {

  schema: z.ZodSchema<T>;

  schemaName: string;

}

//////////////////////////////////////////////////////////////
// TOKEN USAGE
//////////////////////////////////////////////////////////////

export interface AIUsage {

  inputTokens?: number;

  outputTokens?: number;

  totalTokens?: number;

}

//////////////////////////////////////////////////////////////
// RESULT
//////////////////////////////////////////////////////////////

export interface ExecuteAIResult<T = unknown> {

  success: boolean;

  requestId: string;

  correlationId: string;

  provider: AIProvider;

  model: string;

  mode: AIExecutionMode;

  output: T;

  raw?: unknown;

  usage?: AIUsage;

  durationMs: number;

  error?: string;

}

//////////////////////////////////////////////////////////////
// MODEL RESOLUTION
//////////////////////////////////////////////////////////////

function resolveModel(model?: string): string {

  if (model) return model;

  return AI_CONFIG.MODEL;

}

//////////////////////////////////////////////////////////////
// TIMEOUT
//////////////////////////////////////////////////////////////

function createTimeoutSignal(
  timeout = AI_CONFIG.TIMEOUT
): AbortSignal {

  return AbortSignal.timeout(timeout);

}

//////////////////////////////////////////////////////////////
// EXECUTION DEFAULTS
//////////////////////////////////////////////////////////////
function resolveOptions(
  options: ExecuteAIOptions
) {

  return {

    maxOutputTokens:
      options.maxOutputTokens ??
      AI_CONFIG.MAX_OUTPUT_TOKENS,

    timeout:
      options.timeout ??
      AI_CONFIG.TIMEOUT,

    retries:
      options.retries ??
      AI_CONFIG.RETRIES,

  };

}

//////////////////////////////////////////////////////////////
// REQUEST CONTEXT
//////////////////////////////////////////////////////////////

function createContext(
  options: ExecuteAIOptions
) {

  return {

    requestId:
      createRequestId(),

    correlationId:
      createCorrelationId(),

    provider:
      options.provider ??
      "openai",

    model:
      resolveModel(options.model),

  };

}
//////////////////////////////////////////////////////////////
// INTERNAL RESPONSE BUILDERS
//////////////////////////////////////////////////////////////

function buildSuccessResult<T>(
  context: ReturnType<typeof createContext>,
  mode: AIExecutionMode,
  result: {
    output: T;
    raw: unknown;
    usage?: AIUsage;
    durationMs: number;
  }
): ExecuteAIResult<T> {
  return {
    success: true,

    requestId: context.requestId,
    correlationId: context.correlationId,

    provider: context.provider,
    model: context.model,

    mode,

    output: result.output,

    raw: result.raw,

    usage: result.usage,

    durationMs: result.durationMs,
  };
}

//////////////////////////////////////////////////////////////

function buildErrorResult<T>(
  context: ReturnType<typeof createContext>,
  mode: AIExecutionMode,
  error: unknown
): ExecuteAIResult<T> {
  return {
    success: false,

    requestId: context.requestId,
    correlationId: context.correlationId,

    provider: context.provider,
    model: context.model,

    mode,

    output: {} as T,

    durationMs: 0,

    error: safeError(error),
  };
}

//////////////////////////////////////////////////////////////
// LOGGING HOOKS
//////////////////////////////////////////////////////////////

function logRequest(
  context: ReturnType<typeof createContext>
) {
  if (process.env.NODE_ENV !== "development") return;

  console.info(
    `[AI REQUEST] ${context.requestId}`,
    {
      provider: context.provider,
      model: context.model,
      correlationId: context.correlationId,
    }
  );
}

//////////////////////////////////////////////////////////////

function logResponse(
  result: ExecuteAIResult<any>
) {
  if (process.env.NODE_ENV !== "development") return;

  console.info(
    `[AI RESPONSE] ${result.requestId}`,
    {
      duration: result.durationMs,
      usage: result.usage,
      success: result.success,
    }
  );
}

//////////////////////////////////////////////////////////////

function logError(
  context: ReturnType<typeof createContext>,
  error: unknown
) {
  console.error(
    `[AI ERROR] ${context.requestId}`,
    safeError(error)
  );
}

//////////////////////////////////////////////////////////////
// COST HOOK (Future Billing)
//////////////////////////////////////////////////////////////

export function estimateCost(
  usage?: AIUsage
): number {
  if (!usage) return 0;

  // Future:
  // Add model specific pricing table

  return 0;
}

//////////////////////////////////////////////////////////////
// INTERNAL EXECUTOR
//////////////////////////////////////////////////////////////
async function createResponse(
  options: ExecuteAIOptions,
  context: ReturnType<typeof createContext>
) {
  const defaults = resolveOptions(options);

  return await openai.responses.create({
    model: context.model,

    input: [
      {
        role: "system",
        content: options.systemPrompt,
      },
      {
        role: "user",
        content: options.userPrompt,
      },
    ],

       max_output_tokens:
      defaults.maxOutputTokens,
  });
}

//////////////////////////////////////////////////////////////
// STANDARD AI EXECUTOR
//////////////////////////////////////////////////////////////

export async function executeAI<T = string>(
  options: ExecuteAIOptions
): Promise<ExecuteAIResult<T>> {

  const context = createContext(options);

  logRequest(context);

  try {

    const { result, durationMs } =
      await measureExecution(async () => {

        const response =
          await createResponse(
            options,
            context
          );

        const output =
          extractResponseText(response);

        return {

          raw: response,

          output:
            output as T,

          usage:
            extractUsage(response),

        };

      });

    const finalResult =
      buildSuccessResult<T>(
        context,
        "text",
        {

          output:
            result.output,

          raw:
            result.raw,

          usage:
            result.usage,

          durationMs,

        }
      );

    logResponse(finalResult);

    return finalResult;

  } catch (error) {

    logError(
      context,
      error
    );

    return buildErrorResult<T>(
      context,
      "text",
      error
    );

  }

}

//////////////////////////////////////////////////////////////
// SAFE WRAPPER
//////////////////////////////////////////////////////////////

export async function executeAISafe<T = string>(
  options: ExecuteAIOptions
): Promise<T | null> {

  const result =
    await executeAI<T>(
      options
    );

  if (!result.success)
    return null;

  return result.output;

}

//////////////////////////////////////////////////////////////
// JSON WRAPPER
//////////////////////////////////////////////////////////////

export async function executeAIJSON<T>(
  options: ExecuteAIOptions
): Promise<T | null> {

  const result =
    await executeAI<string>(
      options
    );

  if (!result.success)
    return null;

  try {

    return JSON.parse(
      result.output
    ) as T;

  } catch {

    return null;

  }

}
//////////////////////////////////////////////////////////////
// STRUCTURED AI EXECUTOR
//////////////////////////////////////////////////////////////

export async function executeAIStructured<T>(
  options: ExecuteAIStructuredOptions<T>
): Promise<ExecuteAIResult<T>> {

  const context = createContext(options);

  logRequest(context);

  try {

    const defaults =
      resolveOptions(options);

    const { result, durationMs } =
      await measureExecution(async () => {

        const response =
          await exponentialBackoff(

            async () => {

              return await openai.responses.parse({

                model:
                  context.model,

                input: [

                  {
                    role: "system",
                    content:
                      options.systemPrompt,
                  },

                  {
                    role: "user",
                    content:
                      options.userPrompt,
                  },

                ],

                text: {

                  format: zodTextFormat(

                    options.schema,

                    options.schemaName

                  ),

                },

                 max_output_tokens:
                  defaults.maxOutputTokens,

             
              });

            },

            defaults.retries

          );

        return {

          raw:
            response,

          output:
            response.output_parsed as T,

          usage:
            extractUsage(response),

        };

      });

    const finalResult =
      buildSuccessResult<T>(

        context,

        "structured",

        {

          output:
            result.output,

          raw:
            result.raw,

          usage:
            result.usage,

          durationMs,

        }

      );

    logResponse(finalResult);

    return finalResult;

  } catch (error) {

    logError(
      context,
      error
    );

    return buildErrorResult<T>(
      context,
      "structured",
      error
    );

  }

}

//////////////////////////////////////////////////////////////
// SAFE STRUCTURED WRAPPER
//////////////////////////////////////////////////////////////

export async function executeAIStructuredSafe<T>(
  options: ExecuteAIStructuredOptions<T>
): Promise<T | null> {

  const result =
    await executeAIStructured(options);

  if (!result.success)
    return null;

  return result.output;

}
//////////////////////////////////////////////////////////////
// STREAMING EXECUTOR
//////////////////////////////////////////////////////////////

export async function executeAIStream(
  options: ExecuteAIOptions
) {

  const context = createContext(options);

  logRequest(context);

  const defaults =
    resolveOptions(options);

  try {

    const stream =
      await openai.responses.stream({

        model:
          context.model,

        input: [

          {
            role: "system",
            content:
              options.systemPrompt,
          },

          {
            role: "user",
            content:
              options.userPrompt,
          },

        ],

        max_output_tokens:
          defaults.maxOutputTokens,

      });

    return stream;

  } catch (error) {

    logError(
      context,
      error
    );

    throw error;

  }

}

//////////////////////////////////////////////////////////////
// HEALTH CHECK
//////////////////////////////////////////////////////////////

export async function checkAIConnection() {

  try {

    const result =
      await executeAI({

        systemPrompt:
          "Reply with OK.",

        userPrompt:
          "Health Check",

        maxOutputTokens: 5,

      });

    return {

      success:
        result.success,

      provider:
        result.provider,

      model:
        result.model,

    };

  } catch {

    return {

      success: false,

      provider: "openai",

      model: AI_CONFIG.MODEL,

    };

  }

}

//////////////////////////////////////////////////////////////
// FUTURE PROVIDER REGISTRY
//////////////////////////////////////////////////////////////

export const AIProviders = {

  openai: true,

  anthropic: false,

  gemini: false,

} as const;

//////////////////////////////////////////////////////////////
// FUTURE MODEL REGISTRY
//////////////////////////////////////////////////////////////

export const AIModels = {

  OPENAI: [

    "gpt-5.5",

    "gpt-5",

    "gpt-5-mini",

  ],

} as const;

//////////////////////////////////////////////////////////////
// DEFAULT EXPORT
//////////////////////////////////////////////////////////////

export default {

  executeAI,

  executeAISafe,

  executeAIJSON,

  executeAIStructured,

  executeAIStructuredSafe,

  executeAIStream,

  checkAIConnection,

  estimateCost,

};