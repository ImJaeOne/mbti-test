import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTestResult,
  deleteTestResult,
  getTestResults,
  updateTestResultVisibility,
  updateProfileTestUser,
} from "../api/test";

export const useTestResult = (userId) => {
  return useQuery({
    queryKey: ["testResults", userId],
    queryFn: async () => {
      try {
        const testResults = await getTestResults();
        return testResults.find((result) => result.userId === userId) || null;
      } catch (error) {
        console.error("테스트 결과 불러오는데 문제가 발생했습니다.", error);
        return null;
      }
    },
    enabled: !!userId,
  });
};

export const useTestResults = () => {
  return useQuery({
    queryKey: ["testResults"],
    queryFn: async () => {
      try {
        const testResults = await getTestResults();
        return testResults || null;
      } catch (error) {
        console.error("테스트 결과 불러오는데 문제가 발생했습니다.", error);
        return null;
      }
    },
  });
};

export const useCreateTestResult = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTestResult,
    onSuccess: () => {
      queryClient.invalidateQueries(["testResults"]);
    },
  });
};

export const useToggleTestResult = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTestResultVisibility,
    onSuccess: () => {
      queryClient.invalidateQueries(["testResults"]);
    },
  });
};

export const useDeleteTestResult = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTestResult,
    onSuccess: () => {
      queryClient.invalidateQueries(["testResults"]);
    },
  });
};

export const useUpdateProfileTestUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfileTestUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["testResults"]);
    },
  });
};
