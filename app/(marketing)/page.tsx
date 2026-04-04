import {
  HeroSection,
  BrandLogos,
  HomeServicesPreview,
  WhyChooseUs,
  TestimonialsPreview,
  FaqPreview,
} from "@/features/home";
import { ContactCta, ContactForm } from "@/features/contact";

export default function HomePage() {
  return (
    <main className="">
      <HeroSection />
      <BrandLogos />
      <HomeServicesPreview />
      <WhyChooseUs />
      <TestimonialsPreview />
      <FaqPreview />
      <ContactCta />
      <ContactForm />
    </main>
  );
}