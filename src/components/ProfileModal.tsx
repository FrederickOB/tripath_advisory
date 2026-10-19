import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, X } from "lucide-react";
import { Team } from "@/types/schema";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/lib/portableTextComponents";
import { sanityImage } from "@/lib/image";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Team;
}

function ProfileModal({ isOpen, onClose, member }: ProfileModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && member && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="tp fixed inset-0 z-[60] overflow-y-auto"
          onClick={onClose}
        >
          <div className="fixed inset-0 bg-deep/60 backdrop-blur-sm" aria-hidden="true" />

          <div className="relative flex min-h-full items-center justify-center p-4 md:p-8">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={member.name}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
              className="relative grid w-full max-w-6xl gap-8 overflow-hidden rounded-[28px] bg-white p-5 shadow-[0_40px_80px_-40px_rgba(0,0,0,.5)] md:grid-cols-2 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-warm text-dark hover:bg-primary hover:text-white"
              >
                <X className="size-5" />
              </button>

              <div className="relative min-h-[320px] overflow-hidden rounded-[20px] bg-sage-50">
                {member.image?.url && (
                  <img
                    src={sanityImage(member.image.url, 1000)}
                    alt={member.name}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                )}
              </div>

              <div className="flex flex-col md:max-h-[80vh]">
                <span className="tp-eyebrow mb-4">{member.role}</span>
                <div className="mb-6 flex items-center gap-4 pr-12">
                  <h2 className="tp-h2 text-[clamp(30px,3vw,44px)]">{member.name}</h2>
                  {member.linkedin_link && (
                    <a
                      href={member.linkedin_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`LinkedIn profile of ${member.name}`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-warm text-primary hover:bg-primary hover:text-white"
                    >
                      <Linkedin className="size-4" />
                    </a>
                  )}
                </div>
                {member.bio && (
                  <p className="tp-lead mb-6 text-lg">{member.bio}</p>
                )}
                {member.fullProfile && (
                  <div className="border-t border-dark/10 pt-6 md:overflow-y-auto">
                    <h3 className="tp-kicker mb-4">Full profile</h3>
                    <PortableText
                      value={member.fullProfile}
                      components={portableTextComponents}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ProfileModal;
