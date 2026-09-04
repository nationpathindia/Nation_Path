//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO
//
// PREMIUM HOROSCOPE ARCHIVE EXPERIENCE
//
// ROUTE:
//
// /astro/horoscope/[sign]/archive
//
// CMS FIRST
//
// NO ENGINE
// NO CALCULATION
// NO AI
// NO BACKEND CHANGE
// NO CONTENT SERVICE CHANGE
// NO CMS MODEL CHANGE
//
// LOCKED UI:
// PREMIUM COSMIC / VEDIC
// DARK OBSERVATORY
// COMPACT PREMIUM EXPERIENCE
//
//////////////////////////////////////////////////////////////

import Image from "next/image";
import Link from "next/link";

import {
  getHoroscopeArchiveDates,
} from "@/lib/services/horoscopeContentService";

//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

interface Props {
  params: {
    sign: string;
  };
}

//////////////////////////////////////////////////////////////
// ROUTE
//////////////////////////////////////////////////////////////

export const dynamic = "force-dynamic";

//////////////////////////////////////////////////////////////
// ZODIAC META
//
// UI ONLY.
// No calculations.
// No generated syllables.
// No CMS/backend modification.
//////////////////////////////////////////////////////////////

const zodiacMeta: Record<
  string,
  {
    name: string;
    element: string;
  }
> = {
  aries: {
    name: "Aries",
    element: "Fire",
  },

  taurus: {
    name: "Taurus",
    element: "Earth",
  },

  gemini: {
    name: "Gemini",
    element: "Air",
  },

  cancer: {
    name: "Cancer",
    element: "Water",
  },

  leo: {
    name: "Leo",
    element: "Fire",
  },

  virgo: {
    name: "Virgo",
    element: "Earth",
  },

  libra: {
    name: "Libra",
    element: "Air",
  },

  scorpio: {
    name: "Scorpio",
    element: "Water",
  },

  sagittarius: {
    name: "Sagittarius",
    element: "Fire",
  },

  capricorn: {
    name: "Capricorn",
    element: "Earth",
  },

  aquarius: {
    name: "Aquarius",
    element: "Air",
  },

  pisces: {
    name: "Pisces",
    element: "Water",
  },
};

//////////////////////////////////////////////////////////////
// PAGE
//////////////////////////////////////////////////////////////

