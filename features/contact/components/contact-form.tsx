"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ServiceInterestSelector } from "./service-interest-selector";
import { ContactSuccessModal } from "./contact-success-modal";
import { contactServices } from "../data/contact-services.data";
import { contactSchema, type ContactFormValues } from "../schema/contact.schema";
import { submitContact } from "../actions/submit-contact";
import { useToast } from "@/shared/components/common/toast-provider";
import { LoadingOverlay } from "@/shared/components/common/loading-overlay";
import { fireSuccessConfetti } from "@/shared/lib/confetti";
import { getServices } from "@/app/api/strapi/api";

type ContactFormProps = {
  prefillServiceSlug?: string;
};

type ServiceOption = {
  slug: string;
  title: string;
  description: string;
  image: string;
};

export function ContactForm({ prefillServiceSlug }: ContactFormProps) {
  const [isPending, startTransition] = useTransition();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [banner, setBanner] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [servicesOptions, setServicesOptions] = useState<ServiceOption[]>(contactServices as unknown as ServiceOption[]);

  useEffect(() => {
    const fetchDynamicServices = async () => {
      try {
        const data = await getServices();
        if (data && data.length > 0) {
          const mapped = data.map((item: any, i: number) => {
            const rawDescription = item.subHeader || item.description || "";
            const truncatedDesc = rawDescription.length > 65 
              ? rawDescription.substring(0, 65).trim() + "..." 
              : rawDescription;

            return {
              slug: item.slug || `service-${i}`,
              title: item.header || item.title || "Service",
              description: truncatedDesc,
              image: contactServices[i % contactServices.length]?.image || "",
            };
          });
          setServicesOptions(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    };
    fetchDynamicServices();
  }, []);

  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      services: [],   // stores slugs
      message: "",
    },
  });

  const selectedServices = watch("services");

  // ✅ ensure we prefill only once (ever)
  const hasPrefilledRef = useRef(false);

  // ✅ Auto-select service from URL (?service=slug)
  useEffect(() => {
    if (!prefillServiceSlug) return;
    if (hasPrefilledRef.current) return;

    const current = selectedServices ?? [];
    if (current.length > 0) {
      hasPrefilledRef.current = true;
      return;
    }

    const exists = servicesOptions.some((s) => s.slug === prefillServiceSlug);

    if (exists) {
      setValue("services", [prefillServiceSlug], {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

    hasPrefilledRef.current = true;
  }, [prefillServiceSlug, selectedServices, setValue, servicesOptions]);

  const handleToggleService = (slug: string) => {
    const current = selectedServices || [];

    if (current.includes(slug)) {
      setValue(
        "services",
        current.filter((item) => item !== slug),
        { shouldValidate: true }
      );
    } else {
      setValue("services", [...current, slug], { shouldValidate: true });
    }
  };

  const handleSelectAll = () => {
    setValue(
      "services",
      servicesOptions.map((service) => service.slug),
      { shouldValidate: true }
    );
  };

  const handleClearAll = () => {
    setValue("services", [], { shouldValidate: true });
  };

  const onSubmit = (values: ContactFormValues) => {
    setBanner(null);

    startTransition(async () => {
      const result = await submitContact(values);

      if (!result.success) {
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, messages]) => {
            if (!messages?.length) return;

            setError(field as keyof ContactFormValues, {
              type: "server",
              message: messages[0],
            });
          });
        }

        setBanner({ type: "error", message: result.message });

        showToast({
          title: "Submission failed",
          description: result.message,
          variant: "error",
        });

        return;
      }

      reset({
        firstName: "",
        lastName: "",
        email: "",
        services: [],
        message: "",
      });

      setBanner({ type: "success", message: result.message });

      fireSuccessConfetti();
      setShowSuccessModal(true);

      showToast({
        title: "Inquiry sent",
        description: result.message,
        variant: "success",
      });
    });
  };

  return (
    <>
      <ContactSuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />

      <section className="pb-20 pt-10 md:pb-28 md:pt-16" id="contact-top">
        <div className="container-main">
          <div className="relative mx-auto max-w-5xl rounded-[30px] border border-border bg-[var(--background-soft)] p-6 shadow-card md:p-8 lg:p-10">
            {isPending ? <LoadingOverlay /> : null}

            <div className="mb-10 text-center">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
                Contact Form
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                Let&apos;s Build Something Great Together
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                Share your project details and we’ll help you shape the right
                creative, strategic, and technical direction.
              </p>
            </div>

            {banner ? (
              <div
                className={`mb-8 rounded-2xl border px-4 py-3 text-sm ${banner.type === "success"
                  ? "border-green-500/20 bg-green-500/10 text-green-700 dark:text-green-400"
                  : "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-400"
                  }`}
              >
                {banner.message}
              </div>
            ) : null}

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    {...register("firstName")}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring"
                  />
                  {errors.firstName ? (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.firstName.message}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    {...register("lastName")}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring"
                  />
                  {errors.lastName ? (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.lastName.message}
                    </p>
                  ) : null}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  {...register("email")}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring"
                />
                {errors.email ? (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                ) : null}
              </div>

              <ServiceInterestSelector
                options={servicesOptions}
                selected={selectedServices || []}
                onToggle={handleToggleService}
                onSelectAll={handleSelectAll}
                onClearAll={handleClearAll}
                error={errors.services?.message}
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Project Details
                </label>
                <p className="mb-4 text-sm leading-6 text-muted-foreground">
                  Tell us about your goals, timeline, challenges, or anything else
                  that helps us understand your project better.
                </p>

                <textarea
                  rows={6}
                  placeholder="Tell us about your project..."
                  {...register("message")}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring"
                />
                {errors.message ? (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.message.message}
                  </p>
                ) : null}
              </div>

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-xl bg-primary px-8 py-3 text-sm font-medium text-[var(--color-primary-foreground)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Send Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}