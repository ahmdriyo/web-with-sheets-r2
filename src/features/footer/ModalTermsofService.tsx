"use client";

import React from "react";
import { Modal } from "@/src/components/ui";

interface ModalTermsofServiceProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalTermsofService: React.FC<ModalTermsofServiceProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Terms of Service" size="lg">
      <div className="space-y-6 text-gray-300">
        {/* Last Updated */}
        <div className="text-sm text-gray-400">
          <p>Last Updated: February 17, 2026</p>
        </div>

        {/* Introduction */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            1. Agreement to Terms
          </h2>
          <p className="text-sm leading-relaxed">
            By accessing and using Our Showroom&apos;s website and services, you
            agree to be bound by these Terms of Service. If you do not agree to
            these terms, please do not use our services.
          </p>
        </section>

        {/* Use of Services */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            2. Use of Our Services
          </h2>
          <p className="text-sm leading-relaxed">You agree to:</p>
          <ul className="list-disc list-inside space-y-2 text-sm pl-4">
            <li>
              Provide accurate and complete information when making inquiries
            </li>
            <li>Use our services only for lawful purposes</li>
            <li>Not interfere with or disrupt our website or servers</li>
            <li>Not attempt to gain unauthorized access to our systems</li>
            <li>
              Not use our services to transmit harmful or malicious content
            </li>
          </ul>
        </section>

        {/* Vehicle Information */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            3. Vehicle Information and Availability
          </h2>
          <p className="text-sm leading-relaxed">
            We strive to provide accurate information about our vehicles.
            However:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm pl-4">
            <li>
              Vehicle specifications, prices, and availability are subject to
              change without notice
            </li>
            <li>
              Images are for illustration purposes and may not represent the
              exact vehicle
            </li>
            <li>
              All vehicle sales are subject to availability and verification
            </li>
            <li>
              We reserve the right to refuse service or cancel inquiries at our
              discretion
            </li>
          </ul>
        </section>

        {/* Pricing and Payments */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            4. Pricing and Payments
          </h2>
          <p className="text-sm leading-relaxed">
            All prices displayed on our website are:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm pl-4">
            <li>Listed in Indonesian Rupiah (IDR)</li>
            <li>Subject to change without prior notice</li>
            <li>
              Exclusive of additional fees such as registration, insurance, and
              taxes unless otherwise stated
            </li>
            <li>
              Valid only for the specific vehicle listed and may vary based on
              condition and features
            </li>
          </ul>
        </section>

        {/* Test Drives */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            5. Test Drives and Inspections
          </h2>
          <p className="text-sm leading-relaxed">
            When participating in test drives:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm pl-4">
            <li>
              You must possess a valid driver&apos;s license and be at least 21
              years old
            </li>
            <li>
              You are responsible for any damage that occurs during the test
              drive
            </li>
            <li>
              Test drives are subject to availability and prior appointment
            </li>
            <li>
              We reserve the right to refuse test drive requests at our
              discretion
            </li>
          </ul>
        </section>

        {/* Intellectual Property */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            6. Intellectual Property
          </h2>
          <p className="text-sm leading-relaxed">
            All content on our website, including text, graphics, logos, images,
            and software, is the property of Our Showroom or its licensors and
            is protected by copyright and intellectual property laws. You may
            not:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm pl-4">
            <li>Copy, modify, or distribute our content without permission</li>
            <li>Use our trademarks or branding without authorization</li>
            <li>
              Reproduce or republish any part of our website for commercial
              purposes
            </li>
          </ul>
        </section>

        {/* Limitation of Liability */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            7. Limitation of Liability
          </h2>
          <p className="text-sm leading-relaxed">
            To the fullest extent permitted by law:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm pl-4">
            <li>
              We are not liable for any indirect, incidental, or consequential
              damages
            </li>
            <li>We do not guarantee uninterrupted or error-free service</li>
            <li>
              We are not responsible for third-party content or external links
            </li>
            <li>Your use of our services is at your own risk</li>
          </ul>
        </section>

        {/* Warranties */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">8. Warranties</h2>
          <p className="text-sm leading-relaxed">
            Unless explicitly stated in writing:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm pl-4">
            <li>Vehicles are sold &quot;as is&quot; without warranties</li>
            <li>We recommend independent inspection before purchase</li>
            <li>
              Any warranties provided are subject to separate written agreements
            </li>
            <li>
              We do not warrant the accuracy of all information provided by
              third parties
            </li>
          </ul>
        </section>

        {/* User Communications */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            9. User Communications
          </h2>
          <p className="text-sm leading-relaxed">
            When you communicate with us via WhatsApp, email, or other channels:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm pl-4">
            <li>
              You grant us permission to use your communications for business
              purposes
            </li>
            <li>
              You are responsible for the accuracy of information you provide
            </li>
            <li>
              We may record or save communications for quality and training
              purposes
            </li>
          </ul>
        </section>

        {/* Governing Law */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            10. Governing Law
          </h2>
          <p className="text-sm leading-relaxed">
            These Terms of Service are governed by the laws of Indonesia. Any
            disputes shall be resolved in the courts of Indonesia.
          </p>
        </section>

        {/* Changes to Terms */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            11. Changes to Terms
          </h2>
          <p className="text-sm leading-relaxed">
            We reserve the right to modify these Terms of Service at any time.
            Changes will be effective immediately upon posting on this page.
            Your continued use of our services after changes constitutes
            acceptance of the modified terms.
          </p>
        </section>

        {/* Termination */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">12. Termination</h2>
          <p className="text-sm leading-relaxed">We reserve the right to:</p>
          <ul className="list-disc list-inside space-y-2 text-sm pl-4">
            <li>
              Terminate or suspend your access to our services at any time
            </li>
            <li>Remove any content that violates these terms</li>
            <li>Take legal action against users who violate these terms</li>
          </ul>
        </section>

        {/* Contact Information */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            13. Contact Information
          </h2>
          <p className="text-sm leading-relaxed">
            If you have questions about these Terms of Service, please contact
            us:
          </p>
          <ul className="list-none space-y-2 text-sm pl-4">
            <li>
              <strong className="text-white">Website:</strong> Through our
              contact form
            </li>
            <li>
              <strong className="text-white">WhatsApp:</strong> Available on our
              website
            </li>
            <li>
              <strong className="text-white">Showroom:</strong> Visit us during
              business hours
            </li>
          </ul>
        </section>

        {/* Severability */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">14. Severability</h2>
          <p className="text-sm leading-relaxed">
            If any provision of these terms is found to be unenforceable or
            invalid, that provision will be limited or eliminated to the minimum
            extent necessary, and the remaining provisions will remain in full
            force and effect.
          </p>
        </section>

        {/* Acceptance */}
        <section className="space-y-3 border-t border-zinc-800 pt-6">
          <p className="text-sm leading-relaxed text-gray-400">
            By using our website and services, you acknowledge that you have
            read, understood, and agree to be bound by these Terms of Service.
          </p>
        </section>
      </div>
    </Modal>
  );
};
