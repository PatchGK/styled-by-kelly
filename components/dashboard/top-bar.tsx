"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LogOut, Menu, PlusCircle, ShoppingBag, Sparkles, X } from "lucide-react"
import { FLATTENED_NAV_ITEMS } from "@/components/dashboard-nav"
import { useMemo, useState } from "react"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"

const QUICK_ACTIONS = [
  {
    label: "Start Project",
    href: "/dashboard/projects?new=1",
    icon: PlusCircle,
    variant: "default" as const,
  },
  {
    label: "Use AI Tools",
    href: "/dashboard/ai-tools",
    icon: Sparkles,
    variant: "secondary" as const,
  },
  {
    label: "Shop Marketplace",
    href: "/dashboard/marketplace",
    icon: ShoppingBag,
    variant: "outline" as const,
  },
]

export function DashboardTopBar({
  mobileNavOpen,
  onMenuToggle,
}: {
  mobileNavOpen: boolean
  onMenuToggle: () => void
}) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])
  const [signingOut, setSigningOut] = useState(false)
  const currentNavItem = useMemo(
    () =>
      FLATTENED_NAV_ITEMS.find((item) => {
        if (item.href === "/dashboard") return pathname === item.href
        return pathname === item.href || pathname.startsWith(`${item.href}/`)
      }),
    [pathname],
  )

  const handleSignOut = async () => {
    try {
      setSigningOut(true)
      await supabase.auth.signOut()
    } finally {
      setSigningOut(false)
      router.replace("/login")
    }
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/65">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            onClick={onMenuToggle}
            aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"}
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Dashboard</p>
            <h1 className="text-lg font-semibold text-foreground sm:text-xl">
              {currentNavItem?.label ?? "Overview"}
            </h1>
          </div>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {QUICK_ACTIONS.map((action) => (
            <Button key={action.href} variant={action.variant} size="sm" asChild>
              <Link href={action.href} className="flex items-center gap-2">
                <action.icon className="h-4 w-4" />
                {action.label}
              </Link>
            </Button>
          ))}
          <Button variant="ghost" size="sm" onClick={handleSignOut} disabled={signingOut}>
            <LogOut className="h-4 w-4" />
            {signingOut ? "Signing out…" : "Sign out"}
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto px-4 pb-4 sm:px-6 lg:hidden">
        {QUICK_ACTIONS.map((action) => (
          <Button
            key={action.href}
            variant="outline"
            size="sm"
            asChild
            className={cn(
              "whitespace-nowrap",
              action.variant === "default" && "border-primary/40 bg-primary/10 text-primary hover:bg-primary/15",
            )}
          >
            <Link href={action.href} className="flex items-center gap-1.5">
              <action.icon className="h-3.5 w-3.5" />
              {action.label}
            </Link>
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={handleSignOut}
          disabled={signingOut}
          className="whitespace-nowrap"
        >
          <LogOut className="h-3.5 w-3.5" />
          {signingOut ? "Signing out…" : "Sign out"}
        </Button>
      </div>
    </header>
  )
}

