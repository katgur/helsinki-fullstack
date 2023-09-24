import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from '../src/components/Blog'
import mock from './mock/blogs'

test('renders content', () => {
    const blog = mock.blog

    render(<Blog blog={blog} />)

    const element = screen.getByText(`${blog.title} ${blog.author}`)
    expect(element).not.toHaveTextContent(blog.url)
    expect(element).not.toHaveTextContent(blog.likes)
})