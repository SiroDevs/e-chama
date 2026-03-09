"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDown, LogOut, Settings, Users } from "lucide-react";

import { Button, DropdownMenu, DropdownMenuContent } from "../ui";
import { DropdownMenuItem, DropdownMenuLabel } from "../ui";
import { DropdownMenuSeparator, DropdownMenuTrigger } from "../ui";
import { AppDispatch, RootState } from "@/application/state/store";
import { useToast } from "../ui/use-toast";
import { signoutUser } from "@/application/use-cases/auth/signout";

export function GroupNav() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { group, member, groups, hasGroups } = useSelector(
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
              {user ? user.displayName : "No Group"}
            </span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Manage My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push(`/user/settings`)}>
            <Settings className="h-4 w-4 mr-2" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            <span>Signout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
