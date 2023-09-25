import userMock from '../../test/mock/users'
import blogMock from '../../test/mock/blogs'

const mock = { ...userMock, ...blogMock }

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

      cy.contains(`${mock.blog.title} ${mock.blog.author}`)
    })

    it('A blog can be liked', function () {
      cy.contains('create').click()
      cy.get('#title').type(mock.blog.title)
      cy.get('#author').type(mock.blog.author)
      cy.get('#url').type(mock.blog.url)
      cy.contains('save').click()
      cy.contains('show').click()
      cy.contains('like').click()

      cy.contains('likes 1')
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

    afterEach(function () {
      cy.contains('logout').click()
    })
  })
})