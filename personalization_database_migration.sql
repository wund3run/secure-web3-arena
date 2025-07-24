-- =====================================================
-- PERSONALIZED AUDITOR JOURNEY DATABASE MIGRATION
-- =====================================================
-- This migration adds personalization features to the existing Hawkly platform
-- Run this in Supabase SQL Editor

BEGIN;

-- =====================================================
-- 1. EXTEND EXISTING AUDITOR_PROFILES TABLE
-- =====================================================

-- Add personalization columns to existing auditor_profiles table
ALTER TABLE auditor_profiles 
ADD COLUMN IF NOT EXISTS user_preferences JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS personality_insights JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS learning_style TEXT,
ADD COLUMN IF NOT EXISTS motivation_type TEXT CHECK (motivation_type IN ('achievement', 'social', 'mastery', 'purpose')),
ADD COLUMN IF NOT EXISTS experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'expert')),
ADD COLUMN IF NOT EXISTS onboarding_completed_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS last_personalization_update TIMESTAMPTZ DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS behavioral_score JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS preferred_industries TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS work_schedule_preference TEXT CHECK (work_schedule_preference IN ('flexible', 'structured', 'deadline-driven')),
ADD COLUMN IF NOT EXISTS communication_style TEXT CHECK (communication_style IN ('detailed', 'concise', 'collaborative'));

-- =====================================================
-- 2. PERSONALIZATION ANALYTICS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS personalization_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    event_data JSONB NOT NULL DEFAULT '{}',
    session_id TEXT,
    page_path TEXT,
    device_info JSONB DEFAULT '{}',
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    
    -- Indexes for performance
    CONSTRAINT fk_personalization_analytics_user FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

-- Create indexes for analytics
CREATE INDEX IF NOT EXISTS idx_personalization_analytics_user_id ON personalization_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_personalization_analytics_event_type ON personalization_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_personalization_analytics_timestamp ON personalization_analytics(timestamp);
CREATE INDEX IF NOT EXISTS idx_personalization_analytics_session ON personalization_analytics(session_id);

-- =====================================================
-- 3. BEHAVIORAL PATTERNS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS behavioral_patterns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    pattern_type TEXT NOT NULL,
    pattern_data JSONB NOT NULL DEFAULT '{}',
    confidence_score DECIMAL(3,2) DEFAULT 0.0 CHECK (confidence_score >= 0.0 AND confidence_score <= 1.0),
    last_updated TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, pattern_type)
);

CREATE INDEX IF NOT EXISTS idx_behavioral_patterns_user_id ON behavioral_patterns(user_id);
CREATE INDEX IF NOT EXISTS idx_behavioral_patterns_type ON behavioral_patterns(pattern_type);

-- =====================================================
-- 4. PERSONALIZED RECOMMENDATIONS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS personalized_recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    recommendation_type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    action_data JSONB DEFAULT '{}',
    priority_score INTEGER DEFAULT 5 CHECK (priority_score >= 1 AND priority_score <= 10),
    is_dismissed BOOLEAN DEFAULT FALSE,
    is_completed BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_personalized_recommendations_user_id ON personalized_recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_personalized_recommendations_type ON personalized_recommendations(recommendation_type);
CREATE INDEX IF NOT EXISTS idx_personalized_recommendations_active ON personalized_recommendations(user_id, is_dismissed, is_completed, expires_at);

-- =====================================================
-- 5. LEARNING PATHS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS learning_paths (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    estimated_duration_hours INTEGER,
    path_data JSONB DEFAULT '{}',
    prerequisites TEXT[],
    tags TEXT[],
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 6. USER LEARNING PROGRESS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS user_learning_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    learning_path_id UUID NOT NULL REFERENCES learning_paths(id) ON DELETE CASCADE,
    progress_percentage DECIMAL(5,2) DEFAULT 0.0 CHECK (progress_percentage >= 0.0 AND progress_percentage <= 100.0),
    current_step INTEGER DEFAULT 1,
    completed_steps INTEGER[] DEFAULT '{}',
    time_spent_minutes INTEGER DEFAULT 0,
    last_accessed TIMESTAMPTZ DEFAULT NOW(),
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    
    UNIQUE(user_id, learning_path_id)
);

CREATE INDEX IF NOT EXISTS idx_user_learning_progress_user_id ON user_learning_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_learning_progress_path_id ON user_learning_progress(learning_path_id);

-- =====================================================
-- 7. GAMIFICATION ENHANCEMENTS
-- =====================================================

-- Extend existing gamification with personalized challenges
CREATE TABLE IF NOT EXISTS personalized_challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    challenge_type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    target_value INTEGER NOT NULL,
    current_progress INTEGER DEFAULT 0,
    xp_reward INTEGER DEFAULT 0,
    badge_reward TEXT,
    difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
    is_active BOOLEAN DEFAULT TRUE,
    is_completed BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_personalized_challenges_user_id ON personalized_challenges(user_id);
