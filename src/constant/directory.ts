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
    title: "User",
    icon: "mdi:account",
    path: "/",
    isActive: false,
    children: [
      {
        title: "List",
        icon: "mdi:format-list-bulleted",
        path: "/dashboard/user/list",
        children: [],
      },
    ],
  },
];
