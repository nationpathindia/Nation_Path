import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type CachedAd = {
  id: string;
  type: "image" | "adsense";
  imageUrl: string | null;
  link: string | null;
  adsenseCode: string | null;

  priority: number;
  createdAt: Date;

  startDate: Date | null;
  endDate: Date | null;

  totalBudget: number | null;
  cpc: number | null;
  maxClicks: number | null;

  clicks: number;
  completed: boolean;
  status: string;
};

/*
|--------------------------------------------------------------------------
| LOAD AD CANDIDATES
|--------------------------------------------------------------------------
|
| IMPORTANT:
|
| Do NOT put `new Date()` inside this cached query.
|
| We cache the relatively stable ad list and perform
| date/budget eligibility checks after reading the cache.
|
*/

const getCachedAds = (placement: string) =>
  unstable_cache(
    async (): Promise<CachedAd[]> => {
      const ads = await prisma.ad.findMany({
        where: {
          placement: placement as any,
          status: "active",
          completed: false,
        },

        orderBy: [
          {
            priority: "desc",
          },
          {
            createdAt: "desc",
          },
        ],

        take: 10,

        select: {
          id: true,
          type: true,
          imageUrl: true,
          link: true,
          adsenseCode: true,

          priority: true,
          createdAt: true,

          startDate: true,
          endDate: true,

          totalBudget: true,
          cpc: true,
          maxClicks: true,

          clicks: true,
          completed: true,
          status: true,
        },
      });

      return ads as CachedAd[];
    },

    ["nationpath-ad-serve", placement],

    {
      revalidate: 30,

      tags: [
        "ads",
        `ads:${placement}`,
      ],
    }
  )();



/*
|--------------------------------------------------------------------------
| GET
|--------------------------------------------------------------------------
*/

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const placement =
      searchParams.get("placement");

    if (!placement) {
      return NextResponse.json(
        {
          success: false,
          message: "Placement required",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Cached Prisma result.
     *
     * This is the important performance change.
     */
    const ads = await getCachedAds(placement);

    const now = Date.now();

    /*
     * Find the first currently eligible ad.
     */
    const selected = ads.find((ad) => {
      /*
       * Start date
       */
      if (
        ad.startDate &&
        ad.startDate.getTime() > now
      ) {
        return false;
      }

      /*
       * End date
       */
      if (
        ad.endDate &&
        ad.endDate.getTime() < now
      ) {
        return false;
      }

      /*
       * Already completed
       */
      if (ad.completed) {
        return false;
      }

      /*
       * Maximum clicks
       */
      if (
        ad.maxClicks !== null &&
        ad.maxClicks !== undefined &&
        ad.clicks >= ad.maxClicks
      ) {
        return false;
      }

      /*
       * Budget
       *
       * Existing code had:
       *
       *   clicks - cpc
       *
       * which is incorrect.
       *
       * Estimated spend:
       *
       *   clicks × CPC
       */
      if (
        ad.totalBudget !== null &&
        ad.totalBudget !== undefined &&
        ad.cpc !== null &&
        ad.cpc !== undefined
      ) {
        const spent =
          ad.clicks * ad.cpc;

        if (
          spent >= ad.totalBudget
        ) {
          return false;
        }
      }

      return true;
    });

    /*
     * No eligible ad.
     */
    if (!selected) {
      const response =
        NextResponse.json(
          {
            success: true,
            ad: null,
          },
          {
            status: 200,
          }
        );

      response.headers.set(
        "Cache-Control",
        "public, s-maxage=30, stale-while-revalidate=60"
      );

      return response;
    }

    /*
     * Only return fields required by
     * AdRendererClient.
     *
     * Never expose internal budget,
     * click or priority information.
     */
    const response =
      NextResponse.json(
        {
          success: true,

          ad: {
            id: selected.id,
            type: selected.type,
            imageUrl:
              selected.imageUrl,
            link: selected.link,
            adsenseCode:
              selected.adsenseCode,
          },
        },
        {
          status: 200,
        }
      );

    response.headers.set(
      "Cache-Control",
      "public, s-maxage=30, stale-while-revalidate=60"
    );

    return response;
  } catch (error) {
    console.error(
      "Ad Serve Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        ad: null,
        message: "Server error",
      },
      {
        status: 500,

        headers: {
          "Cache-Control":
            "public, s-maxage=10, stale-while-revalidate=30",
        },
      }
    );
  }
}