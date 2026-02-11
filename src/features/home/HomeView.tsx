"use client";
import Link from "next/link";
import { Container, Section, Button, CarCard } from "@/src/components/ui";
import { WhatsAppButton } from "@/src/components/ui/WhatsAppButton";
import { useCars } from "@/src/hooks/useCars";
import { useSiteSettings } from "@/src/hooks/useSiteSettings";

export const HomeView = () => {
  const { data: carsData, isLoading } = useCars(1, 6);
  const { data: settingsData } = useSiteSettings(1, 1);

  const whatsappNumber = settingsData?.data?.[0]?.whatsapp_number || "";

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <div className="relative min-h-[85vh] flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url(/back1.png)" }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        {/* Hero Content */}
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-white text-sm font-medium">
                Premium Car Showroom
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
              Find Your Dream Car Today
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed drop-shadow-lg">
              Premium selection of quality vehicles. Every car checked, every
              detail matters.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/cars">
                <Button
                  size="lg"
                  className="shadow-2xl text-black hover:bg-gray-100"
                >
                  View All Cars
                </Button>
              </Link>
              <a href="#featured">
                <Button
                  size="lg"
                  variant="outline"
                  className="shadow-2xl border-white text-white hover:bg-white/10"
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
          <div id="featured" className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Featured Collection
            </h2>
            <p className="text-gray-100 text-lg">
              Handpicked premium vehicles ready for you
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-xl h-96 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {carsData?.data?.slice(0, 6).map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/cars">
              <Button
                size="lg"
                variant="outline"
                className="shadow-2xl border-white text-white hover:bg-white/10"
              >
                View All Inventory
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Trust Section */}
      <Section className="bg-linear-to-br from-gray-900 to-black text-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
              <div className="text-5xl font-bold bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                200+
              </div>
              <h3 className="text-xl font-semibold text-white">
                Quality Vehicles
              </h3>
              <p className="text-gray-300">Ready to drive home</p>
            </div>
            <div className="space-y-3 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
              <div className="text-5xl font-bold bg-linear-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                100%
              </div>
              <h3 className="text-xl font-semibold text-white">Checked</h3>
              <p className="text-gray-300">Every detail inspected</p>
            </div>
            <div className="space-y-3 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
              <div className="text-5xl font-bold bg-linear-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                24/7
              </div>
              <h3 className="text-xl font-semibold text-white">Support</h3>
              <p className="text-gray-300">Always here to help</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* WhatsApp Button */}
      {whatsappNumber && <WhatsAppButton phoneNumber={whatsappNumber} />}
    </div>
  );
};
