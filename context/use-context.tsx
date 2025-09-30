"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { getUser, login, register } from "./SSR_API";
import { useToast } from "./toast_context";
import Cookies from "js-cookie";
import axiosInstance from "@/lib/axiosInstence";
import axios from "axios";
import api from "@/lib/api";

const LocalAdsContext = createContext<any>(null);

export const useLocalAds = () => useContext(LocalAdsContext);

export const LocalAdsProvider = ({ children }: any) => {
  const router = useRouter();
  const { showToast } = useToast();

  // states
  const [user, setUser] = useState<any>({});
  const [campaigns, setCampaigns] = useState<any[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // If user is already set, skip fetching
        if (Object.keys(user).length > 0) return;
        const res = await getUser();
        if (res?.data?.user) {
          setUser(res.data);
        }
      } catch (error: any) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLoginSuccess = async (payload: any) => {
    const { data } = await login(payload);
    if (data.token) {
      setUser(data.user);
      showToast({ message: data.message });
      Cookies.set("access_token", data.token, { expires: 7 }); // Store JWT token in cookies (expires in 7 days)
      router.push("/role");
    } else {
      showToast({ message: data.message || "Login failed!" });
    }
  };

  const handleRegister = async (payload: any) => {
    const res = await register(payload);
    showToast({ message: res.message });
  };

  const handleLogout = () => {
    Cookies.remove("access_token");
    router.push("/");
  };

  const handleDriverRegister = async (payload: any) => {
    try {
      const response = await api.post("/api/driver/profile", payload, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      showToast({ message: response.data.message });
      router.push("/dashboard/driver");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDriverCampaignsRequest = async () => {
    try {
      const {
        data: { campaigns },
      } = await axiosInstance.get("/driver/invitation");
      if (campaigns.length) {
        setCampaigns(campaigns);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleBusinessRegister = async (payload: any) => {
    try {
      const response = await axiosInstance.post("/business/profile", payload, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      showToast({ message: response.data.message });
      router.push("/dashboard/business");
    } catch (err) {
      console.log(err);
    }
  };

  const handleBusinessCampaign = async (payload: any) => {
    try {
      const response = await api.post("/api/business/campaign", payload, {});
      showToast({ message: response.data.message });
    } catch (err) {
      console.log(err);
    }
  };

  const handleCampaignAccept = async (campaignId: any, status: string) => {
    try {
      const response = await axiosInstance.post(
        `/campaigns/accept/${campaignId}/${status}`
      );
      showToast({ message: response.data.message });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <LocalAdsContext.Provider
      value={{
        user,
        campaigns,
        handleRegister,
        handleLoginSuccess,
        handleLogout,
        handleDriverRegister,
        handleBusinessRegister,
        handleBusinessCampaign,
        handleDriverCampaignsRequest,
        handleCampaignAccept,
      }}
    >
      {children}
    </LocalAdsContext.Provider>
  );
};
