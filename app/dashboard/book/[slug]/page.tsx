import { notFound } from "next/navigation"
import { getServiceBySlug } from "@/lib/services"
import { Card } from "@/components/ui/card"
import { BookingForm } from "@/components/marketplace/booking-form"
import { formatDuration } from "@/lib/time"

type BookServicePageProps = {
  params: Promise<{ slug: string }>
}

export default async function BookServicePage({ params }: BookServicePageProps) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) {
    notFound()
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Book Service</p>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">{service.name}</h1>
        <p className="text-muted-foreground">
          {service.description} Typical duration: {formatDuration(service.duration_minutes)}.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Card className="p-6">
          <BookingForm service={service} />
        </Card>

        <Card className="p-6 space-y-4 self-start">
          <div>
            <h2 className="font-semibold text-foreground">Pricing guidance</h2>
            <p className="text-sm text-muted-foreground">Starts at {service.price_display}</p>
            <p className="text-xs text-muted-foreground">
              Final pricing is confirmed after your consultation. We’ll never charge without approval.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">Availability</h3>
            <p className="text-sm text-muted-foreground">
              Pick your preferred date and time; we’ll confirm with a designer or offer alternatives within 24 hours.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">Before you book</h3>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Have photos or inspiration ready to share.</li>
              <li>In-person services require a verified location inside our service area.</li>
              <li>Billing happens only after your booking is confirmed.</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  )
}

