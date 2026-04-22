"use client";

import { getBrand } from "@/app/api/strapi/route";
import { useMemo, useState, useEffect } from "react";

export function BrandLogos() {
  const [brandData, setBrandData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const result = await getBrand();
        setBrandData(result);
      } catch (error) {
        console.error("Failed to load brand:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrand();
  }, []);

  const repeatedBrands = useMemo(() => {
    if (!brandData?.brand) return [];
    return [...brandData.brand, ...brandData.brand];
  }, [brandData]);

  if (loading) return <div className="h-24 w-full bg-[var(--background-soft)] animate-pulse" />;
  if (!brandData?.brand) return null;

  return (
    <section className="relative overflow-hidden border-b border-border bg-[var(--background-soft)]">
      <div className="container-main py-10 md:py-12">
        <div className="relative overflow-hidden">
          <div className="brand-marquee-wrapper">
            <div className="brand-marquee flex w-max items-center gap-10 sm:gap-12 md:gap-16 lg:gap-20">
              {repeatedBrands.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="shrink-0 text-center text-xs font-medium uppercase tracking-[0.24em] text-foreground/70 transition duration-300 hover:text-foreground sm:text-sm"
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-14 md:w-20 lg:w-24"
            style={{
              background:
                "linear-gradient(to right, var(--background-soft), color-mix(in srgb, var(--background-soft) 88%, transparent), transparent)",
            }}
          />

          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-14 md:w-20 lg:w-24"
            style={{
              background:
                "linear-gradient(to left, var(--background-soft), color-mix(in srgb, var(--background-soft) 88%, transparent), transparent)",
            }}
          />
        </div>
      </div>
    </section>
  );
}