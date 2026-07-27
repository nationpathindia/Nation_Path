const facts = [
  {
    icon: "♈",
    title: "12 Zodiac Signs",
    description:
      "Every zodiac sign has unique strengths, challenges and personality traits influenced by planetary movements.",
  },
  {
    icon: "🪐",
    title: "9 Planetary Influences",
    description:
      "Sun, Moon and the Navagrahas shape daily energies that astrologers use to prepare horoscope predictions.",
  },
  {
    icon: "🌙",
    title: "Daily Cosmic Energy",
    description:
      "Planetary transits change every day, bringing different opportunities for love, career, health and finances.",
  },
  {
    icon: "⭐",
    title: "Guidance, Not Destiny",
    description:
      "Horoscopes offer guidance based on astrological principles to help you plan your day with greater awareness.",
  },
];

export default function AstrologyFacts() {
  return (
    <section className="my-24">

      <div className="text-center">

        <span className="inline-flex rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
          ✨ Astrology Insights
        </span>

        <h2 className="mt-5 text-4xl font-bold text-slate-900">
          Discover the World of Astrology
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-slate-600 leading-8">
          Astrology combines planetary positions with traditional
          interpretations to provide daily guidance for every zodiac sign.
          Explore the fundamentals behind horoscope predictions.
        </p>

      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

        {facts.map((fact) => (

          <div
            key={fact.title}
            className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-yellow-300 hover:shadow-2xl"
          >

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-400 text-3xl shadow-lg transition-transform duration-500 group-hover:scale-110">
              {fact.icon}
            </div>

            <h3 className="mt-6 text-xl font-bold text-slate-900">
              {fact.title}
            </h3>

            <p className="mt-4 text-slate-600 leading-7">
              {fact.description}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}