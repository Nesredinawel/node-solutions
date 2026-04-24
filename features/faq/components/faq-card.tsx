"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/shared/lib/utils";

type FaqCardProps = {
  question: string;
  answer: string;
  number: string;
  isOpen: boolean;
  onToggle: () => void;
  panelId: string;
  buttonId: string;
};



export function FaqCard({
  question,
  answer,
  number,
  isOpen,
  onToggle,
  panelId,
  buttonId,
}: FaqCardProps) {

  return (
    <div
      className={cn(
        "glass-card group overflow-hidden rounded-2xl border border-border shadow-card transition-all duration-300",
        "hover:border-primary/30",
        isOpen && "border-primary/35 shadow-glow"
      )}
    >
      <button
        id={buttonId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className={cn(
          "flex w-full items-start justify-between gap-5 p-5 text-left md:p-6",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        )}
      >
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary">
            {number}
          </p>

          <h3 className="mt-2 text-base font-semibold leading-6 text-foreground md:text-[15px]">
            {question}
          </h3>
        </div>

        {/* Premium icon transition */}
        <span className="relative mt-1 h-6 w-6 shrink-0 text-primary">
          <Plus
            size={20}
            className={cn(
              "absolute inset-0 transition-all duration-300",
              isOpen
                ? "opacity-0 rotate-90 scale-90"
                : "opacity-100 rotate-0 scale-100"
            )}
          />
          <Minus
            size={20}
            className={cn(
              "absolute inset-0 transition-all duration-300",
              isOpen
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 -rotate-90 scale-90"
            )}
          />
        </span>
      </button>

      {/* Smooth accordion body */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(
          "accordion-panel grid",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 md:px-6 md:pb-6">
            <div className="border-t border-border pt-4">
              <p className="text-sm leading-7 text-muted-foreground">{answer}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}