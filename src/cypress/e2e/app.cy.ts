describe('My First Test', () => {
  it('finds the content "type"', () => {
    cy.visit('http://localhost:3000/')
    cy.url().should('include', '/pokemon')
    cy.contains('type')
  })
})