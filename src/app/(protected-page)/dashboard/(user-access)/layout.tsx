
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';

import DashboardLayout from '@/components/dashboard/DashboardLayout';

import { readAccess, readUserSession } from '@/app/(protected-page)/actions';

export default async function Dashboard({
  children,
}: {
  children: ReactNode;
}) {
  const { data: userSession } = await readUserSession();

  if (!userSession.session) {
    return redirect('/sign-in');
  }

  const { data: permissions } = await readAccess();
  const role = permissions.role;

  if (role !== 'user') {
    return redirect('/not-found'); // Redirect if user is not an admin
  }

  return <DashboardLayout role={role}>{children}</DashboardLayout>;
}
