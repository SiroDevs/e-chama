import { Profile } from "@/infrastucture/state/role/profiles";
import { GroupMember, MemberProfileProps } from "@/data/types/profiles";
import { Member } from "@/data/types/types";
import { GridColDef } from "@mui/x-data-grid";

export interface RowsState {
  rows: GroupMember[];
  rowCount: number;
}

export const PageSize = 10;

export const membersColms: GridColDef[] = [
  {
    field: 'full_name',
    headerName: 'Full Name',
    width: 200,
    filterable: true,
    sortable: true,
  },
  {
    field: 'phone',
    headerName: 'Phone No',
    width: 120,
    filterable: true,
    sortable: true,
  },
  {
    field: 'email',
    headerName: 'Email Address',
    width: 200,
    filterable: true,
    sortable: true,
  },
  {
    field: 'id_number',
    headerName: 'ID. Number',
    width: 120,
    filterable: true,
    sortable: true,
  },
  {
    field: 'member_no',
    headerName: 'Member.No',
    width: 120,
    filterable: true,
    sortable: true,
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 120,
    filterable: true,
    sortable: true,
  },
  {
    field: 'joined_at',
    headerName: 'Joined At',
    width: 180,
    filterable: true,
    sortable: true,
    type: 'dateTime',
  },
];

export function processMemberProfileData(
  profile: Profile | null,
  member: Member | null,
  user: any
) {
  return (): MemberProfileProps => {
    if (!profile || !member) {
      return {
        loading: false,
        profile: null,
        member: null,
        user: null,
      };
    }

    const fullName =
      `${profile.first_name || ""} ${profile.last_name || ""}`.trim() ||
      "Unknown Member";

    const formatDate = (dateString: string | null) => {
      if (!dateString) return "Not set";
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    const getInitials = (firstName: string | null, lastName: string | null) => {
      const first = firstName?.[0] || "";
      const last = lastName?.[0] || "";
      return `${first}${last}`.toUpperCase();
    };

    return {
      loading: false,
      profile: {
        first_name: profile.first_name!,
        last_name: profile.last_name!,
        dob: profile.dob!,
        sex: profile.sex!,
        country: profile.country!,
        address: profile.address!,
        avatar: profile.avatar!,
        fullName: fullName,
        formattedDob: formatDate(profile.dob!),
        initials: getInitials(profile.first_name!, profile.last_name!),
        location:
          `${profile.country || ""} ${profile.address || ""}`.trim() ||
          "Not specified",
      },
      member: {
        member_no: member.member_no!,
        joined_at: member.joined_at!,
        formattedJoinedAt: formatDate(member.joined_at!),
        memberNo: member.member_no || "Not assigned",
        role: member.role || "Member",
      },
      user: {
        phone: user?.phone || "Not specified",
      },
    };
  };
}
