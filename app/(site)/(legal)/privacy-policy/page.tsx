import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | NationPath India",
  description:
    "Read NationPath India's Privacy Policy explaining how we collect, use, protect and manage user information across our news platform and digital services.",

  alternates: {
    canonical: "https://nationpathindia.com/privacy-policy",
  },

  openGraph: {
    title: "Privacy Policy | NationPath India",
    description:
      "Learn how NationPath India collects, uses and protects user information while maintaining privacy and security standards.",
    url: "https://nationpathindia.com/privacy-policy",
    siteName: "NationPath India",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | NationPath India",
    description:
      "Read NationPath India's privacy policy covering data collection, cookies, advertising, security and user rights.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <h1>Privacy Policy</h1>

      <p>
        At NationPath India, accessible through nationpathindia.com, we respect
        your privacy and are committed to protecting the personal information
        of our visitors and users. This Privacy Policy explains how we collect,
        use, store and safeguard information when you interact with our website
        and digital services.
      </p>

      <section>
        <h2>Information We Collect</h2>

        <p>
          We may collect information that you voluntarily provide to us,
          including your name, email address, contact details and other
          information submitted through forms such as newsletter subscriptions,
          contact requests or user interactions.
        </p>

        <p>
          We may also collect limited technical information such as browser
          type, device information, IP address and website usage data to
          improve our services and user experience.
        </p>
      </section>

      <section>
        <h2>How We Use Your Information</h2>

        <ul>
          <li>To provide and improve our digital content and services.</li>
          <li>
            To respond to user inquiries, feedback and support requests.
          </li>
          <li>
            To send newsletters, updates or important announcements when users
            choose to subscribe.
          </li>
          <li>
            To analyze website performance, audience engagement and content
            preferences.
          </li>
          <li>
            To maintain website security and prevent misuse of our platform.
          </li>
        </ul>
      </section>

      <section>
        <h2>Cookies and Tracking Technologies</h2>

        <p>
          NationPath India uses cookies and similar technologies to improve
          website functionality, understand visitor behavior and enhance user
          experience. Cookies help us analyze traffic patterns, remember
          preferences and improve our digital services.
        </p>

        <p>
          Users may choose to disable cookies through browser settings,
          although some website features may not function properly as a result.
        </p>
      </section>

      <section>
        <h2>Advertising and Third-Party Services</h2>

        <p>
          NationPath India may display advertisements from third-party
          advertising partners. These partners may use technologies such as
          cookies, JavaScript or web beacons to measure advertising performance
          and provide relevant advertisements.
        </p>

        <p>
          We do not control the privacy practices of third-party services and
          encourage users to review their respective privacy policies.
        </p>
      </section>

      <section>
        <h2>Third-Party Links</h2>

        <p>
          Our website may contain links to external websites, services or
          platforms. NationPath India is not responsible for the privacy
          practices, security policies or content of third-party websites.
        </p>
      </section>

      <section>
        <h2>Children's Privacy</h2>

        <p>
          NationPath India values the safety of children online. We do not
          knowingly collect personally identifiable information from children
          under the age of 13 without appropriate consent.
        </p>

        <p>
          If you believe that a child has provided personal information to us,
          please contact us so appropriate action can be taken.
        </p>
      </section>

      <section>
        <h2>Data Security</h2>

        <p>
          We take reasonable technical and organizational measures to protect
          user information from unauthorized access, misuse, loss or disclosure.
          However, no method of transmission or storage over the internet can
          be guaranteed to be completely secure.
        </p>
      </section>

      <section>
        <h2>Your Consent</h2>

        <p>
          By accessing and using NationPath India, you acknowledge that you have
          read and understood this Privacy Policy and agree to the collection
          and use of information as described above.
        </p>
      </section>

      <section>
        <h2>Organization</h2>

        <p>
          NationPath India is operated by <strong>NationPath India</strong>.
          For questions, concerns or requests related to privacy and data
          protection, please contact us at{" "}
          <a href="mailto:info@nationpathindia.com">
            info@nationpathindia.com
          </a>.
        </p>
      </section>
    </>
  );
}