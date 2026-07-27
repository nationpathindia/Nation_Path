import type { Metadata } from "next";
import { ShieldCheck, CheckCircle, Scale, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Editorial Policy | Nation Path",
  description:
    "Nation Path editorial policy outlining journalistic standards, fact-checking principles and editorial independence.",
};

export default function EditorialPolicyPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-20">

      {/* HEADER */}

      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif mb-6">
          Editorial Policy
        </h1>

        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Nation Path follows strict editorial standards to ensure accuracy,
          independence and responsible journalism. Our newsroom is committed
          to reporting facts, providing balanced perspectives and maintaining
          transparency with our readers.
        </p>
      </section>

      {/* POLICY GRID */}

      <section className="grid md:grid-cols-2 gap-10 mb-20">

        <PolicyCard
          icon={<CheckCircle size={32} />}
          title="Accuracy & Fact-Checking"
          text="All articles published on Nation Path undergo editorial review and verification before publication. Our journalists rely on credible sources, official data and expert analysis to ensure accuracy."
        />

        <PolicyCard
          icon={<ShieldCheck size={32} />}
          title="Editorial Independence"
          text="Nation Path operates independently of political or commercial influence. Editorial decisions are made by our newsroom based solely on journalistic merit and public interest."
        />

        <PolicyCard
          icon={<Scale size={32} />}
          title="Fairness & Balance"
          text="We strive to present issues with balance and context. When covering debates or controversies, multiple perspectives are considered to provide readers with a comprehensive understanding."
        />

        <PolicyCard
          icon={<FileCheck size={32} />}
          title="Corrections Policy"
          text="If factual errors occur, Nation Path is committed to correcting them transparently and promptly. Corrections are clearly updated within the article to maintain accountability."
        />

      </section>

      {/* JOURNALISM PRINCIPLES */}

      <section className="mb-20">

        <h2 className="text-2xl font-serif mb-6">
          Our Journalism Principles
        </h2>

        <ul className="space-y-3 text-gray-600">
          <li>• Accuracy and verification of information</li>
          <li>• Independence from political and corporate influence</li>
          <li>• Transparency in sourcing and reporting</li>
          <li>• Respect for ethical journalism standards</li>
          <li>• Accountability and correction of errors</li>
        </ul>

      </section>

      {/* ORGANIZATION */}

      <section className="border-t pt-10">

        <h2 className="text-xl font-serif mb-4">
          Editorial Responsibility
        </h2>

        <p className="text-gray-600 leading-relaxed">
          Nation Path is operated by <strong>SuryaPath Media, India</strong>.
          The editorial team follows established journalism practices and
          strives to maintain credibility, transparency and integrity in
          every report published on the platform.
        </p>

      </section>

    </main>
  );
}

function PolicyCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-gray-50 p-8 rounded-xl">

      <div className="text-[#0b2a6f] mb-4">{icon}</div>

      <h3 className="font-semibold text-lg mb-2">{title}</h3>

      <p className="text-gray-600 text-sm leading-relaxed">
        {text}
      </p>

    </div>
  );
}