"use client";

import { motion } from "framer-motion";
import { useEffect, useId, useState } from "react";

import { independenceTheme } from "./IndependenceTheme";

const identity = [
  {
    label: "BORN",
    value: "15 AUGUST 1947",
    description: "A new chapter begins.",
  },
  {
    label: "AGE",
    value: "79 YEARS",
    description: "A journey shaped by generations.",
  },
];

const traits = [
  {
    number: "01",
    word: "ALWAYS MOVING",
    text: "adapting · learning · reinventing",
  },
  {
    number: "02",
    word: "CURIOUS",
    text: "discovering · questioning · imagining",
  },
  {
    number: "03",
    word: "AMBITIOUS",
    text: "building · creating · contributing",
  },
];

const portraits = [
  {
    src: "/images/independence-day/ifperson/india-neutral.png",
    label: "A nation of many identities",
  },
  {
    src: "/images/independence-day/ifperson/india-hindu.png",
    label: "Faith and tradition",
  },
  {
    src: "/images/independence-day/ifperson/india-muslim.png",
    label: "Faith and belonging",
  },
  {
    src: "/images/independence-day/ifperson/india-sikh.png",
    label: "Courage and service",
  },
  {
    src: "/images/independence-day/ifperson/india-buddhist.png",
    label: "Reflection and wisdom",
  },
  {
    src: "/images/independence-day/ifperson/india-woman.png",
    label: "The India that keeps becoming",
  },
];

