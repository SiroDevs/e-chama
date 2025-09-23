import { z } from "zod";

export const newContributionSchema = z.object({
  title: z.string()
    .min(5, "Contribution title is required")
    .max(100, "Contribution title is too long"),
  mode: z.string()
    .min(5, "Contribution mode are required"),
  amount: z.number(),
  reference: z.string().min(5, "Contribution reference is required"),
});

export const newContributionLabels = {
  title: {
    name: "title" as const,
    label: "Contribution Title",
    placeholder: "Enter Contribution Title",
    required: true,
    type: "text" as const,
  },
  amount: {
    name: "amount" as const,
    label: "Amount Contributed",
    placeholder: "100000",
    required: true,
    type: "number" as const,
  },
  mode: {
    name: "mode" as const,
    label: "Contribution Role",
    required: true,
    type: "select" as const,
    options: [
      { value: "mpesa", label: "Mpesa" },
      { value: "cash", label: "Cash" },
      { value: "cheque", label: "Cheque Deposit" },
      { value: "eft", label: "Bank EFT" },
    ],
  },
  reference: {
    name: "reference" as const,
    label: "Reference",
    placeholder: "Location of your Contribution ...",
    required: true,
    type: "text" as const,
  },
};

export type NewContributionFormValues = z.infer<typeof newContributionSchema>;

export const newContributionFieldGroups = [
  {
    id: 1,
    fields: ["title"] as const,
  },
  {
    id: 2,
    fields: ["mode", "amount"] as const,
  },
  {
    id: 3,
    fields: ["reference"] as const,
  },
];