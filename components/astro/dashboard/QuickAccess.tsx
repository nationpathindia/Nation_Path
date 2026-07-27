import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CalendarDays,
  Clock3,
  Gem,
  Heart,
  Moon,
  ScrollText,
  Sparkles,
  Star,
  Sun,
} from "lucide-react";

interface AstroTool {
  title: string;
  description: string;
  slug: string;
  icon: React.ReactNode;
  badge?: string;
  badgeType?: "gold" | "cosmic" | "alert";
}

const tools: AstroTool[] = [
  {
    title: "Today's Horoscope",
    description: "Daily zodiac predictions and planetary guidance.",
    slug: "today-horoscope",
    icon: <Star size={20} />,
    badge: "Daily Update",
    badgeType: "gold",
  },
  {
    title: "Panchang",
    description: "Today's Vedic calendar with sacred timings.",
    slug: "today-panchang",
    icon: <CalendarDays size={20} />,
    badge: "Live Aura",
    badgeType: "cosmic",
  },
  {
    title: "Rahu Kaal",
    description: "Find unfavorable timings before important work.",
    slug: "rahu-kaal",
    icon: <Clock3 size={20} />,
    badge: "High Impact",
    badgeType: "alert",
  },
  {
    title: "Varjyam",
    description: "Nakshatra based transition timings.",
    slug: "varjyam",
    icon: <Sparkles size={20} />,
  },
  {
    title: "Nakshatra",
    description: "Current lunar constellation information.",
    slug: "nakshatra",
    icon: <Moon size={20} />,
    badge: "Lunar Cycle",
    badgeType: "cosmic",
  },
  {
    title: "Tithi",
    description: "Today's lunar day calculation.",
    slug: "tithi",
    icon: <ScrollText size={20} />,
  },
  {
    title: "Yoga",
    description: "Planetary Yoga and Panchang combinations.",
    slug: "yoga",
    icon: <Activity size={20} />,
  },
  {
    title: "Karana",
    description: "Half lunar day calculations.",
    slug: "karana",
    icon: <Sun size={20} />,
  },
  {
    title: "Choghadiya",
    description: "Auspicious and inauspicious periods.",
    slug: "choghadiya",
    icon: <Clock3 size={20} />,
    badge: "Realtime",
    badgeType: "gold",
  },
  {
    title: "Hora",
    description: "Planetary hour calculations.",
    slug: "hora",
    icon: <Gem size={20} />,
  },
  {
    title: "Marriage Muhurat",
    description: "Auspicious marriage timings.",
    slug: "marriage-muhurat",
    icon: <Heart size={20} />,
    badge: "Premium",
    badgeType: "gold",
  },
];

