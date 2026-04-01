"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { CalendarsIcon, RefreshCcw, PlusIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { PageContent, PageContainer } from "@/presentation/components/common";
import { usePaginatedEntity } from "@/presentation/hooks/use-paginated-entity";
import { container } from "@/infrastructure/di/container";
import { GroupMeeting } from "@/domain/entities";
import { RootState } from "@/application/state/store";
import { PageAction, PageButton } from "@/presentation/components/ui/actions";
import { MeetingsTable } from "@/presentation/layout/tables/meetings";
import { MeetingDialog } from "./dialog";
import { newMeeting } from "@/application/use-cases/user/meeting";
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
  const [editingEntity, setEditingEntity] = useState<GroupMeeting | null>(
    null,
  );

  const { entities, pagination, isLoading, isFetching } = usePaginatedEntity(
    container.meetingUseCase,
    "group_meetings",
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

  const openEdit = (entity: GroupMeeting) => {
    setEditingEntity(entity);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingEntity(null);
  };

  const invalidate = () => {
    queryClient.invalidateQueries({
      queryKey: ["group_meetings", "paginated"],
    });
  };

  const handleSubmit = async (data: Partial<GroupMeeting>) => {
    try {
      setIsSaving(true);
      const isEditing = !!editingEntity?.id;

      const payload = {
        group_id: group?.group_id,
        creator: isMember ? data.creator : member?.id,
        title: data.title?.trim(),
        description: data.description?.trim(),
        date: data.date,
        location: data.location?.trim(),
      };

      if (isEditing) {
        toast.info("Editing meetings is coming soon.");
        handleCloseDialog();
        return;
      }

      const result = await newMeeting(payload);

      if (!result.success) {
        toast.error(result.error || "Failed to save meeting.");
        return;
      }

      toast.success("Meeting saved successfully.");
      handleCloseDialog();
      invalidate();
    } catch (err: unknown) {
      const errMsg = handleError(err, {
        tags: { component: "Meeting", action: "submit" },
        userMessage: "Failed to save meeting. Please try again.",
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
      pageTitle={`${isMember ? "Member " : ""}Meetings`}
      pageIcon={<CalendarsIcon />}
    >
      <PageContent
        breadcrumbs={[{ title: `${isMember ? "Your " : ""}Meetings` }]}
        actions={
          <div className="flex flex-row items-center gap-3">
            <PageButton
              title="Reload data"
              onClick={handleRefresh}
              icon={<RefreshCcw />}
            />
            <PageAction
              title="New Meeting"
              onClick={handleOpenDialog}
              icon={<PlusIcon />}
            />
          </div>
        }
        showFab={true}
        fabIcon={<PlusIcon />}
        fabOnClick={handleOpenDialog}
      >
        {!isLoading && !isFetching && entities.length === 0 ? (
          <EmptyState
            icon={CalendarsIcon}
            title="No meetings found"
            description={
              isMember
                ? "You haven't made any meetings yet."
                : "No meetings have been recorded for this chama."
            }
            action={
              <PageAction
                title="Add a New Meeting"
                onClick={handleOpenDialog}
                icon={<PlusIcon />}
              />
            }
          />
        ) : (
          <MeetingsTable
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

        <MeetingDialog
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
