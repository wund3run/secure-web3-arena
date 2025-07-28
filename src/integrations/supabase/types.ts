export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      feedback_analytics: {
        Row: {
          auditor_id: string;
          average_rating: number;
          rating_count: number;
          most_common_feedback: string;
          data: { feedbacks: string[] };
          updated_at: string;
          created_at?: string;
        };
        Insert: {
          auditor_id: string;
          average_rating: number;
          rating_count: number;
          most_common_feedback: string;
          data: { feedbacks: string[] };
          updated_at?: string;
          created_at?: string;
        };
        Update: {
          auditor_id?: string;
          average_rating?: number;
          rating_count?: number;
          most_common_feedback?: string;
          data?: { feedbacks: string[] };
          updated_at?: string;
          created_at?: string;
        };
        Relationships: [];
      },
      disputes: {
        Row: {
          id: string;
          project_id: string;
          raised_by: string;
          against: string;
          status: 'opened' | 'in_review' | 'resolved' | 'closed';
          resolution_notes?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          raised_by: string;
          against: string;
          status: 'opened' | 'in_review' | 'resolved' | 'closed';
          resolution_notes?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          raised_by?: string;
          against?: string;
          status?: 'opened' | 'in_review' | 'resolved' | 'closed';
          resolution_notes?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      },
      engagement_offers: {
        Row: {
          id: string;
          audit_request_id: string;
          auditor_id: string;
          client_id: string;
          status: string;
          terms: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          audit_request_id: string;
          auditor_id: string;
          client_id: string;
          status: string;
          terms: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          audit_request_id?: string;
          auditor_id?: string;
          client_id?: string;
          status?: string;
          terms?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      },
      chat_rooms: {
        Row: {
          id: string;
          name: string;
          type: string;
          audit_request_id: string;
          participants: string[];
          metadata: any;
          communication_style: string | null;
          complexity_preference: string | null;
          created_at: string | null;
          preferred_auditor_experience: string | null;
          timeline_flexibility: number | null;
          updated_at: string | null;
          user_id: string | null;
        }
        Insert: {
          id?: string;
          name: string;
          type: string;
          audit_request_id: string;
          participants: string[];
          metadata?: any;
          budget_flexibility?: number | null;
          communication_style?: string | null;
          complexity_preference?: string | null;
          created_at?: string | null;
          preferred_auditor_experience?: string | null;
          timeline_flexibility?: number | null;
          updated_at?: string | null;
          user_id?: string | null;
        }
        Update: {
          id?: string;
          name?: string;
          type?: string;
          audit_request_id?: string;
          participants?: string[];
          metadata?: any;
          budget_flexibility?: number | null;
          communication_style?: string | null;
          complexity_preference?: string | null;
          created_at?: string | null;
          preferred_auditor_experience?: string | null;
          timeline_flexibility?: number | null;
          updated_at?: string | null;
          user_id?: string | null;
        }
        Relationships: []
      }
      ai_matching_scores: {
        Row: {
          audit_request_id: string
          auditor_id: string
          availability_score: number
          budget_compatibility_score: number
          calculated_at: string | null
          expertise_score: number
          id: string
          overall_score: number
          past_performance_score: number
          timeline_compatibility_score: number
        }
        Insert: {
          audit_request_id: string
          auditor_id: string
          availability_score: number
          budget_compatibility_score: number
          calculated_at?: string | null
          expertise_score: number
          id?: string
          overall_score: number
          past_performance_score: number
          timeline_compatibility_score: number
        }
        Update: {
          audit_request_id?: string
          auditor_id?: string
          availability_score?: number
          budget_compatibility_score?: number
          calculated_at?: string | null
          expertise_score?: number
          id?: string
          overall_score?: number
          past_performance_score?: number
          timeline_compatibility_score?: number
        }
        Relationships: [
          {
            foreignKeyName: "ai_matching_scores_audit_request_id_fkey"
            columns: ["audit_request_id"]
            isOneToOne: false
            referencedRelation: "audit_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_matching_scores_auditor_id_fkey"
            columns: ["auditor_id"]
            isOneToOne: false
            referencedRelation: "auditor_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_events: {
        Row: {
          created_at: string
          event_name: string
          id: string
          properties: Json | null
          timestamp: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_name: string
          id?: string
          properties?: Json | null
          timestamp?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_name?: string
          id?: string
          properties?: Json | null
          timestamp?: string
          user_id?: string | null
        }
        Relationships: []
      }
      audit_deliverables: {
        Row: {
          audit_request_id: string
          created_at: string
          delivered_at: string | null
          description: string | null
          due_date: string | null
          file_url: string | null
          id: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          audit_request_id: string
          created_at?: string
          delivered_at?: string | null
          description?: string | null
          due_date?: string | null
          file_url?: string | null
          id?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          audit_request_id?: string
          created_at?: string
          delivered_at?: string | null
          description?: string | null
          due_date?: string | null
          file_url?: string | null
          id?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_deliverables_audit_request_id_fkey"
            columns: ["audit_request_id"]
            isOneToOne: false
            referencedRelation: "audit_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_findings: {
        Row: {
          audit_request_id: string
          category: string
          code_snippet: string | null
          created_at: string
          description: string
          id: string
          location: string | null
          recommendation: string | null
          severity: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          audit_request_id: string
          category: string
          code_snippet?: string | null
          created_at?: string
          description: string
          id?: string
          location?: string | null
          recommendation?: string | null
          severity: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          audit_request_id?: string
          category?: string
          code_snippet?: string | null
          created_at?: string
          description?: string
          id?: string
          location?: string | null
          recommendation?: string | null
          severity?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_findings_audit_request_id_fkey"
            columns: ["audit_request_id"]
            isOneToOne: false
            referencedRelation: "audit_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log: {
        Row: {
          action: string
          audit_request_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          action: string
          audit_request_id: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Update: {
          action?: string
          audit_request_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_log_audit_request_id_fkey"
            columns: ["audit_request_id"]
            isOneToOne: false
            referencedRelation: "audit_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_messages: {
        Row: {
          audit_request_id: string
          content: string
          created_at: string | null
          file_attachments: Json | null
          id: string
          is_read: boolean | null
          message_type: string | null
          reply_to_id: string | null
          sender_id: string
        }
        Insert: {
          audit_request_id: string
          content: string
          created_at?: string | null
          file_attachments?: Json | null
          id?: string
          is_read?: boolean | null
          message_type?: string | null
          reply_to_id?: string | null
          sender_id: string
        }
        Update: {
          audit_request_id?: string
          content?: string
          created_at?: string | null
          file_attachments?: Json | null
          id?: string
          is_read?: boolean | null
          message_type?: string | null
          reply_to_id?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_messages_audit_request_id_fkey"
            columns: ["audit_request_id"]
            isOneToOne: false
            referencedRelation: "audit_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_messages_reply_to_id_fkey"
            columns: ["reply_to_id"]
            isOneToOne: false
            referencedRelation: "audit_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_milestones: {
        Row: {
          actual_time_hours: number | null
          approval_required: boolean | null
          approved_at: string | null
          approved_by: string | null
          audit_request_id: string
          completed_at: string | null
          completed_by: string | null
          created_at: string
          deliverables: Json | null
          description: string | null
          due_date: string | null
          id: string
          order_index: number
          status: string
          time_estimate_hours: number | null
          title: string
          updated_at: string
        }
        Insert: {
          actual_time_hours?: number | null
          approval_required?: boolean | null
          approved_at?: string | null
          approved_by?: string | null
          audit_request_id: string
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string
          deliverables?: Json | null
          description?: string | null
          due_date?: string | null
          id?: string
          order_index: number
          status?: string
          time_estimate_hours?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          actual_time_hours?: number | null
          approval_required?: boolean | null
          approved_at?: string | null
          approved_by?: string | null
          audit_request_id?: string
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string
          deliverables?: Json | null
          description?: string | null
          due_date?: string | null
          id?: string
          order_index?: number
          status?: string
          time_estimate_hours?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_milestones_audit_request_id_fkey"
            columns: ["audit_request_id"]
            isOneToOne: false
            referencedRelation: "audit_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_progress: {
        Row: {
          actual_start_date: string | null
          audit_request_id: string
          auditor_id: string
          created_at: string | null
          current_phase: string
          deliverables: Json | null
          estimated_completion_date: string | null
          id: string
          milestones_completed: number | null
          notes: string | null
          phase_details: Json | null
          progress_percentage: number | null
          quality_metrics: Json | null
          time_tracking: Json | null
          total_milestones: number | null
          updated_at: string | null
        }
        Insert: {
          actual_start_date?: string | null
          audit_request_id: string
          auditor_id: string
          created_at?: string | null
          current_phase?: string
          deliverables?: Json | null
          estimated_completion_date?: string | null
          id?: string
          milestones_completed?: number | null
          notes?: string | null
          phase_details?: Json | null
          progress_percentage?: number | null
          quality_metrics?: Json | null
          time_tracking?: Json | null
          total_milestones?: number | null
          updated_at?: string | null
        }
        Update: {
          actual_start_date?: string | null
          audit_request_id?: string
          auditor_id?: string
          created_at?: string | null
          current_phase?: string
          deliverables?: Json | null
          estimated_completion_date?: string | null
          id?: string
          milestones_completed?: number | null
          notes?: string | null
          phase_details?: Json | null
          progress_percentage?: number | null
          quality_metrics?: Json | null
          time_tracking?: Json | null
          total_milestones?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_progress_audit_request_id_fkey"
            columns: ["audit_request_id"]
            isOneToOne: true
            referencedRelation: "audit_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_progress_auditor_id_fkey"
            columns: ["auditor_id"]
            isOneToOne: false
            referencedRelation: "auditor_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_proposals: {
        Row: {
          audit_request_id: string
          auditor_id: string
          estimated_timeline_days: number
          id: string
          milestones: Json | null
          proposal_text: string
          proposed_cost: number
          responded_at: string | null
          status: string | null
          submitted_at: string | null
        }
        Insert: {
          audit_request_id: string
          auditor_id: string
          estimated_timeline_days: number
          id?: string
          milestones?: Json | null
          proposal_text: string
          proposed_cost: number
          responded_at?: string | null
          status?: string | null
          submitted_at?: string | null
        }
        Update: {
          audit_request_id?: string
          auditor_id?: string
          estimated_timeline_days?: number
          id?: string
          milestones?: Json | null
          proposal_text?: string
          proposed_cost?: number
          responded_at?: string | null
          status?: string | null
          submitted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_proposals_audit_request_id_fkey"
            columns: ["audit_request_id"]
            isOneToOne: false
            referencedRelation: "audit_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_proposals_auditor_id_fkey"
            columns: ["auditor_id"]
            isOneToOne: false
            referencedRelation: "auditor_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_reports: {
        Row: {
          approved_by: string | null
          audit_request_id: string
          content: Json
          created_at: string
          file_url: string | null
          generated_by: string
          id: string
          published_at: string | null
          report_type: string
          reviewed_by: string | null
          status: string
          template_used: string | null
          title: string
          updated_at: string
          version: string
        }
        Insert: {
          approved_by?: string | null
          audit_request_id: string
          content?: Json
          created_at?: string
          file_url?: string | null
          generated_by: string
          id?: string
          published_at?: string | null
          report_type: string
          reviewed_by?: string | null
          status?: string
          template_used?: string | null
          title: string
          updated_at?: string
          version?: string
        }
        Update: {
          approved_by?: string | null
          audit_request_id?: string
          content?: Json
          created_at?: string
          file_url?: string | null
          generated_by?: string
          id?: string
          published_at?: string | null
          report_type?: string
          reviewed_by?: string | null
          status?: string
          template_used?: string | null
          title?: string
          updated_at?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_reports_audit_request_id_fkey"
            columns: ["audit_request_id"]
            isOneToOne: false
            referencedRelation: "audit_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_requests: {
        Row: {
          ai_matching_completed: boolean | null
          assigned_auditor_id: string | null
          audit_scope: string | null
          auto_assign_enabled: boolean | null
          blockchain: string
          budget: number | null
          client_id: string
          communication_preference: string | null
          completion_percentage: number | null
          contract_count: number | null
          created_at: string
          current_phase: string | null
          deadline: string | null
          escrow_contract_id: string | null
          id: string
          lines_of_code: number | null
          matching_score: number | null
          preferred_auditor_location: string | null
          previous_audits: boolean | null
          priority_score: number | null
          project_description: string | null
          project_name: string
          repository_url: string | null
          security_score: number | null
          specific_concerns: string | null
          status: string | null
          updated_at: string
          urgency_level: string | null
        }
        Insert: {
          ai_matching_completed?: boolean | null
          assigned_auditor_id?: string | null
          audit_scope?: string | null
          auto_assign_enabled?: boolean | null
          blockchain: string
          budget?: number | null
          client_id: string
          communication_preference?: string | null
          completion_percentage?: number | null
          contract_count?: number | null
          created_at?: string
          current_phase?: string | null
          deadline?: string | null
          escrow_contract_id?: string | null
          id?: string
          lines_of_code?: number | null
          matching_score?: number | null
          preferred_auditor_location?: string | null
          previous_audits?: boolean | null
          priority_score?: number | null
          project_description?: string | null
          project_name: string
          repository_url?: string | null
          security_score?: number | null
          specific_concerns?: string | null
          status?: string | null
          updated_at?: string
          urgency_level?: string | null
        }
        Update: {
          ai_matching_completed?: boolean | null
          assigned_auditor_id?: string | null
          audit_scope?: string | null
          auto_assign_enabled?: boolean | null
          blockchain?: string
          budget?: number | null
          client_id?: string
          communication_preference?: string | null
          completion_percentage?: number | null
          contract_count?: number | null
          created_at?: string
          current_phase?: string | null
          deadline?: string | null
          escrow_contract_id?: string | null
          id?: string
          lines_of_code?: number | null
          matching_score?: number | null
          preferred_auditor_location?: string | null
          previous_audits?: boolean | null
          priority_score?: number | null
          project_description?: string | null
          project_name?: string
          repository_url?: string | null
          security_score?: number | null
          specific_concerns?: string | null
          status?: string | null
          updated_at?: string
          urgency_level?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_requests_assigned_auditor_id_fkey"
            columns: ["assigned_auditor_id"]
            isOneToOne: false
            referencedRelation: "auditor_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_requests_escrow_contract_id_fkey"
            columns: ["escrow_contract_id"]
            isOneToOne: false
            referencedRelation: "escrow_contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_status_updates: {
        Row: {
          audit_request_id: string
          created_at: string
          id: string
          message: string | null
          metadata: Json | null
          status_type: string
          title: string
          user_id: string
        }
        Insert: {
          audit_request_id: string
          created_at?: string
          id?: string
          message?: string | null
          metadata?: Json | null
          status_type: string
          title: string
          user_id: string
        }
        Update: {
          audit_request_id?: string
          created_at?: string
          id?: string
          message?: string | null
          metadata?: Json | null
          status_type?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_status_updates_audit_request_id_fkey"
            columns: ["audit_request_id"]
            isOneToOne: false
            referencedRelation: "audit_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_time_tracking: {
        Row: {
          activity_type: string
          audit_request_id: string
          auditor_id: string
          billable: boolean | null
          created_at: string
          description: string | null
          duration_minutes: number | null
          end_time: string | null
          id: string
          milestone_id: string | null
          start_time: string
        }
        Insert: {
          activity_type: string
          audit_request_id: string
          auditor_id: string
          billable?: boolean | null
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          end_time?: string | null
          id?: string
          milestone_id?: string | null
          start_time: string
        }
        Update: {
          activity_type?: string
          audit_request_id?: string
          auditor_id?: string
          billable?: boolean | null
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          end_time?: string | null
          id?: string
          milestone_id?: string | null
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_time_tracking_audit_request_id_fkey"
            columns: ["audit_request_id"]
            isOneToOne: false
            referencedRelation: "audit_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_time_tracking_milestone_id_fkey"
            columns: ["milestone_id"]
            isOneToOne: false
            referencedRelation: "audit_milestones"
            referencedColumns: ["id"]
          },
        ]
      }
      auditor_availability: {
        Row: {
          auditor_id: string
          block_reason: string | null
          created_at: string | null
          date_available: string
          hours_available: number | null
          id: string
          is_blocked: boolean | null
        }
        Insert: {
          auditor_id: string
          block_reason?: string | null
          created_at?: string | null
          date_available: string
          hours_available?: number | null
          id?: string
          is_blocked?: boolean | null
        }
        Update: {
          auditor_id?: string
          block_reason?: string | null
          created_at?: string | null
          date_available?: string
          hours_available?: number | null
          id?: string
          is_blocked?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "auditor_availability_auditor_id_fkey"
            columns: ["auditor_id"]
            isOneToOne: false
            referencedRelation: "auditor_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      auditor_profiles: {
        Row: {
          audit_types: string[] | null
          availability_status: string | null
          average_completion_time_days: number | null
          blockchain_expertise: string[] | null
          business_name: string | null
          certifications: Json | null
          created_at: string | null
          current_audit_count: number | null
          github_username: string | null
          hourly_rate_max: number | null
          hourly_rate_min: number | null
          id: string
          languages_spoken: string[] | null
          linkedin_url: string | null
          max_concurrent_audits: number | null
          max_project_size: number | null
          min_project_size: number | null
          portfolio_url: string | null
          preferred_project_types: string[] | null
          repeat_client_rate: number | null
          response_time_hours: number | null
          specialization_tags: string[] | null
          success_rate: number | null
          timezone: string | null
          total_audits_completed: number | null
          updated_at: string | null
          user_id: string
          verification_documents: Json | null
          verification_status: string | null
          years_experience: number
        }
        Insert: {
          audit_types?: string[] | null
          availability_status?: string | null
          average_completion_time_days?: number | null
          blockchain_expertise?: string[] | null
          business_name?: string | null
          certifications?: Json | null
          created_at?: string | null
          current_audit_count?: number | null
          github_username?: string | null
          hourly_rate_max?: number | null
          hourly_rate_min?: number | null
          id?: string
          languages_spoken?: string[] | null
          linkedin_url?: string | null
          max_concurrent_audits?: number | null
          max_project_size?: number | null
          min_project_size?: number | null
          portfolio_url?: string | null
          preferred_project_types?: string[] | null
          repeat_client_rate?: number | null
          response_time_hours?: number | null
          specialization_tags?: string[] | null
          success_rate?: number | null
          timezone?: string | null
          total_audits_completed?: number | null
          updated_at?: string | null
          user_id: string
          verification_documents?: Json | null
          verification_status?: string | null
          years_experience?: number
        }
        Update: {
          audit_types?: string[] | null
          availability_status?: string | null
          average_completion_time_days?: number | null
          blockchain_expertise?: string[] | null
          business_name?: string | null
          certifications?: Json | null
          created_at?: string | null
          current_audit_count?: number | null
          github_username?: string | null
          hourly_rate_max?: number | null
          hourly_rate_min?: number | null
          id?: string
          languages_spoken?: string[] | null
          linkedin_url?: string | null
          max_concurrent_audits?: number | null
          max_project_size?: number | null
          min_project_size?: number | null
          portfolio_url?: string | null
          preferred_project_types?: string[] | null
          repeat_client_rate?: number | null
          response_time_hours?: number | null
          specialization_tags?: string[] | null
          success_rate?: number | null
          timezone?: string | null
          total_audits_completed?: number | null
          updated_at?: string | null
          user_id?: string
          verification_documents?: Json | null
          verification_status?: string | null
          years_experience?: number
        }
        Relationships: []
      }
      auditor_reviews: {
        Row: {
          audit_request_id: string | null
          auditor_id: string | null
          client_id: string | null
          communication_rating: number | null
          created_at: string | null
          id: string
          rating: number | null
          review_text: string | null
          technical_quality_rating: number | null
          timeliness_rating: number | null
          would_recommend: boolean | null
        }
        Insert: {
          audit_request_id?: string | null
          auditor_id?: string | null
          client_id?: string | null
          communication_rating?: number | null
          created_at?: string | null
          id?: string
          rating?: number | null
          review_text?: string | null
          technical_quality_rating?: number | null
          timeliness_rating?: number | null
          would_recommend?: boolean | null
        }
        Update: {
          audit_request_id?: string | null
          auditor_id?: string | null
          client_id?: string | null
          communication_rating?: number | null
          created_at?: string | null
          id?: string
          rating?: number | null
          review_text?: string | null
          technical_quality_rating?: number | null
          timeliness_rating?: number | null
          would_recommend?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "auditor_reviews_audit_request_id_fkey"
            columns: ["audit_request_id"]
            isOneToOne: false
            referencedRelation: "audit_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      auditor_skills: {
        Row: {
          auditor_id: string | null
          created_at: string | null
          id: string
          proficiency_level: number | null
          skill_name: string
        }
        Insert: {
          auditor_id?: string | null
          created_at?: string | null
          id?: string
          proficiency_level?: number | null
          skill_name: string
        }
        Update: {
          auditor_id?: string | null
          created_at?: string | null
          id?: string
          proficiency_level?: number | null
          skill_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "auditor_skills_auditor_id_fkey"
            columns: ["auditor_id"]
            isOneToOne: false
            referencedRelation: "auditor_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      ceramic_profiles: {
        Row: {
          created_at: string
          did: string
          id: string
          profile_data: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          did: string
          id?: string
          profile_data?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          did?: string
          id?: string
          profile_data?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      certifications: {
        Row: {
          certificate_url: string | null
          certification_type: Database["public"]["Enums"]["certification_type"]
          expires_at: string | null
          id: string
          is_active: boolean
          issued_at: string
          metadata: Json | null
          user_id: string
          verification_code: string | null
        }
        Insert: {
          certificate_url?: string | null
          certification_type: Database["public"]["Enums"]["certification_type"]
          expires_at?: string | null
          id?: string
          is_active?: boolean
          issued_at?: string
          metadata?: Json | null
          user_id: string
          verification_code?: string | null
        }
        Update: {
          certificate_url?: string | null
          certification_type?: Database["public"]["Enums"]["certification_type"]
          expires_at?: string | null
          id?: string
          is_active?: boolean
          issued_at?: string
          metadata?: Json | null
          user_id?: string
          verification_code?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          file_attachments: Json | null
          id: string
          message_type: string
          read_at: string | null
          receiver_id: string
          reply_to_id: string | null
          sender_id: string
          updated_at: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          file_attachments?: Json | null
          id?: string
          message_type?: string
          read_at?: string | null
          receiver_id: string
          reply_to_id?: string | null
          sender_id: string
          updated_at?: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          file_attachments?: Json | null
          id?: string
          message_type?: string
          read_at?: string | null
          receiver_id?: string
          reply_to_id?: string | null
          sender_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_reply_to_id_fkey"
            columns: ["reply_to_id"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_checks: {
        Row: {
          created_at: string
          findings: Json | null
          framework: Database["public"]["Enums"]["compliance_framework"]
          id: string
          last_checked_at: string | null
          next_check_at: string | null
          project_id: string
          recommendations: Json | null
          score: number | null
          status: string
        }
        Insert: {
          created_at?: string
          findings?: Json | null
          framework: Database["public"]["Enums"]["compliance_framework"]
          id?: string
          last_checked_at?: string | null
          next_check_at?: string | null
          project_id: string
          recommendations?: Json | null
          score?: number | null
          status?: string
        }
        Update: {
          created_at?: string
          findings?: Json | null
          framework?: Database["public"]["Enums"]["compliance_framework"]
          id?: string
          last_checked_at?: string | null
          next_check_at?: string | null
          project_id?: string
          recommendations?: Json | null
          score?: number | null
          status?: string
        }
        Relationships: []
      }
      compliance_reports: {
        Row: {
          compliance_score: number
          contract_address: string
          created_at: string
          findings: Json | null
          generated_at: string
          id: string
          network: string
          risk_level: string
        }
        Insert: {
          compliance_score: number
          contract_address: string
          created_at?: string
          findings?: Json | null
          generated_at?: string
          id?: string
          network: string
          risk_level: string
        }
        Update: {
          compliance_score?: number
          contract_address?: string
          created_at?: string
          findings?: Json | null
          generated_at?: string
          id?: string
          network?: string
          risk_level?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          audit_request_id: string | null
          auditor_id: string | null
          client_id: string | null
          created_at: string | null
          id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          audit_request_id?: string | null
          auditor_id?: string | null
          client_id?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          audit_request_id?: string | null
          auditor_id?: string | null
          client_id?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_audit_request_id_fkey"
            columns: ["audit_request_id"]
            isOneToOne: false
            referencedRelation: "audit_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      dispute_comments: {
        Row: {
          comment: string
          created_at: string
          dispute_id: string
          id: string
          user_id: string
        }
        Insert: {
          comment: string
          created_at?: string
          dispute_id: string
          id?: string
          user_id: string
        }
        Update: {
          comment?: string
          created_at?: string
          dispute_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dispute_comments_dispute_id_fkey"
            columns: ["dispute_id"]
            isOneToOne: false
            referencedRelation: "disputes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dispute_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      escrow_contracts: {
        Row: {
          auditor_id: string
          client_id: string
          created_at: string
          currency: string
          description: string | null
          id: string
          requires_multisig: boolean
          smart_contract_address: string | null
          status: Database["public"]["Enums"]["escrow_status"]
          title: string
          total_amount: number
          updated_at: string
        }
        Insert: {
          auditor_id: string
          client_id: string
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          requires_multisig?: boolean
          smart_contract_address?: string | null
          status?: Database["public"]["Enums"]["escrow_status"]
          title: string
          total_amount: number
          updated_at?: string
        }
        Update: {
          auditor_id?: string
          client_id?: string
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          requires_multisig?: boolean
          smart_contract_address?: string | null
          status?: Database["public"]["Enums"]["escrow_status"]
          title?: string
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "escrow_contracts_auditor_id_fkey"
            columns: ["auditor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "escrow_contracts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      extended_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          full_name: string | null
          id: string
          projects_completed: number | null
          skills: string[] | null
          social_links: Json | null
          specializations: string[] | null
          updated_at: string
          user_type: string | null
          verification_status: string | null
          wallet_address: string | null
          website: string | null
          years_of_experience: number | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          full_name?: string | null
          id: string
          projects_completed?: number | null
          skills?: string[] | null
          social_links?: Json | null
          specializations?: string[] | null
          updated_at?: string
          user_type?: string | null
          verification_status?: string | null
          wallet_address?: string | null
          website?: string | null
          years_of_experience?: number | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          full_name?: string | null
          id?: string
          projects_completed?: number | null
          skills?: string[] | null
          social_links?: Json | null
          specializations?: string[] | null
          updated_at?: string
          user_type?: string | null
          verification_status?: string | null
          wallet_address?: string | null
          website?: string | null
          years_of_experience?: number | null
        }
        Relationships: []
      }
      insurance_policies: {
        Row: {
          coverage_amount: number
          created_at: string
          effective_date: string
          expiry_date: string
          id: string
          policy_number: string
          premium_amount: number
          provider_name: string
          status: Database["public"]["Enums"]["insurance_status"]
          subscription_id: string
          terms: Json | null
        }
        Insert: {
          coverage_amount: number
          created_at?: string
          effective_date: string
          expiry_date: string
          id?: string
          policy_number: string
          premium_amount: number
          provider_name: string
          status?: Database["public"]["Enums"]["insurance_status"]
          subscription_id: string
          terms?: Json | null
        }
        Update: {
          coverage_amount?: number
          created_at?: string
          effective_date?: string
          expiry_date?: string
          id?: string
          policy_number?: string
          premium_amount?: number
          provider_name?: string
          status?: Database["public"]["Enums"]["insurance_status"]
          subscription_id?: string
          terms?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "insurance_policies_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      knowledge_base_articles: {
        Row: {
          author_id: string
          category: string
          content: string
          created_at: string | null
          deleted_at: string | null
          excerpt: string | null
          featured: boolean | null
          helpful_count: number | null
          id: string
          slug: string
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          author_id: string
          category: string
          content: string
          created_at?: string | null
          deleted_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          helpful_count?: number | null
          id?: string
          slug: string
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          author_id?: string
          category?: string
          content?: string
          created_at?: string | null
          deleted_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          helpful_count?: number | null
          id?: string
          slug?: string
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
      message_notifications: {
        Row: {
          created_at: string
          delivery_status: string | null
          id: string
          is_read: boolean
          message_id: string
          notification_type: string
          read_at: string | null
          sent_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          delivery_status?: string | null
          id?: string
          is_read?: boolean
          message_id: string
          notification_type?: string
          read_at?: string | null
          sent_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          delivery_status?: string | null
          id?: string
          is_read?: boolean
          message_id?: string
          notification_type?: string
          read_at?: string | null
          sent_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_notifications_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string | null
          id: string
          message_type: string | null
          read_at: string | null
          sender_id: string | null
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          message_type?: string | null
          read_at?: string | null
          sender_id?: string | null
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          message_type?: string | null
          read_at?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      milestones: {
        Row: {
          amount: number
          completed_at: string | null
          created_at: string
          deadline: string | null
          description: string | null
          escrow_contract_id: string
          id: string
          is_completed: boolean
          title: string
          updated_at: string
        }
        Insert: {
          amount: number
          completed_at?: string | null
          created_at?: string
          deadline?: string | null
          description?: string | null
          escrow_contract_id: string
          id?: string
          is_completed?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          amount?: number
          completed_at?: string | null
          created_at?: string
          deadline?: string | null
          description?: string | null
          escrow_contract_id?: string
          id?: string
          is_completed?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "milestones_escrow_contract_id_fkey"
            columns: ["escrow_contract_id"]
            isOneToOne: false
            referencedRelation: "escrow_contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      monitoring_services: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          last_scan_at: string | null
          monitoring_type: Database["public"]["Enums"]["monitoring_type"]
          next_scan_at: string | null
          project_id: string
          scan_frequency_hours: number | null
          subscription_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          last_scan_at?: string | null
          monitoring_type?: Database["public"]["Enums"]["monitoring_type"]
          next_scan_at?: string | null
          project_id: string
          scan_frequency_hours?: number | null
          subscription_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          last_scan_at?: string | null
          monitoring_type?: Database["public"]["Enums"]["monitoring_type"]
          next_scan_at?: string | null
          project_id?: string
          scan_frequency_hours?: number | null
          subscription_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "monitoring_services_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      multisig_approvals: {
        Row: {
          approved_at: string
          approver_id: string
          id: string
          signature: string
          transaction_id: string
        }
        Insert: {
          approved_at?: string
          approver_id: string
          id?: string
          signature: string
          transaction_id: string
        }
        Update: {
          approved_at?: string
          approver_id?: string
          id?: string
          signature?: string
          transaction_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "multisig_approvals_approver_id_fkey"
            columns: ["approver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "multisig_approvals_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      payment_transactions: {
        Row: {
          amount: number
          audit_id: string | null
          auditor_id: string | null
          client_id: string | null
          created_at: string
          currency: string
          id: string
          payment_intent_id: string | null
          payment_method: string | null
          platform_fee: number | null
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          audit_id?: string | null
          auditor_id?: string | null
          client_id?: string | null
          created_at?: string
          currency?: string
          id?: string
          payment_intent_id?: string | null
          payment_method?: string | null
          platform_fee?: number | null
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          audit_id?: string | null
          auditor_id?: string | null
          client_id?: string | null
          created_at?: string
          currency?: string
          id?: string
          payment_intent_id?: string | null
          payment_method?: string | null
          platform_fee?: number | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_transactions_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "audit_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_analytics: {
        Row: {
          date_bucket: string | null
          id: string
          metadata: Json | null
          metric_name: string
          metric_value: number | null
          recorded_at: string | null
        }
        Insert: {
          date_bucket?: string | null
          id?: string
          metadata?: Json | null
          metric_name: string
          metric_value?: number | null
          recorded_at?: string | null
        }
        Update: {
          date_bucket?: string | null
          id?: string
          metadata?: Json | null
          metric_name?: string
          metric_value?: number | null
          recorded_at?: string | null
        }
        Relationships: []
      }
      platform_metrics: {
        Row: {
          id: string
          metadata: Json | null
          metric_type: string
          metric_value: number | null
          recorded_at: string | null
        }
        Insert: {
          id?: string
          metadata?: Json | null
          metric_type: string
          metric_value?: number | null
          recorded_at?: string | null
        }
        Update: {
          id?: string
          metadata?: Json | null
          metric_type?: string
          metric_value?: number | null
          recorded_at?: string | null
        }
        Relationships: []
      }
      predictive_analytics: {
        Row: {
          analysis_type: string
          confidence_score: number | null
          created_at: string
          id: string
          prediction_data: Json
          user_id: string
          valid_until: string | null
        }
        Insert: {
          analysis_type: string
          confidence_score?: number | null
          created_at?: string
          id?: string
          prediction_data: Json
          user_id: string
          valid_until?: string | null
        }
        Update: {
          analysis_type?: string
          confidence_score?: number | null
          created_at?: string
          id?: string
          prediction_data?: Json
          user_id?: string
          valid_until?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          is_arbitrator: boolean
          updated_at: string
          wallet_address: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          is_arbitrator?: boolean
          updated_at?: string
          wallet_address?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_arbitrator?: boolean
          updated_at?: string
          wallet_address?: string | null
        }
        Relationships: []
      }
      receipts: {
        Row: {
          id: string;
          payment_event_id: string;
          audit_request_id: string | null;
          payer_id: string | null;
          payee_id: string | null;
          amount: number;
          date: string;
          type: string | null;
          receipt_url: string | null;
          details: any;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          payment_event_id: string;
          audit_request_id?: string | null;
          payer_id?: string | null;
          payee_id?: string | null;
          amount: number;
          date: string;
          type?: string | null;
          receipt_url?: string | null;
          details?: any;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          payment_event_id?: string;
          audit_request_id?: string | null;
          payer_id?: string | null;
          payee_id?: string | null;
          amount?: number;
          date?: string;
          type?: string | null;
          receipt_url?: string | null;
          details?: any;
          created_at?: string | null;
        };
        Relationships: [];
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          rating: number
          reviewer_id: string
          service_id: string
          updated_at: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          rating: number
          reviewer_id: string
          service_id: string
          updated_at?: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          rating?: number
          reviewer_id?: string
          service_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      security_events: {
        Row: {
          contract_address: string | null
          created_at: string
          description: string
          id: string
          metadata: Json | null
          network: string
          severity: string
          title: string
          type: string
        }
        Insert: {
          contract_address?: string | null
          created_at?: string
          description: string
          id?: string
          metadata?: Json | null
          network: string
          severity: string
          title: string
          type: string
        }
        Update: {
          contract_address?: string | null
          created_at?: string
          description?: string
          id?: string
          metadata?: Json | null
          network?: string
          severity?: string
          title?: string
          type?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          average_rating: number | null
          blockchain_ecosystems: string[] | null
          category: string
          created_at: string
          delivery_time: number | null
          description: string
          featured: boolean | null
          id: string
          price_range: Json | null
          provider_id: string
          review_count: number | null
          tags: string[] | null
          title: string
          updated_at: string
          verification_status: string | null
        }
        Insert: {
          average_rating?: number | null
          blockchain_ecosystems?: string[] | null
          category: string
          created_at?: string
          delivery_time?: number | null
          description: string
          featured?: boolean | null
          id?: string
          price_range?: Json | null
          provider_id: string
          review_count?: number | null
          tags?: string[] | null
          title: string
          updated_at?: string
          verification_status?: string | null
        }
        Update: {
          average_rating?: number | null
          blockchain_ecosystems?: string[] | null
          category?: string
          created_at?: string
          delivery_time?: number | null
          description?: string
          featured?: boolean | null
          id?: string
          price_range?: Json | null
          provider_id?: string
          review_count?: number | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          verification_status?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          expires_at: string | null
          features: Json | null
          id: string
          monthly_cost: number | null
          started_at: string
          status: Database["public"]["Enums"]["subscription_status"]
          tier: Database["public"]["Enums"]["subscription_tier"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          features?: Json | null
          id?: string
          monthly_cost?: number | null
          started_at?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          features?: Json | null
          id?: string
          monthly_cost?: number | null
          started_at?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      threat_intelligence: {
        Row: {
          description: string
          detected_at: string
          id: string
          is_resolved: boolean
          metadata: Json | null
          monitoring_service_id: string
          recommendation: string | null
          resolved_at: string | null
          threat_level: Database["public"]["Enums"]["threat_level"]
          threat_type: string
        }
        Insert: {
          description: string
          detected_at?: string
          id?: string
          is_resolved?: boolean
          metadata?: Json | null
          monitoring_service_id: string
          recommendation?: string | null
          resolved_at?: string | null
          threat_level: Database["public"]["Enums"]["threat_level"]
          threat_type: string
        }
        Update: {
          description?: string
          detected_at?: string
          id?: string
          is_resolved?: boolean
          metadata?: Json | null
          monitoring_service_id?: string
          recommendation?: string | null
          resolved_at?: string | null
          threat_level?: Database["public"]["Enums"]["threat_level"]
          threat_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "threat_intelligence_monitoring_service_id_fkey"
            columns: ["monitoring_service_id"]
            isOneToOne: false
            referencedRelation: "monitoring_services"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          created_at: string
          escrow_contract_id: string
          id: string
          milestone_id: string | null
          recipient_id: string | null
          sender_id: string
          status: string
          transaction_hash: string | null
          type: Database["public"]["Enums"]["transaction_type"]
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          escrow_contract_id: string
          id?: string
          milestone_id?: string | null
          recipient_id?: string | null
          sender_id: string
          status?: string
          transaction_hash?: string | null
          type: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          escrow_contract_id?: string
          id?: string
          milestone_id?: string | null
          recipient_id?: string | null
          sender_id?: string
          status?: string
          transaction_hash?: string | null
          type?: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_escrow_contract_id_fkey"
            columns: ["escrow_contract_id"]
            isOneToOne: false
            referencedRelation: "escrow_contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_milestone_id_fkey"
            columns: ["milestone_id"]
            isOneToOne: false
            referencedRelation: "milestones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: string
          is_active: boolean | null
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          is_active?: boolean | null
          role?: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          is_active?: boolean | null
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_audit_request: {
        Args: {
          client_id: string
          project_name: string
          project_description: string
          blockchain: string
          repository_url: string
          contract_count: number
          lines_of_code: number
          deadline: string
          budget: number
          audit_scope: string
          previous_audits: boolean
          specific_concerns: string
        }
        Returns: string
      }
      add_dispute_comment: {
        Args: { dispute_id: string; user_id: string; comment: string }
        Returns: string
      }
      advanced_search: {
        Args: {
          search_term?: string
          filter_types?: string[]
          filter_tags?: string[]
          filter_category?: string
          sort_by?: string
          page_num?: number
          page_size?: number
        }
        Returns: {
          id: string
          type: string
          title: string
          slug: string
          excerpt: string
          tags: string[]
          author_id: string
          author_name: string
          author_avatar_url: string
          relevance_score: number
          rating_average: number
          created_at: string
          total_count: number
        }[]
      }
      calculate_auditor_match_score: {
        Args: { p_audit_request_id: string; p_auditor_id: string }
        Returns: number
      }
      calculate_expertise_match: {
        Args:
          | Record<PropertyKey, never>
          | {
              auditor_skills: string[]
              auditor_blockchains: string[]
              request_blockchain: string
              request_category: string
            }
        Returns: undefined
      }
      get_user_profile: {
        Args: Record<PropertyKey, never> | { user_id: number }
        Returns: undefined
      }
      get_user_role: {
        Args: Record<PropertyKey, never> | { user_id: string }
        Returns: string
      }
      get_user_subscription: {
        Args: { user_id: string }
        Returns: {
          id: string
          tier: Database["public"]["Enums"]["subscription_tier"]
          status: Database["public"]["Enums"]["subscription_status"]
          features: Json
          expires_at: string
        }[]
      }
      has_subscription_feature: {
        Args:
          | Record<PropertyKey, never>
          | { user_id: string; feature_name: string }
        Returns: boolean
      }
      is_admin: {
        Args: Record<PropertyKey, never> | { user_id: string }
        Returns: boolean
      }
      update_dispute_status: {
        Args: { dispute_id: string; new_status: string }
        Returns: undefined
      }
      update_platform_metrics: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      certification_type:
        | "basic_auditor"
        | "advanced_auditor"
        | "security_specialist"
        | "compliance_expert"
      compliance_framework: "gdpr" | "soc2" | "iso27001" | "hipaa" | "pci_dss"
      dispute_status: "opened" | "in_review" | "resolved" | "closed"
      escrow_status:
        | "pending"
        | "in_progress"
        | "completed"
        | "disputed"
        | "refunded"
        | "cancelled"
      insurance_status: "pending" | "active" | "claimed" | "expired"
      monitoring_type: "continuous" | "scheduled" | "on_demand"
      subscription_status: "active" | "cancelled" | "suspended" | "trial"
      subscription_tier: "basic" | "professional" | "enterprise" | "custom"
      threat_level: "low" | "medium" | "high" | "critical"
      transaction_type:
        | "deposit"
        | "milestone_payment"
        | "refund"
        | "fee"
        | "dispute_resolution"
      user_role: "admin" | "auditor" | "project_owner" | "general"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      certification_type: [
        "basic_auditor",
        "advanced_auditor",
        "security_specialist",
        "compliance_expert",
      ],
      compliance_framework: ["gdpr", "soc2", "iso27001", "hipaa", "pci_dss"],
      dispute_status: ["opened", "in_review", "resolved", "closed"],
      escrow_status: [
        "pending",
        "in_progress",
        "completed",
        "disputed",
        "refunded",
        "cancelled",
      ],
      insurance_status: ["pending", "active", "claimed", "expired"],
      monitoring_type: ["continuous", "scheduled", "on_demand"],
      subscription_status: ["active", "cancelled", "suspended", "trial"],
      subscription_tier: ["basic", "professional", "enterprise", "custom"],
      threat_level: ["low", "medium", "high", "critical"],
      transaction_type: [
        "deposit",
        "milestone_payment",
        "refund",
        "fee",
        "dispute_resolution",
      ],
      user_role: ["admin", "auditor", "project_owner", "general"],
    },
  },
} as const
