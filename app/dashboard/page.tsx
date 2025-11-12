import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Heart, ShoppingBag, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Welcome back, Sarah</h1>
        <p className="text-muted-foreground">Here's what's happening with your design journey</p>
      </div>

      {/* Current Plan */}
      <Card className="p-6 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Current Plan</span>
              <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                Plus
              </span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-foreground">Plus Subscription</h2>
            <p className="text-sm text-muted-foreground">Next billing date: December 15, 2025</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/dashboard/settings">Manage Plan</Link>
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
            <p className="text-xs text-muted-foreground">months</p>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
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
                <img
                  src={`/.jpg?height=300&width=400&query=${encodeURIComponent(project.name)}`}
                  alt={project.name}
                  className="object-cover w-full h-full"
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
          <h2 className="font-serif text-2xl font-bold text-foreground">This Month's Inspiration</h2>
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
                <img
                  src={`/.jpg?height=400&width=400&query=${encodeURIComponent(theme)}`}
                  alt={theme}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3">
                <p className="font-medium text-foreground text-sm">{theme}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
