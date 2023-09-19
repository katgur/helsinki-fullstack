const blogRouter = require('express').Router()
const Blog = require('../model/blog')
const User = require('../model/user')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    let { title, author, url, likes } = request.body
    const user = (await User.find({ username: 'root' }))[0]
    const blog = new Blog({
        title: title,
        author: author,
        url: url,
        likes: likes ? likes : 0,
        user: user.id,
    })
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const blog = { ...request.body }
    const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
    if (result) {
        response.json(result)
    } else {
        response.status(404).end()
    }
})

module.exports = blogRouter