export default async function HoroscopeArchivePage({
  params,
}: Props) {
  ////////////////////////////////////////////////////////////
  // SIGN
  ////////////////////////////////////////////////////////////

  const sign =
    params.sign
      ?.trim()
      .toLowerCase();

  ////////////////////////////////////////////////////////////
  // ZODIAC
  ////////////////////////////////////////////////////////////

  const zodiac =
    zodiacMeta[sign] || {
      name:
        sign
          ? sign.charAt(0).toUpperCase() +
            sign.slice(1)
          : "Zodiac",

      element: "Cosmic",
    };

  ////////////////////////////////////////////////////////////
  // ARCHIVE DATA
  //
  // EXISTING CMS SERVICE.
  //
  // DO NOT CHANGE.
  ////////////////////////////////////////////////////////////

  const archives =
    await getHoroscopeArchiveDates(
      sign,
      "daily",
      "english"
    );

  ////////////////////////////////////////////////////////////
  // IMAGE
  ////////////////////////////////////////////////////////////

  const zodiacImage =
    `/zodiac/${sign}.png`;

  ////////////////////////////////////////////////////////////
  // PAGE
  ////////////////////////////////////////////////////////////

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#050816]
        text-white
      "
    >
      {/* =====================================================
          COSMIC BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        {/* Primary violet glow */}

        <div
          className="
            absolute
            left-1/2
            top-[-280px]
            h-[620px]
            w-[620px]
            -translate-x-1/2
            rounded-full
            bg-violet-600/[0.10]
            blur-[170px]
          "
        />

        {/* Gold glow */}

        <div
          className="
            absolute
            right-[-180px]
            top-[20%]
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#C9A227]/[0.07]
            blur-[150px]
          "
        />

        {/* Blue glow */}

        <div
          className="
            absolute
            left-[-180px]
            bottom-[10%]
            h-[380px]
            w-[380px]
            rounded-full
            bg-blue-600/[0.07]
            blur-[150px]
          "
        />

        {/* Observatory light */}

        <div
          className="
            absolute
            left-1/2
            top-[38%]
            h-[260px]
            w-[260px]
            -translate-x-1/2
            rounded-full
            bg-fuchsia-500/[0.035]
            blur-[120px]
          "
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-6xl
          px-5
          py-10
          sm:px-6
          sm:py-14
          lg:py-20
        "
      >
        {/* ===================================================
            BREADCRUMB / TOP LABEL
        =================================================== */}

        <div
          className="
            mb-8
            flex
            flex-wrap
            items-center
            gap-2
            text-xs
            uppercase
            tracking-[0.22em]
            text-white/45
          "
        >
          <Link
            href="/astro"
            className="
              transition
              hover:text-[#D4AF37]
            "
          >
            Astro
          </Link>

          <span className="text-white/20">
            /
          </span>

          <Link
            href="/astro/horoscope"
            className="
              transition
              hover:text-[#D4AF37]
            "
          >
            Horoscope
          </Link>

          <span className="text-white/20">
            /
          </span>

          <span className="text-[#D4AF37]/80">
            Archive
          </span>
        </div>

        {/* ===================================================
            HERO
        =================================================== */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[32px]
            border
            border-white/[0.08]
            bg-white/[0.035]
            px-6
            py-10
            shadow-2xl
            backdrop-blur-2xl
            sm:rounded-[40px]
            sm:px-10
            sm:py-12
          "
        >
          {/* Hero glow */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-0
              h-[260px]
              w-[520px]
              -translate-x-1/2
              rounded-full
              bg-[#C9A227]/[0.055]
              blur-[100px]
            "
          />

          <div
            className="
              relative
              z-10
              grid
              items-center
              gap-10
              lg:grid-cols-[1fr_auto]
            "
          >
            {/* =================================================
                HERO CONTENT
            ================================================= */}

            <div
              className="
                text-center
                lg:text-left
              "
            >
              {/* Label */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#C9A227]/25
                  bg-[#C9A227]/[0.06]
                  px-4
                  py-2
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.24em]
                  text-[#D4AF37]
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#D4AF37]
                    shadow-[0_0_10px_rgba(212,175,55,0.8)]
                  "
                />

                Horoscope Observatory
              </div>

              {/* Title */}

              <h1
                className="
                  mt-5
                  font-serif
                  text-4xl
                  font-medium
                  tracking-tight
                  text-white
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                {zodiac.name}
              </h1>

              <div
                className="
                  mt-2
                  text-sm
                  uppercase
                  tracking-[0.22em]
                  text-white/45
                "
              >
                Daily Horoscope Archive
              </div>

              {/* Description */}

              <p
                className="
                  mx-auto
                  mt-5
                  max-w-2xl
                  text-sm
                  leading-7
                  text-white/55
                  sm:text-base
                  lg:mx-0
                "
              >
                Revisit previous {zodiac.name} horoscope
                readings and explore the journey preserved
                in the NationPath Astro archive.
              </p>

              {/* Meta */}

              <div
                className="
                  mt-6
                  flex
                  flex-wrap
                  justify-center
                  gap-2
                  lg:justify-start
                "
              >
                <div
                  className="
                    rounded-full
                    border
                    border-white/[0.08]
                    bg-white/[0.035]
                    px-4
                    py-2
                    text-xs
                    text-white/60
                  "
                >
                  {zodiac.element} Element
                </div>

                <div
                  className="
                    rounded-full
                    border
                    border-white/[0.08]
                    bg-white/[0.035]
                    px-4
                    py-2
                    text-xs
                    text-white/60
                  "
                >
                  Daily
                </div>

                <div
                  className="
                    rounded-full
                    border
                    border-[#C9A227]/20
                    bg-[#C9A227]/[0.05]
                    px-4
                    py-2
                    text-xs
                    text-[#D4AF37]
                  "
                >
                  {archives.length} Archived
                </div>
              </div>
            </div>

            {/* =================================================
                ZODIAC OBSERVATORY
            ================================================= */}

            <div
              className="
                mx-auto
                flex
                w-full
                max-w-[250px]
                justify-center
                lg:w-[250px]
              "
            >
              <div
                className="
                  relative
                  flex
                  h-[210px]
                  w-[210px]
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#C9A227]/20
                  bg-[#080B1D]
                  shadow-[0_0_70px_rgba(139,92,246,0.10)]
                "
              >
                {/* Subtle outer glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-[-12px]
                    rounded-full
                    border
                    border-violet-400/[0.08]
                  "
                />

                {/* Small observatory points */}

                <span
                  className="
                    absolute
                    left-[16%]
                    top-[23%]
                    h-1
                    w-1
                    rounded-full
                    bg-[#D4AF37]/70
                  "
                />

                <span
                  className="
                    absolute
                    right-[17%]
                    top-[31%]
                    h-1
                    w-1
                    rounded-full
                    bg-violet-300/60
                  "
                />

                <span
                  className="
                    absolute
                    bottom-[23%]
                    left-[23%]
                    h-1
                    w-1
                    rounded-full
                    bg-blue-300/50
                  "
                />

                {/* Zodiac symbol */}

                <div
                  className="
                    relative
                    flex
                    h-[135px]
                    w-[135px]
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/[0.06]
                    bg-white/[0.025]
                  "
                >
                  <Image
                    src={zodiacImage}
                    alt={`${zodiac.name} zodiac`}
                    width={120}
                    height={120}
                    priority
                    className="
                      h-[105px]
                      w-[105px]
                      object-contain
                      opacity-95
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            ARCHIVE HEADER
        =================================================== */}

        <section className="mt-12 sm:mt-16">
          <div
            className="
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              <div
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-[#D4AF37]/80
                "
              >
                Archive Library
              </div>

              <h2
                className="
                  mt-2
                  font-serif
                  text-3xl
                  font-medium
                  tracking-tight
                  text-white
                  sm:text-4xl
                "
              >
                Past Horoscope Journey
              </h2>

              <p
                className="
                  mt-2
                  max-w-xl
                  text-sm
                  leading-6
                  text-white/45
                "
              >
                Select a date to revisit the archived
                {` ${zodiac.name}`} daily horoscope.
              </p>
            </div>

            {/* Archive count */}

            <div
              className="
                inline-flex
                w-fit
                items-center
                gap-2
                rounded-full
                border
                border-white/[0.08]
                bg-white/[0.035]
                px-4
                py-2
                text-xs
                text-white/55
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#D4AF37]
                "
              />

              {archives.length}{" "}
              {archives.length === 1
                ? "Archive"
                : "Archives"}
            </div>
          </div>

          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {archives.length === 0 ? (
            <div
              className="
                mt-8
                rounded-[28px]
                border
                border-white/[0.08]
                bg-white/[0.025]
                px-6
                py-14
                text-center
                backdrop-blur-xl
              "
            >
              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#C9A227]/20
                  bg-[#C9A227]/[0.05]
                  text-xl
                "
              >
                ✦
              </div>

              <h3
                className="
                  mt-5
                  font-serif
                  text-2xl
                  text-white
                "
              >
                No Archived Horoscope Yet
              </h3>

              <p
                className="
                  mx-auto
                  mt-3
                  max-w-md
                  text-sm
                  leading-6
                  text-white/45
                "
              >
                Archived {zodiac.name} horoscope readings
                will appear here once available.
              </p>
            </div>
          ) : (
            /* =================================================
               ARCHIVE LIST
            ================================================= */

            <div
              className="
                mt-8
                grid
                gap-3
              "
            >
              {archives.map(
                (
                  item: any,
                  index: number
                ) => {
                  const archiveDate =
                    item.meta?.slugDate ||
                    item.slugDate ||
                    item.date ||
                    "Archive";

                  return (
                    <Link
                      key={
                        item.meta?.slugDate ||
                        index
                      }
                      href={`/astro/horoscope/${sign}/archive/${archiveDate}`}
                      className="
                        group
                        relative
                        overflow-hidden
                        rounded-[24px]
                        border
                        border-white/[0.07]
                        bg-white/[0.025]
                        p-4
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:border-[#C9A227]/25
                        hover:bg-white/[0.045]
                        hover:shadow-[0_15px_50px_rgba(0,0,0,0.25)]
                        sm:p-5
                      "
                    >
                      {/* Hover glow */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          right-[-80px]
                          top-1/2
                          h-32
                          w-32
                          -translate-y-1/2
                          rounded-full
                          bg-[#C9A227]/[0.04]
                          blur-3xl
                          opacity-0
                          transition
                          duration-300
                          group-hover:opacity-100
                        "
                      />

                      <div
                        className="
                          relative
                          flex
                          items-center
                          justify-between
                          gap-4
                        "
                      >
                        {/* Left */}

                        <div
                          className="
                            flex
                            min-w-0
                            items-center
                            gap-4
                          "
                        >
                          {/* Zodiac icon */}

                          <div
                            className="
                              flex
                              h-14
                              w-14
                              shrink-0
                              items-center
                              justify-center
                              rounded-2xl
                              border
                              border-white/[0.07]
                              bg-[#080B1D]
                            "
                          >
                            <Image
                              src={
                                zodiacImage
                              }
                              alt={
                                zodiac.name
                              }
                              width={42}
                              height={42}
                              className="
                                h-9
                                w-9
                                object-contain
                              "
                            />
                          </div>

                          {/* Date info */}

                          <div
                            className="
                              min-w-0
                            "
                          >
                            <div
                              className="
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.22em]
                                text-[#D4AF37]/75
                              "
                            >
                              Daily Archive
                            </div>

                            <h3
                              className="
                                mt-1
                                truncate
                                text-base
                                font-semibold
                                text-white
                                sm:text-lg
                              "
                            >
                              {zodiac.name} Rashifal
                            </h3>

                            <p
                              className="
                                mt-1
                                truncate
                                text-xs
                                text-white/40
                              "
                            >
                              {archiveDate}
                            </p>
                          </div>
                        </div>

                        {/* Arrow */}

                        <div
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/[0.08]
                            bg-white/[0.025]
                            text-white/45
                            transition
                            duration-300
                            group-hover:border-[#C9A227]/25
                            group-hover:text-[#D4AF37]
                          "
                        >
                          →
                        </div>
                      </div>
                    </Link>
                  );
                }
              )}
            </div>
          )}
        </section>

        {/* ===================================================
            PREMIUM CTA
        =================================================== */}

        <section
          className="
            relative
            mt-14
            overflow-hidden
            rounded-[32px]
            border
            border-[#C9A227]/15
            bg-gradient-to-br
            from-white/[0.055]
            via-white/[0.025]
            to-[#C9A227]/[0.035]
            px-6
            py-10
            text-center
            shadow-2xl
            sm:mt-16
            sm:px-10
          "
        >
          {/* CTA glow */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[-120px]
              h-[300px]
              w-[500px]
              -translate-x-1/2
              rounded-full
              bg-violet-600/[0.06]
              blur-[100px]
            "
          />

          <div className="relative z-10">
            <div
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#D4AF37]/80
              "
            >
              Continue Your Journey
            </div>

            <h2
              className="
                mt-3
                font-serif
                text-3xl
                font-medium
                text-white
                sm:text-4xl
              "
            >
              Return to the Cosmos
            </h2>

            <p
              className="
                mx-auto
                mt-3
                max-w-xl
                text-sm
                leading-6
                text-white/45
              "
            >
              Read today's {zodiac.name} horoscope or
              explore the complete zodiac collection.
            </p>

            <div
              className="
                mt-7
                flex
                flex-wrap
                justify-center
                gap-3
              "
            >
              {/* Today's Horoscope */}

              <Link
                href={`/astro/horoscope/${sign}`}
                className="
                  rounded-full
                  border
                  border-[#C9A227]/30
                  bg-[#C9A227]/[0.10]
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-[#E2C45A]
                  transition
                  hover:bg-[#C9A227]/[0.16]
                "
              >
                Today's Horoscope
              </Link>

              {/* Explore Zodiac */}

              <Link
                href="/astro/horoscope"
                className="
                  rounded-full
                  border
                  border-white/[0.10]
                  bg-white/[0.035]
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-white/70
                  transition
                  hover:border-white/[0.18]
                  hover:text-white
                "
              >
                Explore Zodiac
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}