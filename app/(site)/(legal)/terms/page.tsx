import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | NationPath",
  description:
    "Read the Terms and Conditions governing the use of NationPath website, content, services, and digital platforms.",

  alternates: {
    canonical: "https://nationpathindia.com/terms",
  },

  openGraph: {
    title: "Terms & Conditions | NationPath",
    description:
      "Terms and Conditions governing the use of NationPath website, content, and digital services.",
    url: "https://nationpathindia.com/terms",
    siteName: "NationPath",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | NationPath",
    description:
      "Terms and Conditions governing the use of NationPath website, content, and digital services.",
  },
};

export default function TermsPage() {
  return (
    <>
      <h1>Terms &amp; Conditions</h1>

      <p>
        Welcome to NationPath. By accessing or using this website, you agree to
        comply with and be bound by these Terms and Conditions. If you do not
        agree with any part of these terms, please do not use our website.
      </p>

      <section>
        <h2>Use of Website</h2>

        <p>
          The content published on NationPath is provided for informational and
          editorial purposes only. Users may access, read, and share our
          content for personal and non-commercial use while respecting
          applicable copyright and intellectual property rights.
        </p>
      </section>

      <section>
        <h2>Intellectual Property</h2>

        <p>
          All content published on NationPath, including text, graphics, logos,
          branding elements, and design components, belongs to NationPath unless
          otherwise stated. Unauthorized reproduction, redistribution, or
          commercial use of our content is prohibited.
        </p>
      </section>

      <section>
        <h2>User Conduct</h2>

        <p>
          Users agree not to misuse the website, attempt unauthorized access,
          interfere with website operations, distribute harmful software, or
          engage in activities that may affect the security and availability of
          NationPath services.
        </p>
      </section>

      <section>
        <h2>External Links</h2>

        <p>
          NationPath may include links to external websites for additional
          information. We do not control or guarantee the accuracy of content
          available on third-party websites and are not responsible for their
          policies or practices.
        </p>
      </section>

      <section>
        <h2>Limitation of Liability</h2>

        <p>
          NationPath strives to provide accurate and reliable information, but
          we do not guarantee that all published content will always be complete
          or error-free. NationPath shall not be held responsible for any loss
          or damages arising from the use of this website or its content.
        </p>
      </section>

      <section>
        <h2>Changes to Terms</h2>

        <p>
          NationPath reserves the right to update or modify these Terms and
          Conditions at any time. Changes become effective once published on
          this page. Continued use of the website after updates indicates
          acceptance of the revised terms.
        </p>
      </section>

      <section>
        <h2>Organization</h2>

        <p>
          NationPath is operated by <strong>NationPath India</strong>. For any
          questions regarding these Terms &amp; Conditions, please contact us at{" "}
          <a href="mailto:info@nationpathindia.com">
            info@nationpathindia.com
          </a>.
        </p>
      </section>
    </>
  );
}