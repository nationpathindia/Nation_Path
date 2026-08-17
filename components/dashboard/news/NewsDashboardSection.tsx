import NewsOverviewCard from "./NewsOverviewCard";
import NewsBreakingCard from "./NewsBreakingCard";
import NewsCategoryCard from "./NewsCategoryCard";
import NewsReadingCard from "./NewsReadingCard";
import NewsQuickActions from "./NewsQuickActions";

export default function NewsDashboardSection() {
  return (
    <section className="space-y-6">
      <NewsOverviewCard />

      <NewsQuickActions />

      <div className="grid gap-6 lg:grid-cols-2">
        <NewsBreakingCard />
        <NewsCategoryCard />
      </div>

      <NewsReadingCard />
    </section>
  );
}