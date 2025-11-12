import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card } from "@/components/ui/card"

const pillars = [
  {
    title: "Accessible Expertise",
    description:
      "We blend AI insights with human designers so every member gets professional guidance that respects their budget, timeline, and lifestyle.",
  },
  {
    title: "Relationship, Not Transactions",
    description:
      "StyledByKelly is a long-term design companion. Subscriptions, seasonal refreshes, and local services keep your space evolving with you.",
  },
  {
    title: "Warm Lifestyle Brand",
    description:
      "From our inspiration library to our member events, everything is crafted to feel personal, cozy, and welcoming—never corporate.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/40">
          <div className="container max-w-4xl mx-auto space-y-6 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Our Story</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">
              Bringing professional interior design to everyday homes
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              StyledByKelly grew out of Kelly’s interior design studio and a belief that beautiful, functional homes
              should feel personal, warm, and achievable. We combine AI personalization, curated product sourcing, and
              local experts so you can love every room you live in.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container grid md:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <Card key={pillar.title} className="p-6 space-y-3 bg-background border-border">
                <h2 className="font-serif text-2xl font-bold text-foreground">{pillar.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-16 md:py-24 bg-card">
          <div className="container grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
                The StyledByKelly experience
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                {[
                  "Monthly inspiration boards tailored to your style profile",
                  "Personalized project roadmaps with optional designer reviews",
                  "Marketplace of trusted partners for staging, events, and in-home services",
                  "Seasonal lifestyle guides, workshops, and member-only events",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl overflow-hidden bg-muted aspect-[4/5]">
              <img
                src="/placeholder.svg?key=kelly-team"
                alt="The StyledByKelly team collaborating on mood boards"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

