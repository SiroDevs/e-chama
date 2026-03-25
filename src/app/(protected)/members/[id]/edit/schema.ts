import { z } from "zod";

export const memberSchema = z.object({
  first_name: z.string().min(2, { message: "Your first name is too short" }),
  last_name: z.string().min(2, { message: "Your last name is too short" }),

  phone: z
    .string()
    .max(15, "Phone number is too long")
    .refine((val) => val === "" || val.length >= 10, {
      message: "Phone number must be at least 10 digits",
    })
    .optional()
    .or(z.literal("")),

  id_number: z
    .string()
    .max(20, "ID number is too long")
    .refine((val) => val === "" || val.length >= 5, {
      message: "ID number must be at least 5 characters",
    })
    .optional()
    .or(z.literal("")),

  kra_pin: z
    .string()
    .max(20, "KRA PIN is too long")
    .refine((val) => val === "" || val.length >= 5, {
      message: "KRA PIN must be at least 5 characters",
    })
    .optional()
    .or(z.literal("")),

  member_no: z
    .string()
    .max(20, "Member number is too long")
    .refine((val) => val === "" || val.length >= 3, {
      message: "Member number must be at least 3 characters",
    })
    .optional()
    .or(z.literal("")),

  role: z
    .string()
    .optional()
    .or(z.literal("")),

  dob: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val) return true;
      const date = new Date(val);
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      const monthDiff = today.getMonth() - date.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
        return age - 1 >= 18;
      }
      return age >= 18;
    }, { message: "Member must be at least 18 years old" }),

  sex: z
    .enum(["male", "female", "other"])
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (val === "") return true;
      return ["male", "female", "other"].includes(val!);
    }, { message: "Please select a valid gender" }),

  country: z
    .string()
    .min(2, { message: "Please select a country" })
    .optional()
    .or(z.literal("")),
});

export const sexOptions = [
  { value: "", label: "Prefer not to say" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
] as const;

export type MemberFormValues = z.infer<typeof memberSchema>;
