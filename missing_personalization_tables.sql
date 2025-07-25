-- Missing Personalization Analytics Tables Migration
-- Run this in Supabase SQL Editor

-- Create personalization_analytics table
CREATE TABLE IF NOT EXISTS public.personalization_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    event_data JSONB NOT NULL DEFAULT '{}',
    session_id TEXT,
    page_path TEXT,
    device_info JSONB DEFAULT '{}',
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT fk_personalization_analytics_user FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

-- Create behavioral_patterns table
CREATE TABLE IF NOT EXISTS public.behavioral_patterns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    pattern_type TEXT NOT NULL,
    pattern_data JSONB NOT NULL DEFAULT '{}',
    confidence_score DECIMAL(3,2) DEFAULT 0.0 CHECK (confidence_score >= 0.0 AND confidence_score <= 1.0),
    last_updated TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, pattern_type),
    CONSTRAINT fk_behavioral_patterns_user FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

-- Enable RLS on both tables
ALTER TABLE public.personalization_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.behavioral_patterns ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for personalization_analytics
CREATE POLICY "Users can view their own analytics" ON public.personalization_analytics
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own analytics" ON public.personalization_analytics
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Create RLS policies for behavioral_patterns
CREATE POLICY "Users can view their own patterns" ON public.behavioral_patterns
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can manage their own patterns" ON public.behavioral_patterns
    FOR ALL USING (user_id = auth.uid());

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_personalization_analytics_user_id ON public.personalization_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_personalization_analytics_event_type ON public.personalization_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_personalization_analytics_timestamp ON public.personalization_analytics(timestamp);
CREATE INDEX IF NOT EXISTS idx_personalization_analytics_session ON public.personalization_analytics(session_id);

CREATE INDEX IF NOT EXISTS idx_behavioral_patterns_user_id ON public.behavioral_patterns(user_id);
CREATE INDEX IF NOT EXISTS idx_behavioral_patterns_type ON public.behavioral_patterns(pattern_type);

-- Add triggers for updated_at column
CREATE TRIGGER update_behavioral_patterns_updated_at 
    BEFORE UPDATE ON public.behavioral_patterns 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
