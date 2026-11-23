import { z } from "zod";

/** Validation rules for the contact form — mirrored by database checks. */
export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(100, "Name must be under 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be under 255 characters"),
  subject: z
    .string()
    .trim()
    .min(2, "Please add a subject")
    .max(150, "Subject must be under 150 characters"),
  message: z
    .string()
    .trim()
    .min(10, "Please share a few more details (at least 10 characters)")
    .max(3000, "Project details must be under 3000 characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;
