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
        console.log(error.message)
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
        setBlogs([...blogs, data])
        showMessage(MESSAGE_TYPE_SUCCESS, 'blog added')
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
      {blogs && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App