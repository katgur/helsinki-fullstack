import userMock from '../../test/mock/users'
import blogMock from '../../test/mock/blogs'

const mock = { ...userMock, ...blogMock, user: userMock.users[0] }

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/test/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, mock.user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.get('#login-button').should('exist')
    cy.get('#username').should('exist')
    cy.get('#password').should('exist')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type(mock.user.username)
      cy.get('#password').type(mock.user.password)
      cy.get('#login-button').click()

      cy.contains(`${mock.user.name} logged in`).should('exist')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type(mock.userWithWrongCredentials.username)
      cy.get('#password').type(mock.userWithWrongCredentials.password)
      cy.get('#login-button').click()

      const message = cy.contains('error while logging in: username not found')
      message.should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type(mock.user.username)
      cy.get('#password').type(mock.user.password)
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('create').click()
      cy.get('#title').type(mock.blog.title)
      cy.get('#author').type(mock.blog.author)
      cy.get('#url').type(mock.blog.url)
      cy.contains('save').click()

      cy.contains(`${mock.blog.title} ${mock.blog.author}`).should('exist')
    })

    it('A blog can be liked', function () {
      cy.contains('create').click()
      cy.get('#title').type(mock.blog.title)
      cy.get('#author').type(mock.blog.author)
      cy.get('#url').type(mock.blog.url)
      cy.contains('save').click()
      cy.contains('show').click()
      cy.contains('like').click()

      cy.contains('likes 1').should('exist')
    })

    it('The user who created a blog can delete it', function () {
      cy.contains('create').click()
      cy.get('#title').type(mock.blog.title)
      cy.get('#author').type(mock.blog.author)
      cy.get('#url').type(mock.blog.url)
      cy.contains('save').click()
      cy.contains(`${mock.blog.title} ${mock.blog.author}`)
      cy.contains('show').click()
      cy.contains(`${mock.user.name}`)
      cy.contains('remove').click()
      cy.contains(`${mock.blog.title} ${mock.blog.author}`).should('not.exist')
    })

    it('Only the creator can see the delete button of a blog', function () {
      cy.contains('create').click()
      cy.get('#title').type(mock.blog.title)
      cy.get('#author').type(mock.blog.author)
      cy.get('#url').type(mock.blog.url)
      cy.contains('save').click()
      cy.contains('show').click()
      cy.contains(`${mock.user.name}`).should('exist')
      cy.contains('remove').should('exist')

      cy.contains('logout').click()
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, mock.users[1])
      cy.get('#username').type(mock.users[1].username)
      cy.get('#password').type(mock.users[1].password)
      cy.get('#login-button').click()
      cy.contains('show').click()
      cy.contains(`${mock.user.name}`).should('exist')
      cy.contains('remove').should('not.exist')
    })

    afterEach(function () {
      cy.contains('logout').click()
    })
  })
})