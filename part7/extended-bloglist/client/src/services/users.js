import axios from "axios";
const baseUrl = "/api/users";

let token = null;

const setUser = (user) => {
  window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
  token = user.token;
};

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    token = user.token;
    return user;
  }
  return null;
};

const clearUser = () => {
  localStorage.clear();
  token = null;
};

const getToken = () => token;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// eslint-disable-next-line
export default { setUser, getUser, clearUser, getToken, getAll };
