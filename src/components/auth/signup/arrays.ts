import { z } from "zod";

export const signupSchema = z.object({
  first_name: z
    .string()
    .min(4, { message: "Your name must be at least 4 characters" }),
  last_name: z
    .string()
    .min(4, { message: "Your name must be at least 4 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  terms: z.literal(true, {
    message: "You must agree to the terms & conditions",
  }),
});

export const signupLabels = {
  first_name: {
    name: "first_name" as const,
    label: "First Name",
    placeholder: "Kamau",
    required: true,
  },
  last_name: {
    name: "last_name" as const,
    label: "Last Name",
    placeholder: "Onyango",
    required: true,
  },
  email: {
    name: "email" as const,
    label: "Email Address",
    placeholder: "you@mail.com",
    required: true,
  },
};