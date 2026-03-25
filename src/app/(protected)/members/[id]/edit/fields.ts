import { z } from "zod";

import { GroupMember } from "@/domain/entities";
import { MemberFormValues } from "./schema";

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
  dob: {
    name: "dob" as const,
    label: "Date of Birth",
    placeholder: "Select date",
    required: false,
    type: "date" as const,
  },
  sex: {
    name: "sex" as const,
    label: "Gender",
    placeholder: "Select gender",
    required: false,
    type: "select" as const,
  },
  country: {
    name: "country" as const,
    label: "Country",
    placeholder: "Select country",
    required: false,
    type: "select" as const,
  },
};

export const fieldGroups = [
  {
    id: 1,
    fields: ["first_name", "last_name"] as const,
  },
  {
    id: 2,
    fields: ["phone", "member_no"] as const,
  },
  {
    id: 3,
    fields: ["id_number", "kra_pin"] as const,
  },
  {
    id: 4,
    fields: ["dob", "sex"] as const,
  },
  {
    id: 5,
    fields: ["country"] as const,
  },
];

export const memberToFormValues = (member: GroupMember | null): MemberFormValues | undefined => {
  if (!member) return undefined;
  
  const getValidSex = (sex: string | undefined): "male" | "female" | "other" | "" => {
    if (!sex) return "";
    if (sex === "male" || sex === "female" || sex === "other") {
      return sex as "male" | "female" | "other";
    }
    return "";
  };

  return {
    first_name: member.first_name ?? "",
    last_name: member.last_name ?? "",
    phone: member.phone ?? "",
    member_no: member.member_no ?? "",
    id_number: member.id_number ?? "",
    kra_pin: member.kra_pin ?? "",
    role: member.role ?? "",
    dob: member.dob ?? "",
    sex: getValidSex(member.sex!),
    country: member.country ?? "",
  };
};