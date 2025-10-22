"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, User, Upload, MessageSquare, Star, Settings, Menu, LogOut, Home } from "lucide-react"

const customerNavItems = [
  { href: "/dashboard/customer", label: "Dashboard", icon: Home },
  { href: "/dashboard/customer/profile", label: "Profile", icon: User },
  { href: "/dashboard/customer/upload", label: "Upload Resume", icon: Upload },
  { href: "/dashboard/customer/reviews", label: "My Reviews", icon: Star },
  { href: "/dashboard/customer/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/customer/settings", label: "Settings", icon: Settings },
]

const reviewerNavItems = [
  { href: "/dashboard/reviewer", label: "Dashboard", icon: Home },
  { href: "/dashboard/reviewer/profile", label: "Profile", icon: User },
  { href: "/dashboard/reviewer/reviews", label: "Review Queue", icon: FileText },
  { href: "/dashboard/reviewer/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/reviewer/settings", label: "Settings", icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Determine user type from pathname
  const isCustomer = pathname.includes("/customer")
  const navItems = isCustomer ? customerNavItems : reviewerNavItems
  const userType = isCustomer ? "Customer" : "Reviewer"

  const Sidebar = ({ className = "" }: { className?: string }) => (
    <div className={`flex flex-col h-full bg-card border-r ${className}`}>
      {/* Header */}
      <div className="p-6 border-b">
        <Link href="/" className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">ResumeReview Pro</span>
        </Link>
      </div>

      {/* User Info */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="/professional-headshot.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-sm text-muted-foreground">{userType}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/auth/login">
            <LogOut className="h-4 w-4 mr-3" />
            Logout
          </Link>
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-64">
        <Sidebar />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between p-4 border-b bg-card">
          <Link href="/" className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="font-bold">ResumeReview Pro</span>
          </Link>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
