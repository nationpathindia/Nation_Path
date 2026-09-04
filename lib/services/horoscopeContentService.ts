//////////////////////////////////////////////////////////////
//
// NATIONPATH HOROSCOPE CONTENT SERVICE
//
// FINAL LOCKED VERSION
//
// CMS FIRST CONTENT DELIVERY LAYER
//
// Mongo Horoscope CMS
//        ↓
// Horoscope Content Service
//        ↓
// Horoscope API
//        ↓
// Premium Horoscope UI
//
// ZODIAC MASTER
//
// Mongo Zodiac Collection
//        ↓
// Published Zodiac Master Records
//        ↓
// Normalized Zodiac Master
//        ↓
// Current Zodiac Master
//        ↓
// 12-sign Zodiac Explorer
//        ↓
// Horoscope CMS Response
//
// LOCKED:
//
// ✅ CMS ONLY
// ✅ Zodiac Master ONLY for zodiac identity
// ✅ No Swiss Ephemeris
// ✅ No calculation
// ✅ No prediction engine
// ✅ No AI generation
// ✅ Name initials ONLY from Mongo Zodiac Master
//
// IMPORTANT:
//
// This service is ONLY a content delivery / normalization layer.
//
// It does NOT:
// - calculate astrology
// - calculate zodiac
// - generate predictions
// - generate name initials
// - derive Vedic syllables
//
//////////////////////////////////////////////////////////////

import Horoscope from "@/app/models/Horoscope";
import Zodiac from "@/app/models/Zodiac";

import { connectMongoDB } from "@/lib/mongodb";

import type {
  CmsHoroscopeData,
  CmsHoroscopeMeta,
  CmsHoroscopeResponse,
  CmsZodiacItem,
  CmsZodiacMaster,
  HoroscopeLanguage,
  HoroscopePeriod,
} from "@/components/astro-new/horoscope-cms/types";

//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

type DateInput = Date | string;

type ZodiacMasterDocument = Record<string, any>;

//////////////////////////////////////////////////////////////
// ZODIAC ORDER
//////////////////////////////////////////////////////////////

const ZODIAC_ORDER = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
] as const;

//////////////////////////////////////////////////////////////
// SERVICE DEBUG
//////////////////////////////////////////////////////////////

console.log(
  "🔥 NATIONPATH HOROSCOPE CONTENT SERVICE ACTIVE",
  {
    service:
      "lib/services/horoscopeContentService",

    version:
      "ZODIAC-MASTER-ALIGNED-MEDIA-2026-08-29",

    architecture:
      "CMS-FIRST",

    horoscopeSource:
      "MongoDB Horoscope CMS",

    zodiacSource:
      "MongoDB Zodiac Master",

    nameInitialsSource:
      "MongoDB Zodiac Master.nameInitials",

    mediaSource:
      "MongoDB Zodiac Master.media",

    calculation:
      false,

    predictionEngine:
      false,

    aiGeneration:
      false,
  }
);

//////////////////////////////////////////////////////////////
// NORMALIZE TEXT
//////////////////////////////////////////////////////////////

function normalizeText(
  value: unknown
): string {
  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  return String(value).trim();
}

//////////////////////////////////////////////////////////////
// NORMALIZE ZODIAC
//////////////////////////////////////////////////////////////

function normalizeZodiac(
  value: unknown
): string {
  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  return String(value)
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "")
    .replace(/\s+/g, "-")
    .replace(/_+/g, "-");
}

//////////////////////////////////////////////////////////////
// VALID ZODIAC
//////////////////////////////////////////////////////////////

function isValidZodiac(
  value: unknown
): boolean {
  const normalized =
    normalizeZodiac(value);

  return (
    ZODIAC_ORDER as readonly string[]
  ).includes(normalized);
}

//////////////////////////////////////////////////////////////
// SAFE DATE
//////////////////////////////////////////////////////////////

function normalizeDate(
  date?: DateInput
): Date {
  if (!date) {
    return new Date();
  }

  const parsed =
    date instanceof Date
      ? date
      : new Date(date);

  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    return new Date();
  }

  return parsed;
}

//////////////////////////////////////////////////////////////
// ZODIAC MASTER IDENTITY
//////////////////////////////////////////////////////////////

function getZodiacIdentity(
  record: ZodiacMasterDocument
): string {
  const candidates = [
    record?.zodiac,
    record?.slug,
    record?.names?.english,
  ];

  for (
    const candidate of candidates
  ) {
    const normalized =
      normalizeZodiac(candidate);

    if (
      isValidZodiac(normalized)
    ) {
      return normalized;
    }
  }

  return "";
}

//////////////////////////////////////////////////////////////
// ZODIAC ORDER
//////////////////////////////////////////////////////////////

function getZodiacOrder(
  zodiac?: string
): number {
  const normalized =
    normalizeZodiac(zodiac);

  const index =
    ZODIAC_ORDER.indexOf(
      normalized as
        (typeof ZODIAC_ORDER)[number]
    );

  return index >= 0
    ? index
    : 999;
}

//////////////////////////////////////////////////////////////
// NAME INITIALS
//
// CANONICAL SOURCE:
//
// MongoDB Zodiac Master
//
// TOP LEVEL:
//
// record.nameInitials
//
// IMPORTANT:
//
// ❌ No identity.nameInitials
// ❌ No calculation
// ❌ No generation
// ❌ No hardcoded syllables
//
//////////////////////////////////////////////////////////////

