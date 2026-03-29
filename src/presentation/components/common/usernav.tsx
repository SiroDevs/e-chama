"use client";

import { EnterIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";

import { Button, DropdownMenu, DropdownMenuContent } from "../ui";
import { DropdownMenuItem, DropdownMenuLabel } from "../ui";
import { DropdownMenuSeparator, DropdownMenuTrigger } from "../ui";
import { AppDispatch, RootState } from "@/application/state/store";
import { useToast } from "../ui/use-toast";
import { signoutUser } from "@/application/use-cases/auth/signout";

export default function UserNav() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await dispatch(signoutUser());
      router.push("/signin");
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
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span className="hidden sm:flex max-w-[100px] truncate">
              {user ? user.displayName || "User" : "Dear Guest"}
            </span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        {user ? (
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Manage My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push(`/settings`)}>
              <Settings className="h-4 w-4 mr-2" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              <span>Signout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <EnterIcon className="mr-2 h-4 w-4" />
              <Link href="/signin">
                <div className="font-semibold">Sign in Now</div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DoubleArrowRightIcon className="mr-2 h-4 w-4" />
              <Link href="/signup">
                <div className="font-semibold">Create Your Account</div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
}
