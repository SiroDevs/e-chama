import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const signinLabels = {
  email: {
    name: "email" as const,
    label: "Email Address",
    placeholder: "you@mail.com",
    required: true,
  },
  password: {
    name: "passsword" as const,
    label: "Password",
    placeholder: "******",
    required: true,
  },
};