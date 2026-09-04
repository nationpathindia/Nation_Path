"use client";

import {
  Bookmark,
  ChevronRight,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const actions = [
  {
    title: "Latest News",
    description: "Fresh stories",
    icon: TrendingUp,
    accent: "orange",
  },
  {
    title: "Saved Stories",
    description: "Continue reading",
    icon: Bookmark,
    accent: "gold",
  },
  {
    title: "Search News",
    description: "Find a story",
    icon: Search,
    accent: "blue",
  },
  {
    title: "AI News",
    description: "Understand faster",
    icon: Sparkles,
    accent: "purple",
  },
] as const;

export default function NewsQuickActions() {
  return (
    <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <button
            key={action.title}
            type="button"
            className="
              group relative overflow-hidden
              rounded-2xl p-[1px]
              text-left
              transition-all duration-300
              hover:-translate-y-1
            "
          >
            {/* Animated edge */}
            <span
              className="
                pointer-events-none absolute inset-0
                rounded-2xl
                bg-[conic-gradient(from_180deg,transparent_0deg,transparent_300deg,rgba(234,102,27,.55)_320deg,rgba(198,161,91,.45)_340deg,transparent_360deg)]
                opacity-0
                transition-opacity duration-300
                group-hover:opacity-100
                group-hover:animate-[quickSpin_5s_linear_infinite]
              "
            />

            {/* Glass surface */}
            <span
              className="
                relative block overflow-hidden
                rounded-[15px]
                border border-[#33120A]/[0.07]
                bg-white/[0.025]
                px-4 py-3.5
                backdrop-blur-xl
                backdrop-saturate-150
                shadow-[0_10px_30px_rgba(51,18,10,.035)]
                transition-all duration-300
                group-hover:border-white/[0.30]
                group-hover:bg-white/[0.055]
              "
            >
              {/* ambient glow */}
              <span
                className="
                  pointer-events-none absolute
                  -right-8 -top-10
                  h-20 w-20 rounded-full
                  bg-[#EA661B]/[0.045]
                  blur-2xl
                  transition-transform duration-500
                  group-hover:scale-150
                "
              />

              <span className="relative flex items-center justify-between gap-3">
                <span className="flex min-w-0 items-center gap-3">
                  <span
                    className={`
                      flex h-9 w-9 shrink-0
                      items-center justify-center
                      rounded-xl
                      border
                      ${getAccent(action.accent).border}
                      ${getAccent(action.accent).bg}
                      backdrop-blur-md
                    `}
                  >
                    <Icon
                      className={`h-4 w-4 ${getAccent(action.accent).icon}`}
                    />
                  </span>

                  <span className="min-w-0">
                    <span className="block truncate text-xs font-bold text-[#33120A]">
                      {action.title}
                    </span>

                    <span className="mt-0.5 block truncate text-[10px] text-[#8B8F97]">
                      {action.description}
                    </span>
                  </span>
                </span>

                <ChevronRight
                  className="
                    h-3.5 w-3.5 shrink-0
                    text-[#C9C0B4]
                    transition-all duration-200
                    group-hover:translate-x-0.5
                    group-hover:text-[#EA661B]
                  "
                />
              </span>

              {/* bottom shine */}
              <span
                className="
                  pointer-events-none absolute
                  bottom-0 left-[12%] right-[12%]
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-white/40
                  to-transparent
                  opacity-0
                  transition-opacity
                  group-hover:opacity-100
                "
              />
            </span>
          </button>
        );
      })}

      <style jsx>{`
        @keyframes quickSpin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          span {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

function getAccent(accent: string) {
  const accents = {
    orange: {
      icon: "text-[#EA661B]",
      border: "border-[#EA661B]/[0.12]",
      bg: "bg-[#EA661B]/[0.035]",
    },

    gold: {
      icon: "text-[#C6A15B]",
      border: "border-[#C6A15B]/[0.14]",
      bg: "bg-[#C6A15B]/[0.035]",
    },

    blue: {
      icon: "text-[#2563EB]",
      border: "border-[#2563EB]/[0.10]",
      bg: "bg-[#2563EB]/[0.025]",
    },

    purple: {
      icon: "text-[#A855F7]",
      border: "border-[#A855F7]/[0.10]",
      bg: "bg-[#A855F7]/[0.025]",
    },
  };

  return accents[accent as keyof typeof accents] ?? accents.orange;
}