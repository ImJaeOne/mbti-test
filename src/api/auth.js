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

const expiresInSec = 1 * 10;

export const authLogin = async (userData) => {
  try {
    const response = await authAxios.post(
      `/login?expiresIn=${expiresInSec}s`,
      userData
    );
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
    return response.data;
  } catch (error) {
    console.error("토큰 만료:", error.response.data.message);
    throw error;
  }
};

export const updateProfile = async ({ file, nickname, accessToken }) => {
  const formData = new FormData();
  formData.append("avatar", file);
  formData.append("nickname", nickname);

  try {
    const response = await authAxios.patch("/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("업데이트 실패:", error);
    throw error;
  }
};
