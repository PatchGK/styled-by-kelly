import Stripe from "stripe"

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

export const isStripeEnabled = Boolean(stripeSecretKey)

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
      typescript: true,
    })
  : null

