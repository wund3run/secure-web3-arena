
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Compare } from "../icons/Compare";

export function ComparisonHeader() {
  return (
    <DialogHeader>
      <DialogTitle className="flex items-center">
        <Compare className="mr-2 h-5 w-5" />
        Service Comparison
      </DialogTitle>
      <DialogDescription>
        Compare security services side by side to find the best match for your project
      </DialogDescription>
    </DialogHeader>
  );
}
