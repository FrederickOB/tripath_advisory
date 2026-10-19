import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router";
import { contactDetails } from "@/constants";
import { whatsappLink } from "@/lib/forms";

// Floating chat shortcut. On the home page it waits until the hero has
// scrolled away so the opening scene stays uncluttered, and it steps aside
// over the footer, which lists the same contact details.
export default function WhatsAppButton() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const [pastHero, setPastHero] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    const update = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting));
    observer.observe(footer);
    return () => observer.disconnect();
  }, [pathname]);

  if (!contactDetails.whatsapp) return null;
  const visible = (!onHome || pastHero) && !footerInView;

  return (
    <aside aria-label="Quick contact">
      <AnimatePresence>
      {visible && (
        <motion.a
          key="whatsapp"
          href={whatsappLink(contactDetails.whatsapp, "Hello TriPath Advisory, I'd like to discuss a project.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with TriPath Advisory on WhatsApp"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
          className="tp group fixed bottom-5 right-5 z-40 flex h-14 items-center gap-2.5 rounded-full bg-[#1f7a5c] pl-4 pr-4 text-white shadow-[0_18px_40px_-16px_rgba(11,42,36,.7)] hover:bg-primary md:bottom-7 md:right-7 md:pr-5"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.2-.2-.4-.3Z" />
          </svg>
          <span className="tp-black hidden text-[15px] md:inline">Chat with us</span>
        </motion.a>
      )}
      </AnimatePresence>
    </aside>
  );
}
