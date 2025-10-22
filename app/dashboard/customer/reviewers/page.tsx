"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Search, Filter, DollarSign, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ReviewersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSpecialty, setFilterSpecialty] = useState("all")
  const [sortBy, setSortBy] = useState("rating")

  const reviewers = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Software Engineering Manager",
      company: "Google",
      avatar: "/professional-woman-tech.png",
      rating: 4.9,
      reviewCount: 127,
      price: 45,
      responseTime: "< 24 hours",
      specialties: ["Software Engineering", "Technical Leadership", "System Design"],
      location: "San Francisco, CA",
      bio: "8+ years at top tech companies. I help engineers craft compelling resumes that showcase technical skills and career progression.",
      completionRate: 98,
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Principal Frontend Engineer",
      company: "Meta",
      avatar: "/professional-man.png",
      rating: 4.8,
      reviewCount: 89,
      price: 40,
      responseTime: "< 12 hours",
      specialties: ["Frontend Development", "React", "JavaScript"],
      location: "Seattle, WA",
      bio: "Frontend expert with experience at Meta and Netflix. Specialized in helping developers highlight their UI/UX skills.",
      completionRate: 96,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "Staff Data Scientist",
      company: "Airbnb",
      avatar: "/professional-woman-diverse.png",
      rating: 4.9,
      reviewCount: 156,
      price: 50,
      responseTime: "< 6 hours",
      specialties: ["Data Science", "Machine Learning", "Python"],
      location: "New York, NY",
      bio: "Data science leader with PhD in ML. I help data professionals showcase their analytical and technical expertise.",
      completionRate: 99,
    },
    {
      id: 4,
      name: "David Kim",
      title: "Senior DevOps Engineer",
      company: "Amazon",
      avatar: "/professional-headshot.png",
      rating: 4.7,
      reviewCount: 73,
      price: 35,
      responseTime: "< 48 hours",
      specialties: ["DevOps", "Cloud Architecture", "AWS"],
      location: "Austin, TX",
      bio: "DevOps specialist with expertise in cloud infrastructure. I help engineers highlight their operational skills.",
      completionRate: 94,
    },
  ]

  const filteredReviewers = reviewers.filter((reviewer) => {
    const matchesSearch =
      reviewer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reviewer.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesSpecialty = filterSpecialty === "all" || reviewer.specialties.includes(filterSpecialty)
    return matchesSearch && matchesSpecialty
  })

  const sortedReviewers = [...filteredReviewers].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "reviews":
        return b.reviewCount - a.reviewCount
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Find Reviewers</h1>
        <p className="text-muted-foreground">Browse experienced professionals to review your resume</p>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterSpecialty} onValueChange={setFilterSpecialty}>
              <SelectTrigger className="w-full lg:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                <SelectItem value="Software Engineering">Software Engineering</SelectItem>
                <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="DevOps">DevOps</SelectItem>
                <SelectItem value="Technical Leadership">Technical Leadership</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reviewers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedReviewers.map((reviewer) => (
          <Card key={reviewer.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={reviewer.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {reviewer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-lg">{reviewer.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{reviewer.rating}</span>
                      <span className="text-sm text-muted-foreground">({reviewer.reviewCount})</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{reviewer.title}</p>
                  <p className="text-sm font-medium text-primary">{reviewer.company}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{reviewer.location}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{reviewer.bio}</p>

              <div className="flex flex-wrap gap-1">
                {reviewer.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="flex items-center justify-center space-x-1">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-semibold text-green-600">${reviewer.price}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">per review</p>
                </div>
                <div>
                  <div className="flex items-center justify-center space-x-1">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold text-blue-600">{reviewer.responseTime}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">response</p>
                </div>
                <div>
                  <div className="flex items-center justify-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-semibold text-green-600">{reviewer.completionRate}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">completion</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1" asChild>
                  <Link href={`/dashboard/customer/checkout/${reviewer.id}`}>Select Reviewer</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/dashboard/customer/reviewers/${reviewer.id}`}>View Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedReviewers.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No reviewers found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
