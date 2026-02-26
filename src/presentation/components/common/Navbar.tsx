"use client";

import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui";
import ThemeSwitcher from "../ui/theme-switcher";
import { AppIcon } from "./app-icon";
import UserNav from "./usernav";
import { useSelector } from "react-redux";
import { RootState } from "@/application/state/store";

export default function NavBar() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const menuItems = [
  //   { name: "Pricing", href: "#pricing" },
  //   { name: "Testimonials", href: "#testimonials" },
  // ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {isMenuOpen ? <Cross1Icon /> : <HamburgerMenuIcon />}
              </motion.div>
            </Button>
          </div>
          <div className="flex sm:hidden">
            <AppIcon />
          </div>
          <div className="hidden sm:flex items-center space-x-8">
            <AppIcon />
            {!isAuthenticated && (
              <Button asChild variant="ghost" size="sm">
                <Link href="#faqs">Faqs</Link>
              </Button>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <UserNav />
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}