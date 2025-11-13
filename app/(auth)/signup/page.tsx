"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { Chrome, Loader2 } from "lucide-react"

const signupSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your password"),
    acceptTerms: z
      .boolean()
      .refine((val) => val, { message: "Please accept the membership terms" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })

type SignupFormValues = z.infer<typeof signupSchema>

export default function SignupPage() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [oauthLoading, setOauthLoading] = useState<"google" | null>(null)
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  })

  const onSubmit = async (values: SignupFormValues) => {
    setStatus("idle")
    setErrorMessage(null)
    const origin = typeof window !== "undefined" ? window.location.origin : ""
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: origin ? `${origin}/dashboard` : undefined,
        data: {
          first_name: values.firstName,
          last_name: values.lastName,
          full_name: `${values.firstName} ${values.lastName}`.trim(),
        },
      },
    })

    if (error) {
      setErrorMessage(error.message)
      setStatus("error")
      return
    }

    reset({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    })
    setStatus("success")
  }

  const handleGoogleSignIn = async () => {
    try {
      setStatus("idle")
      setErrorMessage(null)
      setOauthLoading("google")
      const origin = window.location.origin
      const redirectUrl = `${origin}/dashboard`
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
        },
      })
      if (error) {
        setErrorMessage(error.message)
        setStatus("error")
        return
      }
      if (data?.url) {
        window.location.href = data.url
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to continue with that provider.")
      setStatus("error")
    } finally {
      setOauthLoading(null)
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center md:text-left">
        <h1 className="font-serif text-3xl font-bold text-foreground">Start your membership</h1>
        <p className="text-sm text-muted-foreground">
          Create an account to explore AI tools, designer collaboration, and local service add-ons.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              placeholder="Sam"
              autoComplete="given-name"
              aria-invalid={errors.firstName ? "true" : "false"}
              {...register("firstName")}
            />
            {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              placeholder="Rivera"
              autoComplete="family-name"
              aria-invalid={errors.lastName ? "true" : "false"}
              {...register("lastName")}
            />
            {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
          </div>
        </div>

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

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="Create a password"
              aria-invalid={errors.password ? "true" : "false"}
              {...register("password")}
            />
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Re-enter password"
              aria-invalid={errors.confirmPassword ? "true" : "false"}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-muted/40 p-4">
          <div className="flex items-start gap-3">
            <Switch
              id="acceptTerms"
              checked={watch("acceptTerms")}
              onCheckedChange={(checked) => setValue("acceptTerms", checked)}
              className="mt-1"
            />
            <Label htmlFor="acceptTerms" className="text-sm font-normal text-muted-foreground leading-relaxed">
              I agree to the{" "}
              <Link href="/terms" className="text-primary underline underline-offset-2">
                membership terms
              </Link>{" "}
              and acknowledge the{" "}
              <Link href="/privacy" className="text-primary underline underline-offset-2">
                privacy policy
              </Link>
              .
            </Label>
          </div>
        </div>
        {errors.acceptTerms && <p className="text-sm text-destructive">{errors.acceptTerms.message}</p>}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>

        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full justify-center gap-2"
            onClick={handleGoogleSignIn}
            disabled={oauthLoading !== null}
          >
            {oauthLoading === "google" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Chrome className="h-4 w-4" />}
            Google
          </Button>
        </div>

        {status === "success" && (
          <div className="rounded-md border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-primary">
            Check your email to confirm your account. Once verified, you can sign in and explore the dashboard.
          </div>
        )}
        {status === "error" && (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {errorMessage ?? "We couldn’t create your account. Please try again."}
          </div>
        )}
      </form>

      <p className="text-sm text-muted-foreground text-center">
        Already a member?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Sign in instead
        </Link>
      </p>
    </div>
  )
}

