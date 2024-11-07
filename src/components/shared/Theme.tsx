import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

export function Theme() {
  const { setTheme, theme } = useTheme();

  const changeTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <Button
      variant={"ghost"}
      onClick={changeTheme}
      className="w-8 h-8 rounded-full p-0"
    >
      {theme === "light" ? (
        <Sun className="h-[1.3rem] w-[1.3rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-[--font-black] dark:text-[--font-white]" />
      ) : (
        <Moon className="h-[1.3rem] w-[1.3rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-[--font-black] dark:text-[--font-white]" />
      )}
    </Button>
  );
}
