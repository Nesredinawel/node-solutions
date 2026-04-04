"use client";

import { useMemo } from "react";
import { TestimonialCard } from "./testimonial-card";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

type TestimonialsCarouselProps = {
  testimonials: Testimonial[];
};

export function TestimonialsCarousel({
  testimonials,
}: TestimonialsCarouselProps) {
  const repeatedTestimonials = useMemo(
    () => [...testimonials, ...testimonials],
    [testimonials]
  );

  return (
    <div className="relative overflow-hidden">
      <div className="testimonial-marquee-wrapper">
        <div className="testimonial-marquee flex w-max gap-3 py-4 sm:gap-4 sm:py-5 md:gap-5 lg:gap-6">
          {repeatedTestimonials.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="w-[220px] shrink-0 sm:w-[250px] md:w-[290px] lg:w-[340px] xl:w-[380px]"
            >
              <TestimonialCard
                quote={item.quote}
                name={item.name}
                role={item.role}
                avatar={item.avatar}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background via-background/92 to-transparent sm:w-14 md:w-20 lg:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background via-background/92 to-transparent sm:w-14 md:w-20 lg:w-24" />
    </div>
  );
}