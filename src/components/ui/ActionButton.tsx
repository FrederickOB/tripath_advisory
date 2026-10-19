import { Link } from "react-router";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  href?: string;
  variant?: "primary" | "soft" | "mint" | "outline-light";
  size?: "md" | "sm";
  arrow?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

// The redesign's button: solid block with a colour wipe on hover.
// `ui/Button` stays as-is because the hero still uses it.
const ActionButton = ({
  href,
  variant = "primary",
  size = "md",
  arrow,
  type = "button",
  disabled,
  onClick,
  className,
  children,
}: ActionButtonProps) => {
  const classes = cn(
    "tp-btn",
    `tp-btn--${variant}`,
    size === "sm" && "tp-btn--sm",
    className
  );
  const content = (
    <>
      {children}
      {arrow && (
        <span className="tp-arr" aria-hidden="true">
          →
        </span>
      )}
    </>
  );

  if (href) {
    if (/^(https?:|mailto:|tel:)/.test(href)) {
      return (
        <a href={href} className={classes} onClick={onClick}>
          {content}
        </a>
      );
    }
    return (
      <Link to={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {content}
    </button>
  );
};

export default ActionButton;
