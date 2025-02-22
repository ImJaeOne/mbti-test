import axios from "axios";

export const authAxios = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL,
});

export const testAxios = axios.create({
  baseURL: import.meta.env.VITE_TEST_API_URL,
});
