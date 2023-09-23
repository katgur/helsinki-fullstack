import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import authService from './services/auth'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const USER_KEY = 'loggedBlogappUser'
const MESSAGE_TYPE_SUCCESS = 'success'
const MESSAGE_TYPE_ERROR = 'error'

const App = () => {
  const [blogs, setBlogs] = useState(null)
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
    if (!user) {
      setUser(JSON.parse(window.localStorage.getItem(USER_KEY)))
    }
  }, [user])

  const handleLogin = (username, password) => {
    authService.login(username, password)
      .then(data => {
        setUser(data)
        window.localStorage.setItem(
          USER_KEY, JSON.stringify(data)
        )
        showMessage(MESSAGE_TYPE_SUCCESS, 'you have successfully logged in')
      })
      .catch(error => {
        const message = 'error while logging in' + (error.response ? `: ${error.response.data.error}` : '')
        showMessage(MESSAGE_TYPE_ERROR, message)
      })
  }

  const handleLogout = () => {
    window.localStorage.removeItem(USER_KEY)
    setUser(null)
    setBlogs(null)
  }

  const handleBlogCreate = (blog) => {
    blogFormRef.current.toggleVisibility()
    blogService.add(blog)
      .then(data => {
        showMessage(MESSAGE_TYPE_SUCCESS, `blog "${data.title}" added`)
        blogService.getAll()
          .then(data => {
            setBlogs(data)
          })
      })
      .catch(error => {
        const message = 'error while adding blog' + (error.response ? `: ${error.response.data.error}` : '')
        showMessage(MESSAGE_TYPE_ERROR, message)
      })
  }

  const showMessage = (type, content) => {
    setMessage({ type, content })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLikeClick = (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    delete updatedBlog.id
    blogService.update(blog.id, updatedBlog)
      .then(data => {
        const newBlogs = blogs.map(blog => {
          if (blog.id === data.id) {
            blog.likes = data.likes
          }
          return blog
        })
        setBlogs(newBlogs)
        showMessage(MESSAGE_TYPE_SUCCESS, `blog "${data.title}" liked`)
      })
      .catch(error => {
        const message = 'error while liking blog' + (error.response ? `: ${error.response.data.error}` : '')
        showMessage(MESSAGE_TYPE_ERROR, message)
      })
  }

  const handleSortClick = () => {
    const sortedBlogs = [...blogs].sort((blog1, blog2) => blog2.likes - blog1.likes)
    setBlogs(sortedBlogs)
  }

  const handleRemoveClick = (blog) => {
    if (window.confirm(`are you sure to remove blog "${blog.title}"?`)) {
      blogService.remove(blog.id)
        .then(() => {
          showMessage(MESSAGE_TYPE_SUCCESS, `blog "${blog.title}" deleted`)
          const filteredBlogs = blogs.filter(blog1 => blog1.id !== blog.id)
          setBlogs(filteredBlogs)
        })
        .catch(error => {
          const message = 'error while deleting blog' + (error.response ? `: ${error.response.data.error}` : '')
          showMessage(MESSAGE_TYPE_ERROR, message)
        })
    }
  }

  return (
    <div>
      {user && <h2>blogs</h2>}
      {message && <p style={{ color: message.type === MESSAGE_TYPE_ERROR ? 'red' : 'green' }}>{message.content}</p>}
      {!user && <LoginForm handleLogin={handleLogin} />}
      {
        user &&
        <>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel="create" ref={blogFormRef}>
            <BlogForm handleBlogCreate={handleBlogCreate} />
          </Togglable>
        </>
      }
      {blogs &&
        <>
          <button onClick={handleSortClick}>sort</button>
          {blogs.map(blog => {
            blog.isOwn = blog.user.username === user.username
            return <Blog key={blog.id} blog={blog} onLikeClick={handleLikeClick} onRemoveClick={handleRemoveClick} />
          }
          )}
        </>}
    </div>
  )
}

export default App