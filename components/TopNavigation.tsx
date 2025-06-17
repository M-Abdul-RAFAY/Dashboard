"use client";

import { Unplug, Plus, User, Menu, X, CircleDollarSign } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function TopNavigation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("inbox");
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const navRef = useRef<HTMLDivElement>(null);

  const navigationItems = [
    { id: "home", label: "Home" },
    { id: "inbox", label: "Inbox" },
    { id: "contacts", label: "Contacts" },
    { id: "marketing", label: "Marketing" },
    { id: "payments", label: "Payments" },
    { id: "reporting", label: "Reporting" },
    { id: "insights", label: "Insights" },
    { id: "automations", label: "Automations" },
  ];

  // Calculate underline position and width
  useEffect(() => {
    if (navRef.current) {
      const activeButton = navRef.current.querySelector(
        `[data-nav-id="${activeItem}"]`
      ) as HTMLElement;
      if (activeButton) {
        const navRect = navRef.current.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();
        setUnderlineStyle({
          width: buttonRect.width,
          left: buttonRect.left - navRect.left,
        });
      }
    }
  }, [activeItem]);

  const handleNavClick = (itemId: string) => {
    setActiveItem(itemId);
    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-zinc-950 text-white border-b border-gray-700 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <CircleDollarSign className="text-white" size={24} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center relative" ref={navRef}>
            <div className="flex items-center space-x-1 relative">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  data-nav-id={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors duration-200 relative z-10",
                    activeItem === item.id
                      ? "text-white"
                      : "text-gray-300 hover:text-white"
                  )}
                >
                  {item.label}
                </button>
              ))}

              {/* Sliding Underline */}
              <div
                className="absolute [top:2.875rem] [height:0.2rem] bg-blue-500 transition-all duration-300 ease-in-out"
                style={{
                  width: `${underlineStyle.width}px`,
                  transform: `translateX(${underlineStyle.left}px)`,
                }}
              />
            </div>
          </nav>
        </div>

        {/* Right side - Search, Actions, Profile */}
        <div className="flex items-center space-x-2">
          {/* Search - Hidden on mobile */}

          {/* Action buttons */}
          <button className="p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            <Plus size={20} />
          </button>

          <button className="p-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors">
            <Unplug size={20} />
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={cn(
          " bg-gray-800 border-t border-gray-700 transition-all duration-300 ease-in-out overflow-hidden",
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 py-2 space-y-1">
          {/* Mobile Search */}

          {/* Mobile Navigation Items */}
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={cn(
                "w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                activeItem === item.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