function IndiaPortraitStage() {
  const rawId = useId();
  const id = rawId.replace(/:/g, "");

  const [activePortrait, setActivePortrait] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActivePortrait((current) => (current + 1) % portraits.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[500px]">
      {/* Atmosphere */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[84%] w-[84%]
          -translate-x-1/2 -translate-y-1/2 rounded-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
        style={{
          background:
            "radial-gradient(circle, rgba(255,153,51,.09) 0%, rgba(22,60,128,.035) 45%, rgba(19,136,8,.025) 65%, transparent 76%)",
        }}
      />

      {/* India Map */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 z-[2]
          h-[78%] w-[61%] -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-[5%] rounded-[48%]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(22,60,128,.07), transparent 68%)",
            filter: "blur(16px)",
          }}
        />

        <img
          src="/images/independence-day/india-map.svg"
          alt=""
          draggable={false}
          className="relative h-full w-full object-contain opacity-[0.13]"
          style={{
            filter:
              "brightness(0) saturate(100%) invert(18%) sepia(30%) saturate(1700%) hue-rotate(181deg) brightness(82%) contrast(90%)",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            WebkitMaskImage:
              "url('/images/independence-day/india-map.svg')",
            maskImage:
              "url('/images/independence-day/india-map.svg')",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            background:
              "linear-gradient(to bottom,#FF9933 0%,#FF9933 33%,#fff 33%,#fff 66%,#138808 66%,#138808 100%)",
          }}
        />

        {/* Moving map energy */}
        <svg
          viewBox="0 0 360 460"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        >
          <defs>
            <linearGradient
              id={`${id}-map-line`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FF9933" />
              <stop offset="45%" stopColor="#163C80" />
              <stop offset="72%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#138808" />
            </linearGradient>
          </defs>

          <path
            d="M180 32 C226 46 269 77 287 123 C303 164 300 208 285 245
            C270 282 279 314 294 347 C307 376 296 409 267 429
            C239 449 203 445 177 431 C150 417 123 402 104 374
            C83 344 73 310 69 275 C64 234 69 194 82 153
            C97 103 124 56 180 32Z"
            fill="none"
            stroke="#163C80"
            strokeOpacity=".04"
            strokeWidth="1"
          />

          <motion.path
            d="M180 32 C226 46 269 77 287 123 C303 164 300 208 285 245
            C270 282 279 314 294 347 C307 376 296 409 267 429
            C239 449 203 445 177 431 C150 417 123 402 104 374
            C83 344 73 310 69 275 C64 234 69 194 82 153
            C97 103 124 56 180 32Z"
            fill="none"
            stroke={`url(#${id}-map-line)`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="30 210"
            animate={{ strokeDashoffset: [0, -240] }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "linear",
            }}
            opacity=".68"
          />
        </svg>
      </motion.div>

      {/* Outer orbit */}
      <motion.svg
        viewBox="0 0 600 600"
        className="absolute inset-0 z-[4] h-full w-full"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
      >
        <defs>
          <linearGradient
            id={`${id}-orbit`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FF9933" />
            <stop offset="46%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#138808" />
          </linearGradient>
        </defs>

        <ellipse
          cx="300"
          cy="300"
          rx="238"
          ry="208"
          fill="none"
          stroke="#101827"
          strokeOpacity=".08"
          strokeWidth="1"
          strokeDasharray="2 10"
        />

        <motion.g
          animate={{ rotate: 360 }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "300px 300px" }}
        >
          <ellipse
            cx="300"
            cy="300"
            rx="222"
            ry="190"
            fill="none"
            stroke={`url(#${id}-orbit)`}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="85 55 20 175"
            opacity=".8"
          />

          <circle cx="522" cy="300" r="3.5" fill="#FF9933" />
          <circle
            cx="300"
            cy="110"
            r="2.5"
            fill="#fff"
            stroke="#163C80"
            strokeWidth="1"
          />
          <circle cx="78" cy="300" r="3.5" fill="#138808" />
        </motion.g>

        <ellipse
          cx="300"
          cy="300"
          rx="202"
          ry="172"
          fill="none"
          stroke="#163C80"
          strokeOpacity=".045"
          strokeWidth="1"
        />
      </motion.svg>

      {/* Portrait */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="relative h-[61%] w-[61%] max-w-[310px]">
          <div className="absolute inset-[-8px] rounded-full border border-[#163C80]/10" />

          <motion.div
            className="absolute inset-[-4px] rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background:
                "conic-gradient(from 0deg,#FF9933 0deg,#FF9933 118deg,#fff 118deg,#fff 238deg,#138808 238deg,#138808 360deg)",
              opacity: ".72",
            }}
          />

          <div className="absolute inset-[3px] overflow-hidden rounded-full bg-[#F2EEE6]">
            {portraits.map((portrait, index) => (
              <motion.img
                key={portrait.src}
                src={portrait.src}
                alt={portrait.label}
                draggable={false}
                className="absolute inset-0 h-full w-full select-none object-cover"
                initial={false}
                animate={{
                  opacity: activePortrait === index ? 0.92 : 0,
                  scale: activePortrait === index ? 1 : 1.015,
                }}
                transition={{
                  opacity: {
                    duration: 1.8,
                    ease: "easeInOut",
                  },
                  scale: {
                    duration: 2,
                    ease: "easeOut",
                  },
                }}
              />
            ))}

            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom,transparent 55%,rgba(16,24,39,.08) 100%)",
              }}
            />
          </div>

          <motion.span
            className="absolute bottom-[8%] right-[8%] z-20 h-2.5 w-2.5
              rounded-full border-2 border-[#FAF7F1] bg-[#FF9933]"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      {/* Caption */}
      <motion.div
        key={activePortrait}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="absolute bottom-[2%] left-1/2 z-20 -translate-x-1/2 text-center"
      >
        <p className="whitespace-nowrap text-[7px] font-black uppercase tracking-[0.18em] text-[#101827]/35">
          {portraits[activePortrait].label}
        </p>
      </motion.div>
    </div>
  );
}

