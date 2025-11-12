import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-foreground">StyledByKelly</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Your home, designed for who you really are.</p>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-4">Product</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/inspiration" className="text-muted-foreground hover:text-foreground transition-colors">
                  Inspiration
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} StyledByKelly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
