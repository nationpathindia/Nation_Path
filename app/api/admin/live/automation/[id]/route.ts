import { NextRequest, NextResponse } from "next/server";
import {
  LiveAutomationStatus,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/auth/admin-api";

export const dynamic = "force-dynamic";

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

function stringArray(
  value: unknown
): string[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
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
  _request: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
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

    const id =
      params.id?.trim();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Automation rule ID is required",
        },
        { status: 400 }
      );
    }

    const rule =
      await prisma.liveAutomationRule.findUnique(
        {
          where: {
            id,
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

    if (!rule) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Automation rule not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: rule,
    });
  } catch (error) {
    console.error(
      "GET automation rule error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to load automation rule",
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

    const id =
      params.id?.trim();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Automation rule ID is required",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       EXISTING RULE
    ===================================================== */

    const existing =
      await prisma.liveAutomationRule.findUnique(
        {
          where: {
            id,
          },
        }
      );

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Automation rule not found",
        },
        { status: 404 }
      );
    }

    /* =====================================================
       EVENT
    ===================================================== */

    const event =
      await prisma.liveEvent.findUnique(
        {
          where: {
            id: existing.eventId,
          },

          select: {
            id: true,
            status: true,
          },
        }
      );

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Parent live event not found",
        },
        { status: 404 }
      );
    }

    if (
      event.status ===
      "archived"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Cannot modify automation for an archived live event",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       BODY
    ===================================================== */

    let body: any;

    try {
      body = await request.json();
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

    const data: any = {};

    /* =====================================================
       NAME
    ===================================================== */

    if (
      body.name !== undefined
    ) {
      const name =
        typeof body.name ===
        "string"
          ? body.name.trim()
          : "";

      if (!name) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Rule name cannot be empty",
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
              "Rule name is too long",
          },
          { status: 400 }
        );
      }

      data.name = name;
    }

    /* =====================================================
       STATUS
    ===================================================== */

    if (
      body.status !==
      undefined
    ) {
      if (
        !isAutomationStatus(
          body.status
        )
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

      data.status =
        body.status;
    }

    /* =====================================================
       SOURCE IDS
    ===================================================== */

    let resultingSourceIds =
      existing.sourceIds;

    if (
      body.sourceIds !==
      undefined
    ) {
      const parsed =
        stringArray(
          body.sourceIds
        );

      if (!parsed) {
        return NextResponse.json(
          {
            success: false,
            error:
              "sourceIds must be an array of strings",
          },
          { status: 400 }
        );
      }

      resultingSourceIds =
        parsed;

      if (
        resultingSourceIds.length >
        0
      ) {
        const sources =
          await prisma.liveSource.findMany(
            {
              where: {
                id: {
                  in:
                    resultingSourceIds,
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
          resultingSourceIds.length
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

        const inactive =
          sources.find(
            (source) =>
              !source.isActive
          );

        if (inactive) {
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

      data.sourceIds =
        resultingSourceIds;
    }

    /* =====================================================
       KEYWORDS
    ===================================================== */

    for (const field of [
      "keywords",
      "excludeKeywords",
    ]) {
      if (
        body[field] !==
        undefined
      ) {
        const parsed =
          stringArray(
            body[field]
          );

        if (!parsed) {
          return NextResponse.json(
            {
              success: false,
              error:
                `${field} must be an array of strings`,
            },
            { status: 400 }
          );
        }

        data[field] =
          parsed;
      }
    }

    /* =====================================================
       MATCH MODE
    ===================================================== */

    if (
      body.matchMode !==
      undefined
    ) {
      if (
        body.matchMode !==
          "all" &&
        body.matchMode !==
          "any"
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "matchMode must be either all or any",
          },
          { status: 400 }
        );
      }

      data.matchMode =
        body.matchMode;
    }

    /* =====================================================
       FETCH INTERVAL
    ===================================================== */

    if (
      body.fetchIntervalSeconds !==
      undefined
    ) {
      const interval =
        Number(
          body.fetchIntervalSeconds
        );

      if (
        !Number.isInteger(
          interval
        ) ||
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

      data.fetchIntervalSeconds =
        interval;
    }

    /* =====================================================
       BOOLEAN FLAGS
    ===================================================== */

    const booleanFields = [
      "autoPublish",
      "requireVerification",
      "autoBreaking",
      "autoSummarize",
      "autoClassify",
      "autoDeduplicate",
      "autoEventMatch",
    ];

    for (const field of
      booleanFields) {
      if (
        body[field] !==
        undefined
      ) {
        if (
          typeof body[field] !==
          "boolean"
        ) {
          return NextResponse.json(
            {
              success: false,
              error:
                `${field} must be a boolean`,
            },
            { status: 400 }
          );
        }

        data[field] =
          body[field];
      }
    }

    /* =====================================================
       RESULTING CONFIGURATION
    ===================================================== */

    const resultingStatus =
      data.status ??
      existing.status;

    const resultingInterval =
      data.fetchIntervalSeconds ??
      existing.fetchIntervalSeconds;

    const resultingAutoPublish =
      data.autoPublish ??
      existing.autoPublish;

    const resultingVerification =
      data.requireVerification ??
      existing.requireVerification;

    /* =====================================================
       SAFE PUBLISH GUARD
    ===================================================== */

    if (
      resultingAutoPublish &&
      resultingVerification
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
       NEXT RUN
    ===================================================== */

    if (
      resultingStatus ===
      LiveAutomationStatus.active
    ) {
      data.nextRunAt =
        new Date(
          Date.now() +
            resultingInterval *
              1000
        );
    } else {
      data.nextRunAt =
        null;
    }

    /* =====================================================
       ATOMIC UPDATE
    ===================================================== */

    const result =
      await prisma.$transaction(
        async (tx) => {
          const updated =
            await tx.liveAutomationRule.update(
              {
                where: {
                  id,
                },

                data,

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

          const activeRuleCount =
            await tx.liveAutomationRule.count(
              {
                where: {
                  eventId:
                    existing.eventId,
                  status:
                    LiveAutomationStatus.active,
                },
              }
            );

          await tx.liveEvent.update(
            {
              where: {
                id:
                  existing.eventId,
              },

              data: {
                enableAutomation:
                  activeRuleCount >
                  0,
              },
            }
          );

          return updated;
        }
      );

    return NextResponse.json({
      success: true,
      message:
        "Automation rule updated successfully",
      data: result,
    });
  } catch (error) {
    console.error(
      "PATCH automation rule error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to update automation rule",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   DELETE = DISABLE
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

    const id =
      params.id?.trim();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Automation rule ID is required",
        },
        { status: 400 }
      );
    }

    const existing =
      await prisma.liveAutomationRule.findUnique(
        {
          where: {
            id,
          },

          select: {
            id: true,
            eventId: true,
          },
        }
      );

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Automation rule not found",
        },
        { status: 404 }
      );
    }

    /* =====================================================
       SAFE DISABLE
    ===================================================== */

    await prisma.$transaction(
      async (tx) => {
        await tx.liveAutomationRule.update(
          {
            where: {
              id,
            },

            data: {
              status:
                LiveAutomationStatus.disabled,
              nextRunAt: null,
            },
          }
        );

        const activeRuleCount =
          await tx.liveAutomationRule.count(
            {
              where: {
                eventId:
                  existing.eventId,
                status:
                  LiveAutomationStatus.active,
              },
            }
          );

        await tx.liveEvent.update(
          {
            where: {
              id:
                existing.eventId,
            },

            data: {
              enableAutomation:
                activeRuleCount >
                0,
            },
          }
        );
      }
    );

    return NextResponse.json({
      success: true,
      message:
        "Automation rule disabled successfully",
    });
  } catch (error) {
    console.error(
      "DELETE automation rule error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to disable automation rule",
      },
      { status: 500 }
    );
  }
}