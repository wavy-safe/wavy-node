"use client";

import { usePrivy } from "@privy-io/react-auth";
import type { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { WavyDashboardSidebar } from "@/components/dashboard/wavy-dashboard-sidebar";
import WelcomeScreen from "@/components/dashboard/welcome-screen";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { authenticated, login } = usePrivy();

  if (!authenticated) {
    return <WelcomeScreen login={login} />;
  }

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen bg-background">
        <WavyDashboardSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}
