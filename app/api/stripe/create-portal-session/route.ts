import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { getOrCreateStripeCustomer } from "@/lib/stripe/customers"

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

export async function POST() {
  try {
    const supabase = await createSupabaseServerClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const customerId = await getOrCreateStripeCustomer({
      supabase,
      userId: session.user.id,
      email: session.user.email ?? "",
      name: (session.user.user_metadata as Record<string, string | undefined>)?.full_name,
    })

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${appUrl}/dashboard/settings`,
    })

    return NextResponse.json({ url: portalSession.url })
  } catch (error) {
    console.error("[stripe] create-portal-session error", error)
    return NextResponse.json({ error: "Unable to create billing portal session" }, { status: 500 })
  }
}

