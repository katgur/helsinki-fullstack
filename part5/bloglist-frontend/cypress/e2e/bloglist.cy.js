import mock from '../../test/mock/users'

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/test/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, mock.user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('login').click()
    cy.get('input:first').type(mock.user.username)
    cy.get('input:last').type(mock.user.password)
  })
})