import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Loader2, 
  Zap, 
  Users, 
  Eye,
  MessageCircle,
  Activity,
  X
} from 'lucide-react';

// Loading States for Audit Processing
interface AuditProcessingLoaderProps {
  stage: 'uploading' | 'analyzing' | 'scanning' | 'generating' | 'complete';
  progress?: number;
  className?: string;
}

export function AuditProcessingLoader({ stage, progress = 0, className }: AuditProcessingLoaderProps) {
  const stages = [
    { key: 'uploading', label: 'Uploading Files', icon: Clock },
    { key: 'analyzing', label: 'Analyzing Code', icon: Zap },
    { key: 'scanning', label: 'Scanning Vulnerabilities', icon: AlertCircle },
    { key: 'generating', label: 'Generating Report', icon: CheckCircle },
    { key: 'complete', label: 'Complete', icon: CheckCircle }
  ];

  const currentStageIndex = stages.findIndex(s => s.key === stage);

  return (
    <div className={cn("w-full max-w-md mx-auto p-6", className)}>
      <div className="space-y-4">
        {stages.map((stageItem, index) => {
          const Icon = stageItem.icon;
          const isActive = index === currentStageIndex;
          const isCompleted = index < currentStageIndex;
          const isPending = index > currentStageIndex;

          return (
            <motion.div
              key={stageItem.key}
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300",
                isCompleted && "bg-green-500 text-white",
                isActive && "bg-blue-500 text-white animate-pulse",
                isPending && "bg-gray-200 text-gray-400"
              )}>
                {isActive ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
              </div>
              
              <div className="flex-1">
                <p className={cn(
                  "text-sm font-medium transition-colors",
                  isCompleted && "text-green-600",
                  isActive && "text-blue-600",
                  isPending && "text-gray-400"
                )}>
                  {stageItem.label}
                </p>
                
                {isActive && progress > 0 && (
                  <div className="mt-1">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <motion.div
                        className="bg-blue-500 h-1.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{progress}%</p>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Success Animation for Completed Audits
interface SuccessAnimationProps {
  title?: string;
  description?: string;
  onComplete?: () => void;
  className?: string;
}

export function SuccessAnimation({ 
  title = "Audit Complete!", 
  description = "Your security audit has been successfully completed.",
  onComplete,
  className 
}: SuccessAnimationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className={cn("flex flex-col items-center justify-center p-8 text-center", className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <motion.div
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center"
          animate={{ 
            boxShadow: [
              "0 0 0 0 rgba(34, 197, 94, 0.4)",
              "0 0 0 20px rgba(34, 197, 94, 0)",
              "0 0 0 0 rgba(34, 197, 94, 0)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <CheckCircle className="h-10 w-10 text-green-600" />
        </motion.div>
      </motion.div>

      <motion.h3
        className="text-xl font-semibold text-gray-900 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {title}
      </motion.h3>

      <motion.p
        className="text-gray-600 mt-2 max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {description}
      </motion.p>

      <motion.div
        className="flex space-x-1 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-green-500 rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

// Real-time Collaboration Indicators
interface CollaborationIndicatorProps {
  activeUsers: Array<{
    id: string;
    name: string;
    avatar?: string;
    color: string;
    cursor?: { x: number; y: number };
  }>;
  className?: string;
}

export function CollaborationIndicator({ activeUsers, className }: CollaborationIndicatorProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="flex items-center space-x-1">
        <Activity className="h-4 w-4 text-green-500" />
        <span className="text-sm text-gray-600">Live</span>
      </div>

      <div className="flex -space-x-2">
        <AnimatePresence>
          {activeUsers.slice(0, 3).map((user) => (
            <motion.div
              key={user.id}
              className="relative"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div
                className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-white"
                style={{ backgroundColor: user.color }}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full" />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </div>
              
              <motion.div
                className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {activeUsers.length > 3 && (
        <div className="text-xs text-gray-500">
          +{activeUsers.length - 3} more
        </div>
      )}
    </div>
  );
}

// Live Cursor Indicators
interface LiveCursorProps {
  cursors: Array<{
    id: string;
    name: string;
    color: string;
    x: number;
    y: number;
  }>;
}

export function LiveCursors({ cursors }: LiveCursorProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {cursors.map((cursor) => (
          <motion.div
            key={cursor.id}
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: cursor.x,
              y: cursor.y
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="drop-shadow-lg"
            >
              <path
                d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
                fill={cursor.color}
                stroke="white"
                strokeWidth="1"
              />
            </svg>
            
            <div
              className="absolute top-5 left-2 px-2 py-1 rounded text-xs text-white font-medium whitespace-nowrap"
              style={{ backgroundColor: cursor.color }}
            >
              {cursor.name}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Typing Indicator
interface TypingIndicatorProps {
  users: string[];
  className?: string;
}

export function TypingIndicator({ users, className }: TypingIndicatorProps) {
  if (users.length === 0) return null;

  const displayText = users.length === 1 
    ? `${users[0]} is typing...`
    : users.length === 2
    ? `${users[0]} and ${users[1]} are typing...`
    : `${users[0]} and ${users.length - 1} others are typing...`;

  return (
    <motion.div
      className={cn("flex items-center space-x-2 text-sm text-gray-500", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
    >
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 bg-gray-400 rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 1.4, 
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
      <span>{displayText}</span>
    </motion.div>
  );
}

// Notification Toast with Animation
interface NotificationToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  duration?: number;
  onClose?: () => void;
}

export function NotificationToast({ 
  type, 
  title, 
  description, 
  duration = 5000, 
  onClose 
}: NotificationToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose?.(), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertCircle,
    info: MessageCircle
  };

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const Icon = icons[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            "fixed top-4 right-4 max-w-sm w-full border rounded-lg p-4 shadow-lg z-50",
            colors[type]
          )}
          initial={{ opacity: 0, x: 300, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="flex items-start space-x-3">
            <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium">{title}</p>
              {description && (
                <p className="text-sm opacity-90 mt-1">{description}</p>
              )}
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Progress Ring Animation
interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  children?: React.ReactNode;
}

export function ProgressRing({ 
  progress, 
  size = 120, 
  strokeWidth = 8, 
  className,
  children 
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-200"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          className="text-blue-500"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeInOut" }}
          strokeLinecap="round"
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
} 