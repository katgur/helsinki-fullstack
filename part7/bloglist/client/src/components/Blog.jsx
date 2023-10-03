import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { selectBlogById, getBlogById } from '../reducers/blogReducer'
import { likeBlog } from "../reducers/blogReducer"
import Comments from "./Comments"
import { Button, Card } from "react-bootstrap"

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
        <>
            <Card style={{ marginTop: "5%", padding: "24px" }}>
                <h1>{blog.title} {blog.author}</h1>
                <p>
                    <a href={blog.url}>{blog.url}</a>
                </p>
                <p>
                    {blog.likes} likes
                    <Button style={{ marginLeft: "5%" }} variant="outline-dark" onClick={() => onLikeClick(blog)}>like</Button>
                </p>
                <p>added by {blog.user.name}</p>
            </Card>
            <Comments comments={blog.comments} />
        </>
    )
}

export default Blog