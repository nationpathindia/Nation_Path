import {
  Eye,
  BookOpen,
  Share2,
  Heart,
  Play,
  CheckCircle2,
} from "lucide-react";

import AnalyticsMetricCard from "./AnalyticsMetricCard";

interface AnalyticsContentData {
  views: number;
  reads: number;
  shares: number;
  reactions: number;
  videoPlays: number;
  videoCompletes: number;
}

interface AnalyticsContentCardProps {
  title: string;
  description: string;
  data: AnalyticsContentData;
}

export default function AnalyticsContentCard({
  title,
  description,
  data,
}: AnalyticsContentCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 md:p-6">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-white">
          {title}
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <AnalyticsMetricCard
          label="Views"
          value={data.views}
          icon={Eye}
          accent="navy"
        />

        <AnalyticsMetricCard
          label="Reads"
          value={data.reads}
          icon={BookOpen}
          accent="orange"
        />

        <AnalyticsMetricCard
          label="Shares"
          value={data.shares}
          icon={Share2}
          accent="orange"
        />

        <AnalyticsMetricCard
          label="Reactions"
          value={data.reactions}
          icon={Heart}
          accent="green"
        />

        <AnalyticsMetricCard
          label="Video Plays"
          value={data.videoPlays}
          icon={Play}
          accent="navy"
        />

        <AnalyticsMetricCard
          label="Completed"
          value={data.videoCompletes}
          icon={CheckCircle2}
          accent="green"
        />
      </div>
    </div>
  );
}