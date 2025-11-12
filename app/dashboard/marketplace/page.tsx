import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Home, Palette, Calendar, Sparkles, Clock, Star } from "lucide-react"
import Link from "next/link"

const services = [
  {
    id: 1,
    name: "Single Room Design",
    category: "design",
    price: "$200 - $500",
    duration: "1-2 weeks",
    rating: 4.9,
    reviews: 127,
    description: "Complete design plan for one room including mood board, shopping list, and layout suggestions.",
    features: ["Custom mood board", "Shopping list with links", "Floor plan layout", "Color palette guide"],
    image: "/placeholder.svg?key=ikjxn",
  },
  {
    id: 2,
    name: "Home Staging",
    category: "staging",
    price: "$1,000 - $3,500",
    duration: "3-5 days",
    rating: 5.0,
    reviews: 89,
    description: "Professional staging for real estate listings to help your home sell faster and for more money.",
    features: ["Furniture rental", "Professional styling", "Photography coordination", "Quick turnaround"],
    image: "/placeholder.svg?key=kfx2e",
  },
  {
    id: 3,
    name: "Event Styling",
    category: "events",
    price: "$500 - $2,000",
    duration: "1-2 days",
    rating: 4.8,
    reviews: 64,
    description: "Transform your space for parties, celebrations, and special events with professional styling.",
    features: ["Theme consultation", "Decor setup", "On-site coordination", "Breakdown service"],
    image: "/placeholder.svg?key=2sfxu",
  },
  {
    id: 4,
    name: "Color Consultation",
    category: "consultation",
    price: "$50 - $150",
    duration: "1 hour",
    rating: 4.9,
    reviews: 201,
    description: "Expert guidance on choosing the perfect color palette for your entire home.",
    features: ["Video consultation", "Custom palette", "Paint recommendations", "Follow-up support"],
    image: "/placeholder.svg?key=u99q1",
  },
  {
    id: 5,
    name: "Full Home Makeover",
    category: "design",
    price: "$2,500 - $8,000",
    duration: "4-8 weeks",
    rating: 5.0,
    reviews: 42,
    description: "Comprehensive design service for multiple rooms with ongoing support and implementation.",
    features: ["Multi-room plans", "Shopping service", "Installation coordination", "Dedicated designer"],
    image: "/placeholder.svg?key=fxgma",
  },
  {
    id: 6,
    name: "Virtual Design Session",
    category: "consultation",
    price: "$75 - $200",
    duration: "45-60 min",
    rating: 4.7,
    reviews: 156,
    description: "One-on-one video consultation with a professional designer to tackle your design challenges.",
    features: ["Live video call", "Screen sharing", "Personalized advice", "Action plan"],
    image: "/placeholder.svg?key=1p0jj",
  },
]

const categories = [
  { value: "all", label: "All Services", icon: Sparkles },
  { value: "design", label: "Design", icon: Palette },
  { value: "staging", label: "Staging", icon: Home },
  { value: "events", label: "Events", icon: Calendar },
  { value: "consultation", label: "Consultation", icon: Sparkles },
]

export default function MarketplacePage() {
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
                      <img
                        src={service.image || "/placeholder.svg"}
                        alt={service.name}
                        className="object-cover w-full h-full"
                      />
                      <Badge className="absolute top-4 right-4 bg-background/90 text-foreground border-border">
                        {service.price}
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
                          <span className="font-medium text-foreground">{service.rating}</span>
                          <span>({service.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{service.duration}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">What's included:</p>
                        <ul className="grid grid-cols-2 gap-2">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                              <span className="text-primary mt-0.5">✓</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button className="w-full" asChild>
                        <Link href={`/dashboard/marketplace/${service.id}`}>Book Service</Link>
                      </Button>
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
            Can't find exactly what you're looking for? Our team can create a custom service package tailored to your
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
