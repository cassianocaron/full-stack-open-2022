import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/material";
import { useMatch, Routes, Route } from "react-router-dom";

import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import NavBar from "./components/NavBar";
import Blog from "./components/Blog";
import Users from "./components/Users";
import User from "./components/User";

import { loggedUser } from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loggedUser());
    dispatch(initializeUsers());
  }, [dispatch]);

  const user = useSelector((state) => state.login);
  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);

  const matchBlog = useMatch("/blogs/:id");
  const blogId = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null;

  const matchUser = useMatch("/users/:id");
  const userId = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null;

  return (
    <Container>
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <NavBar />
          <h2 className="header-title">Blogs App</h2>
          <p>
            Hello, <strong>{user.name}!</strong>
          </p>
          <Notification />
          <Routes>
            <Route path="/blogs" element={<BlogList />} />
            <Route
              path="/blogs/:id"
              element={<Blog blog={blogId} user={user} />}
            />
            <Route path="/users" element={<Users users={users} />} />
            <Route path="/users/:id" element={<User user={userId} />} />
          </Routes>
        </div>
      )}
    </Container>
  );
};

export default App;
