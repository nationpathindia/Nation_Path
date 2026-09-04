"use client";

import {
  ArrowUpRight,
  Bookmark,
  Clock3,
  Sparkles,
} from "lucide-react";

const recommendations = [
  {
    category: "India",
    title: "The stories and developments shaping India today",
    description:
      "A quick look at the important developments you may have missed.",
    readTime: "6 min read",
    accent: "#EA661B",
    featured: true,
  },
  {
    category: "Technology",
    title: "How new technology is changing everyday life",
    description:
      "Explore the trends, ideas and innovations making an impact.",
    readTime: "5 min read",
    accent: "#2563EB",
    featured: false,
  },
  {
    category: "World",
    title: "The global developments worth understanding today",
    description:
      "Key international stories explained simply and clearly.",
    readTime: "7 min read",
    accent: "#C6A15B",
    featured: false,
  },
];

export default function DashboardRecommended() {
  const featured = recommendations[0];
  const secondary = recommendations.slice(1);

  return (
    <section className="relative">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="
                flex h-5 w-5
                items-center justify-center
                rounded-[7px]
                border border-[#C6A15B]/20
                bg-[#C6A15B]/[0.055]
              "
            >
              <Sparkles className="h-3 w-3 text-[#A27C32]" />
            </span>

            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8B6A25]">
              For You
            </p>
          </div>

          <div className="mt-1 flex items-center gap-2">
            <h2 className="text-[17px] font-bold tracking-[-0.025em] text-[#33120A]">
              Recommended Stories
            </h2>

            <span className="hidden h-1 w-1 rounded-full bg-[#C6A15B] sm:block" />

            <span className="hidden text-[9px] text-[#9A948B] sm:block">
              Curated for you
            </span>
          </div>
        </div>

        <button
          type="button"
          className="
            hidden
            items-center gap-1
            text-[10px]
            font-semibold
            text-[#8B6A25]
            transition
            hover:text-[#EA661B]
            sm:flex
          "
        >
          Explore
          <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>

      {/* =====================================================
          FEATURED + SECONDARY
      ===================================================== */}

      <div className="mt-3 grid gap-2.5 lg:grid-cols-[1.45fr_1fr]">
        {/* ===================================================
            FEATURED STORY
        =================================================== */}

        <article
          className="
            group
            relative
            overflow-hidden
            rounded-[18px]
            border border-white/[0.30]
            bg-white/[0.13]
            backdrop-blur-xl
            shadow-[0_10px_30px_rgba(51,18,10,0.035)]
            transition-all duration-300
            hover:-translate-y-0.5
            hover:bg-white/[0.19]
            hover:shadow-[0_14px_35px_rgba(51,18,10,0.05)]
          "
        >
          {/* Ambient glow */}
          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-44
              w-44
              rounded-full
              opacity-20
              blur-[55px]
              transition-opacity
              duration-500
              group-hover:opacity-40
            "
            style={{
              backgroundColor: featured.accent,
            }}
          />

          {/* Top reflection */}
          <div
            className="
              pointer-events-none
              absolute
              left-8
              right-16
              top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-white/75
              to-transparent
            "
          />

          <div className="relative flex min-h-[178px] flex-col justify-between p-4 sm:p-5">
            {/* Top */}
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="
                      rounded-full
                      border
                      bg-white/[0.20]
                      px-2.5
                      py-1
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.14em]
                      backdrop-blur-md
                    "
                    style={{
                      borderColor: `${featured.accent}25`,
                      color: featured.accent,
                    }}
                  >
                    {featured.category}
                  </span>

                  <span className="rounded-full bg-[#33120A]/[0.035] px-2 py-1 text-[8px] font-medium text-[#8B8F97]">
                    Editor's pick
                  </span>
                </div>

                <button
                  type="button"
                  aria-label="Save featured story"
                  className="
                    flex h-7 w-7
                    items-center justify-center
                    rounded-full
                    border border-white/[0.30]
                    bg-white/[0.18]
                    text-[#64748B]
                    backdrop-blur-md
                    transition
                    hover:bg-white/[0.4]
                    hover:text-[#33120A]
                  "
                >
                  <Bookmark className="h-3.5 w-3.5" />
                </button>
              </div>

              <h3
                className="
                  mt-4
                  max-w-[620px]
                  text-[16px]
                  font-bold
                  leading-[1.4]
                  tracking-[-0.02em]
                  text-[#33120A]
                  transition-colors
                  group-hover:text-[#EA661B]
                  sm:text-[18px]
                "
              >
                {featured.title}
              </h3>

              <p className="mt-2 max-w-[570px] text-[10px] leading-[1.65] text-[#7B8088] sm:text-[11px]">
                {featured.description}
              </p>
            </div>

            {/* Bottom */}
            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[9px] text-[#8B8F97]">
                <Clock3 className="h-3 w-3" />
                {featured.readTime}
              </div>

              <button
                type="button"
                aria-label={`Open ${featured.title}`}
                className="
                  flex h-8 w-8
                  items-center justify-center
                  rounded-full
                  bg-[#33120A]
                  text-white
                  shadow-[0_5px_15px_rgba(51,18,10,0.12)]
                  transition-all
                  hover:-translate-y-0.5
                  hover:bg-[#EA661B]
                "
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Accent line */}
          <div
            className="
              absolute
              bottom-0
              left-5
              right-16
              h-px
              opacity-40
            "
            style={{
              backgroundColor: featured.accent,
            }}
          />
        </article>

        {/* ===================================================
            SECONDARY STORIES
        =================================================== */}

        <div className="grid gap-2.5">
          {secondary.map((story) => (
            <article
              key={story.title}
              className="
                group
                relative
                overflow-hidden
                rounded-[17px]
                border border-white/[0.28]
                bg-white/[0.11]
                p-3.5
                backdrop-blur-xl
                shadow-[0_7px_22px_rgba(51,18,10,0.025)]
                transition-all duration-300
                hover:-translate-y-0.5
                hover:bg-white/[0.18]
              "
            >
              {/* Accent glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-10
                  -top-10
                  h-24
                  w-24
                  rounded-full
                  opacity-15
                  blur-2xl
                  transition
                  group-hover:opacity-35
                "
                style={{
                  backgroundColor: story.accent,
                }}
              />

              <div className="relative flex gap-3">
                {/* Story marker */}
                <div className="flex w-7 shrink-0 flex-col items-center">
                  <div
                    className="
                      flex h-7 w-7
                      items-center justify-center
                      rounded-[9px]
                      border
                      bg-white/[0.18]
                    "
                    style={{
                      borderColor: `${story.accent}20`,
                    }}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: story.accent,
                      }}
                    />
                  </div>

                  <div
                    className="mt-1.5 h-full min-h-[32px] w-px opacity-20"
                    style={{
                      backgroundColor: story.accent,
                    }}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="text-[8px] font-bold uppercase tracking-[0.14em]"
                      style={{
                        color: story.accent,
                      }}
                    >
                      {story.category}
                    </span>

                    <button
                      type="button"
                      aria-label={`Open ${story.title}`}
                      className="
                        flex h-6 w-6
                        shrink-0
                        items-center justify-center
                        rounded-full
                        text-[#9A948B]
                        transition
                        hover:bg-white/[0.3]
                        hover:text-[#EA661B]
                      "
                    >
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>

                  <h3
                    className="
                      mt-1.5
                      text-[12px]
                      font-bold
                      leading-[1.45]
                      tracking-[-0.01em]
                      text-[#33120A]
                      transition-colors
                      group-hover:text-[#EA661B]
                    "
                  >
                    {story.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-1.5 text-[8px] text-[#8B8F97]">
                    <Clock3 className="h-2.5 w-2.5" />
                    {story.readTime}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}