
import { Dispatch, SetStateAction } from "react";

export interface ComparisonManagerProps {
  maxCompare?: number;
}

export interface ComparisonDialogProps {
  services?: any[];
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}
