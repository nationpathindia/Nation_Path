/*
//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO
//
// CMS HOROSCOPE SIGN EXPERIENCE PAGE
//
// DEMO ZODIAC MASTER TEST
//
// FLOW:
//
// URL SIGN
//      ↓
// Horoscope CMS API
//      ↓
// CMS HOROSCOPE DATA
//      ↓
// TEMPORARY DEMO ZODIAC MASTER
//      ↓
// experienceData.zodiac
//      ↓
// CmsHoroscopeExperience
//
// LOCKED:
//
// ✅ CMS FIRST
// ✅ NO ENGINE
// ✅ NO CALCULATION
// ✅ NO AI GENERATION
// ✅ NO BACKEND CHANGE
// ✅ NO CONTENT SERVICE CHANGE
// ✅ NO CMS MODEL CHANGE
//
// CURRENT TEST:
//
// ⚠️ Zodiac Master is TEMPORARILY injected on this page
// ⚠️ This is ONLY to verify UI/data wiring
//
// AFTER TEST:
//
// DEMO_ZODIAC_MASTER will be removed
// and real cms.zodiac will be connected.
//
//////////////////////////////////////////////////////////////
*/

import CmsHoroscopeExperience
  from "@/components/astro-new/horoscope-cms/CmsHoroscopeExperience";

import HoroscopeGeneratingLoader
  from "@/components/astro-new/horoscope-cms/HoroscopeGeneratingLoader";

import type { Metadata } from "next";

import { cache } from "react";

//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

interface PageProps {
  params: Promise<{
    sign: string;
  }>;
}

//////////////////////////////////////////////////////////////
// SITE URL
//////////////////////////////////////////////////////////////

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://nationpathindia.com";

//////////////////////////////////////////////////////////////
// SIGN NORMALIZATION
//////////////////////////////////////////////////////////////

function normalizeSign(
  sign: string
) {
  return sign
    .trim()
    .toLowerCase();
}

//////////////////////////////////////////////////////////////
// TEMPORARY DEMO ZODIAC MASTER
//
// IMPORTANT:
//
// This is intentionally here ONLY for testing.
//
// This data is taken from the Zodiac Master JSON
// you provided for Aries.
//
// NO calculation.
// NO transformation.
// NO hardcoded syllable generation.
//
// The purpose is simply:
//
// DEMO DATA
//    ↓
// experienceData.zodiac
//    ↓
// CmsHoroscopeExperience
//    ↓
// nameInitials
//
//////////////////////////////////////////////////////////////

const DEMO_ZODIAC_MASTER = {
  zodiac:
    "aries",

  slug:
    "aries",

  names: {
    english:
      "Aries",

    hindi:
      "मेष",

    sanskrit:
      "मेष",
  },

  identity: {
    rashi:
      "मेष राशि",

    sanskritName:
      "मेष",

    dates:
      "March 21 - April 19",

    description:
      "Aries represents courage, initiative and leadership energy.",

    energy:
      "Mars Energy",
  },

  ////////////////////////////////////////////////////////////
  // VEDIC NAME INITIALS
  ////////////////////////////////////////////////////////////

  nameInitials: [
    "चू",
    "चे",
    "चो",
    "ला",
    "ली",
    "लू",
    "ले",
    "लो",
    "अ",
  ],

  element:
    "fire",

  modality:
    "cardinal",

  rulingPlanet:
    "Mars",

  media: {},
};

//////////////////////////////////////////////////////////////
// CMS API
//////////////////////////////////////////////////////////////

const getHoroscopeCMS = cache(
  async (
    sign: string
  ) => {

    const normalizedSign =
      normalizeSign(sign);

    try {

      const response =
        await fetch(
          `${SITE_URL}/api/astro/horoscope/cms`,
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                zodiacSign:
                  normalizedSign,

                language:
                  "english",

                period:
                  "daily",
              }),

            cache:
              "no-store",
          }
        );

      ////////////////////////////////////////////////////////////
      // API FAILURE
      ////////////////////////////////////////////////////////////

      if (!response.ok) {
        return {
          cms:
            null,

          automation:
            null,
        };
      }

      ////////////////////////////////////////////////////////////
      // API RESPONSE
      ////////////////////////////////////////////////////////////

      const result =
        await response.json();

      ////////////////////////////////////////////////////////////
      // API CONTRACT
      //
      // {
      //   success: true,
      //   data: {
      //     cms: {
      //       ...
      //     }
      //   }
      // }
      //
      ////////////////////////////////////////////////////////////

      const payload =
        result?.data ||
        result;

      ////////////////////////////////////////////////////////////
      // CMS
      ////////////////////////////////////////////////////////////

      const cms =
        payload?.cms ||
        null;

      ////////////////////////////////////////////////////////////
      // RETURN
      ////////////////////////////////////////////////////////////

      return {
        cms,

        automation:
          payload?.automation ||
          null,
      };

    } catch (
      error
    ) {

      return {
        cms:
          null,

        automation:
          null,
      };
    }
  }
);

