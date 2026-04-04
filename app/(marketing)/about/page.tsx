import {
  AboutPageHero,
  AboutIntroSection,
  StorySection,
  AboutPageCta,
} from "@/features/about";

export default function AboutPage() {
  return (
    <main className="">
      <AboutPageHero />
      <AboutIntroSection />
      <StorySection />
      <AboutPageCta />
    </main>
  );
}