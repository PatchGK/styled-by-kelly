"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, CalendarRange } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Analytics &amp; Insights</h2>
          <p className="text-muted-foreground">
            Track project momentum, palette trends, and product engagement to inform your next design move.
          </p>
        </div>
        <Button variant="outline">
          <CalendarRange className="h-4 w-4" />
          Last 30 days
        </Button>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-dashed">
          <CardHeader className="items-start gap-2">
            <CardTitle>Project velocity</CardTitle>
            <CardDescription>Average time from concept to final approval.</CardDescription>
          </CardHeader>
          <CardContent>
            <PlaceholderChart />
          </CardContent>
        </Card>
        <Card className="border-dashed">
          <CardHeader className="items-start gap-2">
            <CardTitle>Palette favorites</CardTitle>
            <CardDescription>Top color stories from recent AI results.</CardDescription>
          </CardHeader>
          <CardContent>
            <PlaceholderChart />
          </CardContent>
        </Card>
        <Card className="border-dashed lg:col-span-2">
          <CardHeader className="items-start gap-2">
            <CardTitle>Marketplace performance</CardTitle>
            <CardDescription>Track saved items, add-to-cart events, and purchases.</CardDescription>
          </CardHeader>
          <CardContent>
            <PlaceholderChart />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function PlaceholderChart() {
  return (
    <div className="flex h-48 flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border bg-muted/40 text-center text-muted-foreground">
      <BarChart3 className="h-8 w-8 opacity-70" />
      <span className="text-sm">Analytics visualizations coming soon.</span>
    </div>
  )
}

