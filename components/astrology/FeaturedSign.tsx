import Link from "next/link";

export default function FeaturedSign() {
  return (
    <section className="my-24">

      <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#081529] via-[#10213E] to-[#1A1333] px-8 py-14 md:px-16 text-white shadow-2xl">

        {/* Glow */}
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-yellow-400/20 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative z-10">

          <span className="inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-300">
            ⭐ Zodiac of the Day
          </span>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-2">

            {/* LEFT */}

            <div>

              <h2 className="text-5xl font-black tracking-wide">
                LEO
              </h2>

              <p className="mt-3 text-xl text-yellow-300">
                July 23 – August 22
              </p>

              <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
                The stars encourage bold decisions today.
                Confidence, leadership and positive energy
                can open new opportunities in your personal
                and professional life.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">

                <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-wider text-slate-400">
                    Lucky Number
                  </p>

                  <p className="mt-2 text-3xl font-bold text-yellow-300">
                    9
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-wider text-slate-400">
                    Lucky Color
                  </p>

                  <p className="mt-2 text-3xl font-bold text-yellow-300">
                    Gold
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-wider text-slate-400">
                    Planet
                  </p>

                  <p className="mt-2 text-3xl font-bold text-yellow-300">
                    Sun
                  </p>
                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">

              <h3 className="text-2xl font-bold">
                Today's Ratings
              </h3>

              <div className="mt-8 space-y-5">

                <Rating label="❤️ Love" value={95} />
                <Rating label="💼 Career" value={97} />
                <Rating label="💰 Finance" value={88} />
                <Rating label="🩺 Health" value={84} />
                <Rating label="😊 Mood" value={91} />

              </div>

              <Link
                href="/astrology"
                className="mt-10 inline-flex rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 px-8 py-4 font-bold text-slate-900 transition hover:scale-105"
              >
                Read Full Horoscope →
              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

function Rating({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>

      <div className="mb-2 flex justify-between">

        <span>{label}</span>

        <span>{value}%</span>

      </div>

      <div className="h-3 rounded-full bg-white/10">

        <div
          className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500"
          style={{
            width: `${value}%`,
          }}
        />

      </div>

    </div>
  );
}