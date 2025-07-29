
import { Review } from "./hooks/types/marketplace-types";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceReviewsProps {
  serviceId: string;
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
}

export function ServiceReviews({
  serviceId,
  averageRating,
  totalReviews,
  reviews
}: ServiceReviewsProps) {
  function renderStars(rating: number) {
    return Array.from({ length: 5 }).map((_, i) => {
      const filled = i < Math.floor(rating);
      const halfFilled = !filled && i < Math.ceil(rating) && rating % 1 !== 0;
      
      return (
        <span key={i} className="text-yellow-400">
          {filled ? (
            <Star className="w-4 h-4 fill-yellow-400" />
          ) : halfFilled ? (
            <span className="relative">
              <Star className="w-4 h-4" />
              <Star className="absolute top-0 left-0 w-4 h-4 fill-yellow-400 overflow-hidden" style={{ clipPath: 'inset(0 50% 0 0)' }} />
            </span>
          ) : (
            <Star className="w-4 h-4" />
          )}
        </span>
      );
    });
  }

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Service Reviews</h3>
        <div className="flex items-center gap-1">
          <span className="inline-flex">
            {renderStars(averageRating)}
          </span>
          <span className="ml-1 text-sm text-muted-foreground">
            ({totalReviews} reviews)
          </span>
        </div>
      </div>
      
      <div className="space-y-4 pt-2">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-border/50 pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                  {review.author.charAt(0)}
                </div>
                <span className="font-medium">{review.author}</span>
              </div>
              <div className="flex items-center">
                {renderStars(review.rating)}
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-2">{review.content}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{review.date}</span>
              <div className="flex items-center gap-4">
                <span>{review.helpful} found this helpful</span>
                <Button variant="ghost" size="sm" className="h-6 text-xs">Helpful?</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center pt-4">
        <Button variant="outline">Load More Reviews</Button>
      </div>
    </div>
  );
}
