import { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="blog-style">
      <div>
        {blog.title}{" "}
        <button onClick={toggleVisibility}>{visible ? "hide" : "show"}</button>
      </div>
      {visible && (
        <div>
          <div>{blog.author}</div>
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes} <button>like</button>{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
