import { useDispatch } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Comments from "./Comments";

const Blog = ({ blog, user }) => {
  if (!blog) return null;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLike = (blog) => {
    const { id } = blog;
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    dispatch(likeBlog(id, blogToUpdate));
  };

  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog));
      navigate("/blogs");
    }
  };

  return (
    <div>
      <h2>
        {blog.title} - {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes{" "}
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleLike(blog)}
        >
          like
        </Button>{" "}
        {user.username === blog.user.username && (
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDelete(blog)}
          >
            delete
          </Button>
        )}
      </div>
      <div>
        added by <strong>{blog.user.name}</strong>
      </div>
      <Comments blog={blog} />
    </div>
  );
};

export default Blog;
