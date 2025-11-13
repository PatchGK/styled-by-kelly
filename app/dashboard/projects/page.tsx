import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, MoreVertical, Calendar, Heart } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    id: 1,
    name: "Living Room Refresh",
    status: "in-progress",
    progress: 75,
    lastUpdated: "2 days ago",
    image: "/placeholder.svg?key=vvk9r",
    items: 12,
    budget: "$2,500",
  },
  {
    id: 2,
    name: "Master Bedroom",
    status: "completed",
    progress: 100,
    lastUpdated: "1 week ago",
    image: "/placeholder.svg?key=wkxvz",
    items: 8,
    budget: "$1,800",
  },
  {
    id: 3,
    name: "Home Office",
    status: "in-progress",
    progress: 30,
    lastUpdated: "5 days ago",
    image: "/placeholder.svg?key=iekql",
    items: 6,
    budget: "$1,200",
  },
  {
    id: 4,
    name: "Kitchen Update",
    status: "planning",
    progress: 10,
    lastUpdated: "1 week ago",
    image: "/placeholder.svg?key=zxfpo",
    items: 15,
    budget: "$4,000",
  },
]

export default function ProjectsPage() {
  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">My Projects</h1>
          <p className="text-muted-foreground">Track your design projects and saved items</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-[16/10] bg-muted relative group">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <Button size="sm" variant="secondary">
                    View Project
                  </Button>
                  <button className="h-8 w-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <Badge
                className={`absolute top-4 right-4 ${
                  project.status === "completed"
                    ? "bg-primary"
                    : project.status === "in-progress"
                      ? "bg-secondary"
                      : "bg-muted"
                }`}
              >
                {project.status === "in-progress"
                  ? "In Progress"
                  : project.status === "completed"
                    ? "Completed"
                    : "Planning"}
              </Badge>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-foreground">{project.name}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>{project.items} items</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{project.lastUpdated}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="pt-2 border-t border-border flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Budget</p>
                  <p className="font-semibold text-foreground">{project.budget}</p>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/dashboard/projects/${project.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
