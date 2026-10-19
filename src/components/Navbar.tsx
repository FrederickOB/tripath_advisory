import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router";
import clsx from "clsx";
import { navLinks } from "../constants";
import ActionButton from "@/components/ui/ActionButton";

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

// Logo used by the redesigned navigation
const NavLogo = ({ light }: { light: boolean }) => (
  <Link
    to="/"
    className="flex items-center gap-3 no-underline"
    aria-label="TriPath Advisory home"
  >
    <img src="/assets/logo.png" alt="" className="h-8 w-auto" />
    <span className={clsx("tp-wordmark", light && "tp-wordmark--light")}>
      TriPath<span> Advisory</span>
    </span>
  </Link>
);

export default function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(() =>
    typeof window !== "undefined" ? window.scrollY > 40 : false
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu on navigation and on Escape
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isMenuOpen]);

  // Over the home hero the bar stays transparent until the page scrolls
  const solid = pathname !== "/" || scrolled || isMenuOpen;

  return (
    <header
      className={clsx(
        "tp fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        solid
          ? "border-dark/[.08] bg-white/[.86] backdrop-blur-[16px] backdrop-saturate-[1.4]"
          : "border-transparent bg-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="tp-container flex items-center justify-between gap-6 py-3.5"
      >
        <NavLogo light={!solid} />

        <div className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                clsx("tp-nav-link", !solid && "tp-nav-link--light", isActive && "is-active")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:block">
          <ActionButton href="/contact" size="sm">
            Book a consultation
          </ActionButton>
        </div>

        <button
          type="button"
          className={clsx(
            "relative flex h-11 w-11 items-center justify-center rounded-xl lg:hidden",
            solid ? "text-dark" : "text-white"
          )}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="relative block h-4 w-6">
            <span
              className={clsx(
                "absolute left-0 top-0 h-0.5 w-full bg-current transition-transform duration-300",
                isMenuOpen && "translate-y-[7px] rotate-45"
              )}
            />
            <span
              className={clsx(
                "absolute left-0 top-[7px] h-0.5 w-full bg-current transition-opacity duration-300",
                isMenuOpen && "opacity-0"
              )}
            />
            <span
              className={clsx(
                "absolute left-0 top-[14px] h-0.5 w-full bg-current transition-transform duration-300",
                isMenuOpen && "-translate-y-[7px] -rotate-45"
              )}
            />
          </span>
        </button>
      </nav>

      <motion.span
        className="tp-progress"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="border-t border-dark/[.08] bg-white lg:hidden"
          >
            <div className="tp-container flex flex-col gap-1 py-5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    clsx(
                      "tp-nav-link py-3 text-lg",
                      isActive && "text-primary"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <ActionButton href="/contact" className="mt-4">
                Book a consultation
              </ActionButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
