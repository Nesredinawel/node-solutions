import Link from "next/link";
import { cn } from "@/shared/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export function Button({
  children,
  href,
  className,
  variant = "primary",
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition-all duration-300",
    variant === "primary" && "bg-primary text-white hover:brightness-110",
    variant === "secondary" &&
      "border border-border bg-card text-foreground hover:bg-white/10",
    variant === "ghost" && "text-muted-foreground hover:text-foreground",
    disabled && "cursor-not-allowed opacity-70",
    className
  );

  if (href) {
    return (
      <Link href={href} className={styles} aria-disabled={disabled}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  );
}