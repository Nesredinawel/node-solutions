"use server";

import { contactSchema, type ContactFormValues } from "../schema/contact.schema";

type SubmitContactResult =
  | { success: true; message: string }
  | {
      success: false;
      message: string;
      fieldErrors?: Partial<Record<keyof ContactFormValues, string[]>>;
    };

export async function submitContact(
  values: ContactFormValues
): Promise<SubmitContactResult> {
  const parsed = contactSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten()
        .fieldErrors as Partial<Record<keyof ContactFormValues, string[]>>,
    };
  }

  try {
    // TODO: send email / save to DB
    await new Promise((resolve) => setTimeout(resolve, 900));

    // No-op for logging in production
    // console.log("Contact submission:", parsed.data);

    return {
      success: true,
      message: "Your inquiry has been sent successfully.",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong while sending your inquiry.",
    };
  }
}