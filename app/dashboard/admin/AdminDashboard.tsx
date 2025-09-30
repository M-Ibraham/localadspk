import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  Users,
  DollarSign,
  Target,
  TrendingUp,
  ArrowLeft,
  Download,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";

interface AdminDashboardProps {
  onNavigate: (view: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const handleApproveDriver = (driverId: string) => {
    // Simulate driver approval process
    console.log(`Approving driver ${driverId}`);
  };

  const handleRejectDriver = (driverId: string) => {
    // Simulate driver rejection process
    console.log(`Rejecting driver ${driverId}`);
  };
  const kpiData = [
    { title: "Total Drivers", value: "1,000", change: "+12%", icon: Users },
    { title: "Pending Approvals", value: "45", change: "-5%", icon: Clock },
    { title: "Active Campaigns", value: "12", change: "+8%", icon: Target },
    {
      title: "Revenue This Month",
      value: "Rs. 750,000",
      change: "+23%",
      icon: DollarSign,
    },
  ];

  const pendingDrivers = [
    {
      id: "D-1001",
      name: "Ali Khan",
      vehicle: "Rickshaw",
      plate: "LHR-5123",
      city: "Lahore",
      status: "Pending",
    },
    {
      id: "D-1002",
      name: "Ahmed Hassan",
      vehicle: "Taxi",
      plate: "KHI-7890",
      city: "Karachi",
      status: "Pending",
    },
    {
      id: "D-1003",
      name: "Zara Ali",
      vehicle: "Car",
      plate: "ISB-3456",
      city: "Islamabad",
      status: "Pending",
    },
  ];

  const payments = [
    {
      id: "P-3001",
      business: "XYZ Clothing",
      amount: 300000,
      status: "Paid",
      date: "15 Jul 2024",
    },
    {
      id: "P-3002",
      business: "Foodies App",
      amount: 80000,
      status: "Pending",
      date: "18 Jul 2024",
    },
    {
      id: "P-3003",
      business: "Tech Solutions",
      amount: 150000,
      status: "Processing",
      date: "20 Jul 2024",
    },
  ];

  const systemActivities = [
    "Auto-assigned 50 drivers to 'Summer Sale - XYZ' campaign",
    "3 drivers rejected campaign invite - auto-replacing with available drivers",
    "Payment Rs. 300,000 confirmed for XYZ Clothing campaign",
    "Driver Ali Khan accepted campaign invite in 2 minutes",
    "Campaign 'Tech Solutions App Launch' awaiting payment confirmation",
  ];

  const recentActivities = [
    "Driver Ali Khan approved for Lahore region",
    "Campaign 'Summer Sale - XYZ' launched successfully",
    "Payment of Rs. 300,000 processed for XYZ Clothing",
    "New business registration: Tech Solutions Ltd",
    "Driver Ahmed Hassan submitted vehicle documents",
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate("home")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-primary">
                  Admin Dashboard
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Avatar>
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* KPI Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {kpiData.map((item, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>
                <item.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span
                    className={
                      item.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {item.change}
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="approvals" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="approvals">Approvals</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="approvals">
                <Card>
                  <CardHeader>
                    <CardTitle>Driver Approvals Queue</CardTitle>
                    <CardDescription>
                      Review and approve new driver registrations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Driver</TableHead>
                          <TableHead>Vehicle</TableHead>
                          <TableHead>City</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingDrivers.map((driver) => (
                          <TableRow key={driver.id}>
                            <TableCell className="font-medium">
                              {driver.name}
                            </TableCell>
                            <TableCell>
                              {driver.vehicle} - {driver.plate}
                            </TableCell>
                            <TableCell>{driver.city}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">
                                <Clock className="h-3 w-3 mr-1" />
                                {driver.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex gap-2 justify-end">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-green-600"
                                  onClick={() => handleApproveDriver(driver.id)}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600"
                                  onClick={() => handleRejectDriver(driver.id)}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payments">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Management</CardTitle>
                    <CardDescription>
                      Track and manage business payments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Business</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {payments.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell className="font-medium">
                              {payment.business}
                            </TableCell>
                            <TableCell>
                              Rs. {payment.amount.toLocaleString()}
                            </TableCell>
                            <TableCell>{payment.date}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  payment.status === "Paid"
                                    ? "default"
                                    : "secondary"
                                }
                                className={
                                  payment.status === "Paid"
                                    ? "bg-green-500"
                                    : payment.status === "Processing"
                                    ? "bg-yellow-500"
                                    : ""
                                }
                              >
                                {payment.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports">
                <Card>
                  <CardHeader>
                    <CardTitle>Data Export & Reports</CardTitle>
                    <CardDescription>
                      Download reports and analytics data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Drivers Report</h4>
                            <p className="text-sm text-muted-foreground">
                              Complete driver database
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            CSV
                          </Button>
                        </div>
                      </Card>

                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Campaigns Report</h4>
                            <p className="text-sm text-muted-foreground">
                              Campaign performance data
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            CSV
                          </Button>
                        </div>
                      </Card>

                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Payments Report</h4>
                            <p className="text-sm text-muted-foreground">
                              Financial transactions
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            CSV
                          </Button>
                        </div>
                      </Card>

                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Analytics Report</h4>
                            <p className="text-sm text-muted-foreground">
                              Platform insights
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            PDF
                          </Button>
                        </div>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Platform Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Platform Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1686061594225-3e92c0cd51b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwZGFzaGJvYXJkJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc1NzQxODczM3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Platform analytics"
                  className="w-full h-32 object-cover rounded-lg"
                />

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      98.5%
                    </div>
                    <div className="text-xs text-muted-foreground">Uptime</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">4.8★</div>
                    <div className="text-xs text-muted-foreground">
                      Avg Rating
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">System Activities</CardTitle>
                <CardDescription>
                  Auto-assignment & workflow updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {systemActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="text-sm p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500"
                    >
                      {activity}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Manual Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="text-sm p-3 bg-muted/50 rounded-lg"
                    >
                      {activity}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Bulk Approve Drivers
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="h-4 w-4 mr-2" />
                  Campaign Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Process Payments
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
