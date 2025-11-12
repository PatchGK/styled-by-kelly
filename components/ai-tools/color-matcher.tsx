"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

const colorPalettes = [
  {
    name: "Earthy Neutrals",
    colors: ["#F5F1E8", "#D4C5B0", "#9B8B7E", "#5C4E42", "#2D2520"],
    description: "Warm, grounding tones inspired by nature",
  },
  {
    name: "Coastal Blues",
    colors: ["#F0F4F8", "#C5D9E8", "#8AADC7", "#4A7BA7", "#2C5F8D"],
    description: "Serene and calming like ocean waves",
  },
  {
    name: "Modern Greens",
    colors: ["#F2F5F0", "#D4E3CC", "#A8C69F", "#6B9161", "#3F5838"],
    description: "Fresh, organic, and revitalizing",
  },
  {
    name: "Warm Terracotta",
    colors: ["#FAF7F5", "#E8D5C4", "#D4A588", "#B8764F", "#8B5234"],
    description: "Rustic warmth with Mediterranean flair",
  },
]

export function ColorMatcher() {
  const [selectedPalette, setSelectedPalette] = useState<(typeof colorPalettes)[0] | null>(null)

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card className="p-8 space-y-6">
        <div className="space-y-2">
          <h3 className="font-serif text-2xl font-bold text-foreground">Discover Your Perfect Palette</h3>
          <p className="text-muted-foreground">Choose a color palette that resonates with your style</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {colorPalettes.map((palette) => (
            <Card
              key={palette.name}
              className={`p-6 cursor-pointer transition-all ${
                selectedPalette?.name === palette.name
                  ? "border-2 border-primary shadow-lg"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => setSelectedPalette(palette)}
            >
              <div className="space-y-4">
                <div className="flex gap-2">
                  {palette.colors.map((color, i) => (
                    <div key={i} className="flex-1 aspect-square rounded-lg" style={{ backgroundColor: color }} />
                  ))}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{palette.name}</h4>
                  <p className="text-sm text-muted-foreground">{palette.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {selectedPalette && (
          <div className="pt-6 space-y-4 border-t border-border">
            <h4 className="font-semibold text-foreground">How to Use This Palette</h4>
            <div className="grid md:grid-cols-5 gap-4">
              {selectedPalette.colors.map((color, i) => (
                <div key={i} className="space-y-2">
                  <div className="aspect-square rounded-lg" style={{ backgroundColor: color }} />
                  <div className="text-xs space-y-1">
                    <p className="font-mono text-foreground">{color}</p>
                    <p className="text-muted-foreground">
                      {i === 0 ? "Walls" : i === 1 ? "Trim" : i === 2 ? "Furniture" : i === 3 ? "Accents" : "Details"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1 bg-transparent">
                Generate Similar
              </Button>
              <Button className="flex-1">
                <Sparkles className="mr-2 h-4 w-4" />
                Save to Projects
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
