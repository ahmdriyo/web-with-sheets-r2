"use client";
import Link from "next/link";
import { Container, Section, Button, CarCard } from "@/src/components/ui";
import { WhatsAppButton } from "@/src/components/ui/WhatsAppButton";
import { useCars } from "@/src/hooks/useCars";
import { useSiteSettings } from "@/src/hooks/useSiteSettings";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import FindUs from "./FindUs";
import Testimonial from "./Testimonial";

export const HomeView = () => {
  const { data: carsData, isLoading } = useCars(1, 8);
  const { data: settingsData } = useSiteSettings();

  const whatsappNumber = settingsData?.data?.whatsapp_number;

  /* ── Rotating headline words ── */
  const words = [
    "Impian Anda  di Sini",
    "Keluarga Anda di Sini",
    "Masa Depan Anda di Sini",
    "Petualangan Anda di Sini",
  ];
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setFade(true);
      }, 800);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  /* ── Scroll-in refs for sections ── */
  const featuredRef = useRef<HTMLDivElement>(null);
  const featuredInView = useInView(featuredRef, {
    once: true,
    margin: "-80px",
  });

  const viewAllRef = useRef<HTMLDivElement>(null);
  const viewAllInView = useInView(viewAllRef, { once: true, margin: "-40px" });

  return (
    <div className="min-h-screen">
      {/* ── Hero Section ── */}
      <div className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url(/back1.png)" }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/40" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>
        </div>

        {/* Hero Content */}
        <Container className="relative z-10 flex flex-col items-center justify-center">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-block mb-6 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg"
            >
              <span className="text-white text-sm font-semibold tracking-wide uppercase">
                Showroom Mobil Premium
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-3xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl"
            >
              Temukan Mobil <br className="hidden md:block" />{" "}
              <span
                className={`inline-block transition-all duration-800 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient ${
                  fade
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-5"
                }`}
              >
                {words[index]}
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-lg"
            >
              Pilihan kendaraan berkualitas premium. Setiap mobil diperiksa,
              setiap detail diperhatikan.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-wrap justify-center gap-5"
            >
              <Link href="/cars">
                <Button
                  size="lg"
                  className="shadow-[0_0_20px_rgba(96,165,250,0.4)] hover:shadow-[0_0_30px_rgba(96,165,250,0.7)] hover:-translate-y-1 transition-all duration-300"
                >
                  Lihat Semua Mobil
                </Button>
              </Link>
              <a href="#featured">
                <Button
                  size="lg"
                  variant="outline"
                  className="shadow-2xl border-white/50 text-white hover:bg-white/15 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
                >
                  Jelajahi Koleksi
                </Button>
              </a>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* ── Featured Cars ── */}
      <Section background="brown" className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url(/back2.png)" }}
          />
          <div className="absolute inset-0 bg-linear-to-br from-black/70 via-gray-900/40 to-black/70" />
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <Container className="relative z-10">
          {/* Section heading */}
          <motion.div
            id="featured"
            ref={featuredRef}
            initial={{ opacity: 0, y: 40 }}
            animate={featuredInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Koleksi Unggulan
            </h2>
            <p className="text-gray-100 text-lg">
              Temukan mobil-mobil terbaik kami yang siap anda bawa pulang
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="bg-muted rounded-2xl overflow-hidden border border-border shadow-lg"
                >
                  <div className="relative">
                    {/* Image Skeleton */}
                    <div className="w-full h-56 bg-accent animate-pulse relative overflow-hidden">
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-muted-foreground/20 to-transparent animate-shimmer"></div>
                    </div>
                    {/* Badge Skeleton */}
                    <div className="absolute top-4 left-4 w-20 h-6 bg-accent rounded-full animate-pulse"></div>
                  </div>
                  <div className="p-5 space-y-4">
                    {/* Category Badge Skeleton */}
                    <div className="w-16 h-5 bg-accent rounded-full animate-pulse"></div>
                    {/* Brand & Model Skeleton */}
                    <div className="space-y-2">
                      <div className="h-6 bg-accent rounded-lg w-3/4 animate-pulse"></div>
                      <div className="h-8 bg-accent rounded-lg w-full animate-pulse"></div>
                    </div>
                    {/* Button Skeleton */}
                    <div className="h-11 bg-accent rounded-lg w-full animate-pulse mt-4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {carsData?.data?.slice(0, 8).map((car, index) => (
                <div
                  key={car.id}
                  className={`transform transition-all duration-700`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <CarCard car={car} />
                </div>
              ))}
            </div>
          )}

          {/* View all button */}
          <motion.div
            ref={viewAllRef}
            initial={{ opacity: 0 }}
            animate={viewAllInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link href="/cars">
              <Button
                size="lg"
                variant="outline"
                className="shadow-2xl border-white text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                Lihat Semua Inventaris
              </Button>
            </Link>
          </motion.div>
        </Container>
      </Section>

      <Testimonial />
      <FindUs />

      {/* WhatsApp Button */}
      {whatsappNumber && <WhatsAppButton phoneNumber={whatsappNumber} />}
    </div>
  );
};
