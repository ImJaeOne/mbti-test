import { testAxios } from "./axiosInstance";

export const getTestResult = async (userId) => {
  const response = await testAxios.get(`?userId=${userId}`);
  return response.data;
};

export const getTestResults = async () => {
  const response = await testAxios.get();
  return response.data;
};

export const createTestResult = async ({ userId, nickname, mbti }) => {
  const newTestResult = {
    userId,
    nickname,
    result: mbti,
    visibility: true,
    date: new Date().toISOString().split("T")[0],
  };

  const response = await testAxios.post("", newTestResult);
  return response.data;
};

export const updateTestResultVisibility = async ({ id, visibility }) => {
  const response = await testAxios.patch(`/${id}`, { visibility: !visibility });
  return response.data;
};

export const deleteTestResult = async (id) => {
  const response = await testAxios.delete(`/${id}`);
  return response.data;
};

export const updateProfileTestUser = async ({ id, nickname }) => {
  console.log(id, nickname);
  const response = await testAxios.patch(`/${id}`, { nickname: nickname });
  return response.data;
};
