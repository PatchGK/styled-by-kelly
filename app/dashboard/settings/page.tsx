import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
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
                <Input id="name" defaultValue="Sarah Johnson" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="sarah@example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" defaultValue="San Francisco, CA" />
              </div>
            </div>

            <Button>Save Changes</Button>
          </Card>
        </TabsContent>

        <TabsContent value="subscription" className="space-y-6">
          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-foreground">Current Plan</h3>
                <Badge className="bg-primary">Plus</Badge>
              </div>
              <p className="text-sm text-muted-foreground">$39.99/month - Billed monthly</p>
            </div>

            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Next billing date</span>
                <span className="font-medium text-foreground">December 15, 2025</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Payment method</span>
                <span className="font-medium text-foreground">•••• 4242</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline">Change Plan</Button>
              <Button variant="outline">Update Payment</Button>
              <Button variant="ghost" className="text-destructive">
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
