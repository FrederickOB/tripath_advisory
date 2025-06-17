import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { navLinks } from "../constants";
import { animations } from "@/lib/animation";
import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
}

// Reusable Button Component
const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  onClick,
}) => {
  const baseClasses =
    "inline-flex items-center space-x-2 px-6 py-3 rounded-full  transition-colors shadow-xl";
  const variants = {
    primary: "bg-white text-gray-900 hover:bg-gray-100",
    secondary: "bg-blue-600 text-white hover:bg-blue-500",
  };

  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.95 }}
      variants={animations.item}
    >
      {children}
    </motion.button>
  );
};

// Logo Component
const Logo: React.FC<{ scrolled: boolean }> = ({ scrolled }) => (
  <div className="flex items-center space-x-2">
    {/* <div
      className={`w-8 h-8 ${
        scrolled ? "bg-blue-500" : "bg-blue-500/80"
      } rounded-lg flex items-center justify-center transition-colors duration-300`}
    >
    </div> */}
    <img src="/src/assets/logo.png" alt="logo" className="w-6 " />
    <h2
      className={`text-lg font-bold font-playfair ${
        scrolled ? "text-gray-900" : "text-white"
      } transition-colors duration-300`}
    >
      TriPath Advisory
    </h2>
  </div>
);

// Navigation Component
const Navigation = ({
  items,
  scrolled,
}: {
  items: { label: string; path: string }[];
  scrolled: boolean;
}) => (
  <nav className="hidden md:flex space-x-8">
    {items.map((item) => (
      <motion.a
        key={item.label}
        href={item.path}
        className={`${scrolled ? "text-gray-600" : "text-white"} hover:${
          scrolled ? "text-gray-900" : "text-emerald-300"
        } transition-colors duration-300 font-playfair `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {item.label}
      </motion.a>
    ))}
  </nav>
);

// Header Component
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed z-50 w-screen py-4 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-transparent"
      }`}
      variants={animations.item}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-between container items-center mx-auto px-6">
        <Logo scrolled={scrolled} />
        <Navigation items={navLinks} scrolled={scrolled} />
        <div className="flex space-x-4">
          <Button
            variant={scrolled ? "secondary" : "primary"}
            className={clsx(
              scrolled
                ? ""
                : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm",
              " font-playfair text-sm"
            )}
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
