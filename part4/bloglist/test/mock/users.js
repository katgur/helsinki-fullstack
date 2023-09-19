const users = [
    {
        username: 'admin',
        name: 'Administrator',
        password: 'admin'
    }
]

const noUsernameUser = { 
    name: 'No Username',
    password: 'no username'
}

const noPasswordUser = { 
    name: 'No Password',
    username: 'nopassword'
}

const shortUsernameUser = {
    username: 'sh',
    name: 'Short Username',
    password: 'shortusername'
}

const shortPasswordUser = {
    username: 'shortpassword',
    name: 'Short Password',
    password: 'sh'
}

module.exports = { users, noUsernameUser, noPasswordUser, shortUsernameUser, shortPasswordUser }