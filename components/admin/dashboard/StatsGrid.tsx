"use client";

import DashboardCard from "./DashboardCard";

interface Props {
  stats: any;
}

export default function StatsGrid({ stats }: Props) {
  const cards = [
    {
      title: "Total Articles",
      value: stats?.totalArticles || 0,
      link: "/admin/posts",
    },
    {
      title: "Total Views",
      value: stats?.totalViews || 0,
    },
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      link: "/admin/users",
    },
    {
      title: "Published Today",
      value: stats?.publishedToday || 0,
      link: "/admin/posts?status=approved",
    },
    {
      title: "Breaking News",
      value: stats?.breakingArticles || 0,
      link: "/admin/posts?breaking=true",
    },
    {
      title: "Active Users",
      value: stats?.activeUsers || 0,
    },
    {
      title: "Drafts",
      value: stats?.drafts || 0,
      link: "/admin/posts?status=draft",
    },
    {
      title: "Pending Review",
      value: stats?.pendingArticles || 0,
      link: "/admin/posts?status=pending",
    },
    {
      title: "Featured",
      value: stats?.featuredArticles || 0,
      link: "/admin/posts?featured=true",
    },
    {
      title: "Editorials",
      value: stats?.editorial?.total || 0,
      link: "/admin/editorial",
    },
    {
      title: "AI Intelligence",
      value: stats?.editorial?.intelligence || 0,
    },
    {
      title: "Poll Votes",
      value: stats?.poll?.votes || 0,
      link: "/admin/polls",
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-2
        md:grid-cols-3
        xl:grid-cols-6
        gap-4
        lg:gap-5
        items-stretch
      "
    >
      {cards.map((card) => (
        <div
          key={card.title}
          className="min-w-0 h-full"
        >
          <DashboardCard
            title={card.title}
            value={card.value}
            link={card.link}
          />
        </div>
      ))}
    </div>
  );
}

