import { authAxios } from "./axiosInstance";

export const authRegister = async (userData) => {
  try {
    const response = await authAxios.post("/register", userData);
    return response.data;
  } catch (error) {
    console.error(error);
    console.error("회원가입 실패:", error.response.data.message);
    throw error;
  }
};

const expiresInSec = 30;

export const authLogin = async (userData) => {
  try {
    const response = await authAxios.post(
      `/login?expiresIn=${expiresInSec}s`,
      userData
    );
    console.log(response);
    localStorage.setItem("accessToken", response.data.accessToken);
    return { result: response.data, expiresInSec };
  } catch (error) {
    console.error(error);
    console.error("로그인 실패:", error.response.data.message);
    throw error;
  }
};

export const authValidation = async (accessToken) => {
  try {
    const response = await authAxios.get("/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    console.error("토큰 만료:", error.response.data.message);
    throw error;
  }
};
