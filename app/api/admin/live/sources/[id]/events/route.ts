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

/* =========================================================
   POST — ATTACH SOURCE TO EVENT
========================================================= */

export async function POST(
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

    const sourceId = params.id?.trim();

    if (!sourceId) {
      return NextResponse.json(
        {
          success: false,
          error: "Source ID is required",
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
          error: "Invalid JSON request body",
        },
        { status: 400 }
      );
    }

    const eventId =
      typeof body.eventId === "string"
        ? body.eventId.trim()
        : "";

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
       SOURCE
    ===================================================== */

    const source =
      await prisma.liveSource.findUnique({
        where: {
          id: sourceId,
        },
        select: {
          id: true,
          name: true,
          type: true,
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
          error:
            "Cannot attach an inactive live source. Enable the source first.",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       EVENT
    ===================================================== */

    const event =
      await prisma.liveEvent.findUnique({
        where: {
          id: eventId,
        },
        select: {
          id: true,
          title: true,
          slug: true,
          segment: true,
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

    /* =====================================================
       PRIORITY
    ===================================================== */

    const rawPriority =
      body.priority ?? 0;

    const priority =
      Number(rawPriority);

    if (
      !Number.isInteger(priority) ||
      priority < 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Priority must be a non-negative integer",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       ENABLED
    ===================================================== */

    const enabled =
      body.enabled !== false;

    /* =====================================================
       UPSERT RELATION
    ===================================================== */

    const relation =
      await prisma.liveEventSource.upsert(
        {
          where: {
            eventId_sourceId: {
              eventId,
              sourceId,
            },
          },

          update: {
            enabled,
            priority,
          },

          create: {
            eventId,
            sourceId,
            enabled,
            priority,
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

            source: {
              select: {
                id: true,
                name: true,
                type: true,
                isActive: true,
              },
            },
          },
        }
      );

    return NextResponse.json({
      success: true,
      message:
        "Source attached to live event",
      data: relation,
    });
  } catch (error) {
    console.error(
      "POST /api/admin/live/sources/[id]/events error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to attach source",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   DELETE — DETACH SOURCE FROM EVENT
========================================================= */

export async function DELETE(
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

    const sourceId = params.id?.trim();

    if (!sourceId) {
      return NextResponse.json(
        {
          success: false,
          error: "Source ID is required",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       EVENT ID
    ===================================================== */

    const { searchParams } =
      new URL(request.url);

    const eventId =
      searchParams
        .get("eventId")
        ?.trim() || "";

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
       VERIFY SOURCE
    ===================================================== */

    const source =
      await prisma.liveSource.findUnique({
        where: {
          id: sourceId,
        },
        select: {
          id: true,
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

    /* =====================================================
       VERIFY EVENT
    ===================================================== */

    const event =
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
            "Cannot modify source mapping for an archived live event",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       EXISTING RELATION
    ===================================================== */

    const relation =
      await prisma.liveEventSource.findUnique(
        {
          where: {
            eventId_sourceId: {
              eventId,
              sourceId,
            },
          },
          select: {
            eventId: true,
            sourceId: true,
          },
        }
      );

    if (!relation) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Source is not attached to this event",
        },
        { status: 404 }
      );
    }

    /* =====================================================
       DELETE ONLY THE MAPPING
       Source + historical updates remain untouched.
    ===================================================== */

    await prisma.liveEventSource.delete({
      where: {
        eventId_sourceId: {
          eventId,
          sourceId,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Source detached from live event",
    });
  } catch (error) {
    console.error(
      "DELETE /api/admin/live/sources/[id]/events error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to detach source",
      },
      { status: 500 }
    );
  }
}