import { useEffect, useRef } from "react"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"
import Notification from "./components/Notification"
import { useDispatch, useSelector } from "react-redux"
import { initializeBlogs, createBlog, getBlogs, likeBlog, deleteBlog, sortBlogs } from "./reducers/blogReducer"
import blogService from './services/blogs'
import { getUser, login, logout } from "./reducers/authReducer"
import Users from "./components/Users"
import User from "./components/User"
import { Route, Routes } from "react-router"

const App = () => {
    const blogs = useSelector(getBlogs)
    const user = useSelector(getUser)
    const dispatch = useDispatch()
    const blogFormRef = useRef()

    useEffect(() => {
        if (user) {
            blogService.setToken(user.token)
            dispatch(initializeBlogs())
        }
    }, [user])

    const handleLogin = (username, password) => {
        dispatch(login(username, password))
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    const handleBlogCreate = (blog) => {
        blogFormRef.current.toggleVisibility()
        dispatch(createBlog(blog))
    }

    const handleLikeClick = (blog) => {
        dispatch(likeBlog(blog))
    }

    const handleSortClick = () => {
        dispatch(sortBlogs(blogs))
    }

    const handleRemoveClick = (blog) => {
        if (window.confirm(`are you sure to remove blog "${blog.title}"?`)) {
            dispatch(deleteBlog(blog))
        }
    }

    return (
        <>
            {user && <h2>blogs</h2>}
            <Notification />
            {!user && <LoginForm handleLogin={handleLogin} />}
            {
                user &&
                <>
                    <p>
                        {user.name} logged in
                        <button onClick={handleLogout}>logout</button>
                    </p>
                    <Routes>
                        <Route path='/users' element={<Users />} />
                        <Route path='/users/:id' element={<User />} />
                    </Routes>
                </>
            }
        </>
    )
}

export default App
