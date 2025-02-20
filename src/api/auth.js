import { authAxios } from "./axiosInstance";

export const authRegister = async (userData) => {
  try {
    const response = await authAxios.post("/register", userData);
    return response.data;
  } catch (error) {
    console.error("회원가입 실패:", error.response.data.message);
    throw error;
  }
};

export const authLogin = async (userData) => {
  try {
    const response = await authAxios.post("/login", userData);
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data;
  } catch (error) {
    console.error("로그인 실패:", error.response.data.message);
    throw error;
  }
};
