import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How MyAudioTour collects, uses, and protects your information when you use our GPS audio tour app and website.",
  alternates: {
    canonical: "/privacy-policy.html",
  },
};

const LAST_UPDATED = "May 7, 2026";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-brand-bg">
      <Navbar />

      <section className="pt-40 pb-24">
        <div className="max-w-[760px] mx-auto px-6 md:px-10">
          <p className="section-label mb-4">Legal</p>
          <h1 className="section-headline mb-4">Privacy Policy</h1>
          <p className="font-sans text-sm text-brand-ink/60 mb-12">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="prose-content font-sans text-base leading-relaxed text-brand-ink/85 space-y-6">
            <p>
              This Privacy Policy describes how MyAudioTour (&ldquo;we,&rdquo;
              &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and
              shares information when you use the MyAudioTour mobile
              application (the &ldquo;App&rdquo;) and the audiotour.app
              website (the &ldquo;Site&rdquo;). By using the App or Site, you
              agree to the practices described below.
            </p>

            <h2 className="font-serif text-2xl text-brand-ink mt-10 mb-3">
              1. Information We Collect
            </h2>
            <p>
              <strong>Location data.</strong> The App uses your device&rsquo;s
              GPS to trigger location-based audio guides at landmarks. Location
              is processed on your device to determine which audio to play and
              is not stored on our servers or linked to your identity. You can
              revoke location access at any time in your device settings; the
              App will not function as intended without it.
            </p>
            <p>
              <strong>Device and usage data.</strong> We may collect
              non-identifying technical information such as device type, OS
              version, app version, language, and crash diagnostics to
              maintain and improve the App.
            </p>
            <p>
              <strong>Information you provide.</strong> The App does not
              require an account. If you contact us by email, we receive the
              content of your message and your email address.
            </p>
            <p>
              <strong>Site logs.</strong> Our website host records standard
              server log information (IP address, browser, referring page,
              request timestamps) for security and analytics.
            </p>

            <h2 className="font-serif text-2xl text-brand-ink mt-10 mb-3">
              2. How We Use Information
            </h2>
            <p>We use the information described above to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Deliver GPS-triggered audio at landmarks</li>
              <li>Operate, maintain, and improve the App and Site</li>
              <li>Diagnose crashes and fix bugs</li>
              <li>Respond to your support requests</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="font-serif text-2xl text-brand-ink mt-10 mb-3">
              3. Sharing
            </h2>
            <p>
              We do not sell your personal information. We share information
              only with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>App stores</strong> (Apple App Store, Google Play) for
                distribution, payments, and aggregate analytics, subject to
                their own privacy policies.
              </li>
              <li>
                <strong>Service providers</strong> who host our infrastructure
                and process crash diagnostics on our behalf, under
                confidentiality obligations.
              </li>
              <li>
                <strong>Authorities</strong> when required by applicable law
                or to protect the rights, property, or safety of users or the
                public.
              </li>
            </ul>

            <h2 className="font-serif text-2xl text-brand-ink mt-10 mb-3">
              4. Data Retention
            </h2>
            <p>
              We retain technical logs and crash data for as long as needed to
              operate the App and Site, typically no longer than 12 months.
              Email correspondence is retained while needed to address your
              request and for our records thereafter.
            </p>

            <h2 className="font-serif text-2xl text-brand-ink mt-10 mb-3">
              5. Children&rsquo;s Privacy
            </h2>
            <p>
              MyAudioTour is intended for general audiences. We do not
              knowingly collect personal information from children under 13.
              If you believe a child has provided us information, please
              contact us and we will delete it.
            </p>

            <h2 className="font-serif text-2xl text-brand-ink mt-10 mb-3">
              6. Your Rights
            </h2>
            <p>
              Depending on your jurisdiction, you may have the right to
              access, correct, or delete personal information we hold about
              you, or to object to or restrict certain processing. Because the
              App does not require an account and processes location locally,
              we generally do not hold information that identifies you. To
              exercise any rights you may have, contact us using the details
              below.
            </p>

            <h2 className="font-serif text-2xl text-brand-ink mt-10 mb-3">
              7. Security
            </h2>
            <p>
              We use reasonable technical and organizational measures to
              protect information we process. No method of transmission or
              storage is 100% secure, and we cannot guarantee absolute
              security.
            </p>

            <h2 className="font-serif text-2xl text-brand-ink mt-10 mb-3">
              8. Third-Party Links
            </h2>
            <p>
              The App and Site may link to third-party services such as the
              App Store and Google Play. Their handling of your information is
              governed by their own privacy policies, not this one.
            </p>

            <h2 className="font-serif text-2xl text-brand-ink mt-10 mb-3">
              9. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. The
              &ldquo;Last updated&rdquo; date at the top reflects the most
              recent version. Material changes will be communicated through
              the App or Site.
            </p>

            <h2 className="font-serif text-2xl text-brand-ink mt-10 mb-3">
              10. Contact
            </h2>
            <p>
              For questions about this Privacy Policy, contact us at{" "}
              <a
                href="mailto:audiotour.hf@gmail.com"
                className="text-brand-teal underline underline-offset-2 hover:text-brand-saffron transition-colors"
              >
                audiotour.hf@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
