import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../src/components/BlogForm'
import mock from './mock/blogs'

test("form calls the event handler it received as props with the right details", async () => {
    const user = userEvent.setup()
    const handleBlogCreate = jest.fn()
    const blog = mock.blog

    const { container } = render(<BlogForm handleBlogCreate={handleBlogCreate} />)
    await user.type(container.querySelector('#title'), blog.title)
    await user.type(container.querySelector('#author'), blog.author)
    await user.type(container.querySelector('#url'), blog.url)
    await user.click(screen.getByText('create'))

    expect(handleBlogCreate.mock.calls).toHaveLength(1)
    expect(handleBlogCreate.mock.calls[0][0]).toEqual({ title: blog.title, author: blog.author, url: blog.url })
})