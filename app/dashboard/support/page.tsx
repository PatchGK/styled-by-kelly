"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, LifeBuoy, MessageCircleQuestion } from "lucide-react"

const knowledgeBaseLinks = [
  { title: "Getting started checklist", href: "/docs/getting-started" },
  { title: "How to prep your room photos", href: "/docs/photo-guide" },
  { title: "Managing project revisions", href: "/docs/revisions" },
  { title: "Understanding subscription tiers", href: "/docs/subscriptions" },
]

export default function SupportPage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Help &amp; Support</h2>
          <p className="text-muted-foreground">
            Browse the knowledge base, reach out for concierge help, or open a ticket with our team.
          </p>
        </div>
        <Button asChild>
          <Link href="mailto:support@styledbykelly.com">
            <LifeBuoy className="h-4 w-4" />
            Contact concierge
          </Link>
        </Button>
      </header>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card className="border-dashed">
          <CardHeader className="gap-2">
            <CardTitle>Knowledge base</CardTitle>
            <CardDescription>Curated guidance for making the most of StyledByKelly.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {knowledgeBaseLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between rounded-lg border border-transparent px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-border hover:bg-muted"
              >
                {link.title}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            ))}
            <Button variant="outline" className="w-full justify-center" asChild>
              <Link href="/docs">Browse all articles</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-dashed">
          <CardHeader className="gap-2">
            <CardTitle>Need extra help?</CardTitle>
            <CardDescription>Open a support ticket and our team will get back within 1 business day.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-center" variant="secondary">
              <MessageCircleQuestion className="h-4 w-4" />
              Submit a ticket
            </Button>
            <p className="text-xs text-muted-foreground">
              For urgent booking issues call <span className="font-medium text-foreground">(555) 123-4567</span>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

