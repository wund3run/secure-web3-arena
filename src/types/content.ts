
export interface KnowledgeBaseArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category: string;
  tags: string[];
  author_id: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  view_count: number;
  helpful_count: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface ForumCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  icon?: string;
  sort_order: number;
  created_at: string;
}

export interface ForumTopic {
  id: string;
  title: string;
  slug: string;
  content: string;
  category_id: string;
  author_id: string;
  is_pinned: boolean;
  is_locked: boolean;
  view_count: number;
  reply_count: number;
  last_reply_at: string;
  last_reply_by?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface ForumReply {
  id: string;
  topic_id: string;
  content: string;
  author_id: string;
  parent_reply_id?: string;
  is_solution: boolean;
  vote_score: number;
  created_at: string;
  updated_at: string;
}

export interface Tutorial {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  video_url?: string;
  duration_minutes?: number;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
  author_id: string;
  prerequisites: string[];
  learning_objectives: string[];
  is_featured: boolean;
  view_count: number;
  completion_count: number;
  rating_average: number;
  rating_count: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface UserTutorialProgress {
  id: string;
  user_id: string;
  tutorial_id: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progress_percentage: number;
  completed_at?: string;
  time_spent_minutes: number;
  created_at: string;
  updated_at: string;
}

export interface AIAnalysisResult {
  id: string;
  user_id: string;
  analysis_type: 'security' | 'gas' | 'compliance' | 'full';
  input_code: string;
  language: string;
  results: unknown;
  security_score?: number;
  vulnerability_count: number;
  gas_optimization_count: number;
  compliance_violations: number;
  created_at: string;
}
