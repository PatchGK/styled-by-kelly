import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

const tiers = [
  {
    name: "Starter",
    price: "$9.99",
    description: "Perfect for DIY enthusiasts who want design inspiration",
    features: [
      "AI-powered style quiz",
      "Monthly design inspiration boards",
      "Basic product recommendations",
      "Email newsletter access",
      "Community forum access",
      "Seasonal design guides",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Plus",
    price: "$39.99",
    description: "Great for homeowners ready to transform their space",
    features: [
      "Everything in Starter",
      "Personalized mood boards",
      "Curated product links with affiliate discounts",
      "Room-by-room design plans",
      "AI photo analysis",
      "Priority email support",
      "Member-only webinars",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Pro",
    price: "$99.99",
    description: "For serious design lovers who want expert guidance",
    features: [
      "Everything in Plus",
      "1:1 designer chat sessions",
      "Full room design plans",
      "Custom color consultations",
      "3D room visualizations",
      "Unlimited design revisions",
      "Shopping list generation",
      "Video consultations (2/month)",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Elite",
    price: "$249.99",
    description: "Complete concierge service with local add-ons",
    features: [
      "Everything in Pro",
      "Dedicated designer partnership",
      "Local staging services",
      "Event styling & setup",
      "In-home consultations",
      "White-glove shopping service",
      "Priority booking for add-ons",
      "Unlimited video calls",
      "Quarterly home refresh",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

const addOns = [
  {
    name: "Single Room Design",
    price: "$200 - $500",
    description: "Complete design plan for one room with shopping list",
  },
  {
    name: "Home Staging",
    price: "$1,000 - $3,500+",
    description: "Professional staging for real estate listings",
  },
  {
    name: "Event Setup",
    price: "$500 - $2,000",
    description: "Styling and decor for parties and special events",
  },
  {
    name: "Color Consultation",
    price: "$50 - $150",
    description: "Expert color palette for your entire home",
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground text-balance">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Choose a plan that fits your design journey. Start with a 14-day free trial.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tiers.map((tier) => (
              <Card
                key={tier.name}
                className={`relative p-8 flex flex-col ${
                  tier.popular ? "border-2 border-primary shadow-lg" : "border-border"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <div className="space-y-4 flex-1">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-foreground">{tier.name}</h3>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">{tier.description}</p>

                  <ul className="space-y-3 pt-4">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  className={`mt-8 w-full ${tier.popular ? "bg-primary hover:bg-primary/90" : ""}`}
                  variant={tier.popular ? "default" : "outline"}
                  asChild
                >
                  <Link href={tier.name === "Elite" ? "/contact" : "/signup"}>{tier.cta}</Link>
                </Button>
              </Card>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            All plans include a 14-day free trial. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Add-on services</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Need extra help? Book professional services as you need them.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {addOns.map((addon) => (
              <Card key={addon.name} className="p-6 border-border bg-background">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-xl font-bold text-foreground">{addon.name}</h3>
                    <span className="text-lg font-semibold text-primary whitespace-nowrap">{addon.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{addon.description}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-8 text-center">
              Frequently asked questions
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: "Can I switch plans anytime?",
                  a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle.",
                },
                {
                  q: "What if I need to cancel?",
                  a: "You can cancel anytime from your dashboard. You'll continue to have access until the end of your billing period.",
                },
                {
                  q: "Do you offer refunds?",
                  a: "We offer a 14-day free trial so you can try before you commit. After that, we provide prorated refunds within 30 days.",
                },
                {
                  q: "Are add-on services available everywhere?",
                  a: "Local services like staging and event setup depend on your area. Check availability during booking.",
                },
              ].map((faq, i) => (
                <Card key={i} className="p-6 border-border bg-card">
                  <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-balance">Still have questions?</h2>
            <p className="text-lg leading-relaxed opacity-90">
              Our team is here to help you find the perfect plan for your design journey.
            </p>
            <Button size="lg" asChild className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
