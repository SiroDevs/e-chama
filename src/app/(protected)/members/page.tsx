"use client";

import * as React from "react";
import { Box, Button, IconButton, Stack, Tooltip } from "@mui/material";
import { Header } from "@/components/navigation";
import { Copyright } from "@/components/general";
import { useAuthStore } from "@/state/auth/auth";
import GroupMembers, { GroupMembersRef } from "./records";
import {
  GridPaginationModel,
  GridSortModel,
  GridFilterModel,
  GridFilterItem,
} from "@mui/x-data-grid";
import { DatabaseFilters } from "@/types/types";
import { useState, useRef } from "react";
import PageContainer from "@/components/actions/PageContainer";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

export default function MembersPage() {
  const router = useRouter();
  const { isAuthenticated, member } = useAuthStore();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });

  const groupMembersRef = useRef<GroupMembersRef>(null);
  if (!isAuthenticated) {
    router.push("/");
    return null;
  }

  const handlePaginationModelChange = (newModel: GridPaginationModel) => {
    setPaginationModel(newModel);
  };

  const handleSortModelChange = (newModel: GridSortModel) => {
    setSortModel(newModel);
  };

  const handleFilterModelChange = (newModel: GridFilterModel) => {
    setFilterModel(newModel);
  };

  const convertFilterModelToFilters = (
    filterItems: GridFilterItem[]
  ): DatabaseFilters[] => {
    return filterItems.map((item) => ({
      field: item.field,
      value: item.value?.toString() || "",
      operator: "ilike",
    }));
  };

  const handleCreateMember = () => {
    router.push("/members/new");
  };

  const handleRefresh = () => {
    if (groupMembersRef.current) {
      groupMembersRef.current.refresh();
    }
  };

  const pageTitle = "Chama Members";

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Header />
      <Box
        sx={{
          height: {
            xs: "100%",
            sm: "calc(100dvh - var(--template-frame-height, 0px))",
          },
          mt: { xs: 4, sm: 0 },
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <PageContainer
          title={pageTitle}
          breadcrumbs={[{ title: "Members" }]}
          actions={
            <Stack direction="row" alignItems="center" spacing={1}>
              <Tooltip title="Reload data" placement="right" enterDelay={1000}>
                <div>
                  <IconButton
                    size="small"
                    aria-label="refresh"
                    onClick={handleRefresh}
                  >
                    <RefreshIcon />
                  </IconButton>
                </div>
              </Tooltip>
              <Button
                variant="contained"
                onClick={handleCreateMember}
                startIcon={<AddIcon />}
              >
                New Member
              </Button>
            </Stack>
          }
        />
        <GroupMembers
          ref={groupMembersRef}
          groupId={member!.group_id!}
          paginationModel={paginationModel}
          sortModel={sortModel}
          filterModel={filterModel}
          onPaginationModelChange={handlePaginationModelChange}
          onSortModelChange={handleSortModelChange}
          onFilterModelChange={handleFilterModelChange}
          convertFilterModelToFilters={convertFilterModelToFilters}
        />
      </Box>
      <Copyright sx={{ flex: 1, my: 4 }} />
    </Box>
  );
}
