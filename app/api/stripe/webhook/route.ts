import { NextResponse } from "next/server"
import type Stripe from "stripe"
import { stripe, isStripeEnabled } from "@/lib/stripe"
import { getSupabaseAdminClient } from "@/lib/supabase/admin"

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
const planEntries = [
  [process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER, { plan: "Starter", displayPrice: "$9.99/month - Billed monthly" }],
  [process.env.NEXT_PUBLIC_STRIPE_PRICE_PLUS, { plan: "Plus", displayPrice: "$39.99/month - Billed monthly" }],
  [process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO, { plan: "Pro", displayPrice: "$99.99/month - Billed monthly" }],
  [process.env.NEXT_PUBLIC_STRIPE_PRICE_ELITE, { plan: "Elite", displayPrice: "$249.99/month - Billed monthly" }],
].filter((entry): entry is [string, { plan: string; displayPrice: string }] => Boolean(entry[0]))

const priceToPlanMap = new Map(planEntries)

export async function POST(request: Request) {
  const activeStripe = stripe
  if (!isStripeEnabled || !activeStripe) {
    return NextResponse.json({ message: "Stripe webhook disabled in this environment." }, { status: 200 })
  }

  if (!webhookSecret) {
    return NextResponse.json({ error: "Stripe webhook secret not configured" }, { status: 500 })
  }

  const signature = request.headers.get("stripe-signature")
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  const payload = await request.text()

  let event: Stripe.Event
  try {
    event = activeStripe.webhooks.constructEvent(payload, signature, webhookSecret)
  } catch (error) {
    console.error("[stripe] webhook signature verification failed", error)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  const supabase = getSupabaseAdminClient()

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id
        const priceId = subscription.items.data[0]?.price.id ?? null

        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .maybeSingle()

        if (!profile?.id && subscription.metadata.user_id) {
          // Attempt to attach the customer to the profile via metadata
          await supabase
            .from("profiles")
            .upsert(
              {
                id: subscription.metadata.user_id,
                stripe_customer_id: customerId,
              },
              { onConflict: "id" },
            )
        }

        const userId = profile?.id ?? subscription.metadata.user_id
        if (!userId) {
          console.warn("[stripe] subscription event missing user association", subscription.id)
          break
        }

        const planMeta = priceId ? priceToPlanMap.get(priceId) : null
        const currentPeriodEnd = subscription.current_period_end
          ? new Date(subscription.current_period_end * 1000).toISOString()
          : null

        await supabase.from("subscriptions").upsert(
          {
            user_id: userId,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscription.id,
            price_id: priceId,
            status: subscription.status,
            current_period_end: currentPeriodEnd,
          },
          { onConflict: "stripe_subscription_id" },
        )

        const nextBillingDate = currentPeriodEnd
          ? new Date(currentPeriodEnd).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : null

        await supabase
          .from("profiles")
          .update({
            stripe_customer_id: customerId,
            membership_plan: planMeta?.plan ?? null,
            plan_price: planMeta?.displayPrice ?? null,
            subscription_status: subscription.status,
            subscription_price_id: priceId,
            current_period_end: currentPeriodEnd,
            next_billing_date: nextBillingDate,
          })
          .eq("id", userId)

        break
      }
      case "checkout.session.completed": {
        const checkout = event.data.object as Stripe.Checkout.Session
        if (checkout.mode === "payment") {
          // We currently rely on members to book through the dashboard; no additional storage needed yet.
          console.info("[stripe] service payment completed", checkout.id)
        }
        break
      }
      default:
        break
    }
  } catch (error) {
    console.error("[stripe] webhook handling failed", error)
    return NextResponse.json({ error: "Webhook handling failed" }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}

