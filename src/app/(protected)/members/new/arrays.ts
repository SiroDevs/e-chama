import { z } from "zod";

export const createGroupSchema = z.object({
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

export const createGroupLabels = {
  title: {
    name: "title" as const,
    label: "Chama Name *",
    placeholder: "Enter Chama Name",
    required: true,
  },
  description: {
    name: "description" as const,
    label: "Chama Description (Optional)",
    placeholder: "Describe your chama",
    required: false,
  },
  initials: {
    name: "initials" as const,
    label: "Initials",
    placeholder: "Initials if the name is too long ...",
    required: true,
  },
  location: {
    name: "location" as const,
    label: "Location",
    placeholder: "Location of your Chama ...",
    required: true,
  },
  address: {
    name: "address" as const,
    label: "Address (Optional)",
    placeholder: "Address of your Chama ...",
    required: false,
  },
};