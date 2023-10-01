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
        <div>
            {user && <h2>blogs</h2>}
            <Notification />
            {!user && <LoginForm handleLogin={handleLogin} />}
            {user && (
                <>
                    <p>
                        {user.name} logged in{" "}
                        <button onClick={handleLogout}>logout</button>
                    </p>
                    <Togglable buttonLabel="create" ref={blogFormRef}>
                        <BlogForm handleBlogCreate={handleBlogCreate} />
                    </Togglable>
                </>
            )}
            {user && blogs && (
                <>
                    <button onClick={handleSortClick}>sort</button>
                    {blogs.map((blog) => {
                        return (
                            <Blog
                                key={blog.id}
                                blog={{ ...blog, isOwn: blog.user.username === user.username }}
                                onLikeClick={handleLikeClick}
                                onRemoveClick={handleRemoveClick}
                            />
                        )
                    })}
                </>
            )}
        </div>
    )
}

export default App
