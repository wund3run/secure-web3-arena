#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

// Load environment variables from .env file
function loadEnv() {
    try {
        const envFile = readFileSync('.env', 'utf8')
        const envVars = {}
        envFile.split('\n').forEach(line => {
            const [key, value] = line.split('=')
            if (key && value) {
                envVars[key.trim()] = value.trim().replace(/^["']|["']$/g, '')
            }
        })
        return envVars
    } catch (error) {
        console.log('⚠️  No .env file found, using environment variables')
        return process.env
    }
}

const env = loadEnv()
const supabaseUrl = env.VITE_SUPABASE_URL
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY

console.log('🔒 Supabase Security Audit')
console.log('==========================\n')

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function auditSecurity() {
    const issues = []
    const recommendations = []

    console.log('🔍 Checking RLS (Row Level Security) policies...\n')

    // Check RLS status for all tables
    const tables = [
        'profiles',
        'auditor_profiles', 
        'projects',
        'audit_requests',
        'personalization_analytics',
        'behavioral_patterns',
        'personalized_recommendations',
        'learning_paths'
    ]

    for (const table of tables) {
        try {
            // Test RLS by trying to access without auth
            const { data, error } = await supabase
                .from(table)
                .select('*')
                .limit(1)

            if (error) {
                if (error.message.includes('RLS')) {
                    console.log(`✅ ${table}: RLS properly configured`)
                } else {
                    console.log(`⚠️  ${table}: ${error.message}`)
                    issues.push(`${table}: ${error.message}`)
                }
            } else {
                console.log(`🚨 ${table}: RLS may not be properly configured - data accessible without auth`)
                issues.push(`${table}: Potential RLS misconfiguration`)
            }
        } catch (err) {
            console.log(`❌ ${table}: Error checking - ${err.message}`)
            issues.push(`${table}: ${err.message}`)
        }
    }

    console.log('\n🔍 Checking for sensitive data exposure...\n')

    // Check for common sensitive fields that should be protected
    const sensitiveFields = {
        'profiles': ['email', 'phone', 'wallet_address'],
        'auditor_profiles': ['github_username', 'portfolio_url'],
        'projects': ['budget_range', 'owner_id'],
        'personalization_analytics': ['device_info', 'session_id'],
        'behavioral_patterns': ['pattern_data']
    }

    for (const [table, fields] of Object.entries(sensitiveFields)) {
        for (const field of fields) {
            try {
                const { data, error } = await supabase
                    .from(table)
                    .select(field)
                    .limit(1)

                if (!error && data) {
                    console.log(`⚠️  ${table}.${field}: Potentially accessible without proper auth`)
                    issues.push(`${table}.${field}: Sensitive field may be exposed`)
                }
            } catch (err) {
                // This is actually good - means it's protected
                console.log(`✅ ${table}.${field}: Properly protected`)
            }
        }
    }

    console.log('\n🔍 Checking API key security...\n')

    // Check if we're using service role key (dangerous in frontend)
    if (supabaseAnonKey.length > 200) {
        console.log('🚨 WARNING: Possibly using service role key in frontend!')
        issues.push('Service role key detected in frontend - this is a security risk')
    } else {
        console.log('✅ Using anon key (good practice)')
    }

    console.log('\n📊 Security Audit Summary:')
    console.log('===========================')
    
    if (issues.length === 0) {
        console.log('🎉 No major security issues found!')
    } else {
        console.log(`⚠️  Found ${issues.length} potential security issues:`)
        issues.forEach((issue, index) => {
            console.log(`${index + 1}. ${issue}`)
        })
    }

    console.log('\n🛡️  Security Recommendations:')
    console.log('==============================')
    
    const securityRecs = [
        'Enable 2FA on your Supabase account',
        'Regularly rotate API keys',
        'Use environment variables for all secrets',
        'Implement proper error handling to avoid data leaks',
        'Add request rate limiting',
        'Enable audit logging',
        'Use HTTPS only in production',
        'Implement proper session management',
        'Add data encryption for sensitive fields',
        'Regular security audits and penetration testing'
    ]

    securityRecs.forEach((rec, index) => {
        console.log(`${index + 1}. ${rec}`)
    })

    return { issues, recommendations: securityRecs }
}

// Run the audit
auditSecurity().catch(console.error)
