
import React from 'react';
import { Trophy, Star, Award } from 'lucide-react';
import { HawklyLogo } from '@/components/layout/hawkly-logo';

export function LeaderboardHeader() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <HawklyLogo 
              variant="large"
              className="text-white"
              showText={false}
            />
          </div>
          <div className="flex justify-center mb-4">
            <Trophy className="h-12 w-12 text-yellow-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Auditor Leaderboard
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            Discover top-performing security auditors based on their expertise, completed audits, and community ratings
          </p>
          <div className="flex justify-center space-x-8">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-300 mr-2" />
              <span>Top Rated</span>
            </div>
            <div className="flex items-center">
              <Award className="h-5 w-5 text-yellow-300 mr-2" />
              <span>Most Experienced</span>
            </div>
            <div className="flex items-center">
              <Trophy className="h-5 w-5 text-yellow-300 mr-2" />
              <span>Fastest Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
