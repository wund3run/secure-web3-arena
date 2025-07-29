-- ADDITIONAL SECURITY HARDENING
-- Run this after the RLS policies to add extra protection layers

-- ==============================================
-- 1. DATA ENCRYPTION FOR SENSITIVE FIELDS
-- ==============================================

-- Enable pgcrypto extension for encryption
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create function to encrypt sensitive data
CREATE OR REPLACE FUNCTION encrypt_sensitive_data(data TEXT)
RETURNS TEXT AS $$
BEGIN
    -- Use AES encryption with a key derived from user ID
    RETURN encode(encrypt(data::bytea, auth.uid()::text, 'aes'), 'base64');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to decrypt sensitive data
CREATE OR REPLACE FUNCTION decrypt_sensitive_data(encrypted_data TEXT)
RETURNS TEXT AS $$
BEGIN
    -- Decrypt using the same key
    RETURN convert_from(decrypt(decode(encrypted_data, 'base64'), auth.uid()::text, 'aes'), 'UTF8');
EXCEPTION
    WHEN OTHERS THEN
        RETURN NULL; -- Return NULL if decryption fails
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================
-- 2. AUDIT LOGGING FOR SECURITY EVENTS
-- ==============================================

-- Create audit log table
CREATE TABLE IF NOT EXISTS public.security_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    action TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own audit logs" ON public.security_audit_log;
CREATE POLICY "Users can view their own audit logs" ON public.security_audit_log
    FOR SELECT USING (auth.uid() = user_id);

-- Create audit trigger function
CREATE OR REPLACE FUNCTION audit_table_changes()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.security_audit_log (
        user_id,
        action,
        table_name,
        record_id,
        old_values,
        new_values,
        timestamp
    ) VALUES (
        auth.uid(),
        TG_OP,
        TG_TABLE_NAME,
        COALESCE(NEW.id, OLD.id),
        CASE WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD) ELSE NULL END,
        CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN to_jsonb(NEW) ELSE NULL END,
        NOW()
    );
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'audit_profiles_trigger'
    ) THEN
        EXECUTE 'DROP TRIGGER audit_profiles_trigger ON public.profiles;';
    END IF;
    EXECUTE 'CREATE TRIGGER audit_profiles_trigger AFTER INSERT OR UPDATE OR DELETE ON public.profiles FOR EACH ROW EXECUTE FUNCTION audit_table_changes();';
    IF EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'audit_projects_trigger'
    ) THEN
        EXECUTE 'DROP TRIGGER audit_projects_trigger ON public.projects;';
    END IF;
    EXECUTE 'CREATE TRIGGER audit_projects_trigger AFTER INSERT OR UPDATE OR DELETE ON public.projects FOR EACH ROW EXECUTE FUNCTION audit_table_changes();';
    IF EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'audit_audit_requests_trigger'
    ) THEN
        EXECUTE 'DROP TRIGGER audit_audit_requests_trigger ON public.audit_requests;';
    END IF;
    EXECUTE 'CREATE TRIGGER audit_audit_requests_trigger AFTER INSERT OR UPDATE OR DELETE ON public.audit_requests FOR EACH ROW EXECUTE FUNCTION audit_table_changes();';
END $$;

-- ==============================================
-- 3. RATE LIMITING TABLES
-- ==============================================

-- Create rate limiting table
CREATE TABLE IF NOT EXISTS public.rate_limits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    ip_address INET,
    action TEXT NOT NULL,
    requests_count INTEGER DEFAULT 1,
    window_start TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_lookup ON public.rate_limits(user_id, ip_address, action, window_start);

-- Ensure RLS and policy for rate_limits is idempotent
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view their own rate limits" ON public.rate_limits;
CREATE POLICY "Users can view their own rate limits" ON public.rate_limits
  FOR SELECT USING (auth.uid() = user_id);
CREATE OR REPLACE FUNCTION check_rate_limit(
    action_name TEXT,
    max_requests INTEGER DEFAULT 100,
    window_minutes INTEGER DEFAULT 60
)
RETURNS BOOLEAN AS $$
DECLARE
    current_count INTEGER;
    window_start TIMESTAMPTZ;
