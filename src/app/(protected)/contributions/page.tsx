"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { useSelector } from "react-redux";
import { RefreshCcw, PlusIcon } from "lucide-react";

import { PageContainer } from "@/presentation/components/common/page-container";
import PageContent from "@/presentation/components/common/page-content";
import { usePaginatedEntity } from "@/presentation/hooks/use-paginated-entity";
import { container } from "@/infrastructure/di/container";
import { GroupContribution } from "@/domain/entities";
import { RootState } from "@/application/state/store";
import { PageAction, PageButton } from "@/presentation/components/ui/actions";
import { useRouter } from "next/navigation";
import { ContributionsTable } from "@/presentation/layout/tables/contributions";

const page = () => {
  const router = useRouter();

  const PAGE_SIZE = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const { group } = useSelector((state: RootState) => state.group);
  const { entities, pagination, isLoading, isFetching } = usePaginatedEntity(
    container.contributionUseCase,
    "group_contributions",
    {
      page: currentPage,
      pageSize: PAGE_SIZE,
      filters: { group_id: group?.group_id },
    },
  );

  const handleEdit = (entity: GroupContribution) => {
    // setEditingEntity(entity);
  };

  const handleMore = async (id: string) => {
    // try {
    //   await deleteEntity(id);
    //   if (entities.length === 1 && currentPage > 1) {
    //     setCurrentPage(currentPage - 1);
    //   }
    // } catch (error) {
    //   console.error("Failed to delete entity:", error);
    // }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const commonProps = {
    isLoading: isLoading || isFetching,
    currentPage,
    totalPages: pagination.totalPages,
    totalItems: pagination.total,
    pageSize: PAGE_SIZE,
    onPageChange: handlePageChange,
  };

  const handleNewContribution = () => {
    router.push("/members/new");
  };

  const handleRefresh = () => {
    router.push("/contributions");
  };

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
              onClick={handleNewContribution}
              icon={<PlusIcon />}
            />
          </div>
        }
      >
        <ContributionsTable
          records={entities}
          onEdit={handleEdit}
          onMore={handleMore}
          {...commonProps}
        />
      </PageContent>
    </PageContainer>
  );
};

export default page;
