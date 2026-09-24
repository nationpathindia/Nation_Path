import { NextRequest, NextResponse } from "next/server";
import {
  LiveUpdateStatus,
  LiveVerificationStatus,
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

function isVerificationStatus(
  value: string
): value is LiveVerificationStatus {
  return Object.values(
    LiveVerificationStatus
  ).includes(
    value as LiveVerificationStatus
  );
}

function isUpdateStatus(
  value: string
): value is LiveUpdateStatus {
  return Object.values(
    LiveUpdateStatus
  ).includes(
    value as LiveUpdateStatus
  );
}

function parsePositiveInt(
  value: string | null,
  fallback: number
) {
  const parsed = Number(value);

  if (
    !Number.isFinite(parsed) ||
    parsed < 1
  ) {
    return fallback;
  }

  return Math.floor(parsed);
}

/* =========================================================
   GET — REVIEW QUEUE
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

    /* =====================================================
       FILTERS
    ===================================================== */

    const rawStatus =
      searchParams.get("status");

    const rawVerification =
      searchParams.get(
        "verificationStatus"
      );

    const verificationStatus =
      rawVerification?.trim() ||
      "under_review";

    const eventId =
      searchParams
        .get("eventId")
        ?.trim();

    const search =
      searchParams
        .get("search")
        ?.trim();

    /* =====================================================
       VALIDATE ENUM FILTERS
    ===================================================== */

    if (
      rawStatus &&
      rawStatus !== "all" &&
      !isUpdateStatus(
        rawStatus
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid update status filter",
        },
        { status: 400 }
      );
    }

    if (
      verificationStatus !==
        "all" &&
      !isVerificationStatus(
        verificationStatus
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid verification status filter",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       PAGINATION
    ===================================================== */

    const page = Math.max(
      parsePositiveInt(
        searchParams.get("page"),
        1
      ),
      1
    );

    const limit = Math.min(
      parsePositiveInt(
        searchParams.get("limit"),
        20
      ),
      100
    );

    /* =====================================================
       WHERE
    ===================================================== */

    const where: any = {};

    if (
      verificationStatus !==
      "all"
    ) {
      where.verificationStatus =
        verificationStatus;
    }

    if (eventId) {
      where.eventId = eventId;
    }

    if (
      rawStatus &&
      rawStatus !== "all"
    ) {
      where.status = rawStatus;
    }

    if (search) {
      where.OR = [
        {
          headline: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          sourceName: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          event: {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      ];
    }

    /* =====================================================
       QUERY
    ===================================================== */

    const [
      updates,
      total,
      underReview,
      correctionRequired,
    ] = await Promise.all([
      prisma.liveUpdate.findMany({
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
              trustLevel: true,
              isActive: true,
            },
          },
        },

        orderBy: [
          {
            isBreaking: "desc",
          },
          {
            createdAt: "desc",
          },
        ],

        skip:
          (page - 1) * limit,

        take: limit,
      }),

      prisma.liveUpdate.count({
        where,
      }),

      prisma.liveUpdate.count({
        where: {
          verificationStatus:
            LiveVerificationStatus.under_review,
        },
      }),

      prisma.liveUpdate.count({
        where: {
          verificationStatus:
            LiveVerificationStatus.correction_required,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,

      data: updates,

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
        underReview,
        correctionRequired,
      },
    });
  } catch (error) {
    console.error(
      "LIVE REVIEW GET ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to load review queue",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   PATCH — REVIEW / VERIFY UPDATE
========================================================= */

export async function PATCH(
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
            "Invalid JSON body",
        },
        { status: 400 }
      );
    }

    const id =
      String(
        body?.id || ""
      ).trim();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Update ID is required",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       LOAD EXISTING UPDATE
    ===================================================== */

    const existing =
      await prisma.liveUpdate.findUnique(
        {
          where: {
            id,
          },

          include: {
            event: {
              select: {
                id: true,
                status: true,
              },
            },
          },
        }
      );

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Live update not found",
        },
        { status: 404 }
      );
    }

    /* =====================================================
       EVENT STATE PROTECTION
    ===================================================== */

    if (
      existing.event.status ===
        "archived" ||
      existing.event.status ===
        "completed"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Cannot review an update from a completed or archived live event",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       NEXT VALUES
    ===================================================== */

    const nextVerification =
      body.verificationStatus !==
      undefined
        ? String(
            body.verificationStatus
          ).trim()
        : existing.verificationStatus;

    const requestedStatus =
      body.status !== undefined
        ? String(
            body.status
          ).trim()
        : existing.status;

    /* =====================================================
       ENUM VALIDATION
    ===================================================== */

    if (
      !isVerificationStatus(
        nextVerification
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid verification status",
        },
        { status: 400 }
      );
    }

    if (
      !isUpdateStatus(
        requestedStatus
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid update status",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       CORRECTION OVERRIDE
       
       Correction-required updates must never remain
       published. The verification state controls this.
    ===================================================== */

    let nextStatus =
      requestedStatus;

    if (
      nextVerification ===
      LiveVerificationStatus.correction_required
    ) {
      nextStatus =
        LiveUpdateStatus.corrected;
    }

    /* =====================================================
       VERIFICATION NOTES
    ===================================================== */

    let verificationNotes =
      existing.verificationNotes;

    if (
      body.verificationNotes !==
      undefined
    ) {
      const notes =
        String(
          body.verificationNotes ??
            ""
        ).trim();

      verificationNotes =
        notes.slice(0, 10000);
    }

    /* =====================================================
       PUBLISH DATE
    ===================================================== */

    const isPublishing =
      nextStatus ===
      LiveUpdateStatus.published;

    const publishedAt =
      isPublishing
        ? existing.publishedAt ||
          new Date()
        : existing.publishedAt;

    /* =====================================================
       UPDATE DATA
    ===================================================== */

    const data: any = {
      verificationStatus:
        nextVerification,

      status: nextStatus,

      verificationNotes,

      publishedAt,
    };

    /* =====================================================
       TRANSACTION
    ===================================================== */

    const updated =
      await prisma.$transaction(
        async (tx) => {
          const result =
            await tx.liveUpdate.update({
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
                  },
                },
              },
            });

          /* ===============================================
             RECALCULATE EVENT TIMESTAMPS
          =============================================== */

          const latestPublished =
            await tx.liveUpdate.findFirst(
              {
                where: {
                  eventId:
                    existing.eventId,

                  status:
                    LiveUpdateStatus.published,

                  publishedAt: {
                    not: null,
                  },
                },

                orderBy: {
                  publishedAt:
                    "desc",
                },

                select: {
                  publishedAt: true,
                },
              }
            );

          const latestAny =
            await tx.liveUpdate.findFirst(
              {
                where: {
                  eventId:
                    existing.eventId,

                  status: {
                    not:
                      LiveUpdateStatus.archived,
                  },
                },

                orderBy: {
                  createdAt:
                    "desc",
                },

                select: {
                  createdAt: true,
                },
              }
            );

          await tx.liveEvent.update({
            where: {
              id: existing.eventId,
            },

            data: {
              lastUpdateAt:
                latestAny?.createdAt ||
                new Date(),

              lastPublishedAt:
                latestPublished
                  ?.publishedAt ||
                null,
            },
          });

          return result;
        }
      );

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error(
      "LIVE REVIEW PATCH ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to review update",
      },
      { status: 500 }
    );
  }
}