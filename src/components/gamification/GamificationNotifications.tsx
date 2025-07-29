import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Star, 
  Zap, 
  Gift, 
  Crown, 
  Flame,
  Award,
  TrendingUp,
  Sparkles,
  X
} from 'lucide-react';
import { Badge as GamificationBadge } from '@/services/gamificationService';
import { motion, AnimatePresence } from 'framer-motion';

export interface GamificationNotification {
  id: string;
  type: 'xp_earned' | 'level_up' | 'badge_earned' | 'streak_milestone' | 'challenge_completed' | 'surprise_reward';
  title: string;
  description: string;
  xpGained?: number;
  newLevel?: number;
  badgeIcon?: string;
  badgeRarity?: 'common' | 'rare' | 'epic' | 'legendary';
  autoClose?: boolean;
  duration?: number;
  action?: string;
}

interface GamificationNotificationsProps {
  notifications: GamificationNotification[];
  onDismiss: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center';
}

const NotificationIcon = ({ type, badgeIcon }: { type: GamificationNotification['type']; badgeIcon?: string }) => {
  switch (type) {
    case 'xp_earned':
      return <Star className="h-6 w-6 text-blue-400" />;
    case 'level_up':
      return <Crown className="h-6 w-6 text-purple-400" />;
    case 'badge_earned':
      return badgeIcon ? <span className="text-2xl">{badgeIcon}</span> : <Award className="h-6 w-6 text-yellow-400" />;
    case 'streak_milestone':
      return <Flame className="h-6 w-6 text-orange-400" />;
    case 'challenge_completed':
      return <Trophy className="h-6 w-6 text-green-400" />;
    case 'surprise_reward':
      return <Gift className="h-6 w-6 text-pink-400" />;
    default:
      return <Zap className="h-6 w-6 text-blue-400" />;
  }
};

const getRarityColors = (rarity?: string) => {
  switch (rarity) {
    case 'common':
      return 'from-gray-400 to-gray-600';
    case 'rare':
      return 'from-blue-400 to-blue-600';
    case 'epic':
      return 'from-purple-400 to-purple-600';
    case 'legendary':
      return 'from-yellow-400 to-orange-500';
    default:
      return 'from-blue-400 to-blue-600';
  }
};

const getNotificationStyle = (type: GamificationNotification['type'], rarity?: string) => {
  const baseClasses = "relative overflow-hidden backdrop-blur-sm border shadow-lg animate-slide-in";
  
  switch (type) {
    case 'xp_earned':
      return `${baseClasses} bg-blue-50/90 border-blue-200 shadow-blue-100`;
    case 'level_up':
      return `${baseClasses} bg-gradient-to-r from-purple-50/90 to-yellow-50/90 border-purple-200 shadow-purple-200 animate-pulse`;
    case 'badge_earned':
      const rarityBg = rarity === 'legendary' ? 'from-yellow-50/90 to-orange-50/90' :
                      rarity === 'epic' ? 'from-purple-50/90 to-pink-50/90' :
                      rarity === 'rare' ? 'from-blue-50/90 to-indigo-50/90' :
                      'from-gray-50/90 to-slate-50/90';
      return `${baseClasses} bg-gradient-to-r ${rarityBg} border-yellow-200 shadow-yellow-100`;
    case 'streak_milestone':
      return `${baseClasses} bg-gradient-to-r from-orange-50/90 to-red-50/90 border-orange-200 shadow-orange-100`;
    case 'challenge_completed':
      return `${baseClasses} bg-green-50/90 border-green-200 shadow-green-100`;
    case 'surprise_reward':
      return `${baseClasses} bg-gradient-to-r from-pink-50/90 to-purple-50/90 border-pink-200 shadow-pink-100 animate-bounce`;
    default:
      return `${baseClasses} bg-white/90 border-gray-200`;
  }
};

