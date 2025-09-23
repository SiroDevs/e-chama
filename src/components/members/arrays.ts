import { GridColDef } from "@mui/x-data-grid";

export const contributionsColms: GridColDef[] = [
  {
    field: 'reason',
    headerName: 'Reason',
    width: 200,
    filterable: true,
    sortable: true,
  },
  {
    field: 'mode',
    headerName: 'Mode',
    width: 120,
    filterable: true,
    sortable: true,
  },
  {
    field: 'reference',
    headerName: 'Reference',
    width: 150,
    filterable: true,
    sortable: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 75,
    filterable: true,
    sortable: true,
    type: 'singleSelect',
    valueOptions: ['pending', 'approved', 'rejected', 'completed'],
  },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 100,
    filterable: true,
    sortable: true,
    type: 'number',
    // valueFormatter: (params) => `$${params.value.toFixed(2)}`,
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 120,
    filterable: true,
    sortable: true,
    // type: 'dateTime',
  },
];


