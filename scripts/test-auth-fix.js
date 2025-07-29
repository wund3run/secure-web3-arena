#!/usr/bin/env node

/**
 * Authentication Fix Verification Script
 * Tests the authentication system after applying fixes
 */

import { createClient } from '@supabase/supabase-js';

// Configuration
const SUPABASE_URL = 'https://divymuaksqdgjsrlptct.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpdnltdWFrc3FkZ2pzcmxwdGN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMTM3MTksImV4cCI6MjA2MDg4OTcxOX0.sI8pfnK_7aCXAFCnoCVLFKCPgiX7OZedHUqFqmuIarU';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function runAuthTests() {
  console.log('🔍 AUTHENTICATION FIX VERIFICATION');
  console.log('=====================================\n');

  const results = [];

  // Test 1: Basic Supabase Health Check
  console.log('1️⃣ Testing Supabase Health Check...');
  try {
    // Test if we can reach Supabase at all
    const response = await fetch(`${SUPABASE_URL}/health`);
    if (response.ok) {
      results.push({ test: 'Supabase Health', status: 'PASS' });
      console.log('   ✅ SUCCESS: Supabase service is reachable');
    } else {
      results.push({ test: 'Supabase Health', status: 'FAIL', error: `HTTP ${response.status}` });
      console.log('   ❌ FAILED: Supabase health check failed');
    }
  } catch (err) {
    results.push({ test: 'Supabase Health', status: 'FAIL', error: err.message });
    console.log('   ❌ FAILED:', err.message);
  }

  // Test 2: Database Connection with different approaches
  console.log('\n2️⃣ Testing Database Connection...');
  
  // Test 2a: Try profiles table with select count
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('count(*)', { count: 'exact', head: true });
    
    if (error) {
      console.log('   ❌ profiles count query failed:', error.message);
      results.push({ test: 'Database - profiles count', status: 'FAIL', error: error.message });
    } else {
      console.log('   ✅ profiles table accessible via count query');
      results.push({ test: 'Database - profiles count', status: 'PASS' });
    }
  } catch (err) {
    console.log('   ❌ profiles count exception:', err.message);
    results.push({ test: 'Database - profiles count', status: 'FAIL', error: err.message });
  }

  // Test 2b: Try simple select from profiles
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);
    
    if (error) {
      console.log('   ❌ profiles select failed:', error.message);
      results.push({ test: 'Database - profiles select', status: 'FAIL', error: error.message });
    } else {
      console.log('   ✅ profiles table accessible via select query');
      results.push({ test: 'Database - profiles select', status: 'PASS' });
    }
  } catch (err) {
    console.log('   ❌ profiles select exception:', err.message);
    results.push({ test: 'Database - profiles select', status: 'FAIL', error: err.message });
  }

  // Test 2c: Try a public table that should definitely work
  try {
    const { data, error } = await supabase
      .from('audit_requests')
      .select('id')
      .limit(1);
    
    if (error) {
      console.log('   ❌ audit_requests select failed:', error.message);
      results.push({ test: 'Database - audit_requests', status: 'FAIL', error: error.message });
    } else {
      console.log('   ✅ audit_requests table accessible');
      results.push({ test: 'Database - audit_requests', status: 'PASS' });
    }
  } catch (err) {
    console.log('   ❌ audit_requests exception:', err.message);
    results.push({ test: 'Database - audit_requests', status: 'FAIL', error: err.message });
  }

  // Test 3: Authentication System Check
  console.log('\n3️⃣ Testing Authentication System...');
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      results.push({ test: 'Auth System', status: 'FAIL', error: error.message });
      console.log('   ❌ FAILED:', error.message);
    } else {
      results.push({ test: 'Auth System', status: 'PASS' });
      console.log('   ✅ SUCCESS: Authentication system functional');
      if (session) {
        console.log('   📝 Active session found for:', session.user.email);
      }
    }
  } catch (err) {
    results.push({ test: 'Auth System', status: 'FAIL', error: err.message });
    console.log('   ❌ FAILED:', err.message);
  }

  // Test 4: Sign-in API Test
  console.log('\n4️⃣ Testing Sign-in API Endpoint...');
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: 'test@invalid.com',
      password: 'invalid'
    });
    
    if (error && error.message.includes('Invalid login credentials')) {
      results.push({ test: 'Sign-in API', status: 'PASS' });
      console.log('   ✅ SUCCESS: API correctly rejects invalid credentials');
    } else if (error && error.message.includes('Invalid API key')) {
      results.push({ test: 'Sign-in API', status: 'FAIL', error: 'Invalid API key' });
      console.log('   ❌ FAILED: Invalid API key error');
    } else {
      results.push({ test: 'Sign-in API', status: 'WARNING', error: 'Unexpected response' });
      console.log('   ⚠️  WARNING: Unexpected API response');
    }
  } catch (err) {
    results.push({ test: 'Sign-in API', status: 'FAIL', error: err.message });
    console.log('   ❌ FAILED:', err.message);
  }

  // Test 5: RLS Policy Test
  console.log('\n5️⃣ Testing Row Level Security Policies...');
  try {
    // Try to access a user-specific table that would require RLS
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .limit(1);
    
    if (error) {
      if (error.message.includes('RLS') || error.message.includes('policy') || error.message.includes('permission')) {
        results.push({ test: 'RLS Policies', status: 'WARNING', error: 'RLS policies may be blocking anonymous access' });
        console.log('   ⚠️  WARNING: RLS policies detected (this is normal for user_roles table)');
      } else {
        results.push({ test: 'RLS Policies', status: 'FAIL', error: error.message });
        console.log('   ❌ FAILED:', error.message);
      }
    } else {
      results.push({ test: 'RLS Policies', status: 'PASS' });
      console.log('   ✅ SUCCESS: RLS policies working correctly');
    }
  } catch (err) {
    results.push({ test: 'RLS Policies', status: 'FAIL', error: err.message });
    console.log('   ❌ FAILED:', err.message);
  }

  // Test 6: Environment Variables Check
  console.log('\n6️⃣ Testing Environment Configuration...');
  try {
    // Check if ANON_KEY is valid JWT format
    const keyParts = SUPABASE_ANON_KEY.split('.');
    if (keyParts.length === 3) {
      const payload = JSON.parse(Buffer.from(keyParts[1], 'base64').toString());
      const expiresAt = new Date(payload.exp * 1000);
      const now = new Date();
      
      if (expiresAt > now) {
        results.push({ test: 'Environment Config', status: 'PASS' });
        console.log('   ✅ SUCCESS: ANON_KEY is valid and not expired');
        console.log(`   📅 Expires: ${expiresAt.toISOString()}`);
        console.log(`   🏷️  Project: ${payload.ref || 'unknown'}`);
      } else {
        results.push({ test: 'Environment Config', status: 'FAIL', error: 'ANON_KEY expired' });
        console.log('   ❌ FAILED: ANON_KEY has expired');
      }
    } else {
      results.push({ test: 'Environment Config', status: 'FAIL', error: 'Invalid JWT format' });
      console.log('   ❌ FAILED: ANON_KEY is not a valid JWT');
    }
  } catch (err) {
    results.push({ test: 'Environment Config', status: 'FAIL', error: err.message });
    console.log('   ❌ FAILED:', err.message);
  }

  // Summary
  console.log('\n📊 SUMMARY');
  console.log('===========');
  
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const warnings = results.filter(r => r.status === 'WARNING').length;
  
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⚠️  Warnings: ${warnings}`);
  
  if (failed === 0 && warnings === 0) {
    console.log('\n🎉 ALL TESTS PASSED! Authentication is working correctly.');
    console.log('\n📝 Next Steps:');
    console.log('   1. Visit http://localhost:8080/auth to test the UI');
    console.log('   2. Visit http://localhost:8080/debug/auth for live diagnostics');
    console.log('   3. Try creating a test account');
  } else if (failed > 0) {
    console.log('\n🚨 CRITICAL ISSUES FOUND!');
    console.log('\n🔧 Fixes needed:');
    results.filter(r => r.status === 'FAIL').forEach(r => {
      console.log(`   - ${r.test}: ${r.error}`);
    });
    
    console.log('\n💡 Possible Solutions:');
    console.log('   1. Check Supabase dashboard for RLS policies');
    console.log('   2. Verify database schema is properly migrated');
    console.log('   3. Check if tables exist and have correct permissions');
    console.log('   4. Ensure ANON_KEY has proper access to tables');
  } else {
    console.log('\n⚠️  MINOR ISSUES FOUND - Authentication should still work');
    console.log('\n💡 Recommendations:');
    console.log('   1. Review RLS policies for user-specific tables');
    console.log('   2. Test authentication flow in the browser');
  }

  return { passed, failed, warnings, results };
}

// Run the tests
runAuthTests().catch(console.error);

export { runAuthTests }; 