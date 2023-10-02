import { Link } from "react-router-dom"
import { getUser, logout } from "../reducers/authReducer"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

function Navigation() {
    const user = useSelector(getUser)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }

    if (!user) {
        return null
    }

    return (
        <menu>
            <ul>
                <li><Link to='/users'>users</Link></li>
                <li><Link to='/'>blogs</Link></li>
            </ul>
            <p>
                {user.name} logged in
                <button onClick={handleLogout}>logout</button>
            </p>
        </menu>
    )
}

export default Navigation