import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setError, setSuccess } from "./notificationReducer"

const blogSlice = createSlice({
    name: 'blog',
    initialState: [],
    reducers: {
        set: (state, action) => {
            const newState = action.payload
            newState.sort((a, b) => b.votes - a.votes)
            return newState
        }
    }
})

const { set } = blogSlice.actions

export const getBlogs = (state) => state.blog

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(set(blogs))
    }
}

export const createBlog = blog => {
    return dispatch => {
        blogService
            .add(blog)
            .then(() => {
                dispatch(initializeBlogs())
                dispatch(setSuccess(`blog "${blog.title}" added`))
            })
            .catch((error) => {
                dispatch(setError("error while creating blog" + (error.response ? `: ${error.response.data.error}` : "")))
            })
    }
}

export const likeBlog = blog => {
    return dispatch => {
        blogService
            .update(blog.id, { ...blog, likes: blog.likes + 1, user: blog.user.id })
            .then(newBlog => {
                dispatch(initializeBlogs())
                dispatch(setSuccess(`blog "${newBlog.title}" liked`))
            })
            .catch((error) => {
                dispatch(setError("error while liking blog" + (error.response ? `: ${error.response.data.error}` : "")))
            })
    }
}

export const deleteBlog = blog => {
    return dispatch => {
        blogService
            .remove(blog.id)
            .then(() => {
                dispatch(initializeBlogs())
                dispatch(setSuccess(`blog "${blog.title}" deleted`))
            })
            .catch((error) => {
                dispatch(setError("error while removing blog" + (error.response ? `: ${error.response.data.error}` : "")))
            })
    }
}

export const sortBlogs = blogs => {
    return dispatch => {
        const sortedBlogs = [...blogs].sort(
            (blog1, blog2) => blog2.likes - blog1.likes
        )
        dispatch(set(sortedBlogs))
    }
}

export default blogSlice.reducer