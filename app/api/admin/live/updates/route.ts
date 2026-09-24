import { NextRequest, NextResponse } from "next/server";
import {
  LiveSourceType,
  LiveUpdateStatus,
  LiveUpdateType,
  LiveVerificationStatus,
} from "@prisma/client";

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
   ENUM HELPERS
========================================================= */

const UPDATE_TYPES = Object.values(LiveUpdateType);
const UPDATE_STATUSES = Object.values(LiveUpdateStatus);
const VERIFICATION_STATUSES = Object.values(
  LiveVerificationStatus
);
const SOURCE_TYPES = Object.values(LiveSourceType);

function isLiveUpdateType(
  value: unknown
): value is LiveUpdateType {
  return (
    typeof value === "string" &&
    UPDATE_TYPES.includes(value as LiveUpdateType)
  );
}

function isLiveUpdateStatus(
  value: unknown
): value is LiveUpdateStatus {
  return (
    typeof value === "string" &&
    UPDATE_STATUSES.includes(value as LiveUpdateStatus)
  );
}

function isLiveVerificationStatus(
  value: unknown
): value is LiveVerificationStatus {
  return (
    typeof value === "string" &&
    VERIFICATION_STATUSES.includes(
      value as LiveVerificationStatus
    )
  );
}

function isLiveSourceType(
  value: unknown
): value is LiveSourceType {
  return (
    typeof value === "string" &&
    SOURCE_TYPES.includes(value as LiveSourceType)
  );
}

function isValidDate(value: unknown) {
  if (!value) return true;

  const date = new Date(String(value));

  return !Number.isNaN(date.getTime());
}

/* =========================================================
   GET
   /api/admin/live/updates?eventId=...
========================================================= */

