import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Users, Shield, TrendingUp, Activity, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Welcome back, John</h1>
        <p className="text-muted-foreground">Here's what's happening with your dashboards today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+8%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">Excellent</span> uptime
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-secondary">2 new</span> this hour
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard Access Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 hover:border-primary/50 transition-colors">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Admin Dashboard</CardTitle>
                <CardDescription>System administration and user management</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Last accessed</p>
                <div className="flex items-center space-x-2">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">2 hours ago</span>
                </div>
              </div>
              <Link href="/dashboard/admin">
                <Button>Access Admin</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-secondary/50 transition-colors">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <CardTitle>Business Dashboard</CardTitle>
                <CardDescription>Business metrics and team collaboration</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Last accessed</p>
                <div className="flex items-center space-x-2">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">1 day ago</span>
                </div>
              </div>
              <Link href="/dashboard/business">
                <Button variant="secondary">Access Business</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions across your dashboards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">New user registered</p>
                <p className="text-xs text-muted-foreground">sarah.johnson@example.com joined as Business User</p>
              </div>
              <Badge variant="secondary">2m ago</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-2 w-2 rounded-full bg-secondary" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">System backup completed</p>
                <p className="text-xs text-muted-foreground">Daily backup finished successfully</p>
              </div>
              <Badge variant="outline">15m ago</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Security scan completed</p>
                <p className="text-xs text-muted-foreground">No vulnerabilities detected</p>
              </div>
              <Badge variant="outline">1h ago</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