function getNameInitials(
  record: ZodiacMasterDocument
): string[] {
  const raw =
    record?.nameInitials;

  if (
    !Array.isArray(raw)
  ) {
    console.warn(
      "[NATIONPATH NAME INITIALS MISSING]",
      {
        zodiac:
          record?.zodiac,

        slug:
          record?.slug,

        value:
          raw,

        recordKeys:
          Object.keys(
            record || {}
          ),
      }
    );

    return [];
  }

  const normalized =
    raw
      .filter(
        (
          item: unknown
        ): item is string =>
          typeof item === "string"
      )
      .map(
        (
          item: string
        ) =>
          item.trim()
      )
      .filter(Boolean);

  console.log(
    "[NATIONPATH NAME INITIALS]",
    {
      zodiac:
        record?.zodiac,

      count:
        normalized.length,

      nameInitials:
        normalized,

      source:
        "MongoDB Zodiac Master.nameInitials",
    }
  );

  return normalized;
}

//////////////////////////////////////////////////////////////
// ZODIAC SYMBOL
//
// Canonical:
//
// symbol
//
// Compatibility fallback:
//
// media.icon
//
//////////////////////////////////////////////////////////////

function getZodiacSymbol(
  record: ZodiacMasterDocument
): string {
  return (
    normalizeText(
      record?.symbol
    ) ||
    normalizeText(
      record?.media?.icon
    ) ||
    normalizeText(
      record?.image
    )
  );
}

//////////////////////////////////////////////////////////////
// MEDIA
//////////////////////////////////////////////////////////////

function getZodiacMedia(
  record: ZodiacMasterDocument
) {
  const icon =
    normalizeText(
      record?.media?.icon
    ) ||
    normalizeText(
      record?.symbol
    ) ||
    normalizeText(
      record?.image
    );

  const banner =
    normalizeText(
      record?.media?.banner
    );

  const media = {
    icon:
      icon ||
      undefined,

    banner:
      banner ||
      undefined,
  };

  console.log(
    "[NATIONPATH ZODIAC MASTER MEDIA NORMALIZED]",
    {
      zodiac:
        record?.zodiac,

      rawMedia:
        record?.media,

      rawSymbol:
        record?.symbol,

      rawImage:
        record?.image,

      normalizedMedia:
        media,
    }
  );

  return media;
}

//////////////////////////////////////////////////////////////
// MAP ONE ZODIAC MASTER
//////////////////////////////////////////////////////////////

