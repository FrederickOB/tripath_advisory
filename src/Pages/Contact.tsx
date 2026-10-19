import React, { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import ActionButton from "@/components/ui/ActionButton";
import { Accent } from "@/components/ui/SectionTitle";
import { contactDetails } from "@/constants";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useServiceInterests } from "@/hooks/useServiceInterests";
import { submitNetlifyForm, whatsappLink } from "@/lib/forms";
import { useReveal } from "@/lib/reveal";

type Mode = "message" | "booking";

const EMPTY_FORM = {
  name: "",
  email: "",
  organization: "",
  message: "",
  date: "",
  time: "Morning (9 to 12)",
  format: "Video call",
};

const TIMES = ["Morning (9 to 12)", "Afternoon (12 to 3)", "Late afternoon (3 to 5)"];
const FORMATS = ["Video call", "Phone call", "In person, Accra"];
const HIGHLIGHTS = ["Expert consultation", "Quick response", "Exceptional results"];

const InfoCard = ({
  href,
  tile,
  label,
  value,
  icon,
  external,
}: {
  href: string;
  tile: string;
  label: string;
  value: string;
  icon: React.ReactNode;
  external?: boolean;
}) => (
  <li>
    <a
      href={href}
      className="tp-info"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span
        aria-hidden="true"
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] ${tile}`}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8">
          {icon}
        </svg>
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-[13px] text-muted">{label}</span>
        <strong className="tp-black text-[17px]">{value}</strong>
      </span>
    </a>
  </li>
);

const ContactForm = () => {
  const options = useServiceInterests();
  const [mode, setMode] = useState<Mode>("message");
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [interests, setInterests] = useState<string[]>([]);
  const [sent, setSent] = useState<Mode | null>(null);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [botField, setBotField] = useState("");
  const booking = mode === "booking";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleInterest = (option: string) =>
    setInterests((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setFailed(false);
    const { date, time, format, ...rest } = formData;
    try {
      await submitNetlifyForm("contact", {
        ...rest,
        ...(booking ? { date, time, format } : {}),
        interests: interests.join(", "),
        source: "Contact page",
        mode: booking ? "Consultation request" : "Message",
        "bot-field": botField,
      });
      setSent(mode);
      setFormData(EMPTY_FORM);
      setInterests([]);
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.3, 1.4, 0.4, 1] }}
        className="flex min-h-[560px] flex-col items-center justify-center gap-[22px] p-6 text-center"
      >
        <svg width="96" height="96" viewBox="0 0 96 96" aria-hidden="true">
          <circle cx="48" cy="48" r="46" fill="#0E5C4B" />
          <path
            className="tp-check"
            d="M30 49 l12 12 l24 -26"
            stroke="#A7E3C9"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h2 className="tp-serif text-[40px] leading-[1.1]">Thank you.</h2>
        <p className="max-w-[380px] text-lg leading-[1.6] text-muted">
          {sent === "booking"
            ? "Your consultation request is in. We will confirm a time by email."
            : "Your message is on its way. We will get back to you shortly."}
        </p>
        <ActionButton variant="soft" onClick={() => setSent(null)}>
          Send another
        </ActionButton>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div
        role="group"
        aria-label="What would you like to do?"
        className="flex gap-1.5 rounded-2xl bg-white p-1.5"
      >
        <button
          type="button"
          className="tp-seg"
          aria-pressed={!booking}
          onClick={() => setMode("message")}
        >
          Send a message
        </button>
        <button
          type="button"
          className="tp-seg"
          aria-pressed={booking}
          onClick={() => setMode("booking")}
        >
          Book a consultation
        </button>
      </div>

      <fieldset className="flex flex-col gap-2.5">
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

      <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr))]">
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
      </div>

      {booking && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
          className="grid gap-4 rounded-[18px] border-[1.5px] border-dashed border-primary/35 bg-white p-[18px] [grid-template-columns:repeat(auto-fit,minmax(min(180px,100%),1fr))]"
        >
          <label className="tp-label">
            Preferred date
            <input
              type="date"
              name="date"
              required
              min={new Date().toISOString().slice(0, 10)}
              value={formData.date}
              onChange={handleChange}
              className="tp-input"
            />
          </label>
          <label className="tp-label">
            Time
            <select name="time" value={formData.time} onChange={handleChange} className="tp-input">
              {TIMES.map((time) => (
                <option key={time}>{time}</option>
              ))}
            </select>
          </label>
          <label className="tp-label">
            Format
            <select name="format" value={formData.format} onChange={handleChange} className="tp-input">
              {FORMATS.map((format) => (
                <option key={format}>{format}</option>
              ))}
            </select>
          </label>
        </motion.div>
      )}

      <label className="tp-label">
        {booking ? "What should we cover?" : "How can we help?"}
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
      <ActionButton type="submit" arrow={!sending} disabled={sending} className="w-full">
        {sending ? "Sending…" : booking ? "Request consultation" : "Send message"}
      </ActionButton>
      {failed && (
        <p role="alert" className="text-center text-sm text-red-700">
          Sorry, that didn't go through. Please email{" "}
          <a href={`mailto:${contactDetails.email}`} className="underline">
            {contactDetails.email}
          </a>{" "}
          or message us on WhatsApp.
        </p>
      )}
    </form>
  );
};

const AddressCard = ({ address, directions }: { address: string; directions: string }) => (
  <div className="flex flex-col gap-1.5 rounded-[18px] bg-white px-[22px] py-[18px] shadow-[0_20px_40px_-20px_rgba(38,50,56,.4)]">
    <strong className="tp-black text-[17px]">TriPath Advisory</strong>
    <span className="text-[15px] text-muted">{address}</span>
    <a href={directions} target="_blank" rel="noopener noreferrer" className="tp-link self-start text-sm">
      Get directions{" "}
      <span className="tp-arr" aria-hidden="true">
        →
      </span>
    </a>
  </div>
);

export default function ContactPage() {
  const reveal = useReveal();
  usePageMeta({
    title: "Contact",
    description:
      "Send TriPath Advisory a message or book a consultation. Based in West Adenta, Accra, working across Africa.",
    path: "/contact",
  });
  const address = contactDetails.address.join(", ");
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(address)}&z=16&output=embed`;

  return (
    <div className="relative antialiased text-dark">
      <PageHeader
        breadcrumb="Contact"
        eyebrow="Contact us"
        alignAside="start"
        title={
          <>
            Let's work <br />
            <Accent>together.</Accent>
          </>
        }
        titleClassName="text-[clamp(54px,7vw,104px)] leading-[0.94]"
        description="Join us in creating sustainable impact. Let's work together to align your strategy with meaningful change."
        aside={
          <motion.div
            {...reveal(0.3, 32)}
            className="rounded-[30px] bg-warm p-[clamp(20px,3vw,36px)] shadow-[0_40px_80px_-50px_rgba(38,50,56,.45)]"
          >
            <ContactForm />
          </motion.div>
        }
      >
        <motion.ul {...reveal(0.3, 24)} className="flex flex-col gap-2.5">
          <InfoCard
            href={`mailto:${contactDetails.email}`}
            tile="bg-primary"
            label="Email"
            value={contactDetails.email}
            icon={
              <>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </>
            }
          />
          <InfoCard
            href={`tel:${contactDetails.phone.replace(/[^+\d]/g, "")}`}
            tile="bg-secondary"
            label="Phone"
            value={contactDetails.phone}
            icon={
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
            }
          />
          {contactDetails.whatsapp && (
            <InfoCard
              href={whatsappLink(contactDetails.whatsapp, "Hello TriPath Advisory, I'd like to discuss a project.")}
              tile="bg-[#1f7a5c]"
              label="WhatsApp"
              value="Chat with us"
              external
              icon={
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              }
            />
          )}
          <InfoCard
            href="#map"
            tile="bg-dark"
            label="Office"
            value={address}
            icon={
              <>
                <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </>
            }
          />
        </motion.ul>
        <motion.ul {...reveal(0.4, 16)} className="flex flex-wrap gap-x-[22px] gap-y-2 text-[15px]">
          {HIGHLIGHTS.map((item) => (
            <li key={item} className="tp-bold inline-flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0E5C4B"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12l5 5 9-10" />
              </svg>
              {item}
            </li>
          ))}
        </motion.ul>
      </PageHeader>

      {/* Map */}
      <section id="map" className="tp scroll-mt-24 pb-20 md:pb-28">
        <div className="tp-container">
          <motion.div {...reveal()} className="flex flex-col gap-4">
            <div className="relative h-[380px] overflow-hidden rounded-[32px] bg-[#E4EDE8] md:h-[480px]">
              <iframe
                title={`Map showing TriPath Advisory's office at ${address}`}
                src={mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
              {/* Top right keeps Google's own card, controls and attribution clear */}
              <div className="absolute right-6 top-6 hidden max-w-[320px] md:block">
                <AddressCard address={address} directions={directions} />
              </div>
            </div>
            <div className="md:hidden">
              <AddressCard address={address} directions={directions} />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
