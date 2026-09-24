import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/auth/admin-api";

export const dynamic = "force-dynamic";

const ALLOWED_ROLES = [
  "superadmin",
  "admin",
  "editor",
  "reporter",
];

const VALID_SEGMENTS = [
  "sports",
  "india",
  "world",
  "business",
  "breaking",
] as const;

const VALID_STATUSES = [
  "draft",
  "scheduled",
  "live",
  "paused",
  "completed",
  "archived",
] as const;

function isValidSegment(value: unknown) {
  return (
    typeof value === "string" &&
    VALID_SEGMENTS.includes(
      value as (typeof VALID_SEGMENTS)[number]
    )
  );
}

function isValidStatus(value: unknown) {
  return (
    typeof value === "string" &&
    VALID_STATUSES.includes(
      value as (typeof VALID_STATUSES)[number]
    )
  );
}

function parseDate(
  value: unknown,
  fieldName: string
): Date | null | undefined {
  if (value === undefined) return undefined;

  if (value === null || value === "") {
    return null;
  }

  if (typeof value !== "string") {
    throw new Error(`${fieldName} must be a valid date.`);
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`${fieldName} must be a valid date.`);
  }

  return date;
}

function cleanString(value: unknown) {
  if (typeof value !== "string") return null;

  const cleaned = value.trim();

  return cleaned || null;
}

function normalizeKeywords(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .filter(
        (item): item is string =>
          typeof item === "string"
      )
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

async function getEvent(id: string) {
  return prisma.liveEvent.findUnique({
    where: { id },
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      _count: {
        select: {
          updates: true,
          sources: true,
          articleLinks: true,
          automationRules: true,
        },
      },
    },
  });
}

/**
 * GET /api/admin/live/events/[id]
 */
export async function GET(
  _request: NextRequest,
  context: { params: { id: string } }
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

    const id = context.params.id;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Event ID is required.",
        },
        { status: 400 }
      );
    }

    const event = await getEvent(id);

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          error: "Live event not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error(
      "[GET /api/admin/live/events/[id]]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load live event.",
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/live/events/[id]
 */
