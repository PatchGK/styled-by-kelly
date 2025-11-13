import type { ComponentType } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Home, Palette, Calendar, Sparkles, Clock, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getServices } from "@/lib/services"
import type { Service } from "@/types/service"

const categoryMeta: Record<string, { label: string; icon: ComponentType<{ className?: string }> }> = {
  design: { label: "Design", icon: Palette },
  staging: { label: "Staging", icon: Home },
  events: { label: "Events", icon: Calendar },
  consultation: { label: "Consultation", icon: Sparkles },
  implementation: { label: "Implementation", icon: Sparkles },
}

function getCategories(services: Service[]) {
  const unique = new Map<string, { label: string; icon: ComponentType<{ className?: string }> }>()
  for (const service of services) {
    if (!service.category) continue
    const meta = categoryMeta[service.category] ?? {
      label: service.category.replace(/^\w/, (c) => c.toUpperCase()),
      icon: Sparkles,
    }
    unique.set(service.category, meta)
  }
  return [{ value: "all", label: "All Services", icon: Sparkles }, ...Array.from(unique.entries()).map(([value, meta]) => ({ value, label: meta.label, icon: meta.icon })) ]
}

export default async function MarketplacePage() {
  const services = await getServices()
  const categories = getCategories(services)

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Services Marketplace</h1>
        <p className="text-muted-foreground">Book professional design services to bring your vision to life</p>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <TabsTrigger key={category.value} value={category.value} className="gap-2 py-2">
                <Icon className="h-4 w-4" />
                {category.label}
              </TabsTrigger>
            )
          })}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.value} value={category.value} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {services
                .filter((service) => category.value === "all" || service.category === category.value)
                .map((service) => (
                  <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-[16/10] bg-muted relative">
                      <Image
                        src={service.hero_image || "/placeholder.svg"}
                        alt={service.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                      />
                      <Badge className="absolute top-4 right-4 bg-background/90 text-foreground border-border">
                        {service.price_display}
                      </Badge>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-serif text-xl font-bold text-foreground">{service.name}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="font-medium text-foreground">{service.rating?.toFixed(1) ?? "5.0"}</span>
                          <span>({service.reviews_count ?? 0})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatDuration(service.duration_minutes)}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">What&apos;s included:</p>
                        <ul className="grid grid-cols-2 gap-2">
                          {(service.features ?? []).map((feature, index) => (
                            <li key={`${service.id}-${index}`} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                              <span className="text-primary mt-0.5">✓</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Link
                        href={`/dashboard/marketplace/${service.slug}`}
                        className="inline-flex w-full items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium transition hover:bg-primary/90"
                      >
                        Book Service
                      </Link>
                    </div>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* CTA for custom services */}
      <Card className="p-8 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
        <div className="max-w-2xl space-y-4">
          <h2 className="font-serif text-2xl font-bold text-foreground">Need something custom?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Can&apos;t find exactly what you&apos;re looking for? Our team can create a custom service package tailored to your
            specific needs.
          </p>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </Card>
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
