import { UserLayout } from "@/components/user/UserLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "eChama",
  description: "The digital sacco management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <UserLayout role="user">{children}</UserLayout>
    </main>
  );
}
