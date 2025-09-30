import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Car,
  Target,
  DollarSign,
  BarChart,
  Zap,
  CheckCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

export function HomePage() {
  const router = useRouter();

  const onHandleRoute = (name: string) => {
    // check user if login
    if (name == "driver-register") {
      // onNavigate("driver-register")
    } else if (name == "business") {
      // onNavigate("business")}
    }
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">
                LocalAds.pk
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => router.push("/login")}>
                Login
              </Button>
              {/* <Button onClick={() => onNavigate("business")}>
                Business Login
              </Button> */}
              {/* <Button onClick={() => onNavigate("admin")}>Admin</Button> */}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-primary leading-tight">
                  Apni Gari ko Moving Billboard banayein!
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Extra income for drivers, wider reach for businesses. Pakistan
                  ka pehla mobile advertising platform.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => onHandleRoute}
                  className="text-lg px-8"
                >
                  Register Driver
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onHandleRoute}
                  className="text-lg px-8"
                >
                  Start Campaign
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-muted-foreground">
                    Active Drivers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Cities</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">₹75L+</div>
                  <div className="text-sm text-muted-foreground">
                    Paid to Drivers
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1674837669081-8d606d4e1ea4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWtpc3RhbiUyMHJpY2tzaGF3JTIwYWR2ZXJ0aXNpbmclMjBiYW5uZXJ8ZW58MXx8fHwxNzU3NDkzNDA3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Mobile advertising vehicle"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Kaise Kaam Karta Hai?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple 3-step process for drivers and businesses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg bg-white">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Step 1: Driver Register</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Driver apni details aur vehicle ki information submit karta
                  hai. Humari team vehicle approve karti hai.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg bg-white">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Step 2: Campaign Create</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Business apna campaign create karta hai, target area select
                  karta hai aur banner upload karta hai.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg bg-white">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Step 3: Earning Start</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Ads chalti hain, driver ko daily earning hoti hai. Transparent
                  tracking aur guaranteed payments.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* For Drivers */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-primary">
                  Drivers ke liye
                </h3>
                <p className="text-lg text-muted-foreground">
                  Apni regular driving se extra income kamayein
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Extra Income</h4>
                    <p className="text-muted-foreground">
                      Monthly ₹15,000 - ₹30,000 tak extra earning
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Easy Process</h4>
                    <p className="text-muted-foreground">
                      Bas register karein, approve hon aur earning shuru karein
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Transparent Payout</h4>
                    <p className="text-muted-foreground">
                      Daily tracking aur guaranteed weekly payments
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Businesses */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-primary">
                  Businesses ke liye
                </h3>
                <p className="text-lg text-muted-foreground">
                  Maximum reach minimum cost mein
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <BarChart className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Wider Reach</h4>
                    <p className="text-muted-foreground">
                      Har area mein thousands daily impressions
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <DollarSign className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Low Cost</h4>
                    <p className="text-muted-foreground">
                      Traditional advertising se 70% kam cost
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Zap className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Trackable Results</h4>
                    <p className="text-muted-foreground">
                      Real-time analytics aur detailed reports
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Car className="h-6 w-6" />
                <span className="text-xl font-bold">LocalAds.pk</span>
              </div>
              <p className="text-primary-foreground/80">
                Pakistan ka pehla mobile advertising platform. Drivers aur
                businesses ko connect karta hai.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Quick Links</h4>
              <div className="space-y-2">
                <div className="text-primary-foreground/80 hover:text-primary-foreground cursor-pointer">
                  About
                </div>
                <div className="text-primary-foreground/80 hover:text-primary-foreground cursor-pointer">
                  FAQ
                </div>
                <div className="text-primary-foreground/80 hover:text-primary-foreground cursor-pointer">
                  Contact
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Contact</h4>
              <div className="space-y-2 text-primary-foreground/80">
                <div>hello@localads.pk</div>
                <div>+92-300-1234567</div>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-primary-foreground/60">
              © 2024 LocalAds.pk. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
