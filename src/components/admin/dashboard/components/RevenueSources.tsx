
import { RevenueSourcesPieChart } from "../charts/RevenueSourcesPieChart";
import { RevenueSourcesList } from "./RevenueSourcesList";

interface RevenueSource {
  name: string;
  value: number;
  color: string;
}

interface RevenueSourcesProps {
  sources: RevenueSource[];
}

export function RevenueSources({ sources }: RevenueSourcesProps) {
  return (
    <div>
      <h4 className="font-medium text-sm mb-4">Revenue by Source</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-48">
          <RevenueSourcesPieChart sources={sources} />
        </div>
        <div>
          <RevenueSourcesList sources={sources} />
        </div>
      </div>
    </div>
  );
}
