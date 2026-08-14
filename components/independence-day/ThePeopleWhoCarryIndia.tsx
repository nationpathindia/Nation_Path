"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  ChevronLeft,
  ChevronRight,
  Heart,
  Microscope,
  Music2,
  Pause,
  Play,
  Sprout,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { ImgHTMLAttributes } from "react";

type PeopleStory = {
  id: string;
  number: string;
  category: string;
  kicker: string;
  title: string;
  description: string;
  detail: string;
  people: string;
  places: string;
  impact: string;
  images: string[];
  captions: string[];
  icon: LucideIcon;
  accent: string;
};

const AUTO_PLAY_DURATION = 7000;

const fallbackImage =
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=85";

/* ========================================================================= */
/*                               STORY CONTENT                               */
/* ========================================================================= */

const peopleStories: PeopleStory[] = [
  {
    id: "hands",
    number: "01",
    category: "THE HANDS",
    kicker: "THE PEOPLE WHO MAKE",
    title: "India is built by working hands.",
    description:
      "Before a milestone becomes a headline, millions of people have already done the work behind it.",
    detail:
      "Farmers grow what the country eats. Workers build what cities depend on. Artisans preserve skills that machines cannot replace. Everyday India keeps moving because someone, somewhere, is making it happen.",
    people: "Farmers · workers · artisans · builders",
    places: "Fields · factories · workshops · streets",
    impact: "The everyday economy",
    images: [
      "https://images.pexels.com/photos/20445213/pexels-photo-20445213.jpeg?auto=compress&cs=tinysrgb&w=1800",
      "https://images.pexels.com/photos/20344371/pexels-photo-20344371.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/20527525/pexels-photo-20527525.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/20445206/pexels-photo-20445206.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    captions: [
      "The work behind everyday India",
      "Fields and livelihoods",
      "Hands that keep India growing",
      "Work that builds tomorrow",
    ],
    icon: Sprout,
    accent: "#138808",
  },

  {
    id: "minds",
    number: "02",
    category: "THE MINDS",
    kicker: "THE PEOPLE WHO QUESTION",
    title: "India's future begins with a question.",
    description:
      "In laboratories, classrooms and workshops, people are constantly asking what can be done differently — and what comes next.",
    detail:
      "Scientists, engineers, teachers, students and innovators are extending what India can imagine and create. A question becomes an experiment, an experiment becomes an idea, and an idea can change millions of lives.",
    people: "Scientists · teachers · engineers · students",
    places: "Labs · classrooms · universities · technology centres",
    impact: "Ideas becoming tomorrow",
    images: [
      "https://images.pexels.com/photos/6132245/pexels-photo-6132245.jpeg?auto=compress&cs=tinysrgb&w=1800",
      "https://images.pexels.com/photos/14797915/pexels-photo-14797915.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85",
    ],
    captions: [
      "Questions becoming discoveries",
      "Research in motion",
      "Learning the next possibility",
      "Ideas finding their way forward",
    ],
    icon: Microscope,
    accent: "#163C80",
  },

  {
    id: "voices",
    number: "03",
    category: "THE VOICES",
    kicker: "THE PEOPLE WHO EXPRESS",
    title: "India remembers through its voices.",
    description:
      "A country carries its memory through the people who sing, write, perform, paint, dance and tell its stories.",
    detail:
      "From classical traditions to folk music, cinema, literature, craft and contemporary art, India's cultural life is constantly being rewritten. Every generation inherits a voice — and then adds something of its own.",
    people: "Musicians · artists · writers · performers",
    places: "Stages · streets · studios · festivals",
    impact: "Memory across generations",
    images: [
      "https://images.pexels.com/photos/17564787/pexels-photo-17564787.jpeg?auto=compress&cs=tinysrgb&w=1800",
      "https://images.pexels.com/photos/35500953/pexels-photo-35500953.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/15828318/pexels-photo-15828318.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/28436793/pexels-photo-28436793.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    captions: [
      "A culture that keeps speaking",
      "Tradition in motion",
      "The stage becomes memory",
      "New voices, old echoes",
    ],
    icon: Music2,
    accent: "#D96F0A",
  },

  {
    id: "spirit",
    number: "04",
    category: "THE SPIRIT",
    kicker: "THE PEOPLE WHO KEEP SHOWING UP",
    title: "India plays with a spirit of its own.",
    description:
      "Every victory begins long before the scoreboard — with practice, discipline, pressure and the decision to keep going.",
    detail:
      "From cricket grounds to athletics tracks, wrestling arenas to badminton courts, Indian athletes carry more than a sport. They carry expectation, resilience and the belief that the next attempt can change everything.",
    people: "Players · athletes · coaches · champions",
    places: "Stadiums · grounds · tracks · training halls",
    impact: "A sporting nation in motion",
    images: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Indian%20cricket%20team.jpg?width=1800",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Neeraj%20Chopra.jpg?width=1200",
      "https://commons.wikimedia.org/wiki/Special:FilePath/India%20women%27s%20national%20cricket%20team%20poses%20with%20the%202025%20Women%27s%20Cricket%20World%20Cup%20trophy%20at%207%2C%20Lok%20Kalyan%20Marg.jpg?width=1200",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Team%20india.jpg?width=1200",
    ],
    captions: [
      "India takes the field",
      "Excellence beyond the scoreboard",
      "Indian women rewriting the game",
      "The next generation steps forward",
    ],
    icon: Trophy,
    accent: "#FF9933",
  },
];

