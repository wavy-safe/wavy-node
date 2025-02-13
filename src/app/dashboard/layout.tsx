"use client";

import { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { WavyDashboardSidebar } from "@/components/dashboard/wavy-dashboard-sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { authenticated, ready } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && !authenticated) {
      router.replace("/"); // Redirects to Search if the user is not logged in
    }
  }, [authenticated, ready, router]);

  if (!ready) return <LoadingScreen message="Loading authentication..." />;
  if (!authenticated) return <LoadingScreen message="Redirecting..." />;

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen bg-background">
        <WavyDashboardSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}

// Reusable loading screen component
function LoadingScreen({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
}
