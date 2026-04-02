import { SectionHeading } from "@/shared/components/ui/section-heading";
import { testimonials } from "@/features/testimonials/data/testimonials.data";
import { TestimonialsCarousel } from "@/features/testimonials/components/testimonials-carousel";

export function TestimonialsPreview() {
  return (
    <section className="section-space pt-0">
      <SectionHeading
        title="What Our Clients Say About Us"
        description="Businesses trust Node Solution for dependable execution, thoughtful design, and long-term partnership."
      />

      <div className="container-main mt-10">
        <TestimonialsCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}