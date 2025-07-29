import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { RBACProvider, RequireAuth, useRBAC } from '../src/contexts/RBACContext';

// Create a test component that exposes the RBAC context for testing
const TestAuthStatus = () => {
  const { user, isAuthenticated, isAuthorized, hasPermission, logout } = useRBAC();
  return (
    <div>
      <div data-testid="auth-status">
        {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
      </div>
      <div data-testid="user-role">
        {user?.role || 'No Role'}
      </div>
      <div data-testid="user-permissions">
        {user?.permissions?.join(',') || 'No Permissions'}
      </div>
      <div data-testid="admin-authorized">
        {isAuthorized('admin') ? 'Admin Authorized' : 'Admin Not Authorized'}
      </div>
      <div data-testid="auditor-authorized">
        {isAuthorized('auditor') ? 'Auditor Authorized' : 'Auditor Not Authorized'}
      </div>
      <div data-testid="admin-access-permission">
        {hasPermission('admin.access') ? 'Has Admin Access' : 'No Admin Access'}
      </div>
      <button data-testid="logout-button" onClick={logout}>Logout</button>
    </div>
  );
};

// Create a protected admin component for testing
const AdminOnlyComponent = () => (
  <RequireAuth requiredRole="admin">
    <div data-testid="admin-content">Admin Only Content</div>
  </RequireAuth>
);

// Create a protected auditor component for testing
const AuditorOnlyComponent = () => (
  <RequireAuth requiredRole="auditor">
    <div data-testid="auditor-content">Auditor Only Content</div>
  </RequireAuth>
);

// Create a component that requires either admin or auditor role
const AdminOrAuditorComponent = () => (
  <RequireAuth requiredRole={['admin', 'auditor']}>
    <div data-testid="admin-or-auditor-content">Admin or Auditor Content</div>
  </RequireAuth>
);

// Create a login form component for testing
const LoginForm = () => {
  const { login } = useRBAC();
  
  const handleAdminLogin = () => {
    login('admin@hawkly.io', 'password');
  };
  
  const handleAuditorLogin = () => {
    login('auditor@hawkly.io', 'password');
  };
  
  const handleProjectOwnerLogin = () => {
    login('project@hawkly.io', 'password');
  };
  
  return (
    <div>
      <button data-testid="login-as-admin" onClick={handleAdminLogin}>Login as Admin</button>
      <button data-testid="login-as-auditor" onClick={handleAuditorLogin}>Login as Auditor</button>
      <button data-testid="login-as-project-owner" onClick={handleProjectOwnerLogin}>Login as Project Owner</button>
    </div>
  );
};

// Mock navigate function for tests
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Role-Based Access Control', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  it('should start unauthenticated', () => {
    render(
      <MemoryRouter>
        <RBACProvider>
          <TestAuthStatus />
        </RBACProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('auth-status').textContent).toBe('Not Authenticated');
    expect(screen.getByTestId('user-role').textContent).toBe('No Role');
  });

  it('should authenticate as admin and have admin permissions', async () => {
    const user = userEvent.setup();
    
    render(
      <MemoryRouter>
        <RBACProvider>
          <LoginForm />
          <TestAuthStatus />
        </RBACProvider>
      </MemoryRouter>
    );

    await user.click(screen.getByTestId('login-as-admin'));
    
    await waitFor(() => {
      expect(screen.getByTestId('auth-status').textContent).toBe('Authenticated');
      expect(screen.getByTestId('user-role').textContent).toBe('admin');
      expect(screen.getByTestId('admin-authorized').textContent).toBe('Admin Authorized');
      expect(screen.getByTestId('admin-access-permission').textContent).toBe('Has Admin Access');
    });
  });

  it('should authenticate as auditor and have limited permissions', async () => {
    const user = userEvent.setup();
    
    render(
      <MemoryRouter>
        <RBACProvider>
          <LoginForm />
          <TestAuthStatus />
        </RBACProvider>
      </MemoryRouter>
    );

    await user.click(screen.getByTestId('login-as-auditor'));
    
    await waitFor(() => {
      expect(screen.getByTestId('auth-status').textContent).toBe('Authenticated');
      expect(screen.getByTestId('user-role').textContent).toBe('auditor');
      expect(screen.getByTestId('admin-authorized').textContent).toBe('Admin Not Authorized');
      expect(screen.getByTestId('admin-access-permission').textContent).toBe('No Admin Access');
      expect(screen.getByTestId('auditor-authorized').textContent).toBe('Auditor Authorized');
    });
  });

  it('should allow admin to access admin-only content', async () => {
    const user = userEvent.setup();
    
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <RBACProvider>
          <LoginForm />
          <Routes>
            <Route path="/admin" element={<AdminOnlyComponent />} />
            <Route path="/unauthorized" element={<div data-testid="unauthorized">Unauthorized</div>} />
          </Routes>
        </RBACProvider>
      </MemoryRouter>
    );

    // Initially should redirect to login
    expect(mockNavigate).toHaveBeenCalledWith('/auth', expect.anything());
    
    await user.click(screen.getByTestId('login-as-admin'));
    
    await waitFor(() => {
      expect(screen.getByTestId('admin-content')).toBeInTheDocument();
    });
  });

  it('should prevent auditor from accessing admin-only content', async () => {
    const user = userEvent.setup();
    
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <RBACProvider>
          <LoginForm />
          <Routes>
            <Route path="/admin" element={<AdminOnlyComponent />} />
            <Route path="/unauthorized" element={<div data-testid="unauthorized">Unauthorized</div>} />
          </Routes>
        </RBACProvider>
      </MemoryRouter>
    );
    
    await user.click(screen.getByTestId('login-as-auditor'));
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/unauthorized', expect.anything());
    });
  });

  it('should allow both admin and auditor to access shared content', async () => {
    const user = userEvent.setup();
    
    // Test with admin
    render(
      <MemoryRouter>
        <RBACProvider>
          <LoginForm />
          <AdminOrAuditorComponent />
        </RBACProvider>
      </MemoryRouter>
    );
    
    await user.click(screen.getByTestId('login-as-admin'));
    
    await waitFor(() => {
      expect(screen.getByTestId('admin-or-auditor-content')).toBeInTheDocument();
    });
    
    // Reset and test with auditor
    vi.resetAllMocks();
    localStorage.clear();
    
    render(
      <MemoryRouter>
        <RBACProvider>
          <LoginForm />
          <AdminOrAuditorComponent />
        </RBACProvider>
      </MemoryRouter>
    );
    
    await user.click(screen.getByTestId('login-as-auditor'));
    
    await waitFor(() => {
      expect(screen.getByTestId('admin-or-auditor-content')).toBeInTheDocument();
    });
  });
  
  it('should logout successfully', async () => {
    const user = userEvent.setup();
    
    render(
      <MemoryRouter>
        <RBACProvider>
          <LoginForm />
          <TestAuthStatus />
        </RBACProvider>
      </MemoryRouter>
    );
    
    await user.click(screen.getByTestId('login-as-admin'));
    
    await waitFor(() => {
      expect(screen.getByTestId('auth-status').textContent).toBe('Authenticated');
    });
    
    await user.click(screen.getByTestId('logout-button'));
    
    await waitFor(() => {
      expect(screen.getByTestId('auth-status').textContent).toBe('Not Authenticated');
      expect(mockNavigate).toHaveBeenCalledWith('/', expect.anything());
    });
  });
});
