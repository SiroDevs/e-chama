"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDown, SquareChevronRight, Users } from "lucide-react";

import { Button, DropdownMenu, DropdownMenuContent } from "../ui";
import { DropdownMenuItem, DropdownMenuLabel } from "../ui";
import { DropdownMenuSeparator, DropdownMenuTrigger } from "../ui";
import { AppDispatch, RootState } from "@/application/state/store";
import { signoutUser } from "@/application/use-cases/auth/signout";
import { useToast } from "../ui/use-toast";

export function GroupNav() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { group, groups } = useSelector((state: RootState) => state.group);
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await dispatch(signoutUser());
      router.push("/signin");
      toast({
        title: "Success",
        description: "You have been signed out successfully",
      });
    } catch (error: unknown) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to log out",
      });
    }
  };

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
              <span className="hidden sm:block truncate">
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
            <DropdownMenuLabel>Switch Group</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {groups.map((group) => (
              <DropdownMenuItem key={group.id}>
                <SquareChevronRight className="h-4 w-4 mr-2" />
                <span>{group.title}</span>
              </DropdownMenuItem>
            ))}
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
              <span>Join a Group</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SquareChevronRight className="h-4 w-4 mr-2" />
              <span>Create a Group</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
}
