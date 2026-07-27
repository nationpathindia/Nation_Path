import { prisma } from "@/lib/prisma";
import ZodiacCard from "./ZodiacCard";

const zodiacOrder = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

const fallbackDates: Record<string, string> = {
  Aries: "Mar 21 – Apr 19",
  Taurus: "Apr 20 – May 20",
  Gemini: "May 21 – Jun 20",
  Cancer: "Jun 21 – Jul 22",
  Leo: "Jul 23 – Aug 22",
  Virgo: "Aug 23 – Sep 22",
  Libra: "Sep 23 – Oct 22",
  Scorpio: "Oct 23 – Nov 21",
  Sagittarius: "Nov 22 – Dec 21",
  Capricorn: "Dec 22 – Jan 19",
  Aquarius: "Jan 20 – Feb 18",
  Pisces: "Feb 19 – Mar 20",
};

interface HoroscopeItem {
  id: string;
  slug: string;
  zodiacSign: string | null;
  zodiacDateRange: string | null;
  lovePrediction: string | null;
  careerPrediction: string | null;
  healthPrediction: string | null;
}

function isHoroscopeItem(
  item: HoroscopeItem | undefined,
): item is HoroscopeItem {
  return Boolean(item);
}

export default async function ZodiacGrid() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  let horoscopes: HoroscopeItem[] = [];

  try {
    horoscopes = await prisma.article.findMany({
      where: {
        isAstrology: true,
        status: "approved",
        horoscopeDate: {
          gte: today,
          lt: tomorrow,
        },
      },
      select: {
        id: true,
        slug: true,
        zodiacSign: true,
        zodiacDateRange: true,
        lovePrediction: true,
        careerPrediction: true,
        healthPrediction: true,
      },
    });
  } catch (error) {
    console.error("Astrology zodiac fetch error:", error);
  }

  const sortedHoroscopes = zodiacOrder
    .map((sign) => horoscopes.find((item) => item.zodiacSign === sign))
    .filter(isHoroscopeItem);

  return (
    <section
      aria-labelledby="zodiac-heading"
      className="relative mt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Large Structural Background Ambient Orbs */}
      <div 
        aria-hidden="true" 
        className="absolute left-1/4 top-0 -z-10 h-96 w-96 rounded-full bg-[#C9A227]/5 blur-3xl pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute right-1/4 bottom-1/4 -z-10 h-96 w-96 rounded-full bg-[#C9A227]/3 blur-3xl pointer-events-none" 
      />

      {/* Editorial Section Header */}
      <div className="mb-14 text-center md:text-left flex flex-col items-center md:items-start">
        <span
          className="
            inline-flex
            items-center
            rounded-full
            border
            border-[#C9A227]/30
            bg-[#C9A227]/5
            px-4
            py-1.5
            font-sans
            text-[10px]
            font-semibold
            uppercase
            tracking-widest
            text-[#8a6d12]
          "
        >
          Zodiac Intelligence
        </span>

        <h2
          id="zodiac-heading"
          className="
            mt-5
            font-serif
            text-3xl
            font-normal
            tracking-wide
            text-[#071426]
            sm:text-4xl
            md:text-5xl
            max-w-2xl
            leading-tight
          "
        >
          Today&apos;s Horoscope by Zodiac Sign
        </h2>

        {/* Tailored Premium Line Break Asset */}
        <div
          className="
            mt-6
            h-[1px]
            w-20
            bg-gradient-to-r
            from-transparent
            via-[#C9A227]/60
            to-transparent
            md:via-[#C9A227]/40
            md:to-transparent
          "
        />

        <p
          className="
            mt-6
            max-w-2xl
            font-sans
            text-sm
            leading-relaxed
            text-[#071426]/70
          "
        >
          Explore your daily cosmic guidance, planetary influence, and zodiac energy 
          calculated carefully through authentic Vedic astrology algorithms.
        </p>
      </div>

      {/* Grid Render Logic Area */}
      {sortedHoroscopes.length === 0 ? (
        /* Empty State / Loading Interface Panel */
        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-[#C9A227]/20
            bg-gradient-to-b from-white to-[#FAFAF9]/60
            p-12
            text-center
            backdrop-blur-sm
            shadow-sm
          "
        >
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#071426]/5 border border-[#C9A227]/30 text-[#C9A227] mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A227] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9A227]"></span>
            </span>
          </div>

          <h3
            className="
              font-serif
              text-xl
              font-normal
              tracking-wide
              text-[#071426]
            "
          >
            Today&apos;s horoscope updates are being prepared
          </h3>

          <p
            className="
              mt-3
              mx-auto
              max-w-md
              font-sans
              text-xs
              leading-relaxed
              text-[#071426]/60
            "
          >
            Planetary alignment data is being compiled. Zodiac configurations will appear once 
            today&apos;s chart computations match current celestial intervals.
          </p>
        </div>
      ) : (
        /* Upgraded Premium Composite Grid Display */
        <div
          className="
            grid
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          {sortedHoroscopes.map((item) => {
            const sign = item.zodiacSign ?? "Aries";

            return (
              <ZodiacCard
                key={item.id}
                sign={sign}
                slug={item.slug}
                dateRange={item.zodiacDateRange ?? fallbackDates[sign]}
                insights={{
                  love: item.lovePrediction ?? "Positive",
                  career: item.careerPrediction ?? "Growth",
                  health: item.healthPrediction ?? "Balanced",
                }}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}