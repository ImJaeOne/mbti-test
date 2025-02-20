import axios from "axios";

const AUTH_API_URL = "https://www.nbcamp-react-auth.link";

export const authAxios = axios.create({
  baseURL: AUTH_API_URL,
});
