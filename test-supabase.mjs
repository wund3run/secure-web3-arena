#!/usr/bin/env node

// Simple Node.js script to test Supabase connection
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://divymuaksqdgjsrlptct.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpdnltdWFrc3FkZ2pzcmxwdGN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMTM3MTksImV4cCI6MjA2MDg4OTcxOX0.sI8pfnK_7aCXAFCnoCVLFKCPgiX7OZedHUqFqmuIarU';

console.log('🔍 Testing Supabase Backend Connection...\n');
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey.substring(0, 20) + '...\n');

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🔄 Testing basic connection...');
  
  try {
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Basic connection successful');
    return true;
  } catch (err) {
    console.error('❌ Connection error:', err.message);
    return false;
  }
}

async function testTables() {
  console.log('\n🔄 Testing table access...');
  
  const tables = [
    { name: 'profiles', description: 'User profiles' },
    { name: 'auditor_profiles', description: 'Auditor-specific data' },
    { name: 'projects', description: 'Project information' },
    { name: 'audit_requests', description: 'Audit requests' }
  ];

  let passedTests = 0;
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase.from(table.name).select('*').limit(1);
      
      if (error) {
        console.log(`⚠️  ${table.name}: ${error.message}`);
      } else {
        console.log(`✅ ${table.name}: Accessible (${table.description})`);
        passedTests++;
      }
    } catch (err) {
      console.log(`❌ ${table.name}: ${err.message}`);
    }
  }
  
  return passedTests;
}

async function testPersonalizationFeatures() {
  console.log('\n🔄 Testing personalization features...');
  
  const personalizationTables = [
    'personalization_analytics',
    'behavioral_patterns',
    'personalized_recommendations',
    'learning_paths'
  ];

  let existingTables = 0;
  
  for (const tableName of personalizationTables) {
    try {
      const { data, error } = await supabase.from(tableName).select('*').limit(1);
      
      if (error) {
        console.log(`⚠️  ${tableName}: Not available (${error.message})`);
      } else {
        console.log(`✅ ${tableName}: Available`);
        existingTables++;
      }
    } catch (err) {
      console.log(`❌ ${tableName}: ${err.message}`);
    }
  }
  
  return existingTables;
}

async function runAllTests() {
  const connectionOk = await testConnection();
  
  if (!connectionOk) {
    console.log('\n❌ Connection failed - stopping tests');
    return;
  }
  
  const tablesPass = await testTables();
  const personalizationPass = await testPersonalizationFeatures();
  
  console.log('\n📊 Test Results Summary:');
  console.log('========================');
  console.log(`✅ Basic Connection: ${connectionOk ? 'PASSED' : 'FAILED'}`);
  console.log(`✅ Core Tables: ${tablesPass}/4 accessible`);
  console.log(`✅ Personalization: ${personalizationPass}/4 tables available`);
  
  const totalScore = (connectionOk ? 1 : 0) + (tablesPass / 4) + (personalizationPass / 4);
  const percentage = Math.round((totalScore / 3) * 100);
  
  console.log(`\n🎯 Overall Score: ${percentage}%`);
  
  if (percentage >= 80) {
    console.log('🎉 Backend is fully functional!');
  } else if (percentage >= 60) {
    console.log('⚠️ Backend is partially functional - some features may be limited');
  } else {
    console.log('❌ Backend has significant issues - please check configuration');
  }
}

// Run tests
runAllTests().catch(console.error);
