"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Send, Paperclip, Download, FileText, Clock, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function ConversationPage({ params }: { params: { conversationId: string } }) {
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Mock conversation data - in real app, fetch by conversationId
  const conversation = {
    id: 1,
    reviewer: {
      name: "Sarah Johnson",
      title: "Senior Software Engineering Manager",
      company: "Google",
      avatar: "/professional-woman-tech.png",
    },
    status: "completed",
    resumeTitle: "Software Engineer Resume v3",
    orderDate: "2024-01-18T10:30:00Z",
  }

  const messages = [
    {
      id: 1,
      sender: "reviewer",
      content: "Hi! I've received your resume and I'm excited to help you improve it. I'll start reviewing it today.",
      timestamp: "2024-01-18T11:00:00Z",
      type: "text",
    },
    {
      id: 2,
      sender: "customer",
      content:
        "Thank you! I'm particularly interested in feedback on how to better highlight my leadership experience and technical skills.",
      timestamp: "2024-01-18T11:15:00Z",
      type: "text",
    },
    {
      id: 3,
      sender: "reviewer",
      content:
        "Perfect! Those are exactly the areas I focus on. I have a few questions: What's your target role level? Are you looking at specific companies?",
      timestamp: "2024-01-18T14:30:00Z",
      type: "text",
    },
    {
      id: 4,
      sender: "customer",
      content:
        "I'm targeting Senior Software Engineer roles at companies like Google, Meta, and Netflix. I want to emphasize my system design experience.",
      timestamp: "2024-01-18T15:45:00Z",
      type: "text",
    },
    {
      id: 5,
      sender: "reviewer",
      content: "Excellent context! I'll tailor my feedback accordingly. I'll have your review ready by tomorrow.",
      timestamp: "2024-01-19T09:20:00Z",
      type: "text",
    },
    {
      id: 6,
      sender: "reviewer",
      content: "I've completed your resume review! Please find the detailed feedback document attached.",
      timestamp: "2024-01-20T14:30:00Z",
      type: "text",
      attachment: {
        name: "Resume_Review_Feedback.pdf",
        size: "2.4 MB",
        type: "pdf",
      },
    },
    {
      id: 7,
      sender: "reviewer",
      content:
        "Key highlights: Your technical skills are impressive, and I've suggested ways to better quantify your impact. The leadership section needs more specific examples. Overall, strong foundation!",
      timestamp: "2024-01-20T14:32:00Z",
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
        description: "Your message has been delivered to the reviewer.",
      })
      setNewMessage("")
    }, 1000)
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/customer/messages">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Messages
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={conversation.reviewer.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {conversation.reviewer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold text-foreground">{conversation.reviewer.name}</h1>
              <p className="text-sm text-muted-foreground">
                {conversation.reviewer.title} at {conversation.reviewer.company}
              </p>
            </div>
            {getStatusBadge(conversation.status)}
          </div>
        </div>
      </div>

      {/* Order Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <FileText className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">{conversation.resumeTitle}</p>
              <p className="text-sm text-muted-foreground">
                Order placed: {new Date(conversation.orderDate).toLocaleDateString()}
              </p>
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
                className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === "customer"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.attachment && (
                    <div className="mt-2 p-2 bg-background/10 rounded border">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <div className="flex-1">
                          <p className="text-xs font-medium">{message.attachment.name}</p>
                          <p className="text-xs opacity-75">{message.attachment.size}</p>
                        </div>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                  <p className="text-xs opacity-75 mt-1">{formatTimestamp(message.timestamp)}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground rounded-lg p-3">
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
            <p className="text-xs text-muted-foreground mt-2">Press Enter to send, Shift+Enter for new line</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
