
export interface ServiceSubmission {
  id: string;
  title: string;
  category: string;
  provider_id: string;
  provider_name?: string;
  created_at: string;
  verification_status: "pending" | "approved" | "rejected";
  blockchain_ecosystems: string[];
  description: string;
  delivery_time: number;
  price_range: {
    min: number;
    max: number;
  };
  portfolio_link?: string;
}
