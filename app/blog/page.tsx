import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card } from "@/components/ui/card"
import Link from "next/link"

const posts = [
  {
    slug: "cozy-modern-living-room-guide",
    title: "Cozy Modern: Living Room Guide for Real Life",
    excerpt:
      "Layer warm neutrals, tactile fabrics, and statement lighting to create a welcoming space that still feels fresh.",
    category: "Style Playbooks",
    readTime: "6 min read",
  },
  {
    slug: "preparing-for-home-staging",
    title: "How to Prepare for a Home Staging Project",
    excerpt:
      "From decluttering to rental furniture, here’s what to expect when you partner with StyledByKelly for staging.",
    category: "Local Services",
    readTime: "4 min read",
  },
  {
    slug: "holiday-entertaining-checklist",
    title: "Holiday Entertaining Checklist",
    excerpt:
      "Turn seasonal gatherings into a stress-free experience with our event styling and decor sourcing best practices.",
    category: "Lifestyle",
    readTime: "5 min read",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/40">
          <div className="container max-w-4xl mx-auto text-center space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Journal</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">
              Inspiration, resources, and StyledByKelly updates
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Fresh ideas delivered by our design team and partners. Members get deep dives and seasonal guides in the
              dashboard.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container grid md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post.slug} className="flex flex-col border-border bg-background overflow-hidden">
                <div className="aspect-[4/3] bg-muted relative">
                  <Image
                    src={`/placeholder.svg?key=${post.slug}`}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                    unoptimized
                  />
                </div>
                <div className="flex-1 p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground">
                    <span>{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="font-serif text-xl font-bold text-foreground">{post.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
                </div>
                <div className="p-6 pt-0">
                  <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-primary hover:underline">
                    Read story
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

