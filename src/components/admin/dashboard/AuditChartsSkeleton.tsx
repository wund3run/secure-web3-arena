
import { Skeleton } from "@/components/ui/skeleton";

export function AuditChartsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-6 bg-card rounded-lg border shadow-sm">
        <Skeleton className="h-5 w-40 mb-6" />
        <Skeleton className="h-[200px] w-full" />
      </div>
      <div className="p-6 bg-card rounded-lg border shadow-sm">
        <Skeleton className="h-5 w-40 mb-6" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    </div>
  );
}
