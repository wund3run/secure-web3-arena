import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { RBACProvider, RequireAuth } from '../src/contexts/RBACContext';

// Mock components for testing
const MockDashboard = () => <div>Dashboard Content</div>;
const MockAdminPage = () => <div>Admin Content</div>;
const MockAuditorPage = () => <div>Auditor Content</div>;
const MockUnauthorizedPage = () => <div>Unauthorized Page</div>;
const MockAuthPage = () => <div>Auth Page</div>;

describe('RBAC Authentication and Authorization', () => {
  // Mock localStorage
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn()
  };
  
  // Replace real localStorage with mock
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    });
    vi.clearAllMocks();
  });
  
  // Test public route access
  it('allows access to public routes without authentication', () => {
    localStorageMock.getItem.mockReturnValue(null); // No user logged in
    
    render(
      <MemoryRouter initialEntries={['/']}>
        <RBACProvider>
          <Routes>
            <Route path="/" element={<div>Public Home</div>} />
            <Route path="/auth" element={<MockAuthPage />} />
          </Routes>
        </RBACProvider>
      </MemoryRouter>
    );
    
    expect(screen.getByText('Public Home')).toBeInTheDocument();
  });
  
  // Test redirect to login when accessing protected route without authentication
  it('redirects to auth page when accessing protected route without authentication', () => {
    localStorageMock.getItem.mockReturnValue(null); // No user logged in
    
    // Set up a mock navigate function to capture redirects
    const mockNavigate = vi.fn();
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom');
      return {
        ...actual,
        useNavigate: () => mockNavigate,
        useLocation: () => ({ pathname: '/dashboard' })
      };
    });
    
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <RBACProvider>
          <Routes>
            <Route path="/auth" element={<MockAuthPage />} />
            <Route path="/dashboard" element={
              <RequireAuth>
                <MockDashboard />
              </RequireAuth>
            } />
          </Routes>
        </RBACProvider>
      </MemoryRouter>
    );
    
    // Check that navigate was called with path to auth page
    expect(mockNavigate).toHaveBeenCalledWith('/auth', expect.anything());
  });
  
  // Test admin route access with admin role
  it('allows access to admin routes with admin role', () => {
    // Mock logged in admin
    const mockAdmin = {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      permissions: ['admin.access']
    };
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockAdmin));
    
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <RBACProvider>
          <Routes>
            <Route path="/admin" element={
              <RequireAuth requiredRole="admin">
                <MockAdminPage />
              </RequireAuth>
            } />
            <Route path="/unauthorized" element={<MockUnauthorizedPage />} />
          </Routes>
        </RBACProvider>
      </MemoryRouter>
    );
    
    expect(screen.getByText('Admin Content')).toBeInTheDocument();
  });
  
  // Test admin route access denial with non-admin role
  it('denies access to admin routes with non-admin role', () => {
    // Mock logged in auditor
    const mockAuditor = {
      id: '2',
      name: 'Auditor User',
      email: 'auditor@example.com',
      role: 'auditor',
      permissions: ['analytics.basic.view']
    };
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockAuditor));
    
    // Set up a mock navigate function to capture redirects
    const mockNavigate = vi.fn();
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom');
      return {
        ...actual,
        useNavigate: () => mockNavigate,
        useLocation: () => ({ pathname: '/admin' })
      };
    });
    
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <RBACProvider>
          <Routes>
            <Route path="/admin" element={
              <RequireAuth requiredRole="admin">
                <MockAdminPage />
              </RequireAuth>
            } />
            <Route path="/unauthorized" element={<MockUnauthorizedPage />} />
          </Routes>
        </RBACProvider>
      </MemoryRouter>
    );
    
    // Check that navigate was called with path to unauthorized page
    expect(mockNavigate).toHaveBeenCalledWith('/unauthorized', expect.anything());
  });
  
  // Test route that allows multiple roles
  it('allows access to routes with multiple allowed roles', () => {
    // Mock logged in auditor
    const mockAuditor = {
      id: '2',
      name: 'Auditor User',
      email: 'auditor@example.com',
      role: 'auditor',
      permissions: ['analytics.basic.view']
    };
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockAuditor));
    
    render(
      <MemoryRouter initialEntries={['/auditor-page']}>
        <RBACProvider>
          <Routes>
            <Route path="/auditor-page" element={
              <RequireAuth requiredRole={['admin', 'auditor']}>
                <MockAuditorPage />
              </RequireAuth>
            } />
            <Route path="/unauthorized" element={<MockUnauthorizedPage />} />
          </Routes>
        </RBACProvider>
      </MemoryRouter>
    );
    
    expect(screen.getByText('Auditor Content')).toBeInTheDocument();
  });
  
  // Test permission-based access
  it('checks permissions correctly', () => {
    // Mock logged in user with specific permissions
    const mockUser = {
      id: '3',
      name: 'Test User',
      email: 'test@example.com',
      role: 'projectOwner',
      permissions: ['project.create', 'project.view']
    };
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser));
    
    // Create a test component that uses the RBAC context
    const TestPermissionComponent = () => {
      const { hasPermission } = require('../src/contexts/RBACContext').useRBAC();
      return (
        <div>
          {hasPermission('project.create') && <div>Can Create Project</div>}
          {hasPermission('project.delete') && <div>Can Delete Project</div>}
        </div>
      );
    };
    
    render(
      <MemoryRouter>
        <RBACProvider>
          <TestPermissionComponent />
        </RBACProvider>
      </MemoryRouter>
    );
    
    expect(screen.getByText('Can Create Project')).toBeInTheDocument();
    expect(screen.queryByText('Can Delete Project')).not.toBeInTheDocument();
  });
  
  // Test logout functionality
  it('clears user data on logout', async () => {
    // Mock logged in user
    const mockUser = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'admin',
      permissions: []
    };
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser));
    
    // Create a test component that uses the logout function
    const TestLogoutComponent = () => {
      const { logout, isAuthenticated } = require('../src/contexts/RBACContext').useRBAC();
      return (
        <div>
          {isAuthenticated ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <div>Logged Out</div>
          )}
        </div>
      );
    };
    
    render(
      <MemoryRouter>
        <RBACProvider>
          <TestLogoutComponent />
        </RBACProvider>
      </MemoryRouter>
    );
    
    // Click logout button
    fireEvent.click(screen.getByText('Logout'));
    
    // Check localStorage.removeItem was called
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('hawkly-user');
  });
});
