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
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Calendar } from "../../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";

import {
  Target,
  DollarSign,
  Users,
  BarChart3,
  Plus,
  Upload,
  CalendarIcon,
  MapPin,
  CheckCircle,
  RefreshCw,
  CreditCard,
  Filter,
  Star,
  Phone,
  Award,
  Route,
} from "lucide-react";
import { useRef, useState } from "react";
import { format } from "date-fns";
import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalAds } from "@/context/use-context";

const campaignSchema = z.object({
  title: z.string().min(3, "Title is required"),
  city: z.string().min(1, "City is required"),
  // areas: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
  vehicles: z.number().min(1, "At least 1 vehicle required"),
  budget: z.number().min(1000, "Budget must be at least Rs. 1000"),
  perDaybudget: z.number().min(1000, "Budget must be at least Rs. 1000"),
  bannerUrl: z.any().optional(), // file upload
});

type CampaignFormData = z.infer<typeof campaignSchema>;

export default function BusinessDashboard() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      title: "Summer Sale - XYZ Clothing",
      city: "lahore",
      vehicles: 1,
      budget: 2000,
    },
  });

  const { handleBusinessCampaign } = useLocalAds();

  const [campaignStep, setCampaignStep] = useState<
    "create" | "payment" | "drivers" | "live"
  >("create");
  const [showDriverSelection, setShowDriverSelection] = useState(false);
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>([]);
  const [driverFilters, setDriverFilters] = useState({
    area: "all",
    vehicles: "all",
    rating: 0,
    availability: "all",
  });

  const summaryData = [
    { title: "Active Campaigns", value: "2", icon: Target },
    { title: "Spend this Month", value: "Rs. 150,000", icon: DollarSign },
    { title: "Drivers Assigned", value: "30", icon: Users },
    { title: "Total Impressions", value: "2.5M", icon: BarChart3 },
  ];

  const campaigns = [
    {
      id: "C-2001",
      campaign: "Summer Sale - XYZ",
      drivers: 50,
      status: "Active",
      spend: 300000,
      assignedDrivers: 50,
      acceptedDrivers: 47,
      rejectedDrivers: 3,
    },
    {
      id: "C-2002",
      campaign: "Foodies App Promo",
      drivers: 20,
      status: "Payment Pending",
      spend: 80000,
      assignedDrivers: 0,
      acceptedDrivers: 0,
      rejectedDrivers: 0,
    },
  ];

  const availableDrivers = [
    {
      id: "D-1001",
      name: "Ali Khan",
      vehicle: "Rickshaw",
      area: "Gulberg",
      rating: 4.8,
      status: "available",
      phone: "+92-300-1234567",
      experience: "3 years",
      completedCampaigns: 25,
      dailyRate: 800,
      routes: ["Gulberg to Mall Road", "Liberty to Fortress"],
    },
    {
      id: "D-1002",
      name: "Ahmed Hassan",
      vehicle: "Taxi",
      area: "DHA",
      rating: 4.9,
      status: "assigned",
      phone: "+92-301-2345678",
      experience: "5 years",
      completedCampaigns: 45,
      dailyRate: 900,
      routes: ["DHA to Gulberg", "Mall Road to Airport"],
    },
    {
      id: "D-1003",
      name: "Fatima Sheikh",
      vehicle: "Car",
      area: "Gulberg",
      rating: 4.7,
      status: "available",
      phone: "+92-302-3456789",
      experience: "2 years",
      completedCampaigns: 18,
      dailyRate: 750,
      routes: ["Gulberg to DHA", "Model Town to Liberty"],
    },
    {
      id: "D-1004",
      name: "Hassan Ali",
      vehicle: "Rickshaw",
      area: "DHA",
      rating: 4.6,
      status: "available",
      phone: "+92-303-4567890",
      experience: "4 years",
      completedCampaigns: 32,
      dailyRate: 700,
      routes: ["DHA to Liberty", "Fortress to Mall Road"],
    },
    {
      id: "D-1005",
      name: "Zara Khan",
      vehicle: "Taxi",
      area: "Gulberg",
      rating: 4.9,
      status: "assigned",
      phone: "+92-304-5678901",
      experience: "6 years",
      completedCampaigns: 58,
      dailyRate: 950,
      routes: ["Gulberg to Airport", "Liberty to DHA"],
    },
    {
      id: "D-1006",
      name: "Usman Malik",
      vehicle: "Van",
      area: "Model Town",
      rating: 4.5,
      status: "available",
      phone: "+92-305-6789012",
      experience: "7 years",
      completedCampaigns: 41,
      dailyRate: 1200,
      routes: ["Model Town to Mall Road", "Liberty to Fortress"],
    },
    {
      id: "D-1007",
      name: "Sara Ahmed",
      vehicle: "Rickshaw",
      area: "Liberty",
      rating: 4.8,
      status: "available",
      phone: "+92-306-7890123",
      experience: "2 years",
      completedCampaigns: 22,
      dailyRate: 780,
      routes: ["Liberty to DHA", "Mall Road to Model Town"],
    },
  ];

  const assignedDrivers = [
    {
      id: "D-1001",
      name: "Ali Khan",
      vehicle: "Rickshaw",
      area: "Gulberg",
      status: "accepted",
      responseTime: "2 min",
    },
    {
      id: "D-1002",
      name: "Ahmed Hassan",
      vehicle: "Taxi",
      area: "DHA",
      status: "pending",
      responseTime: "pending",
    },
    {
      id: "D-1005",
      name: "Zara Khan",
      vehicle: "Taxi",
      area: "Gulberg",
      status: "rejected",
      responseTime: "5 min",
    },
  ];

  const onSubmit = async (data: CampaignFormData) => {
    console.log("✅ Submitted Campaign:", data);

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else {
        formData.append(key, value);
      }
    });

    await handleBusinessCampaign(formData);
    // setCampaignStep("payment");
  };

  console.log(errors);
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-primary">
                  Business Dashboard
                </span>
              </div>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {summaryData.map((item, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>
                <item.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Create Campaign Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Create New Campaign</CardTitle>
                <CardDescription>
                  Launch your mobile advertising campaign
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Campaign Title</Label>
                      <Input
                        id="title"
                        {...register("title")}
                        placeholder="Campaign Name - Your Brand"
                        onChange={(e) => setValue("title", e.target.value)}
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm">
                          {errors.title.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Target City</Label>
                      <Select
                        defaultValue="lahore"
                        onValueChange={(val) => setValue("city", val)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lahore">Lahore</SelectItem>
                          <SelectItem value="karachi">Karachi</SelectItem>
                          <SelectItem value="islamabad">Islamabad</SelectItem>
                          <SelectItem value="faisalabad">Faisalabad</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.city && (
                        <p className="text-red-500 text-sm">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <div className="w-full cursor-pointer">
                            <div className="flex items-center w-full rounded-md border px-3 py-2 text-sm shadow-sm hover:bg-accent hover:text-accent-foreground">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {startDate
                                ? format(startDate, "PPP")
                                : "1 Jul 2024"}
                            </div>
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={(date) => {
                              setStartDate(date);
                              if (date) setValue("startDate", date);
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.startDate && (
                        <p className="text-red-500 text-sm">
                          {errors.startDate.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <div className="w-full cursor-pointer">
                            <div className="flex items-center w-full rounded-md border px-3 py-2 text-sm shadow-sm hover:bg-accent hover:text-accent-foreground">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {endDate ? format(endDate, "PPP") : "10 Jul 2024"}
                            </div>
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={(date) => {
                              setEndDate(date);
                              if (date) setValue("endDate", date);
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.endDate && (
                        <p className="text-red-500 text-sm">
                          {errors.endDate.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vehicles">Required Vehicles</Label>
                      <Input
                        type="number"
                        placeholder="Vehicles needed"
                        onChange={(e: any) => {
                          setValue("vehicles", Number(e.target.value));
                        }}
                      />
                      {errors.vehicles && (
                        <p className="text-red-500 text-sm">
                          {errors.vehicles.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget">
                        Person One Day Budget (Rs.)
                      </Label>
                      <Input
                        type="number"
                        placeholder="Person per day budget"
                        onChange={(e: any) => {
                          setValue("perDaybudget", Number(e.target.value));
                        }}
                      />
                      {errors.budget && (
                        <p className="text-red-500 text-sm">
                          {errors.budget.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget">Total Budget (Rs.)</Label>
                      <Input
                        type="number"
                        placeholder="Campaign budget"
                        onChange={(e: any) => {
                          setValue("budget", Number(e.target.value));
                        }}
                      />
                      {errors.budget && (
                        <p className="text-red-500 text-sm">
                          {errors.budget.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Controller
                      name="bannerUrl"
                      control={control}
                      render={({ field }) => (
                        <>
                          {/* Hidden file input */}
                          <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              field.onChange(file); // form me save
                              if (file) {
                                const fileURL = URL.createObjectURL(file);
                                setPreview(fileURL); // preview show
                              }
                            }}
                          />

                          {/* Clickable Upload Box */}
                          <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center cursor-pointer hover:bg-accent/10"
                          >
                            {preview ? (
                              <img
                                src={preview}
                                alt="Preview"
                                className="mx-auto rounded-lg max-h-40 object-contain"
                              />
                            ) : (
                              <>
                                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                <p className="text-sm text-muted-foreground mb-2">
                                  Drag and drop your banner here, or click to
                                  browse
                                </p>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => fileInputRef.current?.click()}
                                >
                                  Choose File
                                </Button>
                                <p className="text-xs text-muted-foreground mt-2">
                                  Recommended: 1200x600px, PNG/JPG, Max 2MB
                                </p>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Proceed to Payment
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Save as Draft
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Campaign Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Campaign Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1727101981835-50bade3c4eaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhZHZlcnRpc2luZyUyMHRydWNrJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzU3NDkzNDA4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Campaign banner preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>14 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Target Area:</span>
                    <span>Lahore (2 areas)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Est. Reach:</span>
                    <span>500K+ people</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cost per Day:</span>
                    <span>Rs. 21,428</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Active in 3 cities</p>
                    <p className="text-sm text-muted-foreground">
                      Lahore, Karachi, Islamabad
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">1000+ drivers</p>
                    <p className="text-sm text-muted-foreground">
                      Available in your areas
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Campaign Payment Modal */}
        {campaignStep === "payment" && (
          <Card className="mt-8 border-amber-200 bg-amber-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Confirmation
              </CardTitle>
              <CardDescription>
                Complete payment to launch your campaign
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Campaign Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Campaign:</span>
                      <span>Summer Sale - XYZ Clothing</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>14 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vehicles Required:</span>
                      <span>50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Target Area:</span>
                      <span>Lahore (Gulberg, DHA)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Payment Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Base Amount:</span>
                      <span>Rs. 280,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform Fee (5%):</span>
                      <span>Rs. 14,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (8%):</span>
                      <span>Rs. 6,000</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-medium">
                        <span>Total Amount:</span>
                        <span>Rs. 300,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setCampaignStep("drivers")}
                  className="flex-1"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirm Payment & Launch
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCampaignStep("create")}
                  className="flex-1"
                >
                  Back to Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Driver Assignment View */}
        {campaignStep === "drivers" && (
          <Card className="mt-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Driver Assignment - Summer Sale XYZ</CardTitle>
                  <CardDescription>
                    Campaign payment confirmed. System auto-assigning drivers...
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={showDriverSelection ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowDriverSelection(!showDriverSelection)}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    {showDriverSelection
                      ? "Hide Selection"
                      : "Manual Selection"}
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Auto Re-assign
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Bulk Actions
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">47</div>
                    <div className="text-sm text-muted-foreground">
                      Accepted
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600">1</div>
                    <div className="text-sm text-muted-foreground">Pending</div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">3</div>
                    <div className="text-sm text-muted-foreground">
                      Rejected
                    </div>
                  </div>
                </Card>
              </div>

              {showDriverSelection && (
                <Card className="mb-6 border-blue-200 bg-blue-50/30">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        Manual Driver Selection
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {selectedDrivers.length} selected
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedDrivers([])}
                        >
                          Clear All
                        </Button>
                      </div>
                    </div>
                    <CardDescription>
                      Select drivers manually or filter by criteria
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Filters */}
                    <div className="grid md:grid-cols-4 gap-4 p-4 bg-white rounded-lg border">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Area</label>
                        <Select
                          value={driverFilters.area}
                          onValueChange={(value) =>
                            setDriverFilters({ ...driverFilters, area: value })
                          }
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="All Areas" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Areas</SelectItem>
                            <SelectItem value="Gulberg">Gulberg</SelectItem>
                            <SelectItem value="DHA">DHA</SelectItem>
                            <SelectItem value="Model Town">
                              Model Town
                            </SelectItem>
                            <SelectItem value="Liberty">Liberty</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Vehicle Type
                        </label>
                        <Select
                          value={driverFilters.vehicles}
                          onValueChange={(value) =>
                            setDriverFilters({
                              ...driverFilters,
                              vehicles: value,
                            })
                          }
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="All Vehicles" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Vehicles</SelectItem>
                            <SelectItem value="Rickshaw">Rickshaw</SelectItem>
                            <SelectItem value="Taxi">Taxi</SelectItem>
                            <SelectItem value="Car">Car</SelectItem>
                            <SelectItem value="Van">Van</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Min Rating
                        </label>
                        <Select
                          value={driverFilters.rating.toString()}
                          onValueChange={(value) =>
                            setDriverFilters({
                              ...driverFilters,
                              rating: parseFloat(value),
                            })
                          }
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="Any Rating" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Any Rating</SelectItem>
                            <SelectItem value="4.5">4.5+ Stars</SelectItem>
                            <SelectItem value="4.7">4.7+ Stars</SelectItem>
                            <SelectItem value="4.8">4.8+ Stars</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Availability
                        </label>
                        <Select
                          value={driverFilters.availability}
                          onValueChange={(value) =>
                            setDriverFilters({
                              ...driverFilters,
                              availability: value,
                            })
                          }
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Drivers</SelectItem>
                            <SelectItem value="available">
                              Available Only
                            </SelectItem>
                            <SelectItem value="assigned">
                              Assigned Only
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Driver List */}
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {availableDrivers
                        .filter((driver) => {
                          if (
                            driverFilters.area !== "all" &&
                            driver.area !== driverFilters.area
                          )
                            return false;
                          if (
                            driverFilters.vehicles !== "all" &&
                            driver.vehicle !== driverFilters.vehicles
                          )
                            return false;
                          if (
                            driverFilters.rating &&
                            driver.rating < driverFilters.rating
                          )
                            return false;
                          if (
                            driverFilters.availability === "available" &&
                            driver.status !== "available"
                          )
                            return false;
                          if (
                            driverFilters.availability === "assigned" &&
                            driver.status !== "assigned"
                          )
                            return false;
                          return true;
                        })
                        .map((driver) => (
                          <div
                            key={driver.id}
                            className={`p-4 bg-white rounded-lg border transition-all cursor-pointer ${
                              selectedDrivers.includes(driver.id)
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => {
                              if (driver.status === "available") {
                                setSelectedDrivers((prev) =>
                                  prev.includes(driver.id)
                                    ? prev.filter((id) => id !== driver.id)
                                    : [...prev, driver.id]
                                );
                              }
                            }}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-3">
                                  <div>
                                    <h4 className="font-medium">
                                      {driver.name}
                                    </h4>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                      <span>{driver.vehicle}</span>
                                      <span>•</span>
                                      <span>{driver.area}</span>
                                      <span>•</span>
                                      <div className="flex items-center gap-1">
                                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                        <span>{driver.rating}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4 text-xs">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <Phone className="h-3 w-3" />
                                      <span>{driver.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Award className="h-3 w-3" />
                                      <span>
                                        {driver.experience} experience
                                      </span>
                                    </div>
                                  </div>
                                  <div className="space-y-1">
                                    <div>
                                      <span className="font-medium">
                                        Rs. {driver.dailyRate}
                                      </span>
                                      <span className="text-muted-foreground">
                                        /day
                                      </span>
                                    </div>
                                    <div>
                                      <span className="font-medium">
                                        {driver.completedCampaigns}
                                      </span>
                                      <span className="text-muted-foreground">
                                        {" "}
                                        campaigns completed
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="text-xs">
                                  <div className="flex items-start gap-2">
                                    <Route className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                      Regular routes: {driver.routes.join(", ")}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-col items-end gap-2">
                                <Badge
                                  variant={
                                    driver.status === "available"
                                      ? "default"
                                      : "secondary"
                                  }
                                  className={
                                    driver.status === "available"
                                      ? "bg-green-500"
                                      : ""
                                  }
                                >
                                  {driver.status}
                                </Badge>

                                {selectedDrivers.includes(driver.id) && (
                                  <CheckCircle className="h-5 w-5 text-blue-600" />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* Selection Actions */}
                    {selectedDrivers.length > 0 && (
                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="text-sm">
                          <span className="font-medium">
                            {selectedDrivers.length} drivers selected
                          </span>
                          <span className="text-muted-foreground">
                            {" "}
                            • Total cost: Rs.{" "}
                            {availableDrivers
                              .filter((d) => selectedDrivers.includes(d.id))
                              .reduce((sum, d) => sum + d.dailyRate, 0) *
                              14}{" "}
                            for 14 days
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Send Bulk Invite
                          </Button>
                          <Button size="sm">
                            Assign Selected ({selectedDrivers.length})
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Driver</TableHead>
                    <TableHead>Vehicle & Area</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Response Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignedDrivers.map((driver) => (
                    <TableRow key={driver.id}>
                      <TableCell className="font-medium">
                        {driver.name}
                      </TableCell>
                      <TableCell>
                        {driver.vehicle} • {driver.area}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            driver.status === "accepted"
                              ? "default"
                              : driver.status === "pending"
                              ? "secondary"
                              : "destructive"
                          }
                          className={
                            driver.status === "accepted"
                              ? "bg-green-500"
                              : driver.status === "pending"
                              ? "bg-amber-500"
                              : ""
                          }
                        >
                          {driver.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{driver.responseTime}</TableCell>
                      <TableCell className="text-right">
                        {driver.status === "rejected" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowDriverSelection(true)}
                          >
                            Replace
                          </Button>
                        )}
                        {driver.status === "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowDriverSelection(true)}
                          >
                            Replace
                          </Button>
                        )}
                        {driver.status === "accepted" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowDriverSelection(true)}
                          >
                            Replace
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex justify-between items-center mt-6 pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  System will auto-assign replacement drivers for rejected
                  invites
                </p>
                <Button onClick={() => setCampaignStep("live")}>
                  Campaign is Ready
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Campaign Tracking */}
        {campaignStep === "create" && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Campaign Tracking</CardTitle>
              <CardDescription>
                Monitor your active and draft campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Drivers</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Spend</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">
                        {campaign.campaign}
                      </TableCell>
                      <TableCell>
                        {campaign.status === "Active" ? (
                          <span>
                            {campaign.acceptedDrivers}/
                            {campaign.assignedDrivers}
                          </span>
                        ) : (
                          <span>{campaign.drivers}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            campaign.status === "Active"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            campaign.status === "Active"
                              ? "bg-green-500"
                              : campaign.status === "Payment Pending"
                              ? "bg-amber-500"
                              : ""
                          }
                        >
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        Rs. {campaign.spend.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {campaign.status === "Payment Pending" ? (
                          <Button
                            size="sm"
                            onClick={() => setCampaignStep("payment")}
                          >
                            Complete Payment
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCampaignStep("drivers")}
                          >
                            View Details
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
