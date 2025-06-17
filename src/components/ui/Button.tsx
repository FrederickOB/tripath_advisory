import { motion } from "framer-motion";
import { Link } from "react-router";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  href?: string;
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button = ({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "right",
  href,
  className,
  children,
  isLoading,
  fullWidth,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full font-normal transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary/90 focus:ring-primary/50 shadow-lg hover:shadow-primary/25",
    secondary:
      "bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary/50 shadow-lg hover:shadow-secondary/25",
    outline:
      "border-2 border-primary text-primary hover:bg-primary/10 focus:ring-primary/50",
    ghost: "text-primary hover:bg-primary/10 focus:ring-primary/50",
    link: "text-primary hover:underline focus:ring-primary/50 p-0 h-auto",
  };

  const sizes = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-6 py-3",
    lg: "text-lg px-8 py-4",
  };

  const buttonStyles = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className
  );

  const buttonContent = (
    <>
      {Icon && iconPosition === "left" && (
        <Icon className={cn("w-5 h-5", size === "sm" && "w-4 h-4")} />
      )}
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
      {Icon && iconPosition === "right" && (
        <Icon className={cn("w-5 h-5", size === "sm" && "w-4 h-4")} />
      )}
    </>
  );

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.98 },
  };

  const MotionComponent = href ? motion(Link) : motion.button;

  return (
    <MotionComponent
      href={href}
      className={buttonStyles}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      {...props}
    >
      {buttonContent}
    </MotionComponent>
  );
};

export default Button;
