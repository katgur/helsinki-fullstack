const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return undefined
    }
    let max = blogs[0]
    blogs.forEach(blog => {
        if (blog.likes > max.likes) {
            max = blog
        }
    })
    return { title: max.title, author: max.author, likes: max.likes }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}