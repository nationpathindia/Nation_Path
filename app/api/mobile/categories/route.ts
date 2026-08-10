import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/* =========================================================
   CORS
========================================================= */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
};

/* =========================================================
   TYPES
========================================================= */

type MobileCategory = {
  id: string;
  name: string;
  slug: string | null;
  description: string | null;
  intelligenceLabel: string | null;
  color: string | null;
  priority: number;
};

/* =========================================================
   OPTIONS
========================================================= */

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

/* =========================================================
   GET MOBILE CATEGORIES
========================================================= */

export async function GET() {
  try {
    const categories =
      await prisma.category.findMany({
        where: {
          status: "active",
        },

        orderBy: [
          {
            priority: "desc",
          },
          {
            name: "asc",
          },
        ],

        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          intelligenceLabel: true,
          color: true,
          priority: true,
        },
      });

    const formattedCategories: MobileCategory[] =
      categories.map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug || null,
        description:
          category.description || null,
        intelligenceLabel:
          category.intelligenceLabel || null,
        color: category.color || null,
        priority:
          Number(category.priority) || 0,
      }));

    return NextResponse.json(
      {
        success: true,
        categories: formattedCategories,
      },
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Cache-Control":
            "public, s-maxage=60, stale-while-revalidate=120",
        },
      },
    );
  } catch (error) {
    console.error(
      "MOBILE CATEGORIES API ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        categories: [],
        error:
          "Unable to load NationPath mobile categories.",
      },
      {
        status: 500,
        headers: corsHeaders,
      },
    );
  }
}

