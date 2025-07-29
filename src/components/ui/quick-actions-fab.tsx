
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, X, Zap, FileText, Search, MessageSquare } from "lucide-react";
import { useAuth } from "@/contexts/auth";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  description: string;
  requiresAuth?: boolean;
}

const quickActions: QuickAction[] = [
  {
    id: "request-audit",
    label: "Request Audit",
    icon: FileText,
    href: "/request-audit",
    description: "Submit your project for security review",
    requiresAuth: true
  },
  {
    id: "browse-services",
    label: "Browse Services",
    icon: Search,
    href: "/marketplace",
    description: "Find security experts",
    requiresAuth: false
  },
  {
    id: "get-support",
    label: "Get Support",
    icon: MessageSquare,
    href: "/support",
    description: "Contact our support team",
    requiresAuth: false
  }
];

export function QuickActionsFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const availableActions = quickActions.filter(action => 
    !action.requiresAuth || user
  );

  const handleActionClick = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <Card className="mb-4 shadow-lg">
          <CardContent className="p-3 space-y-2 min-w-[200px]">
            {availableActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.id}
                  variant="ghost"
                  onClick={() => handleActionClick(action.href)}
                  className="w-full justify-start h-auto p-3 flex-col items-start"
                >
                  <div className="flex items-center gap-2 w-full">
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{action.label}</span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">
                    {action.description}
                  </span>
                </Button>
              );
            })}
          </CardContent>
        </Card>
      )}

      <Button
        size="lg"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-14 w-14 rounded-full shadow-lg transition-all duration-200",
          isOpen && "rotate-45"
        )}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </Button>
    </div>
  );
}
