import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "../ui/button";

export function Language() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Button variant={"ghost"} className="w-8 h-8 rounded-full p-0">
          <Icon
            icon="ion:language"
            className="text-[16px] cursor-pointer text-[--font-black] dark:text-[--font-white]"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2">
        <DropdownMenuItem className="">English</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
