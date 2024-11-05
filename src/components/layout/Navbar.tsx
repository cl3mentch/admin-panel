/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button/button";
import AuthAPI from "@/lib/api/auth";
import { truncateString } from "@/lib/helper";
import { useUserStore } from "@/lib/store/userDataStore";
import { config } from "@/lib/web3/wagmi/config";
import { useAppKit } from "@reown/appkit/react";
import { watchAccount } from "@wagmi/core";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Address, zeroAddress } from "viem";
import { useAccountEffect } from "wagmi";

export default function Navbar() {
  return (
    <main className="bg-gradient-to-l from-[#481555]  w-full top-0 z-[999] sticky py-3 backdrop-blur-sm  px-3 md:px-5">
      <div className="max-w-[1400px] w-full m-auto flex justify-end items-center">
        {/* <img src="/img/logo.png" className="w-16" alt="" /> */}
        <ConnectButton />
      </div>{" "}
    </main>
  );
}

function ConnectButton() {
  const { open } = useAppKit();
  const { setUser, user } = useUserStore();
  const isCookie = Cookies.get("accessToken");

  const [isMounted, setIsMounted] = useState(false); // Track when the component is mounted

  useAccountEffect({
    onDisconnect() {
      Cookies.remove("accessToken");
      setUser({ web3_address: zeroAddress }); // Only update web3_address
    },
  });

  useEffect(() => {
    setIsMounted(true); // Mark as mounted on client-side

    const unwatch = watchAccount(config, {
      onChange: async (data) => {
        const incomingAddress = data?.address as Address;

        try {
          // If the user connects a new account and doesn't have an access token
          if (incomingAddress && !isCookie) {
            const auth = await AuthAPI.requestMessage(incomingAddress);
            if (auth) {
              toast.success("Connected Account");
              return setUser({ web3_address: incomingAddress });
            } // Only update web3_address
          }
          // If the user switches accounts while having an access token
          else if (
            incomingAddress &&
            user?.web3_address !== incomingAddress &&
            isCookie
          ) {
            Cookies.remove("accessToken");
            setUser({ web3_address: zeroAddress }); // Only update web3_address
            const auth = await AuthAPI.requestMessage(incomingAddress);
            if (auth) {
              toast.success("Connected Account");
              return setUser({ web3_address: incomingAddress });
            } // Only update web3_address
          }
        } catch (error) {
          console.error("Error handling account change:", error);
        }
      },
    });

    if (isCookie === undefined && user.web3_address !== zeroAddress) {
      Cookies.remove("accessToken");
      setUser({ web3_address: zeroAddress }); // Only update web3_address
    }

    // Clean up watcher on unmount
    return () => unwatch();
  }, [user, isCookie, setUser]);

  // Avoid rendering wallet information during server-side rendering
  if (!isMounted) return null;

  return (
    <Button
      className="bg-[#29193D] hover:bg-[#481555]/50 border border-pink-500 pixel-font text-sm md:text-md transition"
      onClick={() => {
        open();
      }}
    >
      {user.web3_address !== zeroAddress
        ? truncateString(user.web3_address, 5, 5)
        : "Connect Wallet"}
    </Button>
  );
}
