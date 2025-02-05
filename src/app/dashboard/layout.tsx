import "../globals.css"
import { Inter } from "next/font/google"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <SidebarProvider>
          <div className="flex min-h-screen bg-background">
            <DashboardSidebar />
            <main className="flex-1 p-6">{children}</main>
          </div>
          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  )
}

