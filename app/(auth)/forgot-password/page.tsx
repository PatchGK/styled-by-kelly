"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const forgotPasswordSchema = z.object({
  email: z.string().email("Enter the email address for your account"),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setStatus("idle")

    await new Promise((resolve) => setTimeout(resolve, 700))

    if (values.email) {
      setStatus("success")
      reset({ email: "" })
    } else {
      setStatus("error")
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center md:text-left">
        <h1 className="font-serif text-3xl font-bold text-foreground">Reset your password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and we’ll send you a secure link to create a new password.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={errors.email ? "true" : "false"}
            {...register("email")}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending reset link..." : "Send reset link"}
        </Button>

        {status === "success" && (
          <div className="rounded-md border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-primary">
            Password reset email sent. Check your inbox for the next steps.
          </div>
        )}
        {status === "error" && (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            We couldn’t send the email. Please verify the address and try again.
          </div>
        )}
      </form>

      <p className="text-sm text-muted-foreground text-center md:text-left">
        Remembered your password?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Return to sign in
        </Link>
      </p>
    </div>
  )
}

