"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import BusinessInfoForm from "../../components/BusinessInfoForm";
import CampaignsForm from "../../components/CampaignsForm";
import TemplatesForm from "../../components/TemplatesForm";
import RulesForm from "../../components/RulesForm";
import IntegrationsForm from "../../components/IntegrationsForm";
import WidgetCode from "../../components/WidgetCode";
import Chat from "@/components/Chat";

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("chat");

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "business":
        return <BusinessInfoForm />;
      case "campaigns":
        return <CampaignsForm />;
      case "templates":
        return <TemplatesForm />;
      case "rules":
        return <RulesForm />;
      case "integrations":
        return <IntegrationsForm />;
      case "widget":
        return <WidgetCode />;
      case "chat":
        return <Chat />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="relative z-40">
        <Navbar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={handleLogout}
        />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
}
