"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { WavyDashboardSidebar } from "@/components/dashboard/wavy-dashboard-sidebar"
import type { ReactNode } from "react"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-background">
        <WavyDashboardSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </SidebarProvider>
  )
}


