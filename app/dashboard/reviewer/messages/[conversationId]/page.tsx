"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Send, Paperclip, Upload, FileText, Clock, CheckCircle, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function ReviewerConversationPage({ params }: { params: { conversationId: string } }) {
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Mock conversation data - in real app, fetch by conversationId
  const conversation = {
    id: 1,
    customer: {
      name: "Alex Johnson",
      avatar: "/professional-headshot.png",
    },
    status: "in-progress",
    resumeTitle: "Senior Software Engineer Resume",
    price: 45,
    orderDate: "2024-01-18T10:30:00Z",
    deadline: "2024-01-22T23:59:59Z",
  }

  const messages = [
    {
      id: 1,
      sender: "customer",
      content:
        "Hi Sarah! I'm excited to work with you on my resume. I'm targeting Senior Software Engineer roles at FAANG companies.",
      timestamp: "2024-01-18T11:00:00Z",
      type: "text",
    },
    {
      id: 2,
      sender: "reviewer",
      content:
        "Hello Alex! Great to work with you. I have extensive experience helping engineers land roles at top tech companies. Let me start by asking a few questions to tailor my feedback.",
      timestamp: "2024-01-18T11:15:00Z",
      type: "text",
    },
    {
      id: 3,
      sender: "reviewer",
      content:
        "What specific areas would you like me to focus on? Also, do you have any particular companies in mind beyond the typical FAANG list?",
      timestamp: "2024-01-18T11:16:00Z",
      type: "text",
    },
    {
      id: 4,
      sender: "customer",
      content:
        "I'd love feedback on highlighting my system design experience and leadership skills. I'm particularly interested in Google, Meta, and Netflix. I want to show progression from individual contributor to tech lead.",
      timestamp: "2024-01-18T14:30:00Z",
      type: "text",
    },
    {
      id: 5,
      sender: "reviewer",
      content:
        "Perfect! Those are exactly the areas I specialize in. I'll focus on quantifying your impact and showcasing your technical leadership. I'll have detailed feedback ready by tomorrow.",
      timestamp: "2024-01-19T09:20:00Z",
      type: "text",
    },
    {
      id: 6,
      sender: "customer",
      content: "Thank you for the detailed feedback! This is exactly what I needed to improve my resume.",
      timestamp: "2024-01-20T16:45:00Z",
      type: "text",
    },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    // Simulate sending message
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      toast({
        title: "Message sent",
        description: "Your message has been delivered to the customer.",
      })
      setNewMessage("")
    }, 1000)
  }

  const handleUploadFeedback = () => {
    toast({
      title: "Feedback uploaded",
      description: "Your review feedback has been shared with the customer.",
    })
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
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

  const deadlineStatus = getDeadlineStatus(conversation.deadline)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/reviewer/messages">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Messages
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={conversation.customer.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {conversation.customer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold text-foreground">{conversation.customer.name}</h1>
              <p className="text-sm text-muted-foreground">Customer</p>
            </div>
            {getStatusBadge(conversation.status)}
          </div>
        </div>
      </div>

      {/* Order Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">{conversation.resumeTitle}</p>
                <p className="text-sm text-muted-foreground">
                  Order placed: {new Date(conversation.orderDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-600">${conversation.price}</span>
              </div>
              <span className={`text-sm ${deadlineStatus.color}`}>{deadlineStatus.text}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages */}
      <Card className="flex flex-col h-[600px]">
        <CardHeader>
          <CardTitle>Conversation</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          {/* Messages List */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "reviewer" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === "reviewer"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-75 mt-1">{formatTimestamp(message.timestamp)}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground rounded-lg p-3">
                  <p className="text-sm">Sending message...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <Separator />

          {/* Message Input */}
          <div className="pt-4">
            <div className="flex space-x-2">
              <div className="flex-1">
                <Textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  rows={2}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Button variant="outline" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button onClick={handleSendMessage} disabled={!newMessage.trim() || isTyping} size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">Press Enter to send, Shift+Enter for new line</p>
              <Button variant="outline" size="sm" onClick={handleUploadFeedback}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Feedback
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
