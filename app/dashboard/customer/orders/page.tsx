"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, CheckCircle, MessageSquare, Star, FileText, Download, Eye } from "lucide-react"
import Link from "next/link"

export default function OrdersPage() {
  const orders = [
    {
      id: 1,
      reviewer: {
        name: "Sarah Johnson",
        title: "Senior Software Engineering Manager",
        company: "Google",
        avatar: "/professional-woman-tech.png",
      },
      resume: "Software Engineer Resume v3",
      status: "completed",
      orderDate: "2024-01-18T10:30:00Z",
      completedDate: "2024-01-19T16:20:00Z",
      price: 45,
      rating: 5,
      hasUnreadMessages: false,
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
      status: "in-progress",
      orderDate: "2024-01-19T14:15:00Z",
      price: 40,
      hasUnreadMessages: true,
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
      status: "pending",
      orderDate: "2024-01-20T09:45:00Z",
      price: 50,
      hasUnreadMessages: false,
    },
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
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

  const activeOrders = orders.filter((order) => order.status !== "completed")
  const completedOrders = orders.filter((order) => order.status === "completed")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Orders</h1>
        <p className="text-muted-foreground">Track your resume review orders and feedback</p>
      </div>

      {/* Order Tabs */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active" className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>Active ({activeOrders.length})</span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4" />
            <span>Completed ({completedOrders.length})</span>
          </TabsTrigger>
        </TabsList>

        {/* Active Orders */}
        <TabsContent value="active">
          <div className="space-y-4">
            {activeOrders.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">No active orders</h3>
                  <p className="text-muted-foreground mb-4">You don't have any active resume reviews.</p>
                  <Button asChild>
                    <Link href="/dashboard/customer/reviewers">Find a Reviewer</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              activeOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={order.reviewer.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {order.reviewer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold">{order.reviewer.name}</h3>
                            {getStatusBadge(order.status)}
                            {order.hasUnreadMessages && (
                              <Badge variant="destructive" className="text-xs">
                                New Message
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {order.reviewer.title} at {order.reviewer.company}
                          </p>
                          <p className="text-sm mb-2">Resume: {order.resume}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>Ordered: {formatDate(order.orderDate)}</span>
                            <span className="text-green-600 font-medium">${order.price}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/customer/messages/${order.id}`}>
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Message
                          </Link>
                        </Button>
                        {order.status === "in-progress" && (
                          <Button size="sm" asChild>
                            <Link href={`/dashboard/customer/orders/${order.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Completed Orders */}
        <TabsContent value="completed">
          <div className="space-y-4">
            {completedOrders.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">No completed orders</h3>
                  <p className="text-muted-foreground mb-4">You haven't completed any resume reviews yet.</p>
                  <Button asChild>
                    <Link href="/dashboard/customer/reviewers">Get Your First Review</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              completedOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={order.reviewer.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {order.reviewer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold">{order.reviewer.name}</h3>
                            {getStatusBadge(order.status)}
                            {order.rating && (
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs">{order.rating}/5</span>
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {order.reviewer.title} at {order.reviewer.company}
                          </p>
                          <p className="text-sm mb-2">Resume: {order.resume}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>Completed: {order.completedDate && formatDate(order.completedDate)}</span>
                            <span className="text-green-600 font-medium">${order.price}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/customer/orders/${order.id}/feedback`}>
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Link>
                        </Button>
                        <Button size="sm" asChild>
                          <Link href={`/dashboard/customer/orders/${order.id}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
