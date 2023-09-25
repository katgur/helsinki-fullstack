import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../src/components/Blog'
import mock from './mock/blogs'

test('doesn\'t show url and likes by default', () => {
  const blog = mock.blog

  const { container } = render(<Blog blog={blog} />)

  expect(container).toHaveTextContent(`${blog.title} ${blog.author}`)
  expect(container).not.toHaveTextContent(blog.url)
  expect(container).not.toHaveTextContent(blog.likes)
})

test('show url and likes after show button click', async () => {
  const blog = mock.blog
  const user = userEvent.setup()

  const { container } = render(<Blog blog={blog} />)

  const button = screen.getByText('show')
  await user.click(button)

  expect(container).toHaveTextContent(`${blog.title} ${blog.author}`)
  expect(container).toHaveTextContent(blog.url)
  expect(container).toHaveTextContent(blog.likes)
})

test('if the like button is clicked twice, the event handler is called twice', async () => {
  const blog = mock.blog
  const user = userEvent.setup()
  const handleLikeClick = jest.fn()

  render(<Blog blog={blog} onLikeClick={handleLikeClick} />)

  await user.click(screen.getByText('show'))
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(handleLikeClick.mock.calls).toHaveLength(2)
})