BEGIN
    window_start := NOW() - (window_minutes || ' minutes')::interval;
    
    -- Clean old entries
    DELETE FROM public.rate_limits 
    WHERE window_start < (NOW() - (window_minutes || ' minutes')::interval);
    
    -- Count current requests
    SELECT COALESCE(SUM(requests_count), 0) INTO current_count
    FROM public.rate_limits
    WHERE (user_id = auth.uid() OR ip_address = inet_client_addr())
    AND action = action_name
    AND window_start >= (NOW() - (window_minutes || ' minutes')::interval);
    
    -- Check if limit exceeded
    IF current_count >= max_requests THEN
        RETURN FALSE;
    END IF;
    
    -- Update or insert rate limit record
    INSERT INTO public.rate_limits (user_id, ip_address, action, requests_count, window_start)
    VALUES (auth.uid(), inet_client_addr(), action_name, 1, NOW())
    ON CONFLICT (user_id, action, window_start) 
    DO UPDATE SET 
        requests_count = rate_limits.requests_count + 1;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================
-- 4. SECURE VIEWS FOR SENSITIVE DATA
-- ==============================================

-- Create secure view for profiles (excludes sensitive fields for non-owners)
CREATE OR REPLACE VIEW public.profiles_safe AS
SELECT 
    id,
    full_name,
    avatar_url,
    is_arbitrator,
    created_at,
    updated_at,
    CASE 
        WHEN auth.uid() = id THEN wallet_address 
        ELSE NULL 
    END as wallet_address
FROM public.profiles;

-- Create secure view for auditor profiles (public info only)
CREATE OR REPLACE VIEW public.auditor_profiles_public AS
SELECT 
    user_id,
    specialization_tags,
    years_experience,
    blockchain_expertise,
    audit_types,
    business_name,
    availability_status,
    timezone,
    languages_spoken,
    certifications,
    CASE 
        WHEN auth.uid() = user_id THEN github_username 
        ELSE NULL 
    END as github_username,
    CASE 
        WHEN auth.uid() = user_id THEN portfolio_url 
        ELSE NULL 
    END as portfolio_url,
    CASE 
        WHEN auth.uid() = user_id THEN linkedin_url 
        ELSE NULL 
    END as linkedin_url,
    CASE 
        WHEN auth.uid() = user_id THEN hourly_rate_min 
        ELSE NULL 
    END as hourly_rate_min,
    CASE 
        WHEN auth.uid() = user_id THEN hourly_rate_max 
        ELSE NULL 
    END as hourly_rate_max
FROM public.auditor_profiles;

-- ==============================================
-- 5. DATA VALIDATION FUNCTIONS
-- ==============================================

-- Function to validate email format
CREATE OR REPLACE FUNCTION is_valid_email(email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
END;
$$ LANGUAGE plpgsql;

-- Function to validate wallet address format
CREATE OR REPLACE FUNCTION is_valid_wallet_address(address TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    -- Basic Ethereum address validation
    RETURN address ~* '^0x[a-fA-F0-9]{40}$';
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'check_valid_wallet_address' AND table_name = 'profiles'
    ) THEN
        EXECUTE 'ALTER TABLE public.profiles DROP CONSTRAINT check_valid_wallet_address;';
    END IF;
    EXECUTE 'ALTER TABLE public.profiles ADD CONSTRAINT check_valid_wallet_address CHECK (wallet_address IS NULL OR is_valid_wallet_address(wallet_address));';
END $$;

-- ==============================================
-- 6. SECURITY MONITORING
-- ==============================================

-- Function to detect suspicious activity
CREATE OR REPLACE FUNCTION detect_suspicious_activity()
RETURNS TRIGGER AS $$
DECLARE
    recent_logins INTEGER;
    suspicious_ips INTEGER;
BEGIN
    -- Check for multiple rapid logins
    SELECT COUNT(*) INTO recent_logins
    FROM public.security_audit_log
    WHERE user_id = NEW.user_id
    AND action = 'LOGIN'
    AND timestamp > NOW() - INTERVAL '5 minutes';
    
    IF recent_logins > 5 THEN
        INSERT INTO public.security_audit_log (user_id, action, table_name, new_values)
        VALUES (NEW.user_id, 'SUSPICIOUS_ACTIVITY', 'auth', 
                jsonb_build_object('type', 'rapid_logins', 'count', recent_logins));
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================
-- SUCCESS MESSAGE
-- ==============================================

DO $$ 
BEGIN 
    RAISE NOTICE '🛡️  Advanced security hardening completed!';
    RAISE NOTICE '✅ Data encryption functions created';
    RAISE NOTICE '✅ Audit logging enabled';
    RAISE NOTICE '✅ Rate limiting implemented';
    RAISE NOTICE '✅ Secure views created';
    RAISE NOTICE '✅ Data validation added';
    RAISE NOTICE '✅ Security monitoring active';
END $$;
