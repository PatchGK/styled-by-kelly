"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, X, Sparkles } from "lucide-react"

export function PhotoUpload() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAnalyze = () => {
    setAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setAnalyzing(false)
      setResults({
        style: "Contemporary with traditional elements",
        strengths: ["Good natural lighting from windows", "Balanced furniture arrangement", "Neutral color palette"],
        suggestions: [
          "Add textured throw pillows for visual interest",
          "Consider a larger area rug to anchor the space",
          "Incorporate plants for warmth and life",
          "Layer lighting with table lamps or floor lamps",
        ],
      })
    }, 2000)
  }

  const handleReset = () => {
    setUploadedImage(null)
    setResults(null)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card className="p-8">
        {!uploadedImage ? (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center space-y-4 hover:border-primary/50 transition-colors">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Upload a room photo</h3>
                <p className="text-sm text-muted-foreground">Get AI-powered design recommendations for your space</p>
              </div>
              <div>
                <label htmlFor="file-upload">
                  <Button asChild>
                    <span>Choose File</span>
                  </Button>
                </label>
                <input id="file-upload" type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </div>
              <p className="text-xs text-muted-foreground">Supports: JPG, PNG up to 10MB</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative">
              <img src={uploadedImage || "/placeholder.svg"} alt="Uploaded room" className="w-full rounded-lg" />
              <button
                onClick={handleReset}
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {!results && (
              <Button onClick={handleAnalyze} disabled={analyzing} className="w-full" size="lg">
                {analyzing ? (
                  <>
                    <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Analyze Room
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </Card>

      {results && (
        <Card className="p-8 space-y-6">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-foreground">Analysis Results</h3>
            <p className="text-muted-foreground">
              Detected style: <span className="font-medium text-foreground">{results.style}</span>
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-3">What's Working Well</h4>
              <ul className="space-y-2">
                {results.strengths.map((strength: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-1">✓</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">Design Suggestions</h4>
              <ul className="space-y-2">
                {results.suggestions.map((suggestion: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-1">→</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={handleReset} className="flex-1 bg-transparent">
              Upload New Photo
            </Button>
            <Button className="flex-1">Save Analysis</Button>
          </div>
        </Card>
      )}
    </div>
  )
}
