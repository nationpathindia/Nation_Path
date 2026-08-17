import DashboardCard from "@/components/admin/dashboard/DashboardCard";

interface Props {
  overview: {
    totalEvents: number;
    views: number;
    reads: number;
    shares: number;
    likes: number;
    reactions: number;
    uniqueUsers: number;
    uniqueSessions: number;
  };
}

export default function AnalyticsStatsGrid({
  overview,
}: Props) {
  return (
    <div
      className="
        grid
        grid-cols-2
        md:grid-cols-3
        xl:grid-cols-6
        gap-5
      "
    >
      <DashboardCard
        title="Total Events"
        value={overview.totalEvents || 0}
      />

      <DashboardCard
        title="Total Views"
        value={overview.views || 0}
      />

      <DashboardCard
        title="Total Reads"
        value={overview.reads || 0}
      />

      <DashboardCard
        title="Total Shares"
        value={overview.shares || 0}
      />

      <DashboardCard
        title="Likes"
        value={overview.likes || 0}
      />

      <DashboardCard
        title="Reactions"
        value={overview.reactions || 0}
      />

      <DashboardCard
        title="Unique Users"
        value={overview.uniqueUsers || 0}
      />

      <DashboardCard
        title="Unique Sessions"
        value={overview.uniqueSessions || 0}
      />
    </div>
  );
}