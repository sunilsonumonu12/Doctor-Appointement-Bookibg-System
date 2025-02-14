import { useState } from "react";

import {
  LayoutDashboard,
  User,
  MapPin,
  Camera,
  Stethoscope,
  CreditCard,
  Sun,
  Moon,
  ChevronRight
} from "lucide-react";
import React from "react";

// Utility function to conditionally join class names
function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

interface SidebarButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarButton = ({ icon, label, isActive, onClick }: SidebarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex w-full items-center gap-x-3 rounded-xl p-4 text-left transition-all",
        "hover:bg-primary/10 active:scale-[0.98]",
        "dark:hover:bg-primary/20",
        isActive ? "bg-primary/10 dark:bg-primary/20" : undefined
      )}
    >
      <div className={cn(
        "flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10",
        "transition-colors group-hover:bg-primary/20",
        "dark:bg-primary/20 dark:group-hover:bg-primary/30",
        isActive ? "bg-primary/20 dark:bg-primary/30" : undefined
      )}>
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="font-medium">{label}</span>
      </div>
      <ChevronRight className={cn(
        "ml-auto h-5 w-5 opacity-0 transition-all",
        "group-hover:opacity-100 group-hover:translate-x-1",
        isActive ? "opacity-1 translate-x-1" : undefined
      )} />
    </button>
  );
};

export default function Sidebar() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const menuItems = [
    { id: "dashboard", icon: <LayoutDashboard className="h-5 w-5" />, label: "Dashboard" },
    { id: "personnel", icon: <User className="h-5 w-5" />, label: "Personnel Information" },
    { id: "address", icon: <MapPin className="h-5 w-5" />, label: "Address Information" },
    { id: "documents", icon: <Camera className="h-5 w-5" />, label: "Photo & Documents" },
    { id: "medical", icon: <Stethoscope className="h-5 w-5" />, label: "Medical History" },
    { id: "insurance", icon: <CreditCard className="h-5 w-5" />, label: "Insurance Details" },
  ];

  return (
    <div className={cn(
      "flex h-screen w-80 flex-col gap-y-6 border-r bg-background p-6",
      "transition-colors duration-300"
    )}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Medical Portal</h2>
        <button
          onClick={toggleDarkMode}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full",
            "bg-primary/10 hover:bg-primary/20 transition-colors",
            "dark:bg-primary/20 dark:hover:bg-primary/30"
          )}
        >
          {darkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="h-px bg-border" />

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <SidebarButton
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeItem === item.id}
            onClick={() => setActiveItem(item.id)}
          />
        ))}
      </nav>

      <div className="h-px bg-border" />

      <div className="rounded-xl bg-primary/5 p-4 dark:bg-primary/10">
        <p className="text-sm text-muted-foreground">
          Need help? Contact support at{" "}
          <a href="mailto:support@medical.com" className="text-primary hover:underline">
            support@medical.com
          </a>
        </p>
      </div>
    </div>
  );
}
