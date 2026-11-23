import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contact-schema";

const valid = {
  fullName: "Jane Doe",
  email: "jane@example.com",
  subject: "New website",
  message: "I need a WordPress site for my shop.",
};

describe("contact form rules", () => {
  it("accepts a complete message", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("requires a valid email address", () => {
    expect(contactSchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
  });

  it("requires project details of at least 10 characters", () => {
    expect(contactSchema.safeParse({ ...valid, message: "too short" }).success).toBe(false);
  });

  it("requires a full name", () => {
    expect(contactSchema.safeParse({ ...valid, fullName: " " }).success).toBe(false);
  });
});