function mapZodiacMaster(
  record: ZodiacMasterDocument
): CmsZodiacMaster | null {
  ////////////////////////////////////////////////////////////
  // ZODIAC
  ////////////////////////////////////////////////////////////

  const zodiac =
    getZodiacIdentity(record);

  if (!zodiac) {
    console.warn(
      "[NATIONPATH ZODIAC MASTER SKIPPED]",
      {
        zodiac:
          record?.zodiac,

        slug:
          record?.slug,

        english:
          record?.names?.english,

        status:
          record?.status,
      }
    );

    return null;
  }

  ////////////////////////////////////////////////////////////
  // SLUG
  ////////////////////////////////////////////////////////////

  const slug =
    normalizeZodiac(
      record?.slug
    ) || zodiac;

  ////////////////////////////////////////////////////////////
  // NAMES
  ////////////////////////////////////////////////////////////

  const englishName =
    normalizeText(
      record?.names?.english
    );

  const hindiName =
    normalizeText(
      record?.names?.hindi
    );

  const sanskritName =
    normalizeText(
      record?.names?.sanskrit
    );

  ////////////////////////////////////////////////////////////
  // IDENTITY
  ////////////////////////////////////////////////////////////

  const rashi =
    normalizeText(
      record?.identity?.rashi
    );

  const identitySanskritName =
    normalizeText(
      record?.identity?.sanskritName
    );

  const dates =
    normalizeText(
      record?.identity?.dates
    );

  const description =
    normalizeText(
      record?.identity?.description
    );

  const identityEnergy =
    normalizeText(
      record?.identity?.energy
    );

  ////////////////////////////////////////////////////////////
  // NAME INITIALS
  ////////////////////////////////////////////////////////////

  const nameInitials =
    getNameInitials(record);

  ////////////////////////////////////////////////////////////
  // ASTRO INFO
  ////////////////////////////////////////////////////////////

  const element =
    normalizeText(
      record?.element
    );

  const rulingPlanet =
    normalizeText(
      record?.rulingPlanet
    );

  ////////////////////////////////////////////////////////////
  // SYMBOL
  ////////////////////////////////////////////////////////////

  const symbol =
    getZodiacSymbol(record);

  ////////////////////////////////////////////////////////////
  // MEDIA
  ////////////////////////////////////////////////////////////

  const media =
    getZodiacMedia(record);

  ////////////////////////////////////////////////////////////
  // TRAITS
  ////////////////////////////////////////////////////////////

  const strengths =
    Array.isArray(
      record?.traits?.strengths
    )
      ? record.traits.strengths
          .filter(
            (
              item: unknown
            ): item is string =>
              typeof item === "string"
          )
          .map(
            (
              item: string
            ) =>
              item.trim()
          )
          .filter(Boolean)
      : [];

  const weaknesses =
    Array.isArray(
      record?.traits?.weaknesses
    )
      ? record.traits.weaknesses
          .filter(
            (
              item: unknown
            ): item is string =>
              typeof item === "string"
          )
          .map(
            (
              item: string
            ) =>
              item.trim()
          )
          .filter(Boolean)
      : [];

  const personality =
    normalizeText(
      record?.traits?.personality
    );

  ////////////////////////////////////////////////////////////
  // LUCK
  ////////////////////////////////////////////////////////////

  const luckyColor =
    normalizeText(
      record?.lucky?.color
    );

  const luckyNumber =
    normalizeText(
      record?.lucky?.number
    );

  const luckyDay =
    normalizeText(
      record?.lucky?.day
    );

  ////////////////////////////////////////////////////////////
  // SEO
  ////////////////////////////////////////////////////////////

  const seoTitle =
    normalizeText(
      record?.seo?.title
    );

  const seoDescription =
    normalizeText(
      record?.seo?.description
    );

  ////////////////////////////////////////////////////////////
  // NORMALIZED MASTER
  //
  // IMPORTANT:
  //
  // Only fields belonging to CmsZodiacMaster
  // are returned here.
  //
  // Do NOT add:
  // - image
  // - name
  // - planet
  // - energy
  //
  // unless they are explicitly added to the
  // canonical CmsZodiacMaster type.
  //
  ////////////////////////////////////////////////////////////

  const normalized = {
    //////////////////////////////////////////////////////////
    // IDENTIFIERS
    //////////////////////////////////////////////////////////

    zodiac,

    slug,

    //////////////////////////////////////////////////////////
    // NAMES
    //////////////////////////////////////////////////////////

    names: {
      english:
        englishName ||
        undefined,

      hindi:
        hindiName ||
        undefined,

      sanskrit:
        sanskritName ||
        undefined,
    },

    //////////////////////////////////////////////////////////
    // IDENTITY
    //////////////////////////////////////////////////////////

    identity: {
      rashi:
        rashi ||
        undefined,

      sanskritName:
        identitySanskritName ||
        undefined,

      dates:
        dates ||
        undefined,

      description:
        description ||
        undefined,

      energy:
        identityEnergy ||
        undefined,
    },

    //////////////////////////////////////////////////////////
    // NAME INITIALS
    //
    // ⭐ TOP LEVEL
    // ⭐ DIRECT MONGO COPY
    //////////////////////////////////////////////////////////

    nameInitials,

    //////////////////////////////////////////////////////////
    // ASTRO INFO
    //////////////////////////////////////////////////////////

    element:
      element ||
      undefined,

    rulingPlanet:
      rulingPlanet ||
      undefined,

    //////////////////////////////////////////////////////////
    // TRAITS
    //////////////////////////////////////////////////////////

    traits: {
      strengths,

      weaknesses,

      personality:
        personality ||
        undefined,
    },

    //////////////////////////////////////////////////////////
    // LUCK
    //////////////////////////////////////////////////////////

    lucky: {
      color:
        luckyColor ||
        undefined,

      number:
        luckyNumber ||
        undefined,

      day:
        luckyDay ||
        undefined,
    },

    //////////////////////////////////////////////////////////
    // MEDIA
    //////////////////////////////////////////////////////////

    media,

    //////////////////////////////////////////////////////////
    // SEO
    //////////////////////////////////////////////////////////

    seo: {
      title:
        seoTitle ||
        undefined,

      description:
        seoDescription ||
        undefined,
    },

    //////////////////////////////////////////////////////////
    // SYMBOL
    //////////////////////////////////////////////////////////

    symbol:
      symbol ||
      media.icon ||
      undefined,
  } as CmsZodiacMaster;

  ////////////////////////////////////////////////////////////
  // FINAL NORMALIZED MASTER DEBUG
  ////////////////////////////////////////////////////////////

  console.log(
    "[NATIONPATH ZODIAC MASTER FINAL NORMALIZED]",
    {
      zodiac:
        normalized.zodiac,

      slug:
        normalized.slug,

      names:
        normalized.names,

      identity:
        normalized.identity,

      nameInitials:
        normalized.nameInitials,

      nameInitialsCount:
        normalized.nameInitials.length,

      element:
        normalized.element,

      rulingPlanet:
        normalized.rulingPlanet,

      symbol:
        normalized.symbol,

      media:
        normalized.media,

      mediaIcon:
        normalized.media?.icon,

      mediaBanner:
        normalized.media?.banner,

      source:
        "MongoDB Zodiac Master",
    }
  );

  ////////////////////////////////////////////////////////////
  // PIPELINE DEBUG
  ////////////////////////////////////////////////////////////

  console.log(
    "[NATIONPATH INITIALS PIPELINE]",
    {
      zodiac:
        normalized.zodiac,

      mongoNameInitials:
        record?.nameInitials,

      normalizedNameInitials:
        normalized.nameInitials,

      count:
        normalized.nameInitials.length,

      source:
        "MongoDB Zodiac Master.nameInitials",
    }
  );

  return normalized;
}

//////////////////////////////////////////////////////////////
// NORMALIZE ALL ZODIAC MASTER RECORDS
//////////////////////////////////////////////////////////////

function normalizeZodiacMasterRecords(
  records: ZodiacMasterDocument[]
): CmsZodiacMaster[] {
  const normalized =
    records
      .map(
        (
          record: ZodiacMasterDocument
        ) =>
          mapZodiacMaster(record)
      )
      .filter(
        (
          item
        ): item is CmsZodiacMaster =>
          Boolean(item)
      )
      .sort(
        (
          a: CmsZodiacMaster,
          b: CmsZodiacMaster
        ) =>
          getZodiacOrder(
            a.zodiac
          ) -
          getZodiacOrder(
            b.zodiac
          )
      );

  console.log(
    "[NATIONPATH ZODIAC MASTER NORMALIZED]",
    {
      total:
        normalized.length,

      records:
        normalized.map(
          (
            item: CmsZodiacMaster
          ) => ({
            zodiac:
              item.zodiac,

            slug:
              item.slug,

            english:
              item.names?.english,

            hindi:
              item.names?.hindi,

            sanskrit:
              item.names?.sanskrit,

            rashi:
              item.identity?.rashi,

            dates:
              item.identity?.dates,

            energy:
              item.identity?.energy,

            nameInitials:
              item.nameInitials,

            nameInitialsCount:
              Array.isArray(
                item.nameInitials
              )
                ? item.nameInitials.length
                : 0,

            element:
              item.element,

            rulingPlanet:
              item.rulingPlanet,

            symbol:
              item.symbol,

            media:
              item.media,
          })
        ),
    }
  );

  return normalized;
}

