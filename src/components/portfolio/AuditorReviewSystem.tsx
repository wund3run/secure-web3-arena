import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Award, 
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  BarChart3,
  Calendar,
  Filter,
  Search,
  Download,
  Eye
} from 'lucide-react';

interface Review {
  id: string;
  auditId: string;
  auditTitle: string;
  clientName: string;
  clientAvatar?: string;
  rating: number;
  reviewText: string;
  tags: string[];
  projectType: string;
  dateCompleted: string;
  helpful: number;
  verified: boolean;
  response?: {
    text: string;
    date: string;
  };
  metrics: {
    communicationRating: number;
    qualityRating: number;
    timelinessRating: number;
    professionalismRating: number;
  };
}

interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  categoryAverages: {
    communication: number;
    quality: number;
    timeliness: number;
    professionalism: number;
  };
  recentTrends: {
    period: string;
    change: number;
    trend: 'up' | 'down' | 'stable';
  };
}

interface AuditorReviewSystemProps {
  auditorId?: string;
  isOwnProfile?: boolean;
}

export default function AuditorReviewSystem({ auditorId, isOwnProfile = false }: AuditorReviewSystemProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewSummary, setReviewSummary] = useState<ReviewSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterRating, setFilterRating] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string>('newest');

  useEffect(() => {
    loadReviews();
  }, [auditorId]);

  const loadReviews = async () => {
    setIsLoading(true);
    try {
      // Mock data for demonstration
      const mockReviews: Review[] = [
        {
          id: '1',
          auditId: 'audit-001',
          auditTitle: 'DeFi Lending Protocol Security Audit',
          clientName: 'DeFi Protocol Inc.',
          rating: 5,
          reviewText: 'Outstanding work! The auditor identified critical vulnerabilities that could have resulted in significant losses. The communication was excellent throughout the process, and the final report was comprehensive and well-structured. Highly recommend for any serious DeFi project.',
          tags: ['thorough', 'professional', 'expert', 'responsive'],
          projectType: 'defi-protocol',
          dateCompleted: '2024-01-15',
          helpful: 12,
          verified: true,
          metrics: {
            communicationRating: 5,
            qualityRating: 5,
            timelinessRating: 4,
            professionalismRating: 5
          }
        },
        {
          id: '2',
          auditId: 'audit-002',
          auditTitle: 'Cross-Chain Bridge Security Review',
          clientName: 'MultiChain Solutions',
          rating: 4,
          reviewText: 'Great technical expertise and attention to detail. The auditor found several important issues that we missed. The only minor issue was a slight delay in delivery, but the quality of work more than made up for it.',
          tags: ['technical', 'detailed', 'knowledgeable'],
          projectType: 'bridge',
          dateCompleted: '2024-01-10',
          helpful: 8,
          verified: true,
          response: {
            text: 'Thank you for the feedback! The slight delay was due to discovering additional attack vectors that required deeper investigation. I always prioritize thoroughness over speed when it comes to security.',
            date: '2024-01-11'
          },
          metrics: {
            communicationRating: 4,
            qualityRating: 5,
            timelinessRating: 3,
            professionalismRating: 4
          }
        },
        {
          id: '3',
          auditId: 'audit-003',
          auditTitle: 'Smart Contract Security Assessment',
          clientName: 'StartupDAO',
          rating: 5,
          reviewText: 'Exceptional service! Not only did they find critical bugs, but they also provided educational explanations that helped our team understand the security implications. Will definitely work with again.',
          tags: ['educational', 'thorough', 'helpful', 'expert'],
          projectType: 'smart-contract',
          dateCompleted: '2024-01-05',
          helpful: 15,
          verified: true,
          metrics: {
            communicationRating: 5,
            qualityRating: 5,
            timelinessRating: 5,
            professionalismRating: 5
          }
        }
      ];

      const mockSummary: ReviewSummary = {
        averageRating: 4.7,
        totalReviews: 47,
        ratingDistribution: {
          5: 32,
          4: 10,
          3: 3,
          2: 1,
          1: 1
        },
        categoryAverages: {
          communication: 4.8,
          quality: 4.9,
          timeliness: 4.4,
          professionalism: 4.7
        },
        recentTrends: {
          period: 'Last 3 months',
          change: 0.2,
          trend: 'up'
        }
      };

      setReviews(mockReviews);
      setReviewSummary(mockSummary);
    } catch (error) {
      console.error('Error loading reviews:', error);
      toast({
        title: "Error loading reviews",
        description: "Could not load auditor reviews",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchesRating = filterRating === 'all' || review.rating.toString() === filterRating;
    const matchesType = filterType === 'all' || review.projectType === filterType;
    const matchesSearch = searchTerm === '' || 
      review.reviewText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.auditTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesRating && matchesType && matchesSearch;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.dateCompleted).getTime() - new Date(a.dateCompleted).getTime();
      case 'oldest':
        return new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime();
      case 'highest-rated':
        return b.rating - a.rating;
      case 'lowest-rated':
        return a.rating - b.rating;
      case 'most-helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClass = size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-6 w-6' : 'h-4 w-4';
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p>Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      {reviewSummary && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Review Summary
            </CardTitle>
            <CardDescription>Overall feedback and performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overall Rating */}
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold">{reviewSummary.averageRating.toFixed(1)}</div>
                {renderStars(reviewSummary.averageRating, 'lg')}
                <div className="text-sm text-muted-foreground mt-1">
                  {reviewSummary.totalReviews} reviews
                </div>
              </div>
              
              <Separator orientation="vertical" className="h-16" />
              
              <div className="flex-1">
                {Object.entries(reviewSummary.ratingDistribution).reverse().map(([rating, count]) => (
                  <div key={rating} className="flex items-center gap-2 mb-1">
                    <span className="text-sm w-3">{rating}</span>
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <Progress 
                      value={(count / reviewSummary.totalReviews) * 100} 
                      className="flex-1 h-2"
                    />
                    <span className="text-sm text-muted-foreground w-8">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Ratings */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Communication</div>
                <div className="font-semibold">{reviewSummary.categoryAverages.communication.toFixed(1)}</div>
                {renderStars(reviewSummary.categoryAverages.communication, 'sm')}
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Quality</div>
                <div className="font-semibold">{reviewSummary.categoryAverages.quality.toFixed(1)}</div>
                {renderStars(reviewSummary.categoryAverages.quality, 'sm')}
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Timeliness</div>
                <div className="font-semibold">{reviewSummary.categoryAverages.timeliness.toFixed(1)}</div>
                {renderStars(reviewSummary.categoryAverages.timeliness, 'sm')}
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Professionalism</div>
                <div className="font-semibold">{reviewSummary.categoryAverages.professionalism.toFixed(1)}</div>
                {renderStars(reviewSummary.categoryAverages.professionalism, 'sm')}
              </div>
            </div>

            {/* Recent Trends */}
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className={`h-4 w-4 ${reviewSummary.recentTrends.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
              <span>
                {reviewSummary.recentTrends.trend === 'up' ? '+' : ''}{reviewSummary.recentTrends.change.toFixed(1)} rating improvement over {reviewSummary.recentTrends.period.toLowerCase()}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <Select value={filterRating} onValueChange={setFilterRating}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Project Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="defi-protocol">DeFi Protocol</SelectItem>
                <SelectItem value="smart-contract">Smart Contract</SelectItem>
                <SelectItem value="bridge">Bridge</SelectItem>
                <SelectItem value="nft">NFT</SelectItem>
                <SelectItem value="dao">DAO</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="highest-rated">Highest Rated</SelectItem>
                <SelectItem value="lowest-rated">Lowest Rated</SelectItem>
                <SelectItem value="most-helpful">Most Helpful</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Client Reviews ({sortedReviews.length})
          </h3>
          {isOwnProfile && (
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Reviews
            </Button>
          )}
        </div>

        {sortedReviews.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No reviews found</h3>
              <p className="text-muted-foreground">
                {searchTerm || filterRating !== 'all' || filterType !== 'all'
                  ? 'Try adjusting your filters to see more reviews.'
                  : 'This auditor hasn\'t received any reviews yet.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          sortedReviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Review Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{review.clientName}</span>
                          {review.verified && (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">{review.auditTitle}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      {renderStars(review.rating)}
                      <div className="text-sm text-muted-foreground mt-1">
                        {new Date(review.dateCompleted).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div>
                    <p className="text-sm leading-relaxed">{review.reviewText}</p>
                  </div>

                  {/* Category Ratings */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-3 border-t border-b">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Communication</div>
                      {renderStars(review.metrics.communicationRating, 'sm')}
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Quality</div>
                      {renderStars(review.metrics.qualityRating, 'sm')}
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Timeliness</div>
                      {renderStars(review.metrics.timelinessRating, 'sm')}
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Professionalism</div>
                      {renderStars(review.metrics.professionalismRating, 'sm')}
                    </div>
                  </div>

                  {/* Tags and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {review.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        <span>{review.helpful}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {review.projectType}
                      </Badge>
                    </div>
                  </div>

                  {/* Auditor Response */}
                  {review.response && (
                    <div className="mt-4 p-4 bg-muted rounded-lg border-l-4 border-primary">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="h-4 w-4 text-primary" />
                        <span className="font-semibold text-sm">Auditor Response</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(review.response.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm">{review.response.text}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
} 