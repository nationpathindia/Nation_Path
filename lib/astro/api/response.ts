import { NextResponse } from "next/server";

export interface AstroApiMeta {
  timestamp: string;
  version?: string;
  [key: string]: unknown;
}

export interface AstroApiSuccess<T> {
  success: true;
  data: T;
  meta: AstroApiMeta;
}

export interface AstroApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta: AstroApiMeta;
}

const DEFAULT_VERSION = "1.0";

function createMeta(extra?: Record<string, unknown>): AstroApiMeta {
  return {
    timestamp: new Date().toISOString(),
    version: DEFAULT_VERSION,
    ...extra,
  };
}

export function astroSuccess<T>(
  data: T,
  extraMeta?: Record<string, unknown>,
  status = 200
) {
  const response: AstroApiSuccess<T> = {
    success: true,
    data,
    meta: createMeta(extraMeta),
  };

  return NextResponse.json(response, { status });
}

export function astroError(
  code: string,
  message: string,
  status = 400,
  details?: unknown
) {
  const response: AstroApiError = {
    success: false,
    error: {
      code,
      message,
      ...(details !== undefined ? { details } : {}),
    },
    meta: createMeta(),
  };

  return NextResponse.json(response, { status });
}