"use client";

/*
//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// PREMIUM HOROSCOPE — COSMIC INTELLIGENCE
//
// CMS FIRST
// NO ENGINE
// NO CALCULATION
// NO AI
//
// PURPOSE:
//
// ONE INTELLIGENCE PANEL
//
// 3 PRIMARY SIGNALS:
//
//   ├── Planetary Influence
//   ├── Energy
//   └── Cosmic Remedy
//
// Guidance intentionally removed.
// Guidance already belongs to other horoscope components.
//
// Strengths / Challenges remain below as supporting intelligence.
//
// DESIGN:
//
// Premium Cosmic Life Observatory
// Deep Navy / Violet / Gold
// Warm Ivory Typography
// Subtle Cosmic Atmosphere
// Compact but premium
//////////////////////////////////////////////////////////////
*/

import {
  Compass,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import type {
  CmsHoroscopeInsights,
} from "./types";

interface Props {
  insights?: CmsHoroscopeInsights;
}

export default function HoroscopeIntelligencePanel({
  insights,
}: Props) {
  if (!insights) {
    return null;
  }

  /*
  ////////////////////////////////////////////////////////////
  // CONTENT CHECK
  ////////////////////////////////////////////////////////////
  */

  const hasPrimaryContent =
    Boolean(
      insights.planetaryInfluence ||
        insights.energy ||
        insights.remedy
    );

  const hasLists =
    Boolean(
      insights.strengths?.length ||
        insights.challenges?.length
    );

  if (!hasPrimaryContent && !hasLists) {
    return null;
  }

  return (
    <section className="w-full">
      <div
        className="
          group
          relative
          isolate
          overflow-hidden
          rounded-[28px]
          border
          border-[#8c6aaf]/20
          bg-[#08062b]
          text-[#eee2b7]
          shadow-[0_30px_100px_rgba(5,3,35,.24)]
          backdrop-blur-2xl
        "
      >
        {/* ====================================================
            COSMIC ATMOSPHERE
            ==================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            overflow-hidden
          "
        >
          {/* Upper violet atmosphere */}

          <div
            className="
              absolute
              -left-32
              -top-32
              h-[360px]
              w-[360px]
              rounded-full
              bg-[#8c1682]/16
              blur-[130px]
            "
          />

          {/* Right magenta atmosphere */}

          <div
            className="
              absolute
              -right-28
              top-1/4
              h-[340px]
              w-[340px]
              rounded-full
              bg-[#c6539e]/[0.08]
              blur-[140px]
            "
          />

          {/* Lower violet atmosphere */}

          <div
            className="
              absolute
              bottom-[-180px]
              left-1/3
              h-[360px]
              w-[360px]
              rounded-full
              bg-[#34136d]/20
              blur-[150px]
            "
          />

          {/* Very subtle central gold atmosphere */}

          <div
            className="
              absolute
              left-[42%]
              top-[20%]
              h-[260px]
              w-[260px]
              rounded-full
              bg-[#d4af37]/[0.035]
              blur-[120px]
            "
          />

          {/* Fine cosmic stars */}

          <div
            className="
              absolute
              inset-0
              opacity-[0.022]
              [background-image:radial-gradient(rgba(255,255,255,.9)_1px,transparent_1px)]
              [background-size:36px_36px]
            "
          />

          {/* Gold top signal */}

          <div
            className="
              absolute
              left-6
              right-6
              top-0
              h-[2px]
              bg-gradient-to-r
              from-transparent
              via-[#e5c64e]/65
              to-transparent
              sm:left-8
              sm:right-8
            "
          />
        </div>

        {/* ====================================================
            HEADER
            ==================================================== */}

        <div
          className="
            relative
            z-10
            px-5
            pb-5
            pt-6
            sm:px-7
            sm:pb-6
            sm:pt-7
          "
        >
          <div className="flex items-start gap-4">
            {/* Header icon */}

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl
                border
                border-[#d4af37]/20
                bg-[#d4af37]/[0.045]
                shadow-[0_8px_30px_rgba(212,175,55,.045)]
              "
            >
              <Sparkles
                size={19}
                strokeWidth={1.6}
                className="
                  text-[#dfc45a]
                  drop-shadow-[0_0_8px_rgba(229,198,78,.32)]
                "
              />
            </div>

            <div>
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.28em]
                  text-[#d8bd55]
                "
              >
                Cosmic Intelligence
              </p>

              <h2
                className="
                  mt-1.5
                  font-serif
                  text-xl
                  font-semibold
                  tracking-[-0.02em]
                  text-[#eee2b7]
                  sm:text-2xl
                "
              >
                Today&apos;s Cosmic Signals
              </h2>

              <p
                className="
                  mt-1.5
                  max-w-2xl
                  text-xs
                  leading-5
                  text-[#aaa1ba]
                  sm:text-sm
                "
              >
                Key planetary and energetic insights
                from your horoscope.
              </p>
            </div>
          </div>
        </div>

        {/* ====================================================
            DIVIDER
            ==================================================== */}

        <div
          className="
            relative
            z-10
            mx-5
            h-px
            bg-gradient-to-r
            from-transparent
            via-[#d4af37]/35
            to-transparent
            sm:mx-7
          "
        />

        {/* ====================================================
            PRIMARY INTELLIGENCE

            DESKTOP:
            EXACTLY 3 COLUMNS
            ONE ROW

            Planetary | Energy | Remedy
            ==================================================== */}

        {hasPrimaryContent && (
          <div
            className="
              relative
              z-10
              grid
              grid-cols-1
              gap-3
              p-5
              sm:p-6
              lg:grid-cols-3
            "
          >
            {insights.planetaryInfluence && (
              <IntelligenceCard
                icon={Compass}
                label="Planetary Influence"
                value={insights.planetaryInfluence}
                accent="planetary"
              />
            )}

            {insights.energy && (
              <IntelligenceCard
                icon={Zap}
                label="Energy"
                value={insights.energy}
                accent="energy"
              />
            )}

            {insights.remedy && (
              <IntelligenceCard
                icon={ShieldCheck}
                label="Cosmic Remedy"
                value={insights.remedy}
                accent="remedy"
              />
            )}
          </div>
        )}

        {/* ====================================================
            STRENGTHS / CHALLENGES
            ==================================================== */}

        {hasLists && (
          <div
            className="
              relative
              z-10
              grid
              gap-4
              border-t
              border-white/[0.055]
              bg-[#05031f]/20
              p-5
              sm:p-6
              md:grid-cols-2
            "
          >
            {insights.strengths?.length ? (
              <InsightList
                title="Today&apos;s Strengths"
                items={insights.strengths}
                positive
              />
            ) : null}

            {insights.challenges?.length ? (
              <InsightList
                title="Today&apos;s Challenges"
                items={insights.challenges}
              />
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}

/*
//////////////////////////////////////////////////////////////
// INTELLIGENCE CARD
//////////////////////////////////////////////////////////////
*/

function IntelligenceCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Compass;
  label: string;
  value: string;
  accent: "planetary" | "energy" | "remedy";
}) {
  const accentColor =
    accent === "energy"
      ? "text-[#d875b5]"
      : accent === "remedy"
        ? "text-[#75b9a5]"
        : "text-[#a98bd4]";

  const accentBorder =
    accent === "energy"
      ? "border-[#c6539e]/[0.16]"
      : accent === "remedy"
        ? "border-[#5eaa92]/[0.14]"
        : "border-[#7757b5]/[0.16]";

  const accentBackground =
    accent === "energy"
      ? "bg-[#c6539e]/[0.045]"
      : accent === "remedy"
        ? "bg-[#5eaa92]/[0.035]"
        : "bg-[#7757b5]/[0.045]";

  const accentGlow =
    accent === "energy"
      ? "bg-[#c6539e]/[0.08]"
      : accent === "remedy"
        ? "bg-[#5eaa92]/[0.06]"
        : "bg-[#7757b5]/[0.08]";

  return (
    <article
      className="
        group
        relative
        min-w-0
        overflow-hidden
        rounded-[20px]
        border
        border-white/[0.065]
        bg-gradient-to-br
        from-[#151039]/90
        via-[#0d092f]/95
        to-[#110a35]/90
        p-4
        shadow-[0_14px_35px_rgba(0,0,0,.14)]
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-[#d4af37]/25
        hover:shadow-[0_20px_45px_rgba(0,0,0,.22)]
      "
    >
      {/* ==================================================
          CARD GLOW
          ================================================== */}

      <div
        aria-hidden="true"
        className={`
          pointer-events-none
          absolute
          -right-12
          -top-12
          h-28
          w-28
          rounded-full
          blur-[48px]
          opacity-60
          transition-all
          duration-500
          group-hover:scale-[1.4]
          group-hover:opacity-100
          ${accentGlow}
        `}
      />

      {/* ==================================================
          CARD TOP GOLD SIGNAL
          ================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          h-px
          w-1/3
          bg-gradient-to-r
          from-transparent
          via-[#d4af37]/60
          to-transparent
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      {/* ==================================================
          HEADER
          ================================================== */}

      <div
        className="
          relative
          flex
          items-center
          justify-between
          gap-3
        "
      >
        <div
          className={`
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            ${accentBorder}
            ${accentBackground}
            transition-all
            duration-300
            group-hover:border-[#d4af37]/25
            group-hover:bg-[#d4af37]/[0.055]
          `}
        >
          <Icon
            size={16}
            strokeWidth={1.6}
            className={`
              ${accentColor}
              transition-colors
              duration-300
              group-hover:text-[#dfc45a]
            `}
          />
        </div>

        <span
          className="
            rounded-full
            border
            border-white/[0.05]
            bg-white/[0.018]
            px-2
            py-1
            text-[7px]
            font-bold
            uppercase
            tracking-[0.16em]
            text-[#625b7c]
          "
        >
          Cosmic Signal
        </span>
      </div>

      {/* ==================================================
          LABEL
          ================================================== */}

      <h3
        className="
          relative
          mt-4
          text-[10px]
          font-bold
          uppercase
          tracking-[0.17em]
          text-[#d9bd55]
        "
      >
        {label}
      </h3>

      {/* Accent line */}

      <div
        aria-hidden="true"
        className="
          relative
          mt-2
          h-px
          w-8
          bg-gradient-to-r
          from-[#d4af37]/65
          to-transparent
          transition-all
          duration-300
          group-hover:w-14
        "
      />

      {/* ==================================================
          CONTENT
          ================================================== */}

      <p
        className="
          relative
          mt-3
          text-[12px]
          leading-5
          text-[#bdb6c9]
          sm:text-[13px]
          sm:leading-6
        "
      >
        {value}
      </p>

      {/* Bottom accent */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-4
          right-4
          h-px
          bg-gradient-to-r
          from-transparent
          via-[#d4af37]/20
          to-transparent
        "
      />
    </article>
  );
}

/*
//////////////////////////////////////////////////////////////
// STRENGTHS / CHALLENGES
//////////////////////////////////////////////////////////////
*/

function InsightList({
  title,
  items,
  positive = false,
}: {
  title: string;
  items: string[];
  positive?: boolean;
}) {
  return (
    <div>
      <p
        className="
          text-[9px]
          font-bold
          uppercase
          tracking-[0.22em]
          text-[#d9bd55]
        "
      >
        {title}
      </p>

      <div className="mt-3 space-y-2">
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="
              group/item
              flex
              items-start
              gap-2.5
              rounded-xl
              border
              border-white/[0.045]
              bg-[#0d092f]/50
              px-3
              py-2.5
              transition-all
              duration-300
              hover:border-[#d4af37]/15
              hover:bg-[#151039]/70
            "
          >
            <span
              className={`
                mt-1.5
                h-1.5
                w-1.5
                shrink-0
                rounded-full
                ${
                  positive
                    ? "bg-[#e5c64e] shadow-[0_0_8px_rgba(229,198,78,.4)]"
                    : "bg-[#746c88]"
                }
              `}
            />

            <p
              className="
                text-xs
                leading-5
                text-[#aaa1ba]
                transition-colors
                duration-300
                group-hover/item:text-[#bdb6c9]
              "
            >
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}