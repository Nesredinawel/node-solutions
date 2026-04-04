import {
  ContactPageHero,
  ContactInfoCards,
  ContactCta,
  ContactForm,
} from "@/features/contact";

export default function ContactPage() {
  return (
    <main className="">
      <ContactPageHero />
      <ContactInfoCards />
      <ContactCta />
      <ContactForm />
    </main>
  );
}