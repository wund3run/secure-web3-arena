
import { Badge } from "@/components/ui/badge";

interface AuditSeverityBadgeProps {
  severity: string;
}

export function AuditSeverityBadge({ severity }: AuditSeverityBadgeProps) {
  switch (severity) {
    case "critical":
      return <Badge className="bg-red-500">Critical</Badge>;
    case "high":
      return <Badge className="bg-orange-500">High</Badge>;
    case "medium":
      return <Badge className="bg-yellow-500">Medium</Badge>;
    case "low":
      return <Badge className="bg-green-500">Low</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
}
