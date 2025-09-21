import { DashboardRounded, Person, EditCalendar, People } from "@mui/icons-material";
import { InfoTwoTone, GroupTwoTone, Newspaper, ListRounded } from "@mui/icons-material";

export interface MenuItem {
  text: string;
  icon: React.ReactElement;
  roles: string[];
  path?: string;
}

export const allRoles = [
  "admin",
  "treasurer",
  "accountant",
  "secretary",
  "chairperson",
  "vicechairperson",
  "official",
  "member",
];

export const adminRoles = [
  "admin",
  "treasurer",
  "secretary",
  "chairperson",
  "vicechairperson",
  "official",
];

export const officialRoles = [
  "treasurer",
  "secretary",
  "chairperson",
  "vicechairperson",
  "official",
];

export const mainMenuItems: MenuItem[] = [
  { text: "Dashboard", icon: <DashboardRounded />, path: "/", roles: allRoles },
  {
    text: "Events",
    icon: <EditCalendar />,
    path: "/events",
    roles: allRoles,
  },
  {
    text: "Members",
    icon: <GroupTwoTone />,
    path: "/members",
    roles: officialRoles,
  },
  {
    text: "Contributions",
    icon: <ListRounded />,
    path: "/contributions",
    roles: officialRoles,
  },
  {
    text: "Announcements",
    icon: <Newspaper />,
    path: "/announcements",
    roles: allRoles,
  },
  {
    text: "Meetings",
    icon: <People />,
    path: "/meetings",
    roles: allRoles,
  },
  {
    text: "My Profile",
    icon: <Person />,
    path: "/member",
    roles: ["member"],
  },
  {
    text: "Chama Profile",
    icon: <InfoTwoTone />,
    path: "/chama",
    roles: adminRoles,
  },
];
