"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const signupSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your password"),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: "Please accept the membership terms" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })

type SignupFormValues = z.infer<typeof signupSchema>

export default function SignupPage() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

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

    await new Promise((resolve) => setTimeout(resolve, 900))

    if (values.email) {
      setStatus("success")
      reset({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
      })
    } else {
      setStatus("error")
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

        <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-4">
          <Switch
            id="acceptTerms"
            checked={watch("acceptTerms")}
            onCheckedChange={(checked) => setValue("acceptTerms", checked)}
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
        {errors.acceptTerms && <p className="text-sm text-destructive">{errors.acceptTerms.message}</p>}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>

        {status === "success" && (
          <div className="rounded-md border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-primary">
            Account created! Hook up Supabase auth to enable real signups.
          </div>
        )}
        {status === "error" && (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            We couldn’t create your account. Please try again.
          </div>
        )}
      </form>

      <p className="text-sm text-muted-foreground text-center md:text-left">
        Already a member?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Sign in instead
        </Link>
      </p>
    </div>
  )
}

