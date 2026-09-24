import { NextRequest, NextResponse } from "next/server";
import {
  LiveSegment,
  LiveSourceType,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/auth/admin-api";

export const dynamic = "force-dynamic";

const ALLOWED_ROLES = [
  "superadmin",
  "admin",
  "editor",
  "reporter",
];

/* =========================================================
   HELPERS
========================================================= */

function isValidUrl(value?: string | null) {
  if (!value) return true;

  try {
    const url = new URL(value);

    return (
      url.protocol === "http:" ||
      url.protocol === "https:"
    );
  } catch {
    return false;
  }
}

function optionalString(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  return trimmed || null;
}

function isLiveSourceType(
  value: unknown
): value is LiveSourceType {
  return (
    typeof value === "string" &&
    Object.values(LiveSourceType).includes(
      value as LiveSourceType
    )
  );
}

function isLiveSegment(
  value: unknown
): value is LiveSegment {
  return (
    typeof value === "string" &&
    Object.values(LiveSegment).includes(
      value as LiveSegment
    )
  );
}

/* =========================================================
   TRUST LEVEL
   Prisma schema stores trustLevel as Int.

   UI/API values:
   standard -> 1
   trusted  -> 2
   high     -> 3
========================================================= */

function parseTrustLevel(
  value: unknown
): number | null {
  if (typeof value === "number") {
    if (
      Number.isInteger(value) &&
      value >= 1 &&
      value <= 3
    ) {
      return value;
    }

    return null;
  }

  const input =
    optionalString(value)?.toLowerCase() ||
    "standard";

  const trustLevelMap: Record<string, number> = {
    standard: 1,
    trusted: 2,
    high: 3,
  };

  return Object.prototype.hasOwnProperty.call(
    trustLevelMap,
    input
  )
    ? trustLevelMap[input]
    : null;
}

/* =========================================================
   GET
========================================================= */

export async function GET(
  _request: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  try {
    /* =====================================================
       AUTH
    ===================================================== */

    const auth = await requireAdminApi();

    if (!auth.authorized) {
      return auth.response;
    }

    if (!ALLOWED_ROLES.includes(auth.role)) {
      return NextResponse.json(
        {
          success: false,
          error: "Forbidden",
        },
        { status: 403 }
      );
    }

    const id = params.id;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Source ID is required",
        },
        { status: 400 }
      );
    }

    const source =
      await prisma.liveSource.findUnique({
        where: {
          id,
        },

        include: {
          _count: {
            select: {
              events: true,
              updates: true,
            },
          },

          events: {
            orderBy: {
              priority: "desc",
            },

            include: {
              event: {
                select: {
                  id: true,
                  title: true,
                  slug: true,
                  segment: true,
                  status: true,
                  isFeatured: true,
                },
              },
            },
          },
        },
      });

    if (!source) {
      return NextResponse.json(
        {
          success: false,
          error: "Live source not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: source,
    });
  } catch (error) {
    console.error(
      "GET /api/admin/live/sources/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load live source",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   PATCH
========================================================= */

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  try {
    /* =====================================================
       AUTH
    ===================================================== */

    const auth = await requireAdminApi();

    if (!auth.authorized) {
      return auth.response;
    }

    if (!ALLOWED_ROLES.includes(auth.role)) {
      return NextResponse.json(
        {
          success: false,
          error: "Forbidden",
        },
        { status: 403 }
      );
    }

    const id = params.id;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Source ID is required",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       EXISTING SOURCE
    ===================================================== */

    const existing =
      await prisma.liveSource.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: "Live source not found",
        },
        { status: 404 }
      );
    }

    const body = await request.json();

    const data: any = {};

    /* =====================================================
       NAME
    ===================================================== */

    if (body.name !== undefined) {
      const name = optionalString(body.name);

      if (!name) {
        return NextResponse.json(
          {
            success: false,
            error: "Source name cannot be empty",
          },
          { status: 400 }
        );
      }

      if (name.length > 200) {
        return NextResponse.json(
          {
            success: false,
            error: "Source name is too long",
          },
          { status: 400 }
        );
      }

      data.name = name;
    }

    /* =====================================================
       TYPE
    ===================================================== */

    if (body.type !== undefined) {
      if (!isLiveSourceType(body.type)) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid source type",
          },
          { status: 400 }
        );
      }

      data.type = body.type;
    }

    /* =====================================================
       URLS
    ===================================================== */

    for (const field of [
      "url",
      "rssUrl",
      "apiUrl",
    ]) {
      if (body[field] !== undefined) {
        const value = optionalString(
          body[field]
        );

        if (!isValidUrl(value)) {
          return NextResponse.json(
            {
              success: false,
              error: `Invalid ${field}`,
            },
            { status: 400 }
          );
        }

        data[field] = value;
      }
    }

    /* =====================================================
       ACTIVE
    ===================================================== */

    if (body.isActive !== undefined) {
      data.isActive = Boolean(body.isActive);
    }

    /* =====================================================
       PRIORITY
    ===================================================== */

    if (body.priority !== undefined) {
      const priority = Number(body.priority);

      if (!Number.isInteger(priority)) {
        return NextResponse.json(
          {
            success: false,
            error: "Priority must be an integer",
          },
          { status: 400 }
        );
      }

      data.priority = priority;
    }

    /* =====================================================
       TRUST LEVEL
========================================================= */

    if (body.trustLevel !== undefined) {
      const trustLevel = parseTrustLevel(
        body.trustLevel
      );

      if (trustLevel === null) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Invalid trust level. Allowed values: standard, trusted, high",
          },
          { status: 400 }
        );
      }

      data.trustLevel = trustLevel;
    }

    /* =====================================================
       FETCH INTERVAL
    ===================================================== */

    if (
      body.fetchIntervalSeconds !==
      undefined
    ) {
      const interval = Number(
        body.fetchIntervalSeconds
      );

      if (
        !Number.isInteger(interval) ||
        interval < 30 ||
        interval > 86400
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "fetchIntervalSeconds must be between 30 and 86400 seconds",
          },
          { status: 400 }
        );
      }

      data.fetchIntervalSeconds = interval;
    }

    /* =====================================================
       DEFAULT SEGMENT
    ===================================================== */

    if (
      body.defaultSegment !==
      undefined
    ) {
      if (
        body.defaultSegment !== null &&
        body.defaultSegment !== "" &&
        !isLiveSegment(
          body.defaultSegment
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid default segment",
          },
          { status: 400 }
        );
      }

      data.defaultSegment =
        body.defaultSegment === ""
          ? null
          : body.defaultSegment;
    }

    /* =====================================================
       FINAL SOURCE VALUES
       Validate resulting configuration,
       not just patched fields.
    ===================================================== */

    const finalType =
      data.type !== undefined
        ? data.type
        : existing.type;

    const finalUrl =
      data.url !== undefined
        ? data.url
        : existing.url;

    const finalRssUrl =
      data.rssUrl !== undefined
        ? data.rssUrl
        : existing.rssUrl;

    const finalApiUrl =
      data.apiUrl !== undefined
        ? data.apiUrl
        : existing.apiUrl;

    /* =====================================================
       RSS REQUIREMENT
    ===================================================== */

    if (
      finalType === LiveSourceType.rss &&
      !finalRssUrl &&
      !finalUrl
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "RSS source requires rssUrl or url",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       API REQUIREMENT
    ===================================================== */

    if (
      finalType === LiveSourceType.api &&
      !finalApiUrl &&
      !finalUrl
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "API source requires apiUrl or url",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       UPDATE
    ===================================================== */

    const source =
      await prisma.liveSource.update({
        where: {
          id,
        },

        data,

        include: {
          _count: {
            select: {
              events: true,
              updates: true,
            },
          },

          events: {
            orderBy: {
              priority: "desc",
            },

            include: {
              event: {
                select: {
                  id: true,
                  title: true,
                  slug: true,
                  segment: true,
                  status: true,
                  isFeatured: true,
                },
              },
            },
          },
        },
      });

    return NextResponse.json({
      success: true,
      message:
        "Live source updated successfully",
      data: source,
    });
  } catch (error) {
    console.error(
      "PATCH /api/admin/live/sources/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to update live source",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   DELETE = DISABLE SOURCE
========================================================= */

export async function DELETE(
  _request: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  try {
    /* =====================================================
       AUTH
    ===================================================== */

    const auth = await requireAdminApi();

    if (!auth.authorized) {
      return auth.response;
    }

    if (!ALLOWED_ROLES.includes(auth.role)) {
      return NextResponse.json(
        {
          success: false,
          error: "Forbidden",
        },
        { status: 403 }
      );
    }

    const id = params.id;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Source ID is required",
        },
        { status: 400 }
      );
    }

    const source =
      await prisma.liveSource.findUnique({
        where: {
          id,
        },

        include: {
          _count: {
            select: {
              events: true,
              updates: true,
            },
          },
        },
      });

    if (!source) {
      return NextResponse.json(
        {
          success: false,
          error: "Live source not found",
        },
        { status: 404 }
      );
    }

    /* =====================================================
       SAFE DISABLE
       Preserve complete source history.
    ===================================================== */

    const updated =
      await prisma.liveSource.update({
        where: {
          id,
        },

        data: {
          isActive: false,
          lastErrorAt: null,
        },
      });

    return NextResponse.json({
      success: true,
      message:
        "Live source disabled successfully. Historical source data was preserved.",
      data: updated,
    });
  } catch (error) {
    console.error(
      "DELETE /api/admin/live/sources/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to disable live source",
      },
      { status: 500 }
    );
  }
}

