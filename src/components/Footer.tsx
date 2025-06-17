import React from "react";
import { navLinks } from "../constants";
import { Linkedin, Twitter, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{ backgroundColor: "var(--color-dark)" }}
      className="text-white"
    >
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="mb-6">
              <span className="text-2xl font-bold">
                TriPath
                <span style={{ color: "var(--color-secondary)" }}>
                  Advisory
                </span>
              </span>
            </div>
            <p
              style={{
                color: "color-mix(in srgb, var(--color-warm) 60%, transparent)",
              }}
              className="mb-6"
            >
              Bridging strategy with sustainability, inclusion, and impact to
              create solutions that benefit organizations and society.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                style={{
                  color:
                    "color-mix(in srgb, var(--color-warm) 60%, transparent)",
                }}
                className="hover:text-secondary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                style={{
                  color:
                    "color-mix(in srgb, var(--color-warm) 60%, transparent)",
                }}
                className="hover:text-secondary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                style={{
                  color:
                    "color-mix(in srgb, var(--color-warm) 60%, transparent)",
                }}
                className="hover:text-secondary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                style={{
                  color:
                    "color-mix(in srgb, var(--color-warm) 60%, transparent)",
                }}
                className="hover:text-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.path}
                    className="text-warm/60 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#services"
                  className="text-warm/60 hover:text-secondary transition-colors"
                >
                  ESG Strategy Development
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-warm/60 hover:text-secondary transition-colors"
                >
                  Policy Framework Design
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-warm/60 hover:text-secondary transition-colors"
                >
                  Impact Assessment
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-warm/60 hover:text-secondary transition-colors"
                >
                  Stakeholder Engagement
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Contact</h3>
            <address className="not-italic text-warm/60 space-y-3">
              <p>123 Impact Avenue, Suite 400</p>
              <p>San Francisco, CA 94105</p>
              <p>contact@tripathadvisory.com</p>
              <p>+1 (555) 123-4567</p>
            </address>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-warm/60 text-sm">
            © {year} TriPath Advisory. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <a
                  href="#"
                  className="text-warm/60 hover:text-secondary text-sm transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-warm/60 hover:text-secondary text-sm transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-warm/60 hover:text-secondary text-sm transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
