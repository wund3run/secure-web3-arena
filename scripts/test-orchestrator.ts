// Test script for orchestrator health and event handling
import { platformOrchestrator } from '../src/services/platformOrchestration';

function printServices() {
  const health = platformOrchestrator.getSystemHealth();
  console.log('--- Registered Services ---');
  health.services.forEach(s => {
    console.log(`Service: ${s.name}, Status: ${s.status}, Uptime: ${s.uptime}`);
  });
  console.log('Overall Health:', health.overall + '%');
  if (health.criticalIssues.length > 0) {
    console.log('Critical Issues:', health.criticalIssues);
  }
}

function printEventLog() {
  // @ts-ignore: access private for test
  const events = platformOrchestrator.eventHistory || [];
  console.log('--- Event Log ---');
  events.slice(-10).forEach(e => {
    console.log(`[${e.timestamp.toISOString()}] ${e.type} - ${e.source} -> ${e.target || ''}`);
    if (e.data) console.log('  Data:', e.data);
  });
}

function setStatus(serviceName: string, status: 'online' | 'offline' | 'degraded') {
  platformOrchestrator.updateServiceStatus(serviceName, status);
}

async function main() {
  console.log('Initial state:');
  printServices();

  // Simulate status changes
  setStatus('blockchain-service', 'offline');
  setStatus('payment-service', 'degraded');
  setStatus('email-service', 'offline');
  console.log('\nAfter status changes:');
  printServices();

  printEventLog();

  // Restore all to online
  setStatus('blockchain-service', 'online');
  setStatus('payment-service', 'online');
  setStatus('email-service', 'online');
  console.log('\nAfter restoring all services:');
  printServices();
}

main().catch(console.error); 