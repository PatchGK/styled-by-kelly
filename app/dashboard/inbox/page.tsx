"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InboxIcon, RefreshCcw } from "lucide-react"

export default function InboxPage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Inbox</h2>
          <p className="text-muted-foreground">
            Keep up with designer messages, project updates, booking confirmations, and AI notifications.
          </p>
        </div>
        <Button variant="outline">
          <RefreshCcw className="h-4 w-4" />
          Refresh
        </Button>
      </header>

      <Card className="items-center justify-center gap-6 border-dashed py-14 text-center">
        <CardHeader className="items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <InboxIcon className="h-7 w-7 text-muted-foreground" />
          </div>
          <CardTitle>Your inbox is quiet</CardTitle>
          <CardDescription>
            When designers send updates or AI tools finish processing, the messages will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button>Start a new project</Button>
          <Button variant="outline">Invite your designer</Button>
        </CardContent>
      </Card>
    </div>
  )
}

