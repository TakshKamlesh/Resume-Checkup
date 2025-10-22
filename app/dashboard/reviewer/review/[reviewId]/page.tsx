"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, FileText, User, Briefcase, GraduationCap, Code, Send, Save, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function ReviewPage({ params }: { params: { reviewId: string } }) {
  const [feedback, setFeedback] = useState({
    overallRating: "",
    strengths: "",
    improvements: "",
    specificFeedback: "",
    recommendations: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Mock customer data - in real app, fetch by reviewId
  const customer = {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    title: "Software Engineer",
    location: "San Francisco, CA",
    avatar: "/professional-headshot.png",
    bio: "Passionate software engineer with 3+ years of experience in full-stack development. Looking to transition into senior roles at innovative tech companies.",
    experience: [
      {
        company: "TechCorp Inc.",
        position: "Software Engineer",
        duration: "2022 - Present",
        description: "Developed and maintained web applications using React and Node.js, serving 100K+ users",
      },
      {
        company: "StartupXYZ",
        position: "Junior Developer",
        duration: "2021 - 2022",
        description: "Built responsive web interfaces and collaborated with design team on user experience",
      },
    ],
    education: [
      {
        institution: "University of California, Berkeley",
        degree: "Bachelor of Science in Computer Science",
        duration: "2017 - 2021",
        gpa: "3.8",
      },
    ],
    skills: ["JavaScript", "React", "Node.js", "Python", "SQL", "AWS", "Docker"],
    resumeTitle: "Senior Software Engineer Resume",
    targetRole: "Senior Software Engineer at FAANG companies",
  }

  const handleSubmitReview = async () => {
    if (!feedback.overallRating || !feedback.strengths || !feedback.improvements) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required feedback sections.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate review submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Review submitted successfully!",
        description: "Your feedback has been sent to the customer.",
      })
      // In real app, redirect to reviews list
    }, 2000)
  }

  const handleSaveDraft = () => {
    toast({
      title: "Draft saved",
      description: "Your review progress has been saved.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/reviewer/reviews">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Reviews
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Review Resume</h1>
          <p className="text-muted-foreground">Provide detailed feedback for {customer.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Profile & Resume */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Customer Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={customer.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-lg">
                    {customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{customer.name}</h3>
                  <p className="text-sm text-muted-foreground">{customer.title}</p>
                  <p className="text-sm text-muted-foreground">{customer.location}</p>
                </div>
              </div>
              <p className="text-sm">{customer.bio}</p>
              <div>
                <p className="font-medium text-sm mb-2">Target Role:</p>
                <Badge variant="secondary">{customer.targetRole}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Resume Details */}
          <Tabs defaultValue="experience" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="resume">Resume</TabsTrigger>
            </TabsList>

            <TabsContent value="experience">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Briefcase className="h-5 w-5" />
                    <span>Work Experience</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customer.experience.map((exp, index) => (
                      <div key={index}>
                        {index > 0 && <Separator className="mb-4" />}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{exp.position}</h4>
                            <Badge variant="outline">{exp.duration}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{exp.company}</p>
                          <p className="text-sm">{exp.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <GraduationCap className="h-5 w-5" />
                    <span>Education</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customer.education.map((edu, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{edu.degree}</h4>
                          <Badge variant="outline">{edu.duration}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{edu.institution}</p>
                        <p className="text-sm">GPA: {edu.gpa}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Code className="h-5 w-5" />
                    <span>Skills</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {customer.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resume">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Resume Document</span>
                  </CardTitle>
                  <CardDescription>{customer.resumeTitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="font-medium mb-2">{customer.resumeTitle}</p>
                    <p className="text-sm text-muted-foreground mb-4">PDF Document • 2.4 MB</p>
                    <Button>
                      <Download className="h-4 w-4 mr-2" />
                      Download Resume
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Feedback Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Provide Feedback</CardTitle>
              <CardDescription>Share your professional insights and recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="rating">Overall Rating (1-5) *</Label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  placeholder="Rate from 1 to 5"
                  value={feedback.overallRating}
                  onChange={(e) => setFeedback({ ...feedback, overallRating: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="strengths">Key Strengths *</Label>
                <Textarea
                  id="strengths"
                  placeholder="What are the strongest aspects of this resume?"
                  value={feedback.strengths}
                  onChange={(e) => setFeedback({ ...feedback, strengths: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="improvements">Areas for Improvement *</Label>
                <Textarea
                  id="improvements"
                  placeholder="What specific areas need improvement?"
                  value={feedback.improvements}
                  onChange={(e) => setFeedback({ ...feedback, improvements: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specific">Specific Feedback</Label>
                <Textarea
                  id="specific"
                  placeholder="Detailed section-by-section feedback..."
                  value={feedback.specificFeedback}
                  onChange={(e) => setFeedback({ ...feedback, specificFeedback: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recommendations">Recommendations</Label>
                <Textarea
                  id="recommendations"
                  placeholder="Next steps and actionable recommendations..."
                  value={feedback.recommendations}
                  onChange={(e) => setFeedback({ ...feedback, recommendations: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex space-x-2">
                <Button onClick={handleSaveDraft} variant="outline" className="flex-1 bg-transparent">
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                <Button onClick={handleSubmitReview} disabled={isSubmitting} className="flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
