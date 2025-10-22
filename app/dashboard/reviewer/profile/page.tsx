"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { User, Briefcase, Star, Globe, Edit, Save, Plus, X, Linkedin, Twitter, Github } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ReviewerProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [specialties, setSpecialties] = useState([
    "Software Engineering",
    "Frontend Development",
    "System Design",
    "Technical Leadership",
  ])
  const [newSpecialty, setNewSpecialty] = useState("")
  const { toast } = useToast()

  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    title: "Senior Software Engineering Manager",
    company: "Google",
    bio: "Senior Software Engineering Manager at Google with 8+ years of experience in full-stack development and team leadership. I specialize in helping engineers at all levels craft compelling resumes that showcase their technical skills and career progression.",
    hourlyRate: "45",
    experience: [
      {
        company: "Google",
        position: "Senior Software Engineering Manager",
        duration: "2020 - Present",
        description: "Leading a team of 12 engineers, architecting scalable systems, and mentoring junior developers",
      },
      {
        company: "Facebook (Meta)",
        position: "Senior Software Engineer",
        duration: "2018 - 2020",
        description: "Built and maintained high-traffic web applications serving millions of users",
      },
      {
        company: "Airbnb",
        position: "Software Engineer",
        duration: "2016 - 2018",
        description: "Developed booking platform features and improved system performance",
      },
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/in/sarahjohnson",
      twitter: "https://twitter.com/sarahj_dev",
      github: "https://github.com/sarahjohnson",
    },
  })

  const reviewStats = {
    totalReviews: 127,
    averageRating: 4.9,
    responseTime: "< 24 hours",
    completionRate: 98,
  }

  const recentFeedback = [
    {
      id: 1,
      customer: "Alex Chen",
      rating: 5,
      comment:
        "Sarah provided incredibly detailed feedback on my resume. Her insights on technical skills presentation were spot-on and helped me land interviews at top tech companies.",
      date: "2 days ago",
    },
    {
      id: 2,
      customer: "Maria Rodriguez",
      rating: 5,
      comment:
        "Excellent review! Sarah's experience at Google really shows. She helped me restructure my experience section and highlight my leadership skills better.",
      date: "1 week ago",
    },
    {
      id: 3,
      customer: "David Kim",
      rating: 4,
      comment: "Very thorough feedback with actionable suggestions. The turnaround time was impressive too.",
      date: "2 weeks ago",
    },
  ]

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your reviewer profile has been successfully updated.",
    })
  }

  const addSpecialty = () => {
    if (newSpecialty.trim() && !specialties.includes(newSpecialty.trim())) {
      setSpecialties([...specialties, newSpecialty.trim()])
      setNewSpecialty("")
    }
  }

  const removeSpecialty = (specialtyToRemove: string) => {
    setSpecialties(specialties.filter((specialty) => specialty !== specialtyToRemove))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reviewer Profile</h1>
          <p className="text-muted-foreground">Manage your professional information and pricing</p>
        </div>
        <Button onClick={isEditing ? handleSave : () => setIsEditing(true)} className="flex items-center space-x-2">
          {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
          <span>{isEditing ? "Save Changes" : "Edit Profile"}</span>
        </Button>
      </div>

      {/* Profile Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Professional Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/professional-woman-tech.png" />
              <AvatarFallback className="text-lg">SJ</AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button variant="outline" size="sm">
                Change Photo
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Current Title</Label>
              <Input
                id="title"
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={profile.company}
                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Hourly Rate ($)</Label>
              <Input
                id="rate"
                type="number"
                value={profile.hourlyRate}
                onChange={(e) => setProfile({ ...profile, hourlyRate: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                disabled={!isEditing}
                rows={4}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Review Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5" />
            <span>Review Statistics</span>
          </CardTitle>
          <CardDescription>Your performance as a reviewer</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{reviewStats.totalReviews}</div>
              <p className="text-sm text-muted-foreground">Total Reviews</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-2xl font-bold">{reviewStats.averageRating}</span>
              </div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{reviewStats.responseTime}</div>
              <p className="text-sm text-muted-foreground">Response Time</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{reviewStats.completionRate}%</div>
              <p className="text-sm text-muted-foreground">Completion Rate</p>
              <Progress value={reviewStats.completionRate} className="mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Specialties */}
      <Card>
        <CardHeader>
          <CardTitle>Review Specialties</CardTitle>
          <CardDescription>Areas of expertise for resume reviews</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary" className="flex items-center space-x-1">
                  <span>{specialty}</span>
                  {isEditing && (
                    <button onClick={() => removeSpecialty(specialty)} className="ml-1 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <div className="flex space-x-2">
                <Input
                  placeholder="Add a specialty"
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addSpecialty()}
                />
                <Button onClick={addSpecialty} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Work Experience */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5" />
            <span>Work Experience</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {profile.experience.map((exp, index) => (
              <div key={index}>
                {index > 0 && <Separator className="mb-6" />}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{exp.position}</h3>
                    <Badge variant="outline">{exp.duration}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                  <p className="text-sm">{exp.description}</p>
                </div>
              </div>
            ))}
            {isEditing && (
              <Button variant="outline" className="w-full bg-transparent">
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Social Media Links</span>
          </CardTitle>
          <CardDescription>Professional social media profiles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Linkedin className="h-5 w-5 text-blue-600" />
              <Input
                value={profile.socialLinks.linkedin}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socialLinks: { ...profile.socialLinks, linkedin: e.target.value },
                  })
                }
                disabled={!isEditing}
                placeholder="LinkedIn profile URL"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Twitter className="h-5 w-5 text-blue-400" />
              <Input
                value={profile.socialLinks.twitter}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socialLinks: { ...profile.socialLinks, twitter: e.target.value },
                  })
                }
                disabled={!isEditing}
                placeholder="Twitter profile URL"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Github className="h-5 w-5 text-gray-800 dark:text-gray-200" />
              <Input
                value={profile.socialLinks.github}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socialLinks: { ...profile.socialLinks, github: e.target.value },
                  })
                }
                disabled={!isEditing}
                placeholder="GitHub profile URL"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Customer Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Customer Feedback</CardTitle>
          <CardDescription>What customers are saying about your reviews</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recentFeedback.map((feedback) => (
              <div key={feedback.id}>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">{feedback.customer}</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">{feedback.date}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{feedback.comment}</p>
                {feedback.id < recentFeedback.length && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
