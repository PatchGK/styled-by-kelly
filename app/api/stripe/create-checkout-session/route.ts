import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { getOrCreateStripeCustomer } from "@/lib/stripe/customers"

type CheckoutRequest = {
  priceId?: string
  mode?: "subscription" | "payment"
}

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
const activeStatuses = new Set(["active", "trialing"])

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const body = (await request.json()) as CheckoutRequest
    const priceId = body.priceId
    const mode = body.mode ?? "subscription"

    if (!priceId) {
      return NextResponse.json({ error: "Missing priceId" }, { status: 400 })
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id, subscription_status")
      .eq("id", session.user.id)
      .maybeSingle()

    if (mode === "payment" && !activeStatuses.has(profile?.subscription_status ?? "")) {
      return NextResponse.json({ error: "Services are available to active subscribers only." }, { status: 403 })
    }

    const customerId = await getOrCreateStripeCustomer({
      supabase,
      userId: session.user.id,
      email: session.user.email ?? "",
      name: (session.user.user_metadata as Record<string, string | undefined>)?.full_name,
    })

    const successUrl = `${appUrl}/dashboard?checkout=success`
    const cancelUrl = `${appUrl}/pricing?checkout=cancel`

    const checkoutSession = await stripe.checkout.sessions.create({
      mode,
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      automatic_tax: { enabled: true },
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        user_id: session.user.id,
        mode,
      },
      subscription_data:
        mode === "subscription"
          ? {
              metadata: {
                user_id: session.user.id,
              },
            }
          : undefined,
      payment_intent_data:
        mode === "payment"
          ? {
              metadata: {
                user_id: session.user.id,
                price_id: priceId,
              },
            }
          : undefined,
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error("[stripe] create-checkout-session error", error)
    return NextResponse.json({ error: "Unable to create checkout session" }, { status: 500 })
  }
}

