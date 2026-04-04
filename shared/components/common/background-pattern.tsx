import { cn } from "@/shared/lib/utils";

type BackgroundPatternProps = {
  className?: string;
  variant?: "grid" | "dots" | "mesh" | "wave" | "hero";
  overlay?: boolean;
};

export function BackgroundPattern({
  className,
  variant = "grid",
  overlay = true,
}: BackgroundPatternProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]",
        className
      )}
      aria-hidden="true"
    >
      {variant === "grid" && (
        <>
          <div className="absolute inset-0 bg-pattern-grid opacity-70 dark:opacity-30" />
          {overlay && (
            <div className="absolute inset-0 bg-pattern-radial opacity-90 dark:opacity-80" />
          )}
        </>
      )}

      {variant === "dots" && (
        <>
          <div className="absolute inset-0 bg-pattern-dots opacity-70 dark:opacity-30" />
          
        </>
      )}

      {variant === "mesh" && (
        <>
          <div className="absolute inset-0 bg-pattern-mesh opacity-100 dark:opacity-90" />
       
        </>
      )}

      {variant === "wave" && (
        <>
          <div className="absolute inset-0 bg-pattern-wave opacity-100 dark:opacity-90" />
        
        </>
      )}

      {variant === "hero" && (
        <>
          <div className="absolute inset-0 bg-pattern-wave opacity-100 dark:opacity-90" />
          <div className="absolute inset-0 bg-pattern-grid opacity-40 dark:opacity-25" />
    
          <div className="absolute inset-0 bg-pattern-glow opacity-85 dark:opacity-70" />
        </>
      )}
    </div>
  );
}