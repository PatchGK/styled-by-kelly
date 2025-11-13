import { redirect } from "next/navigation"
import { format } from "date-fns"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getSupabaseAdminClient } from "@/lib/supabase/admin"
import { getSupabaseSession } from "@/lib/supabase/server-utils"

type AdminBooking = {
  id: string
  created_at: string
  status: string
  preferred_date: string | null
  preferred_start_time: string | null
  preferred_end_time: string | null
  timezone: string | null
  location: string | null
  notes: string | null
  services: {
    name: string
    slug: string
    price_display: string
  } | null
  profiles: {
    full_name: string | null
    email: string | null
  } | null
}

type SupabaseBookingRow = Omit<AdminBooking, "services" | "profiles"> & {
  services: AdminBooking["services"][] | null
  profiles: AdminBooking["profiles"][] | null
}

async function getAdminBookings(): Promise<AdminBooking[]> {
  const supabase = getSupabaseAdminClient()
  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
        id,
        created_at,
        status,
        preferred_date,
        preferred_start_time,
        preferred_end_time,
        timezone,
        location,
        notes,
        services(name, slug, price_display),
        profiles(full_name, email)
      `,
    )
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  const rows = (data as SupabaseBookingRow[]) ?? []
  return rows.map((row) => ({
    ...row,
    services: row.services?.[0] ?? null,
    profiles: row.profiles?.[0] ?? null,
  }))
}

export default async function AdminServicesPage() {
  const session = await getSupabaseSession()
  if (!session?.user) {
    redirect("/login?redirect_to=/dashboard/admin/services")
  }

  const supabase = getSupabaseAdminClient()
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", session.user.id).maybeSingle()

  if (!profile?.is_admin) {
    redirect("/dashboard")
  }

  const bookings = await getAdminBookings()

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="space-y-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Service Bookings</h1>
        <p className="text-muted-foreground text-sm">
          Manage member booking requests. Confirm availability, coordinate designers, and follow up with clients.
        </p>
      </div>

      <div className="grid gap-4">
        {bookings.map((booking) => (
          <Card key={booking.id} className="p-6 space-y-4 border-border bg-card">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <h2 className="font-semibold text-foreground">{booking.services?.name ?? "Service"}</h2>
                <p className="text-xs text-muted-foreground">
                  Requested {format(new Date(booking.created_at), "MMM d, yyyy, h:mm a")}
                </p>
              </div>
              <Badge className="uppercase text-xs bg-primary text-primary-foreground">{booking.status}</Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground">Member</p>
                <p>
                  {booking.profiles?.full_name ?? "Unknown"} <br />
                  <span className="text-xs">{booking.profiles?.email ?? "No email on file"}</span>
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground">Price Guidance</p>
                <p>{booking.services?.price_display ?? "TBD"}</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">Preferred Slot</p>
                <p>
                  {booking.preferred_date
                    ? `${format(new Date(booking.preferred_date), "MMM d, yyyy")} • ${booking.preferred_start_time ?? "—"}–${booking.preferred_end_time ?? "—"}`
                    : "No date selected"}
                  {booking.timezone ? ` (${booking.timezone})` : ""}
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground">Location</p>
                <p>{booking.location ?? "Virtual / TBD"}</p>
              </div>
            </div>

            {booking.notes && (
              <div className="rounded-lg border border-border bg-card/60 p-4 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground mb-2">Project notes</p>
                <p>{booking.notes}</p>
              </div>
            )}
          </Card>
        ))}
      </div>

      {bookings.length === 0 && (
        <Card className="p-6 text-sm text-muted-foreground">
          No booking requests yet. They’ll appear here as members submit forms from the marketplace.
        </Card>
      )}
    </div>
  )
}
