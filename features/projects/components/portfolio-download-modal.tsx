"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import {
  PORTFOLIO_CATEGORIES,
  type PortfolioCategoryKey,
} from "@/features/projects/data/portfolio-download.data";

type PortfolioDownloadModalProps = {
  open: boolean;
  onClose: () => void;
};

export function PortfolioDownloadModal({
  open,
  onClose,
}: PortfolioDownloadModalProps) {
  const allKeys = useMemo(
    () => PORTFOLIO_CATEGORIES.map((c) => c.key),
    []
  );

  const [selected, setSelected] = useState<PortfolioCategoryKey[]>(allKeys);

  // Reset to all selected when modal opens (optional)
  useEffect(() => {
    if (open) setSelected(allKeys);
  }, [open, allKeys]);

  // ESC to close
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const allSelected = selected.length === allKeys.length;

  const toggle = (key: PortfolioCategoryKey) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]
    );
  };

  const selectAll = () => setSelected(allKeys);
  const clearAll = () => setSelected([]);

  const onDownload = () => {
    const categoriesParam = selected.join(",");
    const url = `/api/portfolio/download?categories=${encodeURIComponent(
      categoriesParam
    )}`;

    // Suggested filename
    const filename =
      selected.length === 0
        ? "NodeSolution-Portfolio.pdf"
        : `NodeSolution-Portfolio-${selected.length}categories.pdf`;

    const a = document.createElement("a");
    a.href = url;
    a.download = filename; // browsers may ignore for API response, but it's ok
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[28px] border border-border bg-[var(--background-soft)] shadow-glow">
        <div className="flex items-center justify-between border-b border-border p-5 md:p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Download
            </p>
            <h3 className="mt-1 text-xl font-semibold text-foreground">
              Portfolio
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose categories to include in your PDF portfolio template.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:bg-secondary hover:text-primary"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 md:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Selected:{" "}
              <span className="font-medium text-foreground">
                {selected.length || "0"}
              </span>
            </p>

            <div className="flex items-center gap-2">
              {!allSelected ? (
                <button
                  type="button"
                  onClick={selectAll}
                  className="rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
                >
                  Select All
                </button>
              ) : (
                <button
                  type="button"
                  onClick={clearAll}
                  className="rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {PORTFOLIO_CATEGORIES.map((item) => {
              const isSelected = selected.includes(item.key);

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => toggle(item.key)}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border text-left transition-all duration-300",
                    isSelected
                      ? "border-primary shadow-glow"
                      : "border-border hover:border-primary/40"
                  )}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />
                  <div className="absolute inset-0 bg-black/65" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/45 to-black/80" />
                  {isSelected && <div className="absolute inset-0 bg-primary/10" />}
                  <div className="absolute inset-0 border border-white/8 bg-white/[0.02]" />

                  <div className="relative flex min-h-[160px] flex-col justify-between p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="max-w-[85%]">
                        <h4
                          className={cn(
                            "text-base font-semibold transition",
                            isSelected ? "text-primary" : "text-white"
                          )}
                        >
                          {item.title}
                        </h4>
                        <p className="mt-2 text-sm leading-6 text-white/75">
                          {item.description}
                        </p>
                      </div>

                      <div
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold transition",
                          isSelected
                            ? "border-primary bg-primary text-[var(--color-primary-foreground)]"
                            : "border-white/15 bg-black/20 text-transparent group-hover:text-white/50"
                        )}
                      >
                        ✓
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/55">
                        Select Category
                      </p>

                      <span
                        className={cn(
                          "rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] transition",
                          isSelected
                            ? "bg-primary text-[var(--color-primary-foreground)]"
                            : "border border-white/10 bg-white/5 text-white/70"
                        )}
                      >
                        {isSelected ? "Selected" : "Available"}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              This is a demo PDF template. You can replace it later via CMS.
            </p>

            <Button
              onClick={onDownload}
              className="rounded-xl"
              disabled={selected.length === 0}
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}