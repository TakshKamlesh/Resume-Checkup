// User and Authentication Types
export interface User {
  id: string
  email: string
  name: string
  userType: "customer" | "reviewer"
  avatar?: string
  createdAt: string
}

// Customer Types
export interface CustomerProfile extends User {
  phone?: string
  location?: string
  title?: string
  bio?: string
  skills: string[]
  experience: WorkExperience[]
  education: Education[]
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  duration: string
  description: string
  startDate: string
  endDate?: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  duration: string
  gpa?: string
  startDate: string
  endDate: string
}

// Reviewer Types
export interface ReviewerProfile extends User {
  title: string
  company: string
  experienceYears: number
  specialties: string[]
  pricePerReview: number
  bio: string
  socialLinks: SocialLinks
  rating: number
  reviewCount: number
  completionRate: number
  responseTime: string
  location: string
}

export interface SocialLinks {
  linkedin?: string
  twitter?: string
  github?: string
  website?: string
}

// Resume Types
export interface Resume {
  id: string
  customerId: string
  title: string
  description?: string
  fileUrl: string
  fileName: string
  fileSize: number
  status: "active" | "under-review" | "completed" | "archived"
  createdAt: string
  updatedAt: string
}

// Order Types
export interface Order {
  id: string
  customerId: string
  reviewerId: string
  resumeId: string
  amount: number
  status: "pending" | "paid" | "in-progress" | "completed" | "cancelled"
  deadline: string
  priority: "low" | "medium" | "high" | "urgent"
  createdAt: string
  updatedAt: string
  customer: CustomerProfile
  reviewer: ReviewerProfile
  resume: Resume
  review?: Review
}

// Review and Feedback Types
export interface Review {
  id: string
  orderId: string
  overallRating: number
  strengths: string[]
  improvements: string[]
  specificFeedback: string
  recommendations: string[]
  feedbackFileUrl?: string
  completedAt: string
  createdAt: string
}

export interface CustomerFeedback {
  id: string
  orderId: string
  customerId: string
  reviewerId: string
  rating: number
  comment?: string
  createdAt: string
}

// Message Types
export interface Message {
  id: string
  orderId: string
  senderId: string
  content: string
  attachmentUrl?: string
  attachmentName?: string
  createdAt: string
  sender: User
}

export interface Conversation {
  id: string
  orderId: string
  customerId: string
  reviewerId: string
  lastMessage: Message
  unreadCount: number
  status: "active" | "completed" | "archived"
  createdAt: string
  updatedAt: string
  customer: CustomerProfile
  reviewer: ReviewerProfile
  order: Order
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form Types
export interface ReviewFeedbackForm {
  overallRating: string
  strengths: string
  improvements: string
  specificFeedback: string
  recommendations: string
}

export interface CustomerFeedbackForm {
  rating: number
  comment: string
}

export interface ProfileUpdateForm {
  name: string
  title: string
  bio: string
  location: string
  phone: string
  skills: string[]
}

export interface ReviewerSettingsForm {
  pricePerReview: number
  responseTime: number
  maxOrders: number
  accepting: boolean
  autoMessage: string
}

// Statistics Types
export interface CustomerStats {
  totalReviews: number
  averageRating: number
  totalSpent: number
  improvementScore: number
}

export interface ReviewerStats {
  reviewsCompleted: number
  averageRating: number
  monthlyEarnings: number
  pendingReviews: number
}

// Notification Types
export interface NotificationSettings {
  email: boolean
  push: boolean
  sms: boolean
  marketing: boolean
  newOrders?: boolean
  messages?: boolean
  deadlines?: boolean
}

// Payment Types
export interface PaymentMethod {
  id: string
  type: "card" | "bank"
  last4: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
}

export interface Transaction {
  id: string
  orderId: string
  amount: number
  status: "pending" | "completed" | "failed" | "refunded"
  paymentMethod: string
  createdAt: string
}

// Search and Filter Types
export interface ReviewerFilters {
  specialty?: string
  priceRange?: [number, number]
  rating?: number
  responseTime?: string
  location?: string
}

export interface ReviewFilters {
  status?: string
  priority?: string
  dateRange?: [string, string]
}

// Component Props Types
export interface ReviewCardProps {
  review: Review & {
    reviewer: ReviewerProfile
    customer: CustomerProfile
    resume: Resume
  }
}

export interface ConversationItemProps {
  conversation: Conversation
}

export interface ReviewerCardProps {
  reviewer: ReviewerProfile
}
