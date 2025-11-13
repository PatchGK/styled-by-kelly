"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageIcon, PlusCircle } from "lucide-react"

export default function DesignBoardsPage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Design Boards</h2>
          <p className="text-muted-foreground">
            Collect inspiration, AI outputs, and curated marketplace picks into shareable moodboards.
          </p>
        </div>
        <Button className="w-full sm:w-auto">
          <PlusCircle className="h-4 w-4" />
          Create board
        </Button>
      </header>

      <Card className="items-center justify-center border-dashed py-12 text-center">
        <CardHeader className="items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <ImageIcon className="h-7 w-7 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl">Start a new moodboard</CardTitle>
          <CardDescription>
            Once you run AI tools or save items from the marketplace, you can pin them to boards here.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row">
          <Button>
            <PlusCircle className="h-4 w-4" />
            New board
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/ai-tools">Use AI tools</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/marketplace">Browse marketplace</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

