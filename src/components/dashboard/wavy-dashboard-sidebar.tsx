"use client";

import { useState } from "react";
import { Key, Home, Webhook, ChevronDown, ChevronUp } from "lucide-react"; // ✅ Nuevos íconos importados
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function WavyDashboardSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Sidebar
      className={`h-screen ${
        isCollapsed ? "w-20" : "w-64"
      } bg-[hsl(var(--sidebar-background,240,5.9%,10%))] text-[hsl(var(--sidebar-foreground,240,4.8%,95.9%))] shadow-xl transition-all duration-300 ease-in-out`}
    >
      <SidebarHeader className="flex justify-between items-center px-4 py-5 border-b border-[hsl(var(--sidebar-border,240,3.7%,15.9%))]">
        <div className="flex items-center gap-3">
          <Image
            src="/wavyNode.svg"
            alt="WavyNode Logo"
            width={isCollapsed ? 30 : 40}
            height={isCollapsed ? 30 : 40}
            className="rounded-lg shadow-md"
          />
          {!isCollapsed && (
            <h1 className="text-2xl font-bold text-[hsl(var(--sidebar-primary,224.3,76.3%,48%))]">
              WavyNode
            </h1>
          )}
        </div>

        {/* ✅ Botón de colapso actualizado */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded hover:bg-[hsl(var(--sidebar-accent,240,3.7%,15.9%))] transition transform hover:scale-110"
        >
          {isCollapsed ? (
            <ChevronDown className="h-5 w-5 text-[hsl(var(--sidebar-primary,224.3,76.3%,48%))]" />
          ) : (
            <ChevronUp className="h-5 w-5 text-[hsl(var(--sidebar-primary,224.3,76.3%,48%))]" />
          )}
        </button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="px-4 text-sm font-semibold text-[hsl(var(--muted-foreground,0,0%,63.9%))] uppercase tracking-wider">
              Navigation
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 px-3">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard"}
                  className={`flex items-center gap-3 p-3 rounded-md transition duration-300 ${
                    pathname === "/dashboard"
                      ? "bg-[hsl(var(--secondary,0,0%,14.9%))] text-[hsl(var(--primary,0,0%,98%))]"
                      : "hover:bg-[hsl(var(--accent,0,0%,14.9%))] hover:text-[hsl(var(--accent-foreground,0,0%,98%))]"
                  }`}
                >
                  <Link href="/dashboard">
                    <Home className="h-5 w-5" />
                    {!isCollapsed && <span>Dashboard</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/api-keys"}
                  className={`flex items-center gap-3 p-3 rounded-md transition duration-300 ${
                    pathname === "/dashboard/api-keys"
                      ? "bg-[hsl(var(--secondary,0,0%,14.9%))] text-[hsl(var(--primary,0,0%,98%))]"
                      : "hover:bg-[hsl(var(--accent,0,0%,14.9%))] hover:text-[hsl(var(--accent-foreground,0,0%,98%))]"
                  }`}
                >
                  <Link href="/dashboard/api-keys">
                    <Key className="h-5 w-5" />
                    {!isCollapsed && <span>API Keys</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/webhooks"}
                  className={`flex items-center gap-3 p-3 rounded-md transition duration-300 ${
                    pathname === "/dashboard/webhooks"
                      ? "bg-[hsl(var(--secondary,0,0%,14.9%))] text-[hsl(var(--primary,0,0%,98%))]"
                      : "hover:bg-[hsl(var(--accent,0,0%,14.9%))] hover:text-[hsl(var(--accent-foreground,0,0%,98%))]"
                  }`}
                >
                  <Link href="/dashboard/webhooks">
                    <Webhook className="h-5 w-5" />
                    {!isCollapsed && <span>Webhooks</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
