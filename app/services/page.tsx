import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const services = [
  {
    name: "Digital Design Subscriptions",
    description:
      "Monthly inspiration boards, personalized design prompts, and AI-generated room plans delivered straight to your dashboard.",
    items: ["Starter", "Plus", "Pro", "Elite tiers"],
  },
  {
    name: "Add-On Services",
    description:
      "Book hands-on support whenever you need staging, event styling, or a whole-home refresh, with transparent pricing.",
    items: ["Home staging", "Event styling", "Single-room design packages"],
  },
  {
    name: "Local Partnerships",
    description:
      "We collaborate with trusted local stylists and service pros who share our cozy, modern aesthetic and service standards.",
    items: ["In-home consultations", "Installation oversight", "White-glove sourcing"],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/40">
          <div className="container max-w-4xl mx-auto text-center space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Services</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">
              Personal design support, on your terms
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every StyledByKelly membership unlocks digital tools and curated expertise. Layer on local services and
              concierge support whenever you want an extra set of hands.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container grid lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.name} className="p-6 space-y-4 border-border bg-background">
                <div className="space-y-2">
                  <h2 className="font-serif text-2xl font-bold text-foreground">{service.name}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-16 md:py-24 bg-card">
          <div className="container max-w-3xl mx-auto text-center space-y-6">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              Ready for hands-on help?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Tell us about your project and we’ll match you with the right designer or local partner from our trusted
              network.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Submit a project request</Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link href="/pricing">Explore membership tiers</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

