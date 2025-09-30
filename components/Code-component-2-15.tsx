import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Upload, Car, ArrowLeft, CheckCircle, Clock, FileText } from "lucide-react";
import { useState } from "react";

interface DriverRegistrationProps {
  onNavigate: (view: string) => void;
}

export function DriverRegistration({ onNavigate }: DriverRegistrationProps) {
  const [registrationStep, setRegistrationStep] = useState<'form' | 'submitted' | 'approved'>('form');

  const handleSubmit = () => {
    setRegistrationStep('submitted');
  };

  if (registrationStep === 'submitted') {
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
              <p className="text-sm text-muted-foreground">Application ID: <span className="font-mono">DR-2024-001</span></p>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
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
              <Button onClick={() => onNavigate('home')} className="w-full">
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
            <Button variant="ghost" size="sm" onClick={() => onNavigate('home')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center space-x-2">
              <Car className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">Driver Registration</span>
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
                Register your vehicle and start earning extra income with LocalAds.pk
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Personal Information</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" placeholder="Ali Khan" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnic">CNIC Number</Label>
                    <Input id="cnic" placeholder="12345-1234567-1" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+92-300-1234567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input id="email" type="email" placeholder="ali@example.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Complete address" />
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Vehicle Information</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Vehicle Type</Label>
                    <Select defaultValue="rickshaw">
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
                    <Label htmlFor="plateNumber">Number Plate</Label>
                    <Input id="plateNumber" placeholder="LHR-5123" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Operating City</Label>
                    <Select defaultValue="lahore">
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
                    <Input id="model" placeholder="Honda CD70 - 2020" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="routes">Regular Routes/Areas</Label>
                  <Input id="routes" placeholder="e.g., Gulberg to Mall Road, DHA to Liberty" />
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
                      <p className="text-sm text-muted-foreground">Upload CNIC</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Choose File
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Driving License</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                      <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Upload License</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Choose File
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Vehicle Registration</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                      <FileText className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Upload Registration</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Choose File
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Vehicle Photo</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                      <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Upload Photo</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Choose File
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Submit */}
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <input type="checkbox" id="terms" className="mt-1" />
                  <label htmlFor="terms" className="text-sm text-muted-foreground">
                    I agree to the <span className="text-primary underline cursor-pointer">Terms & Conditions</span> and confirm that all provided information is accurate.
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