/* ========================================================================= */
/*                                SAFE IMAGE                                 */
/* ========================================================================= */

function SafeImage({
  src,
  alt,
  className,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  const [imageSrc, setImageSrc] = useState(src || fallbackImage);

  useEffect(() => {
    setImageSrc(src || fallbackImage);
  }, [src]);

  return (
    <img
      {...props}
      src={imageSrc}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => {
        if (imageSrc !== fallbackImage) {
          setImageSrc(fallbackImage);
        }
      }}
    />
  );
}

/* ========================================================================= */
/*                             IMAGE LAYER                                   */
/* ========================================================================= */

function ImageLayer({ story }: { story: PeopleStory }) {
  const images = [
    story.images[0] || fallbackImage,
    story.images[1] || fallbackImage,
    story.images[2] || fallbackImage,
    story.images[3] || fallbackImage,
  ];

  const captions = [
    story.captions[0] || "",
    story.captions[1] || "",
    story.captions[2] || "",
    story.captions[3] || "",
  ];

  return (
    <div className="relative min-h-[500px] overflow-hidden bg-[#101827] sm:min-h-[560px] lg:min-h-[610px]">
      <motion.div
        key={`${story.id}-main`}
        initial={{ opacity: 0, scale: 1.07 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0"
      >
        <SafeImage
          src={images[0]}
          alt={captions[0]}
          className="h-full w-full object-cover"
        />
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,153,51,0.18) 0%, rgba(22,60,128,0.02) 48%, rgba(19,136,8,0.18) 100%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#101827] via-[#101827]/25 to-transparent opacity-95" />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-36 bg-gradient-to-b from-black/45 to-transparent" />

      <div className="absolute left-4 right-4 top-4 z-40 flex items-start justify-between gap-3 sm:left-7 sm:right-7 sm:top-7">
        <div className="flex items-center gap-2 border border-white/20 bg-[#101827]/55 px-3 py-2 backdrop-blur-xl">
          <span className="text-[7px] font-black tracking-[0.2em] text-white/90">
            INDIA @ 80
          </span>

          <span
            className="h-1 w-1 rounded-full"
            style={{ background: story.accent }}
          />

          <span className="text-[7px] font-black tracking-[0.2em] text-white/50">
            {story.number} / 04
          </span>
        </div>

        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-[#101827]/45 text-white backdrop-blur-xl"
          style={{
            boxShadow: `0 0 0 5px ${story.accent}18`,
          }}
        >
          <story.icon size={17} strokeWidth={1.35} />
        </div>
      </div>

      <motion.div
        key={`${story.id}-image-2`}
        initial={{ opacity: 0, x: 25, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute right-4 top-[88px] z-30 h-[25%] w-[32%] overflow-hidden border-2 border-[#F3EDE2] shadow-[0_18px_45px_rgba(0,0,0,0.34)] sm:right-7 sm:top-[96px]"
      >
        <SafeImage
          src={images[1]}
          alt={captions[1]}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#FF9933]/10 to-[#138808]/10" />
      </motion.div>

      <motion.div
        key={`${story.id}-image-3`}
        initial={{ opacity: 0, x: 25, y: 12 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 0.18 }}
        className="absolute right-4 top-[37%] z-30 h-[22%] w-[28%] overflow-hidden border-2 border-[#F3EDE2] shadow-[0_18px_45px_rgba(0,0,0,0.34)] sm:right-7"
      >
        <SafeImage
          src={images[2]}
          alt={captions[2]}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#163C80]/10 to-transparent" />
      </motion.div>

      <motion.div
        key={`${story.id}-image-4`}
        initial={{ opacity: 0, x: -18, y: 18 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 0.26 }}
        className="absolute bottom-[126px] left-4 z-30 h-[18%] w-[30%] overflow-hidden border-2 border-[#F3EDE2] shadow-[0_18px_45px_rgba(0,0,0,0.34)] sm:bottom-[135px] sm:left-7"
      >
        <SafeImage
          src={images[3]}
          alt={captions[3]}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#FF9933]/10 to-[#138808]/10" />
      </motion.div>

      <div className="pointer-events-none absolute right-[6%] top-[30%] z-20 hidden select-none text-[7rem] font-black leading-none tracking-[-0.1em] text-white/[0.07] sm:block lg:text-[8rem]">
        {story.number}
      </div>

      <div className="absolute bottom-6 left-4 z-40 max-w-[59%] sm:bottom-8 sm:left-7 sm:max-w-[56%]">
        <motion.p
          key={`${story.id}-category`}
          initial={{ opacity: 0, y: 7 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-[8px] font-black tracking-[0.23em]"
          style={{ color: story.accent }}
        >
          {story.category}
        </motion.p>

        <motion.p
          key={`${story.id}-caption`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mt-2 text-[1.35rem] font-black leading-[0.98] tracking-[-0.045em] text-white sm:text-[1.85rem]"
        >
          {captions[0]}
        </motion.p>
      </div>

      <div className="absolute bottom-7 right-5 z-40 hidden w-[27%] flex-col gap-1.5 sm:flex">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="border border-white/10 bg-[#101827]/60 px-2.5 py-2 backdrop-blur-xl"
          >
            <p className="truncate text-[6px] font-black uppercase tracking-[0.1em] text-white/65">
              {captions[index]}
            </p>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 right-0 top-0 z-40 hidden w-8 items-center justify-center border-l border-white/10 bg-black/10 lg:flex">
        <span className="rotate-90 whitespace-nowrap text-[7px] font-black uppercase tracking-[0.25em] text-white/35">
          THE PEOPLE WHO CARRY INDIA
        </span>
      </div>

      <div
        className="absolute bottom-0 left-0 z-40 h-1.5"
        style={{
          width: "42%",
          background: story.accent,
        }}
      />
    </div>
  );
}

/* ========================================================================= */
/*                        EDITORIAL BACKGROUND                               */
/* ========================================================================= */

function EditorialBackground({ story }: { story: PeopleStory }) {
  return (
    <>
      <motion.div
        key={`${story.id}-editorial-image`}
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 0.27, scale: 1 }}
        transition={{
          duration: 0.9,
          ease: "easeOut",
        }}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <SafeImage
          src={story.images[0] || fallbackImage}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover grayscale"
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[#F0E8DC]/55" />

      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(90deg, rgba(240,232,220,0.66) 0%, rgba(240,232,220,0.36) 48%, rgba(240,232,220,0.58) 100%)",
        }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 z-[3]"
        animate={{
          opacity: [0.55, 0.82, 0.55],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background:
            "linear-gradient(180deg, rgba(255,153,51,0.12) 0%, rgba(248,244,236,0.01) 48%, rgba(19,136,8,0.13) 100%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-[4] opacity-[0.045] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(rgba(22,60,128,0.65) 0.55px, transparent 0.55px)",
          backgroundSize: "5px 5px",
        }}
      />

      <motion.div
        key={`${story.id}-glow`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pointer-events-none absolute -right-24 top-1/3 z-[4] h-72 w-72 rounded-full blur-3xl"
        style={{
          background: `${story.accent}18`,
        }}
      />
    </>
  );
}

/* ========================================================================= */
/*                         MAIN COMPONENT                                    */
/* ========================================================================= */

export default function ThePeopleWhoCarryIndia() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeStory = peopleStories[activeIndex] ?? peopleStories[0];

  const ActiveIcon = activeStory.icon;

  /* ----------------------------------------------------------------------- */
  /* NEXT / PREVIOUS                                                         */
  /* ----------------------------------------------------------------------- */

  const goToNextStory = useCallback(() => {
    setActiveIndex((current) => (current + 1) % peopleStories.length);
  }, []);

  const goToPreviousStory = useCallback(() => {
    setActiveIndex(
      (current) =>
        (current - 1 + peopleStories.length) % peopleStories.length,
    );
  }, []);

  /* ----------------------------------------------------------------------- */
  /* AUTO PLAY                                                               */
  /* ----------------------------------------------------------------------- */

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(
      goToNextStory,
      AUTO_PLAY_DURATION,
    );

    return () => {
      window.clearInterval(timer);
    };
  }, [isPaused, goToNextStory, activeIndex]);

  /* ----------------------------------------------------------------------- */
  /* KEYBOARD                                                                */
  /* ----------------------------------------------------------------------- */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        goToNextStory();
      }

      if (event.key === "ArrowLeft") {
        goToPreviousStory();
      }

      if (event.key === " ") {
        event.preventDefault();
        setIsPaused((value) => !value);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToNextStory, goToPreviousStory]);

  const selectStory = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section
      id="people-who-carry-india"
      className="relative overflow-hidden bg-[#F3EDE2] py-14 sm:py-16 lg:py-20"
      aria-labelledby="people-story-title"
    >
      {/* SUBTLE SECTION ATMOSPHERE */}

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-40"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,153,51,0.09), transparent)",
        }}
      />

      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-56 w-[70%] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "linear-gradient(90deg, rgba(19,136,8,0.08), rgba(22,60,128,0.04))",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* ================================================================= */}
        {/* HEADER                                                            */}
        {/* ================================================================= */}

        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-[#FF9933]" />

              <span className="text-[9px] font-black tracking-[0.28em] text-[#138808]">
                THE HUMAN STORY
              </span>
            </motion.div>

            <motion.h2
              id="people-story-title"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.55,
              }}
              className="mt-3 max-w-4xl text-[clamp(2.2rem,5vw,4.7rem)] font-black leading-[0.9] tracking-[-0.068em] text-[#163C80]"
            >
              India is carried{" "}
              <span className="text-[#D96F0A]">by its people.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.45,
                delay: 0.08,
              }}
              className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7"
            >
              Behind every milestone is a person — teaching, building,
              creating, caring, competing or simply showing up.
            </motion.p>
          </div>

          {/* LIVE CHAPTER INDICATOR */}

          <motion.div
            initial={{ opacity: 0, x: 14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.45,
            }}
            className="flex items-center gap-3 border-l border-[#163C80]/10 pl-4"
          >
            <motion.div
              animate={{
                boxShadow: [
                  `0 0 0 0 ${activeStory.accent}00`,
                  `0 0 0 6px ${activeStory.accent}12`,
                  `0 0 0 0 ${activeStory.accent}00`,
                ],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#163C80]/10 bg-[#F3EDE2] text-[#163C80]"
            >
              <ActiveIcon size={18} strokeWidth={1.5} />
            </motion.div>

            <div>
              <p className="text-[7px] font-black uppercase tracking-[0.2em] text-[#101827]/30">
                Now exploring
              </p>

              <div className="mt-1 flex items-center gap-2">
                <p
                  className="text-2xl font-black leading-none tracking-[-0.05em]"
                  style={{
                    color: activeStory.accent,
                  }}
                >
                  {activeStory.number}
                </p>

                <span className="text-[8px] font-black uppercase tracking-[0.14em] text-[#163C80]/45">
                  {activeStory.category.replace("THE ", "")}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ================================================================= */}
        {/* MAIN FRAME                                                        */}
        {/* ================================================================= */}

        <div
          className="mt-8 overflow-hidden border border-[#163C80]/10 bg-[#EDE4D6] shadow-[0_30px_100px_rgba(22,60,128,0.08)]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* TRICOLOUR TOP STRIPE */}

          <motion.div
            className="h-1 w-[140%]"
            animate={{
              x: ["-12%", "0%", "-12%"],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background:
                "linear-gradient(90deg, #FF9933 0%, #FF9933 33%, #F8F4EC 33%, #F8F4EC 66%, #138808 66%, #138808 100%)",
            }}
          />

          {/* ================================================================= */}
          {/* STORY NAVIGATION                                                  */}
          {/* ================================================================= */}

          <div className="relative border-b border-[#163C80]/10 bg-[#EDE4D6]">
            <div className="grid grid-cols-2 sm:grid-cols-4">
              {peopleStories.map((story, index) => {
                const active = index === activeIndex;

                return (
                  <button
                    key={story.id}
                    type="button"
                    onClick={() => selectStory(index)}
                    aria-current={active ? "step" : undefined}
                    aria-label={`Explore chapter ${story.number}: ${story.category}`}
                    className={`
                      group relative flex min-h-[84px] items-center gap-3
                      border-b border-[#163C80]/10 px-4 text-left
                      transition-all duration-300
                      sm:min-h-[90px] sm:border-b-0 sm:border-r sm:px-5
                      ${
                        active
                          ? "bg-[#E5DACB]"
                          : "bg-[#EDE4D6] hover:bg-[#E7DCCD]"
                      }
                    `}
                  >
                    {active && (
                      <motion.span
                        layoutId="peopleActiveLine"
                        className="absolute inset-x-0 top-0 h-1"
                        style={{
                          background: story.accent,
                        }}
                      />
                    )}

                    <div className="relative shrink-0">
                      <span
                        className={`text-[11px] font-black tabular-nums transition-colors ${
                          active
                            ? "text-[#D96F0A]"
                            : "text-[#101827]/25"
                        }`}
                      >
                        {story.number}
                      </span>

                      {active && (
                        <motion.span
                          layoutId="chapterDot"
                          className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full"
                          style={{
                            background: story.accent,
                          }}
                        />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-[9px] font-black tracking-[0.15em] ${
                          active
                            ? "text-[#163C80]"
                            : "text-[#101827]/45 group-hover:text-[#163C80]"
                        }`}
                      >
                        {story.category.replace("THE ", "")}
                      </p>

                      <p className="mt-1 hidden truncate text-[7px] font-semibold text-[#101827]/30 sm:block">
                        {story.kicker}
                      </p>

                      <div className="mt-3 h-[2px] w-full overflow-hidden bg-[#163C80]/[0.07]">
                        {active && !isPaused && (
                          <motion.div
                            key={`${story.id}-${activeIndex}`}
                            initial={{
                              width: "0%",
                            }}
                            animate={{
                              width: "100%",
                            }}
                            transition={{
                              duration:
                                AUTO_PLAY_DURATION / 1000,
                              ease: "linear",
                            }}
                            className="h-full"
                            style={{
                              background: story.accent,
                            }}
                          />
                        )}

                        {active && isPaused && (
                          <div
                            className="h-full w-[38%]"
                            style={{
                              background: story.accent,
                            }}
                          />
                        )}
                      </div>
                    </div>

                    {active && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          scale: 0.8,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        className="hidden shrink-0 sm:block"
                      >
                        <ArrowUpRight
                          size={14}
                          className="text-[#163C80]/40"
                        />
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* NAV CONTROLS */}

            <div className="flex items-center justify-between border-t border-[#163C80]/10 px-3 py-2 sm:absolute sm:bottom-2 sm:right-3 sm:border-0 sm:p-0">
              <span className="text-[6px] font-black uppercase tracking-[0.18em] text-[#101827]/25 sm:hidden">
                {isPaused ? "Paused" : "Auto story"}
              </span>

              <div className="ml-auto flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={goToPreviousStory}
                  aria-label="Previous story"
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-[#163C80]/10 bg-[#F3EDE2]/70 text-[#163C80]/55 transition hover:bg-[#F3EDE2] hover:text-[#163C80]"
                >
                  <ChevronLeft size={11} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setIsPaused((value) => !value)
                  }
                  aria-label={
                    isPaused
                      ? "Resume stories"
                      : "Pause stories"
                  }
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-[#163C80]/10 bg-[#F3EDE2]/70 text-[#163C80]/55 transition hover:bg-[#F3EDE2] hover:text-[#163C80]"
                >
                  {isPaused ? (
                    <Play size={9} fill="currentColor" />
                  ) : (
                    <Pause size={9} />
                  )}
                </button>

                <button
                  type="button"
                  onClick={goToNextStory}
                  aria-label="Next story"
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-[#163C80]/10 bg-[#F3EDE2]/70 text-[#163C80]/55 transition hover:bg-[#F3EDE2] hover:text-[#163C80]"
                >
                  <ChevronRight size={11} />
                </button>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* ACTIVE STORY                                                       */}
          {/* ================================================================= */}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStory.id}
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -8,
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid lg:grid-cols-[0.92fr_1.08fr]"
            >
              {/* =========================================================== */}
              {/* LEFT EDITORIAL PANEL                                         */}
              {/* =========================================================== */}

              <div className="relative flex min-h-[520px] flex-col overflow-hidden bg-[#F0E8DC] lg:min-h-[610px]">
                <EditorialBackground story={activeStory} />

                <div
                  className="pointer-events-none absolute inset-y-0 left-0 z-30 w-[4px]"
                  style={{
                    background:
                      "linear-gradient(to bottom, #FF9933 0%, #F8F4EC 50%, #138808 100%)",
                  }}
                />

                <div className="pointer-events-none absolute -right-5 -top-10 z-[5] select-none text-[160px] font-black leading-none tracking-[-0.1em] text-[#163C80]/[0.045]">
                  {activeStory.number}
                </div>

                <div className="relative z-10 flex h-full flex-1 flex-col p-6 sm:p-8 lg:p-10">
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="inline-flex items-center gap-3 border px-3 py-2 shadow-sm backdrop-blur-xl"
                      style={{
                        borderColor: `${activeStory.accent}30`,
                        background:
                          "rgba(240,232,220,0.52)",
                      }}
                    >
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#F0E8DC]/60"
                        style={{
                          color: activeStory.accent,
                        }}
                      >
                        <ActiveIcon
                          size={16}
                          strokeWidth={1.5}
                        />
                      </div>

                      <div>
                        <p
                          className="text-[8px] font-black tracking-[0.2em]"
                          style={{
                            color: activeStory.accent,
                          }}
                        >
                          {activeStory.kicker}
                        </p>

                        <p className="mt-0.5 text-[7px] font-black uppercase tracking-[0.16em] text-[#101827]/30">
                          Chapter {activeStory.number}
                        </p>
                      </div>
                    </div>

                    <div className="hidden text-right sm:block">
                      <p className="text-[7px] font-black uppercase tracking-[0.18em] text-[#101827]/25">
                        India @ 80
                      </p>

                      <p
                        className="mt-1 text-xl font-black leading-none"
                        style={{
                          color: activeStory.accent,
                        }}
                      >
                        {activeStory.number}
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 overflow-hidden">
                    <motion.h3
                      key={`${activeStory.id}-title`}
                      initial={{
                        opacity: 0,
                        x: -12,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration: 0.45,
                        delay: 0.05,
                      }}
                      className="max-w-[560px] text-[clamp(1.55rem,2.7vw,2.4rem)] font-black leading-[0.98] tracking-[-0.055em] text-[#163C80]"
                    >
                      {activeStory.title}
                    </motion.h3>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <motion.span
                      animate={{
                        width: [48, 64, 48],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="h-1"
                      style={{
                        background: activeStory.accent,
                      }}
                    />

                    <span className="h-px flex-1 bg-[#163C80]/10" />

                    <span className="text-[7px] font-black uppercase tracking-[0.18em] text-[#101827]/25">
                      Human story
                    </span>
                  </div>

                  <motion.p
                    key={`${activeStory.id}-description`}
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: 0.1,
                    }}
                    className="mt-6 max-w-xl text-[14px] font-semibold leading-6 text-[#101827]/70 sm:text-[15px] sm:leading-7"
                  >
                    {activeStory.description}
                  </motion.p>

                  <motion.div
                    key={`${activeStory.id}-detail`}
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: 0.15,
                    }}
                    className="relative mt-5 overflow-hidden border border-white/40 bg-[#F5EEE4]/40 p-5 shadow-[0_12px_35px_rgba(22,60,128,0.045)] backdrop-blur-[10px]"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-[#163C80]/[0.025]" />

                    <div
                      className="absolute left-0 top-0 h-full w-[3px]"
                      style={{
                        background: activeStory.accent,
                      }}
                    />

                    <p className="relative z-10 pl-1 text-[11px] leading-5 text-[#101827]/60 sm:text-[12px] sm:leading-6">
                      {activeStory.detail}
                    </p>
                  </motion.div>

                  <div className="mt-auto pt-6">
                    <div className="grid grid-cols-3 gap-px overflow-hidden border border-white/40 bg-[#163C80]/10 backdrop-blur-sm">
                      {[
                        {
                          label: "People",
                          value: activeStory.people,
                          accent: "#138808",
                        },
                        {
                          label: "Places",
                          value: activeStory.places,
                          accent: "#D96F0A",
                        },
                        {
                          label: "Impact",
                          value: activeStory.impact,
                          accent: "#163C80",
                        },
                      ].map((item) => (
                        <motion.div
                          key={item.label}
                          whileHover={{ y: -2 }}
                          className="relative overflow-hidden bg-white/[0.18] p-3 backdrop-blur-[8px] transition-colors hover:bg-white/[0.28] sm:p-4"
                        >
                          <div
                            className="pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent"
                            style={{
                              backgroundColor: `${item.accent}08`,
                            }}
                          />

                          <p
                            className="relative text-[7px] font-black uppercase tracking-[0.18em]"
                            style={{
                              color: item.accent,
                            }}
                          >
                            {item.label}
                          </p>

                          <p className="relative mt-2 text-[8px] font-semibold leading-4 text-[#101827]/60 sm:text-[9px]">
                            {item.value}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="border border-white/40 bg-white/[0.16] px-2.5 py-1 text-[7px] font-black tracking-[0.13em] text-[#163C80]/55 backdrop-blur-md">
                          PEOPLE
                        </span>

                        <span className="border border-white/40 bg-white/[0.16] px-2.5 py-1 text-[7px] font-black tracking-[0.13em] text-[#163C80]/55 backdrop-blur-md">
                          INDIA @ 80
                        </span>
                      </div>

                      <motion.div
                        animate={{
                          x: [0, 4, 0],
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/[0.16] text-[#163C80] backdrop-blur-md"
                      >
                        <ArrowUpRight size={14} />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>

              {/* =========================================================== */}
              {/* RIGHT IMAGE                                                   */}
              {/* =========================================================== */}

              <ImageLayer story={activeStory} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ================================================================= */}
        {/* CLOSING                                                           */}
        {/* ================================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.45,
          }}
          className="mt-6 flex flex-col gap-4 border-t border-[#163C80]/10 pt-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-lg font-black tracking-[-0.035em] text-[#163C80] sm:text-xl">
              Millions of lives.
              <span className="text-[#D96F0A]">
                {" "}
                One shared journey.
              </span>
            </p>

            <p className="mt-1 text-[7px] font-black uppercase tracking-[0.2em] text-[#101827]/25">
              The people behind the idea of India
            </p>
          </div>

          <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.15em] text-[#163C80]/30">
            <span>04 layers</span>

            <ArrowRight size={12} />

            <span>One India</span>
          </div>
        </motion.div>

        {/* ================================================================= */}
        {/* EDITORIAL NOTE                                                    */}
        {/* ================================================================= */}

        <div className="mt-4 flex items-start gap-2 text-[7px] leading-4 text-[#101827]/20">
          <Brain size={11} className="mt-0.5 shrink-0" />

          <p>
            A visual chapter about the people whose work,
            imagination, expression and sporting spirit keep
            India moving.
          </p>
        </div>

        {/* FINAL MICRO SIGNATURE */}

        <div className="mt-8 flex items-center justify-center gap-2 opacity-40">
          <span className="h-px w-10 bg-[#FF9933]" />

          <Heart
            size={10}
            strokeWidth={1.4}
            className="text-[#163C80]"
          />

          <span className="h-px w-10 bg-[#138808]" />
        </div>
      </div>
    </section>
  );
}