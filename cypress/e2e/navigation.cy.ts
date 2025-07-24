/// <reference types="cypress" />

describe('Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the home page', () => {
    cy.url().should('include', '/');
    cy.get('nav').should('be.visible');
  });

  it('should navigate to different sections', () => {
    // Test main navigation items
    cy.get('nav a').first().click();
    cy.url().should('not.equal', '/');
    
    // Go back home
    cy.get('nav a').contains('Home').click();
    cy.url().should('include', '/');
  });

  it('should show dropdown menus on hover', () => {
    cy.get('nav [data-dropdown]').first().trigger('mouseover');
    cy.get('.dropdown-content').should('be.visible');
  });

  it('should be responsive', () => {
    // Test mobile view
    cy.viewport('iphone-x');
    cy.get('[data-mobile-menu]').should('be.visible');
    
    // Open mobile menu
    cy.get('[data-mobile-menu-button]').click();
    cy.get('[data-mobile-menu-content]').should('be.visible');
    
    // Test tablet view
    cy.viewport('ipad-2');
    cy.get('nav').should('be.visible');
  });
}); 