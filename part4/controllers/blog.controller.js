const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if(
    blog.title === undefined ||
    blog.url === undefined
  ) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  const result = await blog.save()
  response.status(200).json(result)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.status(200).json(blog)
  } else {
    response.status(404).end()
  }
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogRouter