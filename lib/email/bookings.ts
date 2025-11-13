import { Resend } from "resend"

const resendKey = process.env.RESEND_API_KEY

const resend = resendKey ? new Resend(resendKey) : null

type BookingEmailPayload = {
  to: string
  serviceName: string
  preferredDate: string
  preferredStartTime: string
  preferredEndTime: string
  timezone: string
  location?: string
}

export async function sendBookingConfirmation(payload: BookingEmailPayload) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not configured; skipping confirmation email.")
    return
  }

  await resend.emails.send({
    from: "StyledByKelly Concierge <concierge@styledbykelly.com>",
    to: payload.to,
    subject: `Booking request received – ${payload.serviceName}`,
    text: [
      `Hi there,`,
      ``,
      `Thanks for booking ${payload.serviceName}!`,
      ``,
      `We received your request with the following preferences:`,
      `- Date: ${payload.preferredDate}`,
      `- Time: ${payload.preferredStartTime}–${payload.preferredEndTime} (${payload.timezone})`,
      payload.location ? `- Location: ${payload.location}` : null,
      ``,
      `Our concierge will review everything and confirm within 24 hours.`,
      ``,
      `Talk soon,`,
      `StyledByKelly Team`,
    ]
      .filter(Boolean)
      .join("\n"),
  })
}

