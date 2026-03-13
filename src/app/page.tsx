"use client";

import { useSelector } from "react-redux";
import { Link } from "lucide-react";

import { RootState } from "@/application/state/store";
import Faq from "@/presentation/components/common/faq";
import Hero from "@/presentation/components/common/hero";
import { Button } from "@/presentation/components/ui";
import Dashboard from "@/presentation/layout/Dashboard";

const page = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <>
      {isAuthenticated ? (
        <Dashboard />
      ) : (
        <>
          <Hero />
          <div className="flex flex-col justify-center items-center sm:flex-row gap-4 justify-center mt-8">
            <Link href="/signin">
              <Button size="lg">Sign In</Button>
            </Link>
            <Link href="/signup">
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

export default page;
