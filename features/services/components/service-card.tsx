import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ServiceCardProps = {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
};

export function ServiceCard({
  title,
  description,
  href,
  icon: Icon,
}: ServiceCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border shadow-card">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366412874-3415097a27e7?q=80&w=1200&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-black/65 transition duration-300 group-hover:bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/60" />

      <div className="relative flex min-h-[360px] flex-col justify-between p-6 md:p-8">
        <div>
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-sm">
            <Icon size={20} />
          </div>

          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="mt-4 text-sm leading-7 text-white/70">
            {description}
          </p>
        </div>

        <div className="mt-8">
          <Link
            href={href}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm !text-white backdrop-blur-sm transition hover:bg-white/15"
          >
            Learn More <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}