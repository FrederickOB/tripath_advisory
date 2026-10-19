import React, { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { contactDetails } from "@/constants";
import { useServiceInterests } from "@/hooks/useServiceInterests";
import { submitNetlifyForm, whatsappLink } from "@/lib/forms";
import { useReveal } from "@/lib/reveal";
import ActionButton from "@/components/ui/ActionButton";
import { Accent } from "@/components/ui/SectionTitle";

const EMPTY_FORM = { name: "", email: "", organization: "", message: "" };

const ContactLine = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <li className="flex items-start gap-3">
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#A7E3C9"
      strokeWidth="1.8"
      className="mt-0.5 shrink-0"
      aria-hidden="true"
    >
      {icon}
    </svg>
    <span className="text-warm">{children}</span>
  </li>
);

const Contact = () => {
  const reveal = useReveal();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [interests, setInterests] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [botField, setBotField] = useState("");

  const options = useServiceInterests();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status !== "sending") setStatus("idle");
  };

  const toggleInterest = (option: string) =>
    setInterests((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitNetlifyForm("contact", {
        ...formData,
        interests: interests.join(", "),
        source: "Home page",
        mode: "Message",
        "bot-field": botField,
      });
      setStatus("sent");
      setFormData(EMPTY_FORM);
      setInterests([]);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="tp scroll-mt-20 pb-20 md:pb-28"
    >
      <div className="tp-container">
        <motion.div
          {...reveal()}
          className="relative grid items-start gap-14 overflow-hidden rounded-[36px] bg-primary p-[clamp(28px,5vw,72px)] text-warm [grid-template-columns:repeat(auto-fit,minmax(min(440px,100%),1fr))]"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 700 600"
            preserveAspectRatio="none"
            className="pointer-events-none absolute bottom-0 left-0 h-full w-[55%] opacity-35"
          >
            <motion.path
              d="M-20 600 C 120 520, 260 420, 360 300 S 560 80, 720 20"
              stroke="#A7E3C9"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 3, ease: [0.6, 0.1, 0.2, 1] }}
            />
            <motion.path
              d="M-20 560 C 140 480, 300 400, 420 280 S 600 120, 720 80"
              stroke="#F8F6F1"
              strokeWidth="1.2"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 3, ease: [0.6, 0.1, 0.2, 1], delay: 0.3 }}
            />
          </svg>

          <div className="relative flex flex-col gap-[26px]">
            <h2 className="tp-h2 text-[clamp(40px,5vw,72px)] leading-none">
              Ready to transform <Accent light>your organisation?</Accent>
            </h2>
            <p className="max-w-[460px] text-[19px] leading-[1.6] text-warm/90">
              Tell us where you are and what you're working towards, and we'll
              propose a first conversation.
            </p>
            <ul className="flex flex-col gap-3.5 text-base">
              <ContactLine
                icon={
                  <>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </>
                }
              >
                <a href={`mailto:${contactDetails.email}`} className="text-warm hover:text-mint">
                  {contactDetails.email}
                </a>
              </ContactLine>
              <ContactLine
                icon={
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                }
              >
                <a
                  href={`tel:${contactDetails.phone.replace(/[^+\d]/g, "")}`}
                  className="text-warm hover:text-mint"
                >
                  {contactDetails.phone}
                </a>
              </ContactLine>
              {contactDetails.whatsapp && (
                <ContactLine
                  icon={
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                  }
                >
                  <a
                    href={whatsappLink(contactDetails.whatsapp, "Hello TriPath Advisory, I'd like to discuss a project.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-warm hover:text-mint"
                  >
                    Chat on WhatsApp
                  </a>
                </ContactLine>
              )}
              <ContactLine
                icon={
                  <>
                    <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </>
                }
              >
                {contactDetails.address.join(", ")}
              </ContactLine>
            </ul>
          </div>

          <form
            onSubmit={handleSubmit}
            className="relative grid gap-[18px] rounded-[26px] bg-white p-[clamp(22px,3.5vw,40px)] text-dark shadow-[0_40px_80px_-40px_rgba(0,0,0,.5)] [grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr))]"
          >
            <fieldset className="col-span-full flex flex-col gap-2.5">
              <legend className="tp-bold mb-2.5 text-sm">I'm interested in</legend>
              <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="tp-chip"
                    aria-pressed={interests.includes(option)}
                    onClick={() => toggleInterest(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>
            <label className="tp-label">
              Name
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="tp-input"
              />
            </label>
            <label className="tp-label">
              Email
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@organisation.org"
                className="tp-input"
              />
            </label>
            <label className="tp-label col-span-full">
              Organisation
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Organisation name"
                className="tp-input"
              />
            </label>
            <label className="tp-label col-span-full">
              How can we help?
              <textarea
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="A few lines on your challenge"
                className="tp-input"
              />
            </label>
            <div className="col-span-full flex flex-col gap-3">
              {/* Honeypot: hidden from people, filled in by spam bots */}
              <input
                type="text"
                name="bot-field"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={botField}
                onChange={(e) => setBotField(e.target.value)}
                className="hidden"
              />
              <ActionButton
                type="submit"
                arrow={status !== "sending"}
                disabled={status === "sending"}
                className="w-full"
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </ActionButton>
              <p
                role="status"
                className={clsx(
                  "text-sm",
                  status === "error" ? "text-red-700" : "text-primary",
                  (status === "idle" || status === "sending") && "sr-only"
                )}
              >
                {status === "sent" && "Thank you, your message has been sent. We'll be in touch soon."}
                {status === "error" && (
                  <>
                    Sorry, that didn't go through. Please email us at{" "}
                    <a href={`mailto:${contactDetails.email}`} className="underline">
                      {contactDetails.email}
                    </a>
                    .
                  </>
                )}
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
