import {
  AboutPageHero,
  AboutIntroSection,
  StorySection,
  AboutPageCta,
} from "@/features/about";

export default function AboutPage() {
  return (
    <main className="bg-background">
      <AboutPageHero />
      <AboutIntroSection />
      <StorySection />
      <AboutPageCta />
    </main>
  );
}