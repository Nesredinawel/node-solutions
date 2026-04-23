import { SectionHeading } from "@/shared/components/ui/section-heading";
import { getServices } from "@/app/api/strapi/route";
import { ServiceCard } from "@/features/services/components/service-card";
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
import type { ElementType } from "react";

const ICON_MAP: Record<string, ElementType> = {
  BarChart3,
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

export async function HomeServicesPreview() {
  const services = await getServices();

  return (
    <section className="section-space">
      <SectionHeading
        title="Our Services"
        description="Integrated solutions that combine design, technical expertise, and strategic thinking to help businesses grow."
      />

      <div className="container-main mt-10 grid gap-6 md:grid-cols-2">
        {services.map((service: any) => {
          const iconName = String(service.icon || "Default").trim();
          const IconComponent = ICON_MAP[iconName] ?? ICON_MAP.Default;
          return (
            <ServiceCard
              key={service.id || service.slug}
              title={service.header || service.title}
              description={service.subHeader || service.description}
              href={`/services/${service.slug}`}
              icon={<IconComponent size={20} />}
            />
          );
        })}
      </div>
    </section>
  );
}