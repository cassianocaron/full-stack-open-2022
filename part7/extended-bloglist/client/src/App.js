import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import NavBar from "./components/NavBar";
import Blog from "./components/Blog";
import Users from "./components/Users";
import User from "./components/User";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import Greeting from "./components/Greeting";

import userService from "./services/users";

import { login } from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login);

  useEffect(() => {
    const userFromStorage = userService.getUser();
    if (userFromStorage) {
      dispatch(login(userFromStorage));
    }
  }, []);

  useEffect(() => {
    dispatch(initializeUsers());
    dispatch(initializeBlogs());
  }, []);

  if (user === null) {
    return (
      <Container>
        <LoginForm />
      </Container>
    );
  }

  return (
    <Container>
      <NavBar />
      <Greeting name={user.name} />
      <Notification />
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm togglableRef={blogFormRef} />
      </Togglable>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </Container>
  );
};

export default App;
