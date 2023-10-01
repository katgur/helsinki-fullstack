import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import authService from "./services/auth"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"
import { useDispatch, useSelector } from "react-redux"
import { setError, setSuccess } from "./reducers/notificationReducer"
import Notification from "./components/Notification"
import { initializeBlogs, createBlog, getBlogs } from "./reducers/blogReducer"
import blogService from './services/blogs'

const USER_KEY = "loggedBlogappUser"

const App = () => {
    const blogs = useSelector(getBlogs)
    const [user, setUser] = useState(null)
    const dispatch = useDispatch()
    const blogFormRef = useRef()

    useEffect(() => {
        if (user) {
            blogService.setToken(user.token)
            dispatch(initializeBlogs())
        }
        if (!user) {
            setUser(JSON.parse(window.localStorage.getItem(USER_KEY)))
        }
    }, [user])

    const handleLogin = (username, password) => {
        authService
            .login(username, password)
            .then((data) => {
                setUser(data)
                window.localStorage.setItem(USER_KEY, JSON.stringify(data))
                dispatch(setSuccess("you have successfully logged in"))
            })
            .catch((error) => {
                dispatch(setError("error while logging in" + (error.response ? `: ${error.response.data.error}` : "")))
            })
    }

    const handleLogout = () => {
        window.localStorage.removeItem(USER_KEY)
        setUser(null)
    }

    const handleBlogCreate = (blog) => {
        blogFormRef.current.toggleVisibility()
        dispatch(createBlog(blog))
    }

    const handleLikeClick = (blog) => {
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1,
            user: blog.user.id
        }
        delete updatedBlog.id
        blogService
            .update(blog.id, updatedBlog)
            .then((data) => {
                const newBlogs = blogs.map((blog) => {
                    if (blog.id === data.id) {
                        blog.likes = data.likes
                    }
                    return blog
                })
                // setBlogs(newBlogs)
                dispatch(setSuccess(`blog "${data.title}" liked`))
            })
            .catch((error) => {
                dispatch(setError("error while liking blog" + (error.response ? `: ${error.response.data.error}` : "")))
            })
    }

    const handleSortClick = () => {
        const sortedBlogs = [...blogs].sort(
            (blog1, blog2) => blog2.likes - blog1.likes
        )
        // setBlogs(sortedBlogs)
    }

    const handleRemoveClick = (blog) => {
        if (window.confirm(`are you sure to remove blog "${blog.title}"?`)) {
            blogService
                .remove(blog.id)
                .then(() => {
                    dispatch(setSuccess(`blog "${blog.title}" deleted`))
                    const filteredBlogs = blogs.filter(
                        (blog1) => blog1.id !== blog.id
                    )
                    setBlogs(filteredBlogs)
                })
                .catch((error) => {
                    dispatch(setError("error while removing blog" + (error.response ? `: ${error.response.data.error}` : "")))
                })
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
                                blog={{...blog, isOwn: blog.user.username === user.username}}
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
