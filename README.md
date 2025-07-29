# Secure Web3 Arena

A comprehensive security audit platform for Web3 projects, built with React, TypeScript, and modern tooling.

## Production Deployment

### Prerequisites

- Node.js 18 or higher
- npm 8 or higher
- Access to production environment variables

### Environment Setup

1. Copy `.env.production` to `.env.local` and fill in the required values:
```bash
cp .env.production .env.local
```

2. Configure the following environment variables:
- `VITE_APP_URL`: Production application URL
- `VITE_API_URL`: Production API endpoint
- `VITE_AUTH_DOMAIN`: Authentication domain
- `VITE_AUTH_CLIENT_ID`: Authentication client ID
- `VITE_AUTH_AUDIENCE`: Authentication audience
- `VITE_SENTRY_DSN`: Sentry DSN for error tracking
- `VITE_GA_TRACKING_ID`: Google Analytics tracking ID

### Build and Deploy

1. Install dependencies:
```bash
npm ci
```

2. Run type checks:
```bash
npm run type-check
```

3. Run tests:
```bash
npm run test
npm run test:e2e
```

4. Build for production:
```bash
npm run build
```

5. The build output will be in the `dist` directory, ready for deployment.

### CI/CD

The project uses GitHub Actions for automated deployments:
- Pushes to `main` trigger automatic deployments
- Each deployment runs type checks, tests, and builds
- Production builds are deployed to Cloudflare Pages

### Security Considerations

1. Content Security Policy (CSP) is enabled by default
2. All API endpoints use HTTPS
3. Authentication tokens are handled securely
4. File uploads are limited to 5MB
5. Regular security audits are performed

### Monitoring

- Error tracking via Sentry
- Performance monitoring via Google Analytics
- Server-side logs via CloudWatch

### Support

For production support, contact:
- Technical issues: tech@secure-web3-arena.com
- Security concerns: security@secure-web3-arena.com

## License

Copyright © 2025 Secure Web3 Arena. All rights reserved.

# Hawkly - Web3 Security Marketplace

**URL**: https://hawkly.app

**Status**: UI Overhaul in Progress (July-August 2025)

## UI Overhaul

The platform is undergoing a comprehensive UI overhaul to implement modern design patterns and enhanced user experience features. For details, see:

- [UI Overhaul Implementation Plan](./HAWKLY_UI_OVERHAUL_IMPLEMENTATION_PLAN.md)
- [UI Overhaul Implementation Tracking](./HAWKLY_UI_OVERHAUL_IMPLEMENTATION_TRACKING.md)
- [UI Overhaul Testing Plan](./HAWKLY_UI_OVERHAUL_TESTING_PLAN.md)
- [UI Overhaul Quickstart Guide](./HAWKLY_UI_OVERHAUL_QUICKSTART_GUIDE.md)
- [UI Overhaul Executive Summary](./HAWKLY_UI_OVERHAUL_EXECUTIVE_SUMMARY.md)

## How can I edit this code?

There are several ways of editing your application.

**Use Hawkly Development Tools**

Access the development environment through the Hawkly platform for seamless development.

Changes made through Hawkly tools will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Hawkly development tools.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Deploy through the Hawkly platform using the deployment tools available in the development environment.

## Can I connect a custom domain to my Hawkly project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more in the Hawkly documentation for setting up custom domains.

## 📋 Implementation Guides & User Journeys

- [Project Owner User Journey: Implementation & Verification Guide](docs/ProjectOwnerUserJourney.md)

Refer to this guide for a step-by-step checklist and verification process for the Project Owner experience on Hawkly.

