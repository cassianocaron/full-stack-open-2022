import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification && notification.includes("error")) {
    return <Alert severity="error">{notification.substring(6)}</Alert>;
  }

  return notification && <Alert severity="success">{notification}</Alert>;
};

export default Notification;
