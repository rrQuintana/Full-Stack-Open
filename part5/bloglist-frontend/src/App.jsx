import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/loginService'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable' //spell-checker: disable-line
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef() //spell-checker: disable-line

  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser') //spell-checker: disable-line
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user) //spell-checker: disable-line
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))

      blogFormRef.current.toggleVisibility() //spell-checker: disable-line

      setSuccessMessage(`a new blog ${newBlog.title} by ${user.name} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

    } catch (exception) {
      setErrorMessage('Blog creation failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login' ref={blogFormRef}> {/*spell-checker: disable-line*/}
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable> //spell-checker: disable-line
    )
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser') //spell-checker: disable-line
    setUser(null)
    blogService.setToken(null)
  }

  const handleLike = async (blog) => {
    try{
      const updatedBlog = { ...blog, author: blog?.author?.id, likes: blog.likes + 1 }
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      setBlogs(blogs.map(b => b.id !== blog.id ? b : returnedBlog))
    } catch (exception) {
      if (exception.response.status === 401) {
        setErrorMessage('Unauthorized to like blog')
      } else {
        setErrorMessage('Blog like failed')
      }
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author?.name}`)) {
      try {
        await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      } catch (exception) {
        if (exception.response.status === 401) {
          setErrorMessage('Unauthorized to delete blog')
        } else {
          setErrorMessage('Blog deletion failed')
        }
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  return (
    <div id="main">
      {
        user === null
          ? loginForm()
          : <div>
            <p>{user.name} logged-in</p>
            <p>
              <button onClick={handleLogout}>logout</button>
            </p>

            <Togglable buttonLabel='new blog' ref={blogFormRef}> {/*spell-checker: disable-line*/}
              <h2>create new</h2>
              <BlogForm
                addBlog={addBlog}
                setNewBlog={setNewBlog}
                newBlog={newBlog}
              />
            </Togglable> {/*spell-checker: disable-line*/}
          </div>
      }
      {successMessage !== null && <div style={{ color: 'green' }}>{successMessage}</div>}
      {errorMessage !== null && <div className='error' style={{ color: 'red' }}>{errorMessage}</div>}

      <h2>blogs</h2>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
      )}
    </div>
  )
}

export default App