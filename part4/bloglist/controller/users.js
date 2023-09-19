const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../model/user')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

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