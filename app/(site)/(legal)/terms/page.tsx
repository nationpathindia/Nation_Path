import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Nation Path",
  description:
    "Terms and Conditions governing the use of Nation Path website and its content.",
};

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">

      <h1 className="text-4xl font-serif mb-10">
        Terms & Conditions
      </h1>

      <p className="text-gray-600 mb-8">
        Welcome to Nation Path. By accessing or using this website,
        you agree to comply with and be bound by the following terms
        and conditions. If you disagree with any part of these terms,
        please do not use our website.
      </p>


      {/* USE OF WEBSITE */}

      <section className="mb-10">

        <h2 className="text-2xl font-serif mb-4">
          Use of Website
        </h2>

        <p className="text-gray-600">
          The content on Nation Path is provided for informational
          and editorial purposes only. Users may access, read,
          and share our articles for personal use, but reproduction
          or redistribution of our content without permission is
          strictly prohibited.
        </p>

      </section>


      {/* INTELLECTUAL PROPERTY */}

      <section className="mb-10">

        <h2 className="text-2xl font-serif mb-4">
          Intellectual Property
        </h2>

        <p className="text-gray-600">
          All content published on Nation Path including text,
          graphics, logos, and design elements are the intellectual
          property of Nation Path unless otherwise stated.
          Unauthorized use may violate copyright laws.
        </p>

      </section>


      {/* USER CONDUCT */}

      <section className="mb-10">

        <h2 className="text-2xl font-serif mb-4">
          User Conduct
        </h2>

        <p className="text-gray-600">
          Users agree not to misuse the website or attempt to
          interfere with its normal operation. Activities such as
          hacking, spamming, or distributing malicious software
          are strictly prohibited.
        </p>

      </section>


      {/* EXTERNAL LINKS */}

      <section className="mb-10">

        <h2 className="text-2xl font-serif mb-4">
          External Links
        </h2>

        <p className="text-gray-600">
          Nation Path may include links to external websites.
          We do not control or guarantee the accuracy of content
          found on third-party sites and are not responsible for
          their policies or practices.
        </p>

      </section>


      {/* LIMITATION OF LIABILITY */}

      <section className="mb-10">

        <h2 className="text-2xl font-serif mb-4">
          Limitation of Liability
        </h2>

        <p className="text-gray-600">
          Nation Path strives to provide accurate and reliable
          information, but we make no guarantees regarding the
          completeness or accuracy of published content. We shall
          not be held liable for any loss or damages arising from
          the use of this website.
        </p>

      </section>


      {/* CHANGES */}

      <section className="mb-10">

        <h2 className="text-2xl font-serif mb-4">
          Changes to Terms
        </h2>

        <p className="text-gray-600">
          Nation Path reserves the right to update or modify these
          Terms and Conditions at any time without prior notice.
          Continued use of the website after changes indicates
          acceptance of the updated terms.
        </p>

      </section>


      {/* COMPANY */}

      <section className="border-t pt-8">

        <h2 className="text-xl font-serif mb-3">
          Organization
        </h2>

        <p className="text-gray-600">
          Nation Path is operated by <strong>SuryaPath Media, India</strong>.
          If you have any questions regarding these Terms &
          Conditions, please contact us at{" "}
          <a
            href="mailto:info@nationpathindia.com"
            className="text-[#0b2a6f] hover:underline"
          >
            info@nationpathindia.com
          </a>.
        </p>

      </section>

    </main>
  );
}