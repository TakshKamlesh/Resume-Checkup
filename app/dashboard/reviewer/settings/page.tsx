"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Bell, Shield, CreditCard, User, Trash2, DollarSign, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ReviewerSettings() {
  const [notifications, setNotifications] = useState({
    newOrders: true,
    messages: true,
    deadlines: true,
    marketing: false,
  })

  const [availability, setAvailability] = useState({
    accepting: true,
    maxOrders: 10,
    responseTime: 24,
  })

  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your reviewer account and preferences</p>
      </div>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Account Information</span>
          </CardTitle>
          <CardDescription>Update your basic account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" value="sarah.johnson@email.com" disabled />
              <p className="text-xs text-muted-foreground">Contact support to change your email</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" value="+1 (555) 987-6543" />
            </div>
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Pricing & Availability */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Pricing & Availability</span>
          </CardTitle>
          <CardDescription>Manage your review pricing and availability</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price per Review ($)</Label>
              <Input id="price" type="number" value="45" min="10" max="200" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="response-time">Response Time (hours)</Label>
              <Input
                id="response-time"
                type="number"
                value={availability.responseTime}
                onChange={(e) => setAvailability({ ...availability, responseTime: Number.parseInt(e.target.value) })}
                min="1"
                max="168"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-orders">Maximum Concurrent Orders</Label>
            <Input
              id="max-orders"
              type="number"
              value={availability.maxOrders}
              onChange={(e) => setAvailability({ ...availability, maxOrders: Number.parseInt(e.target.value) })}
              min="1"
              max="50"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Accepting New Orders</Label>
              <p className="text-sm text-muted-foreground">Toggle to stop receiving new review requests</p>
            </div>
            <Switch
              checked={availability.accepting}
              onCheckedChange={(checked) => setAvailability({ ...availability, accepting: checked })}
            />
          </div>
          <Button onClick={handleSave}>Update Availability</Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </CardTitle>
          <CardDescription>Choose how you want to be notified</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>New Order Notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified when you receive new review requests</p>
              </div>
              <Switch
                checked={notifications.newOrders}
                onCheckedChange={(checked) => setNotifications({ ...notifications, newOrders: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Message Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive alerts for new customer messages</p>
              </div>
              <Switch
                checked={notifications.messages}
                onCheckedChange={(checked) => setNotifications({ ...notifications, messages: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Deadline Reminders</Label>
                <p className="text-sm text-muted-foreground">Get reminded about upcoming review deadlines</p>
              </div>
              <Switch
                checked={notifications.deadlines}
                onCheckedChange={(checked) => setNotifications({ ...notifications, deadlines: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Marketing Communications</Label>
                <p className="text-sm text-muted-foreground">Receive tips and updates for reviewers</p>
              </div>
              <Switch
                checked={notifications.marketing}
                onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
              />
            </div>
          </div>
          <Button onClick={handleSave}>Save Preferences</Button>
        </CardContent>
      </Card>

      {/* Auto-Response */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Auto-Response Message</span>
          </CardTitle>
          <CardDescription>Set an automatic message for new customers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="auto-message">Welcome Message</Label>
            <Textarea
              id="auto-message"
              placeholder="Hi! Thanks for choosing me to review your resume. I'll get started within 24 hours and provide detailed feedback..."
              rows={4}
              defaultValue="Hi! Thanks for choosing me to review your resume. I'll get started within 24 hours and provide detailed feedback to help you land your dream job. Feel free to message me if you have any specific questions or areas you'd like me to focus on."
            />
          </div>
          <Button onClick={handleSave}>Save Message</Button>
        </CardContent>
      </Card>

      {/* Payout Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Payout Settings</span>
          </CardTitle>
          <CardDescription>Manage how you receive payments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-8 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">
                BANK
              </div>
              <div>
                <p className="font-medium">Chase Bank •••• 1234</p>
                <p className="text-sm text-muted-foreground">Primary payout method</p>
              </div>
            </div>
            <Badge variant="secondary">Active</Badge>
          </div>
          <Button variant="outline" className="w-full bg-transparent">
            Update Payout Method
          </Button>
          <Separator />
          <div className="space-y-2">
            <h4 className="font-medium">Payout Schedule</h4>
            <p className="text-sm text-muted-foreground">
              Payouts are processed weekly on Fridays for completed reviews from the previous week.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>This week's earnings</span>
                <span className="font-medium">$340.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Pending payout</span>
                <span className="font-medium">$285.00</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Privacy & Security</span>
          </CardTitle>
          <CardDescription>Manage your privacy and security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" placeholder="Enter current password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" placeholder="Enter new password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" placeholder="Confirm new password" />
          </div>
          <Button>Update Password</Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            <span>Danger Zone</span>
          </CardTitle>
          <CardDescription>Irreversible actions for your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border border-destructive rounded-lg">
            <h4 className="font-medium text-destructive mb-2">Delete Account</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
