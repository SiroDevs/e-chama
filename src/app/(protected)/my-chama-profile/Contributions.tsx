import React, { useState, useEffect, useCallback } from "react";
import { DataGrid, GridSortModel, GridFilterModel } from "@mui/x-data-grid";
import { GridPaginationModel,GridRowParams } from "@mui/x-data-grid";
import { gridClasses, GridFilterItem } from "@mui/x-data-grid";
import { Alert, Box } from "@mui/material";
import { getContributions } from "@/services/ContributionService";
import { Contribution, ContributionsFilters } from "@/types/contribution";
import { contributionsColms } from "./arrays";

interface RowsState {
  rows: Contribution[];
  rowCount: number;
}

const INITIAL_PAGE_SIZE = 10;

export default function Contributions() {
  const [rowsState, setRowsState] = useState<RowsState>({
    rows: [],
    rowCount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: INITIAL_PAGE_SIZE,
  });

  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });

  const convertFilterModelToFilters = (
    filterItems: GridFilterItem[]
  ): ContributionsFilters[] => {
    return filterItems.map((item) => ({
      field: item.field,
      value: item.value?.toString() || "",
      operator: "ilike",
    }));
  };

  const fetchContributions = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const sortField = sortModel[0]?.field || "created_at";
      const sortOrder = sortModel[0]?.sort || "desc";
      const filters = convertFilterModelToFilters(filterModel.items);

      const response = await getContributions({
        page: paginationModel.page,
        pageSize: paginationModel.pageSize,
        sortField,
        sortOrder,
        filters,
      });

      if (response.error) {
        throw response.error;
      }

      setRowsState({
        rows: response.data,
        rowCount: response.count,
      });
    } catch (err) {
      setError(err as Error);
      console.error("Error fetching contributions:", err);
    } finally {
      setIsLoading(false);
    }
  }, [paginationModel, sortModel, filterModel]);

  useEffect(() => {
    fetchContributions();
  }, [fetchContributions]);

  const handlePaginationModelChange = (newModel: GridPaginationModel) => {
    setPaginationModel(newModel);
  };

  const handleSortModelChange = (newModel: GridSortModel) => {
    setSortModel(newModel);
  };

  const handleFilterModelChange = (newModel: GridFilterModel) => {
    setFilterModel(newModel);
  };

  const handleRowClick = (params: GridRowParams) => {
    console.log("Row clicked:", params.row);
  };

  const initialState = {
    pagination: {
      paginationModel: {
        pageSize: INITIAL_PAGE_SIZE,
      },
    },
  };

  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      {error ? (
        <Box sx={{ flexGrow: 1 }}>
          <Alert severity="error">{error.message}</Alert>
        </Box>
      ) : (
        <DataGrid
          rows={rowsState.rows}
          rowCount={rowsState.rowCount}
          columns={contributionsColms}
          pagination
          sortingMode="server"
          filterMode="server"
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationModelChange}
          sortModel={sortModel}
          onSortModelChange={handleSortModelChange}
          filterModel={filterModel}
          onFilterModelChange={handleFilterModelChange}
          disableRowSelectionOnClick
          onRowClick={handleRowClick}
          loading={isLoading}
          initialState={initialState}
          pageSizeOptions={[5, INITIAL_PAGE_SIZE, 25]}
          sx={{
            [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
              outline: "transparent",
            },
            [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]:
              {
                outline: "none",
              },
            [`& .${gridClasses.row}:hover`]: {
              cursor: "pointer",
            },
          }}
          slotProps={{
            loadingOverlay: {
              variant: "circular-progress",
              noRowsVariant: "circular-progress",
            },
            baseIconButton: {
              size: "small",
            },
          }}
        />
      )}
    </Box>
  );
}
