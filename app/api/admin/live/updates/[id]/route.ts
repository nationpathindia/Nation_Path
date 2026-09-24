import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { requireAdminApi } from "@/lib/auth/admin-api";

export const dynamic = "force-dynamic";

/* =========================================================
   ACCESS
========================================================= */

const ALLOWED_ROLES = [
  "superadmin",
  "admin",
  "editor",
  "reporter",
];

/* =========================================================
   ENUMS
========================================================= */

const UPDATE_TYPES = [
  "update",
  "breaking",
  "analysis",
  "statement",
  "result",
  "alert",
  "correction",
  "summary",
] as const;

const UPDATE_STATUSES = [
  "draft",
  "scheduled",
  "published",
  "corrected",
  "archived",
] as const;

const VERIFICATION_STATUSES = [
  "unverified",
  "under_review",
  "verified",
  "partially_verified",
  "correction_required",
] as const;

const SOURCE_TYPES = [
  "rss",
  "api",
  "manual",
  "newsroom",
] as const;

/* =========================================================
   HELPERS
========================================================= */

function hasOwn(
  object: Record<string, unknown>,
  key: string
) {
  return Object.prototype.hasOwnProperty.call(
    object,
    key
  );
}

function parseDate(value: unknown) {
  if (value === undefined) {
    return undefined;
  }

  if (value === null || value === "") {
    return null;
  }

  const date = new Date(String(value));

  return Number.isNaN(date.getTime())
    ? undefined
    : date;
}

function isValidValue<
  T extends readonly string[]
>(
  values: T,
  value: unknown
): value is T[number] {
  return (
    typeof value === "string" &&
    values.includes(value as T[number])
  );
}

/* =========================================================
   EVENT AGGREGATE SYNC
========================================================= */

async function syncEvent(eventId: string) {
  const [
    count,
    latestUpdate,
    latestPublished,
  ] = await Promise.all([
    prisma.liveUpdate.count({
      where: {
        eventId,
        status: {
          not: "archived",
        },
      },
    }),

    prisma.liveUpdate.findFirst({
      where: {
        eventId,
        status: {
          not: "archived",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        createdAt: true,
      },
    }),

    prisma.liveUpdate.findFirst({
      where: {
        eventId,
        status: "published",
        publishedAt: {
          not: null,
        },
      },
      orderBy: {
        publishedAt: "desc",
      },
      select: {
        publishedAt: true,
      },
    }),
  ]);

  await prisma.liveEvent.update({
    where: {
      id: eventId,
    },
    data: {
      updateCount: count,
      lastUpdateAt:
        latestUpdate?.createdAt ?? null,
      lastPublishedAt:
        latestPublished?.publishedAt ?? null,
    },
  });
}

/* =========================================================
   RESPONSE INCLUDE
========================================================= */

const updateInclude = {
  event: {
    select: {
      id: true,
      title: true,
      slug: true,
      segment: true,
      status: true,
    },
  },

  author: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },

  source: {
    select: {
      id: true,
      name: true,
      type: true,
      url: true,
      rssUrl: true,
      apiUrl: true,
      priority: true,
      trustLevel: true,
      isActive: true,
    },
  },
};

