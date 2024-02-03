const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findById(body.author)

  const blog = new Blog({
    title: body.title,
    author: user.id,
    url: body.url,
    likes: body.likes
  })

  if(
    blog.title === undefined ||
    blog.url === undefined
  ) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

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
  const result = await Blog.findByIdAndDelete(request.params.id)
  console.log('result: ', result)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const result = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
  response.status(200).json(result)
})

module.exports = blogRouter