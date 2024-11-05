import { Icon } from "@iconify/react/dist/iconify.js";

/* eslint-disable @next/next/no-img-element */
export function LeftSide() {
  return (
    <div className="relative w-[65%] min-h-screen flex flex-col items-center justify-center p-5">
      <div className="absolute top-4 left-4 flex items-center gap-x-2">
        <Icon icon="tabler:brand-nextjs" className=" text-4xl" />
        <p className="font-semibold text-xl">Logo</p>
      </div>

      <div className="flex flex-col items-center justify-center relative w-full h-full">
        <img
          src="/img/auth/rocket.png"
          className="max-w-[300px] animate-bounce-slow z-10"
          alt="Rocket"
        />
        <p className="z-10 text-xl">Plug-and-play Admin System</p>
        <p className="z-10 text-sm font-thin text-foreground/70 dark:text-muted/60">
          Manage your data with ease
        </p>

        <div className="bg-primary opacity-20 max-w-[500px] rounded-full w-full h-full max-h-[500px] absolute blur-[100px]"></div>
        <div className="bg-primary opacity-20 max-w-[300px] rounded-full w-full h-full max-h-[300px] absolute top-2 right-2 blur-[100px]"></div>
        <div className="bg-primary opacity-20 max-w-[300px] rounded-full w-full h-full max-h-[300px] absolute bottom-2 left-2 blur-[100px]"></div>
      </div>
    </div>
  );
}
