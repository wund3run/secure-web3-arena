
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock API endpoints
  http.get('/api/audits', () => {
    return HttpResponse.json([
      {
        id: 1,
        title: 'Test Audit',
        status: 'active',
        severity: 'high',
        type: 'smart-contract',
      },
    ]);
  }),

  http.get('/api/marketplace/services', () => {
    return HttpResponse.json([
      {
        id: 1,
        title: 'Test Service',
        provider: 'Test Provider',
        rating: 4.5,
        price: 1000,
        category: 'smart-contract',
      },
    ]);
  }),

  http.post('/api/auth/login', () => {
    return HttpResponse.json({
      user: {
        id: 1,
        email: 'test@example.com',
        role: 'auditor',
      },
      token: 'mock-jwt-token',
    });
  }),
];
