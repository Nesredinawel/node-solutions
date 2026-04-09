import {
  HeroSection,
  BrandLogos,
  HomeServicesPreview,
  WhyChooseUs,
  TestimonialsPreview,
  FaqPreview,
} from "@/features/home";
import { ContactCta, ContactForm } from "@/features/contact";
import { ScrollToSectionButton } from "@/shared/components/common/scroll-to-section-button";
import { ScrollReveal } from "@/shared/components/common/scroll-reveal";

export default function HomePage() {
  return (
    <main className="">
      <HeroSection />
      
      <ScrollReveal as="section" delayMs={0}>
        <BrandLogos />
      </ScrollReveal>

      <ScrollReveal as="section" delayMs={60}>
        <HomeServicesPreview />
      </ScrollReveal>

      <ScrollReveal as="section" delayMs={80}>
        <WhyChooseUs />
      </ScrollReveal>

      <ScrollReveal as="section" delayMs={100}>
        <TestimonialsPreview />
      </ScrollReveal>

      <ScrollReveal as="section" delayMs={120}>
        <FaqPreview />
      </ScrollReveal>

      <ScrollReveal as="section" delayMs={140} glow>
        <ContactCta />
      </ScrollReveal>

      <ScrollReveal as="section" delayMs={160}>
        <ContactForm />
      </ScrollReveal>

      <ScrollToSectionButton targetId="home-top" />
    </main>
  );
}