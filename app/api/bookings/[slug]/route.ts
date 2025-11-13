"use server"

import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { getServiceBySlug } from "@/lib/services"
import { sendBookingConfirmation } from "@/lib/email/bookings"

const bookingSchema = z.object({
  preferredDate: z.string().min(1, "Preferred date is required."),
  preferredStartTime: z.string().min(1, "Preferred start time is required."),
  preferredEndTime: z.string().min(1, "Preferred end time is required."),
  timezone: z.string().min(1, "Timezone is required."),
  location: z.string().optional(),
  notes: z.string().optional(),
})

const requiresLocationTypes = new Set(["in_person", "hybrid"])

export async function POST(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await context.params
    const supabase = await createSupabaseServerClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 })
    }

    const service = await getServiceBySlug(slug)
    if (!service) {
      return NextResponse.json({ error: "Service not found." }, { status: 404 })
    }

    const body = await request.json()
    const parsed = bookingSchema.safeParse(body)
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Invalid booking payload."
      return NextResponse.json({ error: message }, { status: 400 })
    }
    const values = parsed.data

    if (requiresLocationTypes.has(service.fulfillment_type ?? "") && !values.location?.trim()) {
      return NextResponse.json({ error: "Location is required for this service." }, { status: 400 })
    }

    const { error: insertError } = await supabase.from("bookings").insert({
      user_id: session.user.id,
      service_id: service.id,
      status: "pending",
      preferred_date: values.preferredDate,
      preferred_start_time: values.preferredStartTime,
      preferred_end_time: values.preferredEndTime,
      timezone: values.timezone,
      location: values.location?.trim() ?? null,
      notes: values.notes?.trim() ?? null,
      price_at_booking: service.base_price ?? null,
      currency: service.currency ?? "usd",
    })

    if (insertError) {
      console.error("[bookings] insert failed", insertError)
      return NextResponse.json({ error: "Unable to submit booking request." }, { status: 500 })
    }

    try {
      await sendBookingConfirmation({
        to: session.user.email ?? "",
        serviceName: service.name,
        preferredDate: values.preferredDate,
        preferredStartTime: values.preferredStartTime,
        preferredEndTime: values.preferredEndTime,
        timezone: values.timezone,
        location: values.location ?? undefined,
      })
    } catch (emailError) {
      console.warn("[bookings] email send failed", emailError)
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[bookings] unexpected error", error)
    return NextResponse.json({ error: "Unexpected error submitting booking." }, { status: 500 })
  }
}