import { LiveAutomationStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ingestLiveSource } from "@/lib/live/ingestion";

export async function runLiveAutomationRule(ruleId: string) {
  const rule = await prisma.liveAutomationRule.findUnique({
    where: {
      id: ruleId,
    },
    include: {
      event: {
        select: {
          id: true,
          title: true,
          status: true,
          enableAutomation: true,
        },
      },
    },
  });

  if (!rule) {
    throw new Error("Automation rule not found");
  }

  if (rule.status !== LiveAutomationStatus.active) {
    throw new Error("Automation rule is not active");
  }

  if (
    rule.event.status === "archived" ||
    rule.event.status === "completed"
  ) {
    throw new Error("Live event is no longer active");
  }

  if (!rule.event.enableAutomation) {
    throw new Error("Automation is disabled for this live event");
  }

  const sourceIds =
    rule.sourceIds.length > 0
      ? rule.sourceIds
      : (
          await prisma.liveEventSource.findMany({
            where: {
              eventId: rule.eventId,
              enabled: true,
              source: {
                isActive: true,
              },
            },
            orderBy: {
              priority: "desc",
            },
            select: {
              sourceId: true,
            },
          })
        ).map((item) => item.sourceId);

  let fetched = 0;
  let accepted = 0;
  let published = 0;
  let duplicates = 0;
  let skipped = 0;

  const errors: string[] = [];

  for (const sourceId of sourceIds) {
    try {
      const result = await ingestLiveSource(
        sourceId,
        rule.eventId,
        {
          keywords: rule.keywords,
          excludeKeywords: rule.excludeKeywords,
          matchMode: rule.matchMode,
          autoPublish: rule.autoPublish,
          requireVerification: rule.requireVerification,
          autoBreaking: rule.autoBreaking,
          autoSummarize: rule.autoSummarize,
          autoDeduplicate: rule.autoDeduplicate,
        }
      );

      fetched += result.fetched;
      accepted += result.accepted;
      published += result.published;
      duplicates += result.duplicates;
      skipped += result.skipped;

      await prisma.liveSource.update({
        where: {
          id: sourceId,
        },
        data: {
          lastFetchedAt: new Date(),
          lastSuccessAt: new Date(),
          nextFetchAt: new Date(
            Date.now() +
              rule.fetchIntervalSeconds * 1000
          ),
          consecutiveErrors: 0,
          lastErrorAt: null,
        },
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown source ingestion error";

      errors.push(`${sourceId}: ${message}`);

      await prisma.liveSource.update({
        where: {
          id: sourceId,
        },
        data: {
          lastFetchedAt: new Date(),
          lastErrorAt: new Date(),
          consecutiveErrors: {
            increment: 1,
          },
        },
      });
    }
  }

  const now = new Date();

  await prisma.liveAutomationRule.update({
    where: {
      id: rule.id,
    },
    data: {
      lastRunAt: now,

      nextRunAt: new Date(
        now.getTime() +
          rule.fetchIntervalSeconds * 1000
      ),

      totalRuns: {
        increment: 1,
      },

      totalFetched: {
        increment: fetched,
      },

      totalPublished: {
        increment: published,
      },

      lastError:
        errors.length > 0
          ? errors.join("\n")
          : null,
    },
  });

  return {
    ruleId: rule.id,
    eventId: rule.eventId,
    eventTitle: rule.event.title,

    sources: sourceIds.length,

    fetched,
    accepted,
    published,
    duplicates,
    skipped,

    errors,
  };
}