import Link from "next/link";
import ZodiacIcon from "@/components/ZodiacIcon";

interface ZodiacCardProps {
  sign: string;
  slug: string;
  dateRange: string;
  insights?: {
    love?: string;
    career?: string;
    health?: string;
  };
  transitStatus?: string; // Enhanced luxury editorial tracking tag
}

export default function ZodiacCard({
  sign,
  slug,
  dateRange,
  insights = {
    love: "Positive",
    career: "Growth",
    health: "Balanced",
  },
  transitStatus = "Exalted Aura",
}: ZodiacCardProps) {
  return (
    <Link
      href={`/astrology/${slug}`}
      aria-label={`Read ${sign} horoscope`}
      className="
        group
        relative
        block
        overflow-hidden
        rounded-2xl
        border
        border-[#C9A227]/15
        bg-gradient-to-b from-white to-[#FAFAF9]/60
        p-6
        backdrop-blur-sm
        shadow-sm
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-[#C9A227]/40
        hover:shadow-xl
        hover:shadow-[#071426]/5
      "
    >
      {/* Background Cosmic Ambient Layer */}
      <div 
        aria-hidden="true" 
        className="absolute left-1/2 top-0 -translate-x-1/2 -z-10 h-40 w-44 rounded-full bg-[#C9A227]/5 blur-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-80" 
      />

      {/* Subtle Top Linear Light Leak */}
      <div
        aria-hidden="true"
        className="
          absolute
          left-0
          top-0
          h-[2px]
          w-full
          bg-gradient-to-r
          from-transparent
          via-[#C9A227]/30
          to-transparent
          opacity-0
          transition-all
          duration-500
          group-hover:opacity-100
        "
      />

      <div className="relative">
        {/* Header Metadata Action: Transit Tracker Badge */}
        <div className="absolute right-0 top-0">
          <div className="flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1 shadow-sm border border-[#C9A227]/10">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-[#C9A227] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C9A227]"></span>
            </span>
            <span className="font-sans text-[9px] uppercase tracking-widest font-medium text-[#8a6d12]">
              {transitStatus}
            </span>
          </div>
        </div>

        {/* Center Zodiac Icon Alignment Container */}
        <div className="flex justify-center mt-4">
          <div
            className="
              relative
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              border
              border-[#C9A227]/20
              bg-[#071426]/5
              text-[#C9A227]
              p-3.5
              transition-all
              duration-500
              group-hover:rotate-[6deg]
              group-hover:scale-105
              group-hover:bg-[#071426]/10
              group-hover:border-[#C9A227]/40
            "
          >
            <ZodiacIcon sign={sign} />
          </div>
        </div>

        {/* Editorial Typography Stack */}
        <h3
          className="
            mt-5
            text-center
            font-serif
            text-2xl
            font-normal
            tracking-wide
            capitalize
            text-[#071426]
            transition-colors
            duration-300
            group-hover:text-[#8a6d12]
          "
        >
          {sign}
        </h3>

        <p
          className="
            mt-1
            text-center
            font-sans
            text-xs
            uppercase
            tracking-widest
            font-medium
            text-[#071426]/60
          "
        >
          {dateRange}
        </p>

        {/* Stellar Alignment Constellation Indicator */}
        <div
          className="
            mt-4
            flex
            justify-center
            text-[#C9A227]
            text-xs
            tracking-[0.4em]
            opacity-80
            transition-transform
            duration-500
            group-hover:scale-105
          "
        >
          ★★★★★
        </div>

        {/* Custom Premium Divider Split */}
        <div
          className="
            my-5
            h-px
            bg-gradient-to-r
            from-transparent
            via-[#C9A227]/20
            to-transparent
          "
        />

        {/* Macro Insights Row Arrays */}
        <div className="space-y-2.5">
          <Insight label="Love Alignment" value={insights.love} />
          <Insight label="Career Orbit" value={insights.career} />
          <Insight label="Vitality Matrix" value={insights.health} />
        </div>

        {/* Premium Interactive Action Interface */}
        <div
          className="
            mt-6
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-[#C9A227]/20
            bg-[#FAFAF7]
            py-3
            font-sans
            text-xs
            uppercase
            tracking-widest
            font-semibold
            text-[#071426]
            transition-all
            duration-500
            group-hover:bg-[#071426]
            group-hover:text-[#FAFAF7]
            group-hover:border-[#071426]
            shadow-sm
          "
        >
          <span>Explore Horoscope</span>
          <span className="font-light transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

interface InsightProps {
  label: string;
  value?: string;
}

function Insight({ label, value }: InsightProps) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-xl
        border
        border-[#C9A227]/10
        bg-white/40
        px-4
        py-2.5
        backdrop-blur-xs
        transition-colors
        duration-300
        hover:border-[#C9A227]/20
      "
    >
      <span className="font-sans text-[11px] uppercase tracking-wider font-semibold text-[#8a6d12]">
        {label}
      </span>

      <span className="font-serif text-sm tracking-wide text-[#071426]">
        {value}
      </span>
    </div>
  );
}