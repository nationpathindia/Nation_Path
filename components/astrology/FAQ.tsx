"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How are daily horoscope predictions prepared?",
    answer:
      "Daily horoscope predictions are based on traditional astrological principles, planetary movements and zodiac sign interpretations. They are intended as guidance for the day rather than guaranteed outcomes.",
  },
  {
    question: "Are horoscope predictions accurate?",
    answer:
      "Astrology provides symbolic guidance that many people use for reflection and planning. Individual experiences may differ depending on personal circumstances and choices.",
  },
  {
    question: "When is today's horoscope updated?",
    answer:
      "Nation Path publishes fresh horoscope predictions every morning so readers can begin their day with updated astrological guidance.",
  },
  {
    question: "Which zodiac sign is the luckiest today?",
    answer:
      "The featured sign changes daily based on the overall planetary influences. Check the 'Sign of the Day' section for today's highlighted zodiac.",
  },
  {
    question: "Can I read horoscopes for all zodiac signs?",
    answer:
      "Yes. Daily horoscope predictions are available for all twelve zodiac signs including Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius and Pisces.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="my-24">

      <div className="text-center">

        <span className="inline-flex rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
          ❓ Frequently Asked Questions
        </span>

        <h2 className="mt-5 text-4xl font-bold text-slate-900">
          Horoscope FAQs
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-slate-600 leading-8">
          Everything you need to know about daily horoscope predictions and
          zodiac guidance.
        </p>

      </div>

      <div className="mx-auto mt-14 max-w-4xl space-y-5">

        {faqs.map((faq, index) => {

          const active = open === index;

          return (
            <div
              key={faq.question}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >

              <button
                onClick={() => setOpen(active ? null : index)}
                className="flex w-full items-center justify-between px-7 py-6 text-left transition hover:bg-slate-50"
              >

                <span className="text-lg font-semibold text-slate-900">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`transition duration-300 ${
                    active ? "rotate-180" : ""
                  }`}
                />

              </button>

              <div
                className={`grid transition-all duration-500 ${
                  active
                    ? "grid-rows-[1fr]"
                    : "grid-rows-[0fr]"
                }`}
              >

                <div className="overflow-hidden">

                  <p className="px-7 pb-6 leading-8 text-slate-600">
                    {faq.answer}
                  </p>

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}