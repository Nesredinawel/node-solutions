"use client";

import { useState } from "react";
import {
  ServicesPageHero,
  ServiceShowcaseSection,
  ServicesPageCta,
} from "@/features/services";
import { servicesPageData } from "@/features/services/data/services-page.data";

export default function ServicesPage() {
  const [openSlug, setOpenSlug] = useState<string>(
    servicesPageData[0]?.slug ?? ""
  );

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
                setOpenSlug((current) =>
                  current === service.slug ? "" : service.slug
                )
              }
            />
          ))}
        </div>
      </div>

      <ServicesPageCta />
    </main>
  );
}