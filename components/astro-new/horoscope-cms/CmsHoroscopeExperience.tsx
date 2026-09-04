"use client";

/*
//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO
//
// DAILY HOROSCOPE EXPERIENCE
//
// CMS FIRST
//
// MongoDB Horoscope CMS
//        ↓
// Horoscope Content Service
//        ↓
// /api/astro/horoscope/cms
//        ↓
// CmsHoroscopeExperience
//        ↓
// Panchang + Daily Horoscope Intelligence
//
// LOCKED:
//
// NO ENGINE
// NO CALCULATION
// NO AI GENERATION
// NO HARDCODED NAME SYLLABLES
//
// UI COMPOSITION ONLY
//////////////////////////////////////////////////////////////
*/

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  BookOpen,
  Compass,
  Heart,
  MoonStar,
  Orbit,
  Sparkles,
  Star,
  Sun,
  WandSparkles,
  Zap,
} from "lucide-react";

import type { CmsHoroscopeData } from "./types";

import PanchangHeroBanner from "./PanchangHeroBanner";

import HoroscopeHero from "./HoroscopeHero";
import HoroscopeEditorial from "./HoroscopeEditorial";
import HoroscopeRashi from "./HoroscopeRashi";
import HoroscopeLifeCards from "./HoroscopeLifeCards";
import HoroscopeIntelligencePanel from "./HoroscopeIntelligencePanel";
import HoroscopePlanetary from "./HoroscopePlanetary";
import ZodiacExplorerPanel from "./ZodiacExplorerPanel";
import HoroscopeLucky from "./HoroscopeLucky";
import HoroscopeRemedy from "./HoroscopeRemedy";
import HoroscopeVedic from "./HoroscopeVedic";
import HoroscopeCompatibility from "./HoroscopeCompatibility";
import HoroscopePremium from "./HoroscopePremium";

/* ============================================================
   TYPES
============================================================ */

interface Props {
  data: CmsHoroscopeData;
  currentSign?: string;
  slug?: string;
}

type HubKey =
  | "hero"
  | "editorial"
  | "rashi"
  | "life"
  | "insights"
  | "planetary"
  | "lucky"
  | "remedy"
  | "vedic"
  | "compatibility";

interface HubItem {
  id: HubKey;
  label: string;
  shortLabel: string;
  icon: ReactNode;
  available: boolean;
}

/* ============================================================
   CMS ZODIAC RECORD
============================================================ */

interface CmsZodiacRecord {
  zodiac?: unknown;
  slug?: unknown;

  name?: unknown;
  english?: unknown;
  hindi?: unknown;
  sanskrit?: unknown;

  element?: unknown;
  nature?: unknown;
  rulingPlanet?: unknown;
  planet?: unknown;
  energy?: unknown;
  dates?: unknown;

  modality?: unknown;

  symbol?: unknown;
  image?: unknown;

  nameInitials?: unknown;
  nameInitial?: unknown;
  initials?: unknown;
  rashiNameInitials?: unknown;
  rashiInitials?: unknown;

  identity?: {
    rashi?: unknown;
    sanskritName?: unknown;
    dates?: unknown;
    description?: unknown;
    energy?: unknown;
    element?: unknown;
    nature?: unknown;
    symbol?: unknown;
    modality?: unknown;

    nameInitials?: unknown;
    nameInitial?: unknown;
    initials?: unknown;
    rashiNameInitials?: unknown;
    rashiInitials?: unknown;

    media?: {
      icon?: unknown;
      banner?: unknown;
      symbol?: unknown;
      image?: unknown;
    };
  };

  names?: {
    english?: unknown;
    hindi?: unknown;
    sanskrit?: unknown;
  };

  media?: {
    icon?: unknown;
    banner?: unknown;
    symbol?: unknown;
    image?: unknown;
  };
}

interface CmsPayloadShape {
  zodiacList?: unknown;

  cms?: {
    zodiac?: unknown;
  };

  zodiac?: unknown;

  identity?: unknown;

  hero?: unknown;
}

/* ============================================================
   HELPERS
============================================================ */

function normalizeSign(value?: unknown): string {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

function stringValue(value?: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function capitalize(value: string): string {
  if (!value) {
    return "";
  }

  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );
}

function normalizeStringArray(
  value: unknown
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is string =>
        typeof item === "string"
    )
    .map((item) => item.trim())
    .filter(Boolean);
}

function asZodiacRecord(
  value: unknown
): CmsZodiacRecord | null {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return null;
  }

  return value as CmsZodiacRecord;
}

/* ============================================================
   CLEAN ZODIAC DISPLAY NAME
============================================================ */

function cleanZodiacDisplayName(
  value?: unknown,
  fallback?: string
): string {
  let result = stringValue(value);

  if (!result) {
    result = stringValue(fallback);
  }

  if (!result) {
    return "";
  }

  result = result
    .replace(
      /\b(daily|weekly|monthly|yearly)\s+horoscope\b/gi,
      ""
    )
    .replace(
      /\bhoroscope\b/gi,
      ""
    )
    .replace(
      /\b(daily|weekly|monthly|yearly)\b/gi,
      ""
    )
    .replace(
      /\.svg\b/gi,
      ""
    )
    .replace(
      /\.png\b/gi,
      ""
    )
    .replace(
      /\.webp\b/gi,
      ""
    )
    .replace(
      /\.jpg\b/gi,
      ""
    )
    .replace(
      /[-_]+/g,
      " "
    )
    .replace(
      /\s+/g,
      " "
    )
    .trim();

  return (
    result ||
    capitalize(
      normalizeSign(
        fallback || ""
      )
    )
  );
}

/* ============================================================
   RAW CMS PAYLOAD
============================================================ */

function getRawCmsPayload(
  data: CmsHoroscopeData
): CmsPayloadShape {
  return data as unknown as CmsPayloadShape;
}

/* ============================================================
   GET ZODIAC LIST
============================================================ */

