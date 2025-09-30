"use client";

import React, { useState } from "react";
import { HomePage } from "../components/HomePage";
import { DriverRegistration } from "../components/DriverRegistration";
import { BusinessDashboard } from "./dashboard/business/BusinessDashboard";
import { AdminDashboard } from "./dashboard/admin/AdminDashboard";

type ViewType =
  | "home"
  | "driver"
  | "driver-register"
  | "business"
  | "admin"
  | "login";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>("home");

  const handleNavigate = (view: string) => {
    setCurrentView(view as ViewType);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "home":
        return <HomePage />;
      // case "login":
      //   return <Login onNavigate={handleNavigate} />;
      // case "driver":
      // return <DriverDashboard onNavigate={handleNavigate} />;
      // case "driver-register":
      // return <DriverRegistration onNavigate={handleNavigate} />;
      // case "business":
      // return <BusinessDashboard onNavigate={handleNavigate} />;
      case "admin":
        return <AdminDashboard onNavigate={handleNavigate} />;
      default:
        return <HomePage />;
    }
  };

  return <div className="min-h-screen">{renderCurrentView()}</div>;
}
