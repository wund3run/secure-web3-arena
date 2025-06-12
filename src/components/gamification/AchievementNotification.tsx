
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, X, Star, Award, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xpReward: number;
}

interface AchievementNotificationProps {
  achievement: Achievement;
  onClose: () => void;
  show: boolean;
}

export const AchievementNotification: React.FC<AchievementNotificationProps> = ({
  achievement,
  onClose,
  show
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for animation to complete
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-yellow-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'trophy': return <Trophy className="h-8 w-8" />;
      case 'star': return <Star className="h-8 w-8" />;
      case 'award': return <Award className="h-8 w-8" />;
      case 'zap': return <Zap className="h-8 w-8" />;
      default: return <Trophy className="h-8 w-8" />;
    }
  };

  if (!show && !isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <Card className={`w-80 bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white shadow-lg border-0`}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2">
                {getIcon(achievement.icon)}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg">Achievement Unlocked!</h3>
                  <Badge variant="secondary" className="text-xs capitalize">
                    {achievement.rarity}
                  </Badge>
                </div>
                <h4 className="font-semibold">{achievement.title}</h4>
                <p className="text-sm opacity-90">{achievement.description}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="h-4 w-4" />
                  <span className="text-sm font-medium">+{achievement.xpReward} XP</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 300);
              }}
              className="text-white hover:bg-white/20 h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
