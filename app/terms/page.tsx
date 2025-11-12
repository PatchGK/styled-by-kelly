import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const sections = [
  {
    title: "Membership",
    content:
      "StyledByKelly subscriptions renew monthly until canceled. Plan upgrades take effect immediately; downgrades apply at the next billing cycle.",
  },
  {
    title: "Design Services",
    content:
      "Add-on services are delivered by StyledByKelly or vetted partners. We coordinate timelines, but on-site work may require separate agreements and compliance with local regulations.",
  },
  {
    title: "Use of AI Tools",
    content:
      "AI-generated recommendations are suggestions. You’re responsible for verifying dimensions, safety, and feasibility before purchasing or installing products.",
  },
  {
    title: "Content & Community",
    content:
      "Members can upload photos, inspiration, and feedback. You retain ownership but grant StyledByKelly a license to display content within the platform.",
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/40">
          <div className="container max-w-3xl mx-auto space-y-4">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Terms of Service</h1>
            <p className="text-muted-foreground leading-relaxed">
              Last updated: November 2025. By using StyledByKelly you agree to the commitments outlined below.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container max-w-3xl mx-auto space-y-8 text-sm leading-relaxed text-muted-foreground">
            {sections.map((section) => (
              <section key={section.title} className="space-y-2">
                <h2 className="font-serif text-2xl font-bold text-foreground">{section.title}</h2>
                <p>{section.content}</p>
              </section>
            ))}
            <section className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-foreground">Contact</h2>
              <p>
                Need clarification? Email{" "}
                <a href="mailto:legal@styledbykelly.com" className="text-primary underline">
                  legal@styledbykelly.com
                </a>{" "}
                and we’ll be happy to help.
              </p>
            </section>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

