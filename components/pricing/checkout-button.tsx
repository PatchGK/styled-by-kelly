"use client"

import { useState, type ComponentProps } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useSupabase } from "@/components/providers/supabase-provider"

type ButtonProps = ComponentProps<typeof Button>

type CheckoutButtonProps = {
  priceId: string | null
  mode?: "subscription" | "payment"
  loginFallback?: string
  signupFallback?: string
  children: React.ReactNode
} & Omit<ButtonProps, "children" | "onClick">

export function CheckoutButton({
  priceId,
  mode = "subscription",
  loginFallback = "/login",
  signupFallback = "/signup",
  children,
  ...buttonProps
}: CheckoutButtonProps) {
  const { session } = useSupabase()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    if (!priceId) {
      toast.error("Pricing is not available yet. Please contact support.")
      return
    }

    if (!session) {
      router.push(mode === "subscription" ? signupFallback : loginFallback)
      return
    }

    setIsLoading(true)
    const response = await fetch("/api/stripe/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId, mode }),
    })

    setIsLoading(false)

    if (!response.ok) {
      const { error } = (await response.json()) as { error?: string }
      toast.error(error ?? "Unable to start checkout. Please try again.")
      return
    }

    const data = (await response.json()) as { url?: string }
    if (data.url) {
      router.push(data.url)
    } else {
      toast.error("Checkout session missing redirect URL.")
    }
  }

  return (
    <Button {...buttonProps} disabled={buttonProps.disabled || isLoading} onClick={handleClick}>
      {isLoading ? "Redirecting..." : children}
    </Button>
  )
}

