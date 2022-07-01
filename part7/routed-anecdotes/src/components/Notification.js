import { Alert } from "@mui/material";

const Notification = ({ notification }) => {
  if (notification === null) return null;

  return (
    <div className="container">
      {notification && <Alert severity="success">{notification}</Alert>}
    </div>
  );
};

export default Notification;
