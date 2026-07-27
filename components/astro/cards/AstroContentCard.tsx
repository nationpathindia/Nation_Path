import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface AstroContentCardProps {
  title: string;
  description: string;
  slug: string;
  icon: React.ReactNode;
  statusBadge?: string; // Optional operational flag to enhance the dynamic feel
}

export default function AstroContentCard({
  title,
  description,
  slug,
  icon,
  statusBadge = "Propitious",
}: AstroContentCardProps) {
  return (
    <Link
      href={`/horoscope/${slug}`}
      aria-label={`Read ${title}`}
      className="
        group
        relative
        block
        overflow-hidden
        rounded-2xl
        border
        border-[#C9A227]/15
        bg-gradient-to-b from-white to-[#FAFAF9]/60
        p-8
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
      {/* Cosmic Ambient Layer */}
      <div 
        aria-hidden="true" 
        className="absolute -right-16 -top-16 -z-10 h-40 w-40 rounded-full bg-[#C9A227]/5 blur-2xl pointer-events-none transition-opacity duration-500 group-hover:opacity-80" 
      />

      {/* Top Subtle Luxury Alignment Bar */}
      <div
        aria-hidden="true"
        className="
          absolute
          left-0
          top-0
          h-[2px]
          w-full
          bg-gradient-to-r
          from-[#C9A227]/0
          via-[#C9A227]/40
          to-[#C9A227]/0
          opacity-0
          transition-all
          duration-500
          group-hover:opacity-100
        "
      />

      <div className="relative flex flex-col h-full justify-between">
        <div>
          {/* Header Action: Icon + Operational Pulse Tag */}
          <div className="flex items-center justify-between">
            {/* Premium Wrapped Icon Container */}
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

            {/* Astral Status Indicator */}
            <div className="flex items-center gap-1.5 rounded-full bg-[#071426]/5 px-2.5 py-1 border border-[#071426]/5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-[#C9A227] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C9A227]"></span>
              </span>
              <span className="font-sans text-[10px] uppercase tracking-widest font-medium text-[#8a6d12]">
                {statusBadge}
              </span>
            </div>
          </div>

          {/* Editorial Typography Stack */}
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

        {/* Interactive CTA Anchor */}
        <div
          className="
            mt-8
            flex
            items-center
            gap-1.5
            font-sans
            text-xs
            uppercase
            tracking-widest
            font-semibold
            text-[#071426]
            transition-colors
            duration-300
          "
        >
          <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#C9A227] after:transition-all after:duration-300 group-hover:after:w-full">
            Explore Chart
          </span>

          <ArrowRight
            size={14}
            className="
              text-[#C9A227]
              transition-transform
              duration-300
              group-hover:translate-x-1.5
            "
          />
        </div>
      </div>
    </Link>
  );
}