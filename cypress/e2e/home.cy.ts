// https://on.cypress.io/api

describe('Home view', () => {
  it('Loads correctly and shows books', () => {
    cy.visit('/')
    cy.get('[data-cy=book-list]').should('exist')
  })

  it('Show no books found message', () => {
    cy.visit('/?search=TextNoValid')
    cy.get('[data-test=no-books-found-message]').should('exist')
  })
})
