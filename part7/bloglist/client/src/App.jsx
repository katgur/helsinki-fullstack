import { useSelector } from "react-redux"
import blogService from './services/blogs'
import { getUser, login } from "./reducers/authReducer"
import Users from "./components/Users"
import User from "./components/User"
import { Route, Routes } from "react-router"
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Navigation from "./components/Navigation"

const MainPage = () => {
    return (
        <>
            <Togglable buttonLabel="create new blog">
                <BlogForm />
            </Togglable>
            <BlogList />
        </>
    )
}

const App = () => {
    const user = useSelector(getUser)

    if (user) {
        blogService.setToken(user.token)
    }

    const handleLogin = (username, password) => {
        dispatch(login(username, password))
    }

    return (
        <>
            <Navigation />
            {user && <h2>blog app</h2>}
            <Notification />
            {!user && <LoginForm handleLogin={handleLogin} />}
            {
                user &&
                <Routes>
                    <Route path='/users' element={<Users />} />
                    <Route path='/users/:id' element={<User />} />
                    <Route path='/' element={<MainPage />} />
                    <Route path='/blogs/:id' element={<Blog />} />
                </Routes>
            }
        </>
    )
}

export default App
