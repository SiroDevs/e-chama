import { z } from "zod";

export const GroupSchema = z.object({
  title: z.string()
    .min(5, "Chama name is required")
    .max(100, "Chama name is too long"),
  description: z.string().optional(),
  initials: z.string()
  .min(3, "Chama initials are required")
  .max(10, "Initials are too long"),
  location: z.string().min(5, "Chama name is required"),
  address: z.string().optional(),
});

export type GroupFormValues = z.infer<typeof GroupSchema>;

export const groupFields = {
  title: {
    name: "title" as const,
    label: "Chama Name",
    placeholder: "Enter Chama Name",
    required: true,
    type: "text" as const,
  },
  description: {
    name: "description" as const,
    label: "Chama Description (Optional)",
    placeholder: "Describe your chama",
    required: false,
    type: "text" as const,
  },
  initials: {
    name: "initials" as const,
    label: "Initials",
    placeholder: "Initials if the name is too long ...",
    required: false,
    type: "text" as const,
  },
  location: {
    name: "location" as const,
    label: "Location",
    placeholder: "Location of your Chama ...",
    required: true,
    type: "text" as const,
  },
  address: {
    name: "address" as const,
    label: "Address (Optional)",
    placeholder: "Address of your Chama ...",
    required: false,
    type: "text" as const,
  },
};