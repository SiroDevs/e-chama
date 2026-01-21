"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { PageContainer } from "@/presentation/components/common/page-container";
import PageContent from "@/presentation/components/common/page-content";
import { Users } from "lucide-react";

const page = () => {
  return (
    <main className="flex flex-col min-h-dvh">
      <PageContainer pageTitle="Members" pageIcon={<Users />}>
        <PageContent tagline="Manage Group Members" breadcrumbs={[{ title: "Members" }]}>
          <div></div>
        </PageContent>
      </PageContainer>
    </main>
  );
};

export default page;
