import { motion } from "framer-motion";
import { Link } from "react-router";
import clsx from "clsx";
import { useReveal } from "@/lib/reveal";

interface PageHeaderProps {
  breadcrumb: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Right-hand column: image, cards or a form */
  aside?: React.ReactNode;
  tone?: "light" | "dark";
  grid?: boolean;
  titleClassName?: string;
  alignAside?: "center" | "start";
  children?: React.ReactNode;
}

// Inner-page header: breadcrumb, eyebrow, display headline and an optional side panel
export default function PageHeader({
  breadcrumb,
  eyebrow,
  title,
  description,
  aside,
  tone = "light",
  grid = true,
  titleClassName,
  alignAside = "center",
  children,
}: PageHeaderProps) {
  const reveal = useReveal();
  const dark = tone === "dark";

  return (
    <section
      className={clsx(
        "tp relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-[146px]",
        dark && "bg-deep text-warm"
      )}
    >
      {grid && (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: dark
              ? "linear-gradient(rgba(248,246,241,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(248,246,241,.05) 1px, transparent 1px)"
              : "linear-gradient(rgba(38,50,56,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(38,50,56,.045) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: dark
              ? "radial-gradient(ellipse 80% 80% at 70% 50%, #000 20%, transparent 75%)"
              : "radial-gradient(ellipse 70% 70% at 25% 40%, #000 30%, transparent 75%)",
          }}
        />
      )}

      <div
        className={clsx(
          "tp-container relative",
          aside &&
            "grid gap-14 [grid-template-columns:repeat(auto-fit,minmax(min(460px,100%),1fr))] lg:gap-16",
          aside && (alignAside === "start" ? "items-start" : "items-center")
        )}
      >
        <div className="flex flex-col gap-7">
          <motion.nav
            {...reveal(0, 16)}
            aria-label="Breadcrumb"
            className={clsx("tp-crumb flex gap-2.5 text-sm", dark ? "tp-crumb--light text-warm/75" : "text-muted")}
          >
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{breadcrumb}</span>
          </motion.nav>
          <motion.span
            {...reveal(0.06, 16)}
            className={clsx("tp-eyebrow self-start", dark && "text-mint")}
          >
            {eyebrow}
          </motion.span>
          <motion.h1
            {...reveal(0.12, 32)}
            className={clsx("tp-h1 text-[clamp(46px,6vw,88px)] leading-[0.98]", titleClassName)}
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              {...reveal(0.2, 24)}
              className={clsx(
                "max-w-[560px] text-[20px] leading-[1.6]",
                dark ? "text-warm/85" : "text-muted"
              )}
            >
              {description}
            </motion.p>
          )}
          {children}
        </div>
        {aside}
      </div>
    </section>
  );
}
