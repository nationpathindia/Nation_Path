import { NextRequest, NextResponse } from "next/server";
import {
  LiveAutomationStatus,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { runLiveAutomationRule } from "@/lib/live/automation-runner";
import { requireAdminApi } from "@/lib/auth/admin-api";

export const dynamic = "force-dynamic";

const ALLOWED_ROLES = [
  "superadmin",
  "admin",
  "editor",
  "reporter",
];

/* =========================================================
   POST — MANUAL AUTOMATION RUN
========================================================= */

export async function POST(
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

    /* =====================================================
       VALIDATE RULE ID
    ===================================================== */

    const ruleId =
      params.id?.trim();

    if (!ruleId) {
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
       LOAD RULE + EVENT
    ===================================================== */

    const rule =
      await prisma.liveAutomationRule.findUnique(
        {
          where: {
            id: ruleId,
          },

          select: {
            id: true,
            name: true,
            status: true,
            eventId: true,
            sourceIds: true,
            fetchIntervalSeconds: true,
            autoPublish: true,
            requireVerification: true,

            event: {
              select: {
                id: true,
                title: true,
                status: true,
                enableAutomation: true,
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

    /* =====================================================
       RULE STATUS
    ===================================================== */

    if (
      rule.status !==
      LiveAutomationStatus.active
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Automation rule is not active",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       EVENT STATUS
    ===================================================== */

    if (
      rule.event.status ===
        "archived" ||
      rule.event.status ===
        "completed"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Live event is no longer active",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       EVENT AUTOMATION FLAG
       
       Manual run is allowed only when the event
       itself has automation enabled.
    ===================================================== */

    if (
      !rule.event
        .enableAutomation
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Automation is disabled for this live event",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       SAFE PUBLISH CONFIGURATION
    ===================================================== */

    if (
      rule.autoPublish &&
      rule.requireVerification
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid automation configuration: autoPublish cannot run while requireVerification is enabled",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       SOURCE HEALTH CHECK
       
       If the rule has explicitly selected sources,
       make sure at least all configured source IDs
       still exist and are active before running.
    ===================================================== */

    if (
      rule.sourceIds.length >
      0
    ) {
      const sources =
        await prisma.liveSource.findMany(
          {
            where: {
              id: {
                in: rule.sourceIds,
              },
            },

            select: {
              id: true,
              name: true,
              isActive: true,
            },
          }
        );

      if (
        sources.length !==
        rule.sourceIds.length
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "One or more configured automation sources no longer exist",
          },
          { status: 400 }
        );
      }

      const inactiveSources =
        sources.filter(
          (source) =>
            !source.isActive
        );

      if (
        inactiveSources.length >
        0
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "One or more configured automation sources are inactive",
            data: {
              inactiveSources:
                inactiveSources.map(
                  (source) => ({
                    id:
                      source.id,
                    name:
                      source.name,
                  })
                ),
            },
          },
          { status: 400 }
        );
      }
    }

    /* =====================================================
       RUN AUTOMATION
       
       The actual ingestion/deduplication/publishing
       remains inside the existing automation runner.
    ===================================================== */

    const startedAt =
      Date.now();

    const result =
      await runLiveAutomationRule(
        rule.id
      );

    const durationMs =
      Date.now() -
      startedAt;

    return NextResponse.json({
      success: true,

      message:
        "Live automation completed successfully",

      data: {
        ...result,
        ruleId: rule.id,
        eventId:
          rule.eventId,
        durationMs,
      },
    });
  } catch (error) {
    console.error(
      "LIVE AUTOMATION RUN ERROR:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Failed to run automation";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}