export default function IndiaAsAPerson() {
  return (
    <section className="relative overflow-hidden bg-[#FAF7F1] text-[#101827]">
      {/* Tricolor rule */}
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{
          background: independenceTheme.gradients.tricolor,
        }}
      />

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-[1fr_.42fr] lg:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-[#FF9933]" />

              <span className="text-[8px] font-black tracking-[0.25em] text-[#C65F0A]">
                AN UNUSUAL PORTRAIT
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55 }}
              className="mt-4 max-w-4xl text-4xl font-black leading-[.92] tracking-[-.06em] sm:text-5xl lg:text-[5.4rem]"
            >
              If India Were
              <span className="block text-[#D96F0A]">
                a Person.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="mt-4 max-w-lg text-sm leading-6 text-[#101827]/50 sm:text-[15px]"
            >
              What if India's journey could be described not as a
              timeline, but as a life?
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="border-l border-[#101827]/10 pl-4"
          >
            <p className="text-[8px] font-black tracking-[.22em] text-[#101827]/30">
              THE IDEA
            </p>

            <p className="mt-2 max-w-xs text-base font-semibold leading-6 text-[#101827]/70">
              Not a biography.
              <br />
              <span className="text-[#101827]/35">
                A portrait of a nation.
              </span>
            </p>
          </motion.div>
        </div>

        {/* Portrait */}
        <div className="relative mt-4 grid items-center lg:grid-cols-[.65fr_1.7fr_.65fr]">
          {/* Desktop identity — left */}
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="relative pr-8 text-right"
            >
              <span className="absolute right-0 top-1/2 h-px w-12 bg-[#101827]/12" />

              <p className="text-[8px] font-black tracking-[.22em] text-[#101827]/30">
                {identity[0].label}
              </p>

              <p className="mt-1.5 text-lg font-black tracking-[-.03em]">
                {identity[0].value}
              </p>

              <p className="mt-1 text-[11px] text-[#101827]/35">
                {identity[0].description}
              </p>
            </motion.div>
          </div>

          <IndiaPortraitStage />

          {/* Desktop identity — right */}
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative pl-8"
            >
              <span className="absolute left-0 top-1/2 h-px w-12 bg-[#101827]/12" />

              <p className="text-[8px] font-black tracking-[.22em] text-[#101827]/30">
                {identity[1].label}
              </p>

              <p className="mt-1.5 text-lg font-black tracking-[-.03em]">
                {identity[1].value}
              </p>

              <p className="mt-1 text-[11px] text-[#101827]/35">
                {identity[1].description}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Mobile identity */}
        <div className="mt-0 grid grid-cols-2 gap-4 lg:hidden">
          {identity.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.07 }}
              className="border-t border-[#101827]/10 pt-3"
            >
              <p className="text-[7px] font-black tracking-[.2em] text-[#101827]/30">
                {item.label}
              </p>

              <p className="mt-1 text-sm font-black tracking-tight">
                {item.value}
              </p>

              <p className="mt-1 text-[9px] leading-4 text-[#101827]/35">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Identity */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45 }}
          className="mx-auto mt-7 max-w-sm text-center"
        >
          <span className="mx-auto block h-px w-10 bg-[#138808]" />

          <p className="mt-3 text-[7px] font-black tracking-[.22em] text-[#101827]/30">
            IDENTITY
          </p>

          <p className="mt-1 text-xl font-black tracking-[-.04em]">
            INDIA
          </p>

          <p className="mt-1 text-[10px] text-[#101827]/35">
            Many traditions. Many lives. One continuing story.
          </p>
        </motion.div>

        {/* Personality */}
        <div className="mt-8 border-t border-[#101827]/10 pt-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[8px] font-black tracking-[.22em] text-[#138808]">
                PERSONALITY
              </p>

              <h3 className="mt-1 text-lg font-black tracking-[-.04em] sm:text-xl">
                What defines the journey?
              </h3>
            </div>

            <span className="hidden text-[7px] font-black tracking-[.18em] text-[#101827]/20 sm:block">
              THEN → NOW → NEXT
            </span>
          </div>

          <div className="relative mt-4 overflow-hidden rounded-lg border border-[#101827]/10 bg-white/30">
            {/* Moving edge */}
            <div className="absolute inset-x-0 top-0 h-[2px] overflow-hidden">
              <motion.div
                className="h-full w-[35%] bg-gradient-to-r from-[#FF9933] via-white to-[#138808]"
                animate={{ x: ["-120%", "320%"] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>

            <div className="grid md:grid-cols-3">
              {traits.map((trait, index) => (
                <motion.div
                  key={trait.number}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.07,
                  }}
                  className={`relative px-4 py-3 sm:px-5 ${
                    index !== traits.length - 1
                      ? "border-b border-[#101827]/10 md:border-b-0 md:border-r"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[7px] font-black tracking-[.15em] text-[#D96F0A]">
                      {trait.number}
                    </span>

                    <h4 className="text-xs font-black tracking-[-.02em] sm:text-sm">
                      {trait.word}
                    </h4>
                  </div>

                  <p className="mt-1 text-[9px] leading-4 text-[#101827]/40">
                    {trait.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Journey */}
        <motion.div
          initial={{ opacity: 0, y: 7 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mt-5"
        >
          <div className="relative overflow-hidden rounded-lg border border-[#101827]/10 bg-white/25 px-4 py-2.5 sm:px-5">
            <div className="flex items-center justify-between">
              <span className="text-[7px] font-black tracking-[.16em] text-[#101827]/35">
                1947
              </span>

              <span className="text-[7px] font-black tracking-[.18em] text-[#101827]/20">
                THE JOURNEY
              </span>

              <span className="text-[7px] font-black tracking-[.16em] text-[#101827]/25">
                2047
              </span>
            </div>

            <div className="relative mt-2.5 h-7">
              <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[#101827]/10" />

              <motion.div
                className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-[#FF9933] via-[#163C80] to-[#138808]"
                initial={{ width: "0%" }}
                whileInView={{ width: "50%" }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />

              <span className="absolute left-0 top-1/2 z-10 h-2 w-2 -translate-y-1/2 rounded-full border border-[#FAF7F1] bg-[#FF9933]" />

              <span className="absolute left-1/2 top-1/2 z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#FAF7F1] bg-[#163C80]" />

              <span className="absolute right-0 top-1/2 z-10 h-2 w-2 -translate-y-1/2 rounded-full border border-[#FAF7F1] bg-[#138808]" />

              {/* Train */}
              <motion.div
                className="absolute left-0 top-1/2 z-20 -translate-y-1/2"
                animate={{ left: ["0%", "50%"] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatDelay: 0.8,
                  ease: "easeInOut",
                }}
              >
                <div className="relative -translate-x-1/2">
                  <motion.div
                    className="absolute left-1/2 top-1/2 h-4 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF9933]/20 blur-md"
                    animate={{ opacity: [0.25, 0.6, 0.25] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <div className="relative flex items-center gap-px">
                    <div className="h-3 w-4 rounded-[2px] border border-[#101827]/15 bg-[#FF9933]" />
                    <div className="h-2 w-2 rounded-[2px] border border-[#101827]/10 bg-white" />
                    <div className="h-2 w-2 rounded-[2px] border border-[#101827]/10 bg-[#138808]" />
                  </div>

                  <div className="absolute -bottom-1 left-1 h-1 w-1 rounded-full bg-[#101827]" />
                  <div className="absolute -bottom-1 right-1 h-1 w-1 rounded-full bg-[#101827]" />
                </div>
              </motion.div>
            </div>

            <div className="relative h-3.5">
              <span className="absolute left-0 text-[6px] font-black tracking-[.14em] text-[#101827]/25">
                INDEPENDENCE
              </span>

              <span className="absolute left-1/2 -translate-x-1/2 text-[7px] font-black tracking-[.14em] text-[#163C80]">
                2026 · INDIA @ 80
              </span>

              <span className="absolute right-0 text-[6px] font-black tracking-[.14em] text-[#101827]/25">
                NEXT CHAPTER
              </span>
            </div>
          </div>
        </motion.div>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-[8px] font-black tracking-[.22em] text-[#101827]/25">
            THE NEXT CHAPTER
          </p>

          <h3 className="mx-auto mt-2 max-w-3xl text-2xl font-black leading-[1] tracking-[-.05em] sm:text-3xl lg:text-4xl">
            And like every person,
            <span className="text-[#D96F0A]">
              {" "}
              India is still becoming.
            </span>
          </h3>
        </motion.div>
      </div>
    </section>
  );
}