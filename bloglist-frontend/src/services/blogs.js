import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post(baseUrl, newObject, config);
  return res.data;
};
const update = async (newBlog, id) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.put(`${baseUrl}/${id}`, newBlog, config);

  return res.data;
};
const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, remove, setToken, create, update };
