"use client";

import { useEffect, useMemo, useState } from "react";
import { TestimonialCard } from "./testimonial-card";
import { getTestimonials } from "@/app/api/strapi/api";

type Testimonial = {
  quote?: string;
  description?: string;
  name: string;
  role?: string;
  position?: string;
  avatar?: string;
};

type TestimonialsCarouselProps = {
  testimonials: Testimonial[];
};

export function TestimonialsCarousel({
  testimonials: initialTestimonials,
}: TestimonialsCarouselProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonials();
        if (data && data.length > 0) {
          const mergedData = data.map((d: any, index: number) => ({
            ...d,
            avatar: d.avatar || initialTestimonials[index % initialTestimonials.length]?.avatar,
          }));
          setTestimonials(mergedData);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      }
    };

    fetchTestimonials();
  }, [initialTestimonials]);

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
                quote={item.description || item.quote || ""}
                name={item.name}
                role={item.position || item.role || ""}
                avatar={item.avatar || ""}
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