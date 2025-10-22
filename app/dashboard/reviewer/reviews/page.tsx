"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, CheckCircle, Eye, Search, Filter, Star, DollarSign } from "lucide-react"
import Link from "next/link"

export default function ReviewerReviews() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const pendingReviews = [
    {
      id: 1,
      customer: "Alex Johnson",
      title: "Senior Software Engineer Resume",
      submittedDate: "2024-01-20T10:30:00Z",
      deadline: "2024-01-22T23:59:59Z",
      price: 45,
      priority: "high",
      avatar: "/professional-headshot.png",
      description: "Looking for feedback on technical skills presentation and leadership experience",
    },
    {
      id: 2,
      customer: "Maria Garcia",
      title: "Frontend Developer Resume",
      submittedDate: "2024-01-19T14:15:00Z",
      deadline: "2024-01-23T23:59:59Z",
      price: 35,
      priority: "medium",
      avatar: "/professional-woman-diverse.png",
      description: "Need help highlighting React and JavaScript expertise",
    },
    {
      id: 3,
      customer: "David Chen",
      title: "Full Stack Developer Resume",
      submittedDate: "2024-01-18T09:45:00Z",
      deadline: "2024-01-21T23:59:59Z",
      price: 50,
      priority: "urgent",
      avatar: "/professional-man.png",
      description: "Transitioning from backend to full-stack, need comprehensive review",
    },
  ]

  const completedReviews = [
    {
      id: 4,
      customer: "Sarah Wilson",
      title: "Data Scientist Resume",
      completedDate: "2024-01-19T16:20:00Z",
      rating: 5,
      earnings: 40,
      feedback: "Excellent feedback! Very detailed and actionable advice.",
      avatar: "/professional-woman-tech.png",
    },
    {
      id: 5,
      customer: "Mike Thompson",
      title: "DevOps Engineer Resume",
      completedDate: "2024-01-17T11:30:00Z",
      rating: 5,
      earnings: 35,
      feedback: "Great insights on technical skills presentation.",
      avatar: "/professional-man.png",
    },
    {
      id: 6,
      customer: "Lisa Brown",
      title: "Product Manager Resume",
      completedDate: "2024-01-15T14:45:00Z",
      rating: 4,
      earnings: 45,
      feedback: "Good suggestions, helped improve my resume significantly.",
      avatar: "/professional-woman-diverse.png",
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  const getTimeUntilDeadline = (deadlineString: string) => {
    const deadline = new Date(deadlineString)
    const now = new Date()
    const diffTime = deadline.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return "Overdue"
    if (diffDays === 0) return "Due today"
    if (diffDays === 1) return "Due tomorrow"
    return `${diffDays} days left`
  }

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
        <h1 className="text-3xl font-bold text-foreground">Review Management</h1>
        <p className="text-muted-foreground">Manage your pending and completed resume reviews</p>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by customer name or resume title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reviews</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Review Tabs */}
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending" className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>Pending ({pendingReviews.length})</span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4" />
            <span>Completed ({completedReviews.length})</span>
          </TabsTrigger>
        </TabsList>

        {/* Pending Reviews */}
        <TabsContent value="pending">
          <div className="space-y-4">
            {pendingReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={review.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {review.customer
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{review.customer}</h3>
                          {getPriorityBadge(review.priority)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{review.title}</p>
                        <p className="text-sm mb-3">{review.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Submitted: {formatDate(review.submittedDate)}</span>
                          <span>Deadline: {getTimeUntilDeadline(review.deadline)}</span>
                          <span className="text-green-600 font-medium">${review.price}</span>
                        </div>
                      </div>
                    </div>
                    <Button asChild>
                      <Link href={`/dashboard/reviewer/review/${review.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        Start Review
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Completed Reviews */}
        <TabsContent value="completed">
          <div className="space-y-4">
            {completedReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={review.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {review.customer
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1">{review.customer}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{review.title}</p>
                        <p className="text-sm mb-3">{review.feedback}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Completed: {formatDate(review.completedDate)}</span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{review.rating}/5</span>
                          </div>
                          <div className="flex items-center space-x-1 text-green-600 font-medium">
                            <DollarSign className="h-3 w-3" />
                            <span>{review.earnings}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="flex items-center space-x-1">
                      <CheckCircle className="h-3 w-3" />
                      <span>Completed</span>
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
