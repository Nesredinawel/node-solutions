import { cn } from "@/shared/lib/utils";
import { BackgroundPattern } from "@/shared/components/common/background-pattern";

type SectionHeadingProps = {
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <section className={cn("pt-6 md:pt-8", className)}>
      <div className="container-main">
        <div className="premium-neon-frame section-banner-bg relative overflow-hidden rounded-2xl border border-border px-6 py-12 text-center shadow-card md:px-10 md:py-16">
          <BackgroundPattern variant="hero" />

          <div className="premium-neon-border absolute inset-0 rounded-2xl" />
          <div className="premium-neon-glow absolute inset-0 rounded-2xl" />

          <div className="relative mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {title}
            </h2>

            {description && (
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}