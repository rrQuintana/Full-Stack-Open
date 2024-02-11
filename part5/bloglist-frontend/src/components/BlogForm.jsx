import React from 'react'

function BlogForm({ addBlog, setNewBlog, newBlog }) {
  return (
    <div>
      <form onSubmit={(event) => {
        event.preventDefault()
        addBlog(newBlog)
      }}>
        <div>
          title:
          <input
            id='title'
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type="text"
            value={newBlog.url}
            name="Url"
            onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
          />
        </div>
        <button id='create-blog-button' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm