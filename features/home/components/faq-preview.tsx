"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { SectionHeading } from "@/shared/components/ui/section-heading";
import { faqs as initialFaqs } from "@/features/faq/data/faq.data";
import { FaqCard } from "../../faq/components/faq-card";
import { getFAQs } from "@/app/api/strapi/api";

export function FaqPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<any[]>(initialFaqs);
  const baseId = useId();

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await getFAQs();
        if (data && data.length > 0) {
          setFaqs(data);
        }
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
      }
    };

    fetchFaqs();
  }, []);

  // Split into two fixed columns so grid row heights don't stretch neighbors
  const { left, right, mid } = useMemo(() => {
    const mid = Math.ceil(faqs.length / 2);
    return {
      mid,
      left: faqs.slice(0, mid),
      right: faqs.slice(mid),
    };
  }, [faqs]);

  return (
    <section className="section-space pt-0">
      <SectionHeading
        title="Frequently Asked Questions"
        description="Answers to common questions about our services, process, timelines, and support."
      />

      <div className="container-main mt-10 grid items-start gap-4 lg:grid-cols-2 lg:gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-4">
          {left.map((faq, i) => {
            const index = i;
            const isOpen = openIndex === index;

            return (
              <FaqCard
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                number={String(index + 1).padStart(2, "0")}
                isOpen={isOpen}
                onToggle={() => setOpenIndex(isOpen ? null : index)}
                panelId={`${baseId}-panel-${index}`}
                buttonId={`${baseId}-button-${index}`}
              />
            );
          })}
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">
          {right.map((faq, i) => {
            const index = mid + i;
            const isOpen = openIndex === index;

            return (
              <FaqCard
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                number={String(index + 1).padStart(2, "0")}
                isOpen={isOpen}
                onToggle={() => setOpenIndex(isOpen ? null : index)}
                panelId={`${baseId}-panel-${index}`}
                buttonId={`${baseId}-button-${index}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}