"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Star, Download, MessageSquare, CheckCircle, Clock, FileText } from "lucide-react"
import Link from "next/link"

export default function OrderDetailsPage({ params }: { params: { orderId: string } }) {
  // Mock order data - in real app, fetch by orderId
  const order = {
    id: 1,
    reviewer: {
      name: "Sarah Johnson",
      title: "Senior Software Engineering Manager",
      company: "Google",
      avatar: "/professional-woman-tech.png",
      rating: 4.9,
      reviewCount: 127,
    },
    resume: "Software Engineer Resume v3",
    status: "completed",
    orderDate: "2024-01-18T10:30:00Z",
    completedDate: "2024-01-20T14:30:00Z",
    price: 45,
    customerRating: 5,
    progress: 100,
    timeline: [
      {
        status: "ordered",
        title: "Order Placed",
        description: "Payment processed successfully",
        timestamp: "2024-01-18T10:30:00Z",
        completed: true,
      },
      {
        status: "accepted",
        title: "Review Started",
        description: "Reviewer began working on your resume",
        timestamp: "2024-01-18T11:00:00Z",
        completed: true,
      },
      {
        status: "in-progress",
        title: "Review in Progress",
        description: "Detailed feedback being prepared",
        timestamp: "2024-01-19T09:00:00Z",
        completed: true,
      },
      {
        status: "completed",
        title: "Review Completed",
        description: "Feedback delivered and ready for download",
        timestamp: "2024-01-20T14:30:00Z",
        completed: true,
      },
    ],
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      case "in-progress":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
            <Clock className="h-3 w-3 mr-1" />
            In Progress
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
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
          <h1 className="text-3xl font-bold text-foreground">Order Details</h1>
          <p className="text-muted-foreground">
            Order #{order.id} • {order.resume}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Status & Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Order Status</CardTitle>
                {getStatusBadge(order.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">{order.progress}%</span>
                  </div>
                  <Progress value={order.progress} className="w-full" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Order Date</p>
                    <p className="font-medium">{new Date(order.orderDate).toLocaleDateString()}</p>
                  </div>
                  {order.completedDate && (
                    <div>
                      <p className="text-muted-foreground">Completed Date</p>
                      <p className="font-medium">{new Date(order.completedDate).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
              <CardDescription>Track the progress of your resume review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.timeline.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        item.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {item.completed ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium ${item.completed ? "text-foreground" : "text-muted-foreground"}`}>
                        {item.title}
                      </p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{new Date(item.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          {order.status === "completed" && (
            <Card>
              <CardHeader>
                <CardTitle>Review Complete!</CardTitle>
                <CardDescription>Your resume review is ready</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="flex-1" asChild>
                    <Link href={`/dashboard/customer/feedback/${order.id}`}>
                      <FileText className="h-4 w-4 mr-2" />
                      View Feedback
                    </Link>
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Download Review
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent" asChild>
                    <Link href={`/dashboard/customer/messages/${order.id}`}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message Reviewer
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Reviewer Info & Order Summary */}
        <div className="space-y-6">
          {/* Reviewer Info */}
          <Card>
            <CardHeader>
              <CardTitle>Your Reviewer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={order.reviewer.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {order.reviewer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{order.reviewer.name}</p>
                    <p className="text-sm text-muted-foreground">{order.reviewer.title}</p>
                    <p className="text-sm text-muted-foreground">{order.reviewer.company}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{order.reviewer.rating}</span>
                  </div>
                  <span className="text-muted-foreground">{order.reviewer.reviewCount} reviews</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Resume Review</span>
                  <span className="text-sm font-medium">${order.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Service Fee</span>
                  <span className="text-sm text-muted-foreground">$5</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Total Paid</span>
                    <span className="font-medium">${order.price + 5}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rating */}
          {order.status === "completed" && order.customerRating && (
            <Card>
              <CardHeader>
                <CardTitle>Your Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < order.customerRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">You rated this review {order.customerRating}/5</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
