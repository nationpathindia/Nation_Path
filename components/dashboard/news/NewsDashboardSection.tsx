import NewsOverviewCard from "./NewsOverviewCard";
import NewsBreakingCard from "./NewsBreakingCard";
import NewsCategoryCard from "./NewsCategoryCard";
import NewsReadingCard from "./NewsReadingCard";
import NewsQuickActions from "./NewsQuickActions";

export default function NewsDashboardSection() {
  return (
    <section className="relative space-y-5">
      {/* =====================================================
          NEWS INTELLIGENCE
      ===================================================== */}

      <NewsOverviewCard />

      {/* =====================================================
          QUICK COMMANDS
      ===================================================== */}

      <NewsQuickActions />

      {/* =====================================================
          EDITORIAL WORKSPACE
      ===================================================== */}

      <div
        className="
          grid items-start gap-5
          xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.8fr)]
        "
      >
        {/* Breaking / Live newsroom */}
        <NewsBreakingCard />

        {/* Category explorer */}
        <NewsCategoryCard />
      </div>

      {/* =====================================================
          READING SPACE
      ===================================================== */}

      <NewsReadingCard />
    </section>
  );
}