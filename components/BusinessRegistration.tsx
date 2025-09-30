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
import { Badge } from "./ui/badge";
import { Upload, Car, ArrowLeft, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/toast_context";
import { useLocalAds } from "@/context/use-context";

export function BusinessRegistration() {
  const router = useRouter();

  const { showToast } = useToast();
  const [registrationStep, setRegistrationStep] = useState<
    "form" | "submitted" | "approved"
  >("form");

  const { handleBusinessRegister } = useLocalAds();
  // --- State for inputs ---
  const [formData, setFormData] = useState({
    businessName: "",
    industry: "",
    contactPerson: "",
    logoUrl: "",
  });

  // --- State for files ---
  const [files, setFiles] = useState<{
    logoUrl?: File;
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
    const payload = {
      ...formData,
      logoUrl: files.logoUrl,
    };

    if (payload.logoUrl) {
      const dataform: any = new FormData();

      // Append text fields

      dataform.append("businessName", payload.businessName);
      dataform.append("industry", payload.industry);
      dataform.append("contactPerson", payload.contactPerson);
      dataform.append("logo", files.logoUrl);

      await handleBusinessRegister(dataform);
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
                Business Registration
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Join as a Business</CardTitle>
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
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Company"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input
                      id="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      placeholder="chemical e.g"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input
                      id="contactPerson"
                      placeholder="+92-300-1234567"
                      value={formData.contactPerson}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Document Upload */}
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Required Documents</h3>

                <div className="grid md:grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label>Logo</Label>
                    <div className="border-2 mt-4 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                      <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Upload Logo
                      </p>
                      <input
                        type="file"
                        className="hidden"
                        required
                        id="logoUrlFile"
                        onChange={(e) => handleFileChange(e, "logoUrl")}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() =>
                          document.getElementById("logoUrlFile")?.click()
                        }
                      >
                        Choose File
                      </Button>
                      {files.logoUrl && (
                        <p className="text-xs mt-1">{files.logoUrl.name}</p>
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