export default function QuickAccess() {
  return (
    <section aria-labelledby="astro-tools-title" className="w-full relative px-1 py-4">
      {/* Background Creative Accents (Astrological Radial Glow) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#C9A227]/5 to-[#071426]/0 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-12 right-10 w-[300px] h-[300px] bg-[#C9A227]/3 rounded-full blur-2xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="mx-auto mb-16 max-w-3xl text-center relative">
        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-[#C9A227]/40
            bg-gradient-to-r from-[#C9A227]/10 via-[#C9A227]/5 to-transparent
            px-4
            py-1.5
            text-xs
            font-medium
            uppercase
            tracking-[0.25em]
            text-[#8a6d12]
            shadow-sm
            backdrop-blur-sm
          "
        >
          <Sparkles size={13} className="text-[#C9A227] animate-pulse" />
          Vedic Astral Terminal
        </div>

        <h2
          id="astro-tools-title"
          className="
            mt-6
            font-serif
            text-4xl
            font-normal
            tracking-tight
            leading-tight
            text-[#071426]
            md:text-5xl
          "
        >
          Essential Astrology Tools
        </h2>

        {/* Artistic Separator */}
        <div className="flex items-center justify-center gap-2 mt-5">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C9A227]/40" />
          <div className="h-1.5 w-1.5 rotate-45 border border-[#C9A227] bg-white" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C9A227]/40" />
        </div>

        <p
          className="
            mx-auto
            mt-6
            max-w-2xl
            text-base
            leading-relaxed
            text-slate-600/90
          "
        >
          Access authentic Vedic astrology calculations, Panchang, Muhurat, and
          planetary transitions powered by the Nation Path Engine.
        </p>
      </div>

      {/* Tools Grid */}
      <div
        className="
          grid
          gap-6
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/horoscope/${tool.slug}`}
            className="
              group
              relative
              flex
              flex-col
              justify-between
              overflow-hidden
              rounded-2xl
              border
              border-[#C9A227]/15
              bg-gradient-to-b from-white to-[#FAFAF9]/60
              p-6
              transition-all
              duration-350
              hover:-translate-y-1.5
              hover:border-[#C9A227]/40
              hover:bg-white
              hover:shadow-[0_12px_30px_-10px_rgba(7,20,38,0.08),0_0_25px_-5px_rgba(201,162,39,0.15)]
            "
          >
            {/* Top Interactive Accent */}
            <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#C9A227]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div>
              {/* Card Upper Action Area */}
              <div className="flex items-start justify-between">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[#C9A227]/25
                    bg-gradient-to-br from-white to-[#FAFAF7]
                    text-[#C9A227]
                    shadow-sm
                    transition-all
                    duration-300
                    group-hover:rotate-[6deg]
                    group-hover:from-[#071426]
                    group-hover:to-[#0f2542]
                    group-hover:text-white
                    group-hover:shadow-md
                  "
                >
                  {tool.icon}
                </div>

                {/* Status Badges */}
                {tool.badge && (
                  <span
                    className={`
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-wider
                      px-2.5
                      py-1
                      rounded-full
                      border
                      ${
                        tool.badgeType === "gold"
                          ? "bg-[#C9A227]/5 border-[#C9A227]/30 text-[#8a6d12]"
                          : tool.badgeType === "alert"
                          ? "bg-red-50 border-red-200 text-red-600"
                          : "bg-slate-50 border-slate-200 text-slate-600"
                      }
                    `}
                  >
                    {tool.badge}
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div className="mt-6">
                <h3
                  className="
                    font-serif
                    text-lg
                    font-semibold
                    leading-snug
                    text-[#071426]
                    transition-colors
                    duration-300
                    group-hover:text-[#8a6d12]
                  "
                >
                  {tool.title}
                </h3>

                <p
                  className="
                    mt-2.5
                    text-sm
                    leading-relaxed
                    text-slate-500
                    group-hover:text-slate-600
                    transition-colors
                  "
                >
                  {tool.description}
                </p>
              </div>
            </div>

            {/* Bottom Panel */}
            <div
              className="
                mt-6
                flex
                items-center
                justify-between
                border-t
                border-slate-100
                pt-4
              "
            >
              <span
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-[#8a6d12]/80
                  group-hover:text-[#8a6d12]
                  transition-colors
                "
              >
                Analyze Now
              </span>
              
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all duration-300 group-hover:bg-[#C9A227]/10 group-hover:text-[#8a6d12]">
                <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Editorial Luxury CTA Panel */}
      <div
        className="
          mt-20
          relative
          overflow-hidden
          rounded-2xl
          border
          border-[#C9A227]/30
          bg-gradient-to-br from-[#071426] via-[#0c1f38] to-[#071426]
          shadow-xl
        "
      >
        {/* Decorative Background Mesh for CTA */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,39,0.15),transparent_45%)]" />
        
        <div className="relative px-8 py-10 md:px-12 md:py-12 z-10">
          <div
            className="
              flex
              flex-col
              gap-8
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            <div className="max-w-3xl">
              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#C9A227]/40
                  bg-[#C9A227]/10
                  px-3.5
                  py-1
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.22em]
                  text-[#E8E5DA]
                "
              >
                <Sparkles size={12} className="text-[#C9A227] animate-pulse" />
                Cosmic Sync Operational
              </span>

              <h3
                className="
                  mt-5
                  font-serif
                  text-2xl
                  font-normal
                  tracking-tight
                  leading-tight
                  text-white
                  md:text-3xl
                "
              >
                Unlock Comprehensive Astrological Insights
              </h3>

              <p
                className="
                  mt-3
                  max-w-2xl
                  text-sm
                  leading-relaxed
                  text-slate-300/90
                "
              >
                Dive deep into tailored transit matrix charts, personalized planetary dash periods, 
                and dynamic daily alignments customized exclusively for your energetic blueprint.
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {[
                  "Ephemeris Map",
                  "Transit Matrix",
                  "Dasha Timeline",
                  "Sade Sati Audit",
                ].map((item) => (
                  <span
                    key={item}
                    className="
                      rounded-lg
                      border
                      border-[#C9A227]/20
                      bg-white/5
                      px-3
                      py-1
                      text-xs
                      font-medium
                      text-[#C9A227]
                      backdrop-blur-sm
                    "
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href="/horoscope"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                self-start
                rounded-xl
                bg-gradient-to-r from-[#C9A227] to-[#dfb83b]
                px-7
                py-4
                text-sm
                font-bold
                tracking-wider
                text-[#071426]
                shadow-lg
                shadow-[#C9A227]/10
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-[#C9A227]/20
                lg:self-center
              "
            >
              Explore Full Constellation
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}