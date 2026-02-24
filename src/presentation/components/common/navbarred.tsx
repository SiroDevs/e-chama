"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/application/state/store";
import { signoutUser } from "@/application/use-cases/auth/signoutUser";
import { Button, DropdownMenu, DropdownMenuItem } from "../ui";
import { DropdownMenuContent, DropdownMenuLabel } from "../ui";
import { DropdownMenuSeparator, DropdownMenuTrigger } from "../ui";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useToast } from "../ui/use-toast";
import ThemeSwitcher from "../ui/theme-switcher";
import { AppIcon } from "./app-icon";

export const Navbar1 = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
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
    <nav className="sticky top-0 z-50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl"></span>
          </Link>

          <div className="md:flex items-center space-x-6">
            <AppIcon />
          </div>

          <div className="flex items-center space-x-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-1"
                  >
                    <User className="h-4 w-4" />
                    <span className="max-w-[100px] truncate">{user.email}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => router.push(`/user/${user.uid}/settings`)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Signout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" onClick={() => router.push("/signin")}>
                  Sign In
                </Button>
                <Button onClick={() => router.push("/signup")}>Sign Up</Button>
              </>
            )}
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};
