
import { Skeleton } from "@/components/ui/skeleton";

export function RevenueChartsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-6 bg-card rounded-lg border shadow-sm">
        <Skeleton className="h-5 w-40 mb-6" />
        <Skeleton className="h-[200px] w-full" />
      </div>
      <div className="p-6 bg-card rounded-lg border shadow-sm">
        <Skeleton className="h-5 w-32 mb-6" />
        <div className="flex justify-center items-center h-[200px]">
          <Skeleton className="h-[180px] w-[180px] rounded-full" />
        </div>
      </div>
    </div>
  );
}
