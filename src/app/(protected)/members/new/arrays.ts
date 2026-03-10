import { z } from "zod";

export const newMemberSchema = z
  .object({
    first_name: z.string().min(4, { message: "Your first name is too short" }),
    last_name: z.string().min(4, { message: "Your last name is too short" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  });
