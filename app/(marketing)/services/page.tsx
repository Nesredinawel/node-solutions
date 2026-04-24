"use client";

import { Suspense, useEffect, useMemo, useState, type ElementType } from "react";
import { useSearchParams } from "next/navigation";
import {
  BarChart3,
  Building2,
  ChartColumn,
  Orbit,
  Printer,
  Network,
  Search,
  PenTool,
  PanelsTopLeft,
  Presentation,
  BadgeDollarSign,
  LayoutGrid,
  Package,
  ScanText,
  PaintBucket,
  Hammer,
  Ruler,
  Sofa,
  Wrench,
  Router,
  ShieldCheck,
  Server,
  Headphones,
} from "lucide-react";

import {
  ServicesPageHero,
  ServiceShowcaseSection,
  ServicesPageCta,
} from "@/features/services";
import { getServices } from "@/app/api/strapi/api";
import { servicesPageData } from "@/features/services/data/services-page.data";
import { ScrollToSectionButton } from "@/shared/components/common/scroll-to-section-button";

const ICON_MAP: Record<string, ElementType> = {
  ChartColumn,
  Building2,
  Printer,
  Network,
  Search,
  PenTool,
  PanelsTopLeft,
  Presentation,
  BadgeDollarSign,
  LayoutGrid,
  Package,
  ScanText,
  PaintBucket,
  Hammer,
  Ruler,
  Sofa,
  Wrench,
  Router,
  ShieldCheck,
  Server,
  Headphones,
  Default: Orbit,
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const getMediaUrl = (url?: string) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (url.startsWith("/")) return url;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
  return `${baseUrl}${url}`;
};

type ServiceSection = {
  slug: string;
  title: string;
  description: string;
  image: string;
  icon: ElementType;
  groups: Array<{
    title: string;
    items: Array<{ title: string; icon: ElementType }>;
  }>;
};

const mapApiService = (item: any): ServiceSection => {
  const slug = slugify(item.header || item.title || String(item.id));
  const iconName = String(item.icon || "Default").trim();
  const icon = ICON_MAP[iconName] ?? ICON_MAP.Default;

  const image =
    getMediaUrl(item.image?.formats?.large?.url ?? item.image?.url) ||
    servicesPageData.find((service) => service.slug === slug)?.image ||
    "";

  const groups = (item.category ?? []).map((category: any) => ({
    title: category.title || "Category",
    items: (category.items ?? []).map((child: any) => {
      const childIconName = String(child.icon || item.icon || "Default").trim();
      const childIcon = ICON_MAP[childIconName] ?? ICON_MAP.Default;
      return {
        title: child.title || "Untitled",
        icon: childIcon,
      };
    }),
  }));

  return {
    slug,
    title: item.header || item.title || "Service",
    description: item.subHeader || item.description || "",
    image,
    icon,
    groups: groups.length ? groups : servicesPageData.find((service) => service.slug === slug)?.groups ?? [],
  };
};

function ServicesPageContent() {
  const searchParams = useSearchParams();
  const requestedSlug = searchParams.get("service");
  const [services, setServices] = useState<ServiceSection[]>(servicesPageData);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const apiServices = await getServices();
        if (Array.isArray(apiServices) && apiServices.length > 0) {
          setServices(apiServices.map(mapApiService));
        }
      } catch (error) {
        console.error("Failed to fetch /services:", error);
      }
    };

    loadServices();
  }, []);

  const defaultSlug = services[0]?.slug ?? "";

  const initialOpenSlug = useMemo(() => {
    if (!requestedSlug) return defaultSlug;
    const exists = services.some((service) => service.slug === requestedSlug);
    return exists ? requestedSlug : defaultSlug;
  }, [requestedSlug, defaultSlug, services]);

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
          {services.map((service) => (
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
