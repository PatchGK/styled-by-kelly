import { stripe, isStripeEnabled } from "@/lib/stripe"
import type { SupabaseClient } from "@supabase/supabase-js"

export async function getOrCreateStripeCustomer(params: {
  supabase: SupabaseClient
  userId: string
  email: string
  name?: string | null
}) {
  const { supabase, userId, email, name } = params
  const activeStripe = stripe

  if (!isStripeEnabled || !activeStripe) {
    throw new Error("Stripe is disabled in this environment.")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id, full_name")
    .eq("id", userId)
    .maybeSingle()

  if (profile?.stripe_customer_id) {
    return profile.stripe_customer_id
  }

  const customer = await activeStripe.customers.create({
    email,
    name: profile?.full_name ?? name ?? undefined,
  })

  await supabase
    .from("profiles")
    .upsert(
      {
        id: userId,
        stripe_customer_id: customer.id,
        full_name: profile?.full_name ?? name ?? null,
      },
      { onConflict: "id" },
    )

  return customer.id
}

