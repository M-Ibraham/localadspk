import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { Upload, Car, ArrowLeft, Clock, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/toast_context";
import { useLocalAds } from "@/context/use-context";

export function DriverRegistration() {
  const router = useRouter();

  const { showToast } = useToast();
  const { handleDriverRegister } = useLocalAds();

  const [registrationStep, setRegistrationStep] = useState<
    "form" | "submitted" | "approved"
  >("form");

  // --- State for inputs ---
  const [formData, setFormData] = useState({
    fullName: "",
    cnic: "",
    phone: "",
    email: "",
    address: "",
    vehicleType: "rickshaw",
    vehicleNo: "",
    city: "lahore",
    model: "",
    routes: "",
  });

  // --- State for files ---
  const [files, setFiles] = useState<{
    cnic?: File;
    license?: File;
    registration?: File;
    profile?: File;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof typeof files
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFiles({ ...files, [key]: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: any) => {
    if (files.cnic && files.license && files.profile && files.registration) {
      const dataform: any = new FormData();

      // Append text fields
      Object.entries(formData).forEach(([key, value]: any) => {
        if (value !== undefined && value != null) {
          dataform.append(key, value);
        }
      });

      if (files.profile) dataform.append("profile", files.profile);
      if (files.registration) dataform.append("vehicle", files.registration);
      if (files.cnic) dataform.append("cnic", files.cnic); // ✅ cnic file
      if (files.license) dataform.append("license", files.license);

      await handleDriverRegister(dataform);
    } else {
      showToast({ message: "Plz fill Files!" });
    }
  };

  if (registrationStep === "submitted") {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-amber-600" />
            </div>
            <CardTitle>Application Submitted!</CardTitle>
            <CardDescription>
              Your driver registration has been submitted for admin review
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Application ID: <span className="font-mono">DR-2024-001</span>
              </p>
              <Badge
                variant="secondary"
                className="bg-amber-100 text-amber-800"
              >
                <Clock className="h-3 w-3 mr-1" />
                Pending Admin Approval
              </Badge>
            </div>

            <div className="space-y-3 text-sm">
              <h4 className="font-medium">Next Steps:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Admin will review your documents (24-48 hours)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                  <span>Vehicle inspection may be required</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                  <span>Once approved, you can start accepting campaigns</span>
                </li>
              </ul>
            </div>

            <div className="pt-4">
              <Button onClick={() => router.push("/")} className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Car className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">
                Driver Registration
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Join as a Driver</CardTitle>
              <CardDescription>
                Register your vehicle and start earning extra income with
                LocalAds.pk
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Personal Information</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Ali Khan"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnic">CNIC Number</Label>
                    <Input
                      id="cnic"
                      value={formData.cnic}
                      onChange={handleChange}
                      placeholder="12345-1234567-1"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+92-300-1234567"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ali@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="Complete address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Vehicle Information</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Vehicle Type</Label>
                    <Select
                      defaultValue="rickshaw"
                      onValueChange={(value: string) =>
                        setFormData({ ...formData, vehicleType: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rickshaw">Rickshaw</SelectItem>
                        <SelectItem value="taxi">Taxi</SelectItem>
                        <SelectItem value="car">Private Car</SelectItem>
                        <SelectItem value="van">Van</SelectItem>
                        <SelectItem value="bus">Bus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleNo">Number Plate</Label>
                    <Input
                      id="vehicleNo"
                      placeholder="LHR-5123"
                      value={formData.vehicleNo}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Operating City</Label>
                    <Select
                      defaultValue="lahore"
                      onValueChange={(value: string) =>
                        setFormData({ ...formData, city: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lahore">Lahore</SelectItem>
                        <SelectItem value="karachi">Karachi</SelectItem>
                        <SelectItem value="islamabad">Islamabad</SelectItem>
                        <SelectItem value="faisalabad">Faisalabad</SelectItem>
                        <SelectItem value="rawalpindi">Rawalpindi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Vehicle Model & Year</Label>
                    <Input
                      id="model"
                      placeholder="Honda CD70 - 2020"
                      value={formData.model}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="routes">Regular Routes/Areas</Label>
                  <Input
                    id="routes"
                    value={formData.routes}
                    onChange={handleChange}
                    placeholder="e.g., Gulberg to Mall Road, DHA to Liberty"
                  />
                </div>
              </div>

              {/* Document Upload */}
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Required Documents</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>CNIC Copy</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                      <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Upload CNIC
                      </p>
                      <input
                        type="file"
                        className="hidden"
                        required
                        id="cnicFile"
                        onChange={(e) => handleFileChange(e, "cnic")}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() =>
                          document.getElementById("cnicFile")?.click()
                        }
                      >
                        Choose File
                      </Button>
                      {files.cnic && (
                        <p className="text-xs mt-1">{files.cnic.name}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Driving License</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                      <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Upload License
                      </p>
                      <input
                        type="file"
                        className="hidden"
                        required
                        id="licenseFile"
                        onChange={(e) => handleFileChange(e, "license")}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() =>
                          document.getElementById("licenseFile")?.click()
                        }
                      >
                        Choose File
                      </Button>
                      {files.license && (
                        <p className="text-xs mt-1">{files.license.name}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Vehicle Registration</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                      <FileText className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Upload Registration
                      </p>
                      <input
                        type="file"
                        className="hidden"
                        required
                        id="regFile"
                        onChange={(e) => handleFileChange(e, "registration")}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() =>
                          document.getElementById("regFile")?.click()
                        }
                      >
                        Choose File
                      </Button>
                      {files.registration && (
                        <p className="text-xs mt-1">
                          {files.registration.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Vehicle Photo</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                      <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Upload Photo
                      </p>
                      <input
                        type="file"
                        className="hidden"
                        required
                        id="photoFile"
                        onChange={(e) => handleFileChange(e, "profile")}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() =>
                          document.getElementById("photoFile")?.click()
                        }
                      >
                        Choose File
                      </Button>
                      {files.profile && (
                        <p className="text-xs mt-1">{files.profile.name}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Submit */}
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <input type="checkbox" id="terms" className="mt-1" />
                  <label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground"
                  >
                    I agree to the{" "}
                    <span className="text-primary underline cursor-pointer">
                      Terms & Conditions
                    </span>{" "}
                    and confirm that all provided information is accurate.
                  </label>
                </div>

                <Button onClick={handleSubmit} className="w-full" size="lg">
                  Submit Application
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
