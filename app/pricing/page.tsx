import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"
import { CheckoutButton } from "@/components/pricing/checkout-button"

const tierPriceIds = {
  Starter: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER ?? null,
  Plus: process.env.NEXT_PUBLIC_STRIPE_PRICE_PLUS ?? null,
  Pro: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO ?? null,
  Elite: process.env.NEXT_PUBLIC_STRIPE_PRICE_ELITE ?? null,
}

const servicePriceIds = {
  "Single Room Design": process.env.NEXT_PUBLIC_STRIPE_PRICE_SINGLE_ROOM_DESIGN ?? null,
  "Home Staging": process.env.NEXT_PUBLIC_STRIPE_PRICE_HOME_STAGING ?? null,
  "Event Setup": process.env.NEXT_PUBLIC_STRIPE_PRICE_EVENT_SETUP ?? null,
  "Color Consultation": process.env.NEXT_PUBLIC_STRIPE_PRICE_COLOR_CONSULTATION ?? null,
  "In-Home Consultation": process.env.NEXT_PUBLIC_STRIPE_PRICE_IN_HOME_CONSULTATION ?? null,
  "Installation Oversight": process.env.NEXT_PUBLIC_STRIPE_PRICE_INSTALLATION_OVERSIGHT ?? null,
  "White-Glove Sourcing": process.env.NEXT_PUBLIC_STRIPE_PRICE_WHITE_GLOVE_SOURCING ?? null,
}

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
    priceId: tierPriceIds.Starter,
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
    priceId: tierPriceIds.Plus,
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
    priceId: tierPriceIds.Pro,
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
    priceId: tierPriceIds.Elite,
  },
]

const services = [
  {
    name: "Single Room Design",
    price: "$650",
    description: "Full room design with custom layout, concept board, and curated shopping list.",
    priceId: servicePriceIds["Single Room Design"],
  },
  {
    name: "Home Staging",
    price: "$6,000",
    description: "Whole-home staging for listings (up to ~2,000 sq ft) styled to sell quickly.",
    priceId: servicePriceIds["Home Staging"],
  },
  {
    name: "Event Setup",
    price: "$2,400",
    description: "Décor, layout, and on-site styling to host gatherings without the stress.",
    priceId: servicePriceIds["Event Setup"],
  },
  {
    name: "Color Consultation",
    price: "$250",
    description: "Virtual or in-person palette planning with follow-up swatches and notes.",
    priceId: servicePriceIds["Color Consultation"],
  },
  {
    name: "In-Home Consultation",
    price: "$200 / hour",
    description: "Hands-on walkthrough credited toward your project when you move forward.",
    priceId: servicePriceIds["In-Home Consultation"],
  },
  {
    name: "Installation Oversight",
    price: "$1,500",
    description: "Project management during deliveries and setup to get every detail right.",
    priceId: servicePriceIds["Installation Oversight"],
  },
  {
    name: "White-Glove Sourcing",
    price: "$3,000",
    description: "Premium vendor search and quality-checked sourcing for elevated pieces.",
    priceId: servicePriceIds["White-Glove Sourcing"],
  },
]

export default function PricingPage() {
  const featuredService = services.find((service) => service.name === "Home Staging")
  const secondaryServices = services.filter((service) => service.name !== "Home Staging")

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
            <p className="text-sm text-muted-foreground">
              Concierge services are exclusively available to active members—subscribe, sign in, and book directly
              from your dashboard.
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

                {tier.priceId ? (
                  <CheckoutButton
                    className="mt-8 w-full"
                    variant={tier.popular ? "default" : "outline"}
                    priceId={tier.priceId}
                    signupFallback={`/signup?plan=${tier.name.toLowerCase()}`}
                  >
                    {tier.cta}
                  </CheckoutButton>
                ) : (
                  <Button asChild className="mt-8 w-full">
                    <Link href="/contact">{tier.cta}</Link>
                  </Button>
                )}
              </Card>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            All plans include a 14-day free trial. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Member-only services</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Layer on concierge support once you subscribe. From staging to sourcing, our team can take care of the
              heavy lifting.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {featuredService && (
              <Card className="relative mx-auto max-w-3xl p-8 md:p-10 border-primary/40 bg-primary/5 shadow-xl space-y-6 text-left rounded-2xl">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary text-primary-foreground px-5 py-1 text-sm font-semibold shadow">
                  Concierge Favorite
                </span>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="space-y-3">
                    <h3 className="font-serif text-3xl font-bold text-foreground">{featuredService.name}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">{featuredService.description}</p>
                  </div>
                  <div className="text-right md:text-left">
                    <span className="text-2xl font-semibold text-primary block">{featuredService.price}</span>
                    <p className="text-xs text-muted-foreground mt-1">Full-service staging with concierge support.</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-muted-foreground max-w-sm">
                    Available to active members. Our team coordinates inventory, logistics, and on-site styling end-to-end.
                  </p>
                  <CheckoutButton
                    priceId={featuredService.priceId}
                    mode="payment"
                    size="lg"
                    className="w-full md:w-auto"
                    loginFallback="/login?redirect_to=/dashboard/marketplace"
                  >
                    Book Home Staging
                  </CheckoutButton>
                </div>
              </Card>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              {secondaryServices.map((service) => (
                <Card key={service.name} className="p-6 border-border bg-background space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-serif text-xl font-bold text-foreground">{service.name}</h3>
                      <span className="text-lg font-semibold text-primary whitespace-nowrap">{service.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <p className="text-xs text-muted-foreground">Members book from the dashboard marketplace.</p>
                    <CheckoutButton
                      priceId={service.priceId}
                      mode="payment"
                      size="sm"
                      loginFallback="/login?redirect_to=/dashboard/marketplace"
                    >
                      Book Service
                    </CheckoutButton>
                  </div>
                </Card>
              ))}
            </div>
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
