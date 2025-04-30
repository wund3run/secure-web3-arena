
import { useState } from "react";
import { Star, MessageSquare, ThumbsUp, Flag, Calendar, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { TrustBadge } from "@/components/trust/trust-badges";

interface Review {
  id: string;
  author: {
    name: string;
    avatar?: string;
    isVerified: boolean;
    badges?: string[];
  };
  rating: number;
  content: string;
  date: string;
  helpful: number;
  projectType?: string;
  verifiedPurchase?: boolean;
}

interface ServiceReviewsProps {
  serviceId: string;
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
}

export function ServiceReviews({ serviceId, averageRating, totalReviews, reviews }: ServiceReviewsProps) {
  const [helpfulReviews, setHelpfulReviews] = useState<string[]>([]);
  const [filterVerified, setFilterVerified] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportReviewId, setReportReviewId] = useState<string | null>(null);

  const handleHelpfulClick = (reviewId: string) => {
    if (helpfulReviews.includes(reviewId)) {
      setHelpfulReviews(helpfulReviews.filter(id => id !== reviewId));
    } else {
      setHelpfulReviews([...helpfulReviews, reviewId]);
      toast.success("Thank you for your feedback!");
    }
  };
  
  const handleReportReview = (reviewId: string) => {
    setReportReviewId(reviewId);
    setShowReportDialog(true);
    // In a real implementation, this would open a dialog to report the review
    toast.info("Report functionality would open here", {
      description: "This would allow reporting inappropriate reviews"
    });
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
  
  // Calculate rating distribution
  const ratingCounts = {5: 0, 4: 0, 3: 0, 2: 0, 1: 0};
  reviews.forEach(review => {
    const rating = Math.round(review.rating);
    if (rating >= 1 && rating <= 5) {
      ratingCounts[rating as keyof typeof ratingCounts]++;
    }
  });

  const filteredReviews = filterVerified 
    ? reviews.filter(review => review.author.isVerified || review.verifiedPurchase)
    : reviews;

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

      {/* Rating distribution */}
      <div className="bg-card border border-border/40 p-4 rounded-md mb-4">
        <h4 className="font-medium mb-3">Rating Distribution</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = ratingCounts[rating as keyof typeof ratingCounts];
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            
            return (
              <div key={rating} className="flex items-center">
                <div className="w-12 text-sm">{rating} stars</div>
                <div className="w-full mx-2">
                  <Progress value={percentage} className="h-2" />
                </div>
                <div className="w-12 text-right text-sm">{count}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button 
          variant={filterVerified ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilterVerified(!filterVerified)}
          className="flex items-center"
        >
          <Check className="mr-1 h-3 w-3" />
          {filterVerified ? "Showing Verified Only" : "Show Verified Only"}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => toast.info("Filter functionality would open here")}
        >
          Latest First
        </Button>
      </div>

      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id} className="overflow-hidden border border-border/50 hover:border-border">
            <CardHeader className="pb-2 pt-4 px-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={review.author.avatar} />
                    <AvatarFallback>{review.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">{review.author.name}</span>
                      {review.author.isVerified && (
                        <Badge variant="outline" className="text-xs font-normal">Verified User</Badge>
                      )}
                      {review.verifiedPurchase && (
                        <Badge variant="secondary" className="text-xs font-normal flex items-center gap-1">
                          <Check className="h-3 w-3" />
                          Verified Purchase
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {review.date}
                      </div>
                      {review.projectType && (
                        <span className="hidden sm:inline-block">• {review.projectType}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex">{renderStars(review.rating)}</div>
              </div>
              
              {/* Trust badges for reviewer */}
              {review.author.badges && review.author.badges.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {review.author.badges.map((badge) => (
                    <TrustBadge
                      key={badge}
                      type={badge as any}
                      size="sm"
                    />
                  ))}
                </div>
              )}
            </CardHeader>
            
            <CardContent className="pt-2 px-4 pb-2">
              <p className="text-sm mb-3">{review.content}</p>
            </CardContent>
            
            <CardFooter className="px-4 py-2 border-t border-border/30 flex justify-between items-center">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs flex items-center hover:bg-muted"
                onClick={() => handleHelpfulClick(review.id)}
              >
                <ThumbsUp className={`mr-1 h-3 w-3 ${helpfulReviews.includes(review.id) ? "fill-primary text-primary" : ""}`} />
                Helpful {review.helpful + (helpfulReviews.includes(review.id) ? 1 : 0)}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs flex items-center hover:bg-muted text-muted-foreground"
                onClick={() => handleReportReview(review.id)}
              >
                <Flag className="mr-1 h-3 w-3" />
                Report
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-12 border border-dashed border-border/40 rounded-lg">
          <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-30 mb-3" />
          <h4 className="text-lg font-medium">No Reviews Yet</h4>
          <p className="text-muted-foreground mt-1 mb-4">Be the first to review this service</p>
          <Button 
            variant="outline" 
            onClick={() => toast.info("Review form would open here")}
          >
            Write a Review
          </Button>
        </div>
      )}

      {filteredReviews.length > 0 && reviews.length > 3 && (
        <div className="flex justify-center">
          <Button variant="outline" size="sm">
            View all {totalReviews} reviews
          </Button>
        </div>
      )}
    </div>
  );
}
