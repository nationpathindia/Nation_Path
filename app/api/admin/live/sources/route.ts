import { NextRequest, NextResponse } from "next/server";
import {
  LiveSegment,
  LiveSourceType,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/auth/admin-api";

export const dynamic = "force-dynamic";

const MAX_LIMIT = 100;

const ALLOWED_ROLES = [
  "superadmin",
  "admin",
  "editor",
  "reporter",
];

/* =========================================================
   HELPERS
========================================================= */

function isValidUrl(value?: string | null) {
  if (!value) return true;

  try {
    const url = new URL(value);

    return (
      url.protocol === "http:" ||
      url.protocol === "https:"
    );
  } catch {
    return false;
  }
}

function normalizeOptional(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  return trimmed || null;
}

function isLiveSourceType(
  value: unknown
): value is LiveSourceType {
  return (
    typeof value === "string" &&
    Object.values(LiveSourceType).includes(
      value as LiveSourceType
    )
  );
}

function isLiveSegment(
  value: unknown
): value is LiveSegment {
  return (
    typeof value === "string" &&
    Object.values(LiveSegment).includes(
      value as LiveSegment
    )
  );
}

/* =========================================================
   GET
   /api/admin/live/sources
========================================================= */

export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);

    const search =
      searchParams.get("search")?.trim() || "";

    const type = searchParams.get("type") || "";

    const segment =
      searchParams.get("segment") || "";

    const active = searchParams.get("active");

    const eventId =
      searchParams.get("eventId") || "";

    const page = Math.max(
      1,
      Number.parseInt(
        searchParams.get("page") || "1",
        10
      ) || 1
    );

    const limit = Math.min(
      MAX_LIMIT,
      Math.max(
        1,
        Number.parseInt(
          searchParams.get("limit") || "20",
          10
        ) || 20
      )
    );

    const where: any = {};

    /* =====================================================
       SEARCH
    ===================================================== */

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          url: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          rssUrl: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          apiUrl: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    /* =====================================================
       TYPE FILTER
    ===================================================== */

    if (type) {
      if (!isLiveSourceType(type)) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid source type",
          },
          { status: 400 }
        );
      }

      where.type = type;
    }

    /* =====================================================
       SEGMENT FILTER
    ===================================================== */

    if (segment) {
      if (!isLiveSegment(segment)) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid source segment",
          },
          { status: 400 }
        );
      }

      where.defaultSegment = segment;
    }

    /* =====================================================
       ACTIVE FILTER
    ===================================================== */

    if (active === "true") {
      where.isActive = true;
    }

    if (active === "false") {
      where.isActive = false;
    }

    /* =====================================================
       EVENT FILTER
    ===================================================== */

    if (eventId) {
      where.events = {
        some: {
          eventId,
        },
      };
    }

    /* =====================================================
       QUERY

       IMPORTANT:
       Do not use Prisma groupBy() here.
       Some generated Prisma clients produce a circular
       TypeScript mapped-type error with groupBy().
    ===================================================== */

    const [
      sources,
      total,
      activeCount,
      inactiveCount,
    ] = await Promise.all([
      prisma.liveSource.findMany({
        where,

        include: {
          _count: {
            select: {
              events: true,
              updates: true,
            },
          },
        },

        orderBy: [
          {
            isActive: "desc",
          },
          {
            priority: "desc",
          },
          {
            name: "asc",
          },
        ],

        skip: (page - 1) * limit,

        take: limit,
      }),

      prisma.liveSource.count({
        where,
      }),

      prisma.liveSource.count({
        where: {
          isActive: true,
        },
      }),

      prisma.liveSource.count({
        where: {
          isActive: false,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,

      data: sources,

      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(
          total / limit
        ),
      },

      overview: {
        total,
        active: activeCount,
        inactive: inactiveCount,
      },
    });
  } catch (error) {
    console.error(
      "GET /api/admin/live/sources error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load live sources",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   POST
   /api/admin/live/sources
========================================================= */

export async function POST(request: NextRequest) {
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

    let body: any;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON request body",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       NAME
    ===================================================== */

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          error: "Source name is required",
        },
        { status: 400 }
      );
    }

    if (name.length > 200) {
      return NextResponse.json(
        {
          success: false,
          error: "Source name is too long",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       TYPE
    ===================================================== */

    const type = body.type || "manual";

    if (!isLiveSourceType(type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid source type",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       URLS
    ===================================================== */

    const url = normalizeOptional(body.url);

    const rssUrl = normalizeOptional(
      body.rssUrl
    );

    const apiUrl = normalizeOptional(
      body.apiUrl
    );

    if (
      !isValidUrl(url) ||
      !isValidUrl(rssUrl) ||
      !isValidUrl(apiUrl)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid source URL",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       TYPE-SPECIFIC URL REQUIREMENTS
    ===================================================== */

    if (
      type === LiveSourceType.rss &&
      !rssUrl &&
      !url
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "RSS source requires rssUrl or url",
        },
        { status: 400 }
      );
    }

    if (
      type === LiveSourceType.api &&
      !apiUrl &&
      !url
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "API source requires apiUrl or url",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       FETCH INTERVAL
    ===================================================== */

    const fetchIntervalSeconds = Number(
      body.fetchIntervalSeconds ?? 300
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
       PRIORITY
    ===================================================== */

    const priority = Number(
      body.priority ?? 0
    );

    if (!Number.isInteger(priority)) {
      return NextResponse.json(
        {
          success: false,
          error: "Priority must be an integer",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       TRUST LEVEL

       Prisma schema stores trustLevel as Int.

       UI values:
       standard -> 1
       trusted  -> 2
       high     -> 3
    ===================================================== */

    const trustLevelInput =
      typeof body.trustLevel === "string"
        ? body.trustLevel.trim().toLowerCase() ||
          "standard"
        : "standard";

    const trustLevelMap: Record<
      string,
      number
    > = {
      standard: 1,
      trusted: 2,
      high: 3,
    };

    if (
      !Object.prototype.hasOwnProperty.call(
        trustLevelMap,
        trustLevelInput
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid trust level. Allowed values: standard, trusted, high",
        },
        { status: 400 }
      );
    }

    const trustLevel =
      trustLevelMap[trustLevelInput];

    /* =====================================================
       DEFAULT SEGMENT
    ===================================================== */

    const defaultSegment =
      body.defaultSegment === null ||
      body.defaultSegment === undefined ||
      body.defaultSegment === ""
        ? null
        : isLiveSegment(
              body.defaultSegment
            )
          ? body.defaultSegment
          : null;

    if (
      body.defaultSegment !==
        undefined &&
      body.defaultSegment !== null &&
      body.defaultSegment !== "" &&
      !isLiveSegment(
        body.defaultSegment
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid default segment",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       OPTIONAL EVENT
    ===================================================== */

    const eventId =
      typeof body.eventId === "string"
        ? body.eventId.trim()
        : "";

    let event: {
      id: string;
      status: string;
    } | null = null;

    if (eventId) {
      event =
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
            error: "Live event not found",
          },
          { status: 404 }
        );
      }

      if (event.status === "archived") {
        return NextResponse.json(
          {
            success: false,
            error:
              "Cannot attach a source to an archived live event",
          },
          { status: 400 }
        );
      }
    }

    /* =====================================================
       EVENT MAPPING VALIDATION
    ===================================================== */

    let eventPriority = 0;

    if (
      body.eventPriority !==
        undefined &&
      body.eventPriority !== null &&
      body.eventPriority !== ""
    ) {
      eventPriority = Number(
        body.eventPriority
      );

      if (
        !Number.isInteger(
          eventPriority
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Event priority must be an integer",
          },
          { status: 400 }
        );
      }
    }

    /* =====================================================
       CREATE SOURCE

       IMPORTANT:
       Do NOT use an interactive MongoDB transaction here.

       Source creation is independent and the event mapping
       is optional. Removing the interactive transaction
       avoids transient MongoDB connection failures such as:

       P2010
       os error 10054
       TransientTransactionError
    ===================================================== */

    const source =
      await prisma.liveSource.create({
        data: {
          name,
          type,
          url,
          rssUrl,
          apiUrl,

          isActive:
            body.isActive !== false,

          priority,

          // Prisma LiveSource.trustLevel is Int
          trustLevel,

          fetchIntervalSeconds,
          defaultSegment,
        },
      });

    /* =====================================================
       OPTIONAL EVENT MAPPING

       If mapping fails, keep the source because the source
       itself was successfully created. The event mapping
       can be created separately from Live Center.
    ===================================================== */

    if (event) {
      try {
        await prisma.liveEventSource.create({
          data: {
            eventId: event.id,

            sourceId: source.id,

            enabled:
              body.enabled !== false,

            priority: eventPriority,
          },
        });
      } catch (mappingError) {
        console.error(
          "POST /api/admin/live/sources event mapping error:",
          mappingError
        );
      }
    }

    /* =====================================================
       RETURN CREATED SOURCE
    ===================================================== */

    const finalSource =
      await prisma.liveSource.findUnique({
        where: {
          id: source.id,
        },

        include: {
          _count: {
            select: {
              events: true,
              updates: true,
            },
          },

          events: {
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
          },
        },
      });

    return NextResponse.json(
      {
        success: true,
        message:
          "Live source created successfully",
        data: finalSource,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "POST /api/admin/live/sources error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to create live source",
      },
      { status: 500 }
    );
  }
}