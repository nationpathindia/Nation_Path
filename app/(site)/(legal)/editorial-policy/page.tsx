import type { Metadata } from "next";

import {
  ShieldCheck,
  CheckCircle,
  Scale,
  FileCheck,
  BookOpenCheck,
  Eye,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Editorial Policy | NationPath India",
  description:
    "Read NationPath India's editorial policy covering journalistic standards, fact verification, editorial independence, corrections, transparency and responsible reporting practices.",

  alternates: {
    canonical: "https://nationpathindia.com/editorial-policy",
  },

  openGraph: {
    title: "Editorial Policy | NationPath India",
    description:
      "Learn about NationPath India's editorial standards, verification process, transparency principles and commitment to responsible journalism.",
    url: "https://nationpathindia.com/editorial-policy",
    siteName: "NationPath India",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Editorial Policy | NationPath India",
    description:
      "Explore NationPath India's journalism standards, editorial guidelines and commitment to accuracy and transparency.",
  },
};

export default function EditorialPolicyPage() {
  return (
    <>
      <section className="text-center mb-16">
        <h1>Editorial Policy</h1>

        <p>
          NationPath India follows responsible editorial practices focused on
          accuracy, independence, transparency and public interest. Our
          newsroom is committed to delivering credible journalism, meaningful
          analysis and verified information to our readers.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-10 mb-20">
        <PolicyCard
          icon={<CheckCircle size={32} />}
          title="Accuracy & Fact Verification"
          text="Every article published by NationPath India follows an editorial review process. Our team verifies information through credible sources, official statements, public records and expert inputs wherever applicable."
        />

        <PolicyCard
          icon={<ShieldCheck size={32} />}
          title="Editorial Independence"
          text="NationPath India maintains editorial independence from political, commercial or external influence. Editorial decisions are based on journalistic value, accuracy and relevance to the public."
        />

        <PolicyCard
          icon={<Scale size={32} />}
          title="Fairness & Balanced Reporting"
          text="We aim to present news and analysis with proper context and fairness. Coverage involving public debates, organisations or individuals is approached with responsibility and consideration of relevant viewpoints."
        />

        <PolicyCard
          icon={<FileCheck size={32} />}
          title="Corrections & Updates"
          text="If an error is identified, NationPath India follows a transparent correction process. Verified corrections and important updates are reflected within relevant content whenever required."
        />

        <PolicyCard
          icon={<BookOpenCheck size={32} />}
          title="Sources & Transparency"
          text="We value transparency in reporting and aim to clearly distinguish between verified information, analysis, opinion and editorial perspectives."
        />

        <PolicyCard
          icon={<Eye size={32} />}
          title="Responsible Digital Publishing"
          text="NationPath India uses technology, data tools and digital publishing systems responsibly while maintaining editorial judgement, human review and journalistic standards."
        />
      </section>

      <section>
        <h2>Our Journalism Principles</h2>

        <ul>
          <li>Accuracy, verification and responsible reporting</li>
          <li>Independence from political and commercial pressure</li>
          <li>
            Transparency in sources, corrections and editorial decisions
          </li>
          <li>
            Respect for privacy, dignity and ethical journalism practices
          </li>
          <li>Clear distinction between news, opinion and analysis</li>
          <li>Accountability towards readers and public interest</li>
        </ul>
      </section>

      <section>
        <h2>Content Standards</h2>

        <p>
          NationPath India publishes news reports, analysis, features and
          knowledge content across areas including national affairs, defence,
          technology, business, sports, astrology intelligence and other
          public-interest topics. All content is created with an emphasis on
          accuracy, relevance and reader value.
        </p>
      </section>

      <section>
        <h2>Editorial Responsibility</h2>

        <p>
          NationPath India is operated by <strong>NationPath India</strong>.
          The editorial team is responsible for maintaining the quality,
          credibility and integrity of content published on the platform.
          <br />
          <br />
          For editorial questions, feedback or correction requests, readers may
          contact our team through the official communication channels.
        </p>
      </section>
    </>
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
      <div className="text-[#0b2a6f] mb-4">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>
    </div>
  );
}