//////////////////////////////////////////////////////////////
// RESOLVE CURRENT ZODIAC MASTER
//////////////////////////////////////////////////////////////

function resolveCurrentZodiacMaster(
  requestedZodiac: string,
  masters: CmsZodiacMaster[]
): CmsZodiacMaster | null {
  const requested =
    normalizeZodiac(
      requestedZodiac
    );

  if (
    !requested ||
    !isValidZodiac(requested)
  ) {
    return null;
  }

  ////////////////////////////////////////////////////////////
  // DIRECT MATCH
  ////////////////////////////////////////////////////////////

  const directMatch =
    masters.find(
      (
        item: CmsZodiacMaster
      ) =>
        normalizeZodiac(
          item.zodiac
        ) === requested
    ) || null;

  if (directMatch) {
    console.log(
      "[NATIONPATH CURRENT ZODIAC MATCH]",
      {
        requested,

        matched:
          directMatch.zodiac,

        english:
          directMatch.names?.english,

        hindi:
          directMatch.names?.hindi,

        sanskrit:
          directMatch.names?.sanskrit,

        nameInitials:
          directMatch.nameInitials,

        nameInitialsCount:
          Array.isArray(
            directMatch.nameInitials
          )
            ? directMatch.nameInitials.length
            : 0,

        element:
          directMatch.element,

        rulingPlanet:
          directMatch.rulingPlanet,

        symbol:
          directMatch.symbol,

        media:
          directMatch.media,

        mediaIcon:
          directMatch.media?.icon,
      }
    );

    return directMatch;
  }

  ////////////////////////////////////////////////////////////
  // SLUG MATCH
  ////////////////////////////////////////////////////////////

  const slugMatch =
    masters.find(
      (
        item: CmsZodiacMaster
      ) =>
        normalizeZodiac(
          item.slug
        ) === requested
    ) || null;

  if (slugMatch) {
    console.log(
      "[NATIONPATH CURRENT ZODIAC SLUG MATCH]",
      {
        requested,

        matched:
          slugMatch.zodiac,

        slug:
          slugMatch.slug,

        nameInitials:
          slugMatch.nameInitials,

        nameInitialsCount:
          Array.isArray(
            slugMatch.nameInitials
          )
            ? slugMatch.nameInitials.length
            : 0,

        media:
          slugMatch.media,

        mediaIcon:
          slugMatch.media?.icon,
      }
    );

    return slugMatch;
  }

  ////////////////////////////////////////////////////////////
  // NOT FOUND
  ////////////////////////////////////////////////////////////

  console.warn(
    "[NATIONPATH CURRENT ZODIAC MASTER NOT FOUND]",
    {
      requested,

      available:
        masters.map(
          (
            item: CmsZodiacMaster
          ) => ({
            zodiac:
              item.zodiac,

            slug:
              item.slug,
          })
        ),
    }
  );

  return null;
}

//////////////////////////////////////////////////////////////
// MAP 12-SIGN ZODIAC EXPLORER
//////////////////////////////////////////////////////////////

function mapZodiacExplorer(
  masters: CmsZodiacMaster[]
): CmsZodiacItem[] {
  return masters.map(
    (
      master: CmsZodiacMaster
    ): CmsZodiacItem => {
      const nameInitials =
        Array.isArray(
          master.nameInitials
        )
          ? [
              ...master.nameInitials,
            ]
          : [];

      const mediaIcon =
        master.media?.icon ||
        master.symbol ||
        "";

      console.log(
        "[NATIONPATH ZODIAC EXPLORER ITEM]",
        {
          zodiac:
            master.zodiac,

          english:
            master.names?.english,

          nameInitials,

          nameInitialsCount:
            nameInitials.length,

          media:
            master.media,

          mediaIcon,

          source:
            "MongoDB Zodiac Master",
        }
      );

      return {
        ////////////////////////////////////////////////////////
        // IDENTIFIERS
        ////////////////////////////////////////////////////////

        zodiac:
          master.zodiac || "",

        slug:
          master.slug || "",

        ////////////////////////////////////////////////////////
        // NAMES
        ////////////////////////////////////////////////////////

        name:
          master.names?.english ||
          master.zodiac ||
          "",

        english:
          master.names?.english,

        hindi:
          master.names?.hindi,

        sanskrit:
          master.names?.sanskrit,

        ////////////////////////////////////////////////////////
        // MEDIA
        ////////////////////////////////////////////////////////

        image:
          mediaIcon,

        symbol:
          master.symbol ||
          mediaIcon ||
          "",

        ////////////////////////////////////////////////////////
        // ASTRO IDENTITY
        ////////////////////////////////////////////////////////

        planet:
          master.rulingPlanet ||
          "",

        energy:
          master.identity?.energy ||
          "",

        element:
          master.element ||
          "",

        ////////////////////////////////////////////////////////
        // NAME INITIALS
        ////////////////////////////////////////////////////////

        nameInitials,

        ////////////////////////////////////////////////////////
        // STATE
        ////////////////////////////////////////////////////////

        active:
          true,
      } as CmsZodiacItem;
    }
  );
}

//////////////////////////////////////////////////////////////
// GET PUBLISHED ZODIAC MASTER RECORDS
//////////////////////////////////////////////////////////////

async function getPublishedZodiacRecords(): Promise<
  ZodiacMasterDocument[]
