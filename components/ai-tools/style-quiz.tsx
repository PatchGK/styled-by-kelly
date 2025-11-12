"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react"

const questions = [
  {
    id: 1,
    question: "Which word best describes your ideal home?",
    options: ["Cozy", "Modern", "Elegant", "Eclectic"],
  },
  {
    id: 2,
    question: "What colors make you feel most at peace?",
    options: ["Warm earth tones", "Cool blues and grays", "Bold and vibrant", "Soft pastels"],
  },
  {
    id: 3,
    question: "How would you describe your lifestyle?",
    options: ["Relaxed and casual", "Active and social", "Quiet and contemplative", "Creative and expressive"],
  },
  {
    id: 4,
    question: "What type of furniture appeals to you most?",
    options: ["Vintage and worn", "Sleek and minimal", "Classic and timeless", "Mixed and unique"],
  },
  {
    id: 5,
    question: "How much natural light do you prefer?",
    options: ["Bright and airy", "Soft and filtered", "Dramatic contrasts", "Warm and golden"],
  },
]

export function StyleQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: answer })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
  }

  if (showResults) {
    return (
      <Card className="p-8 space-y-6 max-w-3xl mx-auto">
        <div className="text-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground">Your Design Style: Modern Farmhouse</h2>
          <p className="text-muted-foreground leading-relaxed">
            Based on your answers, you gravitate toward warm, inviting spaces that blend rustic charm with clean lines.
            You appreciate natural materials, neutral palettes with earthy accents, and furniture that's both functional
            and stylish.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="aspect-square rounded-lg bg-muted overflow-hidden">
            <img src="/modern-farmhouse-living-room.jpg" alt="Style inspiration 1" className="object-cover w-full h-full" />
          </div>
          <div className="aspect-square rounded-lg bg-muted overflow-hidden">
            <img src="/farmhouse-kitchen.png" alt="Style inspiration 2" className="object-cover w-full h-full" />
          </div>
          <div className="aspect-square rounded-lg bg-muted overflow-hidden">
            <img src="/cozy-bedroom.png" alt="Style inspiration 3" className="object-cover w-full h-full" />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Key Elements for Your Style:</h3>
          <ul className="space-y-2">
            {[
              "Natural wood tones and textures",
              "Neutral color palette with warm accents",
              "Mix of vintage and modern pieces",
              "Plenty of natural light",
              "Comfortable, lived-in feeling",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={handleRestart} variant="outline" className="flex-1 bg-transparent">
            Retake Quiz
          </Button>
          <Button className="flex-1">Save to Profile</Button>
        </div>
      </Card>
    )
  }

  const question = questions[currentQuestion]
  const selectedAnswer = answers[question.id]

  return (
    <Card className="p-8 space-y-6 max-w-2xl mx-auto">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">{question.question}</h2>
      </div>

      <div className="grid gap-3">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              selectedAnswer === option
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 hover:bg-accent"
            }`}
          >
            <span className="font-medium text-foreground">{option}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={handleBack} disabled={currentQuestion === 0}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleNext} disabled={!selectedAnswer} className="flex-1">
          {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
