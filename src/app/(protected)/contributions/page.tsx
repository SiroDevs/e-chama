"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { useSelector } from "react-redux";
import { RefreshCcw, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { PageContainer } from "@/presentation/components/common/page-container";
import PageContent from "@/presentation/components/common/page-content";
import { usePaginatedEntity } from "@/presentation/hooks/use-paginated-entity";
import { container } from "@/infrastructure/di/container";
import { GroupContribution } from "@/domain/entities";
import { RootState } from "@/application/state/store";
import { PageAction, PageButton } from "@/presentation/components/ui/actions";
import { ContributionsTable } from "@/presentation/layout/tables/contributions";
import { ContributionDialog } from "./dialog";

const page = () => {
  const router = useRouter();
  const PAGE_SIZE = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const { group } = useSelector((state: RootState) => state.group);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEntity, setEditingEntity] = useState<GroupContribution | null>(
    null,
  );

  const { entities, pagination, isLoading, isFetching } = usePaginatedEntity(
    container.contributionUseCase,
    "group_contributions",
    {
      page: currentPage,
      pageSize: PAGE_SIZE,
      filters: { group_id: group?.group_id },
    },
  );

  const openNew = () => {
    setEditingEntity(null);
    setDialogOpen(true);
  };

  const openEdit = (entity: GroupContribution) => {
    setEditingEntity(entity);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setEditingEntity(null);
  };

  const handleSubmit = (data: Partial<GroupContribution>) => {
    console.log("Submit:", data);
    handleClose();
  };

  const handleMore = async (id: string) => {};

  const handleRefresh = () => router.push("/contributions");

  return (
    <PageContainer pageTitle="Contributions" pageIcon={<Users />}>
      <PageContent
        breadcrumbs={[{ title: "Contributions" }]}
        actions={
          <div className="flex flex-row items-center gap-3">
            <PageButton
              title="Reload data"
              onClick={handleRefresh}
              icon={<RefreshCcw />}
            />
            <PageAction
              title="New Contribution"
              onClick={openNew}
              icon={<PlusIcon />}
            />
          </div>
        }
      >
        <ContributionsTable
          records={entities}
          onEdit={openEdit}
          onMore={handleMore}
          isLoading={isLoading || isFetching}
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.total}
          pageSize={PAGE_SIZE}
          onPageChange={setCurrentPage}
        />

        <ContributionDialog
          open={dialogOpen}
          onClose={handleClose}
          onSubmit={handleSubmit}
          initial={editingEntity}
          groupId={group?.group_id || ""}
        />
      </PageContent>
    </PageContainer>
  );
};

export default page;
