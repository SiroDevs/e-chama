"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDown, ChevronRight, Users } from "lucide-react";

import { Button, DropdownMenu, DropdownMenuContent } from "../ui";
import { DropdownMenuItem, DropdownMenuLabel } from "../ui";
import { DropdownMenuSeparator, DropdownMenuTrigger } from "../ui";
import { AppDispatch, RootState } from "@/application/state/store";
import { signoutUser } from "@/application/use-cases/auth/signout";
import { useToast } from "../ui/use-toast";

export function GroupNav() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { group, groups } = useSelector(
    (state: RootState) => state.group,
  );
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
    <div className="px-6 py-2.5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span className="hidden sm:flex max-w-[100px] truncate">
              {group ? group.title : "No Group"}
            </span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        {groups && groups.length > 0 ? (
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Switch Group</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {groups.map((group) => (
              <DropdownMenuItem key={group.id}>
                <ChevronRight className="h-4 w-4 mr-2" />
                <span>{group.title}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Take an Action</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ChevronRight className="h-4 w-4 mr-2" />
              <span>Join a Group</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ChevronRight className="h-4 w-4 mr-2" />
              <span>Create a Group</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
}
