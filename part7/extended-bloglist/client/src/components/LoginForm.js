import { useField } from "../hooks/index";
import { useDispatch } from "react-redux";
import { TextField, Button } from "@mui/material";
import { logUserIn } from "../reducers/loginReducer";
import Notification from "./Notification";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { reset: resetUsername, ...username } = useField("text");
  const { reset: resetPassword, ...password } = useField("password");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    const user = {
      username: username.value,
      password: password.value,
    };
    dispatch(logUserIn(user));
    resetUsername();
    resetPassword();
    navigate("/blogs");
  };

  return (
    <div>
      <h2 className="header-title">Blogs App</h2>
      <Notification />
      <h2>Log in to application</h2>
      <form onSubmit={onSubmit}>
        <div>
          <TextField label="username" {...username} />
        </div>
        <div>
          <TextField label="password" {...password} />
        </div>
        <Button variant="contained" color="primary" type="submit">
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