export async function GET(request: NextRequest) {
  try {
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

    const { searchParams } = new URL(request.url);

    const eventId = searchParams.get("eventId");
    const status = searchParams.get("status");
    const verificationStatus =
      searchParams.get("verificationStatus");
    const type = searchParams.get("type");
    const search = searchParams.get("search");

    const page = Math.max(
      1,
      Number.parseInt(
        searchParams.get("page") || "1",
        10
      ) || 1
    );

    const limit = Math.min(
      100,
      Math.max(
        1,
        Number.parseInt(
          searchParams.get("limit") || "50",
          10
        ) || 50
      )
    );

    if (!eventId) {
      return NextResponse.json(
        {
          success: false,
          error: "eventId is required",
        },
        { status: 400 }
      );
    }

    const where: any = {
      eventId,
    };

    if (
      status &&
      isLiveUpdateStatus(status)
    ) {
      where.status = status;
    }

    if (
      verificationStatus &&
      isLiveVerificationStatus(
        verificationStatus
      )
    ) {
      where.verificationStatus =
        verificationStatus;
    }

    if (
      type &&
      isLiveUpdateType(type)
    ) {
      where.type = type;
    }

    if (search?.trim()) {
      const searchTerm = search.trim();

      where.OR = [
        {
          headline: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          sourceName: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ];
    }

    const [updates, total] =
      await Promise.all([
        prisma.liveUpdate.findMany({
          where,

          include: {
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
                trustLevel: true,
              },
            },
          },

          orderBy: [
            {
              isPinned: "desc",
            },
            {
              publishedAt: "desc",
            },
            {
              createdAt: "desc",
            },
          ],

          skip: (page - 1) * limit,
          take: limit,
        }),

        prisma.liveUpdate.count({
          where,
        }),
      ]);

    const [
      published,
      drafts,
      scheduled,
      review,
    ] = await Promise.all([
      prisma.liveUpdate.count({
        where: {
          eventId,
          status: "published",
        },
      }),

      prisma.liveUpdate.count({
        where: {
          eventId,
          status: "draft",
        },
      }),

      prisma.liveUpdate.count({
        where: {
          eventId,
          status: "scheduled",
        },
      }),

      prisma.liveUpdate.count({
        where: {
          eventId,
          verificationStatus: {
            in: [
              "unverified",
              "under_review",
              "partially_verified",
            ],
          },
        },
      }),
    ]);

    return NextResponse.json({
      success: true,

      data: {
        updates,

        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },

        overview: {
          published,
          drafts,
          scheduled,
          review,
        },
      },
    });
  } catch (error) {
    console.error(
      "GET /api/admin/live/updates error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch live updates",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   POST
   /api/admin/live/updates
========================================================= */

export async function POST(
  request: NextRequest
) {
  try {
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

    const body = await request.json();

    const {
      eventId,
      headline,
      content,

      type = "update",
      status = "draft",
      verificationStatus = "unverified",

      isBreaking = false,
      isPinned = false,

      publishedAt,
      scheduledAt,

      sourceName,
      sourceUrl,
      sourceType = "manual",
      sourceId,

      imageUrl,
      imageAlt,
      videoUrl,
      embedUrl,

      verificationNotes,
      correctionOfId,

      isAutomated = false,
      automationMeta,
    } = body;

    /* =====================================================
       REQUIRED EVENT
    ===================================================== */

    if (!eventId) {
      return NextResponse.json(
        {
          success: false,
          error: "eventId is required",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       REQUIRED CONTENT
    ===================================================== */

    if (
      !content ||
      !String(content).trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "content is required",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       ENUM VALIDATION
    ===================================================== */

    if (!isLiveUpdateType(type)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid update type: ${type}`,
        },
        { status: 400 }
      );
    }

    if (!isLiveUpdateStatus(status)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid update status: ${status}`,
        },
        { status: 400 }
      );
    }

    if (
      !isLiveVerificationStatus(
        verificationStatus
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid verification status: ${verificationStatus}`,
        },
        { status: 400 }
      );
    }

    /* =====================================================
       SOURCE TYPE VALIDATION
    ===================================================== */

    const normalizedSourceType =
      sourceType === undefined ||
      sourceType === null ||
      sourceType === ""
        ? null
        : isLiveSourceType(sourceType)
        ? sourceType
        : null;

    if (
      sourceType !== undefined &&
      sourceType !== null &&
      sourceType !== "" &&
      !isLiveSourceType(sourceType)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid source type: ${sourceType}`,
        },
        { status: 400 }
      );
    }

    /* =====================================================
       DATE VALIDATION
    ===================================================== */

    if (!isValidDate(publishedAt)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid publishedAt",
        },
        { status: 400 }
      );
    }

    if (!isValidDate(scheduledAt)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid scheduledAt",
        },
        { status: 400 }
      );
    }

    if (
      status === "scheduled" &&
      !scheduledAt
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "scheduledAt is required for scheduled updates",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       CORRECTION VALIDATION
    ===================================================== */

    if (correctionOfId) {
      const original =
        await prisma.liveUpdate.findUnique({
          where: {
            id: correctionOfId,
          },

          select: {
            id: true,
            eventId: true,
          },
        });

      if (!original) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Original update for correction was not found",
          },
          { status: 404 }
        );
      }

      if (
        original.eventId !== eventId
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Correction target must belong to the same live event",
          },
          { status: 400 }
        );
      }
    }

    /* =====================================================
       EVENT VALIDATION
    ===================================================== */

    const liveEvent =
      await prisma.liveEvent.findUnique({
        where: {
          id: eventId,
        },

        select: {
          id: true,
          status: true,
        },
      });

    if (!liveEvent) {
      return NextResponse.json(
        {
          success: false,
          error: "Live event not found",
        },
        { status: 404 }
      );
    }

    if (
      liveEvent.status === "archived"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Cannot add updates to an archived live event",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       SOURCE VALIDATION
    ===================================================== */

    if (sourceId) {
      const source =
        await prisma.liveSource.findUnique({
          where: {
            id: sourceId,
          },
          select: {
            id: true,
            isActive: true,
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

      if (!source.isActive) {
        return NextResponse.json(
          {
            success: false,
            error: "Live source is inactive",
          },
          { status: 400 }
        );
      }
    }

    /* =====================================================
       FINAL STATUS / PUBLISH TIME
    ===================================================== */

    const finalStatus: LiveUpdateStatus =
      status;

    let finalPublishedAt:
      | Date
      | null = null;

    if (status === "published") {
      finalPublishedAt = publishedAt
        ? new Date(publishedAt)
        : new Date();
    }

    if (status === "scheduled") {
      finalPublishedAt = null;
    }

    /* =====================================================
       CREATE UPDATE + SYNC EVENT
    ===================================================== */

    const update =
      await prisma.$transaction(
        async (tx) => {
          const created =
            await tx.liveUpdate.create({
              data: {
                eventId,

                headline:
                  headline !== undefined &&
                  headline !== null
                    ? String(
                        headline
                      ).trim() || null
                    : null,

                content:
                  String(content).trim(),

                type,

                status: finalStatus,

                verificationStatus,

                isBreaking:
                  Boolean(isBreaking),

                isPinned:
                  Boolean(isPinned),

                publishedAt:
                  finalPublishedAt,

                scheduledAt:
                  status === "scheduled" &&
                  scheduledAt
                    ? new Date(
                        scheduledAt
                      )
                    : null,

                sourceName:
                  sourceName !== undefined &&
                  sourceName !== null
                    ? String(
                        sourceName
                      ).trim() || null
                    : null,

                sourceUrl:
                  sourceUrl !== undefined &&
                  sourceUrl !== null
                    ? String(
                        sourceUrl
                      ).trim() || null
                    : null,

                sourceType:
                  normalizedSourceType,

                sourceId:
                  sourceId || null,

                imageUrl:
                  imageUrl !== undefined &&
                  imageUrl !== null
                    ? String(
                        imageUrl
                      ).trim() || null
                    : null,

                imageAlt:
                  imageAlt !== undefined &&
                  imageAlt !== null
                    ? String(
                        imageAlt
                      ).trim() || null
                    : null,

                videoUrl:
                  videoUrl !== undefined &&
                  videoUrl !== null
                    ? String(
                        videoUrl
                      ).trim() || null
                    : null,

                embedUrl:
                  embedUrl !== undefined &&
                  embedUrl !== null
                    ? String(
                        embedUrl
                      ).trim() || null
                    : null,

                verificationNotes:
                  verificationNotes !==
                    undefined &&
                  verificationNotes !== null
                    ? String(
                        verificationNotes
                      ).trim() || null
                    : null,

                correctionOfId:
                  correctionOfId || null,

                isAutomated:
                  Boolean(isAutomated),

                automationMeta:
                  automationMeta !== undefined
                    ? automationMeta
                    : undefined,

                /*
                 * IMPORTANT:
                 * The author is always taken from the
                 * authenticated admin session.
                 *
                 * Client-provided authorId is ignored.
                 */
                authorId:
                  auth.userId || null,
              },

              include: {
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
                    trustLevel: true,
                  },
                },
              },
            });

          const eventUpdate: any = {
            updateCount: {
              increment: 1,
            },

            lastUpdateAt:
              new Date(),
          };

          if (
            finalStatus === "published"
          ) {
            eventUpdate.lastPublishedAt =
              finalPublishedAt ||
              new Date();
          }

          await tx.liveEvent.update({
            where: {
              id: eventId,
            },

            data: eventUpdate,
          });

          return created;
        }
      );

    /* =====================================================
       SUCCESS
    ===================================================== */

    return NextResponse.json(
      {
        success: true,
        message:
          "Live update created successfully",
        data: update,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "POST /api/admin/live/updates error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to create live update",
      },
      { status: 500 }
    );
  }
}