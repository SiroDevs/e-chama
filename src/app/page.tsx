"use client";

import { useSelector } from "react-redux";
import Link from "next/link";

import { RootState } from "@/application/state/store";
import Faq from "@/presentation/components/common/faq";
import Hero from "@/presentation/components/common/hero";
import { Button } from "@/presentation/components/ui";
import Dashboard from "@/presentation/layout/Dashboard";
import { JoinGroup } from "@/presentation/layout/join/JoinGroup";

const Page = () => { 
  const { groups } = useSelector((state: RootState) => state.group);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const hasGroups = groups && groups.length > 0;

  return (
    <>
      {isAuthenticated ? (
        hasGroups ? (
          <Dashboard />
        ) : (
          <JoinGroup />
        )
      ) : (
        <>
          <Hero />
          <div className="flex flex-col justify-center items-center sm:flex-row gap-4 mt-8">
            <Link href="/signin" passHref>
              <Button size="lg">Sign In</Button>
            </Link>
            <Link href="/signup" passHref>
              <Button variant="outline" size="lg">
                Create Account
              </Button>
            </Link>
          </div>
          <Faq />
        </>
      )}
    </>
  );
};

export default Page;