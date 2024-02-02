const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.status(200).json(blogs)
    })
})

blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  if(
    blog.title === undefined ||
    blog.url === undefined
  ) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  blog
    .save()
    .then(result => {
      response.status(200).json(result)
    })
})

module.exports = blogRouter