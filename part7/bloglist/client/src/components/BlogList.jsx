import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectBlogs, initializeBlogs } from "../reducers/blogReducer"
import { Link } from "react-router-dom"

function BlogList() {
    const blogs = useSelector(selectBlogs)
    const dispatch = useDispatch()

    useEffect(() => {
            dispatch(initializeBlogs())
    }, [])

    return (blogs &&
        <ul>
            {
                blogs.map(blog => {
                    return <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link></li>
                })
            }
        </ul>
    )
}

export default BlogList