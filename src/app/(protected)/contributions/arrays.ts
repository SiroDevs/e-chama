import { z } from "zod";

export const newContributionSchema = z.object({
  member_id: z.string().min(1, "Please select a member"),
  amount: z.coerce.number()
    .positive("Amount must be positive")
    .min(1, "Amount must be at least 1"),
  mode: z.string().min(1, "Mode of payment is required"),
  reference: z.string().min(1, "Reference is required"),
  reason: z.string().min(3, "Reason is required").max(100, "Reason is too long"),
});

export type ContributionFormValues = z.infer<typeof newContributionSchema>;

export const contributionFields = {
  member_id: {
    name: "member_id" as const,
    label: "Member",
    placeholder: "Search by name or member no...",
    required: true,
    type: "member-search" as const,
  },
  amount: {
    name: "amount" as const,
    label: "Amount (KES)",
    placeholder: "1000",
    required: true,
    type: "number" as const,
  },
  mode: {
    name: "mode" as const,
    label: "Mode of Payment",
    required: true,
    type: "select" as const,
    options: [
      { value: "mpesa", label: "M-Pesa" },
      { value: "cash", label: "Cash" },
      { value: "cheque", label: "Cheque Deposit" },
      { value: "eft", label: "Bank EFT" },
    ],
  },
  reference: {
    name: "reference" as const,
    label: "Reference",
    placeholder: "MPESA code, cheque no.",
    required: true,
    type: "text" as const,
  },
  reason: {
    name: "reason" as const,
    label: "Reason",
    placeholder: "September Contribution",
    required: true,
    type: "text" as const,
  },
};

export const contributionGroups = [
  { id: "member", fields: ["member_id"] as const },
  { id: "amount-mode", fields: ["amount", "mode"] as const },
  { id: "reference-reason", fields: ["reference", "reason"] as const },
];