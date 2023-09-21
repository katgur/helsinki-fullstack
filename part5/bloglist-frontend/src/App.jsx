import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import authService from './services/auth'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [user])

  const handleLogin = (username, password) => {
    authService.login(username, password)
      .then(data => {
        blogService.setToken(data.token)
        setUser(data)
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  return (
    <div>
      <h2>{user ? "blogs" : "login"}</h2>
      {user && <p>{user.name} logged in</p>}
      {!user && <LoginForm handleLogin={handleLogin} />}
      {blogs && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App