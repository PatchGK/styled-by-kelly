"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Sparkles, ShoppingBag, Heart, Settings, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/ai-tools", label: "AI Design Tools", icon: Sparkles },
  { href: "/dashboard/projects", label: "My Projects", icon: Heart },
  { href: "/dashboard/marketplace", label: "Marketplace", icon: ShoppingBag },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

export function DashboardNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 border-r border-border bg-card flex-col">
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-serif text-xl font-bold text-primary">StyledByKelly</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-50 border-b border-border bg-card">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="font-serif text-xl font-bold text-primary">
            StyledByKelly
          </Link>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="border-t border-border p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
            <Button variant="ghost" className="w-full justify-start text-muted-foreground mt-4">
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </Button>
          </nav>
        )}
      </div>
    </>
  )
}
