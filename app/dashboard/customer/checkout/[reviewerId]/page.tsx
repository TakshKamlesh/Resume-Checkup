"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, FileText, CreditCard, Shield, ArrowLeft, Clock, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function CheckoutPage({ params }: { params: { reviewerId: string } }) {
  const [selectedResume, setSelectedResume] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Mock reviewer data - in real app, fetch by reviewerId
  const reviewer = {
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
    completionRate: 98,
  }

  const userResumes = [
    {
      id: 1,
      title: "Software Engineer Resume v3",
      uploadDate: "2024-01-15",
      status: "active",
    },
    {
      id: 2,
      title: "Frontend Developer Resume",
      uploadDate: "2024-01-10",
      status: "active",
    },
    {
      id: 3,
      title: "Full Stack Developer Resume",
      uploadDate: "2024-01-05",
      status: "active",
    },
  ]

  const handlePayment = async () => {
    if (!selectedResume) {
      toast({
        title: "Resume required",
        description: "Please select a resume to review.",
        variant: "destructive",
      })
      return
    }

    if (!agreedToTerms) {
      toast({
        title: "Terms required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "Payment successful!",
        description: "Your review request has been submitted to the reviewer.",
      })
      router.push("/dashboard/customer/orders")
    }, 3000)
  }

  const serviceFee = Math.round(reviewer.price * 0.1)
  const total = reviewer.price + serviceFee

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/customer/reviewers">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Reviewers
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
          <p className="text-muted-foreground">Complete your resume review purchase</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Reviewer Info */}
          <Card>
            <CardHeader>
              <CardTitle>Selected Reviewer</CardTitle>
            </CardHeader>
            <CardContent>
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
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-lg">{reviewer.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{reviewer.rating}</span>
                      <span className="text-sm text-muted-foreground">({reviewer.reviewCount})</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{reviewer.title}</p>
                  <p className="text-sm font-medium text-primary mb-2">{reviewer.company}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {reviewer.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span>{reviewer.responseTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>{reviewer.completionRate}% completion</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resume Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Resume</CardTitle>
              <CardDescription>Choose which resume you'd like reviewed</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedResume} onValueChange={setSelectedResume}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a resume to review" />
                </SelectTrigger>
                <SelectContent>
                  {userResumes.map((resume) => (
                    <SelectItem key={resume.id} value={resume.id.toString()}>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span>{resume.title}</span>
                        <span className="text-xs text-muted-foreground">
                          ({new Date(resume.uploadDate).toLocaleDateString()})
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!selectedResume && (
                <p className="text-sm text-muted-foreground mt-2">
                  Don't have a resume uploaded?{" "}
                  <Link href="/dashboard/customer/upload" className="text-primary hover:underline">
                    Upload one now
                  </Link>
                </p>
              )}
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Payment Method</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input id="expiryDate" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder="John Doe" />
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Your payment information is secure and encrypted</span>
              </div>
            </CardContent>
          </Card>

          {/* Terms and Conditions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                />
                <div className="text-sm">
                  <label htmlFor="terms" className="cursor-pointer">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Resume Review</span>
                <span>${reviewer.price}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Service Fee</span>
                <span>${serviceFee}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total}</span>
              </div>
              <Button
                className="w-full"
                onClick={handlePayment}
                disabled={isProcessing || !selectedResume || !agreedToTerms}
              >
                {isProcessing ? "Processing..." : `Pay $${total}`}
              </Button>
            </CardContent>
          </Card>

          {/* What's Included */}
          <Card>
            <CardHeader>
              <CardTitle>What's Included</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Detailed resume review</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Actionable feedback</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Industry-specific insights</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Response within {reviewer.responseTime}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Follow-up questions allowed</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
