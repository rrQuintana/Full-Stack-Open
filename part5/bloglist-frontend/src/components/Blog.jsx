import Togglable from "./Togglable" // spell-checker: disable-line

const Blog = ({ blog, handleLike, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <p className="font-semibold">Title: {blog.title}</p>
      <Togglable buttonLabel="view"> {/*spell-checker: disable-line*/}
        <p>Author: {blog.author?.name}</p>
        <a>Url: {blog.url}</a>
        <p>Likes: {blog.likes} <button onClick={()=>handleLike(blog)}>like</button></p>
        <button onClick={()=>handleDelete(blog)}>delete</button>
      </Togglable> {/*spell-checker: disable-line*/}
    </div>
  )
}

export default Blog