"use client";
import { Container, Section, Button } from "@/src/components/ui";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAbout } from "@/src/hooks/useAbout";
import { SkeletonAbout } from "./SkeletonAbout";

export const AboutView = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { data: aboutData, isLoading, isError } = useAbout();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Get the about data from the API
  const about = aboutData?.data;

  // Use API data or fallback to defaults
  const statistics = [
    {
      number: about?.carsSold,
      label: "Cars Sold",
      icon: "🚗",
    },
    {
      number: about?.happyCustomers,
      label: "Happy Customers",
      icon: "😊",
    },
    {
      number: about?.yearsExperience,
      label: "Years Experience",
      icon: "⭐",
    },
  ];

  if (isLoading) {
    return <SkeletonAbout />;
  }
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Error Loading Content
          </h2>
          <p className="text-gray-600 mb-4">
            Unable to load about page content. Please try again later.
          </p>
          <Button onClick={() => window.location.reload()}>Reload Page</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url(/back1.png)" }}
          />
          <div className="absolute inset-0 bg-linear-to-br from-black/90 via-gray-900/80 to-black/90" />

          {/* Animated circles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-60 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute -bottom-40 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>
        </div>

        {/* Hero Content */}
        <Container className="relative z-10">
          <div
            className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="inline-block mb-6 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 animate-fade-in">
              <span className="text-white text-sm font-semibold tracking-wider">
                Premium Car Showroom
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {about?.title || "Your Trusted Partner in"}{" "}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">
              {about?.description ||
                "We're passionate about connecting you with your dream car. Experience excellence, quality, and service that goes beyond expectations."}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/cars">
                <Button
                  size="lg"
                  className="shadow-2xl hover:scale-105 transition-transform duration-300"
                >
                  Browse Collection
                </Button>
              </Link>
              <a href="#contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 hover:scale-105 transition-transform duration-300"
                >
                  Contact Us
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Mission & Vision Section */}
      <Section className="bg-linear-to-br from-gray-800 via-[#00001a] to-gray-800">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* Mission */}
            <div
              className={`h-full transform transition-all duration-1000 delay-200 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              <div className="relative h-full p-8 rounded-2xl bg-linear-to-br from-blue-950/50 to-purple-950/50 border border-blue-800/30 overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="text-5xl mb-4">🎯</div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Our Mission
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {about?.ourMission ||
                      "To provide an exceptional car buying experience by offering premium quality vehicles, transparent service, and building lasting relationships with our customers through trust and excellence."}
                  </p>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div
              className={`h-full transform transition-all duration-1000 delay-400 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
            >
              <div className="relative h-full p-8 rounded-2xl bg-linear-to-br from-purple-950/50 to-pink-950/50 border border-purple-800/30 overflow-hidden group hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="text-5xl mb-4">🚀</div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Our Vision
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {about?.ourVision ||
                      "To become the most trusted and preferred automotive showroom, known for our integrity, innovation, and unwavering commitment to customer satisfaction in the premium car market."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Statistics Section */}
      <Section className="bg-linear-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <Container className="relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Track Record
            </h2>
            <p className="text-gray-300 text-lg">
              Numbers that speak for our excellence
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {statistics.map((stat, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 transform ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-5xl mb-3">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
};
