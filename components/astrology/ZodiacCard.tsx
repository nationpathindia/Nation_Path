import Link from "next/link";
import ZodiacIcon from "@/components/ZodiacIcon";

interface Props {
  item: {
    id: string;
    slug: string;
    zodiacSign: string | null;
  };
}

const zodiacDates: Record<string, string> = {
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

export default function ZodiacCard({ item }: Props) {
  return (
    <Link
      href={`/astrology/${item.slug}`}
      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-yellow-300 hover:shadow-2xl"
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/0 via-yellow-100/0 to-yellow-300/10 opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        <ZodiacIcon sign={item.zodiacSign} />

        <h3 className="mt-5 text-center text-xl font-bold text-slate-900">
          {item.zodiacSign}
        </h3>

        <p className="mt-1 text-center text-sm text-slate-500">
          {zodiacDates[item.zodiacSign ?? ""] ?? ""}
        </p>

        {/* Rating */}
        <div className="mt-5 flex justify-center text-yellow-500 text-lg">
          ★★★★☆
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        <div className="space-y-2 text-sm text-slate-600">
          <div className="flex justify-between">
            <span>Love</span>
            <span>❤️</span>
          </div>

          <div className="flex justify-between">
            <span>Career</span>
            <span>💼</span>
          </div>

          <div className="flex justify-between">
            <span>Health</span>
            <span>🍀</span>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-gradient-to-r from-[#10213E] to-[#1A1333] py-3 text-center font-semibold text-white transition group-hover:from-yellow-500 group-hover:to-amber-400 group-hover:text-slate-900">
          Read Today's Horoscope →
        </div>
      </div>
    </Link>
  );
}