export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: Record<string, never>
    Views: {
      [_ in never]: never
    }
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: {
      [_ in never]: never
    }
  }
} 