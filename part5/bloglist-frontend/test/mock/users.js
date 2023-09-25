const users = [
  {
    name: 'Kate',
    username: 'root',
    password: '12345'
  },
  {
    name: 'Admin',
    username: 'admin',
    password: 'admin'
  }
]

const userWithWrongCredentials = {
  name: 'Kate',
  username: 'wrong',
  password: 'credentials'
}

export default { users, userWithWrongCredentials, user: users[0] }