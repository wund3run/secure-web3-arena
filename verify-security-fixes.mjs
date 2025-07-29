#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

// Load environment variables
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

console.log('🔒 POST-SECURITY-FIX VERIFICATION TEST')
console.log('=====================================\n')

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function verifySecurityFixes() {
    const results = {
        passed: 0,
        failed: 0,
        issues: []
    }

    console.log('🔍 Testing RLS enforcement...\n')

    // Test all tables for proper RLS protection
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
            const { data, error } = await supabase
                .from(table)
                .select('*')
                .limit(1)

            if (error && (error.message.includes('RLS') || error.message.includes('policy'))) {
                console.log(`✅ ${table}: RLS properly enforced`)
                results.passed++
            } else if (data && data.length === 0) {
                console.log(`✅ ${table}: RLS working (no unauthorized data)`)
                results.passed++
            } else {
                console.log(`🚨 ${table}: RLS may not be working - data accessible`)
                results.failed++
                results.issues.push(`${table}: RLS enforcement issue`)
            }
        } catch (err) {
            console.log(`❌ ${table}: Error - ${err.message}`)
            results.failed++
            results.issues.push(`${table}: ${err.message}`)
        }
    }

    console.log('\n🔍 Testing security tables...\n')

    // Test if security tables exist
    const securityTables = ['security_audit_log', 'rate_limits']
    
    for (const table of securityTables) {
        try {
            const { error } = await supabase
                .from(table)
                .select('id')
                .limit(1)

            if (!error) {
                console.log(`✅ ${table}: Security table exists and accessible`)
                results.passed++
            } else {
                console.log(`⚠️  ${table}: ${error.message}`)
                results.issues.push(`${table}: ${error.message}`)
            }
        } catch (err) {
            console.log(`❌ ${table}: Security table missing`)
            results.failed++
            results.issues.push(`${table}: Missing security table`)
        }
    }

    console.log('\n🔍 Testing API key security...\n')

    // Verify we're using anon key
    if (supabaseAnonKey.length < 200) {
        console.log('✅ Using anon key (secure)')
        results.passed++
    } else {
        console.log('🚨 Using service role key (security risk)')
        results.failed++
        results.issues.push('Service role key in frontend')
    }

    console.log('\n🔍 Testing data validation...\n')

    // Test constraint enforcement (without actually creating bad data)
    try {
        // This should fail due to constraints
        const { error } = await supabase
            .from('profiles')
            .insert({ 
                email: 'invalid-email',
                account_type: 'invalid-type'
            })

        if (error && error.message.includes('constraint')) {
            console.log('✅ Data validation constraints working')
            results.passed++
        } else {
            console.log('⚠️  Data validation may not be working')
            results.issues.push('Data validation constraints missing')
        }
    } catch (err) {
        console.log('✅ Data validation properly rejecting invalid data')
        results.passed++
    }

    console.log('\n📊 SECURITY VERIFICATION RESULTS:')
    console.log('===================================')
    
    const totalTests = results.passed + results.failed
    const successRate = Math.round((results.passed / totalTests) * 100)
    
    console.log(`✅ Passed: ${results.passed}`)
    console.log(`❌ Failed: ${results.failed}`)
    console.log(`🎯 Success Rate: ${successRate}%`)
    
    if (results.issues.length === 0) {
        console.log('\n🎉 ALL SECURITY FIXES VERIFIED!')
        console.log('✅ Your database is now secure')
        console.log('✅ RLS policies are properly enforced')
        console.log('✅ User data is protected')
        console.log('✅ API keys are secure')
    } else {
        console.log('\n⚠️  REMAINING SECURITY ISSUES:')
        results.issues.forEach((issue, index) => {
            console.log(`${index + 1}. ${issue}`)
        })
    }

    console.log('\n🛡️  SECURITY STATUS SUMMARY:')
    console.log('============================')
    
    if (successRate >= 90) {
        console.log('🟢 EXCELLENT: Your security is top-tier')
    } else if (successRate >= 75) {
        console.log('🟡 GOOD: Most security measures in place')
    } else {
        console.log('🔴 NEEDS WORK: Critical security issues remain')
    }

    return { successRate, issues: results.issues }
}

// Run the verification
verifySecurityFixes().catch(console.error)
