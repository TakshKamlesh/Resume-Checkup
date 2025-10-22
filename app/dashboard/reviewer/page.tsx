"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, Star, DollarSign, Clock, CheckCircle, Eye, MessageSquare, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function ReviewerDashboard() {
  const stats = [
    {
      title: "Reviews Completed",
      value: "127",
      icon: CheckCircle,
      description: "Total reviews finished",
    },
    {
      title: "Average Rating",
      value: "4.9",
      icon: Star,
      description: "Customer satisfaction",
    },
    {
      title: "Monthly Earnings",
      value: "$2,340",
      icon: DollarSign,
      description: "This month's revenue",
    },
    {
      title: "Pending Reviews",
      value: "8",
      icon: Clock,
      description: "Awaiting your feedback",
    },
  ]

  const pendingReviews = [
    {
      id: 1,
      customer: "Alex Johnson",
      title: "Senior Software Engineer Resume",
      submittedDate: "2 hours ago",
      deadline: "2 days",
      price: "$45",
      priority: "high",
      avatar: "/professional-headshot.png",
    },
    {
      id: 2,
      customer: "Maria Garcia",
      title: "Frontend Developer Resume",
      submittedDate: "1 day ago",
      deadline: "3 days",
      price: "$35",
      priority: "medium",
      avatar: "/professional-woman-diverse.png",
    },
    {
      id: 3,
      customer: "David Chen",
      title: "Full Stack Developer Resume",
      submittedDate: "2 days ago",
      deadline: "1 day",
      price: "$50",
      priority: "urgent",
      avatar: "/professional-man.png",
    },
  ]

  const recentCompletedReviews = [
    {
      id: 1,
      customer: "Sarah Wilson",
      rating: 5,
      feedback: "Excellent feedback! Very detailed and actionable advice.",
      completedDate: "1 day ago",
      earnings: "$40",
    },
    {
      id: 2,
      customer: "Mike Thompson",
      rating: 5,
      feedback: "Great insights on technical skills presentation.",
      completedDate: "3 days ago",
      earnings: "$35",
    },
    {
      id: 3,
      customer: "Lisa Brown",
      rating: 4,
      feedback: "Good suggestions, helped improve my resume significantly.",
      completedDate: "1 week ago",
      earnings: "$45",
    },
  ]

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100">High</Badge>
      case "medium":
        return <Badge variant="secondary">Medium</Badge>
      default:
        return <Badge variant="outline">Low</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, Sarah!</h1>
        <p className="text-muted-foreground">Here's your review dashboard and pending work</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Review Queue</CardTitle>
            <CardDescription>Resumes waiting for your feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingReviews.map((review) => (
                <div key={review.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {review.customer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{review.customer}</p>
                      <p className="text-sm text-muted-foreground truncate">{review.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-muted-foreground">Due in {review.deadline}</span>
                        <span className="text-xs font-medium text-green-600">{review.price}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getPriorityBadge(review.priority)}
                    <Button size="sm" asChild>
                      <Link href={`/dashboard/reviewer/review/${review.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        Review
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/dashboard/reviewer/reviews">View All Reviews</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Completed Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
            <CardDescription>Customer ratings and comments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCompletedReviews.map((review) => (
                <div key={review.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{review.customer}</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs ml-1">{review.rating}</span>
                      </div>
                      <span className="text-xs text-green-600 font-medium">{review.earnings}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.feedback}</p>
                  <p className="text-xs text-muted-foreground">{review.completedDate}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/dashboard/reviewer/profile">View All Feedback</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your reviewer profile and settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="justify-start" asChild>
              <Link href="/dashboard/reviewer/profile">
                <FileText className="h-4 w-4 mr-2" />
                Update Profile
              </Link>
            </Button>
            <Button variant="outline" className="justify-start bg-transparent" asChild>
              <Link href="/dashboard/reviewer/messages">
                <MessageSquare className="h-4 w-4 mr-2" />
                Check Messages
              </Link>
            </Button>
            <Button variant="outline" className="justify-start bg-transparent" asChild>
              <Link href="/dashboard/reviewer/settings">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Analytics
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
