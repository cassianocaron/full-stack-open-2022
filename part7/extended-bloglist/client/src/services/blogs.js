import axios from "axios";
import userService from "./users";

const baseUrl = "/api/blogs";

const config = () => {
  return {
    headers: {
      Authorization: `bearer ${userService.getToken()}`,
    },
  };
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config());
  return response.data;
};

const addComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment });
  return response.data;
};

const addLike = async (id, blog) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config());
  return response.data;
};

// eslint-disable-next-line
export default {
  getAll,
  create,
  addComment,
  addLike,
  remove,
};
