import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { selectBlogById, getBlogById } from '../reducers/blogReducer'
import { likeBlog } from "../reducers/blogReducer"

function Blog() {
    const dispatch = useDispatch()
    const params = useParams()
    const blog = useSelector(selectBlogById)

    useEffect(() => {
        dispatch(getBlogById(params.id))
    }, [])

    const onLikeClick = (blog) => {
        dispatch(likeBlog(blog))
        dispatch(getBlogById(params.id))
    }

    return (blog &&
        <div>
            <h1>{blog.title} {blog.author}</h1>
            <p>
                <a href={blog.url}>{blog.url}</a>
            </p>
            <p>
                {blog.likes} likes
                <button onClick={() => onLikeClick(blog)}>like</button>
            </p>
            <p>added by {blog.user.name}</p>
        </div>
    )
}

export default Blog