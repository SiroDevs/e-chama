export interface Profile {
  id?: string;
  first_name?: string;
  last_name?: string;
  country?: string;
  address?: string;
  sex?: string;
  dob?: string;
  avatar?: string;
  id_number?: string;
  kra_pin?: string;
}

export const dataToProfile = ({
  id,
  first_name,
  last_name,
  country,
  address,
  sex,
  dob,
  avatar,
  id_number,
  kra_pin,
}: {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  country?: string | null;
  address?: string | null;
  sex?: string | null;
  dob?: string | null;
  avatar?: string | null;
  id_number?: string | null;
  kra_pin?: string | null;
}): Profile => {
  return {
    id,
    first_name: first_name ?? undefined,
    last_name: last_name ?? undefined,
    country: country ?? undefined,
    address: address ?? undefined,
    sex: sex ?? undefined,
    dob: dob ?? undefined,
    avatar: avatar ?? undefined,
    id_number: id_number ?? undefined,
    kra_pin: kra_pin ?? undefined,
  };
};