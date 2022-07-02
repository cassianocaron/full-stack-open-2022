import { useField } from "../hooks/index";
import { useDispatch } from "react-redux";
import { logUserIn } from "../reducers/loginReducer";
import { TextField, Button } from "@mui/material";

import Notification from "./Notification";

const LoginForm = () => {
  const { reset: resetUsername, ...username } = useField("text");
  const { reset: resetPassword, ...password } = useField("password");

  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    const credentials = {
      username: username.value,
      password: password.value,
    };
    dispatch(logUserIn(credentials));
    resetUsername();
    resetPassword();
  };

  return (
    <div>
      <h2 className="header-title">Blogs App</h2>
      <Notification />
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
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
