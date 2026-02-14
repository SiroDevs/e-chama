import React, { useState, useEffect } from "react";
import { forwardRef, useImperativeHandle, useCallback } from "react";
import { GridSortModel, GridFilterModel, gridClasses } from "@mui/x-data-grid";
import { DataGrid, GridPaginationModel, GridRowParams } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { membersColms, PageSize, RowsState } from "./arrays";
import { getGroupMembers } from "@/services/MemberService";
import { EmptyView, ErrorView } from "@/components/general/EmptyView";
import { useRouter } from "next/navigation";

interface GroupMembersProps {
  groupId: string;
  paginationModel: GridPaginationModel;
  sortModel: GridSortModel;
  filterModel: GridFilterModel;
  onPaginationModelChange: (model: GridPaginationModel) => void;
  onSortModelChange: (model: GridSortModel) => void;
  onFilterModelChange: (model: GridFilterModel) => void;
  convertFilterModelToFilters: (filterItems: any[]) => any[];
}

export interface GroupMembersRef {
  refresh: () => void;
}

const GroupMembers = forwardRef<GroupMembersRef, GroupMembersProps>(
  (
    {
      groupId,
      paginationModel,
      sortModel,
      filterModel,
      onPaginationModelChange,
      onSortModelChange,
      onFilterModelChange,
      convertFilterModelToFilters,
    },
    ref,
  ) => {
    const [rowsState, setRowsState] = useState<RowsState>({
      rows: [],
      rowCount: 0,
    });
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    const fetchGroupMembers = useCallback(async () => {
      setIsLoading(true);
      setError(null);
      setHasSearched(true);

      try {
        const sortField = sortModel[0]?.field || "created_at";
        const sortOrder = sortModel[0]?.sort || "desc";
        const filters = convertFilterModelToFilters(filterModel.items);

        const response = await getGroupMembers({
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
        console.error("Error fetching group members:", err);
      } finally {
        setIsLoading(false);
      }
    }, [
      paginationModel,
      sortModel,
      filterModel,
      groupId,
      convertFilterModelToFilters,
    ]);

    useImperativeHandle(ref, () => ({
      refresh: () => {
        fetchGroupMembers();
      },
    }));

    useEffect(() => {
      fetchGroupMembers();
    }, [fetchGroupMembers]);

    const handleRowClick = (params: GridRowParams) => {
      router.push(`/members/${params.row.member_no}`);
    };

    const initialState = {
      pagination: {
        paginationModel: { pageSize: PageSize },
      },
    };

    const hasNoResults = !isLoading && rowsState.rows.length === 0 && !error;

    return (
      <Box sx={{ flex: 1, width: "100%" }}>
        {error ? (
          <ErrorView error={error.message} />
        ) : hasNoResults ? (
          <EmptyView
            title="No members found"
            message={
              filterModel.items.length > 0
                ? "Try adjusting your search filters to find what you're looking for."
                : "This chama doesn't have any members yet."
            }
          />
        ) : (
          <DataGrid
            rows={rowsState.rows}
            rowCount={rowsState.rowCount}
            columns={membersColms}
            pagination
            sortingMode="server"
            filterMode="server"
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={onPaginationModelChange}
            sortModel={sortModel}
            onSortModelChange={onSortModelChange}
            filterModel={filterModel}
            onFilterModelChange={onFilterModelChange}
            disableRowSelectionOnClick
            onRowClick={handleRowClick}
            loading={isLoading}
            initialState={initialState}
            pageSizeOptions={[5, PageSize, 25]}
            sx={{
              [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
                outline: "transparent",
              },
              [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]:
                { outline: "none" },
              [`& .${gridClasses.row}:hover`]: { cursor: "pointer" },
              minHeight: 400,
            }}
            slotProps={{
              loadingOverlay: {
                variant: "circular-progress",
                noRowsVariant: "circular-progress",
              },
              baseIconButton: { size: "small" },
            }}
            localeText={{
              noRowsLabel: "No Group Members to display",
              noResultsOverlayLabel: "No results found",
            }}
          />
        )}
      </Box>
    );
  },
);

GroupMembers.displayName = "GroupMembers";
export default GroupMembers;