CREATE INDEX IF NOT EXISTS idx_personalized_challenges_active ON personalized_challenges(user_id, is_active, is_completed);

-- =====================================================
-- 8. PEER MATCHING TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS peer_matching (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    matched_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    match_type TEXT NOT NULL CHECK (match_type IN ('mentor', 'peer', 'mentee')),
    compatibility_score DECIMAL(3,2) DEFAULT 0.0 CHECK (compatibility_score >= 0.0 AND compatibility_score <= 1.0),
    shared_interests TEXT[],
    match_reason TEXT,
    status TEXT DEFAULT 'suggested' CHECK (status IN ('suggested', 'accepted', 'declined', 'expired')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    responded_at TIMESTAMPTZ,
    
    UNIQUE(user_id, matched_user_id, match_type),
    CHECK (user_id != matched_user_id)
);

CREATE INDEX IF NOT EXISTS idx_peer_matching_user_id ON peer_matching(user_id);
CREATE INDEX IF NOT EXISTS idx_peer_matching_matched_user ON peer_matching(matched_user_id);
CREATE INDEX IF NOT EXISTS idx_peer_matching_status ON peer_matching(status);

-- =====================================================
-- 9. CONTENT PERSONALIZATION TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS personalized_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content_type TEXT NOT NULL,
    content_key TEXT NOT NULL,
    personalized_data JSONB NOT NULL DEFAULT '{}',
    relevance_score DECIMAL(3,2) DEFAULT 0.5 CHECK (relevance_score >= 0.0 AND relevance_score <= 1.0),
    last_shown TIMESTAMPTZ,
    interaction_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, content_type, content_key)
);

CREATE INDEX IF NOT EXISTS idx_personalized_content_user_id ON personalized_content(user_id);
CREATE INDEX IF NOT EXISTS idx_personalized_content_type ON personalized_content(content_type);
CREATE INDEX IF NOT EXISTS idx_personalized_content_relevance ON personalized_content(relevance_score DESC);

-- =====================================================
-- 10. NOTIFICATION PREFERENCES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS notification_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    notification_type TEXT NOT NULL,
    is_enabled BOOLEAN DEFAULT TRUE,
    delivery_method TEXT[] DEFAULT ARRAY['in_app'],
    frequency TEXT DEFAULT 'immediate' CHECK (frequency IN ('immediate', 'daily', 'weekly', 'never')),
    quiet_hours_start TIME,
    quiet_hours_end TIME,
    timezone TEXT DEFAULT 'UTC',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, notification_type)
);

CREATE INDEX IF NOT EXISTS idx_notification_preferences_user_id ON notification_preferences(user_id);

-- =====================================================
-- 11. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all new tables
ALTER TABLE personalization_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE behavioral_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE personalized_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE personalized_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE peer_matching ENABLE ROW LEVEL SECURITY;
ALTER TABLE personalized_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;

-- User can only access their own data
CREATE POLICY "Users can view own personalization analytics" ON personalization_analytics
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own personalization analytics" ON personalization_analytics
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own behavioral patterns" ON behavioral_patterns
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own recommendations" ON personalized_recommendations
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Everyone can view learning paths" ON learning_paths
    FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Users can view own learning progress" ON user_learning_progress
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own challenges" ON personalized_challenges
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own peer matches" ON peer_matching
    FOR ALL USING (auth.uid() = user_id OR auth.uid() = matched_user_id);

CREATE POLICY "Users can view own personalized content" ON personalized_content
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own notification preferences" ON notification_preferences
    FOR ALL USING (auth.uid() = user_id);

-- =====================================================
-- 12. SAMPLE DATA & INITIAL SETUP
-- =====================================================

-- Insert sample learning paths
INSERT INTO learning_paths (name, description, difficulty_level, estimated_duration_hours, path_data, tags) VALUES
('Smart Contract Security Fundamentals', 'Learn the basics of smart contract vulnerabilities and security best practices', 'beginner', 20, 
 '{"modules": ["Introduction to Smart Contracts", "Common Vulnerabilities", "Security Tools", "Best Practices"]}', 
 ARRAY['security', 'smart-contracts', 'beginner']),
 
('Advanced DeFi Security Auditing', 'Deep dive into DeFi protocol security and complex attack vectors', 'advanced', 40,
 '{"modules": ["DeFi Fundamentals", "Flash Loan Attacks", "Oracle Manipulation", "Governance Attacks"]}',
 ARRAY['defi', 'advanced', 'auditing']),
 
('Web3 Security Tools Mastery', 'Master the essential tools for Web3 security analysis', 'intermediate', 30,
 '{"modules": ["Static Analysis Tools", "Dynamic Analysis", "Fuzzing", "Formal Verification"]}',
 ARRAY['tools', 'intermediate', 'analysis']);

