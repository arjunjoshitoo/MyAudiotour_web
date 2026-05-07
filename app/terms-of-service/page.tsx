import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing your use of the MyAudioTour app and audiotour.app website.",
  alternates: {
    canonical: "/terms-of-service.html",
  },
};

const LAST_UPDATED = "May 7, 2026";

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-brand-bg">
      <Navbar />

      <section className="pt-40 pb-24">
        <div className="max-w-[760px] mx-auto px-6 md:px-10">
          <p className="section-label mb-4">Legal</p>
          <h1 className="section-headline mb-4">Terms of Service</h1>
          <p className="font-sans text-sm text-brand-ink/60 mb-12">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="prose-content font-sans text-base leading-relaxed text-brand-ink/85 space-y-6">
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your access
              to and use of the MyAudioTour mobile application (the
              &ldquo;App&rdquo;) and the audiotour.app website (the
              &ldquo;Site&rdquo;), together the &ldquo;Service.&rdquo; By
              downloading, installing, or using the Service, you agree to be
              bound by these Terms. If you do not agree, do not use the
              Service.
            </p>

            <h2 className="font-serif text-2xl text-brand-ink mt-10 mb-3">
              1. Eligibility
            </h2>
            <p>
              You must be at least 13 years old to use the Service. If you
              are under the age of majority in your jurisdiction, you may use
              the Service only with the involvement of a parent or guardian
              who agrees to these Terms on your behalf.
            </p>

            <h2 className="font-serif text-2xl text-brand-ink mt-10 mb-3">
              2. License
            </h2>
            <p>
              Subject to these Terms, we grant you a limited, non-exclusive,
              non-transferable, revocable license to download and use the App
              on a device you own or control, and to access the Site, in
              each case for your personal, non-commercial use.
            </p>

            <h2 className="font-serif text-2xl text-brand-ink mt-10 mb-3">
              3. Acceptable Use
            </h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Reverse engineer, decompile, or attempt to extract source
                code from the App, except where permitted by law
              </li>
              <li>
                Copy, redistribute, sell, or sublicense any audio content,
                imagery, or other materials from the Service
              </li>
              <li>
                Use the Service in a way that violates any applicable law or
                regulation, or the rights of others
              </li>
              <li>
                Interfere with, disrupt, or attempt to gain unauthorized
                access to the Service or its underlying systems
              </li>
              <li>
                Use automated means (scrapers, bots, crawlers) to access the
                Service without our prior written permission
              </li>
            </ul>

            <h2 className="font-serif text-2xl text-brand-ink mt-10 mb-3">
              4. Intellectual Property
            </h2>
            <p>
              The Service, including all audio narration, written content,
              imagery, software, design, and trademarks, is owned by
              MyAudioTour or its licensors and is protected by copyright,
              trademark, and other intellectual-property laws. Except for
              the limited license granted in Section 2, no rights are
              transferred to you.
            </p>

            <h2 className="font-serif text-2xl text-brand-ink mt-10 mb-3">
              5. Third-Party Content and Sites
            </h2>
            <p>
              The Service may reference or link to third-party content,
              landmarks, museums, or external websites. We do not endorse and
              are not responsible for third-party content, services, opening
              hours, ticket prices, or accuracy of third-party information.
              Your use of any third-party site or service is at your own
              risk and subject to its own terms.
            </p>

            <h2 className="font-serif text-2xl text-brand-ink mt-10 mb-3">
              6. Safety While Using the App
            </h2>
            <p>
              MyAudioTour is intended to enhance your visit to landmarks and
              public places. <strong>Always remain aware of your
              surroundings.</strong> Do not use the App while operating a
              vehicle, crossing roads, or in any situation where doing so
              could endanger you or others. Follow all on-site rules,
              signage, and instructions from local authorities or site
              staff. You are solely responsible for your own safety and
              conduct while using the Service.
            </p>

            <h2 className="font-serif text-2xl text-brand-ink mt-10 mb-3">
              7. Disclaimers
            </h2>
            <p>
              The Service is provided &ldquo;as is&rdquo; and &ldquo;as
              available,&rdquo; without warranties of any kind, whether
              express or implied, including warranties of merchantability,
              fitness for a particular purpose, non-infringement, or
              uninterrupted operation. We do not warrant that audio
              narration, GPS triggers, opening hours, ticket prices, or
              other information is accurate, complete, or current. GPS
              accuracy varies by device and environment.
            </p>

            <h2 className="font-serif text-2xl text-brand-ink mt-10 mb-3">
              8. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, MyAudioTour and its
              affiliates, contractors, and licensors will not be liable for
              any indirect, incidental, special, consequential, or punitive
              damages, or for loss of profits, data, goodwill, or other
              intangible losses, arising out of or relating to your use of
              the Service. Our total liability for any claim relating to
              the Service will not exceed the greater of (a) the amount you
              paid us for the Service in the twelve months preceding the
              claim, or (b) USD 50.
            </p>

            <h2 className="font-serif text-2xl text-brand-ink mt-10 mb-3">
              9. Indemnification
            </h2>
            <p>
              You agree to indemnify and hold harmless MyAudioTour and its
              affiliates from any claims, damages, liabilities, and
              expenses (including reasonable legal fees) arising out of
              your misuse of the Service, your violation of these Terms, or
              your infringement of any rights of a third party.
            </p>

            <h2 className="font-serif text-2xl text-brand-ink mt-10 mb-3">
              10. Termination
            </h2>
            <p>
              We may suspend or terminate your access to the Service at any
              time, with or without notice, if we believe you have violated
              these Terms or to protect the integrity of the Service. You
              may stop using the Service at any time by uninstalling the App
              or ceasing to access the Site. Sections that by their nature
              should survive termination will survive.
            </p>

            <h2 className="font-serif text-2xl text-brand-ink mt-10 mb-3">
              11. App Store Terms
            </h2>
            <p>
              If you obtained the App through the Apple App Store or Google
              Play, your use is also subject to the applicable platform
              terms. Apple and Google are not responsible for the App or any
              support related to it. To the extent these Terms conflict with
              the platform terms, the platform terms control with respect
              to issues those terms address.
            </p>

            <h2 className="font-serif text-2xl text-brand-ink mt-10 mb-3">
              12. Changes to These Terms
            </h2>
            <p>
              We may update these Terms from time to time. The &ldquo;Last
              updated&rdquo; date at the top reflects the most recent
              version. Continued use of the Service after changes take
              effect constitutes your acceptance of the revised Terms.
            </p>

            <h2 className="font-serif text-2xl text-brand-ink mt-10 mb-3">
              13. Governing Law
            </h2>
            <p>
              These Terms are governed by the laws of India, without regard
              to its conflict-of-laws principles. You agree to the exclusive
              jurisdiction of the courts located in India for any disputes
              arising out of or relating to these Terms or the Service,
              except where local law requires otherwise.
            </p>

            <h2 className="font-serif text-2xl text-brand-ink mt-10 mb-3">
              14. Contact
            </h2>
            <p>
              For questions about these Terms, contact us at{" "}
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
