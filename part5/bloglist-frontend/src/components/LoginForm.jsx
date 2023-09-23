import { useState } from "react"

function LoginForm({ handleLogin }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <>
            <h2>login</h2>
            <form onSubmit={(event) => {
                event.preventDefault()
                handleLogin(username, password)
                setUsername('')
                setPassword('')
            }}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </>
    )
}

export default LoginForm