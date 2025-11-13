export type Service = {
  id: string
  name: string
  slug: string
  category: string | null
  price_display: string
  base_price: number | null
  currency: string | null
  description: string | null
  fulfillment_type: "virtual" | "in_person" | "hybrid" | null
  duration_minutes: number | null
  rating: number | null
  reviews_count: number | null
  features: string[] | null
  hero_image: string | null
  created_at: string
  updated_at: string
}

export type ServiceAvailability = {
  id: string
  service_id: string
  day_of_week: number
  start_time: string
  end_time: string
}

