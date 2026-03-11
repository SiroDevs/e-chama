"use client";

import { useState } from "react";

import { PageContainer } from "@/presentation/components/common/page-container";
import PageContent from "@/presentation/components/common/page-content";
import { Users } from "lucide-react";
import { usePaginatedEntity } from "@/presentation/hooks/use-paginated-entity";
import { container } from "@/infrastructure/di/container";

const page = () => {
  const PAGE_SIZE = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const {
    entities,
    pagination,
    isLoading,
    isFetching,
  } = usePaginatedEntity(container.memberUseCase, "members", {
    page: currentPage,
    pageSize: PAGE_SIZE,
  });
  return (
    <main className="flex flex-col min-h-dvh">
      <PageContainer pageTitle="Members" pageIcon={<Users />}>
        <PageContent
          tagline="Manage Group Members"
          breadcrumbs={[{ title: "Members" }]}
        >
          <div></div>
        </PageContent>
      </PageContainer>
    </main>
  );
};

export default page;
