
import { rest } from 'msw';

export const handlers = [
  // Mock API endpoints
  rest.get('/api/audits', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          title: 'Test Audit',
          status: 'active',
          severity: 'high',
          type: 'smart-contract',
        },
      ])
    );
  }),

  rest.get('/api/marketplace/services', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          title: 'Test Service',
          provider: 'Test Provider',
          rating: 4.5,
          price: 1000,
          category: 'smart-contract',
        },
      ])
    );
  }),

  rest.post('/api/auth/login', (req, res, ctx) => {
    return res(
      ctx.json({
        user: {
          id: 1,
          email: 'test@example.com',
          role: 'auditor',
        },
        token: 'mock-jwt-token',
      })
    );
  }),
];
