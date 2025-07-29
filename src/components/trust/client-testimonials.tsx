import { Star, Quote, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TrustBadge } from "@/components/trust/trust-badges";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface ClientTestimonialProps {
  name: string;
  role?: string;
  company?: string;
  projectType?: string;
  testimonial: string;
  rating: number;
  avatar?: string;
  verified?: boolean;
  date?: string;
  projectValue?: string;
  badges?: Array<"verified" | "expert" | "top-rated" | "endorsed" | "certified" | "trusted">;
}

export function ClientTestimonial({
  name,
  role,
  company,
  projectType,
  testimonial,
  rating,
  avatar,
  verified = false,
  date,
  projectValue,
  badges = []
}: ClientTestimonialProps) {
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-web3-orange text-web3-orange" : "text-muted"
          }`}
        />
      ));
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div>
            <Avatar className="h-12 w-12">
              <AvatarImage src={avatar} />
              <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium">{name}</span>
              {verified && (
                <Badge variant="outline" className="text-xs">Verified Client</Badge>
              )}
            </div>
            
            {(role || company) && (
              <p className="text-sm text-muted-foreground">
                {role}{company ? ` at ${company}` : ''}
              </p>
            )}
            
            <div className="flex items-center mt-1">
              {renderStars(rating)}
              {projectType && (
                <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-full">
                  {projectType}
                </span>
              )}
            </div>
            
            {badges && badges.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {badges.map((badge) => (
                  <TrustBadge
                    key={badge}
                    type={badge}
                    size="sm"
                  />
                ))}
              </div>
            )}
            
            <div className="relative mt-3">
              <Quote className="absolute top-0 left-0 h-4 w-4 text-muted-foreground opacity-30 -translate-x-1 -translate-y-1" />
              <blockquote className="pl-3 text-sm italic">
                "{testimonial}"
              </blockquote>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-muted-foreground">
              {date && <span>{date}</span>}
              {projectValue && (
                <span className="flex items-center">
                  <CheckCircle className="mr-1 h-3 w-3 text-green-500" />
                  Project value: {projectValue}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface TestimonialCarouselProps {
  testimonials: ClientTestimonialProps[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
            <div className="p-1">
              <ClientTestimonial {...testimonial} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center mt-4">
        <CarouselPrevious className="static transform-none mx-2" />
        <CarouselNext className="static transform-none mx-2" />
      </div>
    </Carousel>
  );
}

export function FeaturedTestimonials() {
  const testimonials = [
    {
      name: "Alexander Johnson",
      role: "Chief Technology Officer",
      company: "SecureDeFi Protocol",
      projectType: "Smart Contract Audit",
      testimonial: "The security audit was incredibly thorough. They identified critical vulnerabilities that could have resulted in significant fund loss.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=1",
      verified: true,
      date: "March 15, 2025",
      projectValue: "$25,000+",
      badges: ["verified", "expert"] as Array<"verified" | "expert" | "top-rated" | "endorsed" | "certified" | "trusted">
    },
    {
      name: "Maria Chen",
      role: "Founder & Creative Director",
      company: "ArtBlock NFT Marketplace",
      projectType: "Security Assessment",
      testimonial: "Working with Hawkly's security experts gave us confidence in our code and helped us build trust with our community.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=5",
      verified: true,
      date: "February 8, 2025",
      projectValue: "$10,000+",
      badges: ["top-rated"] as Array<"verified" | "expert" | "top-rated" | "endorsed" | "certified" | "trusted">
    },
    {
      name: "David Kim",
      role: "Lead Developer & Architect",
      company: "CryptoQuest GameFi",
      projectType: "Penetration Testing",
      testimonial: "The audit delivered was comprehensive, detailed, and identified issues other auditors missed. Highly recommended!",
      rating: 4,
      avatar: "https://i.pravatar.cc/150?img=8",
      verified: true,
      date: "April 2, 2025",
      projectValue: "$15,000+",
      badges: ["trusted", "certified"] as Array<"verified" | "expert" | "top-rated" | "endorsed" | "certified" | "trusted">
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold">Trusted by Web3 Leaders</h3>
        <p className="text-muted-foreground mt-1">
          See what our clients say about our security services
        </p>
      </div>
      <TestimonialCarousel testimonials={testimonials} />
    </div>
  );
}

export function TestimonialGrid({ testimonials }: { testimonials: ClientTestimonialProps[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <ClientTestimonial key={index} {...testimonial} />
      ))}
    </div>
  );
}
