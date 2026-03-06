export interface Profile {
  id?: string;
  first_name?: string;
  last_name?: string;
  id_number?: string;
  kra_pin?: string;
  country?: string;
  address?: string;
  sex?: string;
  dob?: string;
  avatar?: string;
  group_id?: string;
  created_at?: string;
  updated_at?: string;
}

export const dataToProfile = ({
  id,
  first_name,
  last_name,
  id_number,
  kra_pin,
  country,
  address,
  sex,
  dob,
  avatar,
  group_id,
  created_at,
  updated_at,
}: {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  id_number?: string | null;
  kra_pin?: string | null;
  country?: string | null;
  address?: string | null;
  sex?: string | null;
  dob?: string | null;
  avatar?: string | null;
  group_id?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}): Profile => {
  return {
    id,
    first_name: first_name ?? undefined,
    last_name: last_name ?? undefined,
    id_number: id_number ?? undefined,
    kra_pin: kra_pin ?? undefined,
    country: country ?? undefined,
    address: address ?? undefined,
    sex: sex ?? undefined,
    dob: dob ?? undefined,
    avatar: avatar ?? undefined,
    group_id: group_id ?? undefined,
    created_at: created_at ?? undefined,
    updated_at: updated_at ?? undefined,
  };
};