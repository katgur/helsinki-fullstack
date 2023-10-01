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
    return async dispatch => {
        blogService
            .add(blog)
            .then(() => {
                blogService.getAll()
                    .then(blogs => {
                        dispatch(set(blogs))
                        dispatch(setSuccess(`blog "${blog.title}" added`))
                    })
            })
            .catch((error) => {
                dispatch(setError("error while creating blog" + (error.response ? `: ${error.response.data.error}` : "")))
            })
    }
}

export default blogSlice.reducer