-- Insert sample challenge templates
INSERT INTO personalized_challenges (user_id, challenge_type, title, description, target_value, xp_reward, difficulty)
SELECT 
    auth.uid(),
    'first_audit',
    'Complete Your First Audit',
    'Successfully complete and submit your first security audit',
    1,
    500,
    'easy'
WHERE auth.uid() IS NOT NULL;

-- =====================================================
-- 13. HELPER FUNCTIONS
-- =====================================================

-- Function to calculate user engagement score
CREATE OR REPLACE FUNCTION calculate_engagement_score(p_user_id UUID)
RETURNS DECIMAL(3,2) AS $$
DECLARE
    engagement_score DECIMAL(3,2);
BEGIN
    SELECT 
        LEAST(1.0, 
            (COALESCE(profile_completeness, 0) * 0.3 +
             COALESCE(activity_frequency, 0) * 0.4 +
             COALESCE(feature_adoption, 0) * 0.3)
        ) INTO engagement_score
    FROM (
        SELECT 
            -- Profile completeness (0-1)
            CASE 
                WHEN years_experience IS NOT NULL AND specializations IS NOT NULL THEN 1.0
                ELSE 0.5
            END as profile_completeness,
            
            -- Activity frequency based on recent analytics (0-1)
            LEAST(1.0, (
                SELECT COUNT(*)::DECIMAL / 10
                FROM personalization_analytics 
                WHERE user_id = p_user_id 
                AND timestamp > NOW() - INTERVAL '7 days'
            )) as activity_frequency,
            
            -- Feature adoption (0-1)
            LEAST(1.0, (
                SELECT COUNT(DISTINCT event_type)::DECIMAL / 5
                FROM personalization_analytics 
                WHERE user_id = p_user_id
            )) as feature_adoption
            
        FROM auditor_profiles 
        WHERE user_id = p_user_id
    ) metrics;
    
    RETURN COALESCE(engagement_score, 0.0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update behavioral patterns
CREATE OR REPLACE FUNCTION update_behavioral_pattern(
    p_user_id UUID,
    p_pattern_type TEXT,
    p_pattern_data JSONB,
    p_confidence_score DECIMAL DEFAULT 0.5
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO behavioral_patterns (user_id, pattern_type, pattern_data, confidence_score)
    VALUES (p_user_id, p_pattern_type, p_pattern_data, p_confidence_score)
    ON CONFLICT (user_id, pattern_type)
    DO UPDATE SET 
        pattern_data = EXCLUDED.pattern_data,
        confidence_score = EXCLUDED.confidence_score,
        last_updated = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 14. TRIGGERS FOR AUTOMATIC UPDATES
-- =====================================================

-- Trigger to update last_personalization_update when user preferences change
CREATE OR REPLACE FUNCTION update_personalization_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_personalization_update = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_personalization_timestamp
    BEFORE UPDATE ON auditor_profiles
    FOR EACH ROW
    WHEN (OLD.user_preferences IS DISTINCT FROM NEW.user_preferences OR
          OLD.personality_insights IS DISTINCT FROM NEW.personality_insights)
    EXECUTE FUNCTION update_personalization_timestamp();

-- =====================================================
-- 15. VIEWS FOR EASY DATA ACCESS
-- =====================================================

-- View for comprehensive user personalization data
CREATE OR REPLACE VIEW user_personalization_summary AS
SELECT 
    ap.user_id,
    ap.user_preferences,
    ap.personality_insights,
    ap.learning_style,
    ap.motivation_type,
    ap.experience_level,
    ap.onboarding_completed_at,
    calculate_engagement_score(ap.user_id) as engagement_score,
    
    -- Recent activity metrics
    (SELECT COUNT(*) FROM personalization_analytics 
     WHERE user_id = ap.user_id AND timestamp > NOW() - INTERVAL '7 days') as recent_activity_count,
    
    -- Active challenges count
    (SELECT COUNT(*) FROM personalized_challenges 
     WHERE user_id = ap.user_id AND is_active = TRUE AND is_completed = FALSE) as active_challenges_count,
    
    -- Learning progress
    (SELECT COUNT(*) FROM user_learning_progress 
     WHERE user_id = ap.user_id AND completed_at IS NOT NULL) as completed_learning_paths
     
FROM auditor_profiles ap;

COMMIT;

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================

-- Verify the migration
SELECT 'Migration completed successfully. New tables created:' as status;
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
    'personalization_analytics',
    'behavioral_patterns', 
    'personalized_recommendations',
    'learning_paths',
    'user_learning_progress',
    'personalized_challenges',
    'peer_matching',
    'personalized_content',
    'notification_preferences'
) ORDER BY table_name;
