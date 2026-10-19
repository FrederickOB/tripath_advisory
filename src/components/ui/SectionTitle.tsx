import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReveal } from "@/lib/reveal";

// Italic serif highlight used inside headings: "Our approach <Accent>makes the difference.</Accent>"
export const Accent = ({
  children,
  light,
}: {
  children: React.ReactNode;
  light?: boolean;
}) => (
  <span className={cn("tp-accent", light && "text-mint")}>{children}</span>
);

interface SectionTitleProps {
  eyebrow?: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
  light?: boolean;
  className?: string;
}

const SectionTitle = ({ eyebrow, title, aside, light, className }: SectionTitleProps) => {
  const reveal = useReveal();
  return (
    <motion.div
      {...reveal()}
      className={cn("flex flex-wrap items-end justify-between gap-6", className)}
    >
      <div className="flex max-w-[720px] flex-col gap-[18px]">
        {eyebrow && (
          <span className={cn("tp-eyebrow", light && "text-mint")}>{eyebrow}</span>
        )}
        <h2 className="tp-h2">{title}</h2>
      </div>
      {aside && (
        <div
          className={cn(
            "max-w-[400px] text-[17px] leading-[1.6]",
            light ? "text-warm/80" : "text-muted"
          )}
        >
          {aside}
        </div>
      )}
    </motion.div>
  );
};

export default SectionTitle;
