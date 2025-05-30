
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { canPerformAction } from '@/utils/auth/roleBasedRouting';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';

interface ActionGuardProps {
  action: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onUnauthorized?: () => void;
}

export const ActionGuard: React.FC<ActionGuardProps> = ({
  action,
  children,
  fallback,
  onUnauthorized
}) => {
  const { user, userProfile } = useAuth();

  const hasPermission = canPerformAction(user, action, userProfile);

  if (!hasPermission) {
    if (onUnauthorized) {
      onUnauthorized();
    }

    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <Button
        variant="outline"
        disabled
        onClick={() => toast.error("Action not permitted", {
          description: "You don't have permission to perform this action"
        })}
      >
        <Lock className="mr-2 h-4 w-4" />
        Restricted
      </Button>
    );
  }

  return <>{children}</>;
};

export default ActionGuard;
