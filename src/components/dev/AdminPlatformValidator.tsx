
import React, { useEffect, useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlatformValidatorWidget } from "@/utils/validation/components/PlatformValidatorWidget";
import { useLocation } from "react-router-dom";
import { AlertCircle, ArrowRightCircle, CheckCircle } from "lucide-react";

export function AdminPlatformValidator() {
  const [showValidator, setShowValidator] = useState(false);
  const [adminRouteIssues, setAdminRouteIssues] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    // Check for common admin route issues
    const checkAdminRoutes = () => {
      const issues: string[] = [];
      
      // Check for potentially problematic routes
      const currentPath = location.pathname;
      if (!currentPath.startsWith('/admin')) {
        issues.push("Current route is not in the admin section");
      }
      
      // Check authentication status from localStorage
      const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
      if (!isAuthenticated) {
        issues.push("Admin authentication is missing or expired");
      }

      setAdminRouteIssues(issues);
    };
    
    checkAdminRoutes();
  }, [location.pathname]);

  return (
    <div className="space-y-4">
      {adminRouteIssues.length > 0 && (
        <Alert variant="error">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Admin navigation issues detected</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside mt-2">
              {adminRouteIssues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {!showValidator ? (
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium flex justify-between items-center">
              <span>Admin Platform Validation</span>
              {adminRouteIssues.length === 0 ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-amber-500" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowValidator(true)}
              className="w-full flex items-center justify-center gap-2"
            >
              <span>Run Full Validation</span>
              <ArrowRightCircle className="h-3 w-3" />
            </Button>
          </CardContent>
        </Card>
      ) : (
        <PlatformValidatorWidget 
          stakeholder="admin"
          onClose={() => setShowValidator(false)}
        />
      )}
    </div>
  );
}

export default AdminPlatformValidator;
