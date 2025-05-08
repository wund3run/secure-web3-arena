import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ClientTestimonial } from "@/components/trust/client-testimonial";
import { TrustSignals } from "@/components/trust/trust-signals";
import { SecurityScore } from "@/components/trust/security-metrics";
import { ReportIssue } from "@/components/trust/report-issue";
import { ServiceCardProps } from "@/data/marketplace-data";

export default function ServiceDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state?.serviceDetail as ServiceCardProps;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
	const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    if (!service) {
      // Redirect to marketplace if service details are not available
      navigate("/marketplace");
    }
  }, [service, navigate]);

  if (!service) {
    // Render a loading state or a message indicating redirection
    return <div>Redirecting to Marketplace...</div>;
  }

  const handleReviewSubmit = () => {
    // Implement your review submission logic here
    console.log("Review submitted:", reviewText);
    setIsDialogOpen(false);
    setReviewText("");
  };

  // Fix the testimonials data structure to match the required type
  const testimonials = [
    {
      name: "Alex Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      isVerified: true,
      badges: ["Top Client", "5+ Projects"]
    },
    {
      name: "Sarah Williams",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      isVerified: true,
      badges: ["Enterprise"]
    },
    {
      name: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      isVerified: false,
      badges: ["New Client"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="relative rounded-lg overflow-hidden mb-8">
            <img
              src={service.imageUrl || `https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1600&auto=format&fit=crop`}
              alt={service.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <Badge className="bg-primary/90 text-white mb-2">{service.category}</Badge>
              <h1 className="text-3xl font-bold text-white">{service.title}</h1>
            </div>
          </div>

          {/* Service Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Service Description and Features */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Service Overview</h2>
              <p className="text-muted-foreground mb-6">{service.description}</p>

              <h3 className="text-xl font-bold mb-3">Key Features</h3>
              <ul className="list-disc list-inside text-muted-foreground mb-6">
                {service.tags.map((tag: string, index: number) => (
                  <li key={index}>{tag}</li>
                ))}
              </ul>

              {/* Accordion for More Details */}
              <Accordion type="single" collapsible className="w-full mb-6">
                <AccordionItem value="details">
                  <AccordionTrigger>Additional Details</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      This service provides comprehensive security audits and
                      penetration testing for smart contracts, ensuring the
                      highest level of protection against potential threats.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="pricing">
                  <AccordionTrigger>Pricing Information</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      The pricing for this service is {service.pricing.amount}{" "}
                      {service.pricing.currency} per audit. Custom pricing
                      options are available for long-term engagements.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Client Testimonials */}
              <h3 className="text-xl font-bold mb-3">Client Testimonials</h3>
              <div className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="p-4">
                    <ClientTestimonial client={testimonial} quote={`${service.title} exceeded our expectations. The audit was thorough and the security recommendations were actionable.`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Booking and Provider Info */}
            <div>
              <div className="bg-card border border-border rounded-lg p-6 sticky top-4">
                <div className="text-2xl font-bold text-center mb-4">
                  {service.pricing.amount} {service.pricing.currency}
                </div>

                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                  <span>Provider</span>
                  <span className="font-medium">{service.provider.name}</span>
                </div>

                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                  <span>Reputation</span>
                  <span className="font-medium">{service.provider.reputation}%</span>
                </div>

                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                  <span>Completed Jobs</span>
                  <span className="font-medium">{service.completedJobs}</span>
                </div>

                {/* Calendar and Booking Section */}
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">Book a Consultation</h4>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center" side="bottom">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) =>
                          date < new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-3 mt-6">
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                    Request Service
                  </Button>
                  <Button variant="outline" className="w-full">
                    Contact Provider
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Trust and Security Section */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Trust & Security</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Trust Signals</h3>
                <TrustSignals reputation={service.provider.reputation} isVerified={service.provider.isVerified} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Security Score</h3>
                <SecurityScore score={85} />
              </div>
            </div>
            <div className="mt-6">
              <ReportIssue />
            </div>
          </section>

          {/* Review Submission Section */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Write a Review</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Write a Review</h3>
                    <p className="text-sm text-muted-foreground">
                      Share your experience with this service.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Textarea
                      placeholder="Your review here..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleReviewSubmit}>Submit Review</Button>
                </div>
              </DialogContent>
            </Dialog>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
