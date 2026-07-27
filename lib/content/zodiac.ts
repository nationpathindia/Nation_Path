export interface ZodiacSign {
  slug: string;
  key: string;
  name: string;
  hindi: string;
  symbol: string;
  order: number;
  dateRange: string;
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    order: 1,
    slug: "aries",
    key: "ARIES",
    name: "Aries",
    hindi: "मेष",
    symbol: "♈",
    dateRange: "Mar 21 – Apr 19",
  },
  {
    order: 2,
    slug: "taurus",
    key: "TAURUS",
    name: "Taurus",
    hindi: "वृषभ",
    symbol: "♉",
    dateRange: "Apr 20 – May 20",
  },
  {
    order: 3,
    slug: "gemini",
    key: "GEMINI",
    name: "Gemini",
    hindi: "मिथुन",
    symbol: "♊",
    dateRange: "May 21 – Jun 20",
  },
  {
    order: 4,
    slug: "cancer",
    key: "CANCER",
    name: "Cancer",
    hindi: "कर्क",
    symbol: "♋",
    dateRange: "Jun 21 – Jul 22",
  },
  {
    order: 5,
    slug: "leo",
    key: "LEO",
    name: "Leo",
    hindi: "सिंह",
    symbol: "♌",
    dateRange: "Jul 23 – Aug 22",
  },
  {
    order: 6,
    slug: "virgo",
    key: "VIRGO",
    name: "Virgo",
    hindi: "कन्या",
    symbol: "♍",
    dateRange: "Aug 23 – Sep 22",
  },
  {
    order: 7,
    slug: "libra",
    key: "LIBRA",
    name: "Libra",
    hindi: "तुला",
    symbol: "♎",
    dateRange: "Sep 23 – Oct 22",
  },
  {
    order: 8,
    slug: "scorpio",
    key: "SCORPIO",
    name: "Scorpio",
    hindi: "वृश्चिक",
    symbol: "♏",
    dateRange: "Oct 23 – Nov 21",
  },
  {
    order: 9,
    slug: "sagittarius",
    key: "SAGITTARIUS",
    name: "Sagittarius",
    hindi: "धनु",
    symbol: "♐",
    dateRange: "Nov 22 – Dec 21",
  },
  {
    order: 10,
    slug: "capricorn",
    key: "CAPRICORN",
    name: "Capricorn",
    hindi: "मकर",
    symbol: "♑",
    dateRange: "Dec 22 – Jan 19",
  },
  {
    order: 11,
    slug: "aquarius",
    key: "AQUARIUS",
    name: "Aquarius",
    hindi: "कुंभ",
    symbol: "♒",
    dateRange: "Jan 20 – Feb 18",
  },
  {
    order: 12,
    slug: "pisces",
    key: "PISCES",
    name: "Pisces",
    hindi: "मीन",
    symbol: "♓",
    dateRange: "Feb 19 – Mar 20",
  },
];

export const ZODIAC_MAP = Object.fromEntries(
  ZODIAC_SIGNS.map((z) => [z.slug, z])
);

export const ZODIAC_SLUGS = ZODIAC_SIGNS.map((z) => z.slug);