function getZodiacList(
  data: CmsHoroscopeData
): CmsZodiacRecord[] {
  const rawData =
    getRawCmsPayload(data);

  if (Array.isArray(rawData.zodiacList)) {
    return rawData.zodiacList
      .map((item) =>
        asZodiacRecord(item)
      )
      .filter(
        (
          item
        ): item is CmsZodiacRecord =>
          Boolean(item)
      );
  }

  if (
    rawData.zodiacList &&
    typeof rawData.zodiacList === "object"
  ) {
    return Object.values(
      rawData.zodiacList as Record<
        string,
        unknown
      >
    )
      .map((item) =>
        asZodiacRecord(item)
      )
      .filter(
        (
          item
        ): item is CmsZodiacRecord =>
          Boolean(item)
      );
  }

  return [];
}

/* ============================================================
   GET API CMS ZODIAC
============================================================ */

function getCmsApiZodiac(
  data: CmsHoroscopeData
): CmsZodiacRecord | null {
  const rawData =
    getRawCmsPayload(data);

  return asZodiacRecord(
    rawData.cms?.zodiac
  );
}

/* ============================================================
   RECORD SIGN VALUES
============================================================ */

function getRecordSignValues(
  record: CmsZodiacRecord
): string[] {
  return [
    record.zodiac,
    record.slug,
    record.english,
    record.name,
    record.names?.english,
  ]
    .map((value) =>
      normalizeSign(value)
    )
    .filter(Boolean);
}

/* ============================================================
   FIND ZODIAC MASTER
============================================================ */

function findZodiacMaster(
  data: CmsHoroscopeData,
  resolvedSign: string
): CmsZodiacRecord | null {
  if (!resolvedSign) {
    return null;
  }

  const cmsApiZodiac =
    getCmsApiZodiac(data);

  if (cmsApiZodiac) {
    const values =
      getRecordSignValues(
        cmsApiZodiac
      );

    if (
      values.includes(
        resolvedSign
      )
    ) {
      return cmsApiZodiac;
    }
  }

  const list =
    getZodiacList(data);

  if (list.length === 0) {
    return cmsApiZodiac;
  }

  const exact =
    list.find(
      (record) =>
        getRecordSignValues(
          record
        ).includes(
          resolvedSign
        )
    );

  if (exact) {
    return exact;
  }

  const compactResolved =
    resolvedSign.replace(
      /[^a-z0-9]/g,
      ""
    );

  const compactMatch =
    list.find(
      (record) =>
        getRecordSignValues(
          record
        ).some(
          (value) =>
            value.replace(
              /[^a-z0-9]/g,
              ""
            ) === compactResolved
        )
    );

  if (compactMatch) {
    return compactMatch;
  }

  return cmsApiZodiac;
}

/* ============================================================
   NAME INITIAL FIELD
============================================================ */

function isNameInitialsKey(
  key: string
): boolean {
  const normalizedKey =
    key
      .toLowerCase()
      .replace(
        /[^a-z0-9]/g,
        ""
      );

  return (
    normalizedKey ===
      "nameinitials" ||
    normalizedKey ===
      "nameinitial" ||
    normalizedKey ===
      "initials" ||
    normalizedKey ===
      "rashinameinitials" ||
    normalizedKey ===
      "rashiinitials"
  );
}

/* ============================================================
   READ INITIALS FROM OBJECT
============================================================ */

function readNameInitialsFromObject(
  value: unknown
): {
  values: string[];
  path: string;
} {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return {
      values: [],
      path: "",
    };
  }

  const record =
    value as Record<
      string,
      unknown
    >;

  for (
    const [key, child] of Object.entries(
      record
    )
  ) {
    if (
      !isNameInitialsKey(key)
    ) {
      continue;
    }

    const values =
      normalizeStringArray(
        child
      );

    if (values.length > 0) {
      return {
        values,
        path: key,
      };
    }
  }

  return {
    values: [],
    path: "",
  };
}

/* ============================================================
   DEEP CMS INITIAL SEARCH
============================================================ */

function findCmsNameInitialsDeep(
  value: unknown,
  currentPath = "root",
  visited = new WeakSet<object>()
): {
  values: string[];
  path: string;
} {
  if (
    !value ||
    typeof value !== "object"
  ) {
    return {
      values: [],
      path: "",
    };
  }

  if (
    visited.has(value)
  ) {
    return {
      values: [],
      path: "",
    };
  }

  visited.add(value);

  if (Array.isArray(value)) {
    return {
      values: [],
      path: "",
    };
  }

  const record =
    value as Record<
      string,
      unknown
    >;

  for (
    const [key, child] of Object.entries(
      record
    )
  ) {
    if (
      !isNameInitialsKey(key)
    ) {
      continue;
    }

    const values =
      normalizeStringArray(
        child
      );

    if (values.length > 0) {
      return {
        values,
        path:
          `${currentPath}.${key}`,
      };
    }
  }

  for (
    const [key, child] of Object.entries(
      record
    )
  ) {
    if (
      !child ||
      typeof child !== "object"
    ) {
      continue;
    }

    if (Array.isArray(child)) {
      for (
        let index = 0;
        index < child.length;
        index++
      ) {
        const item =
          child[index];

        if (
          !item ||
          typeof item !== "object"
        ) {
          continue;
        }

        const result =
          findCmsNameInitialsDeep(
            item,
            `${currentPath}.${key}[${index}]`,
            visited
          );

        if (
          result.values.length > 0
        ) {
          return result;
        }
      }

      continue;
    }

    const result =
      findCmsNameInitialsDeep(
        child,
        `${currentPath}.${key}`,
        visited
      );

    if (
      result.values.length > 0
    ) {
      return result;
    }
  }

  return {
    values: [],
    path: "",
  };
}

/* ============================================================
   CANONICAL NAME INITIALS RESOLVER
============================================================ */

