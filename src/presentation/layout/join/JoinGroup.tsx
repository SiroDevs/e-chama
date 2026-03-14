"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import { RootState } from "@/application/state/store";
import { Button } from "../../components/ui";
import { GroupDialog } from "./dialog";
import { Group } from "@/domain/entities";
import { newGroupAction } from "@/application/use-cases/user/group";
import { SearchGroup } from "./SearchGroup";

export function JoinGroup() {
  const router = useRouter();
  const { groups } = useSelector((state: RootState) => state.group);
  const { user } = useSelector((state: RootState) => state.auth);
  const [openDialog, setOpenDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const hasGroups = groups && groups.length > 0;

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleSubmit = async (data: Partial<Group>) => {
    try {
      setIsSaving(true);
      const payload = {
        title: data.title?.trim(),
        description: data.description?.trim(),
        initials: data.initials?.trim(),
        location: data.location?.trim(),
        address: data.address?.trim(),
      };

      await newGroupAction(payload, user?.uid!);
      toast.success("Group created successfully.");
      handleCloseDialog();
      router.push("/");
    } catch (err: unknown) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to create group. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <div className="mt-16 flex flex-col items-center">
        <div className="w-full rounded-lg px-6 py-8 sm:px-10 text-center bg-white dark:bg-[#1d1d20] shadow-xs">
          {!hasGroups && (
            <>
              <h1 className="text-xl font-semibold mb-2">
                ⚠️ You aren&apos;t in any Chama
              </h1>

              <div className="flex items-start gap-3 bg-red-50 border border-red-300 text-red-800 rounded-md px-4 py-3 my-4 text-sm text-left">
                Hey {user?.displayName || "there"}, this screen will go away, as
                soon as you become a member of a chama.
              </div>

              <hr className="my-4 border-gray-200" />
            </>
          )}

          <SearchGroup />

          <hr className="my-4 border-gray-200" />

          <p className="text-md mb-6">
            Create a new one or request an official of your Chama to add you.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button
              onClick={handleOpenDialog}
              className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium py-3 px-4 rounded-md transition-colors"
            >
              <UserPlus size={20} />
              Create a Chama
            </Button>
          </div>
        </div>

        <GroupDialog
          open={openDialog}
          onClose={handleCloseDialog}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
