import { DashboardRounded, Person } from "@mui/icons-material";

export interface MenuItem {
  text: string;
  icon: React.ReactElement;
  roles: string[];
  path?: string;
}
export const allRoles = [
  "member",
  "treasurer",
  "accountant",
  "secretary",
  "chairperson",
  "vicechairperson",
  "official",
  "admin",
];

export const mainMenuItems: MenuItem[] = [
  { text: "Dashboard", icon: <DashboardRounded />, path: "/", roles: allRoles },
  {
    text: "My Chama Profile",
    icon: <Person />,
    path: "/my-chama-profile",
    roles: ["member"],
  },
];

// const mainMenuItems: MenuItem[] = [
//   // Basic menu items for all roles
//   { text: "Home", icon: <HomeRoundedIcon />, roles: ['member', 'treasurer', 'accountant', 'secretary', 'chairperson', 'vicechairperson', 'official', 'admin'] },
//   { text: "Analytics", icon: <AnalyticsRoundedIcon />, roles: ['member', 'treasurer', 'accountant', 'secretary', 'chairperson', 'vicechairperson', 'official', 'admin'] },

//   // Financial menu items for financial roles
//   { text: "Financial Reports", icon: <AccountBalanceRoundedIcon />, roles: ['treasurer', 'accountant', 'chairperson', 'admin'] },
//   { text: "Transactions", icon: <ReceiptRoundedIcon />, roles: ['treasurer', 'accountant', 'admin'] },

//   // Member management for leadership roles
//   { text: "Members", icon: <PeopleRoundedIcon />, roles: ['secretary', 'chairperson', 'vicechairperson', 'official', 'admin'] },
//   { text: "Groups", icon: <GroupRoundedIcon />, roles: ['chairperson', 'admin'] },

//   // Administrative items for admins
//   { text: "Admin Panel", icon: <AdminPanelSettingsRoundedIcon />, roles: ['admin'] },

//   // Tasks and assignments for various roles
//   { text: "Tasks", icon: <AssignmentRoundedIcon />, roles: ['secretary', 'chairperson', 'vicechairperson', 'official', 'admin'] },
//   { text: "Meetings", icon: <EventNoteRoundedIcon />, roles: ['secretary', 'chairperson', 'vicechairperson', 'official', 'admin'] },
// ];
