"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { HandCoins, RefreshCcw, PlusIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { PageContent, PageContainer } from "@/presentation/components/common";
import { usePaginatedEntity } from "@/presentation/hooks/use-paginated-entity";
import { container } from "@/infrastructure/di/container";
import { GroupContribution } from "@/domain/entities";
import { RootState } from "@/application/state/store";
import { PageAction, PageButton } from "@/presentation/components/ui/actions";
import { ContributionsTable } from "@/presentation/layout/tables/contributions";
import { ContributionDialog } from "./dialog";
import { newContribution } from "@/application/use-cases/user/contribution";
import { handleError } from "@/application/helpers/error-utils";
import { EmptyState } from "@/presentation/components/ui/states/empty-state";

const page = () => {
  const queryClient = useQueryClient();
  const PAGE_SIZE = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const { member, group } = useSelector((state: RootState) => state.group);
  const isMember = member?.role === "member";

  const [openDialog, setDialogOpen] = useState(false);
  const [editingEntity, setEditingEntity] = useState<GroupContribution | null>(
    null,
  );

  const { entities, pagination, isLoading, isFetching } = usePaginatedEntity(
    container.contributionUseCase,
    "group_contributions",
    {
      page: currentPage,
      pageSize: PAGE_SIZE,
      filters: isMember
        ? {
            member_id: member?.id,
            group_id: group?.group_id,
          }
        : { group_id: group?.group_id },
    },
  );

  const handleOpenDialog = () => {
    setEditingEntity(null);
    setDialogOpen(true);
  };

  const openEdit = (entity: GroupContribution) => {
    setEditingEntity(entity);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingEntity(null);
  };

  const invalidate = () => {
    queryClient.invalidateQueries({
      queryKey: ["group_contributions", "paginated"],
    });
  };

  const handleSubmit = async (data: Partial<GroupContribution>) => {
    try {
      setIsSaving(true);
      const isEditing = !!editingEntity?.id;

      const payload = {
        group_id: group?.group_id,
        member_id: data.member_id,
        reason: data.reason?.trim(),
        mode: data.mode?.trim(),
        amount: data.amount,
        reference: data.reference?.trim(),
      };

      if (isEditing) {
        toast.info("Editing contributions is coming soon.");
        handleCloseDialog();
        return;
      }

      const result = await newContribution(payload);

      if (!result.success) {
        toast.error(result.error || "Failed to save contribution.");
        return;
      }

      toast.success("Contribution saved successfully.");
      handleCloseDialog();
      invalidate();
    } catch (err: unknown) {
      const errMsg = handleError(err, {
        tags: { component: "Contribution", action: "submit" },
        userMessage: "Failed to save contribution. Please try again.",
      });
      toast.error(errMsg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleMore = async (id: string) => {};

  const handleRefresh = () => invalidate();

  return (
    <PageContainer
      pageTitle={`${isMember ? "Member " : ""}Contributions`}
      pageIcon={<HandCoins />}
    >
      <PageContent
        breadcrumbs={[{ title: `${isMember ? "Your " : ""}Contributions` }]}
        actions={
          <div className="flex flex-row items-center gap-3">
            <PageButton
              title="Reload data"
              onClick={handleRefresh}
              icon={<RefreshCcw />}
            />
            <PageAction
              title="New Contribution"
              onClick={handleOpenDialog}
              icon={<PlusIcon />}
            />
          </div>
        }
        showFab={true}
        fabIcon={<PlusIcon />}
        fabHref="/contributions/new"
      >
        {!isLoading && !isFetching && entities.length === 0 ? (
          <EmptyState
            icon={HandCoins}
            title="No contributions found"
            description={
              isMember
                ? "You haven't made any contributions yet."
                : "No contributions have been recorded for this chama."
            }
            action={
              <PageAction
                title="Add a New Contribution"
                onClick={handleOpenDialog}
                icon={<PlusIcon />}
              />
            }
          />
        ) : (
          <ContributionsTable
            records={entities}
            onEdit={openEdit}
            onMore={handleMore}
            isLoading={isLoading || isFetching || isSaving}
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            totalItems={pagination.total}
            pageSize={PAGE_SIZE}
            onPageChange={setCurrentPage}
          />
        )}

        <ContributionDialog
          open={openDialog}
          isMember={isMember}
          isLoading={isSaving}
          onClose={handleCloseDialog}
          onSubmit={handleSubmit}
          initial={editingEntity}
          groupId={group?.group_id || ""}
        />
      </PageContent>
    </PageContainer>
  );
};

export default page;
