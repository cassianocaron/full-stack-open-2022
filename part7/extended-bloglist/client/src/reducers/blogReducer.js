import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { createNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      const { id } = updatedBlog;
      return state.map((blog) => (blog.id !== id ? blog : updatedBlog));
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

const { appendBlog, updateBlog, setBlogs, removeBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch(appendBlog(newBlog));
      dispatch(
        createNotification(
          {
            message: `A new blog ${blog.title} by ${blog.author} added`,
            type: "success",
          },
          5
        )
      );
    } catch (error) {
      dispatch(
        createNotification(
          { message: error.response.data.error, type: "error" },
          5
        )
      );
    }
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id);
      dispatch(removeBlog(blog.id));
      dispatch(
        createNotification(
          { message: `${blog.title} by ${blog.author} removed!`, type: "info" },
          5
        )
      );
    } catch (error) {
      dispatch(
        createNotification(
          { message: error.response.data.error, type: "error" },
          5
        )
      );
    }
  };
};

export const likeBlog = (id, blog) => {
  return async (dispatch) => {
    try {
      const likedBlog = await blogService.addLike(id, blog);
      dispatch(updateBlog(likedBlog));
      dispatch(
        createNotification({ message: `${blog.title} liked`, type: "info" }, 5)
      );
    } catch (error) {
      dispatch(
        createNotification(
          { message: error.response.data.error, type: "error" },
          5
        )
      );
    }
  };
};

export const createComment = (id, comment) => {
  return async (dispatch) => {
    try {
      const commentedBlog = await blogService.addComment(id, comment);
      dispatch(updateBlog(commentedBlog));
      dispatch(
        createNotification(
          { message: `Comment ${comment} added`, type: "info" },
          5
        )
      );
    } catch (error) {
      dispatch(
        createNotification(
          { message: error.response.data.error, type: "error" },
          5
        )
      );
    }
  };
};

export default blogSlice.reducer;
