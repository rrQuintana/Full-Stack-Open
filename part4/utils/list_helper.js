const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const blogLikes = blogs.map(blog => blog.likes)
  const maxLikes = Math.max(...blogLikes)
  const favorite = blogs.find(blog => blog.likes === maxLikes)

  const { title, author, likes } = favorite

  return {
    title,
    author,
    likes
  }
}

const mostBlogs = (blogs) => {
  const authors = blogs.map(blog => blog.author)
  const author = authors.reduce((acc, author) => {
    if (acc[author]) {
      acc[author]++
    } else {
      acc[author] = 1
    }
    return acc
  }, {})

  const maxBlogs = Math.max(...Object.values(author))
  const mostBlogsAuthor = Object.keys(author).find(key => author[key] === maxBlogs)

  return {
    author: mostBlogsAuthor,
    blogs: maxBlogs
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}