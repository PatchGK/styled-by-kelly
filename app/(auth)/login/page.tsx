"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { Chrome, Loader2 } from "lucide-react"

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [oauthLoading, setOauthLoading] = useState<"google" | null>(null)
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: true,
    },
  })

  const onSubmit = async (values: LoginFormValues) => {
    setStatus("idle")
    setErrorMessage(null)
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })

    if (error) {
      setErrorMessage(error.message)
      setStatus("error")
      return
    }

    reset({ ...values, password: "" })
    setStatus("success")
    const redirectTo = new URLSearchParams(window.location.search).get("redirect_to") ?? "/dashboard"
    window.location.replace(redirectTo)
  }

  const handleGoogleSignIn = async () => {
    try {
      setStatus("idle")
      setErrorMessage(null)
      setOauthLoading("google")
      const redirectPath = new URLSearchParams(window.location.search).get("redirect_to") ?? "/dashboard"
      const origin = window.location.origin
      const redirectUrl = redirectPath.startsWith("http") ? redirectPath : `${origin}${redirectPath}`
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
        },
      })
      if (error) {
        setErrorMessage(error.message)
        setStatus("error")
        setOauthLoading(null)
        return
      }
      if (data?.url) {
        window.location.href = data.url
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to sign in with that provider.")
      setStatus("error")
    } finally {
      // If Supabase redirects the user this will not run, but it ensures the button resets when it does not.
      setOauthLoading(null)
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center md:text-left">
        <h1 className="font-serif text-3xl font-bold text-foreground">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to access your personalized design dashboard and AI tools.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-4">
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

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="text-xs font-medium text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              aria-invalid={errors.password ? "true" : "false"}
              {...register("password")}
            />
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>

        {status === "success" && (
          <div className="rounded-md border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-primary">
            Signed in! Redirecting…
          </div>
        )}
        {status === "error" && (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {errorMessage ?? "Something went wrong. Please check your details and try again."}
          </div>
        )}
      </form>

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

      <p className="text-sm text-muted-foreground text-center">
        New to StyledByKelly?{" "}
        <Link href="/signup" className="font-medium text-primary hover:underline">
          Start your membership
        </Link>
      </p>
    </div>
  )
}

