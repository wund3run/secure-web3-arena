
export interface FunnelStage {
  name: string;
  value: number;
  dropoff: number;
  action: string;
  color: string;
}

export interface FunnelData {
  auditor: FunnelStage[];
  projectOwner: FunnelStage[];
  general: FunnelStage[];
}
