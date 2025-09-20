import { GridColDef } from "@mui/x-data-grid";

export const groupMembersColms: GridColDef[] = [
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
    // valueFormatter: (params) => new Date(params.value).toLocaleString(),
  },
];