function resolveNameInitials(
  data: CmsHoroscopeData,
  zodiacMaster: CmsZodiacRecord | null
): {
  values: string[];
  source: string;
  path: string;
} {
  const rawData =
    getRawCmsPayload(data);

  const cmsApiZodiac =
    getCmsApiZodiac(data);

  if (cmsApiZodiac) {
    const direct =
      readNameInitialsFromObject(
        cmsApiZodiac
      );

    if (
      direct.values.length > 0
    ) {
      return {
        values:
          direct.values,
        source:
          "CMS_API_ZODIAC_MASTER",
        path:
          `data.cms.zodiac.${direct.path}`,
      };
    }
  }

  if (zodiacMaster) {
    const direct =
      readNameInitialsFromObject(
        zodiacMaster
      );

    if (
      direct.values.length > 0
    ) {
      return {
        values:
          direct.values,
        source:
          "ZODIAC_MASTER",
        path:
          `zodiacMaster.${direct.path}`,
      };
    }
  }

  if (zodiacMaster) {
    const deep =
      findCmsNameInitialsDeep(
        zodiacMaster,
        "zodiacMaster"
      );

    if (
      deep.values.length > 0
    ) {
      return {
        values:
          deep.values,
        source:
          "ZODIAC_MASTER_DEEP",
        path:
          deep.path,
      };
    }
  }

  const horoscopeIdentity =
    rawData.identity;

  if (horoscopeIdentity) {
    const result =
      readNameInitialsFromObject(
        horoscopeIdentity
      );

    if (
      result.values.length > 0
    ) {
      return {
        values:
          result.values,
        source:
          "HOROSCOPE_IDENTITY",
        path:
          `data.identity.${result.path}`,
      };
    }
  }

  const payloadResult =
    findCmsNameInitialsDeep(
      data,
      "data"
    );

  if (
    payloadResult.values.length > 0
  ) {
    return {
      values:
        payloadResult.values,
      source:
        "CMS_PAYLOAD_DEEP",
      path:
        payloadResult.path,
    };
  }

  return {
    values: [],
    source: "NONE",
    path: "",
  };
}

/* ============================================================
   COMPONENT
============================================================ */

