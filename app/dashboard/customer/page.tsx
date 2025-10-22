"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, Upload, Star, MessageSquare, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function CustomerDashboard() {
  const stats = [
    {
      title: "Resumes Uploaded",
      value: "3",
      icon: FileText,
      description: "Total resumes in your portfolio",
    },
    {
      title: "Reviews Received",
      value: "12",
      icon: Star,
      description: "Professional feedback received",
    },
    {
      title: "Average Rating",
      value: "4.8",
      icon: TrendingUp,
      description: "Quality of your resumes",
    },
    {
      title: "Active Reviews",
      value: "2",
      icon: Clock,
      description: "Currently being reviewed",
    },
  ]

  const recentReviews = [
    {
      id: 1,
      reviewer: "Sarah Johnson",
      rating: 5,
      status: "completed",
      date: "2 days ago",
      resume: "Software Engineer Resume v3",
      avatar: "/professional-woman-diverse.png",
    },
    {
      id: 2,
      reviewer: "Mike Chen",
      rating: 4,
      status: "in-progress",
      date: "1 week ago",
      resume: "Frontend Developer Resume",
      avatar: "/professional-man.png",
    },
    {
      id: 3,
      reviewer: "Emily Davis",
      rating: 5,
      status: "completed",
      date: "2 weeks ago",
      resume: "Full Stack Developer Resume",
      avatar: "/professional-woman-tech.png",
    },
  ]

  const profileCompletion = 85

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, John!</h1>
        <p className="text-muted-foreground">Here's what's happening with your resume reviews</p>
      </div>

      {/* Profile Completion Alert */}
      {profileCompletion < 100 && (
        <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <div className="flex-1">
                <h3 className="font-medium text-orange-900 dark:text-orange-100">
                  Complete your profile to get better reviews
                </h3>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  Your profile is {profileCompletion}% complete. Add more details to help reviewers provide targeted
                  feedback.
                </p>
                <div className="mt-2">
                  <Progress value={profileCompletion} className="w-full max-w-xs" />
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/customer/profile">Complete Profile</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

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
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with your resume review journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" asChild>
              <Link href="/dashboard/customer/upload">
                <Upload className="h-4 w-4 mr-2" />
                Upload New Resume
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
              <Link href="/dashboard/customer/profile">
                <FileText className="h-4 w-4 mr-2" />
                Update Profile
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
              <Link href="/dashboard/customer/messages">
                <MessageSquare className="h-4 w-4 mr-2" />
                Check Messages
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
            <CardDescription>Your latest resume feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReviews.map((review) => (
                <div key={review.id} className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {review.reviewer
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{review.reviewer}</p>
                    <p className="text-xs text-muted-foreground truncate">{review.resume}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {review.status === "completed" ? (
                      <>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs ml-1">{review.rating}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Done
                        </Badge>
                      </>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        In Progress
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/dashboard/customer/reviews">View All Reviews</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
