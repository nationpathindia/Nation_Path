import {
  CalendarDays,
  TrendingUp,
  Sparkles,
  Newspaper,
} from "lucide-react";

import AstroContentCard from "@/components/astro/cards/AstroContentCard";

interface FeaturedItem {
  title: string;
  description: string;
  slug: string;
  icon: React.ReactNode;
}

const featuredItems: FeaturedItem[] = [
  {
    title: "Weekly Horoscope",
    description: "Explore weekly zodiac predictions, opportunities, and unfolding planetary influences.",
    slug: "weekly-horoscope",
    icon: <CalendarDays size={22} />,
  },
  {
    title: "Monthly Horoscope",
    description: "Understand major macro-planetary shifts, celestial turnarounds, and long-form monthly guidance.",
    slug: "monthly-horoscope",
    icon: <TrendingUp size={22} />,
  },
  {
    title: "Planetary Transits",
    description: "Track important celestial transits, planetary ingress, and their direct astrological resonance.",
    slug: "planetary-transits",
    icon: <Sparkles size={22} />,
  },
  {
    title: "Astrology Articles",
    description: "Read authoritative insights, seasonal cosmic alignment markers, and deep Vedic lore.",
    slug: "astrology-articles",
    icon: <Newspaper size={22} />,
  },
];

export default function FeaturedAstroContent() {
  return (
    <section
      aria-labelledby="featured-astro-heading"
      className="relative mt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Background Cosmic Ambient Air-Glow Layer */}
      <div 
        aria-hidden="true" 
        className="absolute left-1/3 top-1/2 -translate-y-1/2 -z-10 h-[450px] w-[450px] rounded-full bg-[#C9A227]/3 blur-3xl pointer-events-none" 
      />

      {/* Editorial Content Header Layout */}
      <div className="mb-14 text-center md:text-left flex flex-col items-center md:items-start">
        <span
          className="
            inline-flex
            items-center
            rounded-full
            border
            border-[#C9A227]/30
            bg-[#C9A227]/5
            px-4
            py-1.5
            font-sans
            text-[10px]
            font-semibold
            uppercase
            tracking-widest
            text-[#8a6d12]
          "
        >
          Astrology Knowledge Hub
        </span>

        <h2
          id="featured-astro-heading"
          className="
            mt-5
            font-serif
            text-3xl
            font-normal
            tracking-wide
            text-[#071426]
            sm:text-4xl
            md:text-5xl
            leading-tight
          "
        >
          Latest Astrology Insights
        </h2>

        {/* Premium Light-Leak Border Line */}
        <div
          className="
            mt-6
            h-[1px]
            w-20
            bg-gradient-to-r
            from-transparent
            via-[#C9A227]/40
            to-transparent
          "
        />

        <p
          className="
            mt-6
            max-w-2xl
            font-sans
            text-sm
            leading-relaxed
            text-[#071426]/70
          "
        >
          Discover breaking astrology transits, essential planetary alignments, and 
          expert Vedic perspectives curated to contextualize your daily cosmic path.
        </p>
      </div>

      {/* High-End Editorial Content Matrix */}
      <div
        className="
          grid
          gap-6
          sm:grid-cols-2
        "
      >
        {featuredItems.map((item) => (
          <AstroContentCard
            key={item.slug}
            title={item.title}
            description={item.description}
            slug={item.slug}
            icon={item.icon}
          />
        ))}
      </div>
    </section>
  );
}