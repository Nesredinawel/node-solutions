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
        <div className="testimonial-marquee flex w-max gap-5 py-6 sm:gap-6 md:gap-7">
          {repeatedTestimonials.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="w-[300px] shrink-0 sm:w-[340px] md:w-[390px] lg:w-[430px] xl:w-[470px]"
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

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background via-background/88 to-transparent sm:w-20 md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background via-background/88 to-transparent sm:w-20 md:w-24" />
    </div>
  );
}