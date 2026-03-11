"use client";

import { useEffect, useState } from "react";
import SigninPage from "@/presentation/layout/auth/SigninPage";

import { Card, CardTitle, CardContent } from "@/presentation/components/ui";
import { CardHeader, CardDescription } from "@/presentation/components/ui";

const page = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center p-4 pt-8 pb-20">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center py-8">
              <div className="animate-pulse">Loading ...</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <SigninPage />;
};

export default page;
