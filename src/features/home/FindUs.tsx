"use client";
import React, { useState } from "react";
import { Container, Section, Button, Input } from "@/src/components/ui";
import { useSiteSettings } from "@/src/hooks/useSiteSettings";
import { useContact } from "@/src/hooks/useContact";
import { Toast } from "@/src/components/ui/Toast";

const FindUs = () => {
  const { data: settingsData } = useSiteSettings();
  const settings = settingsData?.data;
  const { mutate: sendContact, isPending } = useContact();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    message: "",
    type: "success",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!settings?.email) {
      setToast({
        show: true,
        message: "Recipient email is not configured. Please try again later.",
        type: "error",
      });
      return;
    }

    // Validate message length
    if (formData.message.trim().length < 10) {
      setToast({
        show: true,
        message: "Message must be at least 10 characters long.",
        type: "error",
      });
      return;
    }

    sendContact(
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        recipientEmail: settings.email,
      },
      {
        onSuccess: () => {
          setToast({
            show: true,
            message: "Message sent successfully! We'll get back to you soon.",
            type: "success",
          });
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        },
        onError: (error: unknown) => {
          console.error("Error sending contact message:", error);
          setToast({
            show: true,
            message: "Failed to send message. Please try again.",
            type: "error",
          });
        },
      },
    );
  };

  return (
    <Section background="dark" className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" />
        <div className="absolute inset-0 bg-linear-to-br from-black/80 via-gray-900/60 to-black/80" />
      </div>
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Find Us
              </h2>
              <p className="text-gray-300 text-lg">
                Visit our showroom or contact us for more information.
              </p>
            </div>
            <div className="w-full h-120 rounded-2xl overflow-hidden shadow-2xl border border-zinc-700">
              <iframe
                src={settings?.embed_maps}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Showroom Location"
              ></iframe>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Send Message to Us
              </h3>
              <p className="text-gray-300">
                Have questions? Fill out the form below and well get back to you
                soon.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Your Name <span className="text-red-400">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-zinc-800/50 border-zinc-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email Address<span className="text-red-400">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-zinc-800/50 border-zinc-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Phone Number (Optional)
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+62 812-3456-7890"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-800/50 border-zinc-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Your Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us what you're looking for..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 text-white placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 resize-none"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gray-800 text-white hover:bg-gray-900"
                disabled={isPending}
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </div>
        </div>
      </Container>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        duration={5000}
      />
    </Section>
  );
};

export default FindUs;
