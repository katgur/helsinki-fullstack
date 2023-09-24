import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../src/components/Blog'
import mock from './mock/blogs'

test("doesn't show url and likes by default", () => {
    const blog = mock.blog

    const { container } = render(<Blog blog={blog} />)

    expect(container).toHaveTextContent(`${blog.title} ${blog.author}`)
    expect(container).not.toHaveTextContent(blog.url)
    expect(container).not.toHaveTextContent(blog.likes)
})

test("show url and likes after show button click", async () => {
    const blog = mock.blog
    const user = userEvent.setup()

    const { container } = render(<Blog blog={blog} />)

    const button = screen.getByText('show')
    await user.click(button)

    expect(container).toHaveTextContent(`${blog.title} ${blog.author}`)
    expect(container).toHaveTextContent(blog.url)
    expect(container).toHaveTextContent(blog.likes)
})