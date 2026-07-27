import Link from "next/link";

export default function NewsletterCTA() {
  return (
    <section className="my-28">

      <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#081529] via-[#10213E] to-[#1A1333] px-8 py-16 md:px-16 text-white shadow-2xl">

        {/* Background Glow */}
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-yellow-400/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

        {/* Stars */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-[8%] top-[18%] h-1.5 w-1.5 rounded-full bg-white" />
          <div className="absolute left-[22%] top-[65%] h-1 w-1 rounded-full bg-white" />
          <div className="absolute left-[70%] top-[15%] h-2 w-2 rounded-full bg-yellow-300" />
          <div className="absolute left-[90%] top-[38%] h-1.5 w-1.5 rounded-full bg-white" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">

          <span className="inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-2 text-sm font-semibold text-yellow-300">
            🌙 Daily Horoscope Updates
          </span>

          <h2 className="mt-6 text-4xl font-bold md:text-5xl">
            Never Miss Tomorrow's Horoscope
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Receive daily horoscope updates, astrology insights,
            festival information and spiritual articles directly
            from Nation Path.
          </p>

          <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 md:flex-row">

            <input
              type="email"
              placeholder="Enter your email address"
              className="h-14 flex-1 rounded-2xl border border-white/20 bg-white/10 px-6 text-white placeholder:text-slate-300 outline-none backdrop-blur"
            />

            <button
              className="h-14 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 px-8 font-bold text-slate-900 transition duration-300 hover:scale-105"
            >
              Subscribe
            </button>

          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-slate-300">

            <div>✨ Daily Horoscope</div>

            <div>🪔 Festivals</div>

            <div>📿 Spiritual Articles</div>

            <div>🔮 Astrology Insights</div>

          </div>

          <div className="mt-10">

            <Link
              href="/newsletter"
              className="text-yellow-300 hover:text-yellow-200 underline underline-offset-4"
            >
              Learn more about our Newsletter →
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}