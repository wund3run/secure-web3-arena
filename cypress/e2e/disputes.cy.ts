/// <reference types="cypress" />

describe('Disputes Flow', () => {
  const projectId = '1'; // Should match the test data in your DB or mock
  const userId = 'user-123'; // Should match the test user
  const auditorId = 'auditor-456'; // Should match the test auditor

  beforeEach(() => {
    // Optionally, seed DB or login as needed
    cy.visit('/disputes');
  });

  it('loads the disputes list', () => {
    cy.contains('Disputes');
    cy.get('table').should('exist');
  });

  it('opens and submits the Raise Dispute modal', () => {
    cy.contains('Raise Dispute').click();
    cy.get('form').within(() => {
      cy.get('textarea').type('Test dispute reason');
      cy.get('button[type="submit"]').click();
    });
    cy.contains('Dispute submitted successfully!');
    // Wait for modal to close and list to refresh
    cy.wait(1500);
    cy.get('table').should('exist');
    cy.contains('Test dispute reason');
  });
}); 