/* =========================================================
   GET
   /api/admin/live/updates/[id]
========================================================= */

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
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
          error: "Update ID is required",
        },
        { status: 400 }
      );
    }

    const update =
      await prisma.liveUpdate.findUnique({
        where: {
          id,
        },
        include: updateInclude,
      });

    if (!update) {
      return NextResponse.json(
        {
          success: false,
          error: "Live update not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: update,
    });
  } catch (error) {
    console.error(
      "GET /api/admin/live/updates/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch live update",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   PATCH
   /api/admin/live/updates/[id]
========================================================= */

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
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
          error: "Update ID is required",
        },
        { status: 400 }
      );
    }

    const body =
      (await request.json()) as Record<
        string,
        unknown
      >;

    /* =====================================================
       EXISTING UPDATE
    ===================================================== */

    const existing =
      await prisma.liveUpdate.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          eventId: true,
          status: true,
          publishedAt: true,
          scheduledAt: true,
          authorId: true,
        },
      });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: "Live update not found",
        },
        { status: 404 }
      );
    }

    /* =====================================================
       PARENT EVENT
    ===================================================== */

    const parentEvent =
      await prisma.liveEvent.findUnique({
        where: {
          id: existing.eventId,
        },
        select: {
          id: true,
          status: true,
        },
      });

    if (!parentEvent) {
      return NextResponse.json(
        {
          success: false,
          error: "Parent live event not found",
        },
        { status: 404 }
      );
    }

    if (parentEvent.status === "archived") {
      return NextResponse.json(
        {
          success: false,
          error:
            "Cannot modify an update belonging to an archived live event.",
        },
        { status: 400 }
      );
    }

    const data: Record<
      string,
      unknown
    > = {};

    /* =====================================================
       CONTENT
    ===================================================== */

    if (hasOwn(body, "headline")) {
      data.headline =
        body.headline === null ||
        body.headline === undefined ||
        String(body.headline).trim() === ""
          ? null
          : String(
              body.headline
            ).trim();
    }

    if (hasOwn(body, "content")) {
      const value = String(
        body.content ?? ""
      ).trim();

      if (!value) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Live update content is required.",
          },
          { status: 400 }
        );
      }

      data.content = value;
    }

    /* =====================================================
       TYPE
    ===================================================== */

    if (hasOwn(body, "type")) {
      if (
        !isValidValue(
          UPDATE_TYPES,
          body.type
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid update type.",
          },
          { status: 400 }
        );
      }

      data.type = body.type;
    }

    /* =====================================================
       STATUS
    ===================================================== */

    if (hasOwn(body, "status")) {
      if (
        !isValidValue(
          UPDATE_STATUSES,
          body.status
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid update status.",
          },
          { status: 400 }
        );
      }

      data.status = body.status;
    }

    /* =====================================================
       VERIFICATION
    ===================================================== */

    if (
      hasOwn(
        body,
        "verificationStatus"
      )
    ) {
      if (
        !isValidValue(
          VERIFICATION_STATUSES,
          body.verificationStatus
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Invalid verification status.",
          },
          { status: 400 }
        );
      }

      data.verificationStatus =
        body.verificationStatus;
    }

    /* =====================================================
       FLAGS
    ===================================================== */

    if (
      hasOwn(
        body,
        "isBreaking"
      )
    ) {
      data.isBreaking = Boolean(
        body.isBreaking
      );
    }

    if (
      hasOwn(
        body,
        "isPinned"
      )
    ) {
      data.isPinned = Boolean(
        body.isPinned
      );
    }

    /* =====================================================
       DATES
    ===================================================== */

    if (
      hasOwn(
        body,
        "publishedAt"
      )
    ) {
      const value = parseDate(
        body.publishedAt
      );

      if (
        body.publishedAt !== null &&
        body.publishedAt !== "" &&
        value === undefined
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Invalid publishedAt.",
          },
          { status: 400 }
        );
      }

      data.publishedAt = value;
    }

    if (
      hasOwn(
        body,
        "scheduledAt"
      )
    ) {
      const value = parseDate(
        body.scheduledAt
      );

      if (
        body.scheduledAt !== null &&
        body.scheduledAt !== "" &&
        value === undefined
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Invalid scheduledAt.",
          },
          { status: 400 }
        );
      }

      data.scheduledAt = value;
    }

    /* =====================================================
       SOURCE
    ===================================================== */

    if (
      hasOwn(
        body,
        "sourceName"
      )
    ) {
      data.sourceName =
        body.sourceName === null ||
        body.sourceName === undefined ||
        String(
          body.sourceName
        ).trim() === ""
          ? null
          : String(
              body.sourceName
            ).trim();
    }

    if (
      hasOwn(
        body,
        "sourceUrl"
      )
    ) {
      data.sourceUrl =
        body.sourceUrl === null ||
        body.sourceUrl === undefined ||
        String(
          body.sourceUrl
        ).trim() === ""
          ? null
          : String(
              body.sourceUrl
            ).trim();
    }

    if (
      hasOwn(
        body,
        "sourceType"
      )
    ) {
      if (
        !isValidValue(
          SOURCE_TYPES,
          body.sourceType
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Invalid source type.",
          },
          { status: 400 }
        );
      }

      data.sourceType =
        body.sourceType;
    }

    if (
      hasOwn(
        body,
        "sourceId"
      )
    ) {
      if (!body.sourceId) {
        data.sourceId = null;
      } else {
        const sourceId =
          String(body.sourceId);

        const source =
          await prisma.liveSource.findUnique(
            {
              where: {
                id: sourceId,
              },
              select: {
                id: true,
                isActive: true,
              },
            }
          );

        if (!source) {
          return NextResponse.json(
            {
              success: false,
              error:
                "Live source not found.",
            },
            { status: 404 }
          );
        }

        if (!source.isActive) {
          return NextResponse.json(
            {
              success: false,
              error:
                "Live source is inactive.",
            },
            { status: 400 }
          );
        }

        data.sourceId = sourceId;
      }
    }

    /* =====================================================
       MEDIA
    ===================================================== */

    for (const field of [
      "imageUrl",
      "imageAlt",
      "videoUrl",
      "embedUrl",
    ]) {
      if (hasOwn(body, field)) {
        const value = body[field];

        data[field] =
          value === null ||
          value === undefined ||
          String(value).trim() === ""
            ? null
            : String(value).trim();
      }
    }

    /* =====================================================
       AUTHOR
       Client authorId is not trusted.
    ===================================================== */

    if (hasOwn(body, "authorId")) {
      /*
       * Only authenticated admin users can assign the
       * current authenticated user as author.
       *
       * We deliberately do not accept arbitrary user IDs
       * from the client.
       */
      data.authorId =
        auth.userId || null;
    }

    /* =====================================================
       VERIFICATION NOTES
    ===================================================== */

    if (
      hasOwn(
        body,
        "verificationNotes"
      )
    ) {
      data.verificationNotes =
        body.verificationNotes ===
          null ||
        body.verificationNotes ===
          undefined ||
        String(
          body.verificationNotes
        ).trim() === ""
          ? null
          : String(
              body.verificationNotes
            ).trim();
    }

    /* =====================================================
       CORRECTION
    ===================================================== */

    if (
      hasOwn(
        body,
        "correctionOfId"
      )
    ) {
      if (!body.correctionOfId) {
        data.correctionOfId = null;
      } else {
        const correctionId =
          String(
            body.correctionOfId
          );

        if (correctionId === id) {
          return NextResponse.json(
            {
              success: false,
              error:
                "An update cannot correct itself.",
            },
            { status: 400 }
          );
        }

        const original =
          await prisma.liveUpdate.findUnique(
            {
              where: {
                id: correctionId,
              },
              select: {
                id: true,
                eventId: true,
              },
            }
          );

        if (
          !original ||
          original.eventId !==
            existing.eventId
        ) {
          return NextResponse.json(
            {
              success: false,
              error:
                "Invalid correction target.",
            },
            { status: 400 }
          );
        }

        data.correctionOfId =
          correctionId;
      }
    }

    /* =====================================================
       AUTOMATION
    ===================================================== */

    if (
      hasOwn(
        body,
        "isAutomated"
      )
    ) {
      data.isAutomated = Boolean(
        body.isAutomated
      );
    }

    if (
      hasOwn(
        body,
        "automationMeta"
      )
    ) {
      data.automationMeta =
        body.automationMeta ??
        null;
    }

    /* =====================================================
       FINAL STATUS
    ===================================================== */

    let finalStatus =
      data.status !== undefined
        ? String(data.status)
        : existing.status;

    const finalType =
      data.type !== undefined
        ? String(data.type)
        : undefined;

    /*
     * Correction is an explicit editorial action.
     */
    if (
      finalType === "correction" ||
      body.markCorrected === true
    ) {
      finalStatus = "corrected";
      data.status = "corrected";
    }

    /* =====================================================
       SCHEDULE VALIDATION
    ===================================================== */

    const finalScheduledAt =
      data.scheduledAt !== undefined
        ? data.scheduledAt
        : existing.scheduledAt;

    if (finalStatus === "scheduled") {
      if (
        !(
          finalScheduledAt instanceof
          Date
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "A future scheduled date and time is required.",
          },
          { status: 400 }
        );
      }

      if (
        finalScheduledAt <= new Date()
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Scheduled publish time must be in the future.",
          },
          { status: 400 }
        );
      }
    }

    /* =====================================================
       PUBLISH NORMALIZATION
    ===================================================== */

    if (finalStatus === "published") {
      const suppliedPublishedAt =
        data.publishedAt !== undefined
          ? data.publishedAt
          : existing.publishedAt;

      if (
        !(
          suppliedPublishedAt instanceof
          Date
        )
      ) {
        data.publishedAt =
          new Date();
      }

      /*
       * Published update cannot retain
       * a stale scheduled date.
       */
      data.scheduledAt = null;
    }

    if (finalStatus === "draft") {
      data.publishedAt = null;
    }

    if (finalStatus === "archived") {
      data.isBreaking = false;
      data.isPinned = false;
    }

    /* =====================================================
       DATABASE UPDATE
    ===================================================== */

    const updated =
      await prisma.liveUpdate.update({
        where: {
          id,
        },

        data: data as any,

        include: updateInclude,
      });

    /* =====================================================
       EVENT AGGREGATE
    ===================================================== */

    await syncEvent(
      existing.eventId
    );

    return NextResponse.json({
      success: true,
      message:
        "Live update saved successfully.",
      data: updated,
    });
  } catch (error) {
    console.error(
      "PATCH /api/admin/live/updates/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to save live update.",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   DELETE = SAFE ARCHIVE
========================================================= */

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
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
          error: "Update ID is required.",
        },
        { status: 400 }
      );
    }

    const existing =
      await prisma.liveUpdate.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          eventId: true,
          status: true,
        },
      });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Live update not found.",
        },
        { status: 404 }
      );
    }

    if (
      existing.status === "archived"
    ) {
      return NextResponse.json({
        success: true,
        message:
          "Live update is already archived.",
      });
    }

    const archived =
      await prisma.liveUpdate.update({
        where: {
          id,
        },

        data: {
          status: "archived",
          isBreaking: false,
          isPinned: false,
        },

        include: updateInclude,
      });

    await syncEvent(
      existing.eventId
    );

    return NextResponse.json({
      success: true,
      message:
        "Live update deleted from the active timeline and archived.",
      data: archived,
    });
  } catch (error) {
    console.error(
      "DELETE /api/admin/live/updates/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete live update.",
      },
      { status: 500 }
    );
  }
}