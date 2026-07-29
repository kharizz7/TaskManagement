import {
  CheckSquare,
  LayoutDashboard,
  Bell,
  Settings,
} from "lucide-react";

export const sidebarItems = [
  {
    title: "My Tasks",
    path: "/",
    icon: CheckSquare,
    disabled: false,
  },

  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    disabled: true,
  },

  {
    title: "Notifications",
    path: "/notifications",
    icon: Bell,
    disabled: true,
  },

  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
    disabled: true,
  },
];