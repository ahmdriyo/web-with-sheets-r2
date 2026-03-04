"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const isDark = resolvedTheme === "dark";

  // Prevent hydration mismatch — render placeholder until mounted
  if (!mounted) {
    return (
      <div className="p-2 rounded-lg w-9 h-9 bg-muted border border-border" />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 cursor-pointer rounded-lg bg-muted border border-border text-foreground hover:bg-accent transition-colors"
      whileHover={{
        scale: 1.05,
        rotate: 10,
      }}
      whileTap={{
        scale: 0.9,
        rotate: -5,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      aria-label="Toggle theme"
    >
      <motion.div
        className="w-5 h-5"
        animate={{
          rotate: isDark ? 180 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
      >
        <AnimatePresence mode="wait">
          {!isDark ? (
            <motion.svg
              key="moon"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              initial={{ opacity: 0, scale: 0, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0, rotate: 90 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                duration: 0.3,
              }}
            >
              <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </motion.svg>
          ) : (
            <motion.svg
              key="sun"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              initial={{ opacity: 0, scale: 0, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0, rotate: 90 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                duration: 0.3,
              }}
            >
              <motion.path
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
};
