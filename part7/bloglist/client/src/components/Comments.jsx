import { useState } from "react"
import { commentBlog } from "../reducers/blogReducer"
import { useDispatch } from 'react-redux'
import { useParams } from "react-router"

function Comments({ comments }) {
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const params = useParams()

    const handleCommentSubmit = (event) => {
        event.preventDefault()
        dispatch(commentBlog(params.id, comment))
        setComment('')
    }

    return (
        <>
            <h2>comments</h2>
            <form onSubmit={handleCommentSubmit}>
                <input value={comment} onChange={(event) => setComment(event.target.value)} />
                <button type="submit">add comment</button>
            </form>
            <ul>
                {
                    comments.map(comment => {
                        return <li key={comment}>{comment}</li>
                    })
                }
            </ul>
        </>
    )
}

export default Comments