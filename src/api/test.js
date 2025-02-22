import { testAxios } from "./axiosInstance";

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

  const response = await testAxios.post("/api/testResults", newTestResult);
  return response.data;
};

export const updateTestResultVisibility = async ({id, visibility}) => {
  console.log(id,visibility);
  const response = await testAxios.patch(`/${id}`, { visibility: false });
  return response.data;
};

export const deleteTestResult = async (id) => {
  const response = await testAxios.delete(`/${id}`);
  return response.data;
};
