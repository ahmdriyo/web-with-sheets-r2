"use client";
import Link from "next/link";
import { Container, Section, Button, CarCard } from "@/src/components/ui";
import { WhatsAppButton } from "@/src/components/ui/WhatsAppButton";
import { useCars } from "@/src/hooks/useCars";
import { useSiteSettings } from "@/src/hooks/useSiteSettings";
import { useEffect, useState } from "react";
import FindUs from "./FindUs";
import Testimonial from "./Testimonial";

export const HomeView = () => {
  const { data: carsData, isLoading } = useCars(1, 8);
  const { data: settingsData } = useSiteSettings();
  const [isVisible, setIsVisible] = useState(false);

  const whatsappNumber = settingsData?.data?.whatsapp_number;

  useEffect(() => {
    setIsVisible(true);
  }, []);
  const words = [
    "Impian Anda",
    "Keluarga Anda",
    "Masa Depan Anda",
    "Petualangan Anda",
  ];

  // 2. State untuk mengontrol urutan kata dan status animasi (fade)
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // 3. Logika interval untuk mengganti teks setiap 3 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Mulai animasi menghilang (fade out)

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length); // Pindah ke kata berikutnya
        setFade(true); // Mulai animasi muncul (fade in)
      }, 500); // Waktu 500ms ini harus sinkron dengan durasi transisi di Tailwind
    }, 3000);

    return () => clearInterval(interval);
  }, [words.length]);

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
        <Container className="relative z-10 flex flex-col items-center justify-center">
          <div
            // Tambahkan mx-auto dan text-center di sini
            className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="inline-block mb-6 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 animate-fade-in shadow-lg">
              <span className="text-white text-sm font-semibold tracking-wide uppercase">
                Showroom Mobil Premium
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
              Temukan Mobil <br className="hidden md:block" />{" "}
              {/* Line break agar rapi di layar besar */}
              {/* Elemen teks yang berganti */}
              <span
                className={`inline-block transition-all duration-500 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient ${
                  fade
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-5"
                }`}
              >
                {words[index]}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              Pilihan kendaraan berkualitas premium. Setiap mobil diperiksa,
              setiap detail diperhatikan.
            </p>
            {/* Tambahkan justify-center agar tombol ikut rata tengah */}
            <div className="flex flex-wrap justify-center gap-5">
              <Link href="/cars">
                <Button
                  size="lg"
                  // Tambahan efek shadow glow biru agar lebih premium
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
              Koleksi Unggulan
            </h2>
            <p className="text-gray-100 text-lg">
              Temukan mobil-mobil terbaik kami yang siap anda bawa pulang
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
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
                Lihat Semua Inventaris
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
      <Testimonial />
      <FindUs />

      {/* WhatsApp Button */}
      {whatsappNumber && <WhatsAppButton phoneNumber={whatsappNumber} />}
    </div>
  );
};
