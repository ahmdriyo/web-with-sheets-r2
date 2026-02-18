"use client";

import React from "react";
import { Modal } from "@/src/components/ui";

interface ModalPrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalPrivacyPolicy: React.FC<ModalPrivacyPolicyProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Privacy Policy" size="lg">
      <div className="space-y-6 text-gray-300">
        {/* Last Updated */}
        <div className="text-sm text-gray-400">
          <p>Last Updated: February 17, 2026</p>
        </div>

        {/* Introduction */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">1. Introduction</h2>
          <p className="text-sm leading-relaxed">
            Welcome to Our Showroom (&quot;we&quot;, &quot;us&quot;, or
            &quot;our&quot;). We are committed to protecting your personal
            information and your right to privacy. This Privacy Policy explains
            how we collect, use, disclose, and safeguard your information when
            you visit our website and use our services.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            2. Information We Collect
          </h2>
          <p className="text-sm leading-relaxed">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm pl-4">
            <li>
              <strong className="text-white">Personal Information:</strong>{" "}
              Name, email address, phone number, and other contact details when
              you inquire about our vehicles or services.
            </li>
            <li>
              <strong className="text-white">Communication Data:</strong>{" "}
              Messages, feedback, and correspondence you send to us via
              WhatsApp, email, or contact forms.
            </li>
            <li>
              <strong className="text-white">Technical Data:</strong> IP
              address, browser type, device information, and usage data
              collected through cookies and similar technologies.
            </li>
            <li>
              <strong className="text-white">Transaction Data:</strong>{" "}
              Information related to vehicle inquiries, test drive requests, and
              purchase interests.
            </li>
          </ul>
        </section>

        {/* How We Use Your Information */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            3. How We Use Your Information
          </h2>
          <p className="text-sm leading-relaxed">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm pl-4">
            <li>Respond to your inquiries and provide customer support</li>
            <li>Process vehicle inquiries and schedule test drives</li>
            <li>Send you updates about available vehicles and promotions</li>
            <li>Improve our website and services</li>
            <li>Prevent fraud and ensure security</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        {/* Information Sharing */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            4. Information Sharing and Disclosure
          </h2>
          <p className="text-sm leading-relaxed">
            We do not sell your personal information. We may share your
            information with:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm pl-4">
            <li>
              <strong className="text-white">Service Providers:</strong> Third
              parties who assist us in operating our website and conducting our
              business.
            </li>
            <li>
              <strong className="text-white">Legal Requirements:</strong> When
              required by law or to protect our rights and safety.
            </li>
            <li>
              <strong className="text-white">Business Transfers:</strong> In the
              event of a merger, acquisition, or sale of assets.
            </li>
          </ul>
        </section>

        {/* Data Security */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">5. Data Security</h2>
          <p className="text-sm leading-relaxed">
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access, loss,
            or alteration. However, no method of transmission over the internet
            is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        {/* Your Rights */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">6. Your Rights</h2>
          <p className="text-sm leading-relaxed">You have the right to:</p>
          <ul className="list-disc list-inside space-y-2 text-sm pl-4">
            <li>Access, update, or delete your personal information</li>
            <li>Opt-out of marketing communications</li>
            <li>Object to processing of your personal data</li>
            <li>Request data portability</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </section>

        {/* Cookies */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">7. Cookies</h2>
          <p className="text-sm leading-relaxed">
            We use cookies and similar tracking technologies to improve your
            browsing experience, analyze website traffic, and personalize
            content. You can control cookies through your browser settings.
          </p>
        </section>

        {/* Third-Party Links */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            8. Third-Party Links
          </h2>
          <p className="text-sm leading-relaxed">
            Our website may contain links to third-party websites. We are not
            responsible for the privacy practices of these external sites. We
            encourage you to review their privacy policies.
          </p>
        </section>

        {/* Children's Privacy */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            9. Children&apos;s Privacy
          </h2>
          <p className="text-sm leading-relaxed">
            Our services are not intended for individuals under the age of 18.
            We do not knowingly collect personal information from children. If
            we become aware that we have collected data from a child, we will
            take steps to delete such information.
          </p>
        </section>

        {/* Changes to Privacy Policy */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            10. Changes to This Privacy Policy
          </h2>
          <p className="text-sm leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the &quot;Last Updated&quot; date.
          </p>
        </section>

        {/* Contact Us */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">11. Contact Us</h2>
          <p className="text-sm leading-relaxed">
            If you have any questions about this Privacy Policy or our data
            practices, please contact us:
          </p>
          <ul className="list-none space-y-2 text-sm pl-4">
            <li>
              <strong className="text-white">Email:</strong> Contact us through
              our website
            </li>
            <li>
              <strong className="text-white">WhatsApp:</strong> Use our contact
              form
            </li>
            <li>
              <strong className="text-white">Address:</strong> Visit our
              showroom during business hours
            </li>
          </ul>
        </section>

        {/* Acceptance */}
        <section className="space-y-3 border-t border-zinc-800 pt-6">
          <p className="text-sm leading-relaxed text-gray-400">
            By using our website and services, you acknowledge that you have
            read and understood this Privacy Policy and agree to its terms.
          </p>
        </section>
      </div>
    </Modal>
  );
};
