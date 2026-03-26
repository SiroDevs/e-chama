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
    container.memberUseCase,
    "group_members",
    {
      page: currentPage,
      pageSize: PAGE_SIZE,
      filters: { group_id: group?.group_id },
    },
  );

  const handleEdit = (entity: GroupMember) => {};

  const handleMore = async (id: string) => {};

  const handlePageChange = (page: number) => setCurrentPage(page);

  const commonProps = {
    isLoading: isLoading || isFetching,
    currentPage,
    totalPages: pagination.totalPages,
    totalItems: pagination.total,
    pageSize: PAGE_SIZE,
    onPageChange: handlePageChange,
  };

  const handleNew = () => router.push("/members/new");
  const handleRefresh = () => router.push("/contributions");

  return (
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
              onClick={handleNew}
              icon={<PlusIcon />}
            />
          </div>
        }
        showFab={true}
        fabIcon={<PlusIcon />}
        fabHref="/members/new"
      >
        <MembersTable
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