> {
  const rawResult =
    await Zodiac.collection
      .find(
        {
          status:
            "published",
        },
        {
          projection: {
            //////////////////////////////////////////////////
            // BASIC
            //////////////////////////////////////////////////

            zodiac: 1,
            slug: 1,

            //////////////////////////////////////////////////
            // NAMES
            //////////////////////////////////////////////////

            names: 1,

            //////////////////////////////////////////////////
            // IDENTITY
            //////////////////////////////////////////////////

            identity: 1,

            //////////////////////////////////////////////////
            // NAME INITIALS
            //////////////////////////////////////////////////

            nameInitials: 1,

            //////////////////////////////////////////////////
            // ASTRO INFO
            //////////////////////////////////////////////////

            symbol: 1,
            image: 1,
            element: 1,
            rulingPlanet: 1,

            //////////////////////////////////////////////////
            // PERSONALITY
            //////////////////////////////////////////////////

            traits: 1,

            //////////////////////////////////////////////////
            // LUCK
            //////////////////////////////////////////////////

            lucky: 1,

            //////////////////////////////////////////////////
            // MEDIA
            //////////////////////////////////////////////////

            media: 1,

            //////////////////////////////////////////////////
            // SEO
            //////////////////////////////////////////////////

            seo: 1,

            //////////////////////////////////////////////////
            // STATUS
            //////////////////////////////////////////////////

            status: 1,
          },
        }
      )
      .toArray();

  const records =
    Array.isArray(rawResult)
      ? (
          rawResult as
            ZodiacMasterDocument[]
        )
      : [];

  console.log(
    "[NATIONPATH GET PUBLISHED ZODIAC RECORDS]",
    {
      total:
        records.length,
    }
  );

  ////////////////////////////////////////////////////////////
  // RAW ARIES CHECK
  ////////////////////////////////////////////////////////////

  const ariesRaw =
    records.find(
      (
        record: ZodiacMasterDocument
      ) =>
        normalizeZodiac(
          record?.zodiac
        ) === "aries" ||
        normalizeZodiac(
          record?.slug
        ) === "aries"
    );

  console.log(
    "[NATIONPATH ZODIAC RAW ARIES DOCUMENT]",
    {
      zodiac:
        ariesRaw?.zodiac,

      slug:
        ariesRaw?.slug,

      nameInitials:
        ariesRaw?.nameInitials,

      nameInitialsCount:
        Array.isArray(
          ariesRaw?.nameInitials
        )
          ? ariesRaw.nameInitials.length
          : 0,

      symbol:
        ariesRaw?.symbol,

      image:
        ariesRaw?.image,

      element:
        ariesRaw?.element,

      rulingPlanet:
        ariesRaw?.rulingPlanet,

      media:
        ariesRaw?.media,

      mediaIcon:
        ariesRaw?.media?.icon,

      mediaBanner:
        ariesRaw?.media?.banner,

      keys:
        ariesRaw
          ? Object.keys(
              ariesRaw
            )
          : [],
    }
  );

  ////////////////////////////////////////////////////////////
  // VALID MASTER RECORDS
  ////////////////////////////////////////////////////////////

  const validRecords =
    records.filter(
      (
        record: ZodiacMasterDocument
      ) => {
        const identity =
          getZodiacIdentity(
            record
          );

        return isValidZodiac(
          identity
        );
      }
    );

  ////////////////////////////////////////////////////////////
  // RAW MASTER SUMMARY
  ////////////////////////////////////////////////////////////

  console.log(
    "[NATIONPATH ZODIAC MASTER RAW]",
    {
      total:
        records.length,

      valid:
        validRecords.length,

      records:
        validRecords.map(
          (
            record: ZodiacMasterDocument
          ) => ({
            zodiac:
              record?.zodiac,

            slug:
              record?.slug,

            english:
              record?.names?.english,

            hindi:
              record?.names?.hindi,

            sanskrit:
              record?.names?.sanskrit,

            rashi:
              record?.identity?.rashi,

            status:
              record?.status,

            nameInitials:
              record?.nameInitials,

            nameInitialsCount:
              Array.isArray(
                record?.nameInitials
              )
                ? record.nameInitials.length
                : 0,

            element:
              record?.element,

            rulingPlanet:
              record?.rulingPlanet,

            symbol:
              record?.symbol,

            image:
              record?.image,

            media:
              record?.media,

            mediaIcon:
              record?.media?.icon,

            mediaBanner:
              record?.media?.banner,
          })
        ),
    }
  );

  return validRecords;
}

//////////////////////////////////////////////////////////////
// CMS META
//////////////////////////////////////////////////////////////

function buildMeta(
  content: any
): CmsHoroscopeMeta {
  return {
    period:
      content?.meta?.period,

    language:
      content?.meta?.language,

    status:
      content?.meta?.status,

    startDate:
      content?.meta?.startDate,

    endDate:
      content?.meta?.endDate,

    slugDate:
      content?.meta?.slugDate,

    publishedAt:
      content?.meta?.publishedAt,

    scheduledAt:
      content?.meta?.scheduledAt,

    archivedAt:
      content?.meta?.archivedAt,

    version:
      content?.meta?.version,

    contentVersion:
      content?.meta?.contentVersion,

    priority:
      content?.meta?.priority,

    featured:
      content?.meta?.featured,

    visibility:
      content?.meta?.visibility,
  };
}

//////////////////////////////////////////////////////////////
// BUILD HOROSCOPE DATA
//////////////////////////////////////////////////////////////

