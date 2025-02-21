import axios from "axios";

const AUTH_API_URL = "https://www.nbcamp-react-auth.link";

const TEST_API_URL = "http://localhost:5000/testResults";

export const authAxios = axios.create({
  baseURL: AUTH_API_URL,
});

export const testAxios = axios.create({
  baseURL: TEST_API_URL,
});
