const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../model/blog')
const mock = require('./mock/blogs')

const api = supertest(app)
const initialBlogs = mock.blogs;
const TIMEOUT = 100 * 1000;

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})


test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, TIMEOUT)

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
}, TIMEOUT)

test('unique identifier is called id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
    expect(response.body[1].id).toBeDefined()
}, TIMEOUT)

test('blog is added', async () => {
    const newBlog = initialBlogs[2]

    const result = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    expect(result._body.title).toBe(newBlog.title)
    expect(result._body.author).toBe(newBlog.author)
    expect(result._body.url).toBe(newBlog.url)
    expect(result._body.likes).toBe(newBlog.likes)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(3)
}, TIMEOUT)

afterAll(async () => {
    await mongoose.connection.close()
})