function buildHoroscopeData(
  content: any,
  zodiacMaster:
    CmsZodiacMaster | null,
  zodiacList:
    CmsZodiacItem[]
): CmsHoroscopeData {
  return {
    //////////////////////////////////////////////////////////
    // META
    //////////////////////////////////////////////////////////

    meta:
      buildMeta(content),

    //////////////////////////////////////////////////////////
    // CURRENT ZODIAC MASTER
    //////////////////////////////////////////////////////////

    zodiac:
      zodiacMaster,

    //////////////////////////////////////////////////////////
    // BASIC CMS FIELDS
    //////////////////////////////////////////////////////////

    slug:
      content?.slug,

    symbol:
      content?.symbol,

    element:
      content?.element,

    rulingPlanet:
      content?.rulingPlanet,

    //////////////////////////////////////////////////////////
    // HOROSCOPE CONTENT
    //////////////////////////////////////////////////////////

    hero:
      content?.hero,

    identity:
      content?.identity,

    traits:
      content?.traits,

    editorial:
      content?.editorial,

    life:
      content?.life,

    insights:
      content?.insights,

    planets:
      Array.isArray(
        content?.planets
      )
        ? content.planets
        : [],

    //////////////////////////////////////////////////////////
    // OTHER CMS MODULES
    //////////////////////////////////////////////////////////

    lucky:
      content?.lucky,

    remedy:
      content?.remedy,

    vedic:
      content?.vedic,

    compatibility:
      content?.compatibility,

    premium:
      content?.premium,

    //////////////////////////////////////////////////////////
    // SEO
    //////////////////////////////////////////////////////////

    seo:
      content?.seo,

    //////////////////////////////////////////////////////////
    // MEDIA
    //////////////////////////////////////////////////////////

    media:
      content?.media,

    //////////////////////////////////////////////////////////
    // ANALYTICS
    //////////////////////////////////////////////////////////

    analytics:
      content?.analytics,

    //////////////////////////////////////////////////////////
    // ZODIAC EXPLORER
    //////////////////////////////////////////////////////////

    zodiacList,

    //////////////////////////////////////////////////////////
    // LANGUAGE
    //////////////////////////////////////////////////////////

    language:
      content?.language ||
      content?.meta?.language,
  };
}

//////////////////////////////////////////////////////////////
// RESOLVE HOROSCOPE ZODIAC
//////////////////////////////////////////////////////////////

function resolveHoroscopeZodiac(
  content: any,
  requestedZodiac?: string
): string {
  ////////////////////////////////////////////////////////////
  // ROUTE
  ////////////////////////////////////////////////////////////

  const explicitZodiac =
    normalizeZodiac(
      requestedZodiac
    );

  if (
    isValidZodiac(
      explicitZodiac
    )
  ) {
    return explicitZodiac;
  }

  ////////////////////////////////////////////////////////////
  // CONTENT ZODIAC
  ////////////////////////////////////////////////////////////

  const contentZodiac =
    normalizeZodiac(
      content?.zodiac
    );

  if (
    isValidZodiac(
      contentZodiac
    )
  ) {
    return contentZodiac;
  }

  ////////////////////////////////////////////////////////////
  // CONTENT SLUG
  ////////////////////////////////////////////////////////////

  const contentSlug =
    normalizeZodiac(
      content?.slug
    );

  if (
    isValidZodiac(
      contentSlug
    )
  ) {
    return contentSlug;
  }

  return "";
}

//////////////////////////////////////////////////////////////
// BUILD DATA FROM CMS CONTENT
//////////////////////////////////////////////////////////////

async function buildHoroscopeDataFromContent(
  content: any,
  requestedZodiac?: string
): Promise<CmsHoroscopeData> {
  ////////////////////////////////////////////////////////////
  // REQUEST INFORMATION
  ////////////////////////////////////////////////////////////

  const explicitZodiac =
    normalizeZodiac(
      requestedZodiac
    );

  const contentZodiac =
    normalizeZodiac(
      content?.zodiac
    );

  const contentSlug =
    normalizeZodiac(
      content?.slug
    );

  const zodiac =
    resolveHoroscopeZodiac(
      content,
      requestedZodiac
    );

  ////////////////////////////////////////////////////////////
  // LOAD ZODIAC MASTER
  ////////////////////////////////////////////////////////////

  const zodiacRecords =
    await getPublishedZodiacRecords();

  ////////////////////////////////////////////////////////////
  // NORMALIZE MASTER ONCE
  ////////////////////////////////////////////////////////////

  const zodiacMasters =
    normalizeZodiacMasterRecords(
      zodiacRecords
    );

  ////////////////////////////////////////////////////////////
  // SAME MASTER ARRAY → EXPLORER
  ////////////////////////////////////////////////////////////

  const zodiacList =
    mapZodiacExplorer(
      zodiacMasters
    );

  ////////////////////////////////////////////////////////////
  // SAME MASTER ARRAY → CURRENT ZODIAC
  ////////////////////////////////////////////////////////////

  const zodiacMaster =
    resolveCurrentZodiacMaster(
      zodiac,
      zodiacMasters
    );

  ////////////////////////////////////////////////////////////
  // FINAL MASTER VALIDATION
  ////////////////////////////////////////////////////////////

  console.log(
    "[NATIONPATH FINAL RASHI MASTER]",
    {
      zodiac,

      hasCurrentMaster:
        Boolean(
          zodiacMaster
        ),

      currentMaster:
        zodiacMaster
          ? {
              zodiac:
                zodiacMaster.zodiac,

              slug:
                zodiacMaster.slug,

              english:
                zodiacMaster.names?.english,

              hindi:
                zodiacMaster.names?.hindi,

              sanskrit:
                zodiacMaster.names?.sanskrit,

              rashi:
                zodiacMaster.identity?.rashi,

              dates:
                zodiacMaster.identity?.dates,

              energy:
                zodiacMaster.identity?.energy,

              nameInitials:
                zodiacMaster.nameInitials,

              nameInitialsCount:
                Array.isArray(
                  zodiacMaster.nameInitials
                )
                  ? zodiacMaster.nameInitials.length
                  : 0,

              element:
                zodiacMaster.element,

              rulingPlanet:
                zodiacMaster.rulingPlanet,

              symbol:
                zodiacMaster.symbol,

              media:
                zodiacMaster.media,

              mediaIcon:
                zodiacMaster.media?.icon,

              mediaBanner:
                zodiacMaster.media?.banner,
            }
          : null,

      explorerCount:
        zodiacList.length,
    }
  );

  ////////////////////////////////////////////////////////////
  // FINAL RESOLUTION
  ////////////////////////////////////////////////////////////

  console.log(
    "[NATIONPATH HOROSCOPE ZODIAC RESOLUTION]",
    {
      requestedZodiac,

      explicitZodiac,

      contentZodiac,

      contentSlug,

      resolvedZodiac:
        zodiac,

      hasCurrentMaster:
        Boolean(
          zodiacMaster
        ),

      explorerCount:
        zodiacList.length,
    }
  );

  ////////////////////////////////////////////////////////////
  // FINAL DATA
  ////////////////////////////////////////////////////////////

  return buildHoroscopeData(
    content,
    zodiacMaster,
    zodiacList
  );
}

