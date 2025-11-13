"use client"

import { useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Heart, ShoppingBag, Calendar, ArrowRight, BellDot, Palette } from "lucide-react"
import Link from "next/link"
import { useSupabase } from "@/components/providers/supabase-provider"
import { useProfile } from "@/hooks/use-profile"

export default function DashboardPage() {
  const { session } = useSupabase()
  const { profile, loading } = useProfile()
  const [portalLoading, setPortalLoading] = useState(false)
  const derivedName = `${profile?.first_name ?? ""} ${profile?.last_name ?? ""}`.trim()
  const displayName =
    profile?.full_name ??
    (derivedName !== "" ? derivedName : session?.user.email?.split("@")[0]) ??
    "there"
  const membershipPlan = profile?.membership_plan ?? "Plus"
  const nextBilling = profile?.next_billing_date ?? "December 15, 2025"
  const memberSince = profile?.member_since_months ?? "3"
  const subscriptionStatus = profile?.subscription_status ?? "inactive"
  const designBoards = [
    { title: "Modern Farmhouse Living", updated: "2 days ago", mood: "Warm neutrals", image: "/.jpg?height=320&width=480&query=modern%20living%20room" },
    { title: "Dream Office Nook", updated: "5 days ago", mood: "Soft minimal", image: "/.jpg?height=320&width=480&query=minimal%20office" },
    { title: "Coastal Kitchen Refresh", updated: "1 week ago", mood: "Sky & sand palette", image: "/.jpg?height=320&width=480&query=coastal%20kitchen" },
  ]
  const savedItems = [
    { name: "Oak Tambour Credenza", price: "$1,250", image: "/.jpg?height=240&width=240&query=oak%20credenza" },
    { name: "Textured Bouclé Accent Chair", price: "$540", image: "/.jpg?height=240&width=240&query=boucle%20accent%20chair" },
    { name: "Linear Brass Pendant", price: "$320", image: "/.jpg?height=240&width=240&query=brass%20pendant%20light" },
    { name: "Handwoven Wool Rug", price: "$860", image: "/.jpg?height=240&width=240&query=neutral%20wool%20rug" },
  ]
  const notifications = [
    { title: "Designer update", body: "Kelly added a new layout revision to Living Room Refresh.", time: "1 hour ago" },
    { title: "AI tools", body: "Your Color Matcher palette is ready to review.", time: "Yesterday" },
    { title: "Marketplace", body: "Booking request received for Single Room Design.", time: "2 days ago" },
  ]

  const handleBillingPortal = async () => {
    setPortalLoading(true)
    const response = await fetch("/api/stripe/create-portal-session", { method: "POST" })
    setPortalLoading(false)
    if (!response.ok) {
      const { error } = (await response.json()) as { error?: string }
      toast.error(error ?? "Unable to open billing portal.")
      return
    }
    const data = (await response.json()) as { url?: string }
    if (data.url) {
      window.location.href = data.url
    } else {
      toast.error("Billing portal URL not available.")
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Welcome back, {displayName}</h1>
        <p className="text-muted-foreground">
          {loading ? "Fetching your latest updates..." : "Here&apos;s what&apos;s happening with your design journey"}
        </p>
      </div>

      {/* Current Plan */}
      <Card className="p-6 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Current Plan</span>
              <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                {membershipPlan}
              </span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-foreground">{membershipPlan} Subscription</h2>
            <p className="text-sm text-muted-foreground">Next billing date: {nextBilling}</p>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Status: <span className="text-foreground">{subscriptionStatus}</span>
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleBillingPortal} disabled={portalLoading}>
              {portalLoading ? "Opening..." : "Manage Plan"}
            </Button>
            <Button asChild>
              <Link href="/pricing">Upgrade</Link>
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Active Projects</span>
            <Heart className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-foreground">3</p>
            <p className="text-xs text-muted-foreground">2 in progress</p>
          </div>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Design Boards</span>
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-foreground">12</p>
            <p className="text-xs text-muted-foreground">5 this month</p>
          </div>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Items Saved</span>
            <ShoppingBag className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-foreground">47</p>
            <p className="text-xs text-muted-foreground">Ready to shop</p>
          </div>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Member Since</span>
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-foreground">3</p>
            <p className="text-xs text-muted-foreground">{memberSince} months</p>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      {/* Design Boards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-2xl font-bold text-foreground">Design Boards</h2>
          <Button variant="ghost" asChild>
            <Link href="/dashboard/projects">
              Manage Boards <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {designBoards.map((board) => (
            <Card key={board.title} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] bg-muted relative">
                <Image
                  src={board.image}
                  alt={board.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                />
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary">
                  <Palette className="h-4 w-4" />
                  {board.mood}
                </div>
                <h3 className="font-semibold text-foreground">{board.title}</h3>
                <p className="text-xs text-muted-foreground">Updated {board.updated}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-6 hover:shadow-lg transition-shadow group cursor-pointer">
            <Link href="/dashboard/ai-tools" className="space-y-3">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Start AI Design</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Upload a room photo and get instant design recommendations
              </p>
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow group cursor-pointer">
            <Link href="/dashboard/projects" className="space-y-3">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">View Projects</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                See all your saved designs and mood boards
              </p>
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow group cursor-pointer">
            <Link href="/dashboard/marketplace" className="space-y-3">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Browse Services</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Book staging, consultations, and more</p>
            </Link>
          </Card>
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-2xl font-bold text-foreground">Recent Projects</h2>
          <Button variant="ghost" asChild>
            <Link href="/dashboard/projects">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Living Room Refresh", progress: 75, status: "In Progress" },
            { name: "Master Bedroom", progress: 100, status: "Completed" },
            { name: "Home Office", progress: 30, status: "In Progress" },
          ].map((project, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-[4/3] bg-muted relative">
                <Image
                  src={`/.jpg?height=300&width=400&query=${encodeURIComponent(project.name)}`}
                  alt={project.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                />
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">{project.status}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Inspiration Feed */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-2xl font-bold text-foreground">This Month&apos;s Inspiration</h2>
          <Button variant="ghost" asChild>
            <Link href="/inspiration">
              See More <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {["Cozy Fall Vibes", "Minimalist Kitchen", "Boho Bedroom", "Modern Farmhouse"].map((theme, i) => (
            <Card key={i} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-muted relative">
                <Image
                  src={`/.jpg?height=400&width=400&query=${encodeURIComponent(theme)}`}
                  alt={theme}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                  unoptimized
                />
              </div>
              <div className="p-3">
                <p className="font-medium text-foreground text-sm">{theme}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Saved Items */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-2xl font-bold text-foreground">Saved Items</h2>
          <Button variant="ghost" asChild>
            <Link href="/dashboard/projects">
              View Moodboards <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {savedItems.map((item) => (
            <Card key={item.name} className="overflow-hidden border-border bg-background/80">
              <div className="aspect-square bg-muted relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                  unoptimized
                />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-medium text-foreground text-sm">{item.name}</h3>
                <p className="text-xs text-muted-foreground">{item.price}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Inbox & Notifications */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Inbox & Notifications</h2>
        <Card className="p-6 space-y-4">
          {notifications.map((note, index) => (
            <div key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
              <BellDot className="h-4 w-4 text-primary mt-1" />
              <div className="space-y-1">
                <p className="font-medium text-foreground">{note.title}</p>
                <p>{note.body}</p>
                <p className="text-xs text-muted-foreground/80">{note.time}</p>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}
