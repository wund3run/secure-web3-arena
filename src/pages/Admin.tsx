
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AdminLayout } from "@/components/admin/AdminLayout";

const Admin = () => {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Hawkly</title>
        <meta name="description" content="Admin dashboard for managing the Hawkly platform" />
      </Helmet>
      
      <AdminLayout>
        <Routes>
          {/* Admin sub-routes will be implemented in future updates */}
          <Route path="/" element={<div>Admin Dashboard</div>} />
          <Route path="/users" element={<div>User Management</div>} />
          <Route path="/audits" element={<div>Audit Management</div>} />
          <Route path="/services" element={<div>Service Management</div>} />
          <Route path="/reports" element={<div>Report Management</div>} />
          <Route path="/settings" element={<div>Settings Management</div>} />
        </Routes>
      </AdminLayout>
    </>
  );
};

export default Admin;
