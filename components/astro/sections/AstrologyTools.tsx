import {
  HeartHandshake,
  Gem,
  Hash,
  Scroll,
  UserRound,
} from "lucide-react";

import AstroToolCard from "@/components/astro/cards/AstroToolCard";

interface ToolItem {
  title: string;
  description: string;
  slug: string;
  icon: React.ReactNode;
}

const tools: ToolItem[] = [
  {
    title: "Compatibility",
    description: "Check relationship compatibility between zodiac signs.",
    slug: "compatibility",
    icon: <HeartHandshake size={22} />,
  },
  {
    title: "Kundli",
    description: "Explore detailed birth chart and planetary analysis.",
    slug: "kundli",
    icon: <Scroll size={22} />,
  },
  {
    title: "Numerology",
    description: "Discover numbers connected with your life path.",
    slug: "numerology",
    icon: <Hash size={22} />,
  },
  {
    title: "Gemstone Guide",
    description: "Explore gemstones based on planetary influence.",
    slug: "gemstone",
    icon: <Gem size={22} />,
  },
  {
    title: "Birth Chart",
    description: "Understand planets, houses and cosmic patterns.",
    slug: "birth-chart",
    icon: <UserRound size={22} />,
  },
];

export default function AstrologyTools() {
  return (
    <section
      aria-labelledby="astro-tools-heading"
      className="relative mt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Absolute Ambient Background Layers */}
      <div 
        aria-hidden="true" 
        className="absolute right-0 top-1/4 -z-10 h-96 w-96 rounded-full bg-[#C9A227]/5 blur-3xl pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute left-10 bottom-0 -z-10 h-80 w-80 rounded-full bg-[#C9A227]/3 blur-3xl pointer-events-none" 
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
          Personal Astrology Tools
        </span>

        <h2
          id="astro-tools-heading"
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
          Astrology Tools
        </h2>

        {/* Premium Light Leak Border Break */}
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
          Explore personalized astrology tools and traditional Vedic calculations 
          designed carefully for deeper cosmic understanding and cosmic insight.
        </p>
      </div>

      {/* High-End Tool Matrix Configuration */}
      <div
        className="
          grid
          gap-6
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-5
        "
      >
        {tools.map((tool) => (
          <AstroToolCard
            key={tool.slug}
            title={tool.title}
            description={tool.description}
            slug={tool.slug}
            icon={tool.icon}
          />
        ))}
      </div>
    </section>
  );
}