import { Language } from "@/components/shared/Language";
import { Theme } from "@/components/shared/Theme";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export function RightSide() {
  return (
    <div className="z-10 bg-card w-[35%] min-h-screen flex flex-col px-10 py-5 ">
      <div className="flex justify-end">
        <div className="bg-accent rounded-full px-5 py-3 flex gap-x-3">
          <Language />
          <Theme />
        </div>
      </div>
   
      <div className="space-y-5 m-auto w-full">
        <div>
          <p className="text-4xl font-bold ">Welcome Back 👻</p>
          <p className="text-sm text-foreground dark:text-muted/60">
            Enter your account details to manage your project
          </p>
        </div>

        <div className="space-y-5">
          <Input
            type="text"
            className=""
            placeholder="Username / Email / User ID"
          ></Input>
          <Input type="password" className="" placeholder="Password"></Input>
          <div className="flex justify-between w-full">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember Me
              </label>
            </div>
            <p className="text-primary text-sm cursor-pointer">
              Forget Password?
            </p>
          </div>
          <Button className="w-full font-semibold ">Login</Button>
        </div>

        <div className="flex items-center gap-x-2">
          <div className="w-full bg-black/20 h-[1px]"></div>
          <p className="text-black/50 text-[12px] text-nowrap font-thin">
            OR CONTINUE WITH
          </p>
          <div className="w-full bg-black/20 h-[1px]"></div>
        </div>

        <Button className="w-full font-semibold ">Connect Wallet</Button>
      </div>
    </div>
  );
}
