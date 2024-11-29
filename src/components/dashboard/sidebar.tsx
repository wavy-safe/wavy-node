"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, BarChart2, AlertCircle, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { icon: Home, label: "Overview", href: "/dashboard" },
  { icon: BarChart2, label: "Analytics", href: "/dashboard/analytics" },
  { icon: AlertCircle, label: "Alerts", href: "/dashboard/alerts" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r border-[#D6D6ED] p-4">
      <div className="h-14 flex items-center px-4 mb-8">
        <h1 className="text-xl font-bold text-[#2D2E89]">Wavy Node</h1>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-[#C8E1EE] hover:text-[#2D2E89] transition-colors",
                pathname === item.href && "bg-[#C8E1EE] text-[#2D2E89]"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
