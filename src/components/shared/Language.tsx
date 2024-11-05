import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react/dist/iconify.js";

export function Language() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Icon
          icon="ion:language"
          className="text-[16px] cursor-pointer text-[--font-black] dark:text-[--font-white]"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2">
        <DropdownMenuItem className="">English</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
