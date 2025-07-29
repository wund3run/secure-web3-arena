
export interface Milestone {
  title: string;
  description: string;
  date: string;
  link?: {
    url: string;
    text: string;
  };
  status: "completed" | "in-progress" | "upcoming";
}

export interface RoadmapPhase {
  id: number;
  title: string;
  description: string;
  progress: 25 | 50 | 75 | 100;
  milestones: Milestone[];
  visualAsset?: string; // URL or path to infographic/GIF/video
}

export interface CompletedMilestone {
  title: string;
  description: string;
  date: string;
  impact: string;
  caseStudyLink?: string;
  image?: string;
}
