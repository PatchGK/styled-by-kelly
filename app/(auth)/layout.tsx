import Link from "next/link"
import type { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen grid md:grid-cols-[1.2fr_1fr] lg:grid-cols-[1.3fr_1fr] bg-background">
      <aside className="relative hidden md:flex flex-col justify-between bg-gradient-to-br from-primary/70 via-primary to-primary/80 text-primary-foreground p-12">
        <div className="space-y-6 max-w-lg">
          <Link href="/" className="inline-flex items-center text-2xl font-serif font-bold tracking-tight">
            StyledByKelly
          </Link>
          <h2 className="font-serif text-4xl font-bold leading-tight">
            A cozy design companion for homes that tell your story
          </h2>
          <p className="text-base leading-relaxed text-primary-foreground/90">
            Join a membership that pairs AI personalization with real designers, local services, and the warm lifestyle
            aesthetic you love.
          </p>
        </div>
        <div className="space-y-1 text-sm text-primary-foreground/80">
          <p>Need help signing in?</p>
          <a href="mailto:hello@styledbykelly.com" className="underline font-medium">
            hello@styledbykelly.com
          </a>
        </div>
      </aside>

      <main className="flex items-center justify-center px-6 py-12 sm:px-8">
        <div className="w-full max-w-md space-y-10">
          <div className="md:hidden space-y-4 text-center">
            <Link href="/" className="inline-flex items-center justify-center text-2xl font-serif font-bold text-primary">
              StyledByKelly
            </Link>
            <p className="text-sm text-muted-foreground">
              Personalized interior design memberships with optional local add-ons.
            </p>
          </div>
          {children}
        </div>
      </main>
    </div>
  )
}