//////////////////////////////////////////////////////////////
// SEO
//////////////////////////////////////////////////////////////

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {

  const {
    sign,
  } =
    await params;

  const normalizedSign =
    normalizeSign(sign);

  const {
    cms,
  } =
    await getHoroscopeCMS(
      normalizedSign
    );

  const seo =
    cms?.seo;

  const zodiacName =
    cms?.zodiac
      ?.names
      ?.english ||

    normalizedSign
      .charAt(0)
      .toUpperCase() +

    normalizedSign
      .slice(1);

  const title =
    seo?.title ||

    `${zodiacName} Daily Horoscope Today | NationPath Astro`;

  const description =
    seo?.description ||

    `Read ${zodiacName} daily horoscope with career, love, finance, health and Vedic astrology guidance on NationPath Astro.`;

  const canonical =
    seo?.canonical
      ? seo.canonical.startsWith(
          "http"
        )
        ? seo.canonical
        : `${SITE_URL}${seo.canonical}`
      : `${SITE_URL}/astro/horoscope/${normalizedSign}`;

  const ogImage =
    seo?.ogImage ||

    `${SITE_URL}/zodiac/${normalizedSign}.png`;

  return {

    metadataBase:
      new URL(
        SITE_URL
      ),

    title,

    description,

    keywords:
      seo?.keywords ||

      [
        `${zodiacName} Horoscope`,
        `${zodiacName} Daily Horoscope`,
        "Daily Horoscope",
        "Vedic Astrology",
        "Rashifal",
        "NationPath Astro",
      ],

    alternates: {
      canonical,
    },

    robots: {

      index:
        true,

      follow:
        true,

      googleBot: {

        index:
          true,

        follow:
          true,

        "max-image-preview":
          "large",

        "max-snippet":
          -1,

        "max-video-preview":
          -1,
      },
    },

    openGraph: {

      type:
        "website",

      locale:
        "en_IN",

      siteName:
        "NationPath Astro",

      title,

      description,

      url:
        canonical,

      images: [
        {
          url:
            ogImage,

          width:
            800,

          height:
            800,

          alt:
            `${zodiacName} Daily Horoscope`,
        },
      ],
    },

    twitter: {

      card:
        "summary_large_image",

      title,

      description,

      images: [
        ogImage,
      ],
    },
  };
}

//////////////////////////////////////////////////////////////
// SAFE JSON-LD
//////////////////////////////////////////////////////////////

function serializeJsonLd(
  data: unknown
) {

  return JSON.stringify(
    data
  )
    .replace(
      /</g,
      "\\u003c"
    )
    .replace(
      />/g,
      "\\u003e"
    )
    .replace(
      /&/g,
      "\\u0026"
    );
}

//////////////////////////////////////////////////////////////
// PAGE
//////////////////////////////////////////////////////////////

