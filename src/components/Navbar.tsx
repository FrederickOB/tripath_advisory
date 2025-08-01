import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "../constants";
import { animations } from "@/lib/animation";
import clsx from "clsx";
import { Link, useLocation } from "react-router";
import Button from "@/components/ui/Button";

// Logo Component
export const Logo: React.FC<{ scrolled: boolean }> = ({ scrolled }) => (
  <Link to="/" className="flex items-center space-x-2">
    {/* <div
      className={`w-8 h-8 ${
        scrolled ? "bg-blue-500" : "bg-blue-500/80"
      } rounded-lg flex items-center justify-center transition-colors duration-300`}
    >
    </div> */}
    <img src="/assets/logo.png" alt="logo" className="w-6 " />
    <h2
      className={`text-lg font-bold ${
        scrolled ? "text-gray-900" : "text-white"
      } transition-colors duration-300`}
    >
      TriPath Advisory
    </h2>
  </Link>
);

// Navigation Component
const Navigation = ({
  items,
  scrolled,
}: {
  items: { label: string; path: string }[];
  scrolled: boolean;
}) => {
  const location = useLocation();

  return (
    <nav className="hidden lg:flex space-x-8">
      {items.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <motion.a
            key={item.label}
            href={item.path}
            className={clsx(
              scrolled ? "text-gray-600" : "text-white",
              "relative transition-colors duration-300 font-normal hover:text-emerald-400"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.label}
            {isActive && (
              <motion.div
                layoutId="nav-underline"
                className="absolute left-0 -bottom-1 h-[2px] w-full bg-emerald-500 rounded"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </motion.a>
        );
      })}
    </nav>
  );
};

// Mobile Navigation Component
const MobileNavigation = ({
  items,
  // scrolled,
  isOpen,
  onClose,
}: {
  items: { label: string; path: string }[];
  scrolled: boolean;
  isOpen: boolean;
  onClose: () => void;
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed inset-0  h-fit z-50 "
      >
        <nav className="flex bg-white flex-col space-y-6 mt-16 p-6 shadow-xl">
          {items.map((item) => (
            <motion.a
              key={item.label}
              href={item.path}
              className="text-gray-900 text-xl font-normal"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
            >
              {item.label}
            </motion.a>
          ))}
          <Button
            variant="primary"
            className="mt-4 font-normal text-white text-sm"
            href="/contact"
            onClick={onClose}
          >
            Book Appointment
          </Button>
        </nav>
      </motion.div>
    )}
  </AnimatePresence>
);

// Header Component
export default function Navbar() {
  // FIX: Set initial scrolled state based on window.scrollY
  const [scrolled, setScrolled] = useState(() =>
    typeof window !== "undefined" ? window.scrollY > 50 : false
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    // FIX: Set scrolled state on mount in case page is loaded scrolled down
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".mobile-menu-button") &&
        !target.closest(".mobile-menu")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
        <div className="hidden lg:flex space-x-4">
          <Button
            variant="primary"
            className={clsx(
              scrolled ? "" : "bg-white/20  hover:bg-white/30 backdrop-blur-sm",
              " font-normal text-sm text-white"
            )}
            href="/contact"
          >
            Book Appointment
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden  mobile-menu-button p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-current transform transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              } ${scrolled ? "bg-gray-900" : "bg-white"}`}
            />
            <span
              className={`w-full h-0.5 bg-current transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              } ${scrolled ? "bg-gray-900" : "bg-white"}`}
            />
            <span
              className={`w-full h-0.5 bg-current transform transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              } ${scrolled ? "bg-gray-900" : "bg-white"}`}
            />
          </div>
        </Button>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation
        items={navLinks}
        scrolled={scrolled}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </motion.nav>
  );
}
