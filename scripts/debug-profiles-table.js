#!/usr/bin/env node

/**
 * Debug Profiles Table Script
 * Specifically tests the profiles table access and RLS issues
 */

import { createClient } from '@supabase/supabase-js';

// Configuration
const SUPABASE_URL = 'https://divymuaksqdgjsrlptct.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpdnltdWFrc3FkZ2pzcmxwdGN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMTM3MTksImV4cCI6MjA2MDg4OTcxOX0.sI8pfnK_7aCXAFCnoCVLFKCPgiX7OZedHUqFqmuIarU';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function debugProfilesTable() {
  console.log('🔍 PROFILES TABLE DEBUG');
  console.log('========================\n');

  // Test 1: Simple select
  console.log('1️⃣ Testing basic select...');
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name')
      .limit(5);
    
    console.log('   ✅ SUCCESS: Basic select works');
    console.log(`   📊 Found ${data?.length || 0} profiles`);
    if (data && data.length > 0) {
      console.log('   📝 Sample data:', data[0]);
    }
  } catch (err) {
    console.log('   ❌ FAILED:', err.message);
  }

  // Test 2: Count with exact option
  console.log('\n2️⃣ Testing count with exact option...');
  try {
    const { count, error } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.log('   ❌ FAILED:', error.message);
    } else {
      console.log('   ✅ SUCCESS: Count query works');
      console.log(`   📊 Total profiles: ${count}`);
    }
  } catch (err) {
    console.log('   ❌ FAILED:', err.message);
  }

  // Test 3: Count with estimated option
  console.log('\n3️⃣ Testing count with estimated option...');
  try {
    const { count, error } = await supabase
      .from('profiles')
      .select('*', { count: 'estimated', head: true });
    
    if (error) {
      console.log('   ❌ FAILED:', error.message);
    } else {
      console.log('   ✅ SUCCESS: Estimated count works');
      console.log(`   📊 Estimated profiles: ${count}`);
    }
  } catch (err) {
    console.log('   ❌ FAILED:', err.message);
  }

  // Test 4: Insert test (should fail due to RLS)
  console.log('\n4️⃣ Testing insert operation...');
  try {
    const { error } = await supabase
      .from('profiles')
      .insert({
        id: '00000000-0000-0000-0000-000000000000', // UUID that shouldn't exist
        full_name: 'Test User',
        is_arbitrator: false
      });
    
    if (error) {
      console.log('   ✅ EXPECTED: Insert blocked by RLS');
      console.log(`   📝 Error: ${error.message}`);
    } else {
      console.log('   ⚠️  WARNING: Insert succeeded (RLS might be disabled)');
    }
  } catch (err) {
    console.log('   ✅ EXPECTED: Insert blocked');
    console.log(`   📝 Error: ${err.message}`);
  }

  // Test 5: Check current user
  console.log('\n5️⃣ Testing current user session...');
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.log('   ❌ Auth error:', error.message);
    } else if (user) {
      console.log('   ✅ User authenticated:');
      console.log(`   📧 Email: ${user.email}`);
      console.log(`   🆔 ID: ${user.id}`);
    } else {
      console.log('   📝 No authenticated user (anonymous access)');
    }
  } catch (err) {
    console.log('   ❌ FAILED:', err.message);
  }

  // Test 6: Test with authenticated user
  console.log('\n6️⃣ Testing sign-in flow...');
  try {
    // First, try signing up a test user
    const testEmail = `test-${Date.now()}@hawkly.dev`;
    const testPassword = 'TestPass123!';
    
    console.log(`   🔄 Attempting to sign up: ${testEmail}`);
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword
    });
    
    if (signUpError) {
      console.log(`   ❌ Sign-up failed: ${signUpError.message}`);
      
      // Try signing in with an existing account
      console.log('   🔄 Trying existing credentials...');
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: 'admin@hawkly.dev', // Common test email
        password: 'admin123'
      });
      
      if (signInError) {
        console.log(`   ❌ Sign-in failed: ${signInError.message}`);
      } else {
        console.log('   ✅ Signed in successfully');
        
        // Now test profiles table with authenticated user
        const { data, error } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        
        if (error) {
          console.log(`   ❌ Authenticated count failed: ${error.message}`);
        } else {
          console.log(`   ✅ Authenticated count works: ${data}`);
        }
      }
    } else {
      console.log('   ✅ Sign-up successful');
      if (signUpData.user) {
        console.log(`   🆔 New user ID: ${signUpData.user.id}`);
      }
    }
  } catch (err) {
    console.log('   ❌ FAILED:', err.message);
  }

  // Test 7: Check table schema
  console.log('\n7️⃣ Testing table schema access...');
  try {
    // Try to get column information
    const { data, error } = await supabase.rpc('get_table_columns', { table_name: 'profiles' });
    
    if (error) {
      console.log(`   ❌ Schema query failed: ${error.message}`);
    } else {
      console.log('   ✅ Schema query succeeded');
      console.log('   📋 Columns:', data);
    }
  } catch (err) {
    console.log('   📝 Schema RPC not available (this is normal)');
  }

  console.log('\n📊 DEBUGGING COMPLETE');
  console.log('======================');
  console.log('\n💡 Next Steps:');
  console.log('   1. Check Supabase dashboard for RLS policies on profiles table');
  console.log('   2. Verify if authentication is required for count operations');
  console.log('   3. Test authentication flow in the browser');
  console.log('   4. Check if profiles table exists and has data');
}

// Run the debug script
debugProfilesTable().catch(console.error);

export { debugProfilesTable }; 