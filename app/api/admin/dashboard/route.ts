import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import User from "@/app/models/User";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    /* =====================================================
       TIME WINDOWS
    ===================================================== */

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const now = new Date();

    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 89);
    ninetyDaysAgo.setHours(0, 0, 0, 0);

    /* =====================================================
       NEWS FILTER
    ===================================================== */

    const newsFilter = {
      isDeleted: false,
      isAstrology: false,
    };

    /* =====================================================
       ARTICLE STATS
    ===================================================== */

    const [
      totalArticles,
      publishedToday,
      drafts,
      pendingArticles,
      featuredArticles,
      breakingArticles,
      weekArticles,
      monthArticles,
      viewsAgg,
      totalEditorials,
      intelligenceArticles,
    ] = await Promise.all([
      prisma.article.count({
        where: newsFilter,
      }),

      prisma.article.count({
        where: {
          ...newsFilter,
          status: "approved",
          createdAt: {
            gte: today,
          },
        },
      }),

      prisma.article.count({
        where: {
          ...newsFilter,
          status: "draft",
        },
      }),

      prisma.article.count({
        where: {
          ...newsFilter,
          status: "pending",
        },
      }),

      prisma.article.count({
        where: {
          ...newsFilter,
          featured: true,
        },
      }),

      prisma.article.count({
        where: {
          ...newsFilter,
          breaking: true,
        },
      }),

      prisma.article.count({
        where: {
          ...newsFilter,
          status: "approved",
          createdAt: {
            gte: weekAgo,
          },
        },
      }),

      prisma.article.count({
        where: {
          ...newsFilter,
          status: "approved",
          createdAt: {
            gte: monthAgo,
          },
        },
      }),

      prisma.article.aggregate({
        where: newsFilter,
        _sum: {
          views: true,
        },
      }),

      prisma.article.count({
        where: {
          ...newsFilter,
          isEditorial: true,
        },
      }),

      prisma.article.count({
        where: {
          ...newsFilter,
          OR: [
            {
              shortBrief: {
                not: null,
              },
            },
            {
              background: {
                not: null,
              },
            },
            {
              factCheck: {
                not: null,
              },
            },
            {
              timeline: {
                not: null,
              },
            },
          ],
        },
      }),
    ]);

    const totalViews = viewsAgg._sum.views ?? 0;

    /* =====================================================
       AUTH USERS
       SOURCE: MONGODB USER MODEL
    ===================================================== */

    await connectDB();

    const [
      totalUsers,
      newUsersToday,
      activeUsers,
      admins,
      editors,
      reporters,
      subscribers,
    ] = await Promise.all([
      User.countDocuments(),

      User.countDocuments({
        createdAt: {
          $gte: today,
        },
      }),

      User.countDocuments({
        status: "active",
      }),

      User.countDocuments({
        role: {
          $in: ["superadmin", "admin"],
        },
      }),

      User.countDocuments({
        role: "editor",
      }),

      User.countDocuments({
        role: "reporter",
      }),

      User.countDocuments({
        "subscription.status": "active",
        "subscription.plan": {
          $ne: "free",
        },
      }),
    ]);

    const recentUsers = await User.find()
      .sort({
        createdAt: -1,
      })
      .limit(10)
      .select(
        "name email role status avatar createdAt subscription"
      )
      .lean();

    const userRoles = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    /* =====================================================
       POLL SYSTEM
    ===================================================== */

    const [activePolls, totalPollVotes] = await Promise.all([
      prisma.poll.count({
        where: {
          status: "published",
          expiresAt: {
            gte: now,
          },
        },
      }),

      prisma.pollVote.count(),
    ]);

    const currentPoll = await prisma.poll.findFirst({
      where: {
        status: "published",
        expiresAt: {
          gte: now,
        },
      },

      orderBy: {
        publishedAt: "desc",
      },

      include: {
        options: {
          select: {
            id: true,
            text: true,
            votes: true,
          },
        },
      },
    });

    const recentPolls = await prisma.poll.findMany({
      orderBy: {
        createdAt: "desc",
      },

      take: 5,

      select: {
        id: true,
        question: true,
        status: true,
        totalVotes: true,
        expiresAt: true,
        createdAt: true,
      },
    });

    /* =====================================================
       ADS
    ===================================================== */

    const [activeAds, adViewsAgg, adClicksAgg] =
      await Promise.all([
        prisma.ad.count({
          where: {
            status: "active",
          },
        }),

        prisma.ad.aggregate({
          _sum: {
            views: true,
          },
        }),

        prisma.ad.aggregate({
          _sum: {
            clicks: true,
          },
        }),
      ]);

    const adViews = adViewsAgg._sum.views ?? 0;
    const adClicks = adClicksAgg._sum.clicks ?? 0;

    /* =====================================================
       NEWSROOM
    ===================================================== */

    const latest = await prisma.article.findMany({
      where: {
        ...newsFilter,
        status: "approved",
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 30,

      select: {
        id: true,
        title: true,
        slug: true,
        views: true,
        status: true,
        createdAt: true,
        publishedAt: true,
        featured: true,
        breaking: true,
        isEditorial: true,
        primaryImage: true,
        primaryImageAlt: true,

        category: {
          select: {
            name: true,
            slug: true,
          },
        },

        author: {
          select: {
            name: true,
          },
        },
      },
    });

    const top = await prisma.article.findMany({
      where: {
        ...newsFilter,
        status: "approved",
      },

      orderBy: {
        views: "desc",
      },

      take: 30,

      select: {
        id: true,
        title: true,
        views: true,
      },
    });

    const trending = await prisma.article.findMany({
      where: {
        ...newsFilter,
        status: "approved",

        lastViewAt: {
          gte: yesterday,
        },
      },

      orderBy: {
        trendingScore: "desc",
      },

      take: 10,

      select: {
        id: true,
        title: true,
        views: true,
        trendingScore: true,
      },
    });

    const viral = await prisma.article.findMany({
      where: {
        ...newsFilter,
        status: "approved",

        views: {
          gt: 500,
        },
      },

      orderBy: {
        views: "desc",
      },

      take: 10,

      select: {
        id: true,
        title: true,
        views: true,
        likes: true,
        shares: true,
      },
    });

    /* =====================================================
       DAILY VIEWS
       EXISTING 30-DAY DATA
    ===================================================== */

    const viewArticles = await prisma.article.findMany({
      where: {
        ...newsFilter,
        createdAt: {
          gte: monthAgo,
        },
      },

      select: {
        createdAt: true,
        views: true,
      },
    });

    const dailyMap: Record<string, number> = {};

    viewArticles.forEach((item) => {
      const date = item.createdAt.toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
        }
      );

      dailyMap[date] =
        (dailyMap[date] || 0) + (item.views || 0);
    });

    const dailyViews = Object.entries(dailyMap).map(
      ([date, views]) => ({
        date,
        views,
      })
    );

    /* =====================================================
       EXTENDED 90-DAY TRAFFIC
    ===================================================== */

    const extendedViewArticles =
      await prisma.article.findMany({
        where: {
          ...newsFilter,
          createdAt: {
            gte: ninetyDaysAgo,
            lte: now,
          },
        },

        select: {
          createdAt: true,
          views: true,
        },
      });

    const extendedDailyViewsMap: Record<string, number> =
      {};

    for (let i = 0; i < 90; i++) {
      const date = new Date(ninetyDaysAgo);
      date.setDate(ninetyDaysAgo.getDate() + i);

      const key = date.toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
        }
      );

      extendedDailyViewsMap[key] = 0;
    }

    extendedViewArticles.forEach((item) => {
      const date = item.createdAt.toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
        }
      );

      if (date in extendedDailyViewsMap) {
        extendedDailyViewsMap[date] +=
          item.views || 0;
      }
    });

    const dailyViews90 = Object.entries(
      extendedDailyViewsMap
    ).map(([date, views]) => ({
      date,
      views,
    }));

    /* =====================================================
       LIFETIME VIEWS
       SAME ARTICLE.views SOURCE
       GROUPED MONTHLY
    ===================================================== */

    const lifetimeViewArticles =
      await prisma.article.findMany({
        where: newsFilter,

        select: {
          createdAt: true,
          views: true,
        },
      });

    const lifetimeViewsMap: Record<string, number> = {};

    lifetimeViewArticles.forEach((item) => {
      const date = item.createdAt.toLocaleDateString(
        "en-IN",
        {
          month: "short",
          year: "numeric",
        }
      );

      lifetimeViewsMap[date] =
        (lifetimeViewsMap[date] || 0) +
        (item.views || 0);
    });

    const lifetimeViews = Object.entries(
      lifetimeViewsMap
    ).map(([date, views]) => ({
      date,
      views,
    }));

    /* =====================================================
       PUBLISHING TREND
       EXISTING 30-DAY DATA
    ===================================================== */

    const publishingArticles =
      await prisma.article.findMany({
        where: {
          ...newsFilter,
          status: "approved",
          createdAt: {
            gte: monthAgo,
          },
        },

        select: {
          createdAt: true,
        },
      });

    const publishingMap: Record<string, number> = {};

    publishingArticles.forEach((item) => {
      const date = item.createdAt.toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
        }
      );

      publishingMap[date] =
        (publishingMap[date] || 0) + 1;
    });

    const publishingTrend = Object.entries(
      publishingMap
    ).map(([date, articles]) => ({
      date,
      articles,
    }));

    /* =====================================================
       PUBLISHING — EXTENDED 90 DAYS
    ===================================================== */

    const publishingArticles90 =
      await prisma.article.findMany({
        where: {
          ...newsFilter,
          status: "approved",
          createdAt: {
            gte: ninetyDaysAgo,
            lte: now,
          },
        },

        select: {
          createdAt: true,
        },
      });

    const publishingDailyMap: Record<string, number> =
      {};

    for (let i = 0; i < 90; i++) {
      const date = new Date(ninetyDaysAgo);
      date.setDate(ninetyDaysAgo.getDate() + i);

      const key = date.toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
        }
      );

      publishingDailyMap[key] = 0;
    }

    publishingArticles90.forEach((item) => {
      const date = item.createdAt.toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
        }
      );

      if (date in publishingDailyMap) {
        publishingDailyMap[date] += 1;
      }
    });

    const publishingDaily = Object.entries(
      publishingDailyMap
    ).map(([date, articles]) => ({
      date,
      articles,
    }));

    /* =====================================================
       PUBLISHING — 7 DAY DATASET
    ===================================================== */

    const publishingTrend7 =
      publishingDaily.slice(-7);

    /* =====================================================
       PUBLISHING — LIFETIME
       SAME createdAt + approved LOGIC
    ===================================================== */

    const publishingLifetimeArticles =
      await prisma.article.findMany({
        where: {
          ...newsFilter,
          status: "approved",
        },

        select: {
          createdAt: true,
        },
      });

    const publishingLifetimeMap: Record<
      string,
      number
    > = {};

    publishingLifetimeArticles.forEach((item) => {
      const date = item.createdAt.toLocaleDateString(
        "en-IN",
        {
          month: "short",
          year: "numeric",
        }
      );

      publishingLifetimeMap[date] =
        (publishingLifetimeMap[date] || 0) + 1;
    });

    const publishingLifetime = Object.entries(
      publishingLifetimeMap
    ).map(([date, articles]) => ({
      date,
      articles,
    }));

    /* =====================================================
       CATEGORY PERFORMANCE
       NEWS CATEGORIES + EDITORIAL
    ===================================================== */

    const [categoriesRaw, editorialPerformance] =
      await Promise.all([
        prisma.category.findMany({
          include: {
            articles: {
              where: {
                ...newsFilter,
                status: "approved",
              },

              select: {
                views: true,
                isEditorial: true,
              },
            },
          },
        }),

        prisma.article.aggregate({
          where: {
            ...newsFilter,
            status: "approved",
            isEditorial: true,
          },

          _count: {
            _all: true,
          },

          _sum: {
            views: true,
          },
        }),
      ]);

    const normalCategoryPerformance =
      categoriesRaw
        .map((category) => {
          const normalArticles =
            category.articles.filter(
              (article) => !article.isEditorial
            );

          return {
            name: category.name,
            articles: normalArticles.length,
            views: normalArticles.reduce(
              (sum, item) =>
                sum + Number(item.views || 0),
              0
            ),
          };
        })
        .filter(
          (category) =>
            category.articles > 0 ||
            category.views > 0
        );

    const editorialNode = {
      name: "Editorial",
      articles: Number(
        editorialPerformance._count?._all || 0
      ),
      views: Number(
        editorialPerformance._sum?.views || 0
      ),
    };

    const categoryPerformance = [
      ...normalCategoryPerformance,

      ...(editorialNode.articles > 0 ||
      editorialNode.views > 0
        ? [editorialNode]
        : []),
    ].sort((a, b) => b.views - a.views);

    /* =====================================================
       ACTIVITY LOG
    ===================================================== */

    const activityRaw =
      await prisma.activityLog.findMany({
        orderBy: {
          createdAt: "desc",
        },

        take: 15,

        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      });

    const activity = activityRaw.map((item) => ({
      id: item.id,
      title: item.action,
      entity: item.entity,
      user: item.user?.name || "System",

      time: item.createdAt.toLocaleString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      ),
    }));

    /* =====================================================
       ASTRO DASHBOARD
       LOCKED FOR FUTURE MONGODB ASTRO CMS
    ===================================================== */

    const astro = {
      horoscopeCount: 0,
      published: 0,
      drafts: 0,
      automationStatus: "Checking",
      lastRun: null,
      nextRun: null,
      lockStatus: "unknown",
    };

    /* =====================================================
       SYSTEM STATUS
    ===================================================== */

    const system = {
      database: "connected",
      api: "healthy",
      automation: "active",
    };

    /* =====================================================
       FINAL RESPONSE
    ===================================================== */

    return NextResponse.json({
      success: true,

      stats: {
        totalArticles,
        publishedToday,
        drafts,
        pendingArticles,
        featuredArticles,
        breakingArticles,
        weekArticles,
        monthArticles,
        totalViews,

        totalUsers,
        newUsersToday,
        activeUsers,
        admins,
        editors,
        reporters,
        subscribers,

        totalEditorials,
        intelligenceArticles,

        totalComments: 0,

        activeAds,
        adViews,
        adClicks,

        news: {
          totalArticles,
          publishedToday,
          drafts,
          pendingArticles,
          featuredArticles,
          breakingArticles,
        },

        users: {
          totalUsers,
          newUsersToday,
          activeUsers,
          admins,
          editors,
          reporters,
          subscribers,
          recent: recentUsers,
          roles: userRoles,
        },

        editorial: {
          total: totalEditorials,
          intelligence: intelligenceArticles,
        },

        poll: {
          active: activePolls,
          votes: totalPollVotes,
        },
      },

      /* ===================================================
         ALL DASHBOARD CHART DATA
         FRONTEND CONTRACT
      =================================================== */

      charts: {
        dailyViews,
        dailyViews90,
        lifetimeViews,

        publishingTrend,
        publishingTrend7,
        publishingDaily,
        publishingLifetime,

        categoryPerformance,
      },

      /* ===================================================
         LEGACY CHART STRUCTURE
         PRESERVED
      =================================================== */

      chart: dailyViews.map((item) => ({
        day: item.date,
        views: item.views,
      })),

      /* ===================================================
         LEGACY CATEGORY STRUCTURE
         PRESERVED
      =================================================== */

      categories: categoryPerformance.map((item) => ({
        name: item.name,
        count: item.articles,
        views: item.views,
      })),

      latest,
      top,
      trending,
      viral,

      newsroom: {
        latest,
        top,
        trending,
        viral,
      },

      poll: {
        current: currentPoll,
        recent: recentPolls,
        active: activePolls,
        totalVotes: totalPollVotes,
      },

      polls: {
        current: currentPoll,
        recent: recentPolls,
      },

      astro,

      activity,

      system,
    });
  } catch (error) {
    console.error(
      "ADMIN DASHBOARD ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Dashboard failed",
      },
      {
        status: 500,
      }
    );
  }
}