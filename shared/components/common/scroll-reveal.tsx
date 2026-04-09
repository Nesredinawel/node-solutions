"use client";

import { JSX, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/shared/lib/utils";

type RevealVariant = "blur-up" | "fade-up" | "fade" | "zoom" | "slide-up";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;

  once?: boolean;
  threshold?: number;
  /**
   * Negative bottom margin triggers closer to the center of viewport
   */
  rootMargin?: string;

  variant?: RevealVariant;

  /**
   * Adds subtle brand glow behind the section (premium vibe)
   */
  glow?: boolean;

  /**
   * Stagger immediate children (useful for grids)
   * NOTE: adds a wrapper around each direct child
   */
  staggerChildren?: boolean;
  staggerMs?: number;

  /**
   * Optional manual delay for the whole section
   */
  delayMs?: number;
};

export function ScrollReveal({
  children,
  className,
  as = "div",
  once = true,
  threshold = 0.12,
  rootMargin = "0px 0px -28% 0px",
  variant = "blur-up",
  glow = false,
  staggerChildren = false,
  staggerMs = 70,
  delayMs = 0,
}: ScrollRevealProps) {
  const Comp = as as any;

  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  const variantVars = useMemo(() => {
    // Tuned to feel premium, not bouncy or aggressive
    switch (variant) {
      case "fade":
        return { y: 0, scale: 1, blur: 0 };
      case "zoom":
        return { y: 0, scale: 0.965, blur: 0 };
      case "slide-up":
        return { y: 28, scale: 1, blur: 0 };
      case "fade-up":
        return { y: 18, scale: 0.99, blur: 0 };
      case "blur-up":
      default:
        return { y: 22, scale: 0.985, blur: 8 };
    }
  }, [variant]);

  const style = useMemo(
    () =>
      ({
        ["--reveal-y" as any]: `${variantVars.y}px`,
        ["--reveal-scale" as any]: `${variantVars.scale}`,
        ["--reveal-blur" as any]: `${variantVars.blur}px`,
        ["--reveal-delay" as any]: `${delayMs}ms`,
      }) as React.CSSProperties,
    [variantVars, delayMs]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);

  const content = useMemo(() => {
    if (!staggerChildren) return children;

    const arr = Array.isArray(children) ? children : [children];

    return arr.map((child, i) => (
      <div
        key={i}
        className={cn("reveal-child", visible && "reveal-child-show")}
        style={
          {
            ["--child-delay" as any]: `${delayMs + i * staggerMs}ms`,
          } as React.CSSProperties
        }
      >
        {child}
      </div>
    ));
  }, [children, staggerChildren, staggerMs, visible, delayMs]);

  return (
    <Comp
      ref={ref}
      style={style}
      className={cn(
        "reveal-base",
        glow && "reveal-has-glow",
        visible && "reveal-show",
        className
      )}
    >
      {glow ? <span className="reveal-glow" aria-hidden="true" /> : null}
      <div className={cn(glow && "relative z-10")}>{content}</div>
    </Comp>
  );
}