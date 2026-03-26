import { z } from "zod";

export const newMemberSchema = z.object({
  first_name: z.string().min(2, { message: "Your first name is too short" }),
  last_name: z.string().min(2, { message: "Your last name is too short" }),

  phone: z
    .string()
    .max(12, "Phone number is too long")
    .refine((val) => val === "" || val.length >= 10, {
      message: "Phone number must be at least 10 digits",
    })
    .optional()
    .or(z.literal("")),

  id_number: z
    .string()
    .max(8, "ID number is too long")
    .refine((val) => val === "" || val.length >= 5, {
      message: "ID number must be at least 5 characters",
    })
    .optional()
    .or(z.literal("")),

  kra_pin: z
    .string()
    .max(15, "KRA PIN is too long")
    .refine((val) => val === "" || val.length >= 5, {
      message: "KRA PIN must be at least 5 characters",
    })
    .optional()
    .or(z.literal("")),

  member_no: z
    .string()
    .max(5, "Member number is too long")
    .refine((val) => val === "" || val.length >= 3, {
      message: "Member number must be at least 3 characters",
    })
    .optional()
    .or(z.literal("")),

  sex: z
    .enum(["male", "female", "other"])
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (val === "") return true;
      return ["male", "female", "other"].includes(val!);
    }, { message: "Please select a valid gender" }),

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

  address: z
    .string()
    .min(2, { message: "Please type member's address" })
    .optional()
    .or(z.literal("")),

  country: z
    .string()
    .min(2, { message: "Please select a country" })
    .optional()
    .or(z.literal("")),
    
  email: z.string().email({ message: "Please enter a valid email address" }),
  
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
    
  confirm_password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"],
});

export type NewMemberFormValues = z.infer<typeof newMemberSchema>;