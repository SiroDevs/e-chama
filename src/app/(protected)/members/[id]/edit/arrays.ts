import { GroupMember } from "@/domain/entities";
import { z } from "zod";

export const memberSchema = z.object({
  first_name: z.string().min(4, { message: "Your first name is too short" }),
  last_name: z.string().min(4, { message: "Your last name is too short" }),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long"),
  id_number: z
    .string()
    .min(5, "ID number must be at least 5 characters")
    .max(20, "ID number is too long"),
  kra_pin: z
    .string()
    .min(5, "KRA PIN must be at least 5 characters")
    .max(20, "KRA PIN is too long"),
  role: z.string().min(5, { message: "Please pick a valid role" }),
  member_no: z
    .string()
    .min(3, "Member number must be at least 3 characters")
    .max(20, "Member number is too long"),
});

export type MemberFormValues = z.infer<typeof memberSchema>;

export const memberFields = {
  first_name: {
    name: "first_name" as const,
    label: "First Name",
    placeholder: "Jane",
    required: true,
    type: "text" as const,
  },
  last_name: {
    name: "last_name" as const,
    label: "Last Name",
    placeholder: "Doe",
    required: true,
    type: "text" as const,
  },
  phone: {
    name: "phone" as const,
    label: "Phone Number",
    placeholder: "0712345678",
    required: false,
    type: "tel" as const,
  },
  id_number: {
    name: "id_number" as const,
    label: "ID Number",
    placeholder: "12345678",
    required: false,
    type: "text" as const,
  },
  kra_pin: {
    name: "kra_pin" as const,
    label: "KRA PIN",
    placeholder: "A123345434J",
    required: false,
    type: "text" as const,
  },
  role: {
    name: "role" as const,
    label: "Member Role",
    placeholder: "member",
    required: false,
    type: "text" as const,
  },
  member_no: {
    name: "member_no" as const,
    label: "Member Number",
    placeholder: "001",
    required: false,
    type: "text" as const,
  },
};

export const memberGroups = [
  {
    id: 1,
    fields: ["first_name", "last_name"] as const,
  },
  {
    id: 2,
    fields: ["phone", "member_no"] as const,
  },
  {
    id: 2,
    fields: ["id_number", "kra_pin"] as const,
  },
];

export const memberToFormValues = (member: GroupMember | null): MemberFormValues | undefined => {
  if (!member) return undefined;
  return {
    first_name: member.first_name ?? "",
    last_name: member.last_name ?? "",
    phone: member.phone ?? "",
    member_no: member.member_no ?? "",
    id_number: member.id_number ?? "",
    kra_pin: member.kra_pin ?? "",
    role: member.role ?? "",
  };
};