const GamificationNotificationItem: React.FC<{
  notification: GamificationNotification;
  onDismiss: (id: string) => void;
}> = ({ notification, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-dismiss after duration
    const timer = setTimeout(() => {
      onDismiss(notification.id);
    }, notification.duration || 5000);

    return () => clearTimeout(timer);
  }, [notification.id, notification.duration, onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        duration: 0.5
      }}
      className={`w-80 rounded-lg p-4 mb-3 ${getNotificationStyle(notification.type, notification.badgeRarity)}`}
    >
      {/* Animated background effect for special notifications */}
      {(notification.type === 'level_up' || notification.type === 'badge_earned') && (
        <motion.div
          className="absolute inset-0 opacity-20"
          initial={{ backgroundPosition: "0% 50%" }}
          animate={{ backgroundPosition: "100% 50%" }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          style={{
            background: `linear-gradient(45deg, ${getRarityColors(notification.badgeRarity).replace('from-', '').replace(' to-', ', ')})`,
            backgroundSize: "200% 200%"
          }}
        />
      )}

      <div className="relative flex items-start space-x-3">
        {/* Icon with animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          className="flex-shrink-0"
        >
          <div className="h-10 w-10 rounded-full bg-white/80 flex items-center justify-center shadow-sm">
            <NotificationIcon type={notification.type} badgeIcon={notification.badgeIcon} />
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <motion.h4
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-sm font-semibold text-gray-900"
            >
              {notification.title}
            </motion.h4>
            
            <button
              onClick={() => onDismiss(notification.id)}
              className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors"
              aria-label="Dismiss notification"
              title="Dismiss notification"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-gray-700 mt-1"
          >
            {notification.description}
          </motion.p>

          {/* XP Display */}
          {notification.xpGained && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="mt-2 inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium"
            >
              <Star className="h-3 w-3 mr-1" />
              +{notification.xpGained} XP
            </motion.div>
          )}

          {/* Level Display */}
          {notification.newLevel && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="mt-2 inline-flex items-center px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium"
            >
              <Crown className="h-3 w-3 mr-1" />
              Level {notification.newLevel}
            </motion.div>
          )}

          {/* Badge Rarity */}
          {notification.badgeRarity && notification.type === 'badge_earned' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
              className={`mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize
                ${notification.badgeRarity === 'legendary' ? 'bg-yellow-100 text-yellow-800' :
                  notification.badgeRarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                  notification.badgeRarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'}`}
            >
              {notification.badgeRarity} Badge
            </motion.div>
          )}
        </div>
      </div>

      {/* Progress bar for timed notifications */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-current opacity-30 animate-shrink"
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: (notification.duration || 5000) / 1000, ease: "linear" }}
      />
    </motion.div>
  );
};

export const GamificationNotifications: React.FC<GamificationNotificationsProps> = ({
  notifications,
  onDismiss,
  position = 'top-right'
}) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'center':
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
      default:
        return 'top-4 right-4';
    }
  };

  if (!notifications.length) return null;

  return createPortal(
    <div className={`fixed z-50 ${getPositionClasses()}`}>
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => (
          <GamificationNotificationItem
            key={notification.id}
            notification={notification}
            onDismiss={onDismiss}
          />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
};

// Hook for managing gamification notifications
export const useGamificationNotifications = () => {
  const [notifications, setNotifications] = useState<GamificationNotification[]>([]);

  const addNotification = useCallback((notification: Omit<GamificationNotification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { ...notification, id }]);
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Helper methods for common notification types
  const showXPGained = useCallback((xp: number, action: string) => {
    addNotification({
      type: 'xp_earned',
      title: `+${xp} XP`,
      description: action,
      xpGained: xp,
      duration: 3000
    });
  }, [addNotification]);

  const showLevelUp = useCallback((newLevel: number, xpGained?: number) => {
    addNotification({
      type: 'level_up',
      title: `Level Up!`,
      description: `Congratulations! You've reached level ${newLevel}!`,
      newLevel,
      xpGained,
      duration: 6000
    });
  }, [addNotification]);

  const showBadgeEarned = useCallback((badgeName: string, badgeIcon: string, rarity: 'common' | 'rare' | 'epic' | 'legendary' = 'common') => {
    addNotification({
      type: 'badge_earned',
      title: 'Badge Earned!',
      description: `You've earned the ${badgeName} badge!`,
      badgeIcon,
      badgeRarity: rarity,
      duration: 5000
    });
  }, [addNotification]);

  const showStreakMilestone = useCallback((streak: number) => {
    addNotification({
      type: 'streak_milestone',
      title: 'Streak Milestone!',
      description: `Amazing! You've reached a ${streak}-day streak!`,
      duration: 4000
    });
  }, [addNotification]);

  const showChallengeCompleted = useCallback((challengeName: string, reward: string) => {
    addNotification({
      type: 'challenge_completed',
      title: 'Challenge Complete!',
      description: `You've completed the ${challengeName} challenge!`,
      duration: 4000
    });
  }, [addNotification]);

  const showSurpriseReward = useCallback((reward: string) => {
    addNotification({
      type: 'surprise_reward',
      title: 'Surprise Reward!',
      description: reward,
      duration: 5000
    });
  }, [addNotification]);

  return {
    notifications,
    addNotification,
    dismissNotification,
    clearAll,
    showXPGained,
    showLevelUp,
    showBadgeEarned,
    showStreakMilestone,
    showChallengeCompleted,
    showSurpriseReward
  };
};

// Progress toast for ongoing actions
export const showProgressToast = (title: string, progress: number, description?: string) => {
  toast.custom((t) => (
    <div className="flex items-center space-x-3 p-4 bg-white border rounded-lg shadow-lg">
      <div className="p-2 bg-blue-100 rounded-full">
        <TrendingUp className="h-4 w-4 text-blue-600" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        {description && <p className="text-sm text-gray-600">{description}</p>}
        <div className="mt-2">
          <Progress value={progress} className="h-2" />
          <div className="text-xs text-gray-500 mt-1">{Math.round(progress)}% complete</div>
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={() => toast.dismiss(t)}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  ), {
    duration: Infinity, // Keep until manually dismissed
    position: 'bottom-right'
  });
};

export default GamificationNotifications; 