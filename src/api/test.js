import { testAxios } from "./axiosInstance";

export const getTestResult = async (userId) => {
  const response = await testAxios.get(`?userId=${userId}`);
  return response.data;
};

export const getTestResults = async () => {
  const response = await testAxios.get("/testResults");
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

  const response = await testAxios.post("/testResults", newTestResult);
  return response.data;
};

export const updateTestResultVisibility = async ({ id, visibility }) => {
  const response = await testAxios.patch(`/testResults/${id}`, {
    visibility: !visibility,
  });
  return response.data;
};

export const deleteTestResult = async (id) => {
  const response = await testAxios.delete(`/testResults/${id}`);
  return response.data;
};

export const updateProfileTestUser = async ({ id, nickname }) => {
  const response = await testAxios.patch(`/testResults/${id}`, {
    nickname: nickname,
  });
  return response.data;
};
