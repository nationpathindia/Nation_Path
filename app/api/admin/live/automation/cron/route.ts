import { NextRequest, NextResponse } from "next/server";
import { LiveAutomationStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { runLiveAutomationRule } from "@/lib/live/automation-runner";

export const dynamic = "force-dynamic";

const MAX_RULES_PER_RUN = 10;
const MIN_INTERVAL_SECONDS = 60;

function isAuthorized(request: NextRequest) {
  const secret =
    process.env.LIVE_CRON_SECRET;

  if (
    !secret ||
    secret.trim().length < 32
  ) {
    return false;
  }

  const authorization =
    request.headers.get("authorization");

  return (
    authorization ===
    `Bearer ${secret}`
  );
}

export async function POST(
  request: NextRequest
) {
  /* =====================================================
     CRON AUTHENTICATION
     
     Cron intentionally does NOT use NextAuth.
     It is an external scheduler endpoint protected
     exclusively by LIVE_CRON_SECRET.
  ===================================================== */

  if (!isAuthorized(request)) {
    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized",
      },
      { status: 401 }
    );
  }

  const now = new Date();

  try {
    /* ===================================================
       FIND DUE AUTOMATION RULES
    =================================================== */

    const dueRules =
      await prisma.liveAutomationRule.findMany(
        {
          where: {
            status:
              LiveAutomationStatus.active,

            nextRunAt: {
              lte: now,
            },

            event: {
              status: {
                in: [
                  "live",
                  "scheduled",
                ],
              },

              enableAutomation: true,
            },
          },

          orderBy: {
            nextRunAt: "asc",
          },

          take: MAX_RULES_PER_RUN,

          select: {
            id: true,
            eventId: true,
            fetchIntervalSeconds: true,
          },
        }
      );

    const results: Array<
      Record<string, unknown>
    > = [];

    /* ===================================================
       PROCESS RULES ONE-BY-ONE
       
       Sequential execution is intentional:
       it prevents this cron invocation from creating
       unnecessary concurrent ingestion pressure.
    =================================================== */

    for (const rule of dueRules) {
      const intervalSeconds =
        Math.max(
          Number(
            rule.fetchIntervalSeconds
          ) || MIN_INTERVAL_SECONDS,
          MIN_INTERVAL_SECONDS
        );

      /*
       * Claim the rule before execution.
       *
       * Another cron invocation can see the same rule,
       * but only one invocation can successfully change
       * nextRunAt while it is still due.
       */

      const claimUntil =
        new Date(
          now.getTime() +
            intervalSeconds * 1000
        );

      const claimed =
        await prisma.liveAutomationRule.updateMany(
          {
            where: {
              id: rule.id,

              status:
                LiveAutomationStatus.active,

              nextRunAt: {
                lte: now,
              },

              event: {
                status: {
                  in: [
                    "live",
                    "scheduled",
                  ],
                },

                enableAutomation: true,
              },
            },

            data: {
              nextRunAt: claimUntil,
            },
          }
        );

      if (claimed.count !== 1) {
        continue;
      }

      /* =================================================
         EXECUTE CLAIMED RULE
      ================================================= */

      try {
        const result =
          await runLiveAutomationRule(
            rule.id
          );

        results.push({
          success: true,
          ruleId: rule.id,
          eventId: rule.eventId,
          ...result,
        });
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Automation execution failed";

        /*
         * Never leave a failed rule permanently claimed.
         * Schedule its next retry using its configured
         * interval and preserve the error for admin review.
         */

        const retryAt =
          new Date(
            Date.now() +
              intervalSeconds * 1000
          );

        try {
          await prisma.liveAutomationRule.update(
            {
              where: {
                id: rule.id,
              },

              data: {
                lastRunAt: new Date(),
                nextRunAt: retryAt,

                totalRuns: {
                  increment: 1,
                },

                lastError: message,
              },
            }
          );
        } catch (updateError) {
          console.error(
            "LIVE AUTOMATION CRON FAILURE UPDATE ERROR:",
            updateError
          );
        }

        console.error(
          `LIVE AUTOMATION RULE ${rule.id} FAILED:`,
          error
        );

        results.push({
          success: false,
          ruleId: rule.id,
          eventId: rule.eventId,
          error: message,
        });
      }
    }

    /* ===================================================
       RESPONSE
    =================================================== */

    const successful =
      results.filter(
        (item) =>
          item.success === true
      ).length;

    const failed =
      results.filter(
        (item) =>
          item.success === false
      ).length;

    return NextResponse.json({
      success: true,

      data: {
        executed: results.length,
        successful,
        failed,
        discovered:
          dueRules.length,
        results,
        executedAt: now,
      },
    });
  } catch (error) {
    console.error(
      "LIVE AUTOMATION CRON ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Cron execution failed",
      },
      { status: 500 }
    );
  }
}

/* =======================================================
   GET DISABLED
======================================================= */

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: "Use POST",
    },
    {
      status: 405,
      headers: {
        Allow: "POST",
      },
    }
  );
}