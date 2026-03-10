"use client";

import { AlertCircle, Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { XIcon, SaveIcon } from "lucide-react";

import { PageContainer } from "@/presentation/components/common/page-container";
import PageContent from "@/presentation/components/common/page-content";
import { PageAction, PageButton } from "@/presentation/components/ui/actions";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/application/state/store";
import NewMemberForm, { FormValues } from "./form";
import { useState } from "react";
import { signupUser } from "@/application/use-cases/auth/signup";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Card,
  CardContent,
} from "@/presentation/components/ui";
import { newMember } from "@/application/use-cases/user/member";

const page = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { group } = useSelector((state: RootState) => state.group);
  const handleSaveMember = () => {};

  const handleCancel = () => {
    router.push("/members");
  };
  const handleSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      setError(null);

      await dispatch(
        newMember(
          values.first_name,
          values.last_name,
          "",
          values.email,
          values.password,
          "",
          group?.group_id!,
        ),
      );

      router.push("/members");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to register. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="flex flex-col min-h-dvh">
      <PageContainer pageTitle="Register a New Member" pageIcon={<Users />}>
        <PageContent
          breadcrumbs={[{ title: "Members" }, { title: "New Member" }]}
          actions={
            <div className="flex flex-row items-center gap-3">
              <PageButton
                title="Cancel"
                onClick={handleCancel}
                icon={<XIcon />}
              />
              <PageAction
                title="Save Member"
                onClick={handleSaveMember}
                icon={<SaveIcon />}
              />
            </div>
          }
        >
          <Card className="w-full p-4">
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <NewMemberForm onSubmit={handleSubmit} isLoading={isLoading} />
            </CardContent>
          </Card>
        </PageContent>
      </PageContainer>
    </main>
  );
};

export default page;
