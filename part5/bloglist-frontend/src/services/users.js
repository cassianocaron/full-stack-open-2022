import axios from "axios";
const baseUrl = "/api/users";

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

// eslint-disable-next-line
export default { getUser };
