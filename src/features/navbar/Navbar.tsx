"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/src/components/ui";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-transparent backdrop-blur-sm border-b border-white/5"
          : "bg-black border-b border-white/20"
      }`}
    >
      <Container className="px-0!">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="px-4 text-2xl font-bold text-white">
            AutoPremium
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors font-bold"
            >
              Home
            </Link>
            <Link
              href="/cars"
              className="text-gray-300 hover:text-white transition-colors font-bold"
            >
              Cars
            </Link>
            <Link
              href="#contact"
              className="text-gray-300 hover:text-white transition-colors font-bold"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {isMenuOpen && (
          <div
            className={`md:hidden py-4 border-t px-4 ${isScrolled ? "bg-transparent backdrop-blur-sm border-b border-white/5" : "bg-black border-b border-white/20"}`}
          >
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition-colors font-bold py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/cars"
                className="text-gray-300 hover:text-white transition-colors font-bold py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Cars
              </Link>
              <Link
                href="#contact"
                className="text-gray-300 hover:text-white transition-colors font-bold py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
};
