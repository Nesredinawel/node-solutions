"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  ServicesPageHero,
  ServiceShowcaseSection,
  ServicesPageCta,
} from "@/features/services";
import { servicesPageData } from "@/features/services/data/services-page.data";
import { ScrollToSectionButton } from "@/shared/components/common/scroll-to-section-button";

function ServicesPageContent() {
  const searchParams = useSearchParams();
  const requestedSlug = searchParams.get("service");
  const defaultSlug = servicesPageData[0]?.slug ?? "";

  const initialOpenSlug = useMemo(() => {
    if (!requestedSlug) return defaultSlug;
    const exists = servicesPageData.some((s) => s.slug === requestedSlug);
    return exists ? requestedSlug : defaultSlug;
  }, [requestedSlug, defaultSlug]);

  const [openSlug, setOpenSlug] = useState<string>(initialOpenSlug);

  useEffect(() => {
    setOpenSlug(initialOpenSlug);
  }, [initialOpenSlug]);

  useEffect(() => {
    if (!requestedSlug) return;

    const el = document.getElementById(`service-${requestedSlug}`);
    if (!el) return;

    const t = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);

    return () => window.clearTimeout(t);
  }, [requestedSlug]);

  return (
    <main className="">
      <ServicesPageHero />

      <div className="container-main py-12 md:py-16">
        <div className="space-y-14 md:space-y-20">
          {servicesPageData.map((service) => (
            <ServiceShowcaseSection
              key={service.slug}
              service={service}
              isOpen={openSlug === service.slug}
              onToggle={() =>
                setOpenSlug((current) => (current === service.slug ? "" : service.slug))
              }
            />
          ))}
        </div>
      </div>

      <ServicesPageCta />
      <ScrollToSectionButton targetId="services-top" />
    </main>
  );
}

export default function ServicesPage() {
  return (
    <Suspense>
      <ServicesPageContent />
    </Suspense>
  );
}