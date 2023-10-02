import { useState } from "react"
import { useDispatch } from "react-redux"
import { createBlog } from "../reducers/blogReducer"

function BlogForm({ toggleVisibility }) {
    const [blog, setBlog] = useState({
        title: "",
        author: "",
        url: ""
    })
    const dispatch = useDispatch()

    const onSubmit = (event) => {
        event.preventDefault()
        toggleVisibility()
        dispatch(createBlog(blog))
        setBlog({
            title: "",
            author: "",
            url: ""
        })
    }

    return (
        <>
            <h2>create new blog</h2>
            <form onSubmit={onSubmit}>
                <div>
                    title:
                    <input
                        id="title"
                        type="text"
                        value={blog.title}
                        name="title"
                        onChange={({ target }) =>
                            setBlog({ ...blog, title: target.value })
                        }
                    />
                </div>
                <div>
                    author:
                    <input
                        id="author"
                        type="text"
                        value={blog.author}
                        name="author"
                        onChange={({ target }) =>
                            setBlog({ ...blog, author: target.value })
                        }
                    />
                </div>
                <div>
                    url:
                    <input
                        id="url"
                        type="text"
                        value={blog.url}
                        name="url"
                        onChange={({ target }) =>
                            setBlog({ ...blog, url: target.value })
                        }
                    />
                </div>
                <button type="submit">save</button>
            </form>
        </>
    )
}

export default BlogForm
