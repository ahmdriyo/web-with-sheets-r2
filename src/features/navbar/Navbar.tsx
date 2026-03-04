"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Container, ThemeToggle } from "@/src/components/ui";
import { useTheme } from "next-themes";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    // Check initial scroll position on mount
    const checkInitialScroll = () => {
      setIsScrolled(window.scrollY > 50);
      // Enable animations after initial state is set
      setMounted(true);
    };

    // Optimized scroll handler with RAF throttling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY > 50;
          setIsScrolled(scrolled);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Set initial state
    checkInitialScroll();

    // Add passive scroll listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav className="sticky top-0 z-50 w-full">
      <motion.div
        className="relative flex justify-center"
        animate={{
          paddingTop: mounted && isScrolled ? 16 : 0,
        }}
        transition={{
          duration: mounted ? 0.4 : 0,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <motion.div
          className={`w-full bg-nav/95 border-nav-border backdrop-blur-sm ${
            isScrolled ? "border border-nav-border/50 shadow-2xl" : "border-b"
          }`}
          animate={{
            borderRadius: mounted && isScrolled ? 50 : 0,
            maxWidth: mounted && isScrolled ? "56rem" : "100%",
            backgroundColor:
              mounted && isScrolled
                ? isDark
                  ? "rgba(9, 9, 11, 0.5)"
                  : "rgba(255, 255, 255, 0.7)"
                : isDark
                  ? "rgba(9, 9, 11, 0.6)"
                  : "rgba(255, 255, 255, 0.8)",
          }}
          transition={{
            duration: mounted ? 0.4 : 0,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <Container className="px-0">
            <motion.div
              className="flex items-center justify-between h-15"
              animate={{
                paddingLeft: mounted && isScrolled ? 10 : 16,
                paddingRight: mounted && isScrolled ? 10 : 16,
              }}
              transition={{
                duration: mounted ? 0.4 : 0,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {/* Logo */}
              <div className="shrink-0">
                <Link href="/">
                  <motion.span
                    className="font-bold text-nav-foreground cursor-pointer text-xl"
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2, ease: "easeOut" },
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Showroom Kita
                  </motion.span>
                </Link>
              </div>

              {/* Center Menu */}
              <div className="hidden md:flex items-center gap-8">
                {[
                  { href: "/", label: "Beranda" },
                  { href: "/cars", label: "Mobil" },
                  { href: "/about", label: "Tentang" },
                ].map((item) => (
                  <Link key={item.href} href={item.href}>
                    <motion.span
                      className="font-bold text-sm cursor-pointer text-dark! hover:text-[#333333]! transition-colors dark:text-white! dark:hover:text-[#c4c4c4]!"
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        duration: 0.2,
                        ease: "easeOut",
                      }}
                    >
                      {item.label}
                    </motion.span>
                  </Link>
                ))}
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-3">
                {/* Theme Toggle - Hidden on mobile */}
                <div className="hidden md:block">
                  <ThemeToggle />
                </div>

                {/* Contact Button - Hidden on mobile */}
                <motion.button
                  onClick={handleContactClick}
                  className="hidden cursor-pointer md:flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium"
                  whileHover={{
                    backgroundColor: isDark ? "#6d28d9" : "#6d28d9",
                    scale: 1.02,
                    y: -1,
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Kontak
                </motion.button>

                {/* Mobile Hamburger */}
                <motion.button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 rounded-lg"
                  whileHover={{
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(0,0,0,0.06)",
                    scale: 1.02,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    duration: 0.15,
                    ease: "easeOut",
                  }}
                  aria-label="Toggle menu"
                >
                  <motion.svg
                    className="w-6 h-6 text-nav-foreground"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ rotate: isMenuOpen ? 45 : 0 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  >
                    <path
                      d={
                        isMenuOpen
                          ? "M6 18L18 6M6 6l12 12"
                          : "M4 6h16M4 12h16M4 18h16"
                      }
                    />
                  </motion.svg>
                </motion.button>
              </div>
            </motion.div>
          </Container>
        </motion.div>
      </motion.div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={`md:hidden mt-2 overflow-hidden ${
              isScrolled
                ? "mx-auto max-w-4xl rounded-2xl bg-nav/80 backdrop-blur-xl border border-nav-border/50 shadow-2xl"
                : "bg-nav/95 border border-nav-border rounded-xl backdrop-blur-sm"
            }`}
            initial={{
              opacity: 0,
              height: 0,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              height: "auto",
              scale: 1,
            }}
            exit={{
              opacity: 0,
              height: 0,
              scale: 0.98,
            }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <div className="p-4">
              <div className="flex flex-col gap-2">
                {[
                  { href: "/", label: "Beranda" },
                  { href: "/cars", label: "Mobil" },
                  { href: "/about", label: "Tentang" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <motion.div
                      className="text-nav-muted font-bold py-3 px-3 rounded-lg cursor-pointer"
                      whileHover={{
                        color: isDark ? "#fafafa" : "#0a0a0a",
                        backgroundColor: isDark
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(0,0,0,0.06)",
                        x: 2,
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        duration: 0.2,
                        ease: "easeOut",
                      }}
                    >
                      {item.label}
                    </motion.div>
                  </Link>
                ))}

                {/* Mobile Actions */}
                <div className="flex items-center gap-3 pt-2 mt-2 border-t border-nav-border/50">
                  <div>
                    <ThemeToggle />
                  </div>
                  <motion.button
                    onClick={() => {
                      handleContactClick();
                      setIsMenuOpen(false);
                    }}
                    className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium"
                    whileHover={{
                      backgroundColor: isDark ? "#6d28d9" : "#6d28d9",
                      scale: 1.01,
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Kontak
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