//////////////////////////////////////////////////////////////
// CMS RESPONSE BUILDER
//////////////////////////////////////////////////////////////

async function buildCMSResponse(
  content: any,
  requestedZodiac?: string
): Promise<CmsHoroscopeResponse> {
  if (!content) {
    return {
      success: false,

      message:
        "Horoscope CMS content not found.",
    };
  }

  const data =
    await buildHoroscopeDataFromContent(
      content,
      requestedZodiac
    );

  return {
    success: true,

    data,

    cms:
      data,
  };
}

//////////////////////////////////////////////////////////////
// CORE HOROSCOPE FETCH
//////////////////////////////////////////////////////////////

export async function getHoroscopeByPeriod(
  zodiacSign: string,
  period: HoroscopePeriod,
  date?: DateInput,
  language: HoroscopeLanguage =
    "english"
): Promise<CmsHoroscopeData | null> {
  try {
    //////////////////////////////////////////////////////////
    // DATABASE
    //////////////////////////////////////////////////////////

    await connectMongoDB();

    //////////////////////////////////////////////////////////
    // NORMALIZE ZODIAC
    //////////////////////////////////////////////////////////

    const zodiac =
      normalizeZodiac(
        zodiacSign
      );

    //////////////////////////////////////////////////////////
    // VALIDATE
    //////////////////////////////////////////////////////////

    if (
      !isValidZodiac(
        zodiac
      )
    ) {
      console.warn(
        "[HOROSCOPE_INVALID_ZODIAC]",
        {
          zodiacSign,
          zodiac,
        }
      );

      return null;
    }

    //////////////////////////////////////////////////////////
    // DATE
    //////////////////////////////////////////////////////////

    const selectedDate =
      normalizeDate(date);

    //////////////////////////////////////////////////////////
    // CMS CONTENT
    //////////////////////////////////////////////////////////

    const content =
      await Horoscope.findOne({
        zodiac,

        "meta.period":
          period,

        "meta.language":
          language,

        "meta.status":
          "published",

        "meta.startDate": {
          $lte:
            selectedDate,
        },

        "meta.endDate": {
          $gte:
            selectedDate,
        },
      })
        .sort({
          "meta.priority":
            -1,

          "meta.publishedAt":
            -1,
        })
        .lean();

    //////////////////////////////////////////////////////////
    // NOT FOUND
    //////////////////////////////////////////////////////////

    if (!content) {
      console.warn(
        "[HOROSCOPE_CONTENT_NOT_FOUND]",
        {
          zodiac,

          period,

          language,

          date:
            selectedDate,
        }
      );

      return null;
    }

    //////////////////////////////////////////////////////////
    // BUILD
    //////////////////////////////////////////////////////////

    return await buildHoroscopeDataFromContent(
      content,
      zodiac
    );
  } catch (error) {
    console.error(
      "[HOROSCOPE_CONTENT_SERVICE_ERROR]",
      error
    );

    return null;
  }
}

//////////////////////////////////////////////////////////////
// ARCHIVED HOROSCOPE
//////////////////////////////////////////////////////////////

export async function getArchivedHoroscope(
  zodiacSign: string,
  date: DateInput,
  period: HoroscopePeriod =
    "daily",
  language: HoroscopeLanguage =
    "english"
): Promise<CmsHoroscopeData | null> {
  try {
    await connectMongoDB();

    const zodiac =
      normalizeZodiac(
        zodiacSign
      );

    if (
      !isValidZodiac(
        zodiac
      )
    ) {
      console.warn(
        "[ARCHIVED_HOROSCOPE_INVALID_ZODIAC]",
        {
          zodiacSign,
          zodiac,
        }
      );

      return null;
    }

    const selectedDate =
      normalizeDate(date);

    const content =
      await Horoscope.findOne({
        zodiac,

        "meta.period":
          period,

        "meta.language":
          language,

        "meta.status":
          "archived",

        "meta.startDate": {
          $lte:
            selectedDate,
        },

        "meta.endDate": {
          $gte:
            selectedDate,
        },
      })
        .sort({
          "meta.publishedAt":
            -1,

          "meta.archivedAt":
            -1,
        })
        .lean();

    if (!content) {
      console.warn(
        "[ARCHIVED_HOROSCOPE_NOT_FOUND]",
        {
          zodiac,

          period,

          language,

          date:
            selectedDate,
        }
      );

      return null;
    }

    return await buildHoroscopeDataFromContent(
      content,
      zodiac
    );
  } catch (error) {
    console.error(
      "[HOROSCOPE_ARCHIVE_SERVICE_ERROR]",
      error
    );

    return null;
  }
}

