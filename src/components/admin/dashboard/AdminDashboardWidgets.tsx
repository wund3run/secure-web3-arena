
import { PlatformHealthWidget } from "./PlatformHealthWidget";
import { RevenueStreamsWidget } from "./RevenueStreamsWidget";
import { CategoryPerformanceWidget } from "./CategoryPerformanceWidget";

export function AdminDashboardWidgets() {
  return (
    <div className="grid gap-6">
      <PlatformHealthWidget />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueStreamsWidget />
        <CategoryPerformanceWidget />
      </div>
    </div>
  );
}
