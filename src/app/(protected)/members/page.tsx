"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { useSelector } from "react-redux";
import { RefreshCcw, PlusIcon } from "lucide-react";

import { PageContainer } from "@/presentation/components/common/page-container";
import PageContent from "@/presentation/components/common/page-content";
import { usePaginatedEntity } from "@/presentation/hooks/use-paginated-entity";
import { container } from "@/infrastructure/di/container";
import { GroupMember } from "@/domain/entities";
import { RootState } from "@/application/state/store";
import { MembersTable } from "@/presentation/layout/tables/members";
import { PageAction, PageButton } from "@/presentation/components/ui/actions";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const PAGE_SIZE = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const { group } = useSelector((state: RootState) => state.group);
  const { entities, pagination, isLoading, isFetching } = usePaginatedEntity(
    container.groupMemberUseCase,
    "group_members",
    {
      page: currentPage,
      pageSize: PAGE_SIZE,
      filters: { group_id: group?.group_id },
    },
  );

  const handleEdit = (entity: GroupMember) => {
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

  const handleCreateMember = () => {
    router.push("/members/new");
  };

  const handleRefresh = () => {
    // if (groupMembersRef.current) {
    //   groupMembersRef.current.refresh();
    // }
  };

  return (
    <main className="flex flex-col min-h-dvh">
      <PageContainer pageTitle="Members" pageIcon={<Users />}>
        <PageContent
          breadcrumbs={[{ title: "Members" }]}
          actions={
            <div className="flex flex-row items-center gap-3">
              <PageButton
                title="Reload data"
                onClick={handleRefresh}
                icon={<RefreshCcw />}
              />
              <PageAction
                title="New Member"
                onClick={handleCreateMember}
                icon={<PlusIcon />}
              />
            </div>
          }
        >
          <MembersTable
            records={entities}
            onEdit={handleEdit}
            onMore={handleMore}
            {...commonProps}
          />
        </PageContent>
      </PageContainer>
    </main>
  );
};

export default page;