//////////////////////////////////////////////////////////////
// HOROSCOPE ARCHIVE DATES
//////////////////////////////////////////////////////////////

export async function getHoroscopeArchiveDates(
  zodiacSign: string,
  period: HoroscopePeriod =
    "daily",
  language: HoroscopeLanguage =
    "english"
) {
  try {
    await connectMongoDB();

    const zodiac =
      normalizeZodiac(
        zodiacSign
      );

    if (
      !isValidZodiac(
        zodiac
      )
    ) {
      console.warn(
        "[HOROSCOPE_ARCHIVE_DATES_INVALID_ZODIAC]",
        {
          zodiacSign,
          zodiac,
        }
      );

      return [];
    }

    const archives =
      await Horoscope.find({
        zodiac,

        "meta.period":
          period,

        "meta.language":
          language,

        "meta.status":
          "archived",
      })
        .select({
          _id: 0,

          "meta.startDate":
            1,

          "meta.endDate":
            1,

          "meta.slugDate":
            1,

          "meta.publishedAt":
            1,

          "meta.archivedAt":
            1,

          "meta.contentVersion":
            1,

          "meta.version":
            1,
        })
        .sort({
          "meta.startDate":
            -1,
        })
        .lean();

    return archives;
  } catch (error) {
    console.error(
      "[HOROSCOPE_ARCHIVE_DATES_ERROR]",
      error
    );

    return [];
  }
}

//////////////////////////////////////////////////////////////
// SHORTCUTS
//////////////////////////////////////////////////////////////

export async function getDailyHoroscopeContent(
  zodiacSign: string,
  date?: DateInput,
  language: HoroscopeLanguage =
    "english"
) {
  return getHoroscopeByPeriod(
    zodiacSign,
    "daily",
    date,
    language
  );
}

//////////////////////////////////////////////////////////////

export async function getWeeklyHoroscopeContent(
  zodiacSign: string,
  date?: DateInput,
  language: HoroscopeLanguage =
    "english"
) {
  return getHoroscopeByPeriod(
    zodiacSign,
    "weekly",
    date,
    language
  );
}

//////////////////////////////////////////////////////////////

export async function getMonthlyHoroscopeContent(
  zodiacSign: string,
  date?: DateInput,
  language: HoroscopeLanguage =
    "english"
) {
  return getHoroscopeByPeriod(
    zodiacSign,
    "monthly",
    date,
    language
  );
}

//////////////////////////////////////////////////////////////

export async function getYearlyHoroscopeContent(
  zodiacSign: string,
  date?: DateInput,
  language: HoroscopeLanguage =
    "english"
) {
  return getHoroscopeByPeriod(
    zodiacSign,
    "yearly",
    date,
    language
  );
}

//////////////////////////////////////////////////////////////
// LEGACY COMPATIBILITY
//////////////////////////////////////////////////////////////

export async function getHoroscopeContent(
  zodiacSign: string,
  language: HoroscopeLanguage =
    "english"
) {
  return getDailyHoroscopeContent(
    zodiacSign,
    new Date(),
    language
  );
}

//////////////////////////////////////////////////////////////
// CMS RESPONSE
//////////////////////////////////////////////////////////////

export async function getHoroscopeCMSResponse(
  zodiacSign: string,
  period: HoroscopePeriod,
  date?: DateInput,
  language: HoroscopeLanguage =
    "english"
): Promise<CmsHoroscopeResponse> {
  try {
    //////////////////////////////////////////////////////////
    // DATABASE
    //////////////////////////////////////////////////////////

    await connectMongoDB();

    //////////////////////////////////////////////////////////
    // NORMALIZE
    //////////////////////////////////////////////////////////

    const zodiac =
      normalizeZodiac(
        zodiacSign
      );

    //////////////////////////////////////////////////////////
    // VALIDATE
    //////////////////////////////////////////////////////////

    if (
      !isValidZodiac(
        zodiac
      )
    ) {
      return {
        success: false,

        message:
          "Invalid zodiac sign.",
      };
    }

    //////////////////////////////////////////////////////////
    // DATE
    //////////////////////////////////////////////////////////

    const selectedDate =
      normalizeDate(date);

    //////////////////////////////////////////////////////////
    // CMS CONTENT
    //////////////////////////////////////////////////////////

    const content =
      await Horoscope.findOne({
        zodiac,

        "meta.period":
          period,

        "meta.language":
          language,

        "meta.status":
          "published",

        "meta.startDate": {
          $lte:
            selectedDate,
        },

        "meta.endDate": {
          $gte:
            selectedDate,
        },
      })
        .sort({
          "meta.priority":
            -1,

          "meta.publishedAt":
            -1,
        })
        .lean();

    //////////////////////////////////////////////////////////
    // NOT FOUND
    //////////////////////////////////////////////////////////

    if (!content) {
      return {
        success: false,

        message:
          "Published horoscope content not found.",
      };
    }

    //////////////////////////////////////////////////////////
    // BUILD RESPONSE
    //////////////////////////////////////////////////////////

    return await buildCMSResponse(
      content,
      zodiac
    );
  } catch (error) {
    console.error(
      "[HOROSCOPE_CMS_RESPONSE_ERROR]",
      error
    );

    return {
      success: false,

      message:
        "Unable to load horoscope CMS content.",
    };
  }
}

