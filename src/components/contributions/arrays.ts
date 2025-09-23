import { z } from "zod";

export const newContributionSchema = z.object({
  amount: z.number()
    .positive("Amount must be positive")
    .min(1, "Amount must be at least 1"),
  mode: z.string()
    .min(5, "Contribution mode are required"),
  reference: z.string().min(5, "Contribution reference is required"),
  reason: z.string()
    .min(5, "Contribution reason is required")
    .max(100, "Contribution reason is too long"),
});

export const newContributionLabels = {
  amount: {
    name: "amount" as const,
    label: "Amount Contributed",
    placeholder: "1000",
    required: true,
    type: "text" as const,
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
    placeholder: "Reference of this Contribution",
    required: true,
    type: "text" as const,
  },
  reason: {
    name: "reason" as const,
    label: "Contribution Reason",
    placeholder: "September Contribution",
    required: true,
    type: "text" as const,
  },
};

export const newContributionFieldGroups = [
  {
    id: 1,
    fields: ["mode", "amount"] as const,
  },
  {
    id: 2,
    fields: ["reference"] as const,
  },
  {
    id: 3,
    fields: ["reason"] as const,
  },
];