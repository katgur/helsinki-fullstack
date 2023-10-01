import { useState } from "react"

const Blog = ({ blog, onLikeClick, onRemoveClick }) => {
    const [isShown, setIsShown] = useState(false)
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        borderBottom: "solid 1px"
    }

    return (
        <div className="blog" style={blogStyle}>
            <p>
                {blog.title} {blog.author}
                <button onClick={() => setIsShown(!isShown)}>
                    {isShown ? "hide" : "show"}
                </button>
            </p>
            {isShown && (
                <div>
                    <p>
                        <a href={blog.url}>{blog.url}</a>
                    </p>
                    <p>
                        likes {blog.likes}{" "}
                        <button onClick={() => onLikeClick(blog)}>like</button>
                    </p>
                    <p>{blog.user.name}</p>
                    {blog.isOwn && (
                        <button onClick={() => onRemoveClick(blog)}>
                            remove
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default Blog
