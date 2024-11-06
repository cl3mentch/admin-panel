import { Config, disconnect, signMessage } from "@wagmi/core";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { type Address } from "viem";
import { api } from "../http/https";
import { config } from "../web3/wagmi/config";

const AuthAPI = {
  web3: {
    requestMessage: async function (address: Address) {
      try {
        const result = await api.post("/admin/auth/request", {
          data: { address },
          useToken: false,
        });

        if (!result.data) throw new Error("No Message Received");
        if (result.success) {
          const signature = await signMessage(config, {
            message: { raw: result.data },
          });

          if (signature) {
            const verified = await this.verifyMessage(signature, address);
            return verified;
          } else {
            return false;
          }
        } else {
          toast.error(result.data);
        }
      } catch (error) {
        await disconnect(config as Config);
        Cookies.remove("accessToken");
        console.error("Error requesting message:", error);
        return false;
      }
    },
    verifyMessage: async function (signature: string, address: Address) {
      try {
        const response = await api.post("/admin/auth/verify", {
          data: {
            address,
            sign: signature,
          },
          useToken: false,
        });

        if (!response.data.access_token) {
          throw new Error("No Token Received");
        }

        if (response.success && response.data) {
          const expires = new Date(
            new Date().getTime() + response.data.expires_in * 1000
          );

          Cookies.set("accessToken", response.data.access_token, {
            expires,
          });
          // reset the session expiry to false
          api.resetSessionExpired();
          return true;
        } else {
          return false;
        }
      } catch (error) {
        await disconnect(config);
        Cookies.remove("accessToken");
        console.error("Error validating message:", error);
        return false;
      }
    },
  },
  email: {
    login: async (email: string, password: string) => {
      try {
        const response = await api.post("/admin/auth/login", {
          data: {
            email,
            password,
          },
          useToken: false,
        });

        if (response.success && response.data) {
          const expires = new Date(
            new Date().getTime() + response.data.expires_in * 1000
          );

          Cookies.set("accessToken", response.data.access_token, {
            expires,
          });
          // reset the session expiry to false
          api.resetSessionExpired();
          return true;
        } else {
          if (response.data[0] === "email:invalid" || "password:invalid") {
            toast.error("Login Credential is invalid");
          } else {
            toast.error("Account does not exists");
          }
          return false;
        }
      } catch (error) {
        Cookies.remove("accessToken");
        console.error("Error validating message:", error);
        return false;
      }
    },
  },
  logout: async function () {
    const cookie = Cookies.get("accessToken");

    if (!cookie) return Cookies.remove("accessToken");

    await api.post("/dapp/auth/logout");
    Cookies.remove("accessToken");
  },
};

export default AuthAPI;
