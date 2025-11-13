import { notFound } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Star, MapPin, Sparkles } from "lucide-react"
import Link from "next/link"
import { getServiceBySlug } from "@/lib/services"

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="space-y-3">
            <Badge variant="outline" className="uppercase tracking-wide text-xs">
              {service.category ?? "Concierge"}
            </Badge>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">{service.name}</h1>
            <p className="text-muted-foreground leading-relaxed">{service.description}</p>
          </div>

          <div className="rounded-xl border border-border bg-card/70 p-6 space-y-4">
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-medium text-foreground">{service.rating?.toFixed(1) ?? "5.0"}</span>
                <span>({service.reviews_count ?? 0} reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{formatDuration(service.duration_minutes)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="capitalize">{service.fulfillment_type ?? "hybrid"}</span>
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-foreground">What’s Included</h2>
              <ul className="grid sm:grid-cols-2 gap-3 pt-3">
                {(service.features ?? []).map((feature, index) => (
                  <li key={`${service.id}-feature-${index}`} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Card className="p-6 space-y-4 self-start">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Starting at</p>
            <p className="text-3xl font-serif font-bold text-foreground">{service.price_display}</p>
            <p className="text-xs text-muted-foreground">
              Exact pricing is confirmed after a member consultation. Cancel any booking within 24 hours.
            </p>
          </div>
          <Link
            href={`/dashboard/book/${service.slug}`}
            className="inline-flex w-full items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium transition hover:bg-primary/90"
          >
            Start Booking
          </Link>
          <Link
            href="/pricing"
            className="inline-flex w-full items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted/60"
          >
            View Membership Plans
          </Link>
        </Card>
      </div>

      <div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
        <p>
          Need a custom package? Email <a href="mailto:concierge@styledbykelly.com" className="text-primary underline">concierge@styledbykelly.com</a>{" "}
          with your project goals and location. We’ll match you with the right designer and availability.
        </p>
      </div>
    </div>
  )
}

function formatDuration(durationMinutes: number | null) {
  if (!durationMinutes || durationMinutes <= 0) return "Varies"
  if (durationMinutes < 60) return `${durationMinutes} min`
  const hours = durationMinutes / 60
  if (Number.isInteger(hours)) {
    return `${hours} hour${hours > 1 ? "s" : ""}`
  }
  return `${hours.toFixed(1)} hours`
}

