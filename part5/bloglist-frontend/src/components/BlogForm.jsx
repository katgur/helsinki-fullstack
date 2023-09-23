import { useState } from 'react'

function BlogForm({ handleBlogCreate }) {
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const onSubmit = (event) => {
    event.preventDefault()
    handleBlogCreate(blog)
    setBlog({
      title: '',
      author: '',
      url: '',
    })
  }

  return (
    <>
      <h2>create new blog</h2>
      <form onSubmit={onSubmit}>
        <div>
                    title:
          <input
            type="text"
            value={blog.title}
            name="title"
            onChange={({ target }) => setBlog({ ...blog, title: target.value })}
          />
        </div>
        <div>
                    author:
          <input
            type="text"
            value={blog.author}
            name="author"
            onChange={({ target }) => setBlog({ ...blog, author: target.value })}
          />
        </div>
        <div>
                    url:
          <input
            type="text"
            value={blog.url}
            name="url"
            onChange={({ target }) => setBlog({ ...blog, url: target.value })}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm