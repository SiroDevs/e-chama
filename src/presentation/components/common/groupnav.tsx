"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDown, SquareChevronRight, Users } from "lucide-react";

import { Button, DropdownMenu, DropdownMenuContent } from "../ui";
import { DropdownMenuItem, DropdownMenuLabel } from "../ui";
import { DropdownMenuSeparator, DropdownMenuTrigger } from "../ui";
import { AppDispatch, RootState } from "@/application/state/store";
import { useToast } from "../ui/use-toast";
import { UserGroup } from "@/domain/entities";
import { switchGroupAction } from "@/application/use-cases/user/group";
import { EnterIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export function GroupNav() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { group, groups } = useSelector((state: RootState) => state.group);
  const { user } = useSelector((state: RootState) => state.auth);
  const { toast } = useToast();

  const handleGroupSwitch = async (selectedGroup: UserGroup) => {
    try {
      if (user) {
        await dispatch(switchGroupAction(user.uid, selectedGroup));
        toast({
          title: "Success",
          description: "You have been switched groups successfully",
        });
      } else {
        toast({
          title: "Failure",
          description: "Failed to switch groups",
        });
      }
      router.push("/");
    } catch (error: unknown) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to switch group",
      });
    }
  };
  const handleJoinGroup = () => router.push("/groups");

  return (
    <div className="px-2 py-2 w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full flex items-center justify-between space-x-1"
          >
            <div className="flex items-center truncate">
              <Users className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="sm:block truncate">
                {group ? group.title : "No Group"}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        {groups && groups.length > 0 ? (
          <DropdownMenuContent
            align="end"
            className="w-[var(--radix-dropdown-menu-trigger-width)]"
          >
            <DropdownMenuLabel>Switch a Chama</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {groups.map((grp) => (
              <DropdownMenuItem
                key={grp.group_id}
                onClick={() => handleGroupSwitch(grp)}
              >
                <SquareChevronRight className="h-4 w-4 mr-2" />
                <span>{grp.title}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem key="join-group" onClick={handleJoinGroup}>
              <EnterIcon className="mr-2 h-4 w-4" />
              <span>Join a Group</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent
            align="end"
            className="w-[var(--radix-dropdown-menu-trigger-width)]"
          >
            <DropdownMenuLabel>Take an Action</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SquareChevronRight className="h-4 w-4 mr-2" />
              <span>Join a Chama</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SquareChevronRight className="h-4 w-4 mr-2" />
              <span>Create a Chama</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
}
