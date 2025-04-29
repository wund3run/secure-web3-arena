
import { useState } from "react";
import { Star, MessageSquare, ThumbsUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface Review {
  id: string;
  author: {
    name: string;
    avatar?: string;
    isVerified: boolean;
  };
  rating: number;
  content: string;
  date: string;
  helpful: number;
}

interface ServiceReviewsProps {
  serviceId: string;
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
}

export function ServiceReviews({ serviceId, averageRating, totalReviews, reviews }: ServiceReviewsProps) {
  const [helpfulReviews, setHelpfulReviews] = useState<string[]>([]);

  const handleHelpfulClick = (reviewId: string) => {
    if (helpfulReviews.includes(reviewId)) {
      setHelpfulReviews(helpfulReviews.filter(id => id !== reviewId));
    } else {
      setHelpfulReviews([...helpfulReviews, reviewId]);
      toast.success("Thank you for your feedback!");
    }
  };

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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold mb-1">Customer Reviews</h3>
          <div className="flex items-center">
            <div className="flex mr-2">{renderStars(averageRating)}</div>
            <span className="font-bold">{averageRating.toFixed(1)}</span>
            <span className="text-muted-foreground ml-1">({totalReviews} reviews)</span>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-2 sm:mt-0"
          onClick={() => toast.info("Review form would open here")}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Write a Review
        </Button>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="overflow-hidden">
            <CardHeader className="pb-2 pt-4 px-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={review.author.avatar} />
                    <AvatarFallback>{review.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium mr-1">{review.author.name}</span>
                      {review.author.isVerified && (
                        <Badge variant="outline" className="text-xs font-normal">Verified User</Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">{review.date}</div>
                  </div>
                </div>
                <div className="flex">{renderStars(review.rating)}</div>
              </div>
            </CardHeader>
            <CardContent className="pt-2 px-4 pb-4">
              <p className="text-sm mb-3">{review.content}</p>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs flex items-center hover:bg-muted"
                  onClick={() => handleHelpfulClick(review.id)}
                >
                  <ThumbsUp className={`mr-1 h-3 w-3 ${helpfulReviews.includes(review.id) ? "fill-primary text-primary" : ""}`} />
                  Helpful {review.helpful + (helpfulReviews.includes(review.id) ? 1 : 0)}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {reviews.length > 3 && (
        <div className="flex justify-center">
          <Button variant="outline" size="sm">
            View all {totalReviews} reviews
          </Button>
        </div>
      )}
    </div>
  );
}
