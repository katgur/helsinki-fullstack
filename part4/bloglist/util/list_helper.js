const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    let max = blogs[0]
    blogs.forEach(blog => {
        if (blog.likes > max.likes) {
            max = blog
        }
    })
    return { title: max.title, author: max.author, likes: max.likes }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const groupedByAuthor = lodash.groupBy(blogs, 'author')
    const mappedAuthorToBlogs = lodash.map(groupedByAuthor, authorToBlog)
    return lodash.maxBy(mappedAuthorToBlogs, 'blogs')
    function authorToBlog(entry) {
        return {
            author: entry[0].author,
            blogs: entry.length
        }
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}