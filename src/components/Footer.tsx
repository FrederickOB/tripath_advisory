import { navLinks, services } from "../constants";
import {
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  ArrowRight,
} from "lucide-react";
import { Logo } from "./Navbar";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{ backgroundColor: "var(--color-dark)" }}
      className="text-white relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-50"></div>

      <div className="container mx-auto px-6 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand section */}
          <div className="lg:col-span-4">
            <Logo scrolled={false} />
            {/* <div className="mb-6">
              <span className="text-3xl font-bold">
                TriPath
                <span style={{ color: "var(--color-secondary)" }}>
                  Advisory
                </span>
              </span>
            </div> */}
            <p className="mb-8 leading-relaxed text-warm/70 mt-4">
              Bridging strategy with sustainability, inclusion, and impact to
              create solutions that benefit organizations and society.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Twitter, label: "Twitter" },
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="text-warm/70 hover:text-secondary transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-4 ">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.path}
                    className="text-warm/70 hover:text-secondary transition-colors duration-300 flex items-center group"
                  >
                    <ArrowRight
                      size={14}
                      className="mr-2 hidden group-hover:block transition-opacity"
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold mb-6 text-white">Services</h3>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.title}>
                  <a
                    href="#services"
                    className="text-warm/70 hover:text-secondary transition-colors duration-300 flex items-center group"
                  >
                    <ArrowRight
                      size={14}
                      className="mr-2 hidden group-hover:block transition-opacity"
                    />
                    {service.title.replace(":", "")}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h4
                className="text-sm font-semibold mb-3"
                style={{
                  color:
                    "color-mix(in srgb, var(--color-warm) 80%, transparent)",
                }}
              >
                Address
              </h4>
              <address
                className="not-italic"
                style={{
                  color:
                    "color-mix(in srgb, var(--color-warm) 70%, transparent)",
                }}
              >
                123 Impact Avenue, Suite 400
                <br />
                San Francisco, CA 94105
              </address>
            </div>
            <div>
              <h4
                className="text-sm font-semibold mb-3"
                style={{
                  color:
                    "color-mix(in srgb, var(--color-warm) 80%, transparent)",
                }}
              >
                Contact
              </h4>
              <p
                style={{
                  color:
                    "color-mix(in srgb, var(--color-warm) 70%, transparent)",
                }}
              >
                contact@tripathadvisory.com
                <br />
                +1 (555) 123-4567
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center"
          style={{
            borderColor:
              "color-mix(in srgb, var(--color-warm) 10%, transparent)",
          }}
        >
          <p
            style={{
              color: "color-mix(in srgb, var(--color-warm) 70%, transparent)",
            }}
            className="text-sm"
          >
            © {year} TriPath Advisory. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      style={{
                        color:
                          "color-mix(in srgb, var(--color-warm) 70%, transparent)",
                      }}
                      className="hover:text-secondary text-sm transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
