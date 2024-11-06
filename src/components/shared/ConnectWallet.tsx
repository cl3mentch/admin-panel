/* eslint-disable react-hooks/exhaustive-deps */
import AuthAPI from "@/lib/api/auth";
import { useUserStore } from "@/lib/store/userDataStore";
import { config } from "@/lib/web3/wagmi/config";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppKit } from "@reown/appkit/react";
import { disconnect, watchAccount } from "@wagmi/core";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { Address } from "viem";
import { Button } from "../ui/button";

export function ConnectWallet() {
  const router = useRouter();
  const { open } = useAppKit();
  const isCookie = Cookies.get("accessToken");
  const { setUser, user } = useUserStore();

  // Use useRef to track isRequesting without causing re-renders
  const isRequestingRef = useRef(false);

  const unwatch = watchAccount(config, {
    onChange: async (data) => {
      const incomingAddress = data?.address as Address;

      // Early exit if a request is already in progress or if no valid address is provided
      if (isRequestingRef.current || !incomingAddress || isCookie) {
        return;
      }

      // Set the flag using the ref
      isRequestingRef.current = true;

      try {
        // Handle logic for non-cookie and cookie-based authentication
        if (!isCookie || user?.web3_address !== incomingAddress) {
          // Request authentication message
          const auth = await AuthAPI.web3.requestMessage(incomingAddress);

          if (auth) {
            toast.success("Connected Account");
            setUser({ web3_address: incomingAddress });
            router.push("/dashboard");
          } else {
            disconnect(config);
            toast.error("Failed to authenticate account.");
          }
        }
      } catch (error) {
        disconnect(config);
        console.error("Error during authentication:", error);
        toast.error("Failed to connect wallet");
      } finally {
        // Reset the flag using the ref (no re-render triggered)
        isRequestingRef.current = false;
      }
    },
  });

  useEffect(() => {
    // Clean up unwatch when user is defined and cookie is not present
    if (!isCookie) {
      unwatch();
    }

    return () => unwatch();
  }, [user, isCookie]);

  return (
    <Button onClick={() => open()} className="w-full z-10">
      <Icon icon="logos:metamask-icon" /> Connect Wallet
    </Button>
  );
}
