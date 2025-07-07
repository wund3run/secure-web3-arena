describe('Accessibility checks', () => {
  const pages = [
    { name: 'Disputes', path: '/disputes' },
    { name: 'Receipts', path: '/receipts' },
    { name: 'Feedback Analytics', path: '/feedback-analytics' },
  ];

  pages.forEach(({ name, path }) => {
    it(`has no detectable a11y violations on ${name} page`, () => {
      cy.visit(path);
      cy.injectAxe();
      cy.checkA11y();
    });
  });
}); 