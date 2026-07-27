import type { Metadata } from "next";
import { Globe, ShieldCheck, Lightbulb, Newspaper } from "lucide-react";

export const metadata: Metadata = {
  title: "About Nation Path | Independent Journalism Platform",
  description:
    "Nation Path is an independent digital news platform delivering credible journalism, strategic analysis and fact-driven reporting on national and global developments.",
};

export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-20">

      {/* HERO */}

      <section className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-serif mb-6">
          About Nation Path
        </h1>

        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          <strong>Nation Path</strong> is an independent digital news platform
          committed to delivering credible journalism, in-depth analysis and
          responsible reporting on national and global developments.
        </p>

        <p className="text-gray-500 mt-4">
          Operated by <strong>SuryaPath Media, India</strong>
        </p>
      </section>

      {/* VISION + MISSION */}

      <section className="grid md:grid-cols-3 gap-8 mb-20">

        <div className="bg-gray-50 p-8 rounded-xl text-center">
          <Globe className="mx-auto mb-4 text-[#0b2a6f]" size={34} />
          <h3 className="font-semibold text-lg mb-2">Our Vision</h3>
          <p className="text-gray-600 text-sm">
            To build a trusted digital news platform that informs, educates
            and empowers citizens through reliable journalism.
          </p>
        </div>

        <div className="bg-gray-50 p-8 rounded-xl text-center">
          <ShieldCheck className="mx-auto mb-4 text-[#0b2a6f]" size={34} />
          <h3 className="font-semibold text-lg mb-2">Editorial Integrity</h3>
          <p className="text-gray-600 text-sm">
            Our newsroom follows strict editorial standards ensuring accuracy,
            fairness and responsible journalism in every article we publish.
          </p>
        </div>

        <div className="bg-gray-50 p-8 rounded-xl text-center">
          <Lightbulb className="mx-auto mb-4 text-[#0b2a6f]" size={34} />
          <h3 className="font-semibold text-lg mb-2">Our Mission</h3>
          <p className="text-gray-600 text-sm">
            To provide fact-based reporting and insightful analysis that helps
            readers understand complex issues shaping our world.
          </p>
        </div>

      </section>

      {/* COVERAGE */}

      <section className="mb-20">

        <h2 className="text-2xl font-serif mb-8 text-center">
          What We Cover
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <CoverageCard title="Politics & Governance" />
          <CoverageCard title="Defence & Strategic Affairs" />
          <CoverageCard title="Technology & Innovation" />
          <CoverageCard title="Global Affairs" />

        </div>

      </section>

      {/* JOURNALISM VALUES */}

      <section className="mb-20">

        <h2 className="text-2xl font-serif mb-6">
          Responsible Journalism
        </h2>

        <p className="text-gray-600 leading-relaxed mb-6">
          Nation Path believes that journalism plays a crucial role in
          strengthening democratic discourse. Our platform focuses on
          providing context, analysis and verified information that helps
          readers understand developments beyond headlines.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Every article published on Nation Path undergoes editorial review
          and fact-checking before publication. We remain committed to
          transparency and correcting factual errors whenever necessary.
        </p>

      </section>

      {/* ORGANIZATION */}

      <section className="border-t pt-10">

        <h2 className="text-xl font-serif mb-4">
          Organization
        </h2>

        <p className="text-gray-600">
          Nation Path is operated by <strong>SuryaPath Media</strong>, an
          independent media initiative based in India focused on building
          credible digital journalism platforms.
        </p>

      </section>

    </main>
  );
}

function CoverageCard({ title }: { title: string }) {
  return (
    <div className="bg-white border p-6 rounded-lg text-center hover:shadow-md transition">
      <Newspaper className="mx-auto mb-3 text-[#0b2a6f]" size={28} />
      <p className="font-medium">{title}</p>
    </div>
  );
}