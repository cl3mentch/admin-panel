// directory.ts
export type DirectoryItem = {
  title: string;
  icon?: string;
  path: string;
  isActive?: boolean;
  children: DirectoryItem[]; // Children are optional
};

export const directory: DirectoryItem[] = [
  {
    title: "Dashboard",
    icon: "cuida:dashboard-outline",
    path: "/dashboard",
    isActive: false,
    children: [],
  },
  {
    title: "Member",
    icon: "mdi:account",
    path: "/",
    isActive: false,
    children: [
      {
        title: "List",
        icon: "mdi:format-list-bulleted",
        path: "/dashboard/member/list",
        children: [],
      },
    ],
  },
  {
    title: "Admin",
    icon: "eos-icons:admin-outlined",
    path: "/",
    isActive: false,
    children: [
      {
        title: "List",
        icon: "mdi:format-list-bulleted",
        path: "/dashboard/admin/list",
        children: [],
      },
      {
        title: "Permission",
        icon: "fluent-mdl2:permissions",
        path: "/dashboard/admin/permission",
        children: [],
      },
    ],
  },
];
