"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Star, Download, Send, ThumbsUp, ThumbsDown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function FeedbackPage({ params }: { params: { orderId: string } }) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [customerFeedback, setCustomerFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Mock review data - in real app, fetch by orderId
  const review = {
    id: 1,
    reviewer: {
      name: "Sarah Johnson",
      title: "Senior Software Engineering Manager",
      company: "Google",
      avatar: "/professional-woman-tech.png",
    },
    resumeTitle: "Software Engineer Resume v3",
    completedDate: "2024-01-20T14:30:00Z",
    price: 45,
    feedback: {
      overallRating: 4,
      strengths: [
        "Strong technical skills clearly presented",
        "Good progression from junior to mid-level roles",
        "Quantified achievements with specific metrics",
        "Clean, professional formatting",
      ],
      improvements: [
        "Add more leadership examples in recent roles",
        "Include system design experience",
        "Expand on cross-functional collaboration",
        "Consider adding relevant side projects",
      ],
      specificFeedback:
        "Your resume shows excellent technical growth and clear career progression. The experience section effectively demonstrates your evolution from a junior developer to a more senior role. I particularly like how you've quantified your impact with specific metrics like '100K+ users' and performance improvements.\n\nFor your target senior roles at FAANG companies, I recommend emphasizing more leadership and mentorship experiences. Consider adding examples of technical decisions you've made, systems you've designed, or junior developers you've mentored. The skills section is comprehensive, but you might want to group them by category (Languages, Frameworks, Tools, etc.) for better readability.\n\nOverall, this is a solid resume that effectively showcases your technical abilities. With the suggested improvements, it will be even more compelling for senior-level positions.",
      recommendations: [
        "Add a 'Technical Leadership' section highlighting mentorship and decision-making",
        "Include 1-2 relevant side projects that demonstrate advanced skills",
        "Consider adding a brief summary section at the top",
        "Update the skills section with more recent technologies you've worked with",
      ],
    },
  }

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating)
  }

  const handleSubmitFeedback = async () => {
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please provide a rating for the reviewer.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate feedback submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Feedback submitted!",
        description: "Thank you for rating the reviewer. Your feedback helps improve our service.",
      })
      // In real app, redirect to orders or reviews page
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/customer/orders">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Review Feedback</h1>
          <p className="text-muted-foreground">Detailed feedback from {review.reviewer.name}</p>
        </div>
      </div>

      {/* Reviewer Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={review.reviewer.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {review.reviewer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">{review.reviewer.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {review.reviewer.title} at {review.reviewer.company}
                </p>
                <p className="text-sm text-muted-foreground">
                  Completed: {new Date(review.completedDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.feedback.overallRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Overall Rating</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strengths & Improvements */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-700 dark:text-green-400">
                <ThumbsUp className="h-5 w-5" />
                <span>Key Strengths</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {review.feedback.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-orange-700 dark:text-orange-400">
                <ThumbsDown className="h-5 w-5" />
                <span>Areas for Improvement</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {review.feedback.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{improvement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Feedback */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Feedback</CardTitle>
              <CardDescription>Comprehensive review of your resume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="text-sm whitespace-pre-line">{review.feedback.specificFeedback}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>Next steps to improve your resume</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {review.feedback.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Download & Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium mb-1">Resume: {review.resumeTitle}</h3>
              <p className="text-sm text-muted-foreground">Download your reviewed resume with feedback annotations</p>
            </div>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download Feedback
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Rate Reviewer */}
      <Card>
        <CardHeader>
          <CardTitle>Rate This Review</CardTitle>
          <CardDescription>Help other customers by rating the quality of this review</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">How would you rate this review?</Label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= (hoverRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback">Additional Comments (Optional)</Label>
            <Textarea
              id="feedback"
              placeholder="Share your thoughts about this review..."
              value={customerFeedback}
              onChange={(e) => setCustomerFeedback(e.target.value)}
              rows={3}
            />
          </div>

          <Button onClick={handleSubmitFeedback} disabled={isSubmitting} className="w-full">
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? "Submitting..." : "Submit Rating"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function Label({ children, htmlFor, className }: { children: React.ReactNode; htmlFor?: string; className?: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className || ""}`}
    >
      {children}
    </label>
  )
}