export default async function HoroscopeSignPage({
  params,
}: PageProps) {

  const {
    sign,
  } =
    await params;

  const normalizedSign =
    normalizeSign(sign);

  ////////////////////////////////////////////////////////////
  // LOAD CMS
  ////////////////////////////////////////////////////////////

  const {
    cms,
    automation,
  } =
    await getHoroscopeCMS(
      normalizedSign
    );

  ////////////////////////////////////////////////////////////
  // GENERATION LOADER
  ////////////////////////////////////////////////////////////

  if (
    !cms &&
    automation?.generating
  ) {

    return (
      <HoroscopeGeneratingLoader
        sign={
          normalizedSign
        }
      />
    );
  }

  ////////////////////////////////////////////////////////////
  // EMPTY STATE
  ////////////////////////////////////////////////////////////

  if (!cms) {

    return (
      <main
        className="
          min-h-screen
          bg-[#050816]
          flex
          items-center
          justify-center
          px-6
        "
      >

        <div
          className="
            w-full
            max-w-md
            rounded-3xl
            border
            border-[#C9A227]/30
            bg-white/[0.04]
            p-8
            text-center
            text-white
            shadow-2xl
          "
        >

          <h1
            className="
              text-3xl
              font-serif
              tracking-tight
            "
          >
            Horoscope Content Unavailable
          </h1>

          <p
            className="
              mt-4
              text-sm
              leading-6
              text-gray-400
            "
          >
            CMS horoscope content was
            not found for this zodiac sign.
          </p>

          <p
            className="
              mt-4
              text-xs
              font-medium
              uppercase
              tracking-[0.25em]
              text-[#C9A227]
            "
          >
            {
              normalizedSign
            }
          </p>

        </div>

      </main>
    );
  }

  ////////////////////////////////////////////////////////////
  // ZODIAC NAME
  //
  // SEO can continue using the real CMS value.
  //
  ////////////////////////////////////////////////////////////

  const zodiacName =
    cms?.zodiac
      ?.names
      ?.english ||

    normalizedSign
      .charAt(0)
      .toUpperCase() +

    normalizedSign
      .slice(1);

  ////////////////////////////////////////////////////////////
  // HOROSCOPE URL
  ////////////////////////////////////////////////////////////

  const horoscopeUrl =
    `${SITE_URL}/astro/horoscope/${normalizedSign}`;

  ////////////////////////////////////////////////////////////
  // HOROSCOPE SCHEMA
  ////////////////////////////////////////////////////////////

  const horoscopeSchema = {

    "@context":
      "https://schema.org",

    "@type":
      "WebPage",

    name:
      `${zodiacName} Daily Horoscope | NationPath Astro`,

    url:
      horoscopeUrl,

    description:
      cms.seo?.description ||

      `Daily ${zodiacName} horoscope with Vedic insights by NationPath Astro.`,

    publisher: {

      "@type":
        "Organization",

      name:
        "NationPath Astro",

      url:
        SITE_URL,
    },
  };

  ////////////////////////////////////////////////////////////
  // BREADCRUMB SCHEMA
  ////////////////////////////////////////////////////////////

  const breadcrumbSchema = {

    "@context":
      "https://schema.org",

    "@type":
      "BreadcrumbList",

    itemListElement: [

      {

        "@type":
          "ListItem",

        position:
          1,

        name:
          "Home",

        item:
          SITE_URL,
      },

      {

        "@type":
          "ListItem",

        position:
          2,

        name:
          "Astro",

        item:
          `${SITE_URL}/astro`,
      },

      {

        "@type":
          "ListItem",

        position:
          3,

        name:
          "Horoscope",

        item:
          `${SITE_URL}/astro/horoscope`,
      },

      {

        "@type":
          "ListItem",

        position:
          4,

        name:
          `${zodiacName} Horoscope`,

        item:
          horoscopeUrl,
      },
    ],
  };

  ////////////////////////////////////////////////////////////
  // FINAL EXPERIENCE DATA
  //
  // IMPORTANT DEMO STEP
  //
  // Keep all CMS horoscope content.
  //
  // Temporarily replace only the Zodiac Master object with
  // DEMO_ZODIAC_MASTER.
  //
  // Therefore:
  //
  // experienceData.hero
  // experienceData.identity
  // experienceData.traits
  // experienceData.editorial
  // etc.
  //
  // remain from CMS.
  //
  // BUT:
  //
  // experienceData.zodiac
  //
  // comes from the temporary demo.
  //
  ////////////////////////////////////////////////////////////

  const experienceData = {

    ...cms,

    zodiac:
      DEMO_ZODIAC_MASTER,
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

      {/* =====================================================
          HOROSCOPE SCHEMA
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            serializeJsonLd(
              horoscopeSchema
            ),
        }}
      />

      {/* =====================================================
          BREADCRUMB SCHEMA
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            serializeJsonLd(
              breadcrumbSchema
            ),
        }}
      />

      {/* =====================================================
          EXISTING HOROSCOPE EXPERIENCE
      ===================================================== */}

      <CmsHoroscopeExperience

        data={
          experienceData
        }

        currentSign={
          normalizedSign
        }

        slug={
          cms.slug ||
          normalizedSign
        }

      />

    </main>
  );
}