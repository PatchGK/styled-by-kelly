"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Sparkles,
  ShoppingBag,
  PanelsTopLeft,
  Settings,
  LogOut,
  Inbox,
  PieChart,
  LifeBuoy,
  BriefcaseBusiness,
  ListChecks,
  X,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"

export type DashboardNavItem = {
  label: string
  href: string
  icon: LucideIcon
  badge?: string
  description?: string
  group?: "workspace" | "engagement" | "support" | "admin"
}

export type DashboardNavSection = {
  heading: string
  items: DashboardNavItem[]
}

export const DASHBOARD_NAV_SECTIONS: DashboardNavSection[] = [
  {
    heading: "Workspace",
    items: [
      {
        label: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
        description: "Snapshot of plans, projects, and saved items.",
        group: "workspace",
      },
      {
        label: "AI Design Tools",
        href: "/dashboard/ai-tools",
        icon: Sparkles,
        description: "Style quiz, photo analysis, and color matching.",
        group: "workspace",
      },
      {
        label: "My Projects",
        href: "/dashboard/projects",
        icon: ListChecks,
        description: "Track project milestones, designers, and tasks.",
        group: "workspace",
      },
      {
        label: "Marketplace",
        href: "/dashboard/marketplace",
        icon: ShoppingBag,
        description: "Shop curated decor and add-on services.",
        group: "workspace",
      },
      {
        label: "Design Boards",
        href: "/dashboard/boards",
        icon: PanelsTopLeft,
        description: "Organize inspiration, AI outputs, and saved products.",
        group: "workspace",
      },
    ],
  },
  {
    heading: "Engagement",
    items: [
      {
        label: "Inbox",
        href: "/dashboard/inbox",
        icon: Inbox,
        description: "Message center for updates and designer chat.",
        group: "engagement",
      },
      {
        label: "Analytics & Insights",
        href: "/dashboard/analytics",
        icon: PieChart,
        description: "Metrics, trends, and AI recommendations.",
        group: "engagement",
      },
    ],
  },
  {
    heading: "Support",
    items: [
      {
        label: "Help & Support",
        href: "/dashboard/support",
        icon: LifeBuoy,
        description: "Knowledge base, tickets, and concierge contact.",
        group: "support",
      },
      {
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
        description: "Profile preferences, billing, notifications.",
        group: "support",
      },
    ],
  },
  {
    heading: "Operations",
    items: [
      {
        label: "Admin Services",
        href: "/dashboard/admin/services",
        icon: BriefcaseBusiness,
        description: "Internal management area for services & bookings.",
        group: "admin",
      },
    ],
  },
]

export const FLATTENED_NAV_ITEMS = DASHBOARD_NAV_SECTIONS.flatMap((section) => section.items)

export function DashboardSidebar({ className }: { className?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.replace("/login")
  }

  return (
    <aside
      className={cn(
        "hidden lg:flex w-72 flex-col border-r border-border bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/30",
        className,
      )}
    >
      <div className="border-b border-border px-6 py-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-xl font-semibold text-primary">StyledByKelly</span>
          </Link>
        </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <nav className="space-y-8">
          {DASHBOARD_NAV_SECTIONS.map((section) => (
            <div key={section.heading} className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{section.heading}</p>
              <div className="space-y-1.5">
                {section.items.map((item) => (
                  <DashboardNavLink key={item.href} item={item} pathname={pathname} />
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-border px-4 py-6">
        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground" onClick={handleSignOut}>
          <LogOut className="h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </aside>
  )
}

export function DashboardMobileNav({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    onOpenChange(false)
    router.replace("/login")
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Close navigation"
        className="absolute inset-0 bg-background/60 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative ml-auto flex h-full w-[80%] max-w-sm flex-col bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <Link href="/" className="font-serif text-lg font-semibold text-primary" onClick={() => onOpenChange(false)}>
            StyledByKelly
          </Link>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} aria-label="Close navigation menu">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex h-[calc(100%-5rem)] flex-col overflow-y-auto px-4 py-6">
          <nav className="space-y-6">
            {DASHBOARD_NAV_SECTIONS.map((section) => (
              <div key={section.heading} className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{section.heading}</p>
                <div className="space-y-1.5">
                  {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                      onClick={() => onOpenChange(false)}
                  className={cn(
                        "flex items-start gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                        isActive(pathname, item.href)
                          ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                      <item.icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                      <span className="flex-1">
                  {item.label}
                        {item.description ? (
                          <span className="mt-1 block text-xs font-normal text-muted-foreground/80">
                            {item.description}
                          </span>
                        ) : null}
                      </span>
                      {item.badge ? (
                        <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold uppercase text-primary">
                          {item.badge}
                        </span>
                      ) : null}
                </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-auto pt-6">
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground" onClick={handleSignOut}>
              <LogOut className="h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function DashboardNavLink({ item, pathname }: { item: DashboardNavItem; pathname: string }) {
  const active = isActive(pathname, item.href)

  return (
    <Link
      href={item.href}
      className={cn(
        "group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:-translate-x-1 hover:bg-accent hover:text-accent-foreground",
      )}
    >
      <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
      <div className="flex flex-1 flex-col">
        <span>{item.label}</span>
        {item.description ? (
          <span className="text-xs font-normal text-muted-foreground group-hover:text-accent-foreground/80">
            {item.description}
          </span>
        ) : null}
      </div>
      {item.badge ? (
        <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
          {item.badge}
        </span>
      ) : null}
    </Link>
  )
}

export function DashboardNav({
  mobileOpen,
  onMobileOpenChange,
}: {
  mobileOpen: boolean
  onMobileOpenChange: (open: boolean) => void
}) {
  return (
    <>
      <DashboardSidebar />
      <DashboardMobileNav open={mobileOpen} onOpenChange={onMobileOpenChange} />
    </>
  )
}

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === href
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}
