import React, { useState, useEffect, useCallback } from "react";
import { DataGrid, GridSortModel, GridFilterModel } from "@mui/x-data-grid";
import { GridPaginationModel, GridRowParams } from "@mui/x-data-grid";
import { gridClasses, GridFilterItem } from "@mui/x-data-grid";
import { Alert, Box, Typography, Paper } from "@mui/material";
import { getContributions } from "@/services/ContributionService";
import { Contribution } from "@/types/contribution";
import { DatabaseFilters } from "@/types/types";
import { contributionsColms } from "./arrays";

interface RowsState {
  rows: Contribution[];
  rowCount: number;
}

interface ContributionsProps {
  groupId: string;
}

const INITIAL_PAGE_SIZE = 10;

export default function Contributions({groupId}: ContributionsProps) {
  const [rowsState, setRowsState] = useState<RowsState>({
    rows: [],
    rowCount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

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
  ): DatabaseFilters[] => {
    return filterItems.map((item) => ({
      field: item.field,
      value: item.value?.toString() || "",
      operator: "ilike",
    }));
  };

  const fetchContributions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const sortField = sortModel[0]?.field || "created_at";
      const sortOrder = sortModel[0]?.sort || "desc";
      const filters = convertFilterModelToFilters(filterModel.items);

      const response = await getContributions({
        page: paginationModel.page,
        pageSize: paginationModel.pageSize,
        groupId: groupId,
        sortField: sortField,
        sortOrder: sortOrder,
        filters: filters,
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
  }, [paginationModel, sortModel, filterModel, groupId]);

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

  const hasNoResults = hasSearched && !isLoading && rowsState.rows.length === 0 && !error;

  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      {error ? (
        <Box sx={{ flexGrow: 1 }}>
          <Alert severity="error">{error.message}</Alert>
        </Box>
      ) : hasNoResults ? (
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
            height: 300,
            backgroundColor: "background.default",
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No contributions found
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            {filterModel.items.length > 0
              ? "Try adjusting your search filters to find what you're looking for."
              : "You haven't made any contributions yet."}
          </Typography>
        </Paper>
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
            minHeight: 400,
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
          localeText={{
            noRowsLabel: "No contributions to display",
            noResultsOverlayLabel: "No results found",
          }}
        />
      )}
    </Box>
  );
}