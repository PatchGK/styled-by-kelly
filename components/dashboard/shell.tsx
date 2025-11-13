"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { DashboardTopBar } from "@/components/dashboard/top-bar"

export function DashboardShell({ children }: { children: ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const handleMenuToggle = () => {
    setMobileNavOpen((prev) => !prev)
  }

  return (
    <div className="flex min-h-svh bg-muted/20">
      <DashboardNav mobileOpen={mobileNavOpen} onMobileOpenChange={setMobileNavOpen} />
      <div className="flex flex-1 flex-col">
        <DashboardTopBar mobileNavOpen={mobileNavOpen} onMenuToggle={handleMenuToggle} />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10">{children}</div>
        </main>
      </div>
    </div>
  )
}