export default function CmsHoroscopeExperience({
  data,
  currentSign,
  slug,
}: Props) {
  const viewTracked =
    useRef(false);

  /* ==========================================================
     RESOLVE SIGN
  ========================================================== */

  const resolvedSign =
    useMemo(() => {
      const direct =
        normalizeSign(
          currentSign
        );

      if (direct) {
        return direct;
      }

      const fromSlug =
        normalizeSign(slug);

      if (fromSlug) {
        return fromSlug;
      }

      const rawData =
        getRawCmsPayload(data);

      const fromData =
        normalizeSign(
          rawData.zodiac
        );

      if (fromData) {
        return fromData;
      }

      const apiZodiac =
        getCmsApiZodiac(data);

      const fromApi =
        normalizeSign(
          apiZodiac?.zodiac ||
            apiZodiac?.slug
        );

      if (fromApi) {
        return fromApi;
      }

      const heroTitle =
        stringValue(
          data?.hero?.title
        );

      const firstWord =
        heroTitle.split(
          /\s+/
        )[0];

      return normalizeSign(
        firstWord
      );
    }, [
      currentSign,
      slug,
      data,
    ]);

  /* ==========================================================
     ZODIAC MASTER
  ========================================================== */

  const zodiacMaster =
    useMemo(() => {
      const master =
        findZodiacMaster(
          data,
          resolvedSign
        );

      if (!master) {
        console.log(
          "NATIONPATH ZODIAC MASTER: NULL",
          {
            resolvedSign,
          }
        );

        return null;
      }

      console.log(
        "NATIONPATH ZODIAC MASTER FULL:",
        JSON.stringify(
          master,
          null,
          2
        )
      );

      console.log(
        "NATIONPATH ZODIAC MASTER:",
        master
      );

      return master;
    }, [
      data,
      resolvedSign,
    ]);

  /* ==========================================================
     IDENTITIES
  ========================================================== */

  const identity =
    data?.identity;

  const zodiacIdentity =
    zodiacMaster?.identity;

  /* ==========================================================
     CANONICAL NAME INITIALS
  ========================================================== */

  const resolvedNameInitials =
    useMemo(
      () =>
        resolveNameInitials(
          data,
          zodiacMaster
        ),
      [
        data,
        zodiacMaster,
      ]
    );

  const zodiacNameInitials =
    resolvedNameInitials.values;

  const zodiacNameInitialsSource =
    resolvedNameInitials.source;

  const zodiacNameInitialsPath =
    resolvedNameInitials.path;

  /* ==========================================================
     ZODIAC
  ========================================================== */

  const zodiac =
    normalizeSign(
      zodiacMaster?.zodiac ||
        zodiacMaster?.slug ||
        resolvedSign
    );

  /* ==========================================================
     ZODIAC MASTER MEDIA
  ========================================================== */

  const zodiacMedia =
    useMemo(() => {
      if (!zodiacMaster) {
        return null;
      }

      return (
        zodiacMaster.media ||
        zodiacMaster.identity?.media ||
        null
      );
    }, [
      zodiacMaster,
    ]);

  /* ==========================================================
     ZODIAC MASTER MODALITY
  ========================================================== */

  const zodiacModality =
    stringValue(
      zodiacMaster?.modality
    );

  /* ==========================================================
     ENGLISH
  ========================================================== */

  const zodiacEnglish =
    useMemo(() => {
      const rawEnglish =
        stringValue(
          zodiacMaster?.names
            ?.english
        ) ||
        stringValue(
          zodiacMaster?.english
        ) ||
        stringValue(
          zodiacMaster?.name
        ) ||
        stringValue(
          (
            identity as
              | {
                  english?: unknown;
                }
              | undefined
          )?.english
        ) ||
        stringValue(
          (
            identity as
              | {
                  name?: unknown;
                }
              | undefined
          )?.name
        );

      return cleanZodiacDisplayName(
        rawEnglish,
        zodiac
      );
    }, [
      zodiacMaster,
      identity,
      zodiac,
    ]);

  /* ==========================================================
     HINDI
  ========================================================== */

  const zodiacHindi =
    stringValue(
      zodiacMaster?.names
        ?.hindi
    ) ||
    stringValue(
      zodiacIdentity?.rashi
    ) ||
    stringValue(
      identity?.rashi
    );

  /* ==========================================================
     SANSKRIT
  ========================================================== */

  const zodiacSanskrit =
    stringValue(
      zodiacMaster?.names
        ?.sanskrit
    ) ||
    stringValue(
      zodiacIdentity
        ?.sanskritName
    ) ||
    stringValue(
      identity?.sanskritName
    );

  /* ==========================================================
     DESCRIPTION
  ========================================================== */

  const zodiacDescription =
    stringValue(
      zodiacIdentity
        ?.description
    ) ||
    stringValue(
      identity?.description
    ) ||
    stringValue(
      data?.hero?.description
    );

  /* ==========================================================
     DATES
  ========================================================== */

  const zodiacDates =
    stringValue(
      zodiacIdentity?.dates
    ) ||
    stringValue(
      identity?.dates
    ) ||
    stringValue(
      zodiacMaster?.dates
    );

  /* ==========================================================
     ELEMENT
  ========================================================== */

  const zodiacElement =
    stringValue(
      zodiacIdentity?.element
    ) ||
    stringValue(
      identity?.element
    ) ||
    stringValue(
      zodiacMaster?.element
    );

  /* ==========================================================
     NATURE
  ========================================================== */

  const zodiacNature =
    stringValue(
      zodiacIdentity?.nature
    ) ||
    stringValue(
      identity?.nature
    ) ||
    stringValue(
      zodiacMaster?.nature
    );

  /* ==========================================================
     PLANET
  ========================================================== */

  const zodiacPlanet =
    stringValue(
      (
        identity as
          | {
              rulingPlanet?: unknown;
            }
          | undefined
      )?.rulingPlanet
    ) ||
    stringValue(
      zodiacMaster?.rulingPlanet
    ) ||
    stringValue(
      zodiacMaster?.planet
    );

  /* ==========================================================
     ENERGY
  ========================================================== */

  const zodiacEnergy =
    stringValue(
      zodiacIdentity?.energy
    ) ||
    stringValue(
      identity?.energy
    ) ||
    stringValue(
      zodiacMaster?.energy
    );

  /* ==========================================================
     VIEW TRACKING
  ========================================================== */

  useEffect(() => {
    if (viewTracked.current) {
      return;
    }

    if (!zodiac || !slug) {
      return;
    }

    viewTracked.current = true;

    let sessionId =
      localStorage.getItem(
        "nationpath_horoscope_session"
      );

    if (!sessionId) {
      sessionId =
        crypto.randomUUID();

      localStorage.setItem(
        "nationpath_horoscope_session",
        sessionId
      );
    }

    fetch(
      "/api/astro/horoscope/view",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          sessionId,
          zodiac,
          slug,
        }),
      }
    ).catch(() => {
      /* tracking never interrupts UI */
    });
  }, [
    zodiac,
    slug,
  ]);

  /* ==========================================================
     CONTENT
  ========================================================== */

  const hasContent =
    Boolean(
      data?.hero ||
        data?.editorial ||
        data?.life ||
        data?.insights ||
        (
          data?.planets &&
          data.planets.length > 0
        ) ||
        data?.lucky ||
        data?.remedy ||
        data?.vedic ||
        data?.compatibility ||
        data?.premium
    );

  /* ==========================================================
     ACTIVE HUB
  ========================================================== */

  const [
    activeHub,
    setActiveHub,
  ] =
    useState<HubKey>(
      data?.hero
        ? "hero"
        : data?.editorial
          ? "editorial"
          : "rashi"
    );

  /* ==========================================================
     HUB ITEMS
  ========================================================== */

  const hubItems =
    useMemo<HubItem[]>(
      () => [
        {
          id: "hero",
          label:
            "Today's Reading",
          shortLabel:
            "Today",
          icon: (
            <Sparkles
              size={14}
            />
          ),
          available:
            Boolean(
              data?.hero
            ),
        },

        {
          id: "editorial",
          label: "Editorial",
          shortLabel:
            "Editorial",
          icon: (
            <BookOpen
              size={14}
            />
          ),
          available:
            Boolean(
              data?.editorial
            ),
        },

        {
          id: "rashi",
          label: "Rashi",
          shortLabel: "Rashi",
          icon: (
            <Sun
              size={14}
            />
          ),
          available: true,
        },

        {
          id: "life",
          label: "Life",
          shortLabel: "Life",
          icon: (
            <Compass
              size={14}
            />
          ),
          available:
            Boolean(
              data?.life
            ),
        },

        {
          id: "insights",
          label:
            "Intelligence",
          shortLabel:
            "Insights",
          icon: (
            <Zap
              size={14}
            />
          ),
          available:
            Boolean(
              data?.insights
            ),
        },

        {
          id: "planetary",
          label: "Planetary",
          shortLabel:
            "Planets",
          icon: (
            <Orbit
              size={14}
            />
          ),
          available:
            Boolean(
              data?.planets &&
                data.planets
                  .length > 0
            ),
        },

        {
          id: "lucky",
          label: "Lucky",
          shortLabel: "Lucky",
          icon: (
            <Star
              size={14}
            />
          ),
          available:
            Boolean(
              data?.lucky
            ),
        },

        {
          id: "remedy",
          label: "Remedy",
          shortLabel: "Remedy",
          icon: (
            <WandSparkles
              size={14}
            />
          ),
          available:
            Boolean(
              data?.remedy
            ),
        },

        {
          id: "vedic",
          label: "Vedic",
          shortLabel: "Vedic",
          icon: (
            <MoonStar
              size={14}
            />
          ),
          available:
            Boolean(
              data?.vedic
            ),
        },

        {
          id: "compatibility",
          label:
            "Compatibility",
          shortLabel:
            "Match",
          icon: (
            <Heart
              size={14}
            />
          ),
          available:
            Boolean(
              data?.compatibility
            ),
        },
      ],
      [
        data?.hero,
        data?.editorial,
        data?.life,
        data?.insights,
        data?.planets,
        data?.lucky,
        data?.remedy,
        data?.vedic,
        data?.compatibility,
      ]
    );

  /* ==========================================================
     VALIDATE ACTIVE HUB
  ========================================================== */

  useEffect(() => {
    const current =
      hubItems.find(
        (item) =>
          item.id ===
          activeHub
      );

    if (current?.available) {
      return;
    }

    const firstAvailable =
      hubItems.find(
        (item) =>
          item.available
      );

    if (firstAvailable) {
      setActiveHub(
        firstAvailable.id
      );
    }
  }, [
    hubItems,
    activeHub,
  ]);

  /* ==========================================================
     ACTIVE CONTENT
  ========================================================== */

  function renderActiveHub(): ReactNode {
    switch (activeHub) {
      case "hero": {
        if (!data?.hero) {
          return null;
        }

        return (
          <HoroscopeHero
            hero={data.hero}

            identity={{
              ...identity,

              english:
                identity?.english ||
                zodiacEnglish,

              /*
               * CmsHoroscopeIdentity does not
               * expose `name`.
               *
               * Keep the existing CMS contract
               * and use canonical english value.
               */
              rashi:
                identity?.rashi ||
                zodiacHindi,

              sanskritName:
                identity?.sanskritName ||
                zodiacSanskrit,

              dates:
                identity?.dates ||
                zodiacDates,

              description:
                identity?.description ||
                zodiacDescription,

              element:
                identity?.element ||
                zodiacElement,

              nature:
                identity?.nature ||
                zodiacNature,

              rulingPlanet:
                identity?.rulingPlanet ||
                zodiacPlanet,

              energy:
                identity?.energy ||
                zodiacEnergy,

              nameInitials:
                zodiacNameInitials,
            }}

            zodiac={{
              ...zodiacMaster,

              modality:
                zodiacModality,

              media:
                zodiacMedia,
            }}

            traits={
              data.traits
            }
          />
        );
      }

      case "editorial": {
        if (
          !data?.editorial
        ) {
          return null;
        }

        return (
          <HoroscopeEditorial
            editorial={
              data.editorial
            }
          />
        );
      }

      case "rashi": {
        return (
          <HoroscopeRashi
            english={
              zodiacEnglish
            }
            hindi={
              zodiacHindi
            }
            sanskrit={
              zodiacSanskrit
            }
            description={
              zodiacDescription
            }
            dates={
              zodiacDates
            }
            element={
              zodiacElement
            }
            nature={
              zodiacNature
            }
            planet={
              zodiacPlanet
            }
            energy={
              zodiacEnergy
            }
            symbol={
              stringValue(
                zodiacMaster?.symbol
              ) ||
              stringValue(
                zodiacMaster?.image
              )
            }
            initials={
              zodiacNameInitials
            }
          />
        );
      }

      case "life": {
        if (!data?.life) {
          return null;
        }

        return (
          <HoroscopeLifeCards
            life={
              data.life
            }
          />
        );
      }

      case "insights": {
        if (
          !data?.insights
        ) {
          return null;
        }

        return (
          <HoroscopeIntelligencePanel
            insights={
              data.insights
            }
          />
        );
      }

      case "planetary": {
        if (
          !data?.planets ||
          data.planets.length ===
            0
        ) {
          return null;
        }

        const planetaryData =
          data.planets.map(
            (planet) => ({
              name:
                planet.name ||
                planet.planetKey ||
                "Planet",

              title:
                planet.title,

              message:
                planet.message,

              strength:
                planet.strength,
            })
          );

        return (
          <HoroscopePlanetary
            planets={
              planetaryData
            }
          />
        );
      }

      case "lucky": {
        if (!data?.lucky) {
          return null;
        }

        return (
          <HoroscopeLucky
            lucky={
              data.lucky
            }
          />
        );
      }

      case "remedy": {
        if (!data?.remedy) {
          return null;
        }

        return (
          <HoroscopeRemedy
            remedy={
              data.remedy
            }
          />
        );
      }

      case "vedic": {
        if (!data?.vedic) {
          return null;
        }

        return (
          <HoroscopeVedic
            vedic={
              data.vedic
            }
          />
        );
      }

      case "compatibility": {
        if (
          !data?.compatibility
        ) {
          return null;
        }

        return (
          <HoroscopeCompatibility
            compatibility={
              data.compatibility
            }
          />
        );
      }

      default:
        return null;
    }
  }

  /* ==========================================================
     EMPTY STATE
  ========================================================== */

  if (!hasContent) {
    return (
      <main
        className="
          relative
          min-h-screen
          overflow-hidden
          bg-[var(--cosmic-bg-deep)]
          px-4
          py-12
          text-[var(--cosmic-text)]
        "
      >
        <div
          aria-hidden="true"
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
              left-[10%]
              top-[-180px]
              h-[520px]
              w-[520px]
              rounded-full
              bg-[var(--cosmic-glow-purple)]
              blur-[150px]
              opacity-25
            "
          />

          <div
            className="
              absolute
              right-[-160px]
              top-[30%]
              h-[460px]
              w-[460px]
              rounded-full
              bg-[var(--cosmic-glow-gold)]
              blur-[160px]
              opacity-15
            "
          />
        </div>

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-5xl
            rounded-[28px]
            border
            border-white/[0.07]
            bg-[var(--cosmic-card)]
            p-8
            text-center
            shadow-[0_30px_100px_rgba(0,0,0,0.35)]
          "
        >
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.25em]
              text-[var(--cosmic-gold-light)]
            "
          >
            NationPath Astro
          </p>

          <h1
            className="
              mt-3
              font-serif
              text-2xl
              font-semibold
              text-[var(--cosmic-text)]
            "
          >
            Horoscope content unavailable
          </h1>

          <p
            className="
              mx-auto
              mt-3
              max-w-xl
              text-sm
              leading-6
              text-[var(--cosmic-text-muted)]
            "
          >
            Published CMS content is
            currently unavailable for{" "}
            {zodiac ||
              "this zodiac sign"}.
          </p>
        </div>
      </main>
    );
  }

  /* ==========================================================
     MAIN EXPERIENCE
  ========================================================== */

  return (
    <main
      data-zodiac={zodiac}
      data-period={
        data.meta?.period ||
        "daily"
      }
      data-language={
        data.meta?.language ||
        "english"
      }
      data-name-initials={
        zodiacNameInitials.join("|")
      }
      data-name-initials-source={
        zodiacNameInitialsSource
      }
      data-name-initials-path={
        zodiacNameInitialsPath
      }
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[var(--cosmic-bg)]
        text-[var(--cosmic-text)]
      "
    >
      {/* ======================================================
          COSMIC BACKGROUND
      ====================================================== */}

      <div
        aria-hidden="true"
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
            inset-0
            bg-[var(--cosmic-gradient)]
            opacity-55
          "
        />

        <div
          className="
            absolute
            left-[-180px]
            top-[-220px]
            h-[680px]
            w-[680px]
            rounded-full
            bg-[var(--cosmic-glow-purple)]
            blur-[170px]
            opacity-35
            animate-[pulse_11s_ease-in-out_infinite]
          "
        />

        <div
          className="
            absolute
            right-[-220px]
            top-[10%]
            h-[600px]
            w-[600px]
            rounded-full
            bg-[var(--cosmic-glow-magenta)]
            blur-[180px]
            opacity-25
            animate-[pulse_14s_ease-in-out_infinite]
          "
        />

        <div
          className="
            absolute
            left-[42%]
            top-[-120px]
            h-[480px]
            w-[480px]
            -translate-x-1/2
            rounded-full
            bg-[var(--cosmic-glow-gold)]
            blur-[190px]
            opacity-18
          "
        />

        <div
          className="
            absolute
            bottom-[-300px]
            left-[12%]
            h-[620px]
            w-[620px]
            rounded-full
            bg-[var(--cosmic-glow-violet)]
            blur-[190px]
            opacity-25
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.13),transparent_43%)]
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_22%,rgba(5,4,10,0.48)_100%)]
          "
        />

        <motion.div
          animate={{
            x: [
              "-45%",
              "120%",
            ],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            left-0
            top-[8%]
            h-px
            w-[38%]
            bg-gradient-to-r
            from-transparent
            via-[var(--cosmic-gold)]
            to-transparent
            opacity-25
          "
        />

        <motion.div
          animate={{
            x: [
              "120%",
              "-45%",
            ],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            right-0
            top-[58%]
            h-px
            w-[30%]
            bg-gradient-to-r
            from-transparent
            via-[var(--cosmic-purple)]
            to-transparent
            opacity-20
          "
        />

        <div
          className="
            absolute
            left-[14%]
            top-[18%]
            h-1
            w-1
            rounded-full
            bg-[var(--cosmic-gold)]
            shadow-[0_0_12px_var(--cosmic-gold-glow)]
            animate-pulse
          "
        />

        <div
          className="
            absolute
            right-[18%]
            top-[31%]
            h-1.5
            w-1.5
            rounded-full
            bg-[var(--cosmic-purple)]
            shadow-[0_0_14px_var(--cosmic-purple-glow)]
            animate-pulse
          "
        />

        <div
          className="
            absolute
            left-[28%]
            bottom-[18%]
            h-1
            w-1
            rounded-full
            bg-[var(--cosmic-gold)]
            shadow-[0_0_10px_var(--cosmic-gold-glow)]
            animate-pulse
          "
        />
      </div>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-7xl
          px-2
          py-2
          sm:px-5
          sm:py-5
          lg:px-7
          lg:py-6
        "
      >
        <div className="space-y-3 sm:space-y-4">

          {/* ==================================================
              UNIFIED DAILY HOROSCOPE EXPERIENCE
          ================================================== */}

          <section
            data-section="daily-horoscope-experience"
            className="
              relative
              overflow-hidden
              rounded-[22px]
              border
              border-white/[0.08]
              bg-[linear-gradient(145deg,rgba(22,18,38,0.94),rgba(8,6,17,0.985))]
              shadow-[0_30px_100px_rgba(0,0,0,0.46)]
              backdrop-blur-2xl
              sm:rounded-[32px]
            "
          >

            {/* =================================================
                UNIFIED PANEL AMBIENCE
            ================================================= */}

            <div
              aria-hidden="true"
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
                  -left-40
                  -top-40
                  h-[440px]
                  w-[440px]
                  rounded-full
                  bg-[var(--cosmic-glow-purple)]
                  blur-[135px]
                  opacity-28
                "
              />

              <div
                className="
                  absolute
                  -right-40
                  top-[8%]
                  h-[420px]
                  w-[420px]
                  rounded-full
                  bg-[var(--cosmic-glow-gold)]
                  blur-[145px]
                  opacity-12
                "
              />

              <div
                className="
                  absolute
                  bottom-[-240px]
                  left-[35%]
                  h-[460px]
                  w-[460px]
                  rounded-full
                  bg-[var(--cosmic-glow-violet)]
                  blur-[160px]
                  opacity-15
                "
              />

              <div
                className="
                  absolute
                  left-1/2
                  top-0
                  h-px
                  w-[72%]
                  -translate-x-1/2
                  bg-gradient-to-r
                  from-transparent
                  via-[var(--cosmic-gold)]
                  to-transparent
                  opacity-45
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-[radial-gradient(circle_at_50%_0%,rgba(234,179,8,0.035),transparent_36%)]
                "
              />
            </div>

            {/* =================================================
                PANCHANG
            ================================================= */}

            <div
              className="
                relative
                z-10
                border-b
                border-white/[0.045]
                px-2
                py-1.5
                sm:px-5
                sm:py-2.5
              "
            >
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[14px]
                  border
                  border-white/[0.045]
                  bg-black/[0.13]
                  sm:rounded-[16px]
                "
              >
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-y-0
                    left-0
                    w-20
                    bg-gradient-to-r
                    from-[rgba(139,92,246,0.07)]
                    to-transparent
                  "
                />

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-y-0
                    right-0
                    w-20
                    bg-gradient-to-l
                    from-[rgba(234,179,8,0.05)]
                    to-transparent
                  "
                />

                <div className="relative">
                  <PanchangHeroBanner />
                </div>
              </div>
            </div>

            {/* =================================================
                DAILY HOROSCOPE HEADER
            ================================================= */}

            <header
              className="
                relative
                z-10
                border-b
                border-white/[0.045]
                px-3
                py-3
                sm:px-6
                sm:py-4
                lg:px-7
              "
            >
              <div
                className="
                  grid
                  grid-cols-1
                  gap-3
                  lg:grid-cols-[minmax(0,1fr)_minmax(300px,430px)_auto]
                  lg:items-center
                  lg:gap-6
                "
              >

                <div
                  className="
                    min-w-0
                  "
                >
                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                    "
                  >
                    <span
                      className="
                        relative
                        flex
                        h-5
                        w-5
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[rgba(234,179,8,0.18)]
                        bg-[rgba(234,179,8,0.055)]
                      "
                    >
                      <Sparkles
                        size={10}
                        className="
                          text-[var(--cosmic-gold)]
                          drop-shadow-[0_0_7px_var(--cosmic-gold-glow)]
                        "
                      />
                    </span>

                    <span
                      className="
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.24em]
                        text-[var(--cosmic-gold-light)]
                      "
                    >
                      Daily Horoscope Experience
                    </span>
                  </div>
                </div>

                <div
                  className="
                    min-w-0
                    lg:text-center
                  "
                >
                  <h2
                    className="
                      font-serif
                      text-[1.35rem]
                      font-semibold
                      leading-none
                      tracking-[-0.04em]
                      text-white
                      sm:text-[1.7rem]
                      lg:text-[1.85rem]
                    "
                  >
                    Explore Your{" "}
                    <span
                      className="
                        relative
                        inline-block
                        text-[var(--cosmic-gold-light)]
                        drop-shadow-[0_0_18px_rgba(234,179,8,0.16)]
                      "
                    >
                      {zodiacEnglish ||
                        capitalize(
                          zodiac
                        )}
                    </span>
                  </h2>

                  <div
                    className="
                      mx-auto
                      mt-2
                      h-px
                      w-12
                      bg-gradient-to-r
                      from-transparent
                      via-[var(--cosmic-gold)]
                      to-transparent
                      opacity-65
                    "
                  />
                </div>

                <div
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-3
                    lg:justify-end
                  "
                >
                  <div
                    className="
                      hidden
                      h-9
                      w-px
                      bg-white/[0.08]
                      lg:block
                    "
                  />

                  <div
                    className="
                      min-w-0
                      flex-1
                      lg:max-w-[285px]
                    "
                  >
                    <p
                      className="
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.15em]
                        text-[var(--cosmic-gold-light)]
                      "
                    >
                      Your Complete Cosmic Reading
                    </p>

                    <p
                      className="
                        mt-1
                        text-[9px]
                        leading-4
                        text-[var(--cosmic-text-muted)]
                        sm:text-[10px]
                      "
                    >
                      Daily insights, planetary
                      signals, life guidance and
                      Vedic intelligence.
                    </p>
                  </div>

                  <div
                    className="
                      hidden
                      shrink-0
                      items-center
                      gap-1.5
                      rounded-full
                      border
                      border-[rgba(234,179,8,0.15)]
                      bg-[rgba(234,179,8,0.045)]
                      px-2.5
                      py-1.5
                      sm:flex
                    "
                  >
                    <Sparkles
                      size={9}
                      className="
                        text-[var(--cosmic-gold)]
                      "
                    />

                    <span
                      className="
                        whitespace-nowrap
                        text-[7px]
                        font-bold
                        uppercase
                        tracking-[0.15em]
                        text-[var(--cosmic-gold-light)]
                      "
                    >
                      NationPath Astro
                    </span>
                  </div>
                </div>
              </div>
            </header>

            {/* =================================================
                MOBILE + DESKTOP NAVIGATION
            ================================================= */}

            <nav
              aria-label="Horoscope sections"
              className="
                relative
                z-10
                border-b
                border-white/[0.04]
                bg-black/[0.09]
              "
            >

              {/* =================================================
                  MOBILE NAV
                  2 ROW × 5 COLUMN
              ================================================= */}

              <div
                className="
                  grid
                  grid-cols-5
                  gap-1
                  px-2
                  py-2
                  sm:hidden
                "
              >
                {hubItems
                  .filter(
                    (item) =>
                      item.available
                  )
                  .map((item) => {
                    const active =
                      activeHub ===
                      item.id;

                    return (
                      <button
                        key={
                          `mobile-${item.id}`
                        }
                        type="button"
                        onClick={() =>
                          setActiveHub(
                            item.id
                          )
                        }
                        aria-pressed={
                          active
                        }
                        className={`
                          group
                          relative
                          flex
                          min-h-[52px]
                          w-full
                          flex-col
                          items-center
                          justify-center
                          gap-1
                          rounded-[12px]
                          border
                          px-1
                          py-1.5
                          transition-all
                          duration-300
                          active:scale-[0.95]
                          focus:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-[var(--cosmic-gold)]

                          ${
                            active
                              ? `
                                border-[rgba(234,179,8,0.24)]
                                bg-[linear-gradient(145deg,rgba(234,179,8,0.13),rgba(139,92,246,0.12))]
                                text-[var(--cosmic-gold-light)]
                                shadow-[0_6px_22px_rgba(234,179,8,0.08)]
                              `
                              : `
                                border-white/[0.035]
                                bg-white/[0.018]
                                text-[var(--cosmic-text-muted)]
                              `
                          }
                        `}
                      >
                        <span
                          className={`
                            flex
                            h-6
                            w-6
                            items-center
                            justify-center
                            rounded-full
                            border
                            transition-all
                            duration-300

                            ${
                              active
                                ? `
                                  border-[rgba(234,179,8,0.24)]
                                  bg-[rgba(234,179,8,0.09)]
                                  text-[var(--cosmic-gold)]
                                  shadow-[0_0_12px_rgba(234,179,8,0.08)]
                                `
                                : `
                                  border-white/[0.045]
                                  bg-white/[0.025]
                                  text-[var(--cosmic-text-subtle)]
                                  group-active:text-[var(--cosmic-gold)]
                                `
                            }
                          `}
                        >
                          {item.icon}
                        </span>

                        <span
                          className={`
                            max-w-full
                            truncate
                            px-0.5
                            text-[7px]
                            font-bold
                            uppercase
                            tracking-[0.02em]
                            leading-none
                            ${
                              active
                                ? "text-[var(--cosmic-gold-light)]"
                                : "text-[var(--cosmic-text-muted)]"
                            }
                          `}
                        >
                          {item.shortLabel}
                        </span>

                        {active && (
                          <motion.span
                            layoutId="mobile-active-horoscope-tab"
                            className="
                              absolute
                              bottom-0.5
                              left-1/2
                              h-[2px]
                              w-5
                              -translate-x-1/2
                              rounded-full
                              bg-[var(--cosmic-gold)]
                              shadow-[0_0_9px_var(--cosmic-gold-glow)]
                            "
                          />
                        )}
                      </button>
                    );
                  })}
              </div>

              {/* =================================================
                  DESKTOP NAV
              ================================================= */}

              <div
                className="
                  hidden
                  px-3
                  py-2
                  sm:block
                  sm:px-5
                  sm:py-2.5
                "
              >
                <div
                  className="
                    flex
                    w-full
                    items-center
                    gap-1.5
                    overflow-x-auto
                    scrollbar-thin
                    scrollbar-track-transparent
                    scrollbar-thumb-white/10
                    pb-0.5
                    [scrollbar-width:thin]
                  "
                >
                  {hubItems
                    .filter(
                      (item) =>
                        item.available
                    )
                    .map((item) => {
                      const active =
                        activeHub ===
                        item.id;

                      return (
                        <button
                          key={
                            item.id
                          }
                          type="button"
                          onClick={() =>
                            setActiveHub(
                              item.id
                            )
                          }
                          aria-pressed={
                            active
                          }
                          className={`group relative flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-full border px-3 text-[8px] font-bold uppercase tracking-[0.07em] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cosmic-gold)] active:scale-[0.97] ${
                            active
                              ? `
                                border-[rgba(234,179,8,0.2)]
                                bg-[linear-gradient(135deg,rgba(234,179,8,0.12),rgba(139,92,246,0.1))]
                                text-[var(--cosmic-gold-light)]
                                shadow-[0_4px_18px_rgba(234,179,8,0.06)]
                              `
                              : `
                                border-white/[0.035]
                                bg-white/[0.015]
                                text-[var(--cosmic-text-muted)]
                                hover:border-white/[0.075]
                                hover:bg-white/[0.04]
                                hover:text-[var(--cosmic-text)]
                              `
                          }`}
                        >
                          <span
                            className={
                              active
                                ? `
                                  text-[var(--cosmic-gold)]
                                  drop-shadow-[0_0_7px_var(--cosmic-gold-glow)]
                                `
                                : `
                                  text-[var(--cosmic-text-subtle)]
                                  group-hover:text-[var(--cosmic-gold)]
                                `
                            }
                          >
                            {item.icon}
                          </span>

                          <span>
                            {item.label}
                          </span>

                          {active && (
                            <motion.span
                              layoutId="active-horoscope-tab"
                              className="
                                absolute
                                bottom-0
                                left-1/2
                                h-[2px]
                                w-5
                                -translate-x-1/2
                                rounded-full
                                bg-[var(--cosmic-gold)]
                                shadow-[0_0_10px_var(--cosmic-gold-glow)]
                              "
                            />
                          )}
                        </button>
                      );
                    })}
                </div>
              </div>
            </nav>

            {/* =================================================
                ACTIVE CONTENT
            ================================================= */}

            <div
              className="
                relative
                z-10
                min-h-[260px]
                px-2
                py-3
                sm:px-5
                sm:py-5
                lg:px-7
                lg:py-6
              "
            >
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                <motion.div
                  key={
                    activeHub
                  }
                  initial={{
                    opacity: 0,
                    y: 6,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -4,
                  }}
                  transition={{
                    duration: 0.18,
                  }}
                >
                  {
                    renderActiveHub()
                  }
                </motion.div>
              </AnimatePresence>
            </div>

            {/* =================================================
                PANEL FOOTER
            ================================================= */}

            <footer
              className="
                relative
                z-10
                flex
                items-center
                justify-between
                border-t
                border-white/[0.04]
                bg-black/[0.08]
                px-3
                py-2
                sm:px-6
              "
            >
              <span
                className="
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[var(--cosmic-text-subtle)]
                "
              >
                {
                  hubItems.find(
                    (item) =>
                      item.id ===
                      activeHub
                  )?.label ||
                    "Today's Reading"
                }
              </span>

              <span
                className="
                  flex
                  items-center
                  gap-1.5
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-[var(--cosmic-text-subtle)]
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[var(--cosmic-success)]
                    shadow-[0_0_8px_var(--cosmic-success)]
                  "
                />

                CMS Intelligence
              </span>
            </footer>
          </section>

          {/* ==================================================
              ZODIAC EXPLORER
          ================================================== */}

          {data.zodiacList &&
            data.zodiacList.length >
              0 && (
              <section
                data-section="zodiac-explorer"
                className="
                  relative
                "
              >
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -inset-5
                    rounded-[36px]
                    bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.08),transparent_65%)]
                    blur-2xl
                  "
                />

                <div className="relative z-10">
                  <ZodiacExplorerPanel
                    zodiac={
                      data.zodiacList
                    }
                    active={
                      resolvedSign ||
                      zodiac
                    }
                  />
                </div>
              </section>
            )}

          {/* ==================================================
              PREMIUM
          ================================================== */}
{/* ==================================================
    PREMIUM
================================================== */}

<section
  data-section="premium"
  className="
    relative
  "
>
  <div
    aria-hidden="true"
    className="
      pointer-events-none
      absolute
      -inset-5
      rounded-[36px]
      bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.06),transparent_65%)]
      blur-2xl
    "
  />

  <div className="relative z-10">
    <HoroscopePremium />
  </div>
</section>
        </div>
      </div>
    </main>
  );
}