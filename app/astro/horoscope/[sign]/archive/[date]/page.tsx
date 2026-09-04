//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO
//
// ARCHIVED HOROSCOPE DETAIL EXPERIENCE
//
// ROUTE:
//
// /astro/horoscope/[sign]/archive/[date]
//
// CMS FIRST
//
// NO ENGINE
// NO CALCULATION
// NO AI
// NO DEMO DATA
// NO BACKEND CHANGE
// NO CONTENT SERVICE CHANGE
// NO CMS MODEL CHANGE
//
//////////////////////////////////////////////////////////////

import Link from "next/link";

import {
  getArchivedHoroscope,
} from "@/lib/services/horoscopeContentService";

import CmsHoroscopeExperience
  from "@/components/astro-new/horoscope-cms/CmsHoroscopeExperience";

//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

interface Props {
  params: {
    sign: string;
    date: string;
  };
}

//////////////////////////////////////////////////////////////
// ROUTE
//////////////////////////////////////////////////////////////

export const dynamic = "force-dynamic";

//////////////////////////////////////////////////////////////
// PAGE
//////////////////////////////////////////////////////////////

export default async function ArchivedHoroscopePage({
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
  // ARCHIVE DATE
  ////////////////////////////////////////////////////////////

  const archivedDate =
    params.date?.trim();

  ////////////////////////////////////////////////////////////
  // LOAD REAL ARCHIVED CMS HOROSCOPE
  //
  // IMPORTANT:
  //
  // No demo Zodiac Master.
  // No temporary injection.
  // No calculation.
  //
  ////////////////////////////////////////////////////////////

  const horoscope =
    await getArchivedHoroscope(
      sign,
      archivedDate,
      "daily",
      "english"
    );

  ////////////////////////////////////////////////////////////
  // EMPTY STATE
  ////////////////////////////////////////////////////////////

  if (!horoscope) {
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
        {/* ==================================================
            COSMIC BACKGROUND
        ================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            overflow-hidden
          "
        >
          <div
            className="
              absolute
              left-1/2
              top-[-220px]
              h-[520px]
              w-[520px]
              -translate-x-1/2
              rounded-full
              bg-violet-600/[0.09]
              blur-[160px]
            "
          />

          <div
            className="
              absolute
              right-[-160px]
              top-[35%]
              h-[360px]
              w-[360px]
              rounded-full
              bg-[#C9A227]/[0.06]
              blur-[140px]
            "
          />

          <div
            className="
              absolute
              left-[-160px]
              bottom-[10%]
              h-[320px]
              w-[320px]
              rounded-full
              bg-blue-600/[0.06]
              blur-[140px]
            "
          />
        </div>

        {/* ==================================================
            EMPTY CONTENT
        ================================================== */}

        <div
          className="
            relative
            z-10
            flex
            min-h-screen
            items-center
            justify-center
            px-5
            py-16
          "
        >
          <div
            className="
              w-full
              max-w-lg
              rounded-[32px]
              border
              border-white/[0.08]
              bg-white/[0.035]
              p-8
              text-center
              shadow-2xl
              backdrop-blur-2xl
              sm:p-10
            "
          >
            {/* Icon */}

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
                text-[#D4AF37]
              "
            >
              ✦
            </div>

            {/* Label */}

            <div
              className="
                mt-6
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#D4AF37]/80
              "
            >
              Horoscope Archive
            </div>

            {/* Title */}

            <h1
              className="
                mt-3
                font-serif
                text-3xl
                font-medium
                tracking-tight
                text-white
              "
            >
              Archived Horoscope Not Found
            </h1>

            {/* Description */}

            <p
              className="
                mx-auto
                mt-4
                max-w-md
                text-sm
                leading-6
                text-white/45
              "
            >
              This archived horoscope reading is not
              available for the requested date.
            </p>

            {/* Date */}

            <div
              className="
                mt-5
                inline-flex
                rounded-full
                border
                border-white/[0.08]
                bg-white/[0.025]
                px-4
                py-2
                text-xs
                text-white/50
              "
            >
              {sign} · {archivedDate}
            </div>

            {/* Navigation */}

            <div
              className="
                mt-7
                flex
                flex-wrap
                justify-center
                gap-3
              "
            >
              <Link
                href={`/astro/horoscope/${sign}/archive`}
                className="
                  rounded-full
                  border
                  border-[#C9A227]/25
                  bg-[#C9A227]/[0.08]
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-[#D4AF37]
                  transition
                  hover:bg-[#C9A227]/[0.14]
                "
              >
                Back to Archive
              </Link>

              <Link
                href={`/astro/horoscope/${sign}`}
                className="
                  rounded-full
                  border
                  border-white/[0.09]
                  bg-white/[0.025]
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white/65
                  transition
                  hover:text-white
                "
              >
                Today's Horoscope
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  ////////////////////////////////////////////////////////////
  // FINAL CMS DATA
  //
  // REAL ARCHIVED CMS OBJECT ONLY.
  //
  // No Zodiac Master demo injection.
  //
  ////////////////////////////////////////////////////////////

  const cmsData = {
    ...horoscope,

    zodiacList:
      horoscope.zodiacList || [],
  };

  ////////////////////////////////////////////////////////////
  // FINAL EXPERIENCE
  ////////////////////////////////////////////////////////////

  return (
    <main
      className="
        min-h-screen
        bg-[#050816]
      "
    >
      <CmsHoroscopeExperience
        data={cmsData}
        currentSign={sign}
      />
    </main>
  );
}

