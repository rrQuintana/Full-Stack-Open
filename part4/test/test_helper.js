const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'test1',
    author: 'test1',
    url: 'test1',
    likes: 1
  },
  {
    title: 'test2',
    author: 'test2',
    url: 'test2',
    likes: 2
  },
  {
    title: 'test3',
    author: 'test3',
    url: 'test3',
    likes: 3
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'test', url: 'test', likes: 0 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}