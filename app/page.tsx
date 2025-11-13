import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Sparkles, Home, Palette } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-background to-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground text-balance leading-tight">
              Your home, designed for who you really are
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Professional interior design made personal, warm, and accessible. Subscribe for ongoing inspiration,
              personalized room plans, and local design services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-lg h-12 px-8">
                <Link href="/pricing">
                  Start Your Membership <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg h-12 px-8 bg-transparent">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden">
            <img
              src="/boho-living-room.jpg"
              alt="Modern living room styled with earthy tones"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-card">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Design that evolves with you
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Not just a one-time project. A continuous relationship with design inspiration and guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 space-y-4 border-border bg-background hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground">AI-Powered Tools</h3>
              <p className="text-muted-foreground leading-relaxed">
                Take our style quiz, upload room photos, and get personalized design recommendations tailored to your
                taste.
              </p>
            </Card>

            <Card className="p-8 space-y-4 border-border bg-background hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Palette className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground">Designer Curation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Work with real designers who understand your vision and create beautiful, livable spaces within your
                budget.
              </p>
            </Card>

            <Card className="p-8 space-y-4 border-border bg-background hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground">Local Services</h3>
              <p className="text-muted-foreground leading-relaxed">
                Need help with staging, event setup, or hands-on design? Book local services right from your dashboard.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Collaboration Spotlight */}
      <section className="py-20 md:py-32">
        <div className="container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Real designers, real partnership
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">
              Collaborative design that keeps you inspired
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              StyledByKelly blends AI insights with a welcoming team of designers who co-create every plan. From weekly
              feedback sessions to curated product picks, you always have a human touch to guide your next move.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 text-left">
              <div className="rounded-lg border border-border p-6 bg-background/60">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">Human + AI workflows</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Designers build on AI-generated boards to translate your style quiz into layered, livable concepts.
                </p>
              </div>
              <div className="rounded-lg border border-border p-6 bg-background/60">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">Warm, ongoing dialogue</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Stay in touch with your stylist for refreshes, seasonal tweaks, and local service recommendations.
                </p>
              </div>
            </div>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-border">
            <img
              src="/collaboration-vertical.jpg"
              alt="StyledByKelly designers collaborating on a client project"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              How it works
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Get started in minutes and transform your space.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Choose Your Plan",
                desc: "Select a subscription tier that fits your needs and budget.",
              },
              {
                step: "02",
                title: "Take Style Quiz",
                desc: "Tell us about your style preferences and room requirements.",
              },
              {
                step: "03",
                title: "Get Personalized Designs",
                desc: "Receive custom mood boards and product recommendations.",
              },
              {
                step: "04",
                title: "Bring It to Life",
                desc: "Shop curated items or book local services to complete your space.",
              },
            ].map((item, i) => (
              <div key={i} className="space-y-4">
                <div className="text-5xl font-serif font-bold text-primary/20">{item.step}</div>
                <h3 className="font-serif text-xl font-bold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-balance">Ready to transform your space?</h2>
            <p className="text-xl leading-relaxed opacity-90">
              Join the StyledByKelly community building warm, personalized homes with ongoing support.
            </p>
            <Button
              size="lg"
              asChild
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg h-12 px-8"
            >
              <Link href="/pricing">
                Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
