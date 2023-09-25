import mock from '../../test/mock/users'

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/test/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, mock.user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.get('#login-button').click()
    cy.get('#username').type(mock.user.username)
    cy.get('#password').type(mock.user.password)
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type(mock.user.username)
      cy.get('#password').type(mock.user.password)
      cy.get('#login-button').click()

      cy.contains(`${mock.user.name} logged in`)
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type(mock.userWithWrongCredentials.username)
      cy.get('#password').type(mock.userWithWrongCredentials.password)
      cy.get('#login-button').click()

      const message = cy.contains('error while logging in: username not found')
      message.should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})