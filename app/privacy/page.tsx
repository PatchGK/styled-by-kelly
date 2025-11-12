import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const sections = [
  {
    title: "Information We Collect",
    content:
      "We gather account details, design preferences, uploaded media, and communication history to deliver personalized recommendations and facilitate local services.",
  },
  {
    title: "How We Use Your Data",
    content:
      "StyledByKelly uses your information to power AI recommendations, coordinate with designers and partners, process payments, and share lifestyle updates you opt into.",
  },
  {
    title: "Your Choices",
    content:
      "You can update your profile, download your data, adjust notification settings, or request deletion anytime by contacting hello@styledbykelly.com.",
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/40">
          <div className="container max-w-3xl mx-auto space-y-4">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Privacy Policy</h1>
            <p className="text-muted-foreground leading-relaxed">
              Last updated: November 2025. StyledByKelly respects your privacy and is committed to protecting your
              personal information.
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
                Questions about this policy? Reach out to{" "}
                <a href="mailto:privacy@styledbykelly.com" className="text-primary underline">
                  privacy@styledbykelly.com
                </a>
                .
              </p>
            </section>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

