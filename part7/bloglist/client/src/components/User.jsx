import { useDispatch, useSelector } from "react-redux"
import { getUserById, selectUserById } from "../reducers/userReducer"
import { useEffect } from "react"
import { useParams } from 'react-router'

function User() {
    const user = useSelector(selectUserById)
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(getUserById(params.id))
    }, [])

    return (user &&
        <>
            <h1>{user.name}</h1>
            <h2>added blogs</h2>
            <ul>
                {
                    user.blogs.map(blog => {
                        return <li key={blog.title}>{blog.title}</li>
                    })
                }
            </ul>
        </>
    )
}

export default User