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
      admin_actions: {
        Row: {
          action_type: string
          admin_id: string
          created_at: string | null
          details: Json | null
          id: string
          target_id: string
          target_type: string
        }
        Insert: {
          action_type: string
          admin_id: string
          created_at?: string | null
          details?: Json | null
          id?: string
          target_id: string
          target_type: string
        }
        Update: {
          action_type?: string
          admin_id?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          target_id?: string
          target_type?: string
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
      audit_log: {
        Row: {
          action: string
          audit_request_id: string
          created_at: string
          id: string
        }
        Insert: {
          action: string
          audit_request_id: string
          created_at?: string
          id?: string
        }
        Update: {
          action?: string
          audit_request_id?: string
          created_at?: string
          id?: string
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
          progress_percentage: number | null
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
          progress_percentage?: number | null
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
          progress_percentage?: number | null
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
      audit_requests: {
        Row: {
          ai_matching_completed: boolean | null
          assigned_auditor_id: string | null
          audit_scope: string | null
          blockchain: string
          budget: number | null
          client_id: string
          contract_count: number | null
          created_at: string
          deadline: string | null
          escrow_contract_id: string | null
          id: string
          lines_of_code: number | null
          previous_audits: boolean | null
          priority_score: number | null
          project_description: string | null
          project_name: string
          repository_url: string | null
          specific_concerns: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          ai_matching_completed?: boolean | null
          assigned_auditor_id?: string | null
          audit_scope?: string | null
          blockchain: string
          budget?: number | null
          client_id: string
          contract_count?: number | null
          created_at?: string
          deadline?: string | null
          escrow_contract_id?: string | null
          id?: string
          lines_of_code?: number | null
          previous_audits?: boolean | null
          priority_score?: number | null
          project_description?: string | null
          project_name: string
          repository_url?: string | null
          specific_concerns?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          ai_matching_completed?: boolean | null
          assigned_auditor_id?: string | null
          audit_scope?: string | null
          blockchain?: string
          budget?: number | null
          client_id?: string
          contract_count?: number | null
          created_at?: string
          deadline?: string | null
          escrow_contract_id?: string | null
          id?: string
          lines_of_code?: number | null
          previous_audits?: boolean | null
          priority_score?: number | null
          project_description?: string | null
          project_name?: string
          repository_url?: string | null
          specific_concerns?: string | null
          status?: string | null
          updated_at?: string
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
          portfolio_url: string | null
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
          portfolio_url?: string | null
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
          portfolio_url?: string | null
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
      disputes: {
        Row: {
          arbitrator_id: string | null
          created_at: string
          escrow_contract_id: string
          evidence: string | null
          id: string
          milestone_id: string | null
          raised_by: string
          reason: string
          resolution: string | null
          status: Database["public"]["Enums"]["dispute_status"]
          updated_at: string
        }
        Insert: {
          arbitrator_id?: string | null
          created_at?: string
          escrow_contract_id: string
          evidence?: string | null
          id?: string
          milestone_id?: string | null
          raised_by: string
          reason: string
          resolution?: string | null
          status?: Database["public"]["Enums"]["dispute_status"]
          updated_at?: string
        }
        Update: {
          arbitrator_id?: string | null
          created_at?: string
          escrow_contract_id?: string
          evidence?: string | null
          id?: string
          milestone_id?: string | null
          raised_by?: string
          reason?: string
          resolution?: string | null
          status?: Database["public"]["Enums"]["dispute_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "disputes_arbitrator_id_fkey"
            columns: ["arbitrator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "disputes_escrow_contract_id_fkey"
            columns: ["escrow_contract_id"]
            isOneToOne: false
            referencedRelation: "escrow_contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "disputes_milestone_id_fkey"
            columns: ["milestone_id"]
            isOneToOne: false
            referencedRelation: "milestones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "disputes_raised_by_fkey"
            columns: ["raised_by"]
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
      calculate_expertise_match: {
        Args: {
          auditor_skills: string[]
          auditor_blockchains: string[]
          request_blockchain: string
          request_category: string
        }
        Returns: number
      }
      get_user_profile: {
        Args: Record<PropertyKey, never> | { user_id: number }
        Returns: undefined
      }
      get_user_role: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
      is_admin: {
        Args: { user_id: string }
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
      dispute_status: "opened" | "in_review" | "resolved" | "closed"
      escrow_status:
        | "pending"
        | "in_progress"
        | "completed"
        | "disputed"
        | "refunded"
        | "cancelled"
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
      dispute_status: ["opened", "in_review", "resolved", "closed"],
      escrow_status: [
        "pending",
        "in_progress",
        "completed",
        "disputed",
        "refunded",
        "cancelled",
      ],
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
