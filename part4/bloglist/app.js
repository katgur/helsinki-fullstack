const config = require('./util/config')
const express = require('express')
const cors = require('cors')
const blogRouter = require('./controller/blogs')
const middleware = require('./util/middleware')
const logger = require('./util/logger')
const mongoose = require('mongoose')
require('express-async-errors')

const app = express()

mongoose.set('strictQuery', false)

logger.info('Connecting to MongoDB')

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to MongoDB')
    })
    .catch((error) => {
        logger.error('Error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app