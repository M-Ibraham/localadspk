"use client";

import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Bell,
  Car,
  DollarSign,
  TrendingUp,
  Calendar,
  MapPin,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useEffect } from "react";
import { useLocalAds } from "@/context/use-context";

export default function DriverDashboard() {
  const {
    handleDriverCampaignsRequest,
    handleCampaignAccept,
    campaigns,
    user,
  } = useLocalAds();

  useEffect(() => {
    const fetchCampaignsInvitaions = async () => {
      try {
        const response = await handleDriverCampaignsRequest();
      } catch (err) {
        console.log(err);
      }
    };
    fetchCampaignsInvitaions();
  }, []);

  const driver = {
    id: "D-1001",
    name: "Ali Khan",
    vehicle: "Rickshaw",
    plate: "LHR-5123",
    city: "Lahore",
    earnings: { monthly: 12000, total: 45000 },
    status: "Approved",
  };

  const activeCampaigns = [
    {
      id: "C-2001",
      campaign: "XYZ Summer Sale",
      duration: "1-14 Jul",
      status: "Active",
      earning: 12000,
    },
    {
      id: "C-2002",
      campaign: "Foodies App Promo",
      duration: "10-20 Aug",
      status: "Upcoming",
      earning: 0,
    },
  ];

  const campaignInvites = [
    {
      id: "INV-001",
      campaign: "Tech Solutions - Mobile App Launch",
      business: "Tech Solutions Ltd",
      duration: "25 Jul - 5 Aug",
      dailyRate: 800,
      area: "Gulberg, Lahore",
      status: "pending",
    },
    {
      id: "INV-002",
      campaign: "Food Delivery Promo",
      business: "Foodie Express",
      duration: "1-15 Aug",
      dailyRate: 600,
      area: "DHA, Lahore",
      status: "pending",
    },
  ];

  const notifications = [
    "New campaign invite: Tech Solutions - Mobile App Launch",
    "Payout Rs. 8,000 processed successfully",
    "Campaign assignment confirmed for XYZ Summer Sale",
  ];

  const handleAccept = async (status: string, compaignsId: any) => {
    try {
      await handleCampaignAccept(compaignsId, status);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Car className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-primary">
                  Driver Dashboard
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Avatar>
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center pb-4">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarFallback className="text-2xl">
                    {user.user?.name}
                  </AvatarFallback>
                </Avatar>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>
                  {user.profile?.vehicleType?.toUpperCase()} -{" "}
                  {user.profile?.vehicleNo}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">City:</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {user.profile?.city}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge variant="default" className="bg-green-500">
                    ✅ {driver.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Campaign Invites */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Campaign Invites</CardTitle>
                <CardDescription>New campaign opportunities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {campaigns.map((invite: any) => (
                  <div
                    key={invite._id}
                    className="p-4 bg-amber-50 rounded-lg border border-amber-200"
                  >
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm">{invite.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {invite.business}
                        </p>
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Duration:
                          </span>
                          <span>
                            {new Date(invite.startDate).toLocaleDateString() +
                              " - " +
                              new Date(invite.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Daily Rate:
                          </span>
                          <span className="font-medium text-green-600">
                            Rs. {invite.perDaybudget}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Area:</span>
                          <span>{invite.city}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={() => handleAccept("accepted", invite._id)}
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAccept("rejected", invite._id)}
                          className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.map((notification, index) => (
                  <div
                    key={index}
                    className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500"
                  >
                    <p className="text-sm">{notification}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Earnings Summary */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    This Month
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    Rs. {driver.earnings.monthly.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Earnings
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    Rs. {driver.earnings.total.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">Since joining</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Available
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Rs. 8,000</div>
                  <Button size="sm" className="w-full mt-2">
                    Withdraw
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Active Campaigns */}
            <Card>
              <CardHeader>
                <CardTitle>Active Campaigns</CardTitle>
                <CardDescription>
                  Your current and upcoming advertising campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Earning</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeCampaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell className="font-medium">
                          {campaign.campaign}
                        </TableCell>
                        <TableCell>{campaign.duration}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              campaign.status === "Active"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              campaign.status === "Active" ? "bg-green-500" : ""
                            }
                          >
                            {campaign.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {campaign.earning > 0
                            ? `Rs. ${campaign.earning.toLocaleString()}`
                            : "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Performance Chart Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>
                  Your earnings and campaign performance over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">
                      Performance chart will be displayed here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
