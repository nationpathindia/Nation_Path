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

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function uniqueSlug(title: string) {
  const base = slugify(title) || `live-event-${Date.now()}`;

  let slug = base;
  let counter = 1;

  while (true) {
    const existing = await prisma.liveEvent.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!existing) return slug;

    counter += 1;
    slug = `${base}-${counter}`;
  }
}

/**
 * GET
 *
 * Admin Live Event listing.
 */
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

    const segment = searchParams.get("segment");
    const status = searchParams.get("status");
    const search = searchParams.get("search")?.trim() || "";
    const featured = searchParams.get("featured");

    const page = Math.max(
      Number(searchParams.get("page") || "1"),
      1
    );

    const limit = Math.min(
      Math.max(Number(searchParams.get("limit") || "20"), 1),
      100
    );

    const skip = (page - 1) * limit;

    const where: any = {};

    if (
      segment &&
      VALID_SEGMENTS.includes(
        segment as (typeof VALID_SEGMENTS)[number]
      )
    ) {
      where.segment = segment;
    }

    if (
      status &&
      VALID_STATUSES.includes(
        status as (typeof VALID_STATUSES)[number]
      )
    ) {
      where.status = status;
    }

    if (featured === "true") {
      where.isFeatured = true;
    }

    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          slug: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    const [events, total] = await Promise.all([
      prisma.liveEvent.findMany({
        where,
        orderBy: [
          {
            isFeatured: "desc",
          },
          {
            lastUpdateAt: "desc",
          },
          {
            createdAt: "desc",
          },
        ],
        skip,
        take: limit,
        include: {
          _count: {
            select: {
              updates: true,
              sources: true,
              articleLinks: true,
            },
          },
        },
      }),

      prisma.liveEvent.count({
        where,
      }),
    ]);

    const counts = await Promise.all([
      prisma.liveEvent.count({
        where: {
          status: "live",
        },
      }),

      prisma.liveEvent.count({
        where: {
          status: "scheduled",
        },
      }),

      prisma.liveEvent.count({
        where: {
          status: "paused",
        },
      }),

      prisma.liveEvent.count({
        where: {
          status: "completed",
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        events,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
        overview: {
          live: counts[0],
          scheduled: counts[1],
          paused: counts[2],
          completed: counts[3],
          total,
        },
      },
    });
  } catch (error) {
    console.error("LIVE_EVENTS_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load live events",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * POST
 *
 * Create a new Live Event.
 */
export async function POST(request: NextRequest) {
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
      title,
      slug,
      description,
      segment,
      coverImage,
      coverImageAlt,
      status = "draft",

      isFeatured = false,
      showOnHomepage = false,
      showInLiveCenter = true,
      enableAutomation = false,

      startAt,
      endAt,

      seoTitle,
      seoDescription,
      seoKeywords,
      canonicalUrl,
    } = body;

    /*
     * --------------------------------------------------
     * VALIDATION
     * --------------------------------------------------
     */

    if (!title || typeof title !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Title is required",
        },
        { status: 400 }
      );
    }

    if (
      !segment ||
      !VALID_SEGMENTS.includes(
        segment as (typeof VALID_SEGMENTS)[number]
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Valid segment is required: sports, india, world, business or breaking",
        },
        { status: 400 }
      );
    }

    if (
      !VALID_STATUSES.includes(
        status as (typeof VALID_STATUSES)[number]
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid live event status",
        },
        { status: 400 }
      );
    }

    /*
     * --------------------------------------------------
     * SLUG
     * --------------------------------------------------
     */

    let finalSlug: string;

    if (slug && typeof slug === "string") {
      const normalizedSlug = slugify(slug);

      if (!normalizedSlug) {
        finalSlug = await uniqueSlug(title);
      } else {
        const existing = await prisma.liveEvent.findUnique({
          where: {
            slug: normalizedSlug,
          },
          select: {
            id: true,
          },
        });

        if (existing) {
          return NextResponse.json(
            {
              success: false,
              error: "Slug already exists",
            },
            { status: 409 }
          );
        }

        finalSlug = normalizedSlug;
      }
    } else {
      finalSlug = await uniqueSlug(title);
    }

    /*
     * --------------------------------------------------
     * DATE VALIDATION
     * --------------------------------------------------
     */

    let parsedStartAt: Date | undefined;
    let parsedEndAt: Date | undefined;

    if (startAt) {
      parsedStartAt = new Date(startAt);

      if (Number.isNaN(parsedStartAt.getTime())) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid startAt",
          },
          { status: 400 }
        );
      }
    }

    if (endAt) {
      parsedEndAt = new Date(endAt);

      if (Number.isNaN(parsedEndAt.getTime())) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid endAt",
          },
          { status: 400 }
        );
      }
    }

    if (
      parsedStartAt &&
      parsedEndAt &&
      parsedEndAt <= parsedStartAt
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "endAt must be later than startAt",
        },
        { status: 400 }
      );
    }

    /*
     * --------------------------------------------------
     * CREATE
     * --------------------------------------------------
     */

    const event = await prisma.liveEvent.create({
      data: {
        title: title.trim(),

        slug: finalSlug,

        description:
          typeof description === "string"
            ? description.trim() || null
            : null,

        segment,

        coverImage:
          typeof coverImage === "string"
            ? coverImage || null
            : null,

        coverImageAlt:
          typeof coverImageAlt === "string"
            ? coverImageAlt || null
            : null,

        status,

        isFeatured: Boolean(isFeatured),
        showOnHomepage: Boolean(showOnHomepage),
        showInLiveCenter: Boolean(showInLiveCenter),
        enableAutomation: Boolean(enableAutomation),

        startAt: parsedStartAt,
        endAt: parsedEndAt,

        seoTitle:
          typeof seoTitle === "string"
            ? seoTitle || null
            : null,

        seoDescription:
          typeof seoDescription === "string"
            ? seoDescription || null
            : null,

        seoKeywords:
          typeof seoKeywords === "string"
            ? seoKeywords || null
            : null,

        canonicalUrl:
          typeof canonicalUrl === "string"
            ? canonicalUrl || null
            : null,

        createdById:
          typeof auth.userId === "string"
            ? auth.userId
            : undefined,
      },

      include: {
        _count: {
          select: {
            updates: true,
            sources: true,
            articleLinks: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Live event created successfully",
        data: event,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("LIVE_EVENTS_POST_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create live event",
      },
      {
        status: 500,
      }
    );
  }
}