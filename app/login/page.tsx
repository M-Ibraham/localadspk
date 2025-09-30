"use client";

import React from "react";
import AuthenticationForm from "@/components/AuthenticationForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Target } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocalAds } from "@/context/use-context";

export default function Login() {
  const router = useRouter();
  const { handleLoginSuccess } = useLocalAds();

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
                onClick={() => router.push("/")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-primary">
                  LocalAds.pk
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container min-h-screen mx-auto px-4 py-8 flex justify-center items-center">
        <AuthenticationForm onLoginSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
}
