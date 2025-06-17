"use client";

import { useState } from "react";
import TopNavigation from "@/components/TopNavigation";
import Sidebar from "@/components/Sidebar";
import ConversationList from "@/components/ConversationsList";
import ChatInterface from "@/components/ChatInterface";
import CustomerProfile from "@/components/CustomerProfile";

export default function Dashboard() {
  const [selectedConversation, setSelectedConversation] =
    useState("will-pantente");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <TopNavigation />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <div className="flex flex-1 overflow-hidden">
          <ConversationList
            selectedConversation={selectedConversation}
            onSelectConversation={setSelectedConversation}
            collapsed={sidebarCollapsed}
          />

          <div className="flex flex-1 overflow-hidden">
            <ChatInterface
              conversationId={selectedConversation}
              onToggleProfile={() => setProfileVisible(!profileVisible)}
              profileVisible={profileVisible}
            />

            {profileVisible && (
              <CustomerProfile
                conversationId={selectedConversation}
                onClose={() => setProfileVisible(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
