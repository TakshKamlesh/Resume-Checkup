"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MessageSquare, Clock, CheckCircle, FileText } from "lucide-react"
import Link from "next/link"

export default function CustomerMessages() {
  const [searchTerm, setSearchTerm] = useState("")

  const conversations = [
    {
      id: 1,
      reviewer: {
        name: "Sarah Johnson",
        title: "Senior Software Engineering Manager",
        company: "Google",
        avatar: "/professional-woman-tech.png",
      },
      lastMessage: {
        content: "I've completed your resume review. The feedback document is attached with detailed suggestions.",
        timestamp: "2024-01-20T14:30:00Z",
        sender: "reviewer",
      },
      unreadCount: 2,
      status: "completed",
      resumeTitle: "Software Engineer Resume v3",
    },
    {
      id: 2,
      reviewer: {
        name: "Michael Chen",
        title: "Principal Frontend Engineer",
        company: "Meta",
        avatar: "/professional-man.png",
      },
      lastMessage: {
        content: "Thanks for the additional context about your React projects. I'll incorporate this into my review.",
        timestamp: "2024-01-20T10:15:00Z",
        sender: "reviewer",
      },
      unreadCount: 0,
      status: "in-progress",
      resumeTitle: "Frontend Developer Resume",
    },
    {
      id: 3,
      reviewer: {
        name: "Emily Rodriguez",
        title: "Staff Data Scientist",
        company: "Airbnb",
        avatar: "/professional-woman-diverse.png",
      },
      lastMessage: {
        content: "I have a few questions about your data science projects before I start the review.",
        timestamp: "2024-01-19T16:45:00Z",
        sender: "reviewer",
      },
      unreadCount: 1,
      status: "pending",
      resumeTitle: "Full Stack Developer Resume",
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

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.reviewer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.resumeTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground">Communicate with your resume reviewers</p>
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
                  <Link href="/dashboard/customer/reviewers">Find a Reviewer</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredConversations.map((conversation) => (
            <Card key={conversation.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <Link href={`/dashboard/customer/messages/${conversation.id}`}>
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={conversation.reviewer.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {conversation.reviewer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{conversation.reviewer.name}</h3>
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
                      <p className="text-sm text-muted-foreground mb-2">
                        {conversation.reviewer.title} at {conversation.reviewer.company}
                      </p>
                      <div className="flex items-center space-x-2 mb-2">
                        <FileText className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{conversation.resumeTitle}</span>
                      </div>
                      <p
                        className={`text-sm truncate ${
                          conversation.unreadCount > 0 ? "font-medium" : "text-muted-foreground"
                        }`}
                      >
                        {conversation.lastMessage.sender === "reviewer" ? "" : "You: "}
                        {conversation.lastMessage.content}
                      </p>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
