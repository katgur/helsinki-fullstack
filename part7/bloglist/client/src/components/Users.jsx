import { useDispatch, useSelector } from 'react-redux'
import { getUsersByCount, selectUsersByCount } from '../reducers/userReducer'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Users() {
    const usersByCount = useSelector(selectUsersByCount)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsersByCount())
    }, [])

    return (
        <>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usersByCount.map(entry => {
                            console.log(entry)
                            return (
                                <tr key={entry.user.id}>
                                    <td><Link to={`/users/${entry.user.id}`}>{entry.user.name}</Link></td>
                                    <td>{entry.blogCount}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default Users