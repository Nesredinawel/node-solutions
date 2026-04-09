import {
  ShieldCheck,
  Users,
  LineChart,
  Handshake,
} from "lucide-react";
import { SectionHeading } from "@/shared/components/ui/section-heading";

const features = [
  {
    title: "Expert Team",
    description:
      "Our specialists combine strategy, creativity, and technical execution to deliver polished solutions with real business value.",
    icon: ShieldCheck,
  },
  {
    title: "Client-Centric Approach",
    description:
      "We shape every project around your goals, your audience, and your business context instead of using generic templates.",
    icon: Users,
  },
  {
    title: "Results-Driven Solutions",
    description:
      "Every service is planned to improve visibility, strengthen operations, and create measurable impact across your brand.",
    icon: LineChart,
  },
  {
    title: "Collaborative Partnership",
    description:
      "We work closely with your team throughout the project to ensure clarity, alignment, and long-term success.",
    icon: Handshake,
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-space pt-0">
      <SectionHeading
        title="Why Choose Node Solution?"
        description="We bring together creativity, operations, and technology to build connected experiences that support business growth."
      />

      <div className="container-main mt-10 grid gap-6 md:grid-cols-2">
        {features.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="glass-card rounded-2xl p-6 shadow-card"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-primary">
                <Icon size={22} />
              </div>

              <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}