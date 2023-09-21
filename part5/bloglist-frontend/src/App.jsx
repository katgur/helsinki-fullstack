import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import authService from './services/auth'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const USER_KEY = 'loggedBlogappUser'

const App = () => {
  const [blogs, setBlogs] = useState(null)
  const [user, setUser] = useState(null)

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
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  const handleLogout = () => {
    window.localStorage.removeItem(USER_KEY)
    setUser(null)
    setBlogs(null)
  }

  const handleBlogCreate = (blog) => {
    blogService.add(blog)
      .then(data => {
        setBlogs([...blogs, data])
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  return (
    <div>
      <h2>{user ? "blogs" : "login"}</h2>
      {user &&
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>}
      {!user && <LoginForm handleLogin={handleLogin} />}
      {
        user && <>
        <h2>create new blog</h2>
          <BlogForm handleBlogCreate={handleBlogCreate} />
        </>
      }
      {blogs && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App