"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MessageSquare, Clock, CheckCircle, FileText, DollarSign } from "lucide-react"
import Link from "next/link"

export default function ReviewerMessages() {
  const [searchTerm, setSearchTerm] = useState("")

  const conversations = [
    {
      id: 1,
      customer: {
        name: "Alex Johnson",
        avatar: "/professional-headshot.png",
      },
      lastMessage: {
        content: "Thank you for the detailed feedback! This is exactly what I needed to improve my resume.",
        timestamp: "2024-01-20T16:45:00Z",
        sender: "customer",
      },
      unreadCount: 1,
      status: "completed",
      resumeTitle: "Senior Software Engineer Resume",
      price: 45,
      deadline: "2024-01-22T23:59:59Z",
    },
    {
      id: 2,
      customer: {
        name: "Maria Garcia",
        avatar: "/professional-woman-diverse.png",
      },
      lastMessage: {
        content: "I've uploaded the updated version with more details about my React projects as you suggested.",
        timestamp: "2024-01-20T14:20:00Z",
        sender: "customer",
      },
      unreadCount: 0,
      status: "in-progress",
      resumeTitle: "Frontend Developer Resume",
      price: 35,
      deadline: "2024-01-23T23:59:59Z",
    },
    {
      id: 3,
      customer: {
        name: "David Chen",
        avatar: "/professional-man.png",
      },
      lastMessage: {
        content: "Hi Sarah, I have some questions about the system design section before you start the review.",
        timestamp: "2024-01-20T09:30:00Z",
        sender: "customer",
      },
      unreadCount: 2,
      status: "pending",
      resumeTitle: "Full Stack Developer Resume",
      price: 50,
      deadline: "2024-01-21T23:59:59Z",
    },
  ]

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
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

  const getDeadlineStatus = (deadline: string) => {
    const deadlineDate = new Date(deadline)
    const now = new Date()
    const diffTime = deadlineDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return { text: "Overdue", color: "text-red-600" }
    if (diffDays === 0) return { text: "Due today", color: "text-orange-600" }
    if (diffDays === 1) return { text: "Due tomorrow", color: "text-yellow-600" }
    return { text: `${diffDays} days left`, color: "text-muted-foreground" }
  }

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.resumeTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground">Communicate with your clients</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Conversations List */}
      <div className="space-y-4">
        {filteredConversations.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No conversations found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "No conversations match your search." : "You don't have any messages yet."}
              </p>
              {!searchTerm && (
                <Button asChild>
                  <Link href="/dashboard/reviewer/reviews">Check Review Queue</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredConversations.map((conversation) => {
            const deadlineStatus = getDeadlineStatus(conversation.deadline)
            return (
              <Card key={conversation.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <Link href={`/dashboard/reviewer/messages/${conversation.id}`}>
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.customer.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {conversation.customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{conversation.customer.name}</h3>
                            {getStatusBadge(conversation.status)}
                            {conversation.unreadCount > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {conversation.unreadCount} new
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(conversation.lastMessage.timestamp)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 mb-2">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{conversation.resumeTitle}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-3 w-3 text-green-600" />
                            <span className="text-xs font-medium text-green-600">${conversation.price}</span>
                          </div>
                          <span className={`text-xs ${deadlineStatus.color}`}>{deadlineStatus.text}</span>
                        </div>
                        <p
                          className={`text-sm truncate ${
                            conversation.unreadCount > 0 ? "font-medium" : "text-muted-foreground"
                          }`}
                        >
                          {conversation.lastMessage.sender === "customer" ? "" : "You: "}
                          {conversation.lastMessage.content}
                        </p>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
