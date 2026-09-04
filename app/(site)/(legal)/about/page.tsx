import type { Metadata } from "next";

import {
  Globe,
  ShieldCheck,
  Lightbulb,
  Newspaper,
  SearchCheck,
  Clock3,
  MessageSquareQuote,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Layers3,
  Brain,
  Sparkles,
  GraduationCap,
  Building2,
  ChevronDown,
} from "lucide-react";


export const metadata: Metadata = {

  title:
    "About NationPath India | Independent Digital News Platform",

  description:
    "Learn about NationPath India, an independent digital news platform delivering credible news, structured context, deep analysis and editorial perspectives through verification-first journalism across India and the world.",

  alternates: {
    canonical:
      "https://nationpathindia.com/about",
  },

  openGraph: {

    title:
      "About NationPath India",

    description:
      "Discover NationPath India's mission, editorial values, structured news format, verification-first approach and digital product ecosystem.",

    url:
      "https://nationpathindia.com/about",

    siteName:
      "NationPath India",

    type:
      "website",

  },

  twitter: {

    card:
      "summary_large_image",

    title:
      "About NationPath India",

    description:
      "Learn about NationPath India's mission, editorial standards, structured news format and commitment to responsible journalism.",

  },

};


export default function AboutPage() {

  return (

    <main className="pb-20">


      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="mb-20 text-center">

        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-[#0b2a6f]/5 text-[#0b2a6f] text-sm font-medium">

          <span className="w-1.5 h-1.5 rounded-full bg-[#0b2a6f]" />

          Insight • Truth • Global View

        </div>


        <h1 className="text-4xl md:text-6xl font-serif mb-7">

          About NationPath India

        </h1>


        <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">

          <strong>NationPath India</strong> is an independent digital
          news platform focused on credible journalism, meaningful
          analysis and responsible reporting across India and the world.

        </p>


        <p className="text-gray-500 max-w-3xl mx-auto mt-5 leading-relaxed">

          We go beyond the headline to provide readers with facts,
          background, timelines, context, verified statements,
          analysis and the information needed to understand important
          developments.

        </p>

      </section>


      {/* =========================================================
          VISION / INTEGRITY / MISSION
      ========================================================= */}

      <section className="grid md:grid-cols-3 gap-8 mb-24">

        <InfoCard
          icon={<Globe size={34} />}
          title="Our Vision"
          text="To build a trusted digital platform that informs, educates and empowers readers through reliable journalism, knowledge and meaningful digital experiences."
        />

        <InfoCard
          icon={<ShieldCheck size={34} />}
          title="Editorial Integrity"
          text="Our editorial approach focuses on accuracy, verification, transparency, fairness and responsible reporting across the stories we publish."
        />

        <InfoCard
          icon={<Lightbulb size={34} />}
          title="Our Mission"
          text="To provide fact-based reporting and insightful analysis that helps readers understand important issues shaping India and the world."
        />

      </section>


      {/* =========================================================
          WHAT WE COVER
      ========================================================= */}

      <section className="mb-24">

        <div className="text-center mb-12">

          <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[#0b2a6f] mb-3">
            Editorial Coverage
          </p>

          <h2 className="text-3xl md:text-4xl font-serif mb-5">
            What We Cover
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">

            NationPath India covers significant developments across
            India and the world, combining news reporting, context,
            verification, analysis and editorial perspectives.

          </p>

        </div>


        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

          <CoverageCard title="Politics & Governance" />
          <CoverageCard title="Defence & National Security" />
          <CoverageCard title="Business & Economy" />
          <CoverageCard title="Technology & AI" />
          <CoverageCard title="Science & Innovation" />
          <CoverageCard title="India & States" />
          <CoverageCard title="Global Affairs" />
          <CoverageCard title="International Relations" />
          <CoverageCard title="Society & Culture" />
          <CoverageCard title="Environment & Climate" />
          <CoverageCard title="Health & Wellbeing" />
          <CoverageCard title="Editorials & Opinion" />

        </div>

      </section>


      {/* =========================================================
          BEYOND THE HEADLINE
      ========================================================= */}

      <section className="mb-24">

        <div className="rounded-2xl border bg-gray-50/70 p-8 md:p-12">

          <div className="max-w-4xl mx-auto">

            <div className="flex items-center gap-3 mb-5">

              <Layers3
                className="text-[#0b2a6f]"
                size={28}
              />

              <p className="text-sm font-semibold tracking-[0.16em] uppercase text-[#0b2a6f]">
                Our Editorial Method
              </p>

            </div>


            <h2 className="text-3xl md:text-4xl font-serif mb-5">
              Beyond the Headline
            </h2>


            <p className="text-gray-600 leading-relaxed mb-5">

              NationPath India follows a structured, context-first
              approach to news reporting. Instead of presenting only
              a headline and a few paragraphs, our stories are designed
              to help readers understand what happened, where the story
              came from, what the available evidence says, why it matters
              and what may happen next.

            </p>


            <p className="text-gray-600 leading-relaxed">

              Our editorial framework can bring together

              {" "}

              <strong>
                up to 22 structured editorial segments
              </strong>

              {" "}

              depending on the nature and complexity of a story.
              Not every story requires every section; the format is
              designed to provide depth when the subject demands it.

            </p>

          </div>


          {/* FORMAT FLOW */}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">

            <FormatCard
              number="01"
              icon={<BookOpen size={22} />}
              title="Understand"
              items={[
                "Short Brief",
                "Background",
                "Timeline",
              ]}
            />


            <FormatCard
              number="02"
              icon={<MessageSquareQuote size={22} />}
              title="Verify & Contextualise"
              items={[
                "Expert Statements",
                "Official Statements",
                "The News",
              ]}
            />


            <FormatCard
              number="03"
              icon={<SearchCheck size={22} />}
              title="Understand the Impact"
              items={[
                "Key Highlights",
                "Why It Matters",
                "Context & Analysis",
              ]}
            />


            <FormatCard
              number="04"
              icon={<ArrowRight size={22} />}
              title="Look Ahead"
              items={[
                "What Happens Next",
                "Key Takeaways",
                "Sources & FAQ",
              ]}
            />

          </div>


          {/* CORE FORMAT ELEMENTS */}

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

            <MethodPill
              icon={<Clock3 size={18} />}
              title="Timeline"
              text="Important developments arranged chronologically so readers can follow how a story evolved."
            />

            <MethodPill
              icon={<MessageSquareQuote size={18} />}
              title="Expert & Official Statements"
              text="Relevant authoritative information, statements and perspectives are presented with context."
            />

            <MethodPill
              icon={<CheckCircle2 size={18} />}
              title="Key Takeaways"
              text="The most important facts and implications readers should remember."
            />

            <MethodPill
              icon={<HelpCircle size={18} />}
              title="Frequently Asked Questions"
              text="Clear answers to common questions that help readers understand the issue."
            />

          </div>

        </div>

      </section>


      {/* =========================================================
          VERIFICATION FIRST
      ========================================================= */}

      <section className="mb-24">

        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>

            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[#0b2a6f] mb-3">
              Verification First
            </p>

            <h2 className="text-3xl md:text-4xl font-serif mb-6">
              Verify Before We Amplify
            </h2>


            <p className="text-gray-600 leading-relaxed mb-5">

              NationPath India does not intentionally publish
              baseless or unverified claims as factual news.
              Our editorial approach emphasizes verification,
              credible sourcing, context and accountability.

            </p>


            <p className="text-gray-600 leading-relaxed">

              When information is developing, incomplete or
              subject to confirmation, we aim to distinguish
              developing information, reported facts, analysis
              and editorial opinion clearly for readers.

            </p>

          </div>


          <div className="rounded-2xl border bg-white p-8 shadow-sm">

            <div className="flex items-start gap-4 mb-6">

              <div className="p-3 rounded-xl bg-[#0b2a6f]/5 text-[#0b2a6f]">

                <SearchCheck size={28} />

              </div>


              <div>

                <h3 className="font-semibold text-xl mb-1">
                  Our Editorial Principle
                </h3>

                <p className="text-sm text-gray-500">
                  Accuracy • Context • Accountability
                </p>

              </div>

            </div>


            <ul className="space-y-4 text-gray-600 text-sm">

              <li className="flex gap-3">

                <CheckCircle2
                  size={18}
                  className="text-[#0b2a6f] shrink-0 mt-0.5"
                />

                Verification and credible sourcing

              </li>


              <li className="flex gap-3">

                <CheckCircle2
                  size={18}
                  className="text-[#0b2a6f] shrink-0 mt-0.5"
                />

                Context beyond the headline

              </li>


              <li className="flex gap-3">

                <CheckCircle2
                  size={18}
                  className="text-[#0b2a6f] shrink-0 mt-0.5"
                />

                Clear distinction between news and opinion

              </li>


              <li className="flex gap-3">

                <CheckCircle2
                  size={18}
                  className="text-[#0b2a6f] shrink-0 mt-0.5"
                />

                Corrections when factual errors are identified

              </li>

            </ul>

          </div>

        </div>

      </section>


      {/* =========================================================
          EDITORIALS & DEEP ANALYSIS
      ========================================================= */}

      <section className="mb-24">

        <div className="rounded-2xl border p-8 md:p-12">

          <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[#0b2a6f] mb-3">
            Editorials & Analysis
          </p>


          <h2 className="text-3xl md:text-4xl font-serif mb-6">
            Deep Analysis. Verified Data. Informed Perspectives.
          </h2>


          <p className="text-gray-600 leading-relaxed mb-5 max-w-4xl">

            NationPath India's editorial content carries deeper
            analysis of important issues through verified data,
            relevant evidence, context and informed perspectives.

          </p>


          <p className="text-gray-600 leading-relaxed max-w-4xl">

            Editorials are designed to examine the underlying facts,
            developments, competing considerations and wider
            implications behind significant issues, helping readers
            develop a more informed understanding of complex subjects.

          </p>

        </div>

      </section>


      {/* =========================================================
          RESPONSIBLE JOURNALISM
      ========================================================= */}

      <section className="mb-24">

        <h2 className="text-3xl md:text-4xl font-serif mb-6">
          Responsible Journalism
        </h2>


        <p className="text-gray-600 leading-relaxed mb-6 max-w-4xl">

          NationPath India believes journalism plays an important
          role in creating informed public conversations. Our platform
          provides news, context, analysis and editorial perspectives
          to help readers understand developments beyond daily headlines.

        </p>


        <p className="text-gray-600 leading-relaxed max-w-4xl">

          News reporting, analysis and editorial opinion are presented
          with appropriate distinction so readers can understand the
          nature of the content they are consuming.

        </p>

      </section>


      {/* =========================================================
          BEYOND NEWS / DIGITAL ECOSYSTEM
      ========================================================= */}

      <section className="mb-24">

        <div className="text-center mb-12">

          <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[#0b2a6f] mb-3">
            Beyond News
          </p>


          <h2 className="text-3xl md:text-4xl font-serif mb-5">
            Building a Broader Digital Ecosystem
          </h2>


          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">

            NationPath India is building digital products that extend
            beyond journalism into intelligence, knowledge, technology
            and education.

          </p>

        </div>


        <div className="grid md:grid-cols-3 gap-6">


          {/* ASTRO */}

          <ProductCard
            icon={<Sparkles size={28} />}
            title="NationPath Astro Intelligence"
            subtitle="More Than a Horoscope"
            text="An astrology intelligence platform built around an AI-assisted engine developed by NationPath India for people who want to explore more than conventional horoscope content."
            highlights={[
              "13 Intelligence Areas",
              "Career & Professional Insights",
              "Relationships & Life Areas",
              "Dasha & Mahadasha",
            ]}
          />


          {/* AI */}

          <ProductCard
            icon={<Brain size={28} />}
            title="NationPath AI"
            subtitle="Intelligent Digital Experiences"
            text="A future AI-powered product designed to provide intelligent tools, information and knowledge-driven digital experiences within the wider NationPath ecosystem."
            highlights={[
              "AI-powered experiences",
              "Knowledge & Information",
              "Intelligent Assistance",
            ]}
          />


          {/* KIDS */}

          <ProductCard
            icon={<GraduationCap size={28} />}
            title="NationPath Kids"
            subtitle="Learn • Explore • Grow"
            text="A future free learning platform designed for children, providing accessible educational tools and engaging learning experiences."
            highlights={[
              "Free Learning Tools",
              "Child-focused Experiences",
              "Interactive Learning",
            ]}
          />

        </div>

      </section>


      {/* =========================================================
          ORGANIZATION
          Suryapath hidden until user expands
      ========================================================= */}

      <section className="border-t pt-10 mb-12">

        <div className="flex items-center gap-3 mb-5">

          <Building2
            className="text-[#0b2a6f]"
            size={25}
          />

          <h2 className="text-2xl font-serif">
            Organization
          </h2>

        </div>


        <p className="text-gray-600 leading-relaxed max-w-4xl mb-5">

          NationPath India is an independent digital media platform
          focused on building credible journalism experiences and
          delivering meaningful content to readers.

        </p>


        <details className="group max-w-4xl">

          <summary className="list-none cursor-pointer inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#0b2a6f] transition">

            <span>
              Organizational information
            </span>

            <ChevronDown
              size={17}
              className="transition-transform group-open:rotate-180"
            />

          </summary>


          <div className="mt-4 rounded-xl border bg-gray-50 p-5">

            <p className="text-sm text-gray-600 leading-relaxed">

              NationPath India is a digital media product of{" "}

              <strong className="text-gray-800">
                Suryapath Media & Digital Network
              </strong>

              .

            </p>

          </div>

        </details>

      </section>


      {/* =========================================================
          MIB / REGULATORY INFORMATION
      ========================================================= */}

      <section className="border-t pt-10 mb-16">

        <div className="flex items-center gap-3 mb-5">

          <ShieldCheck
            className="text-[#0b2a6f]"
            size={25}
          />

          <h2 className="text-2xl font-serif">
            Regulatory Information
          </h2>

        </div>


        <p className="text-gray-600 leading-relaxed max-w-4xl">

          NationPath India has furnished information to the
          Ministry of Information & Broadcasting under Rule 18 of
          the Information Technology (Intermediary Guidelines and
          Digital Media Ethics Code) Rules, 2021. Receipt of the
          information furnished has been acknowledged by the
          Ministry.

        </p>

      </section>


      {/* =========================================================
          FINAL BRAND STATEMENT
      ========================================================= */}

      <section className="border-t pt-12 text-center">

        <p className="text-sm font-semibold tracking-[0.2em] text-[#0b2a6f] mb-4">
          INSIGHT • TRUTH • GLOBAL VIEW
        </p>


        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">

          NationPath India is built to help readers move beyond
          the headline — towards facts, context, understanding
          and informed perspectives.

        </p>

      </section>

    </main>

  );

}


/* =============================================================
   INFO CARD
============================================================= */

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {

  return (

    <div className="bg-gray-50 p-8 rounded-2xl text-center border border-transparent hover:border-gray-200 hover:shadow-sm transition">

      <div className="mx-auto mb-5 w-fit text-[#0b2a6f]">
        {icon}
      </div>


      <h3 className="font-semibold text-lg mb-3">
        {title}
      </h3>


      <p className="text-gray-600 text-sm leading-relaxed">
        {text}
      </p>

    </div>

  );

}


/* =============================================================
   COVERAGE CARD
============================================================= */

function CoverageCard({
  title,
}: {
  title: string;
}) {

  return (

    <div
      className="
        bg-white
        border
        p-6
        rounded-xl
        text-center
        hover:shadow-md
        hover:-translate-y-0.5
        transition
      "
    >

      <Newspaper
        className="mx-auto mb-3 text-[#0b2a6f]"
        size={28}
      />


      <p className="font-medium">
        {title}
      </p>

    </div>

  );

}


/* =============================================================
   FORMAT CARD
============================================================= */

function FormatCard({
  number,
  icon,
  title,
  items,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {

  return (

    <div className="bg-white border rounded-xl p-6">

      <div className="flex items-center justify-between mb-5">

        <div className="text-[#0b2a6f]">
          {icon}
        </div>


        <span className="text-xs font-semibold tracking-wider text-gray-400">
          {number}
        </span>

      </div>


      <h3 className="font-semibold text-lg mb-4">
        {title}
      </h3>


      <div className="space-y-2">

        {items.map((item) => (

          <div
            key={item}
            className="text-sm text-gray-600 flex items-center gap-2"
          >

            <span className="w-1.5 h-1.5 rounded-full bg-[#0b2a6f]" />

            {item}

          </div>

        ))}

      </div>

    </div>

  );

}


/* =============================================================
   METHOD PILL
============================================================= */

function MethodPill({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {

  return (

    <div className="bg-white border rounded-xl p-5">

      <div className="flex items-center gap-3 mb-3">

        <div className="text-[#0b2a6f]">
          {icon}
        </div>


        <h3 className="font-semibold">
          {title}
        </h3>

      </div>


      <p className="text-sm text-gray-500 leading-relaxed">
        {text}
      </p>

    </div>

  );

}


/* =============================================================
   PRODUCT CARD
============================================================= */

function ProductCard({
  icon,
  title,
  subtitle,
  text,
  highlights,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  text: string;
  highlights: string[];
}) {

  return (

    <div className="border rounded-2xl p-7 bg-white hover:shadow-md transition">

      <div className="w-fit p-3 rounded-xl bg-[#0b2a6f]/5 text-[#0b2a6f] mb-5">

        {icon}

      </div>


      <h3 className="text-xl font-semibold mb-1">
        {title}
      </h3>


      <p className="text-sm font-medium text-[#0b2a6f] mb-4">
        {subtitle}
      </p>


      <p className="text-sm text-gray-600 leading-relaxed mb-6">
        {text}
      </p>


      <div className="space-y-2">

        {highlights.map((highlight) => (

          <div
            key={highlight}
            className="flex items-center gap-2 text-sm text-gray-600"
          >

            <CheckCircle2
              size={16}
              className="text-[#0b2a6f] shrink-0"
            />

            {highlight}

          </div>

        ))}

      </div>

    </div>

  );

}