import { AppBar, Button, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          anecdotes
        </Button>
        <Button color="inherit" component={Link} to="/create">
          create
        </Button>
        <Button color="inherit" component={Link} to="/about">
          about
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
