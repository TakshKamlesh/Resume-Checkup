"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Star, FileText, TrendingUp, Calendar, Download, Eye } from "lucide-react"
import Link from "next/link"

export default function CustomerReviews() {
  const reviewStats = {
    totalReviews: 12,
    averageRating: 4.8,
    totalSpent: 520,
    improvementScore: 85,
  }

  const reviews = [
    {
      id: 1,
      reviewer: {
        name: "Sarah Johnson",
        title: "Senior Software Engineering Manager",
        company: "Google",
        avatar: "/professional-woman-tech.png",
      },
      resume: "Software Engineer Resume v3",
      rating: 5,
      date: "2024-01-19",
      feedback:
        "Excellent technical skills presentation. The experience section clearly shows progression and impact. Consider adding more quantified achievements in the recent roles.",
      highlights: ["Strong technical skills", "Clear career progression", "Good formatting"],
      improvements: ["Add more metrics", "Expand leadership examples"],
      price: 45,
    },
    {
      id: 2,
      reviewer: {
        name: "Michael Chen",
        title: "Principal Frontend Engineer",
        company: "Meta",
        avatar: "/professional-man.png",
      },
      resume: "Frontend Developer Resume",
      rating: 4,
      date: "2024-01-15",
      feedback:
        "Good foundation with React and JavaScript skills. The projects section is well-structured. Would benefit from more emphasis on performance optimization and accessibility.",
      highlights: ["Strong React skills", "Good project descriptions", "Clean design"],
      improvements: ["Add performance metrics", "Include accessibility work"],
      price: 40,
    },
    {
      id: 3,
      reviewer: {
        name: "Emily Rodriguez",
        title: "Staff Data Scientist",
        company: "Airbnb",
        avatar: "/professional-woman-diverse.png",
      },
      resume: "Full Stack Developer Resume",
      rating: 5,
      date: "2024-01-10",
      feedback:
        "Comprehensive full-stack experience well-presented. The balance between frontend and backend skills is excellent. Consider adding more details about system architecture decisions.",
      highlights: ["Full-stack expertise", "System design knowledge", "Good balance"],
      improvements: ["Add architecture examples", "Include scalability metrics"],
      price: 50,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Reviews</h1>
        <p className="text-muted-foreground">Track your resume feedback and improvement progress</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviewStats.totalReviews}</div>
            <p className="text-xs text-muted-foreground">Professional feedback received</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold">{reviewStats.averageRating}</div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(reviewStats.averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Quality of your resumes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${reviewStats.totalSpent}</div>
            <p className="text-xs text-muted-foreground">Invested in career growth</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Improvement Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviewStats.improvementScore}%</div>
            <Progress value={reviewStats.improvementScore} className="mt-2" />
            <p className="text-xs text-muted-foreground">Based on feedback implementation</p>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <Card>
        <CardHeader>
          <CardTitle>Review History</CardTitle>
          <CardDescription>Detailed feedback from professional reviewers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={review.reviewer.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {review.reviewer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{review.reviewer.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {review.reviewer.title} at {review.reviewer.company}
                      </p>
                      <p className="text-sm font-medium mt-1">{review.resume}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Feedback</h4>
                    <p className="text-sm text-muted-foreground">{review.feedback}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 text-green-700 dark:text-green-400">Strengths</h4>
                      <ul className="space-y-1">
                        {review.highlights.map((highlight, index) => (
                          <li key={index} className="text-sm flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-orange-700 dark:text-orange-400">Areas for Improvement</h4>
                      <ul className="space-y-1">
                        {review.improvements.map((improvement, index) => (
                          <li key={index} className="text-sm flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>Review cost: ${review.price}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" asChild>
                        <Link href={`/dashboard/customer/reviews/${review.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card>
        <CardContent className="pt-6 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Ready for another review?</h3>
          <p className="text-muted-foreground mb-4">
            Keep improving your resume with feedback from industry professionals.
          </p>
          <Button asChild>
            <Link href="/dashboard/customer/reviewers">Find a Reviewer</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
