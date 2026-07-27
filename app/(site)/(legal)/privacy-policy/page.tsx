import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Nation Path",
  description:
    "Privacy Policy explaining how Nation Path collects, uses and protects user information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">

      <h1 className="text-4xl font-serif mb-10">
        Privacy Policy
      </h1>

      <p className="text-gray-600 mb-8">
        At Nation Path, accessible from nationpathindia.com, the privacy of our
        visitors is one of our main priorities. This Privacy Policy document
        outlines the types of information that are collected and recorded by
        Nation Path and how we use it.
      </p>

      {/* INFORMATION COLLECTION */}

      <section className="mb-10">

        <h2 className="text-2xl font-serif mb-4">
          Information We Collect
        </h2>

        <p className="text-gray-600">
          We may collect personal information such as your name, email address,
          and any information you voluntarily provide through forms such as
          contact inquiries or newsletter subscriptions.
        </p>

      </section>

      {/* HOW WE USE INFORMATION */}

      <section className="mb-10">

        <h2 className="text-2xl font-serif mb-4">
          How We Use Your Information
        </h2>

        <ul className="text-gray-600 space-y-2">
          <li>• To respond to inquiries and feedback</li>
          <li>• To improve website content and user experience</li>
          <li>• To analyze site traffic and usage patterns</li>
          <li>• To communicate updates or newsletters if subscribed</li>
        </ul>

      </section>

      {/* COOKIES */}

      <section className="mb-10">

        <h2 className="text-2xl font-serif mb-4">
          Cookies and Web Beacons
        </h2>

        <p className="text-gray-600">
          Nation Path uses cookies to store information about visitors'
          preferences and to optimize user experience by customizing our web
          page content based on visitors’ browser type or other information.
        </p>

      </section>

      {/* ADVERTISING */}

      <section className="mb-10">

        <h2 className="text-2xl font-serif mb-4">
          Advertising Partners
        </h2>

        <p className="text-gray-600">
          Third-party ad servers or networks may use technologies like cookies,
          JavaScript, or Web Beacons in their advertisements and links that
          appear on Nation Path. These technologies help measure advertising
          effectiveness and personalize advertising content.
        </p>

      </section>

      {/* THIRD PARTY */}

      <section className="mb-10">

        <h2 className="text-2xl font-serif mb-4">
          Third-Party Privacy Policies
        </h2>

        <p className="text-gray-600">
          Nation Path’s Privacy Policy does not apply to other advertisers or
          websites. We advise you to consult the respective Privacy Policies of
          third-party services for more detailed information.
        </p>

      </section>

      {/* CHILDREN */}

      <section className="mb-10">

        <h2 className="text-2xl font-serif mb-4">
          Children's Information
        </h2>

        <p className="text-gray-600">
          Protecting children while using the internet is important to us.
          Nation Path does not knowingly collect any personal identifiable
          information from children under the age of 13.
        </p>

      </section>

      {/* CONSENT */}

      <section className="mb-10">

        <h2 className="text-2xl font-serif mb-4">
          Consent
        </h2>

        <p className="text-gray-600">
          By using our website, you hereby consent to our Privacy Policy and
          agree to its terms.
        </p>

      </section>

      {/* COMPANY */}

      <section className="border-t pt-8">

        <h2 className="text-xl font-serif mb-3">
          Organization
        </h2>

        <p className="text-gray-600">
          Nation Path is operated by <strong>SuryaPath Media, India</strong>.
          For any privacy-related questions, please contact us at{" "}
          <a
            href="mailto:info@nationpathindia.com"
            className="text-[#0b2a6f] hover:underline"
          >
            info@nationpathindia.com
          </a>
          .
        </p>

      </section>

    </main>
  );
}