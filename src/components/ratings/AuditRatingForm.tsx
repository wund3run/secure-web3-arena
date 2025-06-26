
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface RatingCategory {
  id: string;
  label: string;
  description: string;
  rating: number;
}

interface AuditRatingFormProps {
  auditId: string;
  ratedUserId: string;
  ratedUserName: string;
  userRole: 'client' | 'auditor';
  onSubmit: (rating: RatingData) => void;
  onCancel: () => void;
}

export interface RatingData {
  auditId: string;
  ratedUserId: string;
  overallRating: number;
  categories: Record<string, number>;
  review: string;
  wouldRecommend: boolean;
}

export function AuditRatingForm({
  auditId,
  ratedUserId,
  ratedUserName,
  userRole,
  onSubmit,
  onCancel
}: AuditRatingFormProps) {
  const [overallRating, setOverallRating] = useState(0);
  const [review, setReview] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Different categories based on user role
  const getCategories = (): RatingCategory[] => {
    if (userRole === 'client') {
      return [
        { id: 'technical_quality', label: 'Technical Quality', description: 'Depth and accuracy of security analysis', rating: 0 },
        { id: 'communication', label: 'Communication', description: 'Clarity and responsiveness', rating: 0 },
        { id: 'timeliness', label: 'Timeliness', description: 'Met deadlines and milestones', rating: 0 },
        { id: 'professionalism', label: 'Professionalism', description: 'Overall professional conduct', rating: 0 }
      ];
    } else {
      return [
        { id: 'project_clarity', label: 'Project Clarity', description: 'Clear requirements and expectations', rating: 0 },
        { id: 'responsiveness', label: 'Responsiveness', description: 'Quick responses to questions', rating: 0 },
        { id: 'payment_timeliness', label: 'Payment', description: 'Timely payment processing', rating: 0 },
        { id: 'collaboration', label: 'Collaboration', description: 'Easy to work with', rating: 0 }
      ];
    }
  };

  const [categories, setCategories] = useState<RatingCategory[]>(getCategories());

  const updateCategoryRating = (categoryId: string, rating: number) => {
    setCategories(prev => 
      prev.map(cat => 
        cat.id === categoryId ? { ...cat, rating } : cat
      )
    );
  };

  const renderStarRating = (rating: number, onRatingChange: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className="focus:outline-none"
          >
            <Star
              className={`h-6 w-6 ${
                star <= rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              } hover:text-yellow-400`}
            />
          </button>
        ))}
      </div>
    );
  };

  const handleSubmit = async () => {
    if (overallRating === 0) {
      toast.error('Please provide an overall rating');
      return;
    }

    if (categories.some(cat => cat.rating === 0)) {
      toast.error('Please rate all categories');
      return;
    }

    if (!review.trim()) {
      toast.error('Please provide a written review');
      return;
    }

    setIsSubmitting(true);
    try {
      const categoryRatings = categories.reduce((acc, cat) => {
        acc[cat.id] = cat.rating;
        return acc;
      }, {} as Record<string, number>);

      await onSubmit({
        auditId,
        ratedUserId,
        overallRating,
        categories: categoryRatings,
        review: review.trim(),
        wouldRecommend
      });

      toast.success('Rating submitted successfully');
    } catch (error) {
      toast.error('Failed to submit rating');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-400" />
          Rate Your Experience with {ratedUserName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Rating */}
        <div className="space-y-2">
          <Label className="text-base font-medium">Overall Rating</Label>
          <div className="flex items-center gap-4">
            {renderStarRating(overallRating, setOverallRating)}
            <span className="text-sm text-muted-foreground">
              {overallRating > 0 && `${overallRating} out of 5 stars`}
            </span>
          </div>
        </div>

        {/* Category Ratings */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Detailed Ratings</Label>
          {categories.map((category) => (
            <div key={category.id} className="space-y-2">
              <div>
                <div className="font-medium">{category.label}</div>
                <div className="text-sm text-muted-foreground">{category.description}</div>
              </div>
              <div className="flex items-center gap-4">
                {renderStarRating(category.rating, (rating) => updateCategoryRating(category.id, rating))}
                <span className="text-sm text-muted-foreground min-w-[80px]">
                  {category.rating > 0 && `${category.rating}/5`}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Written Review */}
        <div className="space-y-2">
          <Label htmlFor="review" className="text-base font-medium">
            Written Review
          </Label>
          <Textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder={`Share your experience working with ${ratedUserName}. What went well? What could be improved?`}
            rows={4}
            className="resize-none"
          />
        </div>

        {/* Recommendation */}
        <div className="space-y-2">
          <Label className="text-base font-medium">Would you recommend {ratedUserName}?</Label>
          <div className="flex gap-4">
            <Button
              type="button"
              variant={wouldRecommend ? "default" : "outline"}
              onClick={() => setWouldRecommend(true)}
              className="flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Yes, I would recommend
            </Button>
            <Button
              type="button"
              variant={!wouldRecommend ? "default" : "outline"}
              onClick={() => setWouldRecommend(false)}
            >
              No, I would not recommend
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Rating'}
          </Button>
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
