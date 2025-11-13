"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { DashboardShell } from "./shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

const meta: Meta<typeof DashboardShell> = {
  title: "Dashboard/Shell",
  component: DashboardShell,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta

type Story = StoryObj<typeof DashboardShell>

export const OverviewState: Story = {
  render: () => (
    <DashboardShell>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
            <CardDescription>Preview of membership summary card.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-lg border px-4 py-3">
              <span className="text-sm font-medium">Plan</span>
              <span className="text-sm text-muted-foreground">Plus</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border px-4 py-3">
              <span className="text-sm font-medium">Renews</span>
              <span className="text-sm text-muted-foreground">Dec 12, 2025</span>
            </div>
            <Button className="mt-2 w-full justify-center">
              <Sparkles className="h-4 w-4" />
              Upgrade to Pro
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Project progress</CardTitle>
            <CardDescription>Placeholder cards help lock layout styles.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="h-20 rounded-lg border border-dashed border-border bg-muted/30" />
            <div className="h-20 rounded-lg border border-dashed border-border bg-muted/30" />
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  ),
}

