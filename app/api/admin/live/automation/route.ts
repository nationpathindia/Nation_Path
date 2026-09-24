import { NextRequest, NextResponse } from "next/server";
import { LiveAutomationStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/auth/admin-api";

export const dynamic = "force-dynamic";

const MAX_LIMIT = 100;
const MAX_NAME_LENGTH = 200;
const MAX_ARRAY_ITEMS = 100;
const MAX_KEYWORD_LENGTH = 200;

const ALLOWED_ROLES = [
  "superadmin",
  "admin",
  "editor",
  "reporter",
];

/* =========================================================
   HELPERS
========================================================= */

function asStringArray(
  value: unknown
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return Array.from(
    new Set(
      value
        .filter(
          (item) =>
            typeof item === "string"
        )
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) =>
          item.slice(
            0,
            MAX_KEYWORD_LENGTH
          )
        )
    )
  ).slice(0, MAX_ARRAY_ITEMS);
}

function asBoolean(
  value: unknown,
  fallback: boolean
) {
  return typeof value === "boolean"
    ? value
    : fallback;
}

function isAutomationStatus(
  value: unknown
): value is LiveAutomationStatus {
  return (
    typeof value === "string" &&
    Object.values(
      LiveAutomationStatus
    ).includes(
      value as LiveAutomationStatus
    )
  );
}

/* =========================================================
   GET
========================================================= */

