"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import EmployeeCreate from "@/components/dashboard/EmployeeCreate";
import EmployeeEdit from "@/components/dashboard/EmployeeEdit";
import EmployeeList from "@/components/dashboard/EmployeeList";
import EmployeeShow from "@/components/dashboard/EmployeeShow";
import { UserLayout } from "@/components/user/UserLayout";
import DialogsProvider from "@/hooks/useDialogs/DialogsProvider";
import NotificationsProvider from "@/hooks/useNotifications/NotificationsProvider";
import { createHashRouter, RouterProvider } from "react-router";
import {
  dataGridCustomizations,
  datePickersCustomizations,
  sidebarCustomizations,
  formInputCustomizations,
} from '@/components/shared/customizations';

const router = createHashRouter([
  {
    Component: DashboardLayout,
    children: [
      {
        path: '/employees',
        Component: EmployeeList,
      },
      {
        path: '/employees/:employeeId',
        Component: EmployeeShow,
      },
      {
        path: '/employees/new',
        Component: EmployeeCreate,
      },
      {
        path: '/employees/:employeeId/edit',
        Component: EmployeeEdit,
      },
      {
        path: '*',
        Component: EmployeeList,
      },
    ],
  },
]);

const themeComponents = {
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...sidebarCustomizations,
  ...formInputCustomizations,
};

export default function Dashboard() {
  return (
    <UserLayout role="user">
      <NotificationsProvider>
        <DialogsProvider>
          <RouterProvider router={router} />
        </DialogsProvider>
      </NotificationsProvider>
    </UserLayout>
  );
}
