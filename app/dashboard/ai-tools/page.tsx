"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Camera, Palette } from "lucide-react"
import { StyleQuiz } from "@/components/ai-tools/style-quiz"
import { PhotoUpload } from "@/components/ai-tools/photo-upload"
import { ColorMatcher } from "@/components/ai-tools/color-matcher"

export default function AIToolsPage() {
  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">AI Design Tools</h1>
        <p className="text-muted-foreground">
          Use our AI-powered tools to discover your style and get personalized recommendations
        </p>
      </div>

      <Tabs defaultValue="quiz" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
          <TabsTrigger value="quiz" className="gap-2">
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Style Quiz</span>
          </TabsTrigger>
          <TabsTrigger value="photo" className="gap-2">
            <Camera className="h-4 w-4" />
            <span className="hidden sm:inline">Photo Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="color" className="gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Color Matcher</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quiz">
          <StyleQuiz />
        </TabsContent>

        <TabsContent value="photo">
          <PhotoUpload />
        </TabsContent>

        <TabsContent value="color">
          <ColorMatcher />
        </TabsContent>
      </Tabs>
    </div>
  )
}
