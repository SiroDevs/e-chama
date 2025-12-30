"use client";

import { useState } from "react";

import { PageContainer } from "@/presentation/components/common/page-container";
import PageContent from "@/presentation/components/common/page-content";
import { Users } from "lucide-react";
import { usePaginatedEntity } from "@/presentation/hooks/use-paginated-entity";
import { container } from "@/infrastructure/di/container";
import { MemberTable } from "@/presentation/components/tables/members-table";
import { Member } from "@/domain/entities";

const page = () => {
  const PAGE_SIZE = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const { entities, pagination, isLoading, isFetching } = usePaginatedEntity(
    container.memberUseCase,
    "members",
    {
      page: currentPage,
      pageSize: PAGE_SIZE,
    },
  );

  const handleEdit = (entity: Member) => {
    // setEditingEntity(entity);
  };

  const handleDelete = async (id: string) => {
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

  return (
    <main className="flex flex-col min-h-dvh">
      <PageContainer pageTitle="Members" pageIcon={<Users />}>
        <PageContent breadcrumbs={[{ title: "Members" }]}>
          <MemberTable
            members={entities}
            onEdit={handleEdit}
            onDelete={handleDelete}
            {...commonProps}
          />
        </PageContent>
      </PageContainer>
    </main>
  );
};

export default page;
