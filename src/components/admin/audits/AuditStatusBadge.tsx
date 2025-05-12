
import { Badge } from "@/components/ui/badge";

interface AuditStatusBadgeProps {
  status: string;
}

export function AuditStatusBadge({ status }: AuditStatusBadgeProps) {
  switch (status) {
    case "completed":
      return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Completed</Badge>;
    case "in_progress":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">In Progress</Badge>;
    case "scheduled":
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">Scheduled</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
}
