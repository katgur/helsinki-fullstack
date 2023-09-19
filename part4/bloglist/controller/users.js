const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../model/user')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (!password) {
        response.status(400).json({ error: 'no password' })
        return
    }

    if (password.length < 3) {
        response.status(400).json({ error: 'password must be longer than 3' })
        return
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
        username,
        name,
        passwordHash,
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const result = await User.find({})
    response.json(result)
})

module.exports = usersRouter