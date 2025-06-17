import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: {
    name: string;
    role: string;
    bio: string;
    image: string;
    fullProfile?: string;
  };
}

function ProfileModal({ isOpen, onClose, member }: ProfileModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto"
        onClick={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          {/* Background overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="inline-block w-full max-h-[90vh] max-w-6xl p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 p-2 hover:bg-gray-100"
              icon={X}
              aria-label="Close"
            />

            <div className="grid md:grid-cols-2 gap-8">
              {/* Image section */}
              <div className="relative  rounded-xl overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content section */}
              <div className="flex flex-col h-[80vh] overflow-y-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h2>
                <p className="text-xl text-teal-600 font-medium mb-6">
                  {member.role}
                </p>
                <div className="prose prose-lg">
                  <p className="text-gray-600 mb-6">{member.bio}</p>
                  {member.fullProfile && (
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Full Profile
                      </h3>
                      <p className="text-gray-600 whitespace-pre-line">
                        {member.fullProfile}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ProfileModal;
