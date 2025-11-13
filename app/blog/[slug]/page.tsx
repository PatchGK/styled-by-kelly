import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const mockPosts: Record<
  string,
  {
    title: string
    category: string
    readTime: string
    content: string[]
  }
> = {
  "cozy-modern-living-room-guide": {
    title: "Cozy Modern: Living Room Guide for Real Life",
    category: "Style Playbooks",
    readTime: "6 min read",
    content: [
      "Designing a living room you’ll actually live in starts with a neutral base. Layer in earth-toned textiles, textured wood accents, and intentional lighting to keep things warm yet contemporary.",
      "We recommend grounding the space with a performance fabric sofa, mixing relaxed slipcovers with structured accent chairs, and finishing with vintage-inspired decor.",
    ],
  },
  "preparing-for-home-staging": {
    title: "How to Prepare for a Home Staging Project",
    category: "Local Services",
    readTime: "4 min read",
    content: [
      "Staging is about showcasing possibility. Start with a deep declutter, define focal zones, and let our team source rental pieces that photograph beautifully while feeling livable.",
      "The StyledByKelly marketplace connects you to pros who align with our lifestyle aesthetic and handle logistics from install to pick-up.",
    ],
  },
  "holiday-entertaining-checklist": {
    title: "Holiday Entertaining Checklist",
    category: "Lifestyle",
    readTime: "5 min read",
    content: [
      "Set the tone with layered lighting, an inviting entry vignette, and a signature scent. Keep surfaces ready with trays, greenery, and cozy textiles that invite guests to settle in.",
      "Need hands-on help? Book our event styling add-on for stress-free setup, sourcing, and breakdown support.",
    ],
  },
}

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = mockPosts[slug]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <article className="py-20 md:py-28">
          <div className="container max-w-3xl mx-auto space-y-6">
            <div className="space-y-1 text-sm uppercase tracking-[0.3em] text-muted-foreground">
              <span>{post.category}</span>
              <span className="ml-3 text-primary">{post.readTime}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">{post.title}</h1>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              {post.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  )
}

