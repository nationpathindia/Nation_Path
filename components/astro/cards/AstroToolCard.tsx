import Link from "next/link";
import { Sparkles } from "lucide-react";

interface AstroToolCardProps {
  title: string;
  description: string;
  slug: string;
  icon: React.ReactNode;
  isAuraActive?: boolean; // Micro-state mapping to show real-time platform calculations
}

export default function AstroToolCard({
  title,
  description,
  slug,
  icon,
  isAuraActive = true,
}: AstroToolCardProps) {
  return (
    <Link
      href={`/horoscope/${slug}`}
      aria-label={`Explore ${title}`}
      className="
        group
        relative
        block
        overflow-hidden
        rounded-2xl
        border
        border-[#C9A227]/15
        bg-gradient-to-b from-white to-[#FAFAF9]/60
        p-7
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
      {/* Background Cosmic Energy Overlay */}
      <div 
        aria-hidden="true" 
        className="absolute -left-20 -bottom-20 -z-10 h-44 w-44 rounded-full bg-[#C9A227]/5 blur-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-100" 
      />

      {/* Floating Linear Border Accent */}
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

      <div className="relative flex flex-col h-full justify-between">
        <div>
          {/* Header Action Row */}
          <div className="flex items-center justify-between gap-4">
            {/* Custom Interactive Icon Wrap */}
            <div
              className="
                relative
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                border-[#C9A227]/20
                bg-[#071426]/5
                text-[#C9A227]
                transition-all
                duration-500
                group-hover:rotate-[6deg]
                group-hover:scale-105
                group-hover:bg-[#071426]/10
                group-hover:border-[#C9A227]/40
              "
            >
              {icon}
            </div>

            {/* Dynamic Operational Indicator */}
            {isAuraActive && (
              <div className="flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1 shadow-sm border border-[#C9A227]/10">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-[#C9A227] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C9A227]"></span>
                </span>
                <span className="font-sans text-[9px] uppercase tracking-widest font-medium text-[#8a6d12]">
                  Live Aura
                </span>
              </div>
            )}
          </div>

          {/* Luxury Editorial Typography Stack */}
          <h3
            className="
              mt-6
              font-serif
              text-xl
              font-normal
              tracking-wide
              text-[#071426]
              transition-colors
              duration-300
              group-hover:text-[#8a6d12]
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-3
              font-sans
              text-sm
              leading-relaxed
              text-[#071426]/70
            "
          >
            {description}
          </p>
        </div>

        {/* Action Anchor Layer */}
        <div
          className="
            mt-6
            flex
            items-center
            gap-2
            font-sans
            text-xs
            uppercase
            tracking-widest
            font-semibold
            text-[#071426]
          "
        >
          <Sparkles
            size={14}
            className="
              text-[#C9A227] 
              transition-all 
              duration-500 
              group-hover:rotate-[15deg] 
              group-hover:scale-110
            "
          />
          
          <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#C9A227] after:transition-all after:duration-300 group-hover:after:w-full">
            Calculate Alignment
          </span>

          <span
            className="
              text-[#C9A227]
              font-light
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}