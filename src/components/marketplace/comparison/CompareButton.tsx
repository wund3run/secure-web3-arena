
import { Button } from "@/components/ui/button";
import { Compare } from "../icons/Compare";

interface CompareButtonProps {
  onCompare: () => void;
  count: number;
  className?: string;
}

export function CompareButton({ onCompare, count, className }: CompareButtonProps) {
  return (
    <Button
      variant={count >= 2 ? "default" : "outline"}
      size="sm"
      disabled={count < 2}
      onClick={onCompare}
      className={className}
    >
      <Compare className="h-4 w-4 mr-2" />
      Compare {count > 0 && `(${count})`}
    </Button>
  );
}
