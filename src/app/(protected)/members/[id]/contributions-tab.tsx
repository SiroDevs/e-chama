"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import { GroupContribution, GroupMember } from "@/domain/entities";
import { ContributionsTable } from "@/presentation/layout/tables/contributions";
import { ContributionDialog } from "../../contributions/dialog";
import { newContribution } from "@/application/use-cases/user/contribution";
import { handleError } from "@/application/helpers/error-utils";
import { usePaginatedEntity } from "@/presentation/hooks/use-paginated-entity";
import { RootState } from "@/application/state/store";
import { container } from "@/infrastructure/di/container";

export default function ContributionsTab({ member }: { member: GroupMember }) {
  const queryClient = useQueryClient();
  const PAGE_SIZE = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const { group } = useSelector((state: RootState) => state.group);

  const [openDialog, setDialogOpen] = useState(false);
  const [editingEntity, setEditingEntity] = useState<GroupContribution | null>(null);

  const { entities, pagination, isLoading, isFetching } = usePaginatedEntity(
    container.contributionUseCase,
    "group_contributions",
    {
      page: currentPage,
      pageSize: PAGE_SIZE,
      filters: { 
        member_id: member?.id,
        group_id: group?.group_id
      },
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
    queryClient.invalidateQueries({ queryKey: ["group_contributions", "paginated"] });
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
        tags: { component: 'Contribution', action: 'submit' },
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
    <div className="py-3">
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

      <ContributionDialog
        open={openDialog}
        isLoading={isSaving}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        initial={editingEntity}
        groupId={group?.group_id || ""}
      />
    </div>
  );
}