export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
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

    const id = context.params.id;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Event ID is required.",
        },
        { status: 400 }
      );
    }

    const existing = await prisma.liveEvent.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        slug: true,
        segment: true,
        status: true,
        startAt: true,
        endAt: true,
      },
    });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: "Live event not found.",
        },
        { status: 404 }
      );
    }

    const body = await request.json();

    const data: Record<string, unknown> = {};

    if (body.title !== undefined) {
      if (
        typeof body.title !== "string" ||
        !body.title.trim()
      ) {
        return NextResponse.json(
          {
            success: false,
            error: "Event title cannot be empty.",
          },
          { status: 400 }
        );
      }

      data.title = body.title.trim();
    }

    if (body.slug !== undefined) {
      if (
        typeof body.slug !== "string" ||
        !body.slug.trim()
      ) {
        return NextResponse.json(
          {
            success: false,
            error: "Event slug cannot be empty.",
          },
          { status: 400 }
        );
      }

      const nextSlug = body.slug.trim();

      if (nextSlug !== existing.slug) {
        const slugOwner =
          await prisma.liveEvent.findUnique({
            where: { slug: nextSlug },
            select: { id: true },
          });

        if (slugOwner && slugOwner.id !== id) {
          return NextResponse.json(
            {
              success: false,
              error:
                "This slug is already being used by another live event.",
            },
            { status: 409 }
          );
        }
      }

      data.slug = nextSlug;
    }

    if (body.description !== undefined) {
      data.description = cleanString(
        body.description
      );
    }

    if (body.segment !== undefined) {
      if (!isValidSegment(body.segment)) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid live segment.",
          },
          { status: 400 }
        );
      }

      data.segment = body.segment;
    }

    if (body.status !== undefined) {
      if (!isValidStatus(body.status)) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid live event status.",
          },
          { status: 400 }
        );
      }

      data.status = body.status;
    }

    if (body.coverImage !== undefined) {
      data.coverImage = cleanString(
        body.coverImage
      );
    }

    if (body.coverImageAlt !== undefined) {
      data.coverImageAlt = cleanString(
        body.coverImageAlt
      );
    }

    if (body.isFeatured !== undefined) {
      data.isFeatured = Boolean(body.isFeatured);
    }

    if (body.showOnHomepage !== undefined) {
      data.showOnHomepage = Boolean(
        body.showOnHomepage
      );
    }

    if (body.showInLiveCenter !== undefined) {
      data.showInLiveCenter = Boolean(
        body.showInLiveCenter
      );
    }

    if (body.enableAutomation !== undefined) {
      data.enableAutomation = Boolean(
        body.enableAutomation
      );
    }

    if (body.seoTitle !== undefined) {
      data.seoTitle = cleanString(
        body.seoTitle
      );
    }

    if (body.seoDescription !== undefined) {
      data.seoDescription = cleanString(
        body.seoDescription
      );
    }

    if (body.seoKeywords !== undefined) {
      data.seoKeywords = normalizeKeywords(
        body.seoKeywords
      );
    }

    if (body.canonicalUrl !== undefined) {
      data.canonicalUrl = cleanString(
        body.canonicalUrl
      );
    }

    try {
      if (body.startAt !== undefined) {
        data.startAt = parseDate(
          body.startAt,
          "Start time"
        );
      }

      if (body.endAt !== undefined) {
        data.endAt = parseDate(
          body.endAt,
          "End time"
        );
      }
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "Invalid event dates.",
        },
        { status: 400 }
      );
    }

    const nextStart =
      data.startAt !== undefined
        ? (data.startAt as Date | null)
        : existing.startAt;

    const nextEnd =
      data.endAt !== undefined
        ? (data.endAt as Date | null)
        : existing.endAt;

    if (
      nextStart &&
      nextEnd &&
      nextEnd <= nextStart
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "End time must be after start time.",
        },
        { status: 400 }
      );
    }

    const nextStatus =
      data.status !== undefined
        ? data.status
        : existing.status;

    if (
      nextStatus === "scheduled" &&
      !nextStart
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "A scheduled live event requires a start time.",
        },
        { status: 400 }
      );
    }

    if (Object.keys(data).length === 0) {
      const event = await getEvent(id);

      return NextResponse.json({
        success: true,
        data: event,
        message: "No changes were supplied.",
      });
    }

    const event = await prisma.liveEvent.update({
      where: { id },
      data,
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        _count: {
          select: {
            updates: true,
            sources: true,
            articleLinks: true,
            automationRules: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: event,
      message:
        "Live event updated successfully.",
    });
  } catch (error) {
    console.error(
      "[PATCH /api/admin/live/events/[id]]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update live event.",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/live/events/[id]
 *
 * PERMANENT deletion.
 *
 * Deletes:
 * - LiveEvent
 * - LiveUpdates belonging to the event
 * - Event/Source mappings
 * - Event/Article mappings
 * - Automation rules
 *
 * Does NOT delete the master LiveSource records.
 */
export async function DELETE(
  _request: NextRequest,
  context: { params: { id: string } }
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

    const id = context.params.id;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Event ID is required.",
        },
        { status: 400 }
      );
    }

    const existing = await prisma.liveEvent.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        updateCount: true,
      },
    });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: "Live event not found.",
        },
        { status: 404 }
      );
    }

    await prisma.$transaction(async (tx) => {
      await tx.liveUpdate.updateMany({
        where: {
          eventId: id,
          correctionOfId: {
            not: null,
          },
        },
        data: {
          correctionOfId: null,
        },
      });

      await tx.liveAutomationRule.deleteMany({
        where: {
          eventId: id,
        },
      });

      await tx.liveEventSource.deleteMany({
        where: {
          eventId: id,
        },
      });

      await tx.liveArticleLink.deleteMany({
        where: {
          eventId: id,
        },
      });

      await tx.liveUpdate.deleteMany({
        where: {
          eventId: id,
        },
      });

      await tx.liveEvent.delete({
        where: {
          id,
        },
      });
    });

    return NextResponse.json({
      success: true,
      data: {
        id: existing.id,
        title: existing.title,
        slug: existing.slug,
        deleted: true,
      },
      message:
        "Live event and all event-specific data were permanently deleted.",
    });
  } catch (error) {
    console.error(
      "[DELETE /api/admin/live/events/[id]]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to permanently delete live event.",
      },
      { status: 500 }
    );
  }
}