export async function GET(
  request: NextRequest
) {
  try {
    /* =====================================================
       AUTH / RBAC
    ===================================================== */

    const auth =
      await requireAdminApi();

    if (!auth.authorized) {
      return auth.response;
    }

    if (
      !ALLOWED_ROLES.includes(
        auth.role
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Forbidden",
        },
        { status: 403 }
      );
    }

    const { searchParams } =
      new URL(request.url);

    const eventId =
      searchParams
        .get("eventId")
        ?.trim() || "";

    const status =
      searchParams
        .get("status")
        ?.trim() || "";

    const search =
      searchParams
        .get("search")
        ?.trim() || "";

    const parsedPage =
      Number.parseInt(
        searchParams.get("page") ||
          "1",
        10
      );

    const parsedLimit =
      Number.parseInt(
        searchParams.get("limit") ||
          "20",
        10
      );

    const page =
      Number.isFinite(
        parsedPage
      ) && parsedPage > 0
        ? parsedPage
        : 1;

    const limit = Math.min(
      MAX_LIMIT,
      Math.max(
        1,
        Number.isFinite(
          parsedLimit
        )
          ? parsedLimit
          : 20
      )
    );

    /* =====================================================
       VALIDATE STATUS FILTER
    ===================================================== */

    if (
      status &&
      status !== "all" &&
      !isAutomationStatus(status)
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid automation status",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       WHERE
    ===================================================== */

    const where: any = {};

    if (eventId) {
      where.eventId = eventId;
    }

    if (
      status &&
      status !== "all"
    ) {
      where.status = status;
    }

    if (search) {
      where.name = {
        contains: search.slice(
          0,
          MAX_NAME_LENGTH
        ),
        mode: "insensitive",
      };
    }

    /* =====================================================
       QUERY
       
       NOTE:
       Prisma groupBy() is intentionally avoided here.
       Some generated Prisma clients produce a circular
       TypeScript mapped-type error for groupBy().
    ===================================================== */

    const [
      rules,
      total,
      activeCount,
      pausedCount,
      disabledCount,
    ] = await Promise.all([
      prisma.liveAutomationRule.findMany({
        where,

        include: {
          event: {
            select: {
              id: true,
              title: true,
              slug: true,
              segment: true,
              status: true,
            },
          },
        },

        orderBy: [
          {
            status: "asc",
          },
          {
            createdAt: "desc",
          },
        ],

        skip:
          (page - 1) * limit,

        take: limit,
      }),

      prisma.liveAutomationRule.count({
        where,
      }),

      prisma.liveAutomationRule.count({
        where: {
          status:
            LiveAutomationStatus.active,
        },
      }),

      prisma.liveAutomationRule.count({
        where: {
          status:
            LiveAutomationStatus.paused,
        },
      }),

      prisma.liveAutomationRule.count({
        where: {
          status:
            LiveAutomationStatus.disabled,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,

      data: rules,

      pagination: {
        page,
        limit,
        total,
        totalPages:
          Math.ceil(
            total / limit
          ),
      },

      overview: {
        active: activeCount,
        paused: pausedCount,
        disabled: disabledCount,
      },
    });
  } catch (error) {
    console.error(
      "GET live automation error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to load automation rules",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   POST
========================================================= */

export async function POST(
  request: NextRequest
) {
  try {
    /* =====================================================
       AUTH / RBAC
    ===================================================== */

    const auth =
      await requireAdminApi();

    if (!auth.authorized) {
      return auth.response;
    }

    if (
      !ALLOWED_ROLES.includes(
        auth.role
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Forbidden",
        },
        { status: 403 }
      );
    }

    /* =====================================================
       BODY
    ===================================================== */

    let body: any;

    try {
      body =
        await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid JSON request body",
        },
        { status: 400 }
      );
    }

    const eventId =
      typeof body?.eventId ===
      "string"
        ? body.eventId.trim()
        : "";

    const name =
      typeof body?.name ===
      "string"
        ? body.name.trim()
        : "";

    if (!eventId) {
      return NextResponse.json(
        {
          success: false,
          error:
            "eventId is required",
        },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Automation rule name is required",
        },
        { status: 400 }
      );
    }

    if (
      name.length >
      MAX_NAME_LENGTH
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Automation rule name is too long",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       EVENT
    ===================================================== */

    const event =
      await prisma.liveEvent.findUnique({
        where: {
          id: eventId,
        },

        select: {
          id: true,
          status: true,
        },
      });

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Live event not found",
        },
        { status: 404 }
      );
    }

    if (
      event.status === "archived"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Cannot create automation for an archived event",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       ARRAYS
    ===================================================== */

    const sourceIds =
      asStringArray(
        body.sourceIds
      );

    const keywords =
      asStringArray(
        body.keywords
      );

    const excludeKeywords =
      asStringArray(
        body.excludeKeywords
      );

    /* =====================================================
       FETCH INTERVAL
    ===================================================== */

    const fetchIntervalSeconds =
      Number(
        body.fetchIntervalSeconds ??
          300
      );

    if (
      !Number.isInteger(
        fetchIntervalSeconds
      ) ||
      fetchIntervalSeconds < 30 ||
      fetchIntervalSeconds > 86400
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

    /* =====================================================
       MATCH MODE
    ===================================================== */

    const matchMode =
      body.matchMode === "all"
        ? "all"
        : "any";

    /* =====================================================
       STATUS
    ===================================================== */

    const status =
      isAutomationStatus(
        body.status
      )
        ? body.status
        : LiveAutomationStatus.active;

    /* =====================================================
       SOURCE VALIDATION
    ===================================================== */

    if (
      sourceIds.length > 0
    ) {
      const sources =
        await prisma.liveSource.findMany(
          {
            where: {
              id: {
                in: sourceIds,
              },
            },

            select: {
              id: true,
              isActive: true,
            },
          }
        );

      if (
        sources.length !==
        sourceIds.length
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "One or more sourceIds are invalid",
          },
          { status: 400 }
        );
      }

      const inactiveSource =
        sources.find(
          (source) =>
            !source.isActive
        );

      if (inactiveSource) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Automation cannot use an inactive live source",
          },
          { status: 400 }
        );
      }
    }

    /* =====================================================
       AUTOMATION FLAGS
    ===================================================== */

    const autoPublish =
      asBoolean(
        body.autoPublish,
        false
      );

    const requireVerification =
      asBoolean(
        body.requireVerification,
        true
      );

    const autoBreaking =
      asBoolean(
        body.autoBreaking,
        false
      );

    const autoSummarize =
      asBoolean(
        body.autoSummarize,
        true
      );

    const autoClassify =
      asBoolean(
        body.autoClassify,
        true
      );

    const autoDeduplicate =
      asBoolean(
        body.autoDeduplicate,
        true
      );

    const autoEventMatch =
      asBoolean(
        body.autoEventMatch,
        true
      );

    /* =====================================================
       SAFE PUBLISH GUARD
    ===================================================== */

    if (
      autoPublish &&
      requireVerification
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "autoPublish cannot be enabled while requireVerification is enabled",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       CREATE RULE
    ===================================================== */

    const rule =
      await prisma.$transaction(
        async (tx) => {
          const created =
            await tx.liveAutomationRule.create(
              {
                data: {
                  eventId,
                  name,
                  status,

                  sourceIds,
                  keywords,
                  excludeKeywords,

                  matchMode,

                  fetchIntervalSeconds,

                  autoPublish,
                  requireVerification,
                  autoBreaking,

                  autoSummarize,
                  autoClassify,
                  autoDeduplicate,
                  autoEventMatch,

                  nextRunAt:
                    status ===
                    LiveAutomationStatus.active
                      ? new Date(
                          Date.now() +
                            fetchIntervalSeconds *
                              1000
                        )
                      : null,
                },

                include: {
                  event: {
                    select: {
                      id: true,
                      title: true,
                      slug: true,
                      segment: true,
                      status: true,
                    },
                  },
                },
              }
            );

          await tx.liveEvent.update({
            where: {
              id: eventId,
            },

            data: {
              enableAutomation:
                status ===
                LiveAutomationStatus.active,
            },
          });

          return created;
        }
      );

    return NextResponse.json(
      {
        success: true,
        message:
          "Automation rule created successfully",
        data: rule,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "POST live automation error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to create automation rule",
      },
      { status: 500 }
    );
  }
}