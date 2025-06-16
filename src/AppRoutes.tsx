
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Auth from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';
import Marketplace from '@/pages/Marketplace';
import RequestAudit from '@/pages/RequestAudit';
import NotFound from '@/pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/request-audit" element={<RequestAudit />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
