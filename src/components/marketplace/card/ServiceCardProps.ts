
export interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  provider: {
    name: string;
    reputation: number; // Changed from optional to required
    level: "rookie" | "verified" | "expert"; // Changed from optional to required
    isVerified: boolean;
  };
  pricing: {
    amount: number;
    currency: string;
  };
  rating: number;
  completedJobs: number;
  category: string;
  tags: string[];
  imageUrl?: string;
  securityScore?: number;
  responseTime?: string;
  onClick?: () => void;
}
