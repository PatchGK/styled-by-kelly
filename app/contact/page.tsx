import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const faqs = [
  {
    q: "What should I include in a project request?",
    a: "Share a quick overview of your space, your goals, timeline, and budget. Photos or links are welcome—anything that helps us understand your style.",
  },
  {
    q: "How soon will someone reach out?",
    a: "A member of the StyledByKelly team replies within two business days with next steps, including pairing you with the right designer or service partner.",
  },
  {
    q: "Do you work outside major cities?",
    a: "Yes! We offer virtual services nationwide and an expanding network of local partners. Let us know your location and we’ll explore options together.",
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/40">
          <div className="container max-w-3xl mx-auto text-center space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Get In Touch</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">
              Tell us about your dream space
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you’re picking a membership tier, planning a move, or booking event styling, we’re here to help.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container grid lg:grid-cols-2 gap-12">
            <Card className="p-8 space-y-6 border-border">
              <div className="space-y-2">
                <h2 className="font-serif text-2xl font-bold text-foreground">Send a message</h2>
                <p className="text-sm text-muted-foreground">
                  We’ll follow up within two business days with next steps.
                </p>
              </div>

              <form className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" placeholder="Alex Parker" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="City, State" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="details">Project details</Label>
                  <Textarea
                    id="details"
                    placeholder="Share your goals, timeline, budget, and any inspiration links."
                    rows={5}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Submit inquiry
                </Button>
              </form>
            </Card>

            <div className="space-y-10">
              <div className="space-y-3">
                <h2 className="font-serif text-2xl font-bold text-foreground">Prefer to chat?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Email us at <a href="mailto:hello@styledbykelly.com" className="text-primary underline">hello@styledbykelly.com</a>{" "}
                  or schedule a discovery call after submitting the form. Members can also message us directly inside
                  the dashboard.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="font-semibold text-foreground">Frequently asked</h3>
                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.q} className="space-y-1">
                      <p className="text-sm font-medium text-foreground">{faq.q}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

