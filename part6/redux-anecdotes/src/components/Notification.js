import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const style = {
    border: "solid",
    padding: 10,
    marginBottom: 25,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "lightgrey",
    color: "green",
  };
  return notification && <div style={style}>{notification}</div>;
};

export default Notification;
