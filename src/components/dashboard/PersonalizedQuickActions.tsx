import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Clock,
  Star,
  ArrowRight,
  Trophy,
  Target,
  BookOpen,
  Users,
  Gift,
  TrendingUp,
  CheckCircle,
  Plus
} from 'lucide-react';
import { QuickWin, RecommendedFeature, ActionPlanItem } from '../../types/personalization';

interface PersonalizedQuickActionsProps {
  quickWins: QuickWin[];
  recommendedFeatures: RecommendedFeature[];
  actionPlan: ActionPlanItem[];
  onQuickWinComplete: (quickWin: QuickWin) => void;
  onFeatureClick: (feature: RecommendedFeature) => void;
  onActionClick: (action: ActionPlanItem) => void;
}

const PersonalizedQuickActions: React.FC<PersonalizedQuickActionsProps> = ({
  quickWins,
  recommendedFeatures,
  actionPlan,
  onQuickWinComplete,
  onFeatureClick,
  onActionClick
}) => {
  const [activeTab, setActiveTab] = useState<'quick-wins' | 'features' | 'action-plan'>('quick-wins');

  const getValueColor = (value: 'high' | 'medium' | 'low') => {
    switch (value) {
      case 'high': return 'text-green-600 dark:text-green-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'low': return 'text-gray-600 dark:text-gray-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 dark:text-green-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'hard': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20';
      case 'medium': return 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20';
      case 'low': return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20';
      default: return 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800';
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const availableQuickWins = quickWins.filter(qw => !qw.completed);
  const totalQuickWinXp = availableQuickWins.reduce((sum, qw) => sum + qw.xpValue, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Quick Actions
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Personalized recommendations to boost your progress
            </p>
          </div>
          
          {availableQuickWins.length > 0 && (
            <div className="flex items-center space-x-2 text-sm">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-600 dark:text-gray-400">
                {totalQuickWinXp} XP available
              </span>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mt-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('quick-wins')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'quick-wins'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Quick Wins</span>
              {availableQuickWins.length > 0 && (
                <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
                  {availableQuickWins.length}
                </span>
              )}
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab('features')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'features'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Star className="w-4 h-4" />
              <span>Features</span>
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab('action-plan')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'action-plan'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Action Plan</span>
            </div>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'quick-wins' && (
          <div className="space-y-4">
            {availableQuickWins.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  All caught up!
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  You've completed all available quick wins. New ones will appear as you progress.
                </p>
              </div>
            ) : (
              availableQuickWins.map((quickWin, index) => (
                <motion.div
                  key={quickWin.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {quickWin.title}
                        </h4>
                        <div className="flex items-center space-x-1 text-xs">
                          <Trophy className="w-3 h-3 text-yellow-500" />
                          <span className="text-yellow-600 dark:text-yellow-400 font-medium">
                            {quickWin.xpValue} XP
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-500 dark:text-gray-400">
                            {formatTime(quickWin.estimatedTime)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {quickWin.description}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onQuickWinComplete(quickWin)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>Complete Action</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ))
            )}
          </div>
        )}

        {activeTab === 'features' && (
          <div className="space-y-4">
            {recommendedFeatures.length === 0 ? (
              <div className="text-center py-8">
                <Star className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Fully featured!
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  You're using all the recommended features for your experience level.
                </p>
              </div>
            ) : (
              recommendedFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {feature.title}
                        </h4>
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                          {feature.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {feature.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs">
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-3 h-3" />
                          <span className={`font-medium ${getValueColor(feature.estimatedValue)}`}>
                            {feature.estimatedValue} value
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="w-3 h-3" />
                          <span className={`font-medium ${getDifficultyColor(feature.difficulty)}`}>
                            {feature.difficulty}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-500 dark:text-gray-400">
                            {formatTime(feature.timeToValue)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onFeatureClick(feature)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>Explore Feature</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ))
            )}
          </div>
        )}

        {activeTab === 'action-plan' && (
          <div className="space-y-4">
            {actionPlan.length === 0 ? (
              <div className="text-center py-8">
                <Target className="w-12 h-12 text-purple-500 mx-auto mb-3" />
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Action plan ready!
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Your personalized action plan will appear here based on your goals and progress.
                </p>
              </div>
            ) : (
              actionPlan.map((action, index) => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`border-2 rounded-lg p-4 hover:shadow-md transition-all duration-200 ${getPriorityColor(action.priority)}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {action.title}
                        </h4>
                        <span className={`text-xs px-2 py-1 rounded capitalize font-medium ${
                          action.priority === 'high' 
                            ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                            : action.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        }`}>
                          {action.priority} priority
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {action.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs">
                        <span className="text-gray-500 dark:text-gray-400">
                          {action.category}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-500 dark:text-gray-400">
                            ~{action.estimatedDuration}h
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onActionClick(action)}
                    className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>Start Action</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalizedQuickActions; 