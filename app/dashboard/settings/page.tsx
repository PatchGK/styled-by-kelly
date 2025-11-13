"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useSupabase } from "@/components/providers/supabase-provider"
import { useProfile } from "@/hooks/use-profile"

type AccountFormState = {
  fullName: string
  email: string
  phone: string
  location: string
}

export default function SettingsPage() {
  const { session, supabase } = useSupabase()
  const { profile, refresh, loading } = useProfile()
  const [accountForm, setAccountForm] = useState<AccountFormState>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
  })
  const [saving, setSaving] = useState(false)
  const [portalLoading, setPortalLoading] = useState(false)

  useEffect(() => {
    if (!profile) return
    const fallbackEmail = session?.user.email ?? ""
    const metadataName = `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim()
    const fallbackName = fallbackEmail.split("@")[0] ?? ""

    setAccountForm({
      fullName: profile.full_name ?? (metadataName !== "" ? metadataName : fallbackName),
      email: fallbackEmail,
      phone: profile.phone ?? "",
      location: profile.location ?? "",
    })
  }, [profile, session?.user.email])

  const membershipPlan = profile?.membership_plan ?? "Plus"
  const planPrice = profile?.plan_price ?? "$39.99/month - Billed monthly"
  const nextBillingDate = profile?.next_billing_date ?? "December 15, 2025"
  const paymentMethodLast4 = profile?.payment_last4 ? `•••• ${profile.payment_last4}` : "•••• 4242"
  const subscriptionStatus = profile?.subscription_status ?? "inactive"

  const openBillingPortal = async () => {
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
      <div className="space-y-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account and subscription preferences</p>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Profile Information</h3>
              <p className="text-sm text-muted-foreground">Update your personal information and preferences</p>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={accountForm.fullName}
                  disabled={loading}
                  onChange={(event) =>
                    setAccountForm((prev) => ({
                      ...prev,
                      fullName: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={accountForm.email}
                  disabled
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={accountForm.phone}
                  disabled={loading}
                  onChange={(event) =>
                    setAccountForm((prev) => ({
                      ...prev,
                      phone: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="City, State"
                  value={accountForm.location}
                  disabled={loading}
                  onChange={(event) =>
                    setAccountForm((prev) => ({
                      ...prev,
                      location: event.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <Button
              disabled={saving || loading || !session}
              onClick={() => {
                if (!session) return
                setSaving(true)
                const savePromise = (async () => {
                  const { error } = await supabase.from("profiles").upsert({
                    id: session.user.id,
                    full_name: accountForm.fullName || null,
                    phone: accountForm.phone || null,
                    location: accountForm.location || null,
                  })
                  if (error) throw error
                  await refresh()
                })()

                toast.promise(savePromise, {
                  loading: "Saving your changes...",
                  success: "Profile updated",
                  error: "Unable to save changes. Please try again.",
                })

                savePromise.finally(() => setSaving(false))
              }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="subscription" className="space-y-6">
          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-foreground">Current Plan</h3>
                <Badge className="bg-primary">{membershipPlan}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{planPrice}</p>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Status: <span className="text-foreground">{subscriptionStatus}</span>
              </p>
            </div>

            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Next billing date</span>
                <span className="font-medium text-foreground">{nextBillingDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Payment method</span>
                <span className="font-medium text-foreground">{paymentMethodLast4}</span>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <Button variant="outline" onClick={openBillingPortal} disabled={portalLoading}>
                {portalLoading ? "Opening..." : "Manage Billing"}
              </Button>
              <Button variant="ghost" className="text-destructive" onClick={openBillingPortal} disabled={portalLoading}>
                Cancel Subscription
              </Button>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="font-semibold text-foreground">Billing History</h3>
            <div className="space-y-3">
              {[
                { date: "Nov 15, 2025", amount: "$39.99", status: "Paid" },
                { date: "Oct 15, 2025", amount: "$39.99", status: "Paid" },
                { date: "Sep 15, 2025", amount: "$39.99", status: "Paid" },
              ].map((invoice, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-foreground">{invoice.date}</p>
                    <p className="text-sm text-muted-foreground">{invoice.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">{invoice.amount}</p>
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Email Notifications</h3>
              <p className="text-sm text-muted-foreground">Choose what updates you want to receive</p>
            </div>

            <div className="space-y-4">
              {[
                { id: "newsletter", label: "Monthly Newsletter", description: "Design tips, trends, and inspiration" },
                { id: "projects", label: "Project Updates", description: "Notifications about your active projects" },
                {
                  id: "services",
                  label: "Service Bookings",
                  description: "Confirmations and reminders for booked services",
                },
                { id: "marketing", label: "Marketing Emails", description: "Promotional offers and new features" },
              ].map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{notification.label}</p>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>

            <Button>Save Preferences</Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
