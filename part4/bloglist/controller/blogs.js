const blogRouter = require('express').Router()
const Blog = require('../model/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    let newBlog = request.body
    if (newBlog.likes === undefined) {
        newBlog.likes = 0
    }
    const blog = new Blog(newBlog)
    const result = await blog.save()
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