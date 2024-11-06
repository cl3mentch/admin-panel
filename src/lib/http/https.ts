"use client";
import { disconnect } from "@wagmi/core";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { zeroAddress } from "viem";
import { useUserStore } from "../store/userDataStore";
import { APIMethod, APIOptions, APIResponse } from "../types/commonType";
import { config } from "../web3/wagmi/config";
import { urls } from "./settings";

class API {
  private sessionExpired = false; // Flag to track session expiration

  private async request<T = any>(
    method: APIMethod,
    resource: string, //url endpoint
    { data, useToken = true }: APIOptions = {}
  ): Promise<APIResponse<T>> {
    try {
      const queryString =
        method === "GET" && data
          ? "?" + new URLSearchParams(data).toString()
          : "";

      const headers: HeadersInit = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      if (useToken) {
        const tokenApi = Cookies.get("accessToken");
        if (tokenApi) {
          headers.Authorization = `Bearer ${tokenApi}`;
        } else {
          window.location.href = "/";
          throw new Error("No access token available");
        }
      }

      const response = await fetch(`${urls.apiBase}${resource}${queryString}`, {
        method,
        mode: "cors",
        headers,
        body: method !== "GET" ? JSON.stringify(data) : null,
      });

      const resp: APIResponse<T> = await response.json();

      if (resp.data === "901" && !this.sessionExpired) {
        this.sessionExpired = true;
        const user = useUserStore.getState();
        disconnect(config);
        Cookies.remove("accessToken");
        user.setUser({ web3_address: zeroAddress, email: "" });

        toast.warning("Login Session Expired... Redirecting to Login");

        // Delay the redirect to allow the toast to be visible
        setTimeout(() => {
          window.location.href = "/";
        }, 3000); // Delay of 500ms (adjust as needed)
      }

      return resp;
    } catch (err) {
      console.error("API call error:", err);
      throw err;
    }
  }

  public get<T = any>(
    resource: string,
    options?: APIOptions
  ): Promise<APIResponse<T>> {
    return this.request("GET", resource, options);
  }

  public post<T = any>(
    resource: string,
    options?: APIOptions
  ): Promise<APIResponse<T>> {
    return this.request("POST", resource, options);
  }

  public put<T = any>(
    resource: string,
    options?: APIOptions
  ): Promise<APIResponse<T>> {
    return this.request("PUT", resource, options);
  }

  public delete<T = any>(
    resource: string,
    options?: APIOptions
  ): Promise<APIResponse<T>> {
    return this.request("DELETE", resource, options);
  }

  // Optionally, you can add a method to reset the sessionExpired flag, if needed.
  public resetSessionExpired() {
    this.sessionExpired = false;
  }
}

export const api = new API();
