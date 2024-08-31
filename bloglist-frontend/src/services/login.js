import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default { login };
