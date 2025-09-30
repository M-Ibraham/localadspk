import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { HardDrive, Building2, LogOut } from "lucide-react";
import { DriverRegistration } from "./DriverRegistration";
import { BusinessRegistration } from "./BusinessRegistration";

interface LoginOptionsProps {
  onLogout: () => void;
}

export default function LoginOptions({ onLogout }: LoginOptionsProps) {
  const [role, setRole] = useState("");

  const handleDriveRole = async () => {
    setRole("driver");
  };

  const handleBusinessRole = async () => {
    setRole("business");
  };

  return (
    <>
      {role == "driver" ? (
        <DriverRegistration />
      ) : role == "business" ? (
        <BusinessRegistration />
      ) : (
        <div className="w-full max-w-md mx-auto space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Choose Your Platform</CardTitle>
              <CardDescription>
                Select the platform you'd like to access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={handleDriveRole}
                className="w-full h-16 flex items-center gap-3"
                variant="outline"
              >
                <HardDrive className="h-6 w-6" />
                <div className="text-left">
                  <div>Drive Login</div>
                  <div className="text-muted-foreground">
                    Access your personal drive
                  </div>
                </div>
              </Button>

              <Button
                onClick={handleBusinessRole}
                className="w-full h-16 flex items-center gap-3"
                variant="outline"
              >
                <Building2 className="h-6 w-6" />
                <div className="text-left">
                  <div>Business Login</div>
                  <div className="text-muted-foreground">
                    Access business platform
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Button
            onClick={onLogout}
            variant="ghost"
            className="w-full flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      )}
    </>
  );
}
