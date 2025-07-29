
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { RatingData } from './AuditRatingForm';

export interface UserRating {
  id: string;
  audit_request_id: string;
  rater_id: string;
  rated_id: string;
  rating: number;
  review: string;
  categories: Record<string, number>;
  would_recommend: boolean;
  created_at: string;
}

export interface ReputationScore {
  userId: string;
  overallRating: number;
  totalRatings: number;
  categoryScores: Record<string, number>;
  recommendationRate: number;
  trustScore: number;
}

export class RatingService {
  static async submitRating(ratingData: RatingData): Promise<boolean> {
    try {
      // For now, save to localStorage until database schema is ready
      const rating = {
        id: Date.now().toString(),
        audit_request_id: ratingData.auditId,
        rater_id: 'current_user', // Will be replaced with actual user ID
        rated_id: ratingData.ratedUserId,
        rating: ratingData.overallRating,
        review: ratingData.review,
        categories: ratingData.categories,
        would_recommend: ratingData.wouldRecommend,
        created_at: new Date().toISOString()
      };

      const existingRatings = JSON.parse(localStorage.getItem('ratings') || '[]');
      existingRatings.push(rating);
      localStorage.setItem('ratings', JSON.stringify(existingRatings));

      return true;
    } catch (error) {
      console.error('Error submitting rating:', error);
      throw error;
    }
  }

  static async getUserRatings(userId: string): Promise<UserRating[]> {
    try {
      // For localStorage implementation
      const existingRatings = JSON.parse(localStorage.getItem('ratings') || '[]');
      return existingRatings.filter((rating: any) => rating.rated_id === userId);
    } catch (error) {
      console.error('Error fetching user ratings:', error);
      return [];
    }
  }

  static async calculateReputationScore(userId: string): Promise<ReputationScore> {
    try {
      const ratings = await this.getUserRatings(userId);

      if (ratings.length === 0) {
        return {
          userId,
          overallRating: 0,
          totalRatings: 0,
          categoryScores: {},
          recommendationRate: 0,
          trustScore: 0
        };
      }

      // Calculate overall rating
      const overallRating = ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length;

      // Calculate category scores
      const categoryScores: Record<string, number> = {};
      const categoryCount: Record<string, number> = {};

      ratings.forEach(rating => {
        Object.entries(rating.categories).forEach(([category, score]) => {
          if (!categoryScores[category]) {
            categoryScores[category] = 0;
            categoryCount[category] = 0;
          }
          categoryScores[category] += score;
          categoryCount[category]++;
        });
      });

      Object.keys(categoryScores).forEach(category => {
        categoryScores[category] = categoryScores[category] / categoryCount[category];
      });

      // Calculate recommendation rate
      const recommendationCount = ratings.filter(rating => rating.would_recommend).length;
      const recommendationRate = recommendationCount / ratings.length;

      // Calculate trust score (weighted algorithm)
      const trustScore = (
        overallRating * 0.4 +
        recommendationRate * 5 * 0.3 +
        Math.min(ratings.length / 10, 1) * 5 * 0.2 +
        (ratings.length > 0 ? 5 : 0) * 0.1
      );

      return {
        userId,
        overallRating: Math.round(overallRating * 10) / 10,
        totalRatings: ratings.length,
        categoryScores,
        recommendationRate: Math.round(recommendationRate * 100) / 100,
        trustScore: Math.round(trustScore * 10) / 10
      };
    } catch (error) {
      console.error('Error calculating reputation score:', error);
      throw error;
    }
  }

  static getTrustLevel(trustScore: number): {
    level: string;
    color: string;
    description: string;
  } {
    if (trustScore >= 4.5) {
      return {
        level: 'Elite',
        color: 'text-purple-600 bg-purple-100',
        description: 'Exceptional track record with consistently outstanding performance'
      };
    } else if (trustScore >= 4.0) {
      return {
        level: 'Expert',
        color: 'text-blue-600 bg-blue-100',
        description: 'Highly trusted with proven expertise and reliability'
      };
    } else if (trustScore >= 3.5) {
      return {
        level: 'Verified',
        color: 'text-green-600 bg-green-100',
        description: 'Trusted provider with good performance history'
      };
    } else if (trustScore >= 2.5) {
      return {
        level: 'Developing',
        color: 'text-yellow-600 bg-yellow-100',
        description: 'Building reputation with some completed work'
      };
    } else {
      return {
        level: 'New',
        color: 'text-gray-600 bg-gray-100',
        description: 'New to the platform or limited track record'
      };
    }
  }
}
