"use client";
import Link from "next/link";
import { Container, Section, Button, CarCard } from "@/src/components/ui";
import { WhatsAppButton } from "@/src/components/ui/WhatsAppButton";
import { useCars } from "@/src/hooks/useCars";
import { useSiteSettings } from "@/src/hooks/useSiteSettings";
import { useEffect, useState } from "react";
import FindUs from "./FindUs";

export const HomeView = () => {
  const { data: carsData, isLoading } = useCars(1, 6);
  const { data: settingsData } = useSiteSettings();
  const [isVisible, setIsVisible] = useState(false);

  const whatsappNumber = settingsData?.data?.whatsapp_number;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <div className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url(/back1.png)" }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/40" />

          {/* Animated circles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>
        </div>

        {/* Hero Content */}
        <Container className="relative z-10">
          <div
            className={`max-w-3xl transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 animate-fade-in">
              <span className="text-white text-sm font-medium">
                Premium Car Showroom
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
              Find Cars{" "}
              <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                Your Dream Vehicle
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed drop-shadow-lg">
              A selection of premium quality vehicles. Every car is inspected,
              every detail is taken care of.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/cars">
                <Button
                  size="lg"
                  className="shadow-2xl text-black hover:bg-gray-100 hover:scale-105 transition-transform duration-300"
                >
                  View All Cars
                </Button>
              </Link>
              <a href="#featured">
                <Button
                  size="lg"
                  variant="outline"
                  className="shadow-2xl border-white text-white hover:bg-white/10 hover:scale-105 transition-transform duration-300"
                >
                  Explore Collection
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Featured Cars */}
      <Section background="brown" className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url(/back2.png)" }}
          />
          <div className="absolute inset-0 bg-linear-to-br from-black/70 via-gray-900/40 to-black/70" />
        </div>
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
        <Container className="relative z-10">
          <div
            id="featured"
            className={`mb-12 text-center transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Featured Collection
            </h2>
            <p className="text-gray-100 text-lg">
              Find the best cars in our collection that are ready for you to
              take home
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700 shadow-lg"
                >
                  <div className="relative">
                    {/* Image Skeleton */}
                    <div className="w-full h-56 bg-zinc-700 animate-pulse relative overflow-hidden">
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-zinc-600/50 to-transparent animate-shimmer"></div>
                    </div>
                    {/* Badge Skeleton */}
                    <div className="absolute top-4 left-4 w-20 h-6 bg-zinc-600 rounded-full animate-pulse"></div>
                  </div>
                  <div className="p-5 space-y-4">
                    {/* Category Badge Skeleton */}
                    <div className="w-16 h-5 bg-zinc-700 rounded-full animate-pulse"></div>
                    {/* Brand & Model Skeleton */}
                    <div className="space-y-2">
                      <div className="h-6 bg-zinc-700 rounded-lg w-3/4 animate-pulse"></div>
                      <div className="h-8 bg-zinc-700 rounded-lg w-full animate-pulse"></div>
                    </div>
                    {/* Button Skeleton */}
                    <div className="h-11 bg-zinc-700 rounded-lg w-full animate-pulse mt-4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {carsData?.data?.slice(0, 6).map((car, index) => (
                <div
                  key={car.id}
                  className={`transform transition-all duration-700 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <CarCard car={car} />
                </div>
              ))}
            </div>
          )}

          <div
            className={`text-center mt-12 transform transition-all duration-1000 delay-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <Link href="/cars">
              <Button
                size="lg"
                variant="outline"
                className="shadow-2xl border-white text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                View All Inventory
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
      <FindUs />

      {/* WhatsApp Button */}
      {whatsappNumber && <WhatsAppButton phoneNumber={whatsappNumber} />}
    </div>
  );
};
