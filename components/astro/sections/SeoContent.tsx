interface SeoContentProps {
  title?: string;
}

const faqItems = [
  {
    question: "What is daily horoscope?",
    answer:
      "Daily horoscope provides astrological insights based on zodiac signs and planetary movements.",
  },
  {
    question: "What is Panchang in Vedic astrology?",
    answer:
      "Panchang is a traditional Vedic calendar that includes Tithi, Nakshatra, Yoga, Karana and other important timings.",
  },
  {
    question: "How accurate are horoscope predictions?",
    answer:
      "Horoscope readings are based on astrological interpretations and are meant for guidance and self-reflection.",
  },
];

export default function SeoContent({
  title = "About Astrology and Horoscope",
}: SeoContentProps) {
  return (
    <section
      aria-labelledby="seo-content-heading"
      className="relative mt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Editorial Ambient Background Underlay */}
      <div 
        aria-hidden="true" 
        className="absolute right-10 top-1/4 -z-10 h-96 w-96 rounded-full bg-[#C9A227]/3 blur-3xl pointer-events-none" 
      />

      <div className="max-w-4xl mx-auto md:mx-0">
        {/* Editorial Sub-header Badge */}
        <div className="text-center md:text-left flex flex-col items-center md:items-start">
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
            Knowledge & Guidance
          </span>

          <h2
            id="seo-content-heading"
            className="
              mt-5
              font-serif
              text-3xl
              font-normal
              tracking-wide
              text-[#071426]
              sm:text-4xl
              md:text-5xl
              leading-tight
            "
          >
            {title}
          </h2>

          {/* Premium Light-Leak Accent Line */}
          <div
            className="
              mt-6
              h-[1px]
              w-20
              bg-gradient-to-r
              from-transparent
              via-[#C9A227]/40
              to-transparent
            "
          />
        </div>

        {/* Clean Editorial Typographic Copy Block */}
        <div
          className="
            mt-8
            space-y-6
            font-sans
            text-sm
            leading-relaxed
            text-[#071426]/70
            text-center
            md:text-left
          "
        >
          <p>
            Astrology is an ancient system that studies planetary movements,
            celestial patterns and their traditional interpretations.
            Nation Path brings daily horoscope updates, Panchang details,
            Muhurat timings and Vedic astrology insights in a modern format.
          </p>

          <p>
            Explore zodiac predictions, lunar calculations, auspicious timings
            and astrology tools designed to provide meaningful guidance for
            everyday decisions.
          </p>

          <p>
            Our astrology section combines traditional knowledge with modern
            digital presentation to make Vedic astrology accessible for readers.
          </p>
        </div>

        {/* FAQ Section Wrapper */}
        <div className="mt-16">
          <h3
            className="
              font-serif
              text-xl
              font-normal
              tracking-wide
              text-[#071426]
              sm:text-2xl
              text-center
              md:text-left
            "
          >
            Frequently Asked Questions
          </h3>

          <div className="mt-8 space-y-4">
            {faqItems.map((item) => (
              <div
                key={item.question}
                className="
                  rounded-3xl
                  border
                  border-[#C9A227]/15
                  bg-gradient-to-b from-white to-[#FAFAF9]/40
                  p-6
                  backdrop-blur-sm
                  transition-all
                  duration-3xl
                  hover:border-[#C9A227]/40
                  hover:shadow-sm
                "
              >
                <h4
                  className="
                    font-sans
                    text-base
                    font-medium
                    text-[#071426]
                  "
                >
                  {item.question}
                </h4>

                <p
                  className="
                    mt-3
                    font-sans
                    text-sm
                    leading-relaxed
                    text-[#071426]/70
                  "
                >
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}