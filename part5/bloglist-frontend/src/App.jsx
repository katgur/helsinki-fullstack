import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import authService from './services/auth'
import LoginForm from './components/LoginForm'

export const USER_KEY = 'loggedBlogappUser'

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

  return (
    <div>
      <h2>{user ? "blogs" : "login"}</h2>
      {user && 
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>}
      {!user && <LoginForm handleLogin={handleLogin} />}
      {blogs && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App