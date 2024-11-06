import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react/dist/iconify.js";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export type TActionOptions = "edit" | "delete" | "view";

export type TAction = {
  name: TActionOptions;
  path: string;
  icon: string;
}[];

interface ActionProps<TData extends Record<string, any>> {
  data: TData;
  options: TAction;
}

export default function Actions<TData extends Record<string, any>>({
  data,
  options,
}: ActionProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4 text-black dark:text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="text-sm py-[2px]">
          Action ({data.id})
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {options.map((option, i) => (
          <DropdownMenuItem
            key={i}
            className="sf-light-font text-sm font-bold py-[2px]"
          >
            {option.path !== "delete" ? (
              <Link
                href={option.path}
                className="flex items-center gap-x-2 w-full"
              >
                <Icon icon={option.icon} />
                {option.name.charAt(0).toUpperCase() + option.name.slice(1)}
              </Link>
            ) : (
              <Button className="flex items-center gap-x-2">
                <Icon icon={option.icon} />
                {option.name.charAt(0).toUpperCase() + option.name.slice(1)}
              </Button>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
