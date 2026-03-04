"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { Container, Section } from "@/src/components/ui";

/* ── Types ── */
interface TestimonialData {
  name: string;
  role: string;
  review: string;
  carPurchased: string;
  rating: number;
  avatar?: string;
}

/* ── Static Data ── */
const testimonials: TestimonialData[] = [
  {
    name: "Budi Santoso",
    role: "Pengusaha, Jakarta",
    review:
      "Pengalaman beli Toyota Avanza di sini luar biasa. Prosesnya cepat, kondisi mobil sesuai deskripsi, dan tim showroom sangat profesional. Sangat direkomendasikan!",
    carPurchased: "Toyota Avanza",
    rating: 5,
  },
  {
    name: "Siti Rahayu",
    role: "Dokter, Bandung",
    review:
      "Saya sangat puas dengan pelayanan showroom ini. Pajero Sport yang saya beli dalam kondisi prima. Proses administrasi mudah dan transparan.",
    carPurchased: "Mitsubishi Pajero Sport",
    rating: 5,
  },
  {
    name: "Ahmad Hidayat",
    role: "Karyawan Swasta, Surabaya",
    review:
      "Cari Honda Brio bekas berkualitas itu susah, tapi di showroom ini saya langsung dapat yang sesuai budget. Kondisi mesin bagus, interior bersih.",
    carPurchased: "Honda Brio",
    rating: 4,
  },
  {
    name: "Dewi Lestari",
    role: "Ibu Rumah Tangga, Yogyakarta",
    review:
      "Pertama kali beli mobil bekas dan agak ragu. Tapi tim showroom sangat sabar menjelaskan semuanya. Xenia yang saya beli sudah 6 bulan dan tidak ada masalah sama sekali.",
    carPurchased: "Daihatsu Xenia",
    rating: 5,
  },
  {
    name: "Reza Firmansyah",
    role: "Arsitek, Semarang",
    review:
      "Pelayanan pengiriman mobil ke luar kota sangat memuaskan. Rush sampai dalam kondisi sempurna. Komunikasinya juga sangat baik dari awal sampai akhir.",
    carPurchased: "Toyota Rush",
    rating: 5,
  },
  {
    name: "Anisa Putri",
    role: "Content Creator, Bali",
    review:
      "Showroom paling terpercaya yang pernah saya temui. Harga kompetitif, mobil terawat, dan after-sales nya juga bagus. HRV saya masih mulus sampai sekarang!",
    carPurchased: "Honda HR-V",
    rating: 5,
  },
  {
    name: "Fajar Nugroho",
    role: "Guru, Malang",
    review:
      "Proses tukar tambah di sini sangat mudah. Saya tukar Avanza lama dengan Innova yang lebih baru. Selisihnya juga wajar dan transparan.",
    carPurchased: "Toyota Innova",
    rating: 4,
  },
  {
    name: "Rina Wulandari",
    role: "Akuntan, Medan",
    review:
      "Sangat profesional! Dari awal konsultasi sampai serah terima kunci, semuanya berjalan lancar. Ertiga yang saya beli kondisinya seperti baru.",
    carPurchased: "Suzuki Ertiga",
    rating: 5,
  },
];

/* ── Star Rating ── */
const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-amber-400" : "text-border"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

/* ── Avatar ── */
const Avatar: React.FC<{ name: string; avatar?: string }> = ({
  name,
  avatar,
}) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (avatar) {
    return (
      <Image
        src={avatar}
        alt={name}
        width={40}
        height={40}
        className="w-10 h-10 rounded-full object-cover ring-2 ring-border"
      />
    );
  }

  return (
    <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center ring-2 ring-primary/20">
      <span className="text-sm font-semibold text-primary">{initials}</span>
    </div>
  );
};

/* ── Single Card ── */
const TestimonialCard: React.FC<{
  testimonial: TestimonialData;
}> = ({ testimonial }) => (
  <div className="shrink-0 w-[320px] sm:w-90 select-none">
    <div className="h-full p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 flex flex-col gap-4">
      {/* Rating + Car */}
      <div className="flex items-center justify-between">
        <StarRating rating={testimonial.rating} />
        <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full whitespace-nowrap">
          {testimonial.carPurchased}
        </span>
      </div>

      {/* Review */}
      <p className="text-sm leading-relaxed text-card-foreground flex-1">
        &ldquo;{testimonial.review}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-border">
        <Avatar name={testimonial.name} avatar={testimonial.avatar} />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">
            {testimonial.name}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  </div>
);

/* ── Marquee Row ── */
const MarqueeRow: React.FC<{
  items: TestimonialData[];
  direction?: "left" | "right";
  speed?: number;
  paused: boolean;
}> = ({ items, direction = "left", speed = 35, paused }) => {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <motion.div
        className="flex gap-5"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        style={{
          willChange: "transform",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
        ))}
      </motion.div>
    </div>
  );
};

/* ── Main Component ── */
const Testimonial: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [paused, setPaused] = useState(false);

  /* Split data into two rows */
  const mid = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, mid);
  const row2 = testimonials.slice(mid);

  /* Pause on hover for both rows */
  const handlePause = useCallback(() => setPaused(true), []);
  const handleResume = useCallback(() => setPaused(false), []);

  /* Pause when out of view for performance */
  useEffect(() => {
    if (!isInView) setPaused(true);
    else setPaused(false);
  }, [isInView]);

  return (
    <Section background="white" className="relative overflow-hidden">
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xl font-semibold tracking-widest uppercase text-primary mb-3">
            Testimoni Pelanggan
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Dipercaya Ratusan Pelanggan
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Dengarkan langsung dari pelanggan kami yang telah menemukan mobil
            impian mereka bersama showroom kami.
          </p>
        </motion.div>
      </Container>

      {/* Scrolling Rows — full bleed */}
      <div
        className="space-y-5"
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
      >
        <MarqueeRow items={row1} direction="left" speed={40} paused={paused} />
        <MarqueeRow items={row2} direction="right" speed={45} paused={paused} />
      </div>

      {/* Stats strip */}
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-14 flex flex-wrap items-center justify-center gap-8 md:gap-16 text-center"
        >
          {[
            { value: "500+", label: "Mobil Terjual" },
            { value: "4.9", label: "Rating Pelanggan" },
            { value: "10+", label: "Tahun Pengalaman" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl md:text-3xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
};

export default Testimonial;
