"use client";

import { useTheme } from "@/app/providers/Provider";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import React from "react";

export const ThemeSwitch: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border bg-background/70 backdrop-blur-md transition-colors duration-300 hover:bg-muted"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{
              duration: 0.35,
              ease: "easeInOut",
            }}
          >
            <Sun className="text-yellow-400" size={20} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{
              duration: 0.35,
              ease: "easeInOut",
            }}
          >
            <Moon className="text-slate-700 dark:text-slate-200" size